# Dynamic Identity System Documentation

## Overview

The Dynamic Identity System allows your payment application to automatically apply entity-specific branding, colors, fonts, logos, and visual elements based on the current context (chalets, government services, health services, etc.).

## Features

- ✅ **Auto-detection**: Automatically detects entity from URL parameters or path
- ✅ **Dynamic styling**: Colors, fonts, and button styles applied automatically
- ✅ **Animated headers**: Support for rotating header images
- ✅ **Logo integration**: Entity-specific logos display automatically
- ✅ **Background images**: Entity-specific background images
- ✅ **Payment share images**: Custom images for payment sharing
- ✅ **Responsive design**: Works on all devices
- ✅ **Easy integration**: Simple React components and hooks

## Available Entities

1. **chalets** - Chalet booking and reservation payments
2. **government_payment** - Government services payments
3. **local_payment** - Local payment services
4. **invoices** - Invoice display and payment
5. **contracts** - Contract management and payments
6. **health_links** - Healthcare services bookings
7. **bank_pages** - Bank-specific payment pages

## File Structure

```
src/
├── lib/
│   └── dynamicIdentity.ts           # Core configuration and utilities
├── components/
│   ├── DynamicIdentityProvider.tsx  # Context provider
│   ├── DynamicIdentityWrapper.tsx   # Wrapper component
│   ├── DynamicIdentityButton.tsx    # Styled buttons
│   └── DynamicIdentityTopBar.tsx    # Top navigation bar
├── hooks/
│   └── useDynamicIdentity.ts        # Custom hook
└── pages/
    ├── ChaletPayment.tsx            # Example: Chalet payment page
    ├── GovernmentPayment.tsx        # Example: Government payment page
    └── HealthPayment.tsx            # Example: Health payment page

public/
└── assets/
    └── dynamic-identity/
        ├── official_logo_chalets.png
        ├── chalets_image1.png
        ├── chalets_payment.png
        └── ... (other entity assets)
```

## Quick Start

### 1. Basic Usage with Provider

```tsx
import { DynamicIdentityProvider } from '@/components/DynamicIdentityProvider';

function MyPage() {
  return (
    <DynamicIdentityProvider entityKey="chalets">
      {/* Your page content */}
    </DynamicIdentityProvider>
  );
}
```

### 2. Using the Wrapper Component

```tsx
import { DynamicIdentityWrapper } from '@/components/DynamicIdentityProvider';

function MyPage() {
  return (
    <DynamicIdentityProvider entityKey="chalets">
      <DynamicIdentityWrapper
        entityKey="chalets"
        showLogo={true}
        showAnimatedHeader={true}
        variant="card"
      >
        {/* Your content */}
      </DynamicIdentityWrapper>
    </DynamicIdentityProvider>
  );
}
```

### 3. Using Dynamic Buttons

```tsx
import { DynamicIdentityButton } from '@/components/DynamicIdentityButton';

<DynamicIdentityButton 
  entityKey="chalets"
  variant="primary"
  onClick={handleClick}
>
  إتمام الدفع
</DynamicIdentityButton>
```

### 4. Using the Top Bar

```tsx
import { DynamicIdentityTopBar } from '@/components/DynamicIdentityTopBar';

<DynamicIdentityTopBar 
  entityKey="government_payment"
  title="بوابة الدفع الحكومي"
  showLogo={true}
/>
```

### 5. Using the Hook

```tsx
import { useDynamicIdentity } from '@/components/DynamicIdentityProvider';

function MyComponent() {
  const { identity, currentEntity, setEntity } = useDynamicIdentity();
  
  return (
    <div style={{ backgroundColor: identity?.colors.background }}>
      Current entity: {currentEntity}
    </div>
  );
}
```

## Configuration

### Entity Configuration Structure

```typescript
{
  logo: string;                        // Logo filename
  animated_header_images: string[];    // Array of header images
  header_position: 'below_top_bar' | 'top' | 'center';
  payment_share_image: string;         // Share image filename
  payment_share_description: string;   // Arabic description
  colors: {
    primary: string;                   // Hex color
    secondary: string;                 // Hex color
    background: string;                // Hex color
  };
  fonts: string[];                     // Font family names
  buttons: {
    style: 'rounded' | 'flat' | 'sharp';
    hover: 'darken' | 'highlight' | 'scale';
  };
  background_images: string[];         // Background image filenames
  auto_apply: boolean;                 // Auto-apply on load
}
```

### Adding a New Entity

Edit `src/lib/dynamicIdentity.ts`:

```typescript
export const dynamicIdentityConfig: DynamicIdentityConfig = {
  entities: {
    my_new_entity: {
      logo: 'my_entity_logo.png',
      animated_header_images: ['header1.png', 'header2.png'],
      header_position: 'below_top_bar',
      payment_share_image: 'share_image.png',
      payment_share_description: 'وصف الخدمة',
      colors: { 
        primary: '#FF0000', 
        secondary: '#00FF00', 
        background: '#F0F0F0' 
      },
      fonts: ['Arial', 'Helvetica'],
      buttons: { style: 'rounded', hover: 'darken' },
      background_images: ['bg.png'],
      auto_apply: true,
    },
    // ... other entities
  },
  // ...
};
```

## CSS Variables

The system automatically injects CSS variables that you can use:

```css
--dynamic-primary          /* Primary color */
--dynamic-secondary        /* Secondary color */
--dynamic-background       /* Background color */
--dynamic-font-primary     /* Primary font family */
--dynamic-font-secondary   /* Secondary font family */
--dynamic-button-radius    /* Button border radius */
```

### Using CSS Variables in Your Components

```tsx
<div style={{ backgroundColor: 'var(--dynamic-primary)' }}>
  Content
</div>
```

Or with CSS classes:

```tsx
<div className="dynamic-primary-bg">
  Content
</div>
```

## Available CSS Classes

```css
.dynamic-primary-bg        /* Primary background color */
.dynamic-secondary-bg      /* Secondary background color */
.dynamic-bg                /* Entity background color */
.dynamic-primary-text      /* Primary text color */
.dynamic-secondary-text    /* Secondary text color */
.dynamic-font-primary      /* Primary font family */
.dynamic-font-secondary    /* Secondary font family */
.dynamic-button            /* Styled button */
.dynamic-card              /* Styled card */
.dynamic-gradient          /* Gradient background */
```

## URL Detection

The system can automatically detect the entity from:

1. **URL Parameters**: `?entity=chalets` or `?type=government_payment`
2. **Path Detection**: Automatically detects from path keywords
   - `/chalet` → chalets
   - `/government` or `/gov` → government_payment
   - `/health` → health_links
   - `/invoice` → invoices
   - `/contract` → contracts
   - `/bank` → bank_pages

Example URLs:
- `https://yourapp.com/payment?entity=chalets`
- `https://yourapp.com/chalet-payment`
- `https://yourapp.com/government-payment`

## Asset Requirements

Place all entity assets in: `public/assets/dynamic-identity/`

### Required Assets per Entity

For each entity, you need:

1. **Logo**: `official_logo_[entity].png` (recommended: 200x60px, transparent PNG)
2. **Header Images**: `[entity]_image1.png`, `[entity]_image2.png`, etc. (recommended: 1200x400px)
3. **Payment Share Image**: `[entity]_payment.png` (recommended: 1200x630px for social sharing)
4. **Background Images**: `[entity]_bg1.png`, `[entity]_bg2.png` (optional)

### Generating Placeholder Assets

Run the provided script:

```bash
npm run generate-identity-assets
```

Or manually create placeholder images using the script in `scripts/generate-identity-assets.js`

## Example Pages

### Chalet Payment Page
URL: `/chalet-payment` or `?entity=chalets`

### Government Payment Page
URL: `/government-payment` or `?entity=government_payment`

### Health Services Page
URL: `/health-payment` or `?entity=health_links`

## API Reference

### getEntityIdentity(entityKey: string)
Returns the configuration for a specific entity.

```typescript
import { getEntityIdentity } from '@/lib/dynamicIdentity';
const identity = getEntityIdentity('chalets');
```

### applyDynamicIdentity(entityKey: string)
Applies the CSS variables for an entity.

```typescript
import { applyDynamicIdentity } from '@/lib/dynamicIdentity';
applyDynamicIdentity('chalets');
```

### detectEntityFromURL()
Detects entity from current URL.

```typescript
import { detectEntityFromURL } from '@/lib/dynamicIdentity';
const entity = detectEntityFromURL(); // Returns 'chalets' or null
```

### getEntityLogo(entityKey: string)
Returns the logo path for an entity.

```typescript
import { getEntityLogo } from '@/lib/dynamicIdentity';
const logoPath = getEntityLogo('chalets'); // '/assets/dynamic-identity/official_logo_chalets.png'
```

## Best Practices

1. **Always wrap pages with DynamicIdentityProvider**
2. **Use entity-specific components** (DynamicIdentityButton, etc.) for consistency
3. **Place assets in correct directory** structure
4. **Test with different entities** to ensure proper styling
5. **Use semantic colors** from the identity configuration
6. **Provide fallbacks** for missing assets
7. **Use auto-detection** when possible to reduce manual configuration

## Troubleshooting

### Identity not applying?
- Check that DynamicIdentityProvider wraps your component
- Verify entityKey is correct
- Check console for errors

### Assets not loading?
- Verify files are in `/public/assets/dynamic-identity/`
- Check file names match configuration exactly
- Clear browser cache

### Colors not changing?
- Ensure auto_apply is true in configuration
- Check that CSS variables are being set (inspect element)
- Verify no conflicting inline styles

## Advanced Usage

### Custom Identity Detection

```typescript
import { useDynamicIdentityHook } from '@/hooks/useDynamicIdentity';

function MyComponent() {
  const { identity, changeEntity } = useDynamicIdentityHook();
  
  const handleBankSelect = (bank: string) => {
    changeEntity(`bank_${bank}`);
  };
  
  return (
    // Your component
  );
}
```

### Conditional Rendering Based on Entity

```typescript
const { currentEntity } = useDynamicIdentity();

if (currentEntity === 'chalets') {
  return <ChaletSpecificContent />;
} else if (currentEntity === 'government_payment') {
  return <GovernmentSpecificContent />;
}
```

## Support

For issues or questions, please refer to the main project documentation or contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: December 2025
