// Government Payment Systems Configuration
// تكوين أنظمة الدفع الحكومية لدول الخليج

export interface GovernmentPaymentSystem {
  countryCode: string;
  nameAr: string;
  nameEn: string;
  description: string;
  logo?: string;
  heroImage?: string;
  website?: string;
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
}

export const governmentPaymentSystems: Record<string, GovernmentPaymentSystem> = {
  // المملكة العربية السعودية - سداد (SADAD)
  // Official SADAD branding: Orange #F58220, minimal clean design
  SA: {
    countryCode: 'SA',
    nameAr: 'سداد',
    nameEn: 'SADAD',
    description: 'نظام المدفوعات الوطني للخدمات الحكومية والفواتير',
    logo: '/gov-sadad-official.png',
    heroImage: '/gov-sadad-official.png',
    website: 'https://www.sadad.com/',
    colors: {
      primary: '#F58220',
      secondary: '#E67317',
      accent: '#FFFFFF',
      background: '#F9FAFB',
      surface: '#FFFFFF',
      text: '#1F2937',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primaryAr: 'Cairo',
      primary: 'Inter',
      secondary: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(to right, #F58220, #E67317)',
      secondary: 'linear-gradient(135deg, #E67317, #F58220)',
      header: 'linear-gradient(to right, #F58220, #E67317)',
    },
    shadows: {
      sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
    },
  },

  // دولة الإمارات العربية المتحدة - الدرهم الإلكتروني (eDirham)
  // Official eDirham branding: Orange #FF9933, Gray #666666 (from official branding)
  // Reference: https://www.behance.net/gallery/783327/E-Dirham-Branding
  AE: {
    countryCode: 'AE',
    nameAr: 'الدرهم الإلكتروني',
    nameEn: 'eDirham',
    description: 'نظام الدفع الإلكتروني الحكومي',
    logo: '/gov-uae-logo.jpg',
    heroImage: '/gov-uae-logo.jpg',
    website: 'https://www.mof.gov.ae/',
    colors: {
      primary: '#FF9933',
      secondary: '#FF7700',
      accent: '#666666',
      background: '#F8F9FA',
      surface: '#FFFFFF',
      text: '#333333',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primaryAr: 'Cairo',
      primary: 'Arial',
      secondary: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(to right, #FF9933, #FF7700)',
      secondary: 'linear-gradient(135deg, #FF7700, #FF9933)',
      header: 'linear-gradient(to right, #FF9933, #FF7700)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      lg: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    borderRadius: {
      sm: '4px',
      md: '6px',
      lg: '8px',
    },
  },

  // دولة الكويت - كي نت (KNET)
  // Official Kuwait flag colors: Green #007A3D, Red #CE1126, Black #000000
  KW: {
    countryCode: 'KW',
    nameAr: 'كي نت',
    nameEn: 'KNET',
    description: 'شبكة الكويت الوطنية للمدفوعات الإلكترونية',
    logo: '/gov-knet-logo.png',
    heroImage: '/gov-knet-logo.png',
    website: 'https://www.kpay.com.kw/',
    colors: {
      primary: '#007A3D',
      secondary: '#CE1126',
      accent: '#000000',
      background: '#F5F5F5',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primaryAr: 'Cairo',
      primary: 'Inter',
      secondary: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(to right, #007A3D, #CE1126, #000000)',
      secondary: 'linear-gradient(135deg, #CE1126, #000000)',
      header: 'linear-gradient(to right, #007A3D 0%, #CE1126 50%, #000000 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
    },
  },

  // دولة قطر - حكومي Hukoomi
  // Official Qatar Maroon: #8D1B3D (Qatar flag color)
  QA: {
    countryCode: 'QA',
    nameAr: 'حكومي',
    nameEn: 'Hukoomi',
    description: 'بوابة قطر للمعلومات والخدمات الإلكترونية',
    logo: '/hukoomi-logo.webp',
    heroImage: '/gov-qatar-logo.png',
    colors: {
      primary: '#8D1B3D',
      secondary: '#6B1529',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#F9F9F9',
      text: '#1A1A1A',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primaryAr: 'Cairo',
      primary: 'Inter',
      secondary: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #8D1B3D, #6B1529)',
      secondary: 'linear-gradient(135deg, #6B1529, #8D1B3D)',
      header: '#8D1B3D',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.15)',
    },
    borderRadius: {
      sm: '8px',
      md: '8px',
      lg: '8px',
    },
  },

  // سلطنة عُمان - ثواني Thawani
  // Official Oman flag colors: Red #D0032C, Green #009A44, White
  OM: {
    countryCode: 'OM',
    nameAr: 'ثواني',
    nameEn: 'Thawani',
    description: 'منصة المدفوعات العمانية الذكية',
    logo: '/gov-maal-logo.jpg',
    heroImage: '/gov-maal-logo.jpg',
    website: 'https://thawani.om/',
    colors: {
      primary: '#D0032C',
      secondary: '#009A44',
      accent: '#FFFFFF',
      background: '#FAFAFA',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primaryAr: 'Cairo',
      primary: 'Inter',
      secondary: 'Cairo',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #D0032C, #009A44)',
      secondary: 'linear-gradient(135deg, #009A44, #D0032C)',
      header: '#D0032C',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      lg: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    borderRadius: {
      sm: '8px',
      md: '8px',
      lg: '8px',
    },
  },

  // مملكة البحرين - بنفت BENEFIT  
  // Official BENEFIT Red: #CE1126 (from official logo)
  BH: {
    countryCode: 'BH',
    nameAr: 'بنفت',
    nameEn: 'BENEFIT',
    description: 'الشبكة الإلكترونية للمعاملات المالية',
    logo: '/gov-benefit-logo-official.png',
    heroImage: '/gov-benefit-logo.png',
    website: 'https://www.benefit.bh/',
    colors: {
      primary: '#CE1126',
      secondary: '#B01020',
      accent: '#FFFFFF',
      background: '#F3F4F6',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textLight: '#6B7280',
      textOnPrimary: '#FFFFFF',
      border: '#E5E7EB',
    },
    fonts: {
      primaryAr: 'Cairo',
      primary: 'Inter',
      secondary: 'Cairo',
    },
    gradients: {
      primary: '#CE1126',
      secondary: 'linear-gradient(135deg, #CE1126, #B01020)',
      header: '#CE1126',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.15)',
    },
    borderRadius: {
      sm: '12px',
      md: '16px',
      lg: '20px',
    },
  },
};

/**
 * Get government payment system by country code
 * الحصول على نظام الدفع الحكومي حسب رمز الدولة
 */
export const getGovernmentPaymentSystem = (countryCode: string): GovernmentPaymentSystem => {
  const code = countryCode.toUpperCase();
  return governmentPaymentSystems[code] || governmentPaymentSystems.SA;
};

/**
 * Get all available government payment systems
 * الحصول على جميع أنظمة الدفع الحكومية المتاحة
 */
export const getAllGovernmentPaymentSystems = (): GovernmentPaymentSystem[] => {
  return Object.values(governmentPaymentSystems);
};
