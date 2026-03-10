export interface CompanyDesign {
  key: string;
  name: string;
  nameAr: string;
  logo: string;
  headerImage?: string;
  ogImage?: string;
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    background: string;
    surface: string;
    text: string;
    textOnPrimary?: string;
    border: string;
  };
  fonts: {
    primary: string;
    primaryAr: string;
    secondary?: string;
    weight?: {
      normal: number;
      bold: number;
    };
  };
  typography: {
    headingSize: string;
    bodySize: string;
    buttonSize: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl?: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  gradients: {
    primary: string;
    secondary?: string;
    header?: string;
  };
  layout: {
    headerHeight: string;
    spacing: string;
    maxWidth?: string;
  };
}

export const shippingCompanyDesigns: Record<string, CompanyDesign> = {
  aramex: {
    key: 'aramex',
    name: 'Aramex',
    nameAr: 'أرامكس',
    logo: '/aramex-logo.svg',
    headerImage: '/og-aramex.jpg',
    ogImage: '/og-aramex.jpg',
    colors: {
      primary: '#DC291E',
      secondary: '#1A1A1A',
      accent: '#FFFFFF',
      background: '#F5F5F5',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textOnPrimary: '#FFFFFF',
      border: '#E0E0E0',
    },
    fonts: {
      primary: 'Helvetica Neue, Helvetica, Arial, sans-serif',
      primaryAr: 'Cairo, Tajawal, Noto Sans Arabic, sans-serif',
      weight: {
        normal: 400,
        bold: 700,
      },
    },
    typography: {
      headingSize: '2rem',
      bodySize: '1rem',
      buttonSize: '1.125rem',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
    },
    shadows: {
      sm: '0 1px 3px rgba(220, 41, 30, 0.12)',
      md: '0 4px 16px rgba(220, 41, 30, 0.16)',
      lg: '0 10px 32px rgba(220, 41, 30, 0.24)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #DC291E 0%, #B01F16 100%)',
      header: 'linear-gradient(135deg, #DC291E 0%, #A81E18 50%, #B01F16 100%)',
    },
    layout: {
      headerHeight: '80px',
      spacing: '1.5rem',
      maxWidth: '1200px',
    },
  },
  dhl: {
    key: 'dhl',
    name: 'DHL',
    nameAr: 'دي إتش إل',
    logo: '/dhl-logo.svg',
    headerImage: '/og-dhl.jpg',
    ogImage: '/og-dhl.jpg',
    colors: {
      primary: '#FFCC00',
      secondary: '#D40511',
      accent: '#1A1A1A',
      background: '#FFFBF0',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textOnPrimary: '#1A1A1A',
      border: '#FFE180',
    },
    fonts: {
      primary: 'Delivery, Helvetica Neue, Helvetica, Arial, sans-serif',
      primaryAr: 'Cairo, Tajawal, Noto Sans Arabic, sans-serif',
      weight: {
        normal: 400,
        bold: 700,
      },
    },
    typography: {
      headingSize: '2rem',
      bodySize: '1rem',
      buttonSize: '1.125rem',
    },
    borderRadius: {
      sm: '2px',
      md: '4px',
      lg: '8px',
      xl: '12px',
    },
    shadows: {
      sm: '0 2px 4px rgba(212, 5, 17, 0.12)',
      md: '0 4px 12px rgba(212, 5, 17, 0.16)',
      lg: '0 10px 24px rgba(212, 5, 17, 0.24)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #FFCC00 0%, #FFB800 100%)',
      secondary: 'linear-gradient(135deg, #D40511 0%, #B00410 100%)',
      header: 'linear-gradient(135deg, #FFCC00 0%, #D40511 100%)',
    },
    layout: {
      headerHeight: '70px',
      spacing: '1.5rem',
      maxWidth: '1200px',
    },
  },
  fedex: {
    key: 'fedex',
    name: 'FedEx',
    nameAr: 'فيدكس',
    logo: '/fedex-logo.png',
    headerImage: '/og-fedex.jpg',
    ogImage: '/og-fedex.jpg',
    colors: {
      primary: '#4D148C',
      secondary: '#FF6600',
      accent: '#1A1A1A',
      background: '#F7F4FA',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textOnPrimary: '#FFFFFF',
      border: '#D8CCE8',
    },
    fonts: {
      primary: 'FedEx Sans, Helvetica Neue, Arial, sans-serif',
      primaryAr: 'Cairo, Tajawal, Noto Sans Arabic, sans-serif',
      weight: {
        normal: 400,
        bold: 700,
      },
    },
    typography: {
      headingSize: '2rem',
      bodySize: '1rem',
      buttonSize: '1.125rem',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
    },
    shadows: {
      sm: '0 2px 4px rgba(77, 20, 140, 0.12)',
      md: '0 4px 12px rgba(77, 20, 140, 0.16)',
      lg: '0 10px 24px rgba(77, 20, 140, 0.24)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #4D148C 0%, #3A0F6A 100%)',
      secondary: 'linear-gradient(135deg, #FF6600 0%, #E65C00 100%)',
      header: 'linear-gradient(135deg, #4D148C 0%, #FF6600 100%)',
    },
    layout: {
      headerHeight: '75px',
      spacing: '1.5rem',
      maxWidth: '1200px',
    },
  },
  ups: {
    key: 'ups',
    name: 'UPS',
    nameAr: 'يو بي إس',
    logo: '/ups-logo.png',
    headerImage: '/og-ups.jpg',
    ogImage: '/og-ups.jpg',
    colors: {
      primary: '#351C15',
      secondary: '#FFB500',
      accent: '#1A1A1A',
      background: '#FAF8F6',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textOnPrimary: '#FFFFFF',
      border: '#E8E3DF',
    },
    fonts: {
      primary: 'UPS Berlingske, Helvetica Neue, Arial, sans-serif',
      primaryAr: 'Cairo, Tajawal, Noto Sans Arabic, sans-serif',
      weight: {
        normal: 400,
        bold: 700,
      },
    },
    typography: {
      headingSize: '2rem',
      bodySize: '1rem',
      buttonSize: '1.125rem',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
    },
    shadows: {
      sm: '0 2px 4px rgba(53, 28, 21, 0.16)',
      md: '0 4px 12px rgba(53, 28, 21, 0.22)',
      lg: '0 10px 24px rgba(53, 28, 21, 0.28)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #351C15 0%, #2A1710 100%)',
      secondary: 'linear-gradient(135deg, #FFB500 0%, #F0A800 100%)',
      header: 'linear-gradient(135deg, #351C15 0%, #FFB500 100%)',
    },
    layout: {
      headerHeight: '70px',
      spacing: '1.5rem',
      maxWidth: '1200px',
    },
  },
  smsa: {
    key: 'smsa',
    name: 'SMSA Express',
    nameAr: 'سمسا إكسبرس',
    logo: '/smsa-logo.svg',
    headerImage: '/og-smsa.jpg',
    ogImage: '/og-smsa.jpg',
    colors: {
      primary: '#4D148C',
      secondary: '#FF6600',
      accent: '#1A1A1A',
      background: '#F7F4FA',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textOnPrimary: '#FFFFFF',
      border: '#D8CCE8',
    },
    fonts: {
      primary: 'Helvetica Neue, Arial, sans-serif',
      primaryAr: 'Cairo, Tajawal, Noto Sans Arabic, sans-serif',
      weight: {
        normal: 400,
        bold: 700,
      },
    },
    typography: {
      headingSize: '2rem',
      bodySize: '1rem',
      buttonSize: '1.125rem',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
      xl: '18px',
    },
    shadows: {
      sm: '0 2px 4px rgba(77, 20, 140, 0.12)',
      md: '0 4px 12px rgba(77, 20, 140, 0.16)',
      lg: '0 10px 24px rgba(77, 20, 140, 0.24)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #4D148C 0%, #3A0F6A 100%)',
      secondary: 'linear-gradient(135deg, #FF6600 0%, #E65C00 100%)',
      header: 'linear-gradient(135deg, #4D148C 0%, #FF6600 100%)',
    },
    layout: {
      headerHeight: '75px',
      spacing: '1.5rem',
      maxWidth: '1200px',
    },
  },
  naqel: {
    key: 'naqel',
    name: 'Naqel Express',
    nameAr: 'ناقل إكسبرس',
    logo: '/og-naqel.jpg',
    headerImage: '/og-naqel.jpg',
    ogImage: '/og-naqel.jpg',
    colors: {
      primary: '#E61838',
      secondary: '#002E60',
      accent: '#1A1A1A',
      background: '#FFF7F9',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textOnPrimary: '#FFFFFF',
      border: '#FFD8E0',
    },
    fonts: {
      primary: 'Helvetica Neue, Arial, sans-serif',
      primaryAr: 'Cairo, Tajawal, Noto Sans Arabic, sans-serif',
      weight: {
        normal: 400,
        bold: 700,
      },
    },
    typography: {
      headingSize: '2rem',
      bodySize: '1rem',
      buttonSize: '1.125rem',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
      xl: '18px',
    },
    shadows: {
      sm: '0 2px 4px rgba(230, 24, 56, 0.12)',
      md: '0 4px 12px rgba(230, 24, 56, 0.16)',
      lg: '0 10px 24px rgba(230, 24, 56, 0.24)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #E61838 0%, #C01429 100%)',
      secondary: 'linear-gradient(135deg, #002E60 0%, #001F40 100%)',
      header: 'linear-gradient(135deg, #E61838 0%, #002E60 100%)',
    },
    layout: {
      headerHeight: '75px',
      spacing: '1.5rem',
      maxWidth: '1200px',
    },
  },
  zajil: {
    key: 'zajil',
    name: 'Zajil Express',
    nameAr: 'زاجل إكسبرس',
    logo: '/og-zajil.jpg',
    headerImage: '/og-zajil.jpg',
    ogImage: '/og-zajil.jpg',
    colors: {
      primary: '#1C4587',
      secondary: '#FF9900',
      accent: '#1A1A1A',
      background: '#F2F5FA',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textOnPrimary: '#FFFFFF',
      border: '#C8D8EB',
    },
    fonts: {
      primary: 'Helvetica Neue, Arial, sans-serif',
      primaryAr: 'Cairo, Tajawal, Noto Sans Arabic, sans-serif',
      weight: {
        normal: 400,
        bold: 700,
      },
    },
    typography: {
      headingSize: '2rem',
      bodySize: '1rem',
      buttonSize: '1.125rem',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
      xl: '18px',
    },
    shadows: {
      sm: '0 2px 4px rgba(28, 69, 135, 0.12)',
      md: '0 4px 12px rgba(28, 69, 135, 0.16)',
      lg: '0 10px 24px rgba(28, 69, 135, 0.24)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #1C4587 0%, #14325F 100%)',
      secondary: 'linear-gradient(135deg, #FF9900 0%, #E68A00 100%)',
      header: 'linear-gradient(135deg, #1C4587 0%, #FF9900 100%)',
    },
    layout: {
      headerHeight: '75px',
      spacing: '1.5rem',
      maxWidth: '1200px',
    },
  },
};

export const getShippingCompanyDesign = (companyKey: string): CompanyDesign => {
  const design = shippingCompanyDesigns[companyKey.toLowerCase()];
  if (design) {
    return design;
  }
  
  return shippingCompanyDesigns['aramex'];
};
