# 🎯 Payment Metadata Generator

Dynamic metadata, images, and descriptions generator for payment pages.

## Overview

This system generates professional, SEO-optimized metadata for payment pages including:
- OpenGraph metadata (og:title, og:description)
- Dynamic page descriptions
- AI-optimized image generation prompts (hero, brand, payment)

## Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `company` | string | Yes | Company/organization name |
| `title` | string | Yes | Payment reason or title |
| `currency` | string | Yes | Currency code (SAR, AED, USD, etc.) |

## Output Format

```json
{
  "og_title": "Company - Payment Title",
  "og_description": "Complete your secure payment for Payment Title with Company...",
  "page_description": "Secure payment portal for Company. Processing Payment Title in ر.س...",
  "images": {
    "hero": "Modern premium payment page hero banner for Company...",
    "brand": "Professional brand identity image for Company...",
    "payment": "Premium secure payment processing illustration featuring..."
  }
}
```

## Usage

### 1. Via API (Netlify Function)

#### POST Request
```bash
curl -X POST https://your-domain.netlify.app/.netlify/functions/generate-payment-meta \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Aramex Express",
    "title": "Shipping Fee Payment",
    "currency": "SAR"
  }'
```

#### GET Request
```bash
curl "https://your-domain.netlify.app/.netlify/functions/generate-payment-meta?company=Aramex&title=Shipping%20Fee&currency=SAR"
```

### 2. Via JavaScript/TypeScript

```typescript
import { generatePaymentMetadata, fetchPaymentMetadata } from '@/utils/generatePaymentMeta';

// Client-side generation (synchronous)
const metadata = generatePaymentMetadata(
  'Aramex Express',
  'Shipping Fee Payment',
  'SAR'
);

console.log(metadata.og_title);
console.log(metadata.og_description);
console.log(metadata.images.hero);

// Server-side fetch (asynchronous)
const metadata = await fetchPaymentMetadata(
  'DHL Express',
  'COD Payment',
  'AED'
);
```

### 3. Via React Component

```tsx
import { useState, useEffect } from 'react';
import { fetchPaymentMetadata } from '@/utils/generatePaymentMeta';

function PaymentPage() {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    async function loadMetadata() {
      const meta = await fetchPaymentMetadata(
        'SMSA Express',
        'Invoice #12345',
        'SAR'
      );
      setMetadata(meta);
    }
    loadMetadata();
  }, []);

  if (!metadata) return <div>Loading...</div>;

  return (
    <div>
      <h1>{metadata.og_title}</h1>
      <p>{metadata.page_description}</p>
    </div>
  );
}
```

## Supported Currencies

| Code | Currency | Symbol |
|------|----------|--------|
| SAR | Saudi Riyal | ر.س |
| AED | UAE Dirham | د.إ |
| KWD | Kuwaiti Dinar | د.ك |
| QAR | Qatari Riyal | ر.ق |
| OMR | Omani Rial | ر.ع |
| BHD | Bahraini Dinar | د.ب |
| USD | US Dollar | $ |
| EUR | Euro | € |
| GBP | British Pound | £ |

## Image Prompts

The generator creates 3 optimized prompts for image generation:

### 1. Hero Banner
- Professional payment page header
- Corporate colors and branding
- Payment icons and security symbols
- 1200x630px optimized

### 2. Brand Image
- Minimalist logo presentation
- Clean corporate aesthetic
- Trust-focused design
- High-quality brand representation

### 3. Payment Illustration
- Currency-specific visuals
- Payment method icons
- Security and trust elements
- Modern fintech style

## Testing

Access the test interface at:
```
https://your-domain.netlify.app/test-payment-meta-generator.html
```

Or run locally:
```bash
npm run dev
# Visit: http://localhost:5173/test-payment-meta-generator.html
```

## API Response Examples

### Example 1: Saudi Shipping Company
```json
{
  "og_title": "SMSA Express - COD Payment",
  "og_description": "Complete your secure payment for COD Payment with SMSA Express. Fast, reliable, and protected transaction processing in SAR. Trusted payment gateway with SSL encryption.",
  "page_description": "Secure payment portal for SMSA Express. Processing COD Payment in ر.س. Your transaction is protected with industry-leading security standards including SSL encryption, PCI DSS compliance, and fraud detection. Complete your payment safely and efficiently.",
  "images": {
    "hero": "Modern premium payment page hero banner for SMSA Express, featuring clean professional design with gradient background in corporate colors, subtle geometric patterns, floating payment card icons, secure lock symbols, and \"COD Payment\" text overlay, ر.س currency symbol elegantly integrated, high-end fintech aesthetic, soft lighting, professional photography style, 1200x630px",
    "brand": "Professional brand identity image for SMSA Express, showcasing modern minimalist logo design on clean white background, premium corporate aesthetic, subtle brand colors, elegant typography, trustworthy business appearance, flat design style with depth, suitable for payment platform, financial services look, high quality brand presentation",
    "payment": "Premium secure payment processing illustration featuring ر.س currency symbol, modern credit card with chip and contactless icon, smartphone with mobile payment interface, shield with checkmark for security, gradient background with SMSA Express brand colors, clean isometric design style, professional fintech illustration, trust and security focused, vibrant yet professional color palette"
  }
}
```

### Example 2: UAE Logistics Company
```json
{
  "og_title": "Aramex - Invoice #54321",
  "og_description": "Complete your secure payment for Invoice #54321 with Aramex. Fast, reliable, and protected transaction processing in AED. Trusted payment gateway with SSL encryption.",
  "page_description": "Secure payment portal for Aramex. Processing Invoice #54321 in د.إ. Your transaction is protected with industry-leading security standards including SSL encryption, PCI DSS compliance, and fraud detection. Complete your payment safely and efficiently.",
  "images": {
    "hero": "Modern premium payment page hero banner for Aramex, featuring clean professional design with gradient background in corporate colors, subtle geometric patterns, floating payment card icons, secure lock symbols, and \"Invoice #54321\" text overlay, د.إ currency symbol elegantly integrated, high-end fintech aesthetic, soft lighting, professional photography style, 1200x630px",
    "brand": "Professional brand identity image for Aramex, showcasing modern minimalist logo design on clean white background, premium corporate aesthetic, subtle brand colors, elegant typography, trustworthy business appearance, flat design style with depth, suitable for payment platform, financial services look, high quality brand presentation",
    "payment": "Premium secure payment processing illustration featuring د.إ currency symbol, modern credit card with chip and contactless icon, smartphone with mobile payment interface, shield with checkmark for security, gradient background with Aramex brand colors, clean isometric design style, professional fintech illustration, trust and security focused, vibrant yet professional color palette"
  }
}
```

## Features

✅ **Dynamic Content**: All metadata reflects input parameters  
✅ **Professional Tone**: Trustworthy and clean language  
✅ **SEO Optimized**: Proper OpenGraph structure  
✅ **Currency Smart**: Automatic symbol mapping  
✅ **Image Ready**: Optimized prompts for AI image generation  
✅ **No Extra Fields**: Clean JSON output only  

## Error Handling

The API returns proper HTTP status codes:

- `200`: Success
- `400`: Missing required parameters
- `500`: Internal server error

Example error response:
```json
{
  "error": "Missing required parameters: company, title, currency"
}
```

## Integration with Existing System

This generator integrates seamlessly with:
- `@/utils/companyMeta.ts` - Existing company metadata
- `@/components/DynamicMetaTags.tsx` - React meta tag components
- `netlify/functions/microsite-meta.js` - Server-side rendering

## Deployment

The function is automatically deployed with Netlify:

1. Push changes to repository
2. Netlify automatically builds and deploys
3. Function available at `/.netlify/functions/generate-payment-meta`

## License

Part of the Youssef-Dafa payment platform.
