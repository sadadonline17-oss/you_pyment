import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, SUPABASE_ENABLED } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY_PREFIX = 'local_';

const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(data));
  } catch (error) {
    // Error saving to localStorage
  }
};

const getFromLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    // Error reading from localStorage
    return null;
  }
};

const getAllFromLocalStorage = (prefix: string) => {
  try {
    const items: any[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_KEY_PREFIX + prefix)) {
        const data = localStorage.getItem(key);
        if (data) {
          items.push(JSON.parse(data));
        }
      }
    }
    return items;
  } catch (error) {
    // Error reading from localStorage
    return [];
  }
};

// Types from database
export interface Chalet {
  id: string;
  name: string;
  country_code: string;
  city: string;
  address: string;
  default_price: number;
  images: string[];
  provider_id: string | null;
  verified: boolean;
  amenities: string[];
  capacity: number;
}

export interface ShippingCarrier {
  id: string;
  name: string;
  country_code: string;
  services: string[];
  contact: string | null;
  website: string | null;
  logo_path: string | null;
}

export interface Link {
  id: string;
  type: string;
  country_code: string;
  provider_id: string | null;
  payload: any;
  microsite_url: string;
  payment_url: string;
  signature: string;
  status: string;
  created_at: string;
}

export interface Payment {
  id: string;
  link_id: string | null;
  amount: number;
  currency: string;
  status: string;
  otp: string | null;
  attempts: number;
  locked_until: string | null;
  receipt_url: string | null;
  cardholder_name: string | null;
  last_four: string | null;
  created_at: string;
}

// Fetch chalets by country
export const useChalets = (countryCode?: string) => {
  return useQuery({
    queryKey: ["chalets", countryCode],
    queryFn: async () => {
      if (!SUPABASE_ENABLED) {
        const { MOCK_CHALETS } = await import('@/lib/mockChalets');
        const chalets = getAllFromLocalStorage('chalets_');
        const allChalets = chalets.length > 0 ? chalets : MOCK_CHALETS;
        return countryCode 
          ? allChalets.filter((c: Chalet) => c.country_code === countryCode)
          : allChalets;
      }
      
      let query = (supabase as any).from("chalets").select("*");
      
      if (countryCode) {
        query = query.eq("country_code", countryCode);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Chalet[];
    },
    enabled: !!countryCode,
  });
};

// Fetch shipping carriers by country
export const useShippingCarriers = (countryCode?: string) => {
  return useQuery({
    queryKey: ["carriers", countryCode],
    queryFn: async () => {
      if (!SUPABASE_ENABLED) {
        const carriers = getAllFromLocalStorage('carriers_');
        return countryCode 
          ? carriers.filter((c: ShippingCarrier) => c.country_code === countryCode)
          : carriers;
      }
      
      let query = (supabase as any).from("shipping_carriers").select("*");
      
      if (countryCode) {
        query = query.eq("country_code", countryCode);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as ShippingCarrier[];
    },
    enabled: !!countryCode,
  });
};

// Create link
export const useCreateLink = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (linkData: {
      type: string;
      country_code: string;
      provider_id?: string;
      payload: any;
    }) => {
      const linkId = crypto.randomUUID();
      const productionDomain = import.meta.env.VITE_PRODUCTION_DOMAIN || window.location.origin;
      const serviceKey = linkData.payload?.service_key || linkData.payload?.service || 'payment';
      const micrositeUrl = `${productionDomain}/r/${linkData.country_code}/${linkData.type}/${linkId}?service=${serviceKey}`;
      const paymentUrl = `${productionDomain}/pay/${serviceKey}.html?service=${serviceKey}&payId=${linkId}`;

      const signature = btoa(encodeURIComponent(JSON.stringify(linkData.payload)));
      
      const linkRecord = {
        id: linkId,
        type: linkData.type,
        country_code: linkData.country_code,
        provider_id: linkData.provider_id || null,
        payload: linkData.payload,
        microsite_url: micrositeUrl,
        payment_url: paymentUrl,
        signature,
        status: "active",
        created_at: new Date().toISOString(),
      };
      
      if (!SUPABASE_ENABLED) {
        saveToLocalStorage(`links_${linkId}`, linkRecord);
        return linkRecord as Link;
      }
      
      const { data, error } = await (supabase as any)
        .from("links")
        .insert(linkRecord)
        .select()
        .maybeSingle();
      
      if (error) throw error;
      return data as Link;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      toast({
        title: "تم إنشاء الرابط",
        description: "تم إنشاء رابط الخدمة بنجاح",
      });
    },
    onError: (error: any) => {
      // Error creating link
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء إنشاء الرابط",
        variant: "destructive",
      });
    },
  });
};

// Fetch all links
export const useLinks = () => {
  return useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      if (!SUPABASE_ENABLED) {
        return getAllFromLocalStorage('links_');
      }
      
      const { data, error } = await (supabase as any)
        .from("links")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Link[];
    },
  });
};

// Fetch link by ID
export const useLink = (linkId?: string) => {
  return useQuery({
    queryKey: ["link", linkId],
    queryFn: async () => {
      if (!SUPABASE_ENABLED) {
        return getFromLocalStorage(`links_${linkId}`);
      }
      
      const { data, error } = await (supabase as any)
        .from("links")
        .select("*")
        .eq("id", linkId!)
        .maybeSingle();

      if (error) throw error;
      return data as Link | null;
    },
    enabled: !!linkId,
    retry: 2,
    staleTime: 30000,
  });
};

// Create payment
export const useCreatePayment = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (paymentData: {
      link_id: string;
      amount: number;
      currency: string;
    }) => {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      
      const paymentRecord = {
        id: crypto.randomUUID(),
        ...paymentData,
        otp,
        status: "pending",
        attempts: 0,
        locked_until: null,
        receipt_url: null,
        cardholder_name: null,
        last_four: null,
        created_at: new Date().toISOString(),
      };
      
      if (!SUPABASE_ENABLED) {
        saveToLocalStorage(`payments_${paymentRecord.id}`, paymentRecord);
        return paymentRecord as Payment;
      }
      
      const { data, error } = await (supabase as any)
        .from("payments")
        .insert(paymentRecord)
        .select()
        .maybeSingle();
      
      if (error) throw error;
      return data as Payment;
    },
    onError: (error: any) => {
      // Error creating payment
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء إنشاء الدفعة",
        variant: "destructive",
      });
    },
  });
};

// Fetch payment by ID
export const usePayment = (paymentId?: string) => {
  return useQuery({
    queryKey: ["payment", paymentId],
    queryFn: async () => {
      if (!SUPABASE_ENABLED) {
        return getFromLocalStorage(`payments_${paymentId}`);
      }
      
      const { data, error } = await (supabase as any)
        .from("payments")
        .select("*")
        .eq("id", paymentId!)
        .maybeSingle();

      if (error) throw error;
      return data as Payment | null;
    },
    enabled: !!paymentId,
    retry: 2,
    refetchInterval: SUPABASE_ENABLED ? 2000 : false,
  });
};

// Update payment (for OTP verification)
export const useUpdatePayment = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      paymentId,
      updates,
    }: {
      paymentId: string;
      updates: Partial<Payment>;
    }) => {
      if (!SUPABASE_ENABLED) {
        const existing = getFromLocalStorage(`payments_${paymentId}`);
        const updated = { ...existing, ...updates };
        saveToLocalStorage(`payments_${paymentId}`, updated);
        return updated as Payment;
      }
      
      const { data, error } = await (supabase as any)
        .from("payments")
        .update(updates)
        .eq("id", paymentId)
        .select()
        .maybeSingle();

      if (error) throw error;
      return data as Payment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment"] });
    },
    onError: (error: any) => {
      // Error updating payment
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء تحديث الدفعة",
        variant: "destructive",
      });
    },
  });
};

// Update link (for adding customer info to payment links)
export const useUpdateLink = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      linkId,
      payload,
    }: {
      linkId: string;
      payload: any;
    }) => {
      if (!SUPABASE_ENABLED) {
        const existing = getFromLocalStorage(`links_${linkId}`);
        const updated = { ...existing, payload };
        saveToLocalStorage(`links_${linkId}`, updated);
        return updated as Link;
      }
      
      const { data, error } = await (supabase as any)
        .from("links")
        .update({ payload })
        .eq("id", linkId)
        .select()
        .maybeSingle();

      if (error) throw error;
      return data as Link;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["link"] });
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
    onError: (error: any) => {
      // Error updating link
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive",
      });
    },
  });
};
