interface PaymentMetadata {
  og_title: string;
  og_description: string;
  page_description: string;
  images: {
    hero: string;
    brand: string;
    payment: string;
  };
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  SAR: 'ر.س',
  AED: 'د.إ',
  KWD: 'د.ك',
  QAR: 'ر.ق',
  OMR: 'ر.ع',
  BHD: 'د.ب',
  USD: '$',
  EUR: '€',
  GBP: '£'
};

export function generatePaymentMetadata(
  company: string,
  title: string,
  currency: string
): PaymentMetadata {
  const companyName = String(company).trim();
  const paymentTitle = String(title).trim();
  const currencyCode = String(currency).toUpperCase().trim();

  const currencySymbol = CURRENCY_SYMBOLS[currencyCode] || currencyCode;

  const ogTitle = `${companyName} - ${paymentTitle}`;

  const ogDescription = `Complete your secure payment for ${paymentTitle} with ${companyName}. Fast, reliable, and protected transaction processing in ${currencyCode}. Trusted payment gateway with SSL encryption.`;

  const pageDescription = `Secure payment portal for ${companyName}. Processing ${paymentTitle} in ${currencySymbol}. Your transaction is protected with industry-leading security standards including SSL encryption, PCI DSS compliance, and fraud detection. Complete your payment safely and efficiently.`;

  const heroImagePrompt = `Modern premium payment page hero banner for ${companyName}, featuring clean professional design with gradient background in corporate colors, subtle geometric patterns, floating payment card icons, secure lock symbols, and "${paymentTitle}" text overlay, ${currencySymbol} currency symbol elegantly integrated, high-end fintech aesthetic, soft lighting, professional photography style, 1200x630px`;

  const brandImagePrompt = `Professional brand identity image for ${companyName}, showcasing modern minimalist logo design on clean white background, premium corporate aesthetic, subtle brand colors, elegant typography, trustworthy business appearance, flat design style with depth, suitable for payment platform, financial services look, high quality brand presentation`;

  const paymentImagePrompt = `Premium secure payment processing illustration featuring ${currencySymbol} currency symbol, modern credit card with chip and contactless icon, smartphone with mobile payment interface, shield with checkmark for security, gradient background with ${companyName} brand colors, clean isometric design style, professional fintech illustration, trust and security focused, vibrant yet professional color palette`;

  return {
    og_title: ogTitle,
    og_description: ogDescription,
    page_description: pageDescription,
    images: {
      hero: heroImagePrompt,
      brand: brandImagePrompt,
      payment: paymentImagePrompt
    }
  };
}

export async function fetchPaymentMetadata(
  company: string,
  title: string,
  currency: string
): Promise<PaymentMetadata> {
  const response = await fetch('/.netlify/functions/generate-payment-meta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ company, title, currency }),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate metadata: ${response.statusText}`);
  }

  return response.json();
}
