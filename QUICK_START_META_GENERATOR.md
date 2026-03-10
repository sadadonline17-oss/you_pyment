# 🚀 Quick Start: Payment Metadata Generator

## What It Does

Generates dynamic OpenGraph metadata and AI image prompts for payment pages in one simple call.

## Input → Output

**Input:**
```json
{
  "company": "Aramex Express",
  "title": "Shipping Fee Payment", 
  "currency": "SAR"
}
```

**Output:**
```json
{
  "og_title": "Aramex Express - Shipping Fee Payment",
  "og_description": "Complete your secure payment for Shipping Fee Payment with Aramex Express. Fast, reliable, and protected transaction processing in SAR. Trusted payment gateway with SSL encryption.",
  "page_description": "Secure payment portal for Aramex Express. Processing Shipping Fee Payment in ر.س. Your transaction is protected with industry-leading security standards including SSL encryption, PCI DSS compliance, and fraud detection. Complete your payment safely and efficiently.",
  "images": {
    "hero": "Modern premium payment page hero banner for Aramex Express...",
    "brand": "Professional brand identity image for Aramex Express...",
    "payment": "Premium secure payment processing illustration featuring ر.س currency symbol..."
  }
}
```

## 3 Ways to Use It

### 1️⃣ Interactive Web Interface (Easiest)

Visit: `/test-payment-meta-generator.html`

1. Enter company name
2. Enter payment title
3. Select currency
4. Click "Generate Metadata"
5. Copy JSON output

### 2️⃣ API Call (Most Flexible)

```bash
curl -X POST https://your-domain.netlify.app/.netlify/functions/generate-payment-meta \
  -H "Content-Type: application/json" \
  -d '{"company":"SMSA","title":"COD Payment","currency":"SAR"}'
```

### 3️⃣ In Your Code (Best for Integration)

```typescript
import { generatePaymentMetadata } from '@/utils/generatePaymentMeta';

const meta = generatePaymentMetadata('DHL', 'Invoice #123', 'AED');

console.log(meta.og_title);        // DHL - Invoice #123
console.log(meta.og_description);  // Complete your secure payment...
console.log(meta.images.hero);     // Modern premium payment page...
```

## Supported Currencies

`SAR` `AED` `KWD` `QAR` `OMR` `BHD` `USD` `EUR` `GBP`

## Example Use Cases

### Shipping Companies
```json
{
  "company": "SMSA Express",
  "title": "COD Delivery Payment",
  "currency": "SAR"
}
```

### E-commerce
```json
{
  "company": "Al Shaya Group",
  "title": "Order #45678",
  "currency": "KWD"
}
```

### Services
```json
{
  "company": "Aramex",
  "title": "Monthly Subscription",
  "currency": "AED"
}
```

### Invoices
```json
{
  "company": "Business Solutions LLC",
  "title": "Invoice Q4-2024",
  "currency": "OMR"
}
```

## What You Get

✅ **SEO-optimized titles** - Perfect for search engines and social sharing  
✅ **Professional descriptions** - Trust-building language highlighting security  
✅ **AI image prompts** - Ready for Midjourney, DALL-E, Stable Diffusion  
✅ **Currency-aware** - Automatic symbol mapping (ر.س, د.إ, $, etc.)  
✅ **Zero extra fields** - Clean, predictable JSON structure  

## Image Prompts Explained

### Hero Image Prompt
Perfect for page banners. Includes:
- Company branding
- Payment title overlay
- Security symbols
- Currency integration
- 1200x630px optimized

### Brand Image Prompt
For logo/brand sections. Features:
- Minimalist design
- Professional aesthetic
- Clean backgrounds
- Trust-focused

### Payment Image Prompt
For payment sections. Contains:
- Currency symbols
- Card illustrations
- Security badges
- Modern fintech style

## Testing

Run the test suite:
```bash
node test-meta-generator.cjs
```

Expected output: 3 successful test cases with full JSON responses.

## Deployment

✅ Automatically deployed with Netlify  
✅ No additional configuration needed  
✅ Available at `/.netlify/functions/generate-payment-meta`  

## Support

- Full docs: See `PAYMENT_META_GENERATOR.md`
- Test interface: `/test-payment-meta-generator.html`
- Test script: `test-meta-generator.cjs`
- Source code: `netlify/functions/generate-payment-meta.js`

---

**Ready to use!** 🎉
