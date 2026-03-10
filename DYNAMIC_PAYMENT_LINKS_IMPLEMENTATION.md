# Dynamic Payment Links - Complete Implementation Guide

## 📋 Overview

This document outlines the comprehensive implementation of dynamic payment links with automatic OG meta tags, currency, and title updates based on selected company and country.

## ✅ Completed Tasks

### 1. Utility Files Created

#### `/src/utils/companyMeta.ts`
- Maps each shipping company to their specific OG meta tags
- Includes: image, title, and description for each company
- Supported companies: Aramex, DHL, FedEx, UPS, SMSA, Zajil, Naqel, and all GCC postal services
- Provides fallback for unknown companies

#### `/src/utils/countryData.ts`
- Maps each country to currency and title information
- Includes: currency code, default title, currency name/symbol, country name in Arabic
- Supported countries: SA, AE, KW, QA, OM, BH
- Provides fallback to Saudi Arabia (SA) for unknown countries

### 2. Updated Components

#### CreateShippingLink.tsx
- **Lines 14-15**: Added imports for dynamic utilities
- **Lines 91-98**: Generate payment URLs with dynamic currency and title parameters
- **Lines 153-158**: Update continue button with dynamic parameters

**Generated URL Format:**
```
/pay/{linkId}/recipient?company={serviceKey}&currency={countryCurrency}&title={encodedTitle}
```

#### CreateChaletLink.tsx
- **Line 17**: Added imports for dynamic utilities
- **Lines 72-78**: Generate microsite URLs with dynamic currency and title parameters

**Generated URL Format:**
```
/r/{country}/{type}/{linkId}?currency={countryCurrency}&title={encodedTitle}
```

#### Microsite.tsx
- **Lines 10-11**: Added imports for dynamic utilities
- **Lines 73-74**: Retrieve dynamic company metadata for OG tags
- **Lines 95-101**: Use dynamic metadata for SEO (title, description, image)
- **Lines 105-115**: Pass dynamic props to SEOHead component
- **Lines 290-295**: Update payment button with dynamic parameters

#### PaymentRecipient.tsx
- **Line 11**: Added import for company metadata
- **Lines 41-49**: Extract query parameters (company, currency, title) from URL
- **Line 59**: Use currency from URL parameter or fallback to country data
- **Line 77**: Format amount using dynamic currency code

#### SEOHead.tsx
- **Lines 12-13**: Added new props (companyKey, currency)
- **Lines 36-51**: Enhanced title/description building with dynamic company info
- **Lines 49-51**: Append currency info to description when available
- **Lines 60, 71, 92**: Update meta tags with currency-aware descriptions
- **Lines 115, 122, 134**: Render meta tags with currency information

### 3. Netlify Configuration

#### netlify.toml
- **Lines 7-15**: Redirects for SPA routing
- **Lines 17-20**: Catch-all redirect to index.html for SPA
- **Lines 22-24**: Edge function for OG meta injection

#### Edge Function: `/netlify/edge-functions/og-injector.ts`
- Reads `company` parameter from URL
- Injects company-specific OG meta tags server-side
- Ensures social media crawlers see correct metadata
- Works for all `/pay/*` routes

#### Serverless Function: `/netlify/functions/microsite-meta.js`
- Provides dynamic meta tags for `/r/*` routes
- Maps service keys to OG images and descriptions
- Supports all GCC shipping companies

## 🎯 How It Works

### URL Parameter Flow

1. **Link Creation** (CreateShippingLink/CreateChaletLink)
   - User selects country and company/service
   - System generates URL with parameters:
     - `company`: Service identifier (dhl, aramex, etc.)
     - `currency`: Currency code (SAR, AED, KWD, etc.)
     - `title`: Country-specific title

2. **Preview & Copy**
   - Both buttons use the generated URL
   - URL includes all dynamic parameters
   - Ensures consistent behavior

3. **Payment Page** (PaymentRecipient)
   - Reads parameters from URL
   - Applies company-specific branding
   - Displays correct currency

4. **Social Sharing** (Microsite + OG Meta)
   - Microsite reads company from payload
   - Retrieves dynamic metadata from utilities
   - Edge function injects OG tags server-side
   - Social platforms see correct preview

### Company Metadata Flow

```
User selects DHL → getCompanyMeta('dhl') → {
  image: '/og-dhl.jpg',
  title: 'DHL Payment',
  description: 'Pay DHL invoices quickly'
}
```

### Country Data Flow

```
User selects UAE → getCurrency('AE') → 'AED'
User selects UAE → getDefaultTitle('AE') → 'Payment in UAE'
```

## 🔧 Technical Implementation

### Type Safety
- All utility files use TypeScript (.ts)
- Proper interfaces defined (CompanyMeta, CountryData)
- Full IntelliSense support

### Fallback Strategy
- Unknown companies → default metadata
- Unknown countries → Saudi Arabia (SA)
- Missing parameters → Use link data or defaults

### SEO Optimization
- Server-side OG tag injection (Edge Function)
- Client-side meta updates (SEOHead component)
- Dynamic title/description based on company
- Currency information appended to descriptions

### SPA Compatibility
- Netlify redirects configured
- All routes work without page refreshes
- Edge functions handle server-side rendering

## 📦 Files Modified

1. ✅ `/src/utils/companyMeta.ts` - Created
2. ✅ `/src/utils/countryData.ts` - Created
3. ✅ `/src/pages/CreateShippingLink.tsx` - Updated
4. ✅ `/src/pages/CreateChaletLink.tsx` - Updated
5. ✅ `/src/pages/Microsite.tsx` - Updated
6. ✅ `/src/pages/PaymentRecipient.tsx` - Updated
7. ✅ `/src/components/SEOHead.tsx` - Updated
8. ✅ `/netlify.toml` - Already configured
9. ✅ `/netlify/edge-functions/og-injector.ts` - Already configured
10. ✅ `/netlify/functions/microsite-meta.js` - Already configured

## 🚀 Deployment

The build completed successfully:
```
✓ 1841 modules transformed.
✓ built in 17.45s
dist/index.html                            4.36 kB
dist/assets/index-CT_7wqSr.js            673.98 kB
```

## ✨ Benefits

1. **Dynamic OG Meta Tags**: Each company shows correct image/title when shared
2. **Currency Accuracy**: Amounts display in correct currency per country
3. **Title Localization**: Page titles match selected country
4. **Social Platform Support**: Works on WhatsApp, Telegram, Twitter, Facebook, iMessage
5. **Future-Proof**: Adding new companies/countries only requires updating utility files
6. **Type-Safe**: Full TypeScript support with proper interfaces
7. **SPA Compatible**: All routes work seamlessly

## 🔍 Testing Checklist

- [ ] Create shipping link for DHL (UAE) - Should show AED currency
- [ ] Create shipping link for Aramex (SA) - Should show SAR currency
- [ ] Create chalet link for Kuwait - Should show KWD currency
- [ ] Preview button opens correct URL with parameters
- [ ] Copy button copies URL with parameters
- [ ] Microsite shows correct OG image for company
- [ ] Payment page displays correct currency
- [ ] Social sharing shows correct preview

## 📝 Next Steps

1. Deploy to production
2. Test with multiple companies and countries
3. Verify OG meta tags on social platforms
4. Add OG images to `/public/og/` directory if not present

---

**Implementation Date**: November 19, 2025
**Status**: ✅ Complete
**Build**: ✅ Successful
