export interface BrandColors {
  primary: string;
  secondary: string;
  accent?: string;
  background: string;
  surface: string;
  text: string;
  textLight: string;
  textOnPrimary: string;
  border: string;
}

export interface BrandFonts {
  primary: string;
  secondary: string;
  arabic: string;
}

export interface BrandGradients {
  primary: string;
  secondary: string;
  hero: string;
}

export interface BrandShadows {
  sm: string;
  md: string;
  lg: string;
}

export interface CompanyBranding {
  id: string;
  nameEn: string;
  nameAr: string;
  colors: BrandColors;
  fonts: BrandFonts;
  gradients: BrandGradients;
  shadows: BrandShadows;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  logoUrl?: string;
  websiteUrl?: string;
  description: string;
}

export const shippingCompanyBranding: Record<string, CompanyBranding> = {
  aramex: {
    id: 'aramex',
    nameEn: 'Aramex',
    nameAr: 'أرامكس',
    colors: {
      primary: '#DC291E',
      secondary: '#FFFFFF',
      accent: '#000000',
      background: '#FFFFFF',
      surface: '#F8F8F8',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E5E5E5',
    },
    fonts: {
      primary: 'Inter, system-ui, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #DC291E 0%, #A32117 100%)',
      secondary: 'linear-gradient(180deg, #DC291E 0%, #8B1A12 100%)',
      hero: 'linear-gradient(to right, #DC291E 0%, #A32117 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(220, 41, 30, 0.08)',
      md: '0 4px 6px -1px rgba(220, 41, 30, 0.15)',
      lg: '0 10px 15px -3px rgba(220, 41, 30, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    logoUrl: '/og-aramex.jpg',
    websiteUrl: 'https://www.aramex.com',
    description: 'شركة عالمية لخدمات الشحن السريع واللوجستيات والتتبع',
  },

  dhl: {
    id: 'dhl',
    nameEn: 'DHL',
    nameAr: 'دي إتش إل',
    colors: {
      primary: '#FFCC00',
      secondary: '#D40511',
      accent: '#000000',
      background: '#FFFFFF',
      surface: '#FFF9E6',
      text: '#000000',
      textLight: '#555555',
      textOnPrimary: '#000000',
      border: '#FFCC00',
    },
    fonts: {
      primary: 'Delivery, Helvetica, Arial, sans-serif',
      secondary: 'Helvetica, Arial, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #FFCC00 0%, #FFB800 100%)',
      secondary: 'linear-gradient(135deg, #D40511 0%, #A00410 100%)',
      hero: 'linear-gradient(90deg, #FFCC00 0%, #D40511 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(255, 204, 0, 0.10)',
      md: '0 4px 6px -1px rgba(255, 204, 0, 0.20)',
      lg: '0 10px 15px -3px rgba(255, 204, 0, 0.30)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.dhl.com',
    description: 'شبكة شحن عالمية توفر خدمات التوصيل السريع الدولي والمحلي',
  },

  fedex: {
    id: 'fedex',
    nameEn: 'FedEx',
    nameAr: 'فيديكس',
    colors: {
      primary: '#660099',
      secondary: '#FF6600',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F0FA',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E0D4ED',
    },
    fonts: {
      primary: 'FedEx Sans, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #660099 0%, #4D148C 100%)',
      secondary: 'linear-gradient(135deg, #FF6600 0%, #FF8533 100%)',
      hero: 'linear-gradient(to right, #660099 0%, #FF6600 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(102, 0, 153, 0.08)',
      md: '0 4px 6px -1px rgba(102, 0, 153, 0.15)',
      lg: '0 10px 15px -3px rgba(102, 0, 153, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.fedex.com',
    description: 'خدمات شحن دولية موثوقة مع تتبع فوري للشحنات',
  },

  ups: {
    id: 'ups',
    nameEn: 'UPS',
    nameAr: 'يو بي إس',
    colors: {
      primary: '#351C15',
      secondary: '#FFB500',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FAF8F7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E5E0DC',
    },
    fonts: {
      primary: 'UPS Sans, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #351C15 0%, #1F0F0A 100%)',
      secondary: 'linear-gradient(135deg, #FFB500 0%, #FFC933 100%)',
      hero: 'linear-gradient(to right, #351C15 0%, #FFB500 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(53, 28, 21, 0.08)',
      md: '0 4px 6px -1px rgba(53, 28, 21, 0.15)',
      lg: '0 10px 15px -3px rgba(53, 28, 21, 0.20)',
    },
    borderRadius: {
      sm: '2px',
      md: '4px',
      lg: '8px',
    },
    websiteUrl: 'https://www.ups.com',
    description: 'حلول لوجستية متكاملة وخدمات شحن سريعة حول العالم',
  },

  smsa: {
    id: 'smsa',
    nameEn: 'SMSA Express',
    nameAr: 'سمسا إكسبرس',
    colors: {
      primary: '#662D91',
      secondary: '#FF6600',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F7F3FA',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E4D9ED',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #662D91 0%, #8B3CC2 100%)',
      secondary: 'linear-gradient(135deg, #FF6600 0%, #FF8533 100%)',
      hero: 'linear-gradient(to right, #662D91 0%, #FF6600 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(102, 45, 145, 0.08)',
      md: '0 4px 6px -1px rgba(102, 45, 145, 0.15)',
      lg: '0 10px 15px -3px rgba(102, 45, 145, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.smsaexpress.com',
    description: 'أكبر شركة شحن سعودية متخصصة في التوصيل السريع والخدمات اللوجستية',
  },

  naqel: {
    id: 'naqel',
    nameEn: 'NAQEL Express',
    nameAr: 'ناقل إكسبرس',
    colors: {
      primary: '#E61838',
      secondary: '#002E60',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FFF5F7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD6DD',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #E61838 0%, #B31329 100%)',
      secondary: 'linear-gradient(135deg, #002E60 0%, #001D3D 100%)',
      hero: 'linear-gradient(to right, #E61838 0%, #002E60 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(230, 24, 56, 0.08)',
      md: '0 4px 6px -1px rgba(230, 24, 56, 0.15)',
      lg: '0 10px 15px -3px rgba(230, 24, 56, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.naqelexpress.com',
    description: 'حلول شحن متطورة وخدمات لوجستية متكاملة داخل المملكة',
  },

  zajil: {
    id: 'zajil',
    nameEn: 'Zajil Express',
    nameAr: 'زاجل إكسبرس',
    colors: {
      primary: '#FFB500',
      secondary: '#003087',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FFF9E6',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#000000',
      border: '#FFE680',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #FFB500 0%, #FFC933 100%)',
      secondary: 'linear-gradient(135deg, #003087 0%, #0066CC 100%)',
      hero: 'linear-gradient(to right, #FFB500 0%, #003087 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(255, 181, 0, 0.10)',
      md: '0 4px 6px -1px rgba(255, 181, 0, 0.20)',
      lg: '0 10px 15px -3px rgba(255, 181, 0, 0.25)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://zajil-express.com',
    description: 'شركة سعودية رائدة في خدمات البريد السريع والشحن',
  },

  saudipost: {
    id: 'saudipost',
    nameEn: 'Saudi Post',
    nameAr: 'البريد السعودي',
    colors: {
      primary: '#0066CC',
      secondary: '#FFB81C',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F8FC',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D4E2F1',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0066CC 0%, #0055AA 100%)',
      secondary: 'linear-gradient(135deg, #FFB81C 0%, #FFC74D 100%)',
      hero: 'linear-gradient(to right, #0066CC 0%, #FFB81C 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 102, 204, 0.08)',
      md: '0 4px 6px -1px rgba(0, 102, 204, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 102, 204, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://splonline.com.sa',
    description: 'المشغل الوطني للبريد في المملكة العربية السعودية - SPL',
  },

  empost: {
    id: 'empost',
    nameEn: 'Emirates Post',
    nameAr: 'البريد الإماراتي',
    colors: {
      primary: '#C8102E',
      secondary: '#003087',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#FFF5F7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD6DD',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #C8102E 0%, #9B0D24 100%)',
      secondary: 'linear-gradient(135deg, #003087 0%, #00235F 100%)',
      hero: 'linear-gradient(to right, #C8102E 0%, #003087 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(200, 16, 46, 0.08)',
      md: '0 4px 6px -1px rgba(200, 16, 46, 0.15)',
      lg: '0 10px 15px -3px rgba(200, 16, 46, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.emiratespost.ae',
    description: 'المشغل الوطني للبريد في دولة الإمارات العربية المتحدة',
  },

  qpost: {
    id: 'qpost',
    nameEn: 'Qatar Post',
    nameAr: 'البريد القطري',
    colors: {
      primary: '#8E1838',
      secondary: '#F9D416',
      accent: '#00A4E4',
      background: '#FFFFFF',
      surface: '#FFF8F2',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFE5B8',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #8E1838 0%, #6B122A 100%)',
      secondary: 'linear-gradient(135deg, #F9D416 0%, #FCDF4A 100%)',
      hero: 'linear-gradient(to right, #8E1838 0%, #F9D416 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(142, 24, 56, 0.08)',
      md: '0 4px 6px -1px rgba(142, 24, 56, 0.15)',
      lg: '0 10px 15px -3px rgba(142, 24, 56, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.qpost.qa',
    description: 'المشغل الوطني للبريد في دولة قطر',
  },

  kwpost: {
    id: 'kwpost',
    nameEn: 'Kuwait Post',
    nameAr: 'البريد الكويتي',
    colors: {
      primary: '#007A33',
      secondary: '#CE1126',
      accent: '#000000',
      background: '#FFFFFF',
      surface: '#F5FAF7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1E8DC',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #007A33 0%, #009B42 100%)',
      secondary: 'linear-gradient(135deg, #CE1126 0%, #A00E1E 100%)',
      hero: 'linear-gradient(to right, #007A33 0%, #CE1126 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 122, 51, 0.08)',
      md: '0 4px 6px -1px rgba(0, 122, 51, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 122, 51, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    description: 'المشغل الوطني للبريد في دولة الكويت',
  },

  omanpost: {
    id: 'omanpost',
    nameEn: 'Oman Post',
    nameAr: 'البريد العُماني',
    colors: {
      primary: '#ED1C24',
      secondary: '#009639',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FFF5F6',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD6D8',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #ED1C24 0%, #C0161D 100%)',
      secondary: 'linear-gradient(135deg, #009639 0%, #00B946 100%)',
      hero: 'linear-gradient(to right, #ED1C24 0%, #009639 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(237, 28, 36, 0.08)',
      md: '0 4px 6px -1px rgba(237, 28, 36, 0.15)',
      lg: '0 10px 15px -3px rgba(237, 28, 36, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.omanpost.om',
    description: 'المشغل الوطني للبريد في سلطنة عُمان',
  },

  bahpost: {
    id: 'bahpost',
    nameEn: 'Bahrain Post',
    nameAr: 'البريد البحريني',
    colors: {
      primary: '#EF3F32',
      secondary: '#007CC2',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FFF6F5',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFE0DD',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #EF3F32 0%, #C43228 100%)',
      secondary: 'linear-gradient(135deg, #007CC2 0%, #00629B 100%)',
      hero: 'linear-gradient(to right, #EF3F32 0%, #007CC2 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(239, 63, 50, 0.08)',
      md: '0 4px 6px -1px rgba(239, 63, 50, 0.15)',
      lg: '0 10px 15px -3px rgba(239, 63, 50, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.bahrainpost.gov.bh',
    description: 'المشغل الوطني للبريد في مملكة البحرين',
  },

  albaraka: {
    id: 'albaraka',
    nameEn: 'Al Baraka Group',
    nameAr: 'مجموعة البركة',
    colors: {
      primary: '#E32119',
      secondary: '#F58220',
      accent: '#808080',
      background: '#FFFFFF',
      surface: '#FFF5F3',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD6D1',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #E32119 0%, #F58220 100%)',
      secondary: 'linear-gradient(180deg, #E32119 0%, #B31A14 100%)',
      hero: 'linear-gradient(to right, #E32119 0%, #F58220 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(227, 33, 25, 0.08)',
      md: '0 4px 6px -1px rgba(227, 33, 25, 0.15)',
      lg: '0 10px 15px -3px rgba(227, 33, 25, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.albaraka.com',
    description: 'خدمات شحن وبنكية متكاملة تابعة لمجموعة البركة، حلول مالية ولوجستية متكاملة في الخليج',
  },

  alfuttaim: {
    id: 'alfuttaim',
    nameEn: 'Al-Futtaim Group',
    nameAr: 'مجموعة الفطيم',
    colors: {
      primary: '#004C99',
      secondary: '#0066CC',
      accent: '#00A3E0',
      background: '#FFFFFF',
      surface: '#F5F9FC',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D4E4F1',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #004C99 0%, #0066CC 100%)',
      secondary: 'linear-gradient(180deg, #0066CC 0%, #00A3E0 100%)',
      hero: 'linear-gradient(to right, #004C99 0%, #00A3E0 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 76, 153, 0.08)',
      md: '0 4px 6px -1px rgba(0, 76, 153, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 76, 153, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.alfuttaim.com',
    description: 'حلول لوجستية متكاملة تابعة لمجموعة فطيم، تشمل الشحن والتوزيع وخدمات سلسلة الإمداد في المنطقة',
  },

  alshaya: {
    id: 'alshaya',
    nameEn: 'Alshaya Group',
    nameAr: 'مجموعة الشايع',
    colors: {
      primary: '#1A1A1A',
      secondary: '#666666',
      accent: '#B8860B',
      background: '#FFFFFF',
      surface: '#F8F8F8',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E5E5E5',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #1A1A1A 0%, #666666 100%)',
      secondary: 'linear-gradient(180deg, #666666 0%, #B8860B 100%)',
      hero: 'linear-gradient(to right, #1A1A1A 0%, #666666 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(26, 26, 26, 0.08)',
      md: '0 4px 6px -1px rgba(26, 26, 26, 0.15)',
      lg: '0 10px 15px -3px rgba(26, 26, 26, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.alshaya.com',
    description: 'مجموعة تعمل في الشحن والتوزيع لعلامات تجارية متعددة، وتوفر حلول التوزيع واللوجستيات للتجزئة',
  },

  shipco: {
    id: 'shipco',
    nameEn: 'Shipco Transport',
    nameAr: 'شركة الشحن العالمية',
    colors: {
      primary: '#003087',
      secondary: '#0066CC',
      accent: '#00A3E0',
      background: '#FFFFFF',
      surface: '#F5F8FC',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D4E2F1',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #003087 0%, #0066CC 100%)',
      secondary: 'linear-gradient(180deg, #0066CC 0%, #00A3E0 100%)',
      hero: 'linear-gradient(to right, #003087 0%, #00A3E0 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 48, 135, 0.08)',
      md: '0 4px 6px -1px rgba(0, 48, 135, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 48, 135, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.shipco.com',
    description: 'مزود خدمات شحن دولي ومحلي متخصص في الشحن البحري والجوي وحلول الشحن للمستوردين والمصدرين',
  },

  hellmann: {
    id: 'hellmann',
    nameEn: 'Hellmann Worldwide Logistics',
    nameAr: 'هايلمان العالمية',
    colors: {
      primary: '#E90206',
      secondary: '#005197',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FFF5F5',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD6D7',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #E90206 0%, #005197 100%)',
      secondary: 'linear-gradient(180deg, #E90206 0%, #B30205 100%)',
      hero: 'linear-gradient(to right, #E90206 0%, #005197 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(233, 2, 6, 0.08)',
      md: '0 4px 6px -1px rgba(233, 2, 6, 0.15)',
      lg: '0 10px 15px -3px rgba(233, 2, 6, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.hellmann.com',
    description: 'شبكة دولية لخدمات الشحن واللوجستيات، تقدم خدمات الشحن الدولي والنقل البري والبحري والجوي',
  },

  dsv: {
    id: 'dsv',
    nameEn: 'DSV',
    nameAr: 'دي إس في',
    colors: {
      primary: '#003087',
      secondary: '#0066CC',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F8FC',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D4E2F1',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #003087 0%, #0066CC 100%)',
      secondary: 'linear-gradient(180deg, #003087 0%, #00235F 100%)',
      hero: 'linear-gradient(to right, #003087 0%, #0066CC 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 48, 135, 0.08)',
      md: '0 4px 6px -1px rgba(0, 48, 135, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 48, 135, 0.20)',
    },
    borderRadius: {
      sm: '2px',
      md: '4px',
      lg: '8px',
    },
    websiteUrl: 'https://www.dsv.com',
    description: 'حلول شحن ولوجستيات متطورة تشمل الشحن الجوي، البحري، والنقل البري بالإضافة إلى تخزين وإدارة سلسلة الإمداد',
  },

  agility: {
    id: 'agility',
    nameEn: 'Agility Logistics',
    nameAr: 'مجموعة الجاهلية',
    colors: {
      primary: '#E30613',
      secondary: '#002E60',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FFF5F6',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD6D8',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #E30613 0%, #002E60 100%)',
      secondary: 'linear-gradient(180deg, #E30613 0%, #B30510 100%)',
      hero: 'linear-gradient(to right, #E30613 0%, #002E60 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(227, 6, 19, 0.08)',
      md: '0 4px 6px -1px rgba(227, 6, 19, 0.15)',
      lg: '0 10px 15px -3px rgba(227, 6, 19, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.agility.com',
    description: 'خدمات لوجستية وشحن متطورة وحلول سلسلة إمداد واسعة النطاق في المنطقة والعالم',
  },

  jinaken: {
    id: 'jinaken',
    nameEn: 'Genacom',
    nameAr: 'جيناكم للتوصيل',
    colors: {
      primary: '#009639',
      secondary: '#006C28',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5FBF7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1E8DC',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #009639 0%, #006C28 100%)',
      secondary: 'linear-gradient(180deg, #009639 0%, #00B946 100%)',
      hero: 'linear-gradient(to right, #009639 0%, #006C28 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 150, 57, 0.08)',
      md: '0 4px 6px -1px rgba(0, 150, 57, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 150, 57, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    description: 'شركة توصيل عُمانية محلية تقدم خدمات التوصيل والشحن داخل سلطنة عُمان مع شبكة فروع واسعة وخدمة تتبع',
  },

  genacom: {
    id: 'genacom',
    nameEn: 'Genacom',
    nameAr: 'جيناكم للتوصيل',
    colors: {
      primary: '#009639',
      secondary: '#006C28',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5FBF7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1E8DC',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #009639 0%, #006C28 100%)',
      secondary: 'linear-gradient(180deg, #009639 0%, #00B946 100%)',
      hero: 'linear-gradient(to right, #009639 0%, #006C28 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 150, 57, 0.08)',
      md: '0 4px 6px -1px rgba(0, 150, 57, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 150, 57, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    description: 'شركة توصيل عُمانية محلية تقدم خدمات التوصيل والشحن داخل سلطنة عُمان مع شبكة فروع واسعة وخدمة تتبع',
  },

  national: {
    id: 'national',
    nameEn: 'National Shipping Company',
    nameAr: 'الشركة الوطنية للشحن',
    colors: {
      primary: '#003087',
      secondary: '#0066CC',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#F5F8FC',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D4E2F1',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #003087 0%, #0066CC 100%)',
      secondary: 'linear-gradient(180deg, #003087 0%, #00235F 100%)',
      hero: 'linear-gradient(to right, #003087 0%, #D4AF37 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 48, 135, 0.08)',
      md: '0 4px 6px -1px rgba(0, 48, 135, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 48, 135, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    description: 'خدمات شحن وبحرية ولوجستيات شاملة، تغطي الشحن التجاري والبحري وخدمات النقل البحري داخل وخارج المملكة',
  },

  bahri: {
    id: 'bahri',
    nameEn: 'Bahri',
    nameAr: 'البحري',
    colors: {
      primary: '#003087',
      secondary: '#D4AF37',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F8FC',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D4E2F1',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #003087 0%, #D4AF37 100%)',
      secondary: 'linear-gradient(180deg, #003087 0%, #00235F 100%)',
      hero: 'linear-gradient(to right, #003087 0%, #D4AF37 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 48, 135, 0.08)',
      md: '0 4px 6px -1px rgba(0, 48, 135, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 48, 135, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    websiteUrl: 'https://www.bahri.sa',
    description: 'الشركة الوطنية للشحن في المملكة العربية السعودية، رائدة في نقل النفط والمواد الكيميائية والبضائع',
  },

  jinakum: {
    id: 'jinakum',
    nameEn: 'Genacom',
    nameAr: 'جيناكم للتوصيل',
    colors: {
      primary: '#009639',
      secondary: '#006C28',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5FBF7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1E8DC',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #009639 0%, #006C28 100%)',
      secondary: 'linear-gradient(180deg, #009639 0%, #00B946 100%)',
      hero: 'linear-gradient(to right, #009639 0%, #006C28 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 150, 57, 0.08)',
      md: '0 4px 6px -1px rgba(0, 150, 57, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 150, 57, 0.20)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    description: 'شركة توصيل عُمانية محلية تقدم خدمات التوصيل والشحن داخل سلطنة عُمان مع شبكة فروع واسعة وخدمة تتبع',
  },
};

export const governmentPaymentBranding: Record<string, CompanyBranding> = {
  sadad: {
    id: 'sadad',
    nameEn: 'SADAD',
    nameAr: 'سداد',
    colors: {
      primary: '#F58220',
      secondary: '#E67317',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#FFF8F2',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFE5D0',
    },
    fonts: {
      primary: 'Inter, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #F58220 0%, #E67317 100%)',
      secondary: 'linear-gradient(180deg, #F58220 0%, #E67317 100%)',
      hero: 'linear-gradient(to right, #F58220 0%, #E67317 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(245, 130, 32, 0.08)',
      md: '0 4px 6px -1px rgba(245, 130, 32, 0.15)',
      lg: '0 10px 15px -3px rgba(245, 130, 32, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.sadad.com',
    description: 'نظام المدفوعات الوطني للخدمات الحكومية والفواتير',
  },

  knet: {
    id: 'knet',
    nameEn: 'KNET',
    nameAr: 'كي نت',
    colors: {
      primary: '#007A3D',
      secondary: '#CE1126',
      accent: '#000000',
      background: '#FFFFFF',
      surface: '#F7F7F7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#DDDDDD',
    },
    fonts: {
      primary: 'Inter, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #007A3D 0%, #CE1126 100%)',
      secondary: 'linear-gradient(180deg, #007A3D 0%, #000000 100%)',
      hero: 'linear-gradient(to right, #007A3D 0%, #CE1126 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 122, 61, 0.08)',
      md: '0 4px 6px -1px rgba(0, 122, 61, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 122, 61, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.kpay.com.kw',
    description: 'شبكة الكويت الوطنية للمدفوعات الإلكترونية',
  },

  benefit: {
    id: 'benefit',
    nameEn: 'BENEFIT',
    nameAr: 'بنفت',
    colors: {
      primary: '#CE1126',
      secondary: '#D32027',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F9F9F9',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E0E0E0',
    },
    fonts: {
      primary: 'Inter, Arial, sans-serif',
      secondary: 'Arial, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #CE1126 0%, #D32027 100%)',
      secondary: 'linear-gradient(180deg, #CE1126 0%, #A00E1E 100%)',
      hero: 'linear-gradient(to right, #CE1126 0%, #D32027 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(206, 17, 38, 0.08)',
      md: '0 4px 6px -1px rgba(206, 17, 38, 0.15)',
      lg: '0 10px 15px -3px rgba(206, 17, 38, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.benefit.bh',
    description: 'الشبكة الإلكترونية للمعاملات المالية',
  },
};

export const bankBranding: Record<string, CompanyBranding> = {
  alrajhi_bank: {
    id: 'alrajhi_bank',
    nameEn: 'Al Rajhi Bank',
    nameAr: 'مصرف الراجحي',
    colors: {
      primary: '#006C35',
      secondary: '#008D45',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#F5FAF7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1E8DC',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #006C35 0%, #008D45 100%)',
      secondary: 'linear-gradient(180deg, #006C35 0%, #005428 100%)',
      hero: 'linear-gradient(to right, #006C35 0%, #008D45 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 108, 53, 0.08)',
      md: '0 4px 6px -1px rgba(0, 108, 53, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 108, 53, 0.20)',
      xl: '0 20px 60px -15px rgba(0, 108, 53, 0.40)',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
    },
    logoUrl: '/bank-logos/alrajhi-bank.svg',
    websiteUrl: 'https://www.alrajhibank.com.sa',
    description: 'أكبر بنك إسلامي في العالم ورائد الخدمات المصرفية في المملكة العربية السعودية',
  },

  riyad_bank: {
    id: 'riyad_bank',
    nameEn: 'Riyad Bank',
    nameAr: 'بنك الرياض',
    colors: {
      primary: '#0066B2',
      secondary: '#0055AA',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#F5F8FA',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D4DDE6',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0066B2 0%, #0055AA 100%)',
      secondary: 'linear-gradient(180deg, #0066B2 0%, #004488 100%)',
      hero: 'linear-gradient(to right, #0066B2 0%, #0055AA 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 102, 178, 0.08)',
      md: '0 4px 6px -1px rgba(0, 102, 178, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 102, 178, 0.20)',
      xl: '0 20px 60px -15px rgba(0, 102, 178, 0.40)',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
    },
    logoUrl: '/bank-logos/riyad-bank.png',
    websiteUrl: 'https://www.riyadbank.com',
    description: 'أحد أكبر البنوك السعودية ورائد في تقديم الخدمات المصرفية المتطورة',
  },

  alahli_bank: {
    id: 'alahli_bank',
    nameEn: 'Saudi National Bank',
    nameAr: 'البنك الأهلي السعودي',
    colors: {
      primary: '#034638',
      secondary: '#84bd00',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#F5FAF7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1E8DC',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #034638 0%, #84bd00 100%)',
      secondary: 'linear-gradient(180deg, #034638 0%, #022F24 100%)',
      hero: 'linear-gradient(to right, #034638 0%, #84bd00 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(3, 70, 56, 0.08)',
      md: '0 4px 6px -1px rgba(3, 70, 56, 0.15)',
      lg: '0 10px 15px -3px rgba(3, 70, 56, 0.20)',
      xl: '0 20px 60px -15px rgba(3, 70, 56, 0.40)',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
    },
    logoUrl: '/bank-logos/saudi-national-bank.png',
    websiteUrl: 'https://www.alahli.com',
    description: 'أكبر بنك في المملكة العربية السعودية والشرق الأوسط بعد الاندماج',
  },

  'emirates-nbd': {
    id: 'emirates-nbd',
    nameEn: 'Emirates NBD',
    nameAr: 'بنك الإمارات دبي الوطني',
    colors: {
      primary: '#C8102E',
      secondary: '#0066CC',
      accent: '#FFB81C',
      background: '#FFFFFF',
      surface: '#FFF5F7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD6DD',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #C8102E 0%, #0066CC 100%)',
      secondary: 'linear-gradient(180deg, #C8102E 0%, #9B0D24 100%)',
      hero: 'linear-gradient(to right, #C8102E 0%, #0066CC 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(200, 16, 46, 0.08)',
      md: '0 4px 6px -1px rgba(200, 16, 46, 0.15)',
      lg: '0 10px 15px -3px rgba(200, 16, 46, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.emiratesnbd.com',
    description: 'أحد أكبر البنوك في الشرق الأوسط ورائد الخدمات المصرفية في دولة الإمارات',
  },

  adcb: {
    id: 'adcb',
    nameEn: 'ADCB',
    nameAr: 'بنك أبوظبي التجاري',
    colors: {
      primary: '#003366',
      secondary: '#0066CC',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#F5F8FA',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D4DDE6',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #003366 0%, #0066CC 100%)',
      secondary: 'linear-gradient(180deg, #003366 0%, #002244 100%)',
      hero: 'linear-gradient(to right, #003366 0%, #0066CC 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 51, 102, 0.08)',
      md: '0 4px 6px -1px rgba(0, 51, 102, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 51, 102, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.adcb.com',
    description: 'بنك رائد في دولة الإمارات يقدم خدمات مصرفية شاملة',
  },

  fab: {
    id: 'fab',
    nameEn: 'First Abu Dhabi Bank',
    nameAr: 'بنك أبوظبي الأول',
    colors: {
      primary: '#006C35',
      secondary: '#008D45',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#F5FAF7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1E8DC',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #006C35 0%, #008D45 100%)',
      secondary: 'linear-gradient(180deg, #006C35 0%, #005428 100%)',
      hero: 'linear-gradient(to right, #006C35 0%, #008D45 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 108, 53, 0.08)',
      md: '0 4px 6px -1px rgba(0, 108, 53, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 108, 53, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.bankfab.com',
    description: 'أكبر بنك في دولة الإمارات العربية المتحدة',
  },

  mashreq: {
    id: 'mashreq',
    nameEn: 'Mashreq Bank',
    nameAr: 'بنك المشرق',
    colors: {
      primary: '#C8102E',
      secondary: '#E30613',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#FFF5F7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD6DD',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #C8102E 0%, #E30613 100%)',
      secondary: 'linear-gradient(180deg, #C8102E 0%, #9B0D24 100%)',
      hero: 'linear-gradient(to right, #C8102E 0%, #E30613 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(200, 16, 46, 0.08)',
      md: '0 4px 6px -1px rgba(200, 16, 46, 0.15)',
      lg: '0 10px 15px -3px rgba(200, 16, 46, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.mashreqbank.com',
    description: 'أقدم بنك في دولة الإمارات العربية المتحدة تأسس عام 1967',
  },

  nbk: {
    id: 'nbk',
    nameEn: 'National Bank of Kuwait',
    nameAr: 'بنك الكويت الوطني',
    colors: {
      primary: '#003366',
      secondary: '#0066CC',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#F5F8FA',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D4DDE6',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #003366 0%, #0066CC 100%)',
      secondary: 'linear-gradient(180deg, #003366 0%, #002244 100%)',
      hero: 'linear-gradient(to right, #003366 0%, #0066CC 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 51, 102, 0.08)',
      md: '0 4px 6px -1px rgba(0, 51, 102, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 51, 102, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.nbk.com',
    description: 'أكبر بنك في دولة الكويت وأحد أكبر البنوك في المنطقة',
  },

  kbt: {
    id: 'kbt',
    nameEn: 'Kuwait Finance House',
    nameAr: 'بيت التمويل الكويتي',
    colors: {
      primary: '#007A33',
      secondary: '#009B42',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#F5FAF7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1E8DC',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #007A33 0%, #009B42 100%)',
      secondary: 'linear-gradient(180deg, #007A33 0%, #005F28 100%)',
      hero: 'linear-gradient(to right, #007A33 0%, #009B42 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 122, 51, 0.08)',
      md: '0 4px 6px -1px rgba(0, 122, 51, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 122, 51, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.kfh.com',
    description: 'أول بنك إسلامي في دولة الكويت والرائد في الخدمات المصرفية الإسلامية',
  },

  gulf: {
    id: 'gulf',
    nameEn: 'Gulf Bank',
    nameAr: 'بنك الخليج',
    colors: {
      primary: '#C8102E',
      secondary: '#E30613',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#FFF5F7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD6DD',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #C8102E 0%, #E30613 100%)',
      secondary: 'linear-gradient(180deg, #C8102E 0%, #9B0D24 100%)',
      hero: 'linear-gradient(to right, #C8102E 0%, #E30613 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(200, 16, 46, 0.08)',
      md: '0 4px 6px -1px rgba(200, 16, 46, 0.15)',
      lg: '0 10px 15px -3px rgba(200, 16, 46, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.e-gulfbank.com',
    description: 'بنك كويتي رائد في تقديم الخدمات المصرفية المبتكرة',
  },

  qnb: {
    id: 'qnb',
    nameEn: 'Qatar National Bank',
    nameAr: 'بنك قطر الوطني',
    colors: {
      primary: '#8E1838',
      secondary: '#6B122A',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#FFF5F7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E8D1D8',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #8E1838 0%, #6B122A 100%)',
      secondary: 'linear-gradient(180deg, #8E1838 0%, #5F0F23 100%)',
      hero: 'linear-gradient(to right, #8E1838 0%, #6B122A 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(142, 24, 56, 0.08)',
      md: '0 4px 6px -1px rgba(142, 24, 56, 0.15)',
      lg: '0 10px 15px -3px rgba(142, 24, 56, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.qnb.com',
    description: 'أكبر بنك في الشرق الأوسط وأفريقيا',
  },

  cboq: {
    id: 'cboq',
    nameEn: 'Commercial Bank of Qatar',
    nameAr: 'بنك قطر التجاري',
    colors: {
      primary: '#003366',
      secondary: '#0066CC',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#F5F8FA',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D4DDE6',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #003366 0%, #0066CC 100%)',
      secondary: 'linear-gradient(180deg, #003366 0%, #002244 100%)',
      hero: 'linear-gradient(to right, #003366 0%, #0066CC 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 51, 102, 0.08)',
      md: '0 4px 6px -1px rgba(0, 51, 102, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 51, 102, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.cbq.qa',
    description: 'بنك قطري رائد في تقديم الخدمات المصرفية المتكاملة',
  },

  ibq: {
    id: 'ibq',
    nameEn: 'International Bank of Qatar',
    nameAr: 'بنك الخليج الدولي',
    colors: {
      primary: '#8E1838',
      secondary: '#6B122A',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#FFF5F7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#E8D1D8',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #8E1838 0%, #6B122A 100%)',
      secondary: 'linear-gradient(180deg, #8E1838 0%, #5F0F23 100%)',
      hero: 'linear-gradient(to right, #8E1838 0%, #6B122A 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(142, 24, 56, 0.08)',
      md: '0 4px 6px -1px rgba(142, 24, 56, 0.15)',
      lg: '0 10px 15px -3px rgba(142, 24, 56, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.ibq.com.qa',
    description: 'بنك دولي مقره قطر يقدم خدمات مصرفية متميزة',
  },

  bankmuscat: {
    id: 'bankmuscat',
    nameEn: 'Bank Muscat',
    nameAr: 'بنك مسقط',
    colors: {
      primary: '#ED1C24',
      secondary: '#C0161D',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#FFF5F6',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD6D8',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #ED1C24 0%, #C0161D 100%)',
      secondary: 'linear-gradient(180deg, #ED1C24 0%, #9B121A 100%)',
      hero: 'linear-gradient(to right, #ED1C24 0%, #C0161D 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(237, 28, 36, 0.08)',
      md: '0 4px 6px -1px rgba(237, 28, 36, 0.15)',
      lg: '0 10px 15px -3px rgba(237, 28, 36, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.bankmuscat.com',
    description: 'أكبر بنك في سلطنة عُمان ورائد الخدمات المصرفية',
  },

  sohar: {
    id: 'sohar',
    nameEn: 'Sohar International',
    nameAr: 'بنك صحار الدولي',
    colors: {
      primary: '#009639',
      secondary: '#00B946',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#F5FBF7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D1E8DC',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #009639 0%, #00B946 100%)',
      secondary: 'linear-gradient(180deg, #009639 0%, #006C28 100%)',
      hero: 'linear-gradient(to right, #009639 0%, #00B946 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 150, 57, 0.08)',
      md: '0 4px 6px -1px rgba(0, 150, 57, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 150, 57, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.soharinternational.com',
    description: 'بنك عُماني رائد في تقديم حلول مصرفية مبتكرة',
  },

  nbo: {
    id: 'nbo',
    nameEn: 'National Bank of Oman',
    nameAr: 'البنك الأهلي العُماني',
    colors: {
      primary: '#ED1C24',
      secondary: '#C0161D',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#FFF5F6',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD6D8',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #ED1C24 0%, #C0161D 100%)',
      secondary: 'linear-gradient(180deg, #ED1C24 0%, #9B121A 100%)',
      hero: 'linear-gradient(to right, #ED1C24 0%, #C0161D 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(237, 28, 36, 0.08)',
      md: '0 4px 6px -1px rgba(237, 28, 36, 0.15)',
      lg: '0 10px 15px -3px rgba(237, 28, 36, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.nbo.om',
    description: 'بنك عُماني رائد في تقديم الخدمات المصرفية الشاملة',
  },

  nbf: {
    id: 'nbf',
    nameEn: 'Ahli United Bank',
    nameAr: 'البنك الأهلي المتحد',
    colors: {
      primary: '#CE1126',
      secondary: '#A00E1E',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#FFF5F7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD6DD',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #CE1126 0%, #A00E1E 100%)',
      secondary: 'linear-gradient(180deg, #CE1126 0%, #7D0B17 100%)',
      hero: 'linear-gradient(to right, #CE1126 0%, #A00E1E 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(206, 17, 38, 0.08)',
      md: '0 4px 6px -1px rgba(206, 17, 38, 0.15)',
      lg: '0 10px 15px -3px rgba(206, 17, 38, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.ahliunited.com',
    description: 'البنك الأهلي المتحد - بنك بحريني رائد في الخدمات المصرفية',
  },

  bbk: {
    id: 'bbk',
    nameEn: 'Bank of Bahrain and Kuwait',
    nameAr: 'بنك البحرين والكويت',
    colors: {
      primary: '#003366',
      secondary: '#0066CC',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#F5F8FA',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#D4DDE6',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #003366 0%, #0066CC 100%)',
      secondary: 'linear-gradient(180deg, #003366 0%, #002244 100%)',
      hero: 'linear-gradient(to right, #003366 0%, #0066CC 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 51, 102, 0.08)',
      md: '0 4px 6px -1px rgba(0, 51, 102, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 51, 102, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    websiteUrl: 'https://www.bbkonline.com',
    description: 'بنك رائد في مملكة البحرين ودولة الكويت',
  },

  abc: {
    id: 'abc',
    nameEn: 'Ahli Bank',
    nameAr: 'البنك الأهلي',
    colors: {
      primary: '#CE1126',
      secondary: '#A00E1E',
      accent: '#D4AF37',
      background: '#FFFFFF',
      surface: '#FFF5F7',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnPrimary: '#FFFFFF',
      border: '#FFD6DD',
    },
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
      arabic: 'Cairo, Tajawal, sans-serif',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #CE1126 0%, #A00E1E 100%)',
      secondary: 'linear-gradient(180deg, #CE1126 0%, #7D0B17 100%)',
      hero: 'linear-gradient(to right, #CE1126 0%, #A00E1E 100%)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(206, 17, 38, 0.08)',
      md: '0 4px 6px -1px rgba(206, 17, 38, 0.15)',
      lg: '0 10px 15px -3px rgba(206, 17, 38, 0.20)',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
    },
    description: 'البنك الأهلي - بنك بحريني رائد في الخدمات المصرفية',
  },
};

export const getBrandingByCompany = (companyKey: string): CompanyBranding | null => {
  const key = companyKey.toLowerCase();
  return shippingCompanyBranding[key] || governmentPaymentBranding[key] || bankBranding[key] || null;
};

export const getAllShippingBranding = () => Object.values(shippingCompanyBranding);
export const getAllGovernmentBranding = () => Object.values(governmentPaymentBranding);
export const getAllBankBranding = () => Object.values(bankBranding);
