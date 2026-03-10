export interface SpacingScale {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '8': string;
  '10': string;
  '12': string;
  '16': string;
  '20': string;
  '24': string;
  '32': string;
  '40': string;
  '48': string;
  '56': string;
  '64': string;
}

export interface TypographyScale {
  xs: { size: string; lineHeight: string; letterSpacing: string; };
  sm: { size: string; lineHeight: string; letterSpacing: string; };
  base: { size: string; lineHeight: string; letterSpacing: string; };
  lg: { size: string; lineHeight: string; letterSpacing: string; };
  xl: { size: string; lineHeight: string; letterSpacing: string; };
  '2xl': { size: string; lineHeight: string; letterSpacing: string; };
  '3xl': { size: string; lineHeight: string; letterSpacing: string; };
  '4xl': { size: string; lineHeight: string; letterSpacing: string; };
  '5xl': { size: string; lineHeight: string; letterSpacing: string; };
}

export interface ButtonStyles {
  primary: {
    base: string;
    hover: string;
    active: string;
    disabled: string;
    focus: string;
  };
  secondary: {
    base: string;
    hover: string;
    active: string;
    disabled: string;
    focus: string;
  };
  sizes: {
    sm: { padding: string; fontSize: string; height: string; };
    md: { padding: string; fontSize: string; height: string; };
    lg: { padding: string; fontSize: string; height: string; };
    xl: { padding: string; fontSize: string; height: string; };
  };
}

export interface InputStyles {
  base: {
    height: string;
    padding: string;
    fontSize: string;
    borderWidth: string;
    borderRadius: string;
  };
  focus: {
    borderColor: string;
    ringWidth: string;
    ringColor: string;
    ringOpacity: string;
  };
  error: {
    borderColor: string;
    textColor: string;
  };
}

export interface CompanyDesignSystem {
  spacing: SpacingScale;
  typography: TypographyScale;
  buttons: ButtonStyles;
  inputs: InputStyles;
  elevation: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  transitions: {
    fast: string;
    base: string;
    slow: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
}

export const spacingSystem: SpacingScale = {
  '0': '0',
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
  '20': '80px',
  '24': '96px',
  '32': '128px',
  '40': '160px',
  '48': '192px',
  '56': '224px',
  '64': '256px',
};

export const typographyScale: TypographyScale = {
  xs: { size: '12px', lineHeight: '16px', letterSpacing: '0.01em' },
  sm: { size: '14px', lineHeight: '20px', letterSpacing: '0.01em' },
  base: { size: '16px', lineHeight: '24px', letterSpacing: '0' },
  lg: { size: '18px', lineHeight: '28px', letterSpacing: '-0.01em' },
  xl: { size: '20px', lineHeight: '28px', letterSpacing: '-0.01em' },
  '2xl': { size: '24px', lineHeight: '32px', letterSpacing: '-0.02em' },
  '3xl': { size: '30px', lineHeight: '36px', letterSpacing: '-0.02em' },
  '4xl': { size: '36px', lineHeight: '40px', letterSpacing: '-0.02em' },
  '5xl': { size: '48px', lineHeight: '56px', letterSpacing: '-0.03em' },
};

export const aramexDesignSystem: CompanyDesignSystem = {
  spacing: spacingSystem,
  typography: typographyScale,
  buttons: {
    primary: {
      base: '#DC291E',
      hover: '#B52118',
      active: '#8B1A12',
      disabled: '#CCCCCC',
      focus: '#DC291E',
    },
    secondary: {
      base: '#000000',
      hover: '#1A1A1A',
      active: '#333333',
      disabled: '#CCCCCC',
      focus: '#000000',
    },
    sizes: {
      sm: { padding: '8px 16px', fontSize: '14px', height: '36px' },
      md: { padding: '12px 24px', fontSize: '16px', height: '44px' },
      lg: { padding: '16px 32px', fontSize: '18px', height: '52px' },
      xl: { padding: '20px 40px', fontSize: '20px', height: '60px' },
    },
  },
  inputs: {
    base: {
      height: '48px',
      padding: '12px 16px',
      fontSize: '16px',
      borderWidth: '1px',
      borderRadius: '8px',
    },
    focus: {
      borderColor: '#DC291E',
      ringWidth: '2px',
      ringColor: '#DC291E',
      ringOpacity: '0.2',
    },
    error: {
      borderColor: '#EF4444',
      textColor: '#DC2626',
    },
  },
  elevation: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(220, 41, 30, 0.05)',
    md: '0 4px 6px -1px rgba(220, 41, 30, 0.1), 0 2px 4px -1px rgba(220, 41, 30, 0.06)',
    lg: '0 10px 15px -3px rgba(220, 41, 30, 0.1), 0 4px 6px -2px rgba(220, 41, 30, 0.05)',
    xl: '0 20px 25px -5px rgba(220, 41, 30, 0.1), 0 10px 10px -5px rgba(220, 41, 30, 0.04)',
    '2xl': '0 25px 50px -12px rgba(220, 41, 30, 0.25)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export const dhlDesignSystem: CompanyDesignSystem = {
  spacing: spacingSystem,
  typography: typographyScale,
  buttons: {
    primary: {
      base: '#FFCC00',
      hover: '#FFD633',
      active: '#E6B800',
      disabled: '#CCCCCC',
      focus: '#FFCC00',
    },
    secondary: {
      base: '#D40511',
      hover: '#F91320',
      active: '#98040C',
      disabled: '#CCCCCC',
      focus: '#D40511',
    },
    sizes: {
      sm: { padding: '8px 20px', fontSize: '14px', height: '36px' },
      md: { padding: '10px 30px', fontSize: '15px', height: '42px' },
      lg: { padding: '12px 36px', fontSize: '16px', height: '48px' },
      xl: { padding: '16px 48px', fontSize: '18px', height: '56px' },
    },
  },
  inputs: {
    base: {
      height: '48px',
      padding: '12px 16px',
      fontSize: '15px',
      borderWidth: '2px',
      borderRadius: '4px',
    },
    focus: {
      borderColor: '#FFCC00',
      ringWidth: '2px',
      ringColor: '#FFCC00',
      ringOpacity: '0.3',
    },
    error: {
      borderColor: '#D40511',
      textColor: '#D40511',
    },
  },
  elevation: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(255, 204, 0, 0.1)',
    md: '0 4px 6px -1px rgba(212, 5, 17, 0.1), 0 2px 4px -1px rgba(212, 5, 17, 0.06)',
    lg: '0 10px 15px -3px rgba(212, 5, 17, 0.1), 0 4px 6px -2px rgba(212, 5, 17, 0.05)',
    xl: '0 20px 25px -5px rgba(212, 5, 17, 0.1), 0 10px 10px -5px rgba(212, 5, 17, 0.04)',
    '2xl': '0 25px 50px -12px rgba(212, 5, 17, 0.25)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export const fedexDesignSystem: CompanyDesignSystem = {
  spacing: spacingSystem,
  typography: typographyScale,
  buttons: {
    primary: {
      base: '#660099',
      hover: '#7A0DB8',
      active: '#4D0073',
      disabled: '#CCCCCC',
      focus: '#660099',
    },
    secondary: {
      base: '#FF6600',
      hover: '#FF7A1A',
      active: '#E65C00',
      disabled: '#CCCCCC',
      focus: '#FF6600',
    },
    sizes: {
      sm: { padding: '8px 18px', fontSize: '14px', height: '36px' },
      md: { padding: '12px 28px', fontSize: '16px', height: '44px' },
      lg: { padding: '14px 34px', fontSize: '17px', height: '50px' },
      xl: { padding: '18px 42px', fontSize: '19px', height: '58px' },
    },
  },
  inputs: {
    base: {
      height: '48px',
      padding: '14px 16px',
      fontSize: '16px',
      borderWidth: '2px',
      borderRadius: '6px',
    },
    focus: {
      borderColor: '#660099',
      ringWidth: '3px',
      ringColor: '#660099',
      ringOpacity: '0.25',
    },
    error: {
      borderColor: '#EF4444',
      textColor: '#DC2626',
    },
  },
  elevation: {
    none: 'none',
    sm: '0 1px 3px 0 rgba(102, 0, 153, 0.08)',
    md: '0 4px 8px -2px rgba(102, 0, 153, 0.12), 0 2px 4px -1px rgba(102, 0, 153, 0.06)',
    lg: '0 12px 16px -4px rgba(102, 0, 153, 0.12), 0 4px 6px -2px rgba(102, 0, 153, 0.05)',
    xl: '0 20px 28px -6px rgba(102, 0, 153, 0.12), 0 10px 12px -5px rgba(102, 0, 153, 0.04)',
    '2xl': '0 28px 54px -14px rgba(102, 0, 153, 0.25)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export const upsDesignSystem: CompanyDesignSystem = {
  spacing: spacingSystem,
  typography: typographyScale,
  buttons: {
    primary: {
      base: '#351C15',
      hover: '#4A2820',
      active: '#2A1611',
      disabled: '#CCCCCC',
      focus: '#351C15',
    },
    secondary: {
      base: '#FFB500',
      hover: '#FFC233',
      active: '#E6A200',
      disabled: '#CCCCCC',
      focus: '#FFB500',
    },
    sizes: {
      sm: { padding: '8px 16px', fontSize: '14px', height: '36px' },
      md: { padding: '10px 24px', fontSize: '15px', height: '40px' },
      lg: { padding: '12px 30px', fontSize: '16px', height: '46px' },
      xl: { padding: '14px 36px', fontSize: '18px', height: '52px' },
    },
  },
  inputs: {
    base: {
      height: '44px',
      padding: '10px 14px',
      fontSize: '15px',
      borderWidth: '1px',
      borderRadius: '4px',
    },
    focus: {
      borderColor: '#FFB500',
      ringWidth: '2px',
      ringColor: '#FFB500',
      ringOpacity: '0.2',
    },
    error: {
      borderColor: '#EF4444',
      textColor: '#DC2626',
    },
  },
  elevation: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(53, 28, 21, 0.05)',
    md: '0 3px 6px -1px rgba(53, 28, 21, 0.1), 0 2px 4px -1px rgba(53, 28, 21, 0.06)',
    lg: '0 8px 14px -3px rgba(53, 28, 21, 0.1), 0 4px 6px -2px rgba(53, 28, 21, 0.05)',
    xl: '0 16px 24px -5px rgba(53, 28, 21, 0.1), 0 8px 10px -5px rgba(53, 28, 21, 0.04)',
    '2xl': '0 24px 48px -12px rgba(53, 28, 21, 0.25)',
  },
  transitions: {
    fast: '100ms cubic-bezier(0.4, 0, 0.6, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.6, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.6, 1)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export const smsaDesignSystem: CompanyDesignSystem = {
  spacing: spacingSystem,
  typography: typographyScale,
  buttons: {
    primary: {
      base: '#662D91',
      hover: '#7A3AAA',
      active: '#4F2371',
      disabled: '#CCCCCC',
      focus: '#662D91',
    },
    secondary: {
      base: '#FF6600',
      hover: '#FF7A1A',
      active: '#E65C00',
      disabled: '#CCCCCC',
      focus: '#FF6600',
    },
    sizes: {
      sm: { padding: '8px 18px', fontSize: '14px', height: '38px' },
      md: { padding: '12px 26px', fontSize: '16px', height: '46px' },
      lg: { padding: '14px 32px', fontSize: '17px', height: '52px' },
      xl: { padding: '16px 40px', fontSize: '19px', height: '58px' },
    },
  },
  inputs: {
    base: {
      height: '50px',
      padding: '14px 18px',
      fontSize: '16px',
      borderWidth: '2px',
      borderRadius: '8px',
    },
    focus: {
      borderColor: '#662D91',
      ringWidth: '3px',
      ringColor: '#662D91',
      ringOpacity: '0.2',
    },
    error: {
      borderColor: '#EF4444',
      textColor: '#DC2626',
    },
  },
  elevation: {
    none: 'none',
    sm: '0 2px 4px 0 rgba(102, 45, 145, 0.08)',
    md: '0 4px 8px -2px rgba(102, 45, 145, 0.12), 0 2px 4px -1px rgba(102, 45, 145, 0.07)',
    lg: '0 10px 18px -4px rgba(102, 45, 145, 0.15), 0 4px 8px -2px rgba(102, 45, 145, 0.08)',
    xl: '0 20px 30px -6px rgba(102, 45, 145, 0.15), 0 10px 12px -5px rgba(102, 45, 145, 0.06)',
    '2xl': '0 30px 60px -15px rgba(102, 45, 145, 0.3)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export const naqelDesignSystem: CompanyDesignSystem = {
  spacing: spacingSystem,
  typography: typographyScale,
  buttons: {
    primary: {
      base: '#E61838',
      hover: '#FF2040',
      active: '#C01430',
      disabled: '#CCCCCC',
      focus: '#E61838',
    },
    secondary: {
      base: '#002E60',
      hover: '#003B7A',
      active: '#002349',
      disabled: '#CCCCCC',
      focus: '#002E60',
    },
    sizes: {
      sm: { padding: '8px 18px', fontSize: '14px', height: '38px' },
      md: { padding: '12px 28px', fontSize: '16px', height: '46px' },
      lg: { padding: '14px 34px', fontSize: '17px', height: '52px' },
      xl: { padding: '18px 42px', fontSize: '19px', height: '60px' },
    },
  },
  inputs: {
    base: {
      height: '50px',
      padding: '14px 18px',
      fontSize: '16px',
      borderWidth: '2px',
      borderRadius: '8px',
    },
    focus: {
      borderColor: '#E61838',
      ringWidth: '3px',
      ringColor: '#E61838',
      ringOpacity: '0.25',
    },
    error: {
      borderColor: '#EF4444',
      textColor: '#DC2626',
    },
  },
  elevation: {
    none: 'none',
    sm: '0 2px 4px 0 rgba(230, 24, 56, 0.08)',
    md: '0 4px 8px -2px rgba(230, 24, 56, 0.12), 0 2px 4px -1px rgba(230, 24, 56, 0.07)',
    lg: '0 10px 18px -4px rgba(230, 24, 56, 0.15), 0 4px 8px -2px rgba(230, 24, 56, 0.08)',
    xl: '0 20px 30px -6px rgba(230, 24, 56, 0.15), 0 10px 12px -5px rgba(230, 24, 56, 0.06)',
    '2xl': '0 30px 60px -15px rgba(230, 24, 56, 0.3)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export const companyDesignSystems: Record<string, CompanyDesignSystem> = {
  aramex: aramexDesignSystem,
  dhl: dhlDesignSystem,
  dhlkw: dhlDesignSystem,
  dhlqa: dhlDesignSystem,
  dhlom: dhlDesignSystem,
  dhlbh: dhlDesignSystem,
  fedex: fedexDesignSystem,
  ups: upsDesignSystem,
  smsa: smsaDesignSystem,
  naqel: naqelDesignSystem,
};

export const getCompanyDesignSystem = (companyKey: string): CompanyDesignSystem => {
  return companyDesignSystems[companyKey.toLowerCase()] || aramexDesignSystem;
};

export interface CardFormDesign {
  container: {
    maxWidth: string;
    padding: string;
    margin: string;
  };
  cardDisplay: {
    width: string;
    height: string;
    borderRadius: string;
    padding: string;
  };
  inputField: {
    height: string;
    gap: string;
    labelMargin: string;
  };
  submitButton: {
    width: string;
    marginTop: string;
  };
}

export const standardCardFormDesign: CardFormDesign = {
  container: {
    maxWidth: '480px',
    padding: '32px',
    margin: '0 auto',
  },
  cardDisplay: {
    width: '100%',
    height: '220px',
    borderRadius: '16px',
    padding: '24px',
  },
  inputField: {
    height: '48px',
    gap: '16px',
    labelMargin: '8px',
  },
  submitButton: {
    width: '100%',
    marginTop: '32px',
  },
};

export const premiumCardFormDesign: CardFormDesign = {
  container: {
    maxWidth: '560px',
    padding: '40px',
    margin: '0 auto',
  },
  cardDisplay: {
    width: '100%',
    height: '240px',
    borderRadius: '20px',
    padding: '28px',
  },
  inputField: {
    height: '52px',
    gap: '20px',
    labelMargin: '10px',
  },
  submitButton: {
    width: '100%',
    marginTop: '40px',
  },
};

export const getCardFormDesign = (tier: 'standard' | 'premium' = 'standard'): CardFormDesign => {
  return tier === 'premium' ? premiumCardFormDesign : standardCardFormDesign;
};
