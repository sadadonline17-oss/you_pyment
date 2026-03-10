/**
 * NON-GOVERNMENT PAYMENT GATEWAY VISUAL SYSTEMS
 * Maps non-government services to payment gateway visual styles based on country
 * 
 * This file ensures all non-government payment link pages use professional
 * payment gateway designs (SADAD, eDirham, KNET, NAPS, BenefitPay, Thawani)
 * instead of generic templates.
 */

import { governmentPaymentSystems, type GovernmentPaymentSystem } from './governmentPaymentSystems';
import { isGovernmentService } from './governmentPaymentServices';

export interface PaymentGatewayVisuals {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textLight: string;
    textOnPrimary: string;
    border: string;
  };
  fonts: {
    primaryAr: string;
    primary: string;
    secondary: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    header: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  gatewayName: string;
  gatewayNameAr: string;
}

/**
 * Get payment gateway visuals for non-government services based on country
 * Returns the official payment gateway design system for the specified country
 * 
 * @param countryCode - ISO country code (SA, AE, KW, QA, OM, BH)
 * @param serviceKey - Service identifier to check if government service
 * @returns Payment gateway visual system
 */
export function getNonGovPaymentGatewayVisuals(
  countryCode: string,
  serviceKey?: string
): PaymentGatewayVisuals {
  // If it's a government service, return null (should not be styled by this function)
  if (serviceKey && isGovernmentService(serviceKey)) {
    throw new Error('Government services should not use this function. Use governmentPaymentSystems directly.');
  }

  const code = countryCode.toUpperCase();
  const gatewaySystem = governmentPaymentSystems[code] || governmentPaymentSystems.SA;

  return {
    colors: gatewaySystem.colors,
    fonts: gatewaySystem.fonts,
    gradients: gatewaySystem.gradients,
    shadows: gatewaySystem.shadows,
    borderRadius: gatewaySystem.borderRadius,
    gatewayName: gatewaySystem.nameEn,
    gatewayNameAr: gatewaySystem.nameAr,
  };
}

/**
 * Get payment gateway logo based on country for non-government services
 * 
 * @param countryCode - ISO country code
 * @returns Logo URL for the payment gateway
 */
export function getNonGovPaymentGatewayLogo(countryCode: string): string {
  const code = countryCode.toUpperCase();
  const gatewaySystem = governmentPaymentSystems[code] || governmentPaymentSystems.SA;
  return gatewaySystem.logo || '';
}

/**
 * Check if a service should use payment gateway visuals
 * Returns true for non-government services
 * 
 * @param serviceKey - Service identifier
 * @returns boolean indicating if gateway visuals should be applied
 */
export function shouldUsePaymentGatewayVisuals(serviceKey?: string): boolean {
  if (!serviceKey) return true; // Default to gateway visuals
  return !isGovernmentService(serviceKey);
}

/**
 * Get payment gateway description for non-government services
 * Returns localized description of the payment gateway
 * 
 * @param countryCode - ISO country code
 * @returns Object with Arabic and English descriptions
 */
export function getNonGovPaymentGatewayDescription(countryCode: string): {
  ar: string;
  en: string;
} {
  const code = countryCode.toUpperCase();
  const descriptions: Record<string, { ar: string; en: string }> = {
    SA: {
      ar: 'نظام الدفع الوطني - سداد',
      en: 'National Payment System - SADAD',
    },
    AE: {
      ar: 'نظام الدفع الإلكتروني - الدرهم الإلكتروني',
      en: 'Electronic Payment System - eDirham',
    },
    KW: {
      ar: 'شبكة الكويت الوطنية للمدفوعات - كي نت',
      en: 'Kuwait National Payment Network - KNET',
    },
    QA: {
      ar: 'بوابة قطر للخدمات الإلكترونية - حكومي',
      en: 'Qatar e-Government Services Portal - Hukoomi',
    },
    OM: {
      ar: 'منصة المدفوعات العمانية - ثواني',
      en: 'Oman Payment Platform - Thawani',
    },
    BH: {
      ar: 'الشبكة الإلكترونية للمعاملات المالية - بنفت',
      en: 'Electronic Network for Financial Transactions - BENEFIT',
    },
  };

  return descriptions[code] || descriptions.SA;
}

/**
 * Apply payment gateway styling to element
 * Helper function to generate inline styles for payment gateway branding
 * 
 * @param countryCode - ISO country code
 * @param styleType - Type of styling to apply (header, button, card, input)
 * @returns CSS style object
 */
export function getPaymentGatewayStyle(
  countryCode: string,
  styleType: 'header' | 'button' | 'card' | 'input' | 'background'
): React.CSSProperties {
  const visuals = getNonGovPaymentGatewayVisuals(countryCode);

  const styles: Record<string, React.CSSProperties> = {
    header: {
      background: visuals.gradients.header,
      borderBottom: `3px solid ${visuals.colors.primary}`,
      boxShadow: visuals.shadows.md,
    },
    button: {
      background: visuals.gradients.primary,
      color: visuals.colors.textOnPrimary,
      borderRadius: visuals.borderRadius.md,
      boxShadow: `0 8px 24px -8px ${visuals.colors.primary}70`,
      fontFamily: visuals.fonts.primaryAr,
    },
    card: {
      background: visuals.colors.surface,
      borderRadius: visuals.borderRadius.lg,
      borderTop: `4px solid ${visuals.colors.primary}`,
      boxShadow: visuals.shadows.lg,
    },
    input: {
      borderColor: visuals.colors.border,
      borderRadius: visuals.borderRadius.sm,
      fontFamily: visuals.fonts.primary,
    },
    background: {
      background: `linear-gradient(135deg, ${visuals.colors.background}, ${visuals.colors.surface})`,
      fontFamily: visuals.fonts.primaryAr,
    },
  };

  return styles[styleType];
}
