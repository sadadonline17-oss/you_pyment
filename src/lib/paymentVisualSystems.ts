/**
 * Professional Visual Identity Systems for Non-Government Payment Pages
 * Each service type has a completely custom, non-generic visual design
 */

export interface ServiceVisualIdentity {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    error: string;
    warning: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    background: string;
    button: string;
    header: string;
  };
  fonts: {
    primary: string;
    secondary: string;
    headingWeight: string;
    bodyWeight: string;
  };
  ui: {
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    inputHeight: string;
    buttonHeight: string;
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
  header: {
    height: string;
    background: string;
    pattern: 'gradient' | 'solid' | 'image';
    showLogo: boolean;
    logoPosition: 'left' | 'center' | 'right';
  };
  form: {
    layout: 'single' | 'split' | 'stacked';
    cardStyle: 'elevated' | 'flat' | 'bordered' | 'glass';
    labelStyle: 'inline' | 'stacked';
    inputStyle: 'rounded' | 'sharp' | 'pill';
  };
}

/**
 * SHIPPING SERVICES - Express Delivery Style
 * Professional courier/logistics visual identity
 */
const shippingVisual: ServiceVisualIdentity = {
  name: 'Shipping Services',
  colors: {
    primary: '#FF6B35',
    secondary: '#FF8C42',
    accent: '#F4A261',
    background: '#FFF8F0',
    surface: '#FFFFFF',
    text: '#2C3E50',
    textSecondary: '#7F8C8D',
    border: '#FFE8D6',
    success: '#27AE60',
    error: '#E74C3C',
    warning: '#F39C12',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
    secondary: 'linear-gradient(135deg, #F4A261 0%, #E76F51 100%)',
    background: 'linear-gradient(180deg, #FFF8F0 0%, #FFFFFF 100%)',
    button: 'linear-gradient(135deg, #FF6B35 0%, #E76F51 100%)',
    header: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
  },
  fonts: {
    primary: "'Poppins', 'Cairo', sans-serif",
    secondary: "'Inter', 'Tajawal', sans-serif",
    headingWeight: '700',
    bodyWeight: '500',
  },
  ui: {
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
    },
    shadows: {
      sm: '0 2px 8px rgba(255, 107, 53, 0.1)',
      md: '0 4px 16px rgba(255, 107, 53, 0.15)',
      lg: '0 8px 24px rgba(255, 107, 53, 0.2)',
      xl: '0 16px 48px rgba(255, 107, 53, 0.25)',
    },
    inputHeight: '52px',
    buttonHeight: '56px',
    spacing: {
      xs: '8px',
      sm: '12px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
  },
  header: {
    height: '80px',
    background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
    pattern: 'gradient',
    showLogo: true,
    logoPosition: 'center',
  },
  form: {
    layout: 'single',
    cardStyle: 'elevated',
    labelStyle: 'stacked',
    inputStyle: 'rounded',
  },
};

/**
 * CHALET BOOKINGS - Hospitality & Leisure Style
 * Warm, inviting, vacation-oriented visual identity
 */
const chaletVisual: ServiceVisualIdentity = {
  name: 'Chalet Bookings',
  colors: {
    primary: '#2ECC71',
    secondary: '#27AE60',
    accent: '#52C894',
    background: '#F0FFF4',
    surface: '#FFFFFF',
    text: '#1A472A',
    textSecondary: '#5F9570',
    border: '#D4EDDA',
    success: '#28A745',
    error: '#DC3545',
    warning: '#FFC107',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)',
    secondary: 'linear-gradient(135deg, #52C894 0%, #2ECC71 100%)',
    background: 'linear-gradient(180deg, #F0FFF4 0%, #FFFFFF 100%)',
    button: 'linear-gradient(135deg, #2ECC71 0%, #1E8449 100%)',
    header: 'linear-gradient(135deg, #1E8449 0%, #27AE60 100%)',
  },
  fonts: {
    primary: "'Montserrat', 'Cairo', sans-serif",
    secondary: "'Open Sans', 'Tajawal', sans-serif",
    headingWeight: '600',
    bodyWeight: '400',
  },
  ui: {
    borderRadius: {
      sm: '10px',
      md: '14px',
      lg: '18px',
      xl: '24px',
    },
    shadows: {
      sm: '0 2px 10px rgba(46, 204, 113, 0.12)',
      md: '0 4px 20px rgba(46, 204, 113, 0.18)',
      lg: '0 8px 30px rgba(46, 204, 113, 0.24)',
      xl: '0 16px 50px rgba(46, 204, 113, 0.3)',
    },
    inputHeight: '50px',
    buttonHeight: '54px',
    spacing: {
      xs: '10px',
      sm: '14px',
      md: '18px',
      lg: '26px',
      xl: '34px',
    },
  },
  header: {
    height: '90px',
    background: 'linear-gradient(135deg, #1E8449 0%, #27AE60 100%)',
    pattern: 'gradient',
    showLogo: true,
    logoPosition: 'center',
  },
  form: {
    layout: 'single',
    cardStyle: 'glass',
    labelStyle: 'stacked',
    inputStyle: 'rounded',
  },
};

/**
 * HEALTH SERVICES - Medical & Healthcare Style
 * Clean, trustworthy, professional medical visual identity
 */
const healthVisual: ServiceVisualIdentity = {
  name: 'Health Services',
  colors: {
    primary: '#3498DB',
    secondary: '#2980B9',
    accent: '#5DADE2',
    background: '#EBF5FB',
    surface: '#FFFFFF',
    text: '#154360',
    textSecondary: '#5D6D7E',
    border: '#D6EAF8',
    success: '#1ABC9C',
    error: '#E74C3C',
    warning: '#F39C12',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #3498DB 0%, #2980B9 100%)',
    secondary: 'linear-gradient(135deg, #5DADE2 0%, #3498DB 100%)',
    background: 'linear-gradient(180deg, #EBF5FB 0%, #FFFFFF 100%)',
    button: 'linear-gradient(135deg, #3498DB 0%, #21618C 100%)',
    header: 'linear-gradient(135deg, #21618C 0%, #2980B9 100%)',
  },
  fonts: {
    primary: "'Roboto', 'Cairo', sans-serif",
    secondary: "'Lato', 'Tajawal', sans-serif",
    headingWeight: '600',
    bodyWeight: '400',
  },
  ui: {
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
      xl: '18px',
    },
    shadows: {
      sm: '0 2px 8px rgba(52, 152, 219, 0.1)',
      md: '0 4px 16px rgba(52, 152, 219, 0.15)',
      lg: '0 8px 24px rgba(52, 152, 219, 0.2)',
      xl: '0 12px 40px rgba(52, 152, 219, 0.25)',
    },
    inputHeight: '48px',
    buttonHeight: '52px',
    spacing: {
      xs: '8px',
      sm: '12px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
  },
  header: {
    height: '75px',
    background: 'linear-gradient(135deg, #21618C 0%, #2980B9 100%)',
    pattern: 'gradient',
    showLogo: true,
    logoPosition: 'left',
  },
  form: {
    layout: 'single',
    cardStyle: 'elevated',
    labelStyle: 'stacked',
    inputStyle: 'rounded',
  },
};

/**
 * LOGISTICS SERVICES - Industrial & Professional Style
 * Bold, efficient, enterprise-grade visual identity
 */
const logisticsVisual: ServiceVisualIdentity = {
  name: 'Logistics Services',
  colors: {
    primary: '#9B59B6',
    secondary: '#8E44AD',
    accent: '#AF7AC5',
    background: '#F4ECF7',
    surface: '#FFFFFF',
    text: '#4A235A',
    textSecondary: '#7D3C98',
    border: '#E8DAEF',
    success: '#27AE60',
    error: '#C0392B',
    warning: '#E67E22',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)',
    secondary: 'linear-gradient(135deg, #AF7AC5 0%, #9B59B6 100%)',
    background: 'linear-gradient(180deg, #F4ECF7 0%, #FFFFFF 100%)',
    button: 'linear-gradient(135deg, #9B59B6 0%, #6C3483 100%)',
    header: 'linear-gradient(135deg, #6C3483 0%, #8E44AD 100%)',
  },
  fonts: {
    primary: "'Ubuntu', 'Cairo', sans-serif",
    secondary: "'Source Sans Pro', 'Tajawal', sans-serif",
    headingWeight: '700',
    bodyWeight: '500',
  },
  ui: {
    borderRadius: {
      sm: '7px',
      md: '11px',
      lg: '15px',
      xl: '20px',
    },
    shadows: {
      sm: '0 2px 10px rgba(155, 89, 182, 0.12)',
      md: '0 4px 18px rgba(155, 89, 182, 0.18)',
      lg: '0 8px 28px rgba(155, 89, 182, 0.24)',
      xl: '0 14px 45px rgba(155, 89, 182, 0.3)',
    },
    inputHeight: '51px',
    buttonHeight: '55px',
    spacing: {
      xs: '9px',
      sm: '13px',
      md: '17px',
      lg: '25px',
      xl: '33px',
    },
  },
  header: {
    height: '85px',
    background: 'linear-gradient(135deg, #6C3483 0%, #8E44AD 100%)',
    pattern: 'gradient',
    showLogo: true,
    logoPosition: 'center',
  },
  form: {
    layout: 'single',
    cardStyle: 'elevated',
    labelStyle: 'stacked',
    inputStyle: 'rounded',
  },
};

/**
 * CONTRACTS - Legal & Professional Style
 * Formal, authoritative, document-oriented visual identity
 */
const contractsVisual: ServiceVisualIdentity = {
  name: 'Contracts',
  colors: {
    primary: '#E67E22',
    secondary: '#D68910',
    accent: '#F39C12',
    background: '#FEF5E7',
    surface: '#FFFFFF',
    text: '#7E5109',
    textSecondary: '#BA4A00',
    border: '#FAE5D3',
    success: '#27AE60',
    error: '#C0392B',
    warning: '#E74C3C',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #E67E22 0%, #D68910 100%)',
    secondary: 'linear-gradient(135deg, #F39C12 0%, #E67E22 100%)',
    background: 'linear-gradient(180deg, #FEF5E7 0%, #FFFFFF 100%)',
    button: 'linear-gradient(135deg, #E67E22 0%, #AF601A 100%)',
    header: 'linear-gradient(135deg, #AF601A 0%, #D68910 100%)',
  },
  fonts: {
    primary: "'Merriweather', 'Cairo', serif",
    secondary: "'PT Sans', 'Tajawal', sans-serif",
    headingWeight: '700',
    bodyWeight: '400',
  },
  ui: {
    borderRadius: {
      sm: '5px',
      md: '9px',
      lg: '13px',
      xl: '17px',
    },
    shadows: {
      sm: '0 2px 8px rgba(230, 126, 34, 0.1)',
      md: '0 4px 16px rgba(230, 126, 34, 0.15)',
      lg: '0 6px 24px rgba(230, 126, 34, 0.2)',
      xl: '0 12px 36px rgba(230, 126, 34, 0.25)',
    },
    inputHeight: '49px',
    buttonHeight: '53px',
    spacing: {
      xs: '8px',
      sm: '12px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
  },
  header: {
    height: '78px',
    background: 'linear-gradient(135deg, #AF601A 0%, #D68910 100%)',
    pattern: 'gradient',
    showLogo: true,
    logoPosition: 'left',
  },
  form: {
    layout: 'single',
    cardStyle: 'bordered',
    labelStyle: 'stacked',
    inputStyle: 'sharp',
  },
};

/**
 * INVOICES - Financial & Professional Style
 * Clean, organized, business-oriented visual identity
 */
const invoicesVisual: ServiceVisualIdentity = {
  name: 'Invoices',
  colors: {
    primary: '#1ABC9C',
    secondary: '#16A085',
    accent: '#48C9B0',
    background: '#E8F8F5',
    surface: '#FFFFFF',
    text: '#0E6251',
    textSecondary: '#17A589',
    border: '#D1F2EB',
    success: '#27AE60',
    error: '#E74C3C',
    warning: '#F39C12',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #1ABC9C 0%, #16A085 100%)',
    secondary: 'linear-gradient(135deg, #48C9B0 0%, #1ABC9C 100%)',
    background: 'linear-gradient(180deg, #E8F8F5 0%, #FFFFFF 100%)',
    button: 'linear-gradient(135deg, #1ABC9C 0%, #117A65 100%)',
    header: 'linear-gradient(135deg, #117A65 0%, #16A085 100%)',
  },
  fonts: {
    primary: "'Nunito', 'Cairo', sans-serif",
    secondary: "'Raleway', 'Tajawal', sans-serif",
    headingWeight: '600',
    bodyWeight: '400',
  },
  ui: {
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
      xl: '18px',
    },
    shadows: {
      sm: '0 2px 8px rgba(26, 188, 156, 0.1)',
      md: '0 4px 16px rgba(26, 188, 156, 0.15)',
      lg: '0 8px 24px rgba(26, 188, 156, 0.2)',
      xl: '0 14px 40px rgba(26, 188, 156, 0.25)',
    },
    inputHeight: '48px',
    buttonHeight: '52px',
    spacing: {
      xs: '8px',
      sm: '12px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
  },
  header: {
    height: '76px',
    background: 'linear-gradient(135deg, #117A65 0%, #16A085 100%)',
    pattern: 'gradient',
    showLogo: true,
    logoPosition: 'center',
  },
  form: {
    layout: 'single',
    cardStyle: 'elevated',
    labelStyle: 'stacked',
    inputStyle: 'rounded',
  },
};

/**
 * GENERIC PAYMENT - Modern & Versatile Style
 * Sleek, modern, multi-purpose visual identity
 */
const genericPaymentVisual: ServiceVisualIdentity = {
  name: 'Generic Payment',
  colors: {
    primary: '#5F27CD',
    secondary: '#341F97',
    accent: '#8854D0',
    background: '#F5F3FF',
    surface: '#FFFFFF',
    text: '#2D1B69',
    textSecondary: '#6C5CE7',
    border: '#E9E4FF',
    success: '#00B894',
    error: '#D63031',
    warning: '#FDCB6E',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #5F27CD 0%, #341F97 100%)',
    secondary: 'linear-gradient(135deg, #8854D0 0%, #5F27CD 100%)',
    background: 'linear-gradient(180deg, #F5F3FF 0%, #FFFFFF 100%)',
    button: 'linear-gradient(135deg, #5F27CD 0%, #2D1B69 100%)',
    header: 'linear-gradient(135deg, #2D1B69 0%, #341F97 100%)',
  },
  fonts: {
    primary: "'Plus Jakarta Sans', 'Cairo', sans-serif",
    secondary: "'Inter', 'Tajawal', sans-serif",
    headingWeight: '700',
    bodyWeight: '500',
  },
  ui: {
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
    },
    shadows: {
      sm: '0 2px 10px rgba(95, 39, 205, 0.1)',
      md: '0 4px 20px rgba(95, 39, 205, 0.15)',
      lg: '0 8px 30px rgba(95, 39, 205, 0.2)',
      xl: '0 16px 50px rgba(95, 39, 205, 0.25)',
    },
    inputHeight: '50px',
    buttonHeight: '54px',
    spacing: {
      xs: '8px',
      sm: '12px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
  },
  header: {
    height: '80px',
    background: 'linear-gradient(135deg, #2D1B69 0%, #341F97 100%)',
    pattern: 'gradient',
    showLogo: true,
    logoPosition: 'center',
  },
  form: {
    layout: 'single',
    cardStyle: 'glass',
    labelStyle: 'stacked',
    inputStyle: 'pill',
  },
};

/**
 * LOCAL PAYMENT - Community & Local Style
 * Friendly, accessible, community-oriented visual identity
 */
const localPaymentVisual: ServiceVisualIdentity = {
  name: 'Local Payment',
  colors: {
    primary: '#27AE60',
    secondary: '#229954',
    accent: '#52BE80',
    background: '#EAFAF1',
    surface: '#FFFFFF',
    text: '#145A32',
    textSecondary: '#1E8449',
    border: '#D5F4E6',
    success: '#28A745',
    error: '#DC3545',
    warning: '#FFC107',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #27AE60 0%, #229954 100%)',
    secondary: 'linear-gradient(135deg, #52BE80 0%, #27AE60 100%)',
    background: 'linear-gradient(180deg, #EAFAF1 0%, #FFFFFF 100%)',
    button: 'linear-gradient(135deg, #27AE60 0%, #186A3B 100%)',
    header: 'linear-gradient(135deg, #186A3B 0%, #229954 100%)',
  },
  fonts: {
    primary: "'Quicksand', 'Cairo', sans-serif",
    secondary: "'Work Sans', 'Tajawal', sans-serif",
    headingWeight: '600',
    bodyWeight: '400',
  },
  ui: {
    borderRadius: {
      sm: '9px',
      md: '13px',
      lg: '17px',
      xl: '22px',
    },
    shadows: {
      sm: '0 2px 9px rgba(39, 174, 96, 0.11)',
      md: '0 4px 18px rgba(39, 174, 96, 0.16)',
      lg: '0 8px 27px rgba(39, 174, 96, 0.22)',
      xl: '0 15px 46px rgba(39, 174, 96, 0.28)',
    },
    inputHeight: '50px',
    buttonHeight: '54px',
    spacing: {
      xs: '9px',
      sm: '13px',
      md: '17px',
      lg: '25px',
      xl: '33px',
    },
  },
  header: {
    height: '82px',
    background: 'linear-gradient(135deg, #186A3B 0%, #229954 100%)',
    pattern: 'gradient',
    showLogo: true,
    logoPosition: 'center',
  },
  form: {
    layout: 'single',
    cardStyle: 'elevated',
    labelStyle: 'stacked',
    inputStyle: 'rounded',
  },
};

/**
 * Get visual identity by service key
 */
export function getServiceVisualIdentity(serviceKey: string): ServiceVisualIdentity {
  const key = serviceKey.toLowerCase();
  
  // Shipping services
  if (key.includes('aramex') || key.includes('dhl') || key.includes('fedex') || 
      key.includes('ups') || key.includes('smsa') || key.includes('naqel') || 
      key.includes('zajil') || key.includes('post') || key.includes('shipping')) {
    return shippingVisual;
  }
  
  // Chalet services
  if (key.includes('chalet') || key.includes('booking') || key.includes('resort')) {
    return chaletVisual;
  }
  
  // Health services
  if (key.includes('health') || key.includes('medical') || key.includes('clinic') || 
      key.includes('hospital') || key.includes('doctor')) {
    return healthVisual;
  }
  
  // Logistics services
  if (key.includes('logistics') || key.includes('warehouse') || key.includes('supply')) {
    return logisticsVisual;
  }
  
  // Contracts
  if (key.includes('contract') || key.includes('legal') || key.includes('agreement')) {
    return contractsVisual;
  }
  
  // Invoices
  if (key.includes('invoice') || key.includes('bill') || key.includes('receipt')) {
    return invoicesVisual;
  }
  
  // Local payment
  if (key.includes('local') || key.includes('community')) {
    return localPaymentVisual;
  }
  
  // Default: Generic payment
  return genericPaymentVisual;
}

/**
 * Get visual identity by service type
 */
export function getVisualIdentityByType(type: string): ServiceVisualIdentity {
  switch (type) {
    case 'shipping':
      return shippingVisual;
    case 'chalet':
      return chaletVisual;
    case 'health':
    case 'health_links':
      return healthVisual;
    case 'logistics':
      return logisticsVisual;
    case 'contracts':
      return contractsVisual;
    case 'invoices':
      return invoicesVisual;
    case 'local_payment':
      return localPaymentVisual;
    default:
      return genericPaymentVisual;
  }
}

export const allVisualIdentities = {
  shipping: shippingVisual,
  chalet: chaletVisual,
  health: healthVisual,
  logistics: logisticsVisual,
  contracts: contractsVisual,
  invoices: invoicesVisual,
  localPayment: localPaymentVisual,
  genericPayment: genericPaymentVisual,
};
