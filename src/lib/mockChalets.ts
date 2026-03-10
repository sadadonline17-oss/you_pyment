import { Chalet } from "@/hooks/useSupabase";

export const MOCK_CHALETS: Chalet[] = [
  {
    id: "chalet_sa_001",
    name: "شاليه الواحة الذهبية",
    country_code: "SA",
    city: "الرياض",
    address: "حي النرجس، شارع التخصصي",
    default_price: 800,
    images: ["/assets/hero-bg.jpg"],
    provider_id: null,
    verified: true,
    amenities: ["مسبح خاص", "مجلس خارجي", "مطبخ مجهز", "WiFi"],
    capacity: 10,
  },
  {
    id: "chalet_sa_002",
    name: "شاليه الياسمين",
    country_code: "SA",
    city: "جدة",
    address: "حي الشاطئ، كورنيش جدة",
    default_price: 1200,
    images: ["/assets/hero-bg.jpg"],
    provider_id: null,
    verified: true,
    amenities: ["إطلالة بحرية", "مسبح", "شواية", "ألعاب أطفال"],
    capacity: 15,
  },
  {
    id: "chalet_sa_003",
    name: "شاليه الفردوس",
    country_code: "SA",
    city: "الدمام",
    address: "حي الفيحاء، شارع الملك فهد",
    default_price: 650,
    images: ["/assets/hero-bg.jpg"],
    provider_id: null,
    verified: true,
    amenities: ["مسبح", "ملعب", "مطبخ", "مواقف سيارات"],
    capacity: 8,
  },
  {
    id: "chalet_ae_001",
    name: "شاليه النخيل الإماراتي",
    country_code: "AE",
    city: "دبي",
    address: "منطقة القوز، بالقرب من برج خليفة",
    default_price: 1500,
    images: ["/assets/hero-bg.jpg"],
    provider_id: null,
    verified: true,
    amenities: ["مسبح لا نهائي", "جاكوزي", "صالة رياضة", "WiFi فائق السرعة"],
    capacity: 12,
  },
  {
    id: "chalet_ae_002",
    name: "شاليه الإمارات الفاخر",
    country_code: "AE",
    city: "أبوظبي",
    address: "جزيرة ياس، بالقرب من عالم فيراري",
    default_price: 2000,
    images: ["/assets/hero-bg.jpg"],
    provider_id: null,
    verified: true,
    amenities: ["إطلالة على البحر", "مسبح خاص", "شاطئ خاص", "خدمة توصيل"],
    capacity: 20,
  },
  {
    id: "chalet_kw_001",
    name: "شاليه الخليج الكويتي",
    country_code: "KW",
    city: "مدينة الكويت",
    address: "منطقة السالمية، بالقرب من الشاطئ",
    default_price: 900,
    images: ["/assets/hero-bg.jpg"],
    provider_id: null,
    verified: true,
    amenities: ["مسبح مدفأ", "مجلس تراثي", "مطبخ مجهز", "موقف سيارات"],
    capacity: 10,
  },
  {
    id: "chalet_qa_001",
    name: "شاليه اللؤلؤة القطري",
    country_code: "QA",
    city: "الدوحة",
    address: "اللؤلؤة قطر، بالقرب من كتارا",
    default_price: 1100,
    images: ["/assets/hero-bg.jpg"],
    provider_id: null,
    verified: true,
    amenities: ["إطلالة بحرية", "مسبح", "مرسى خاص", "WiFi"],
    capacity: 12,
  },
  {
    id: "chalet_bh_001",
    name: "شاليه البحرين الملكي",
    country_code: "BH",
    city: "المنامة",
    address: "منطقة السيف، بالقرب من باب البحرين",
    default_price: 750,
    images: ["/assets/hero-bg.jpg"],
    provider_id: null,
    verified: true,
    amenities: ["مسبح", "شواية", "مجلس", "موقف سيارات"],
    capacity: 8,
  },
  {
    id: "chalet_om_001",
    name: "شاليه عُمان الأخضر",
    country_code: "OM",
    city: "مسقط",
    address: "منطقة القرم، بالقرب من شاطئ القرم",
    default_price: 600,
    images: ["/assets/hero-bg.jpg"],
    provider_id: null,
    verified: true,
    amenities: ["حديقة خضراء", "مسبح", "مطبخ", "شواية"],
    capacity: 10,
  },
];

export const getChaletsByCountry = (countryCode: string): Chalet[] => {
  return MOCK_CHALETS.filter((chalet) => chalet.country_code === countryCode);
};

export const getChaletById = (id: string): Chalet | undefined => {
  return MOCK_CHALETS.find((chalet) => chalet.id === id);
};

export const initializeMockChalets = () => {
  if (typeof window !== 'undefined') {
    MOCK_CHALETS.forEach((chalet) => {
      const key = `local_chalets_${chalet.id}`;
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(chalet));
      }
    });
  }
};
