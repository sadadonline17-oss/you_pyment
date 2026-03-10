export const designSystem = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
    },
    accent: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e',
      700: '#15803d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      500: '#f59e0b',
      700: '#b45309',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      700: '#b91c1c',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    }
  },
  
  typography: {
    fontFamilies: {
      arabic: "'Cairo', 'Tajawal', 'IBM Plex Sans Arabic', sans-serif",
      latin: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
    },
    
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    
    fontWeights: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    
    lineHeights: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    }
  },
  
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
  },
  
  borderRadius: {
    none: '0',
    sm: '0.375rem',
    DEFAULT: '0.5rem',
    md: '0.625rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.25rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    md: '0 6px 12px -2px rgba(0, 0, 0, 0.12), 0 3px 7px -3px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 20px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  },
  
  animation: {
    duration: {
      fast: '150ms',
      DEFAULT: '250ms',
      slow: '350ms',
      slower: '500ms',
    },
    
    easing: {
      DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  },
  
  components: {
    button: {
      base: {
        padding: '0.75rem 1.5rem',
        borderRadius: '0.75rem',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
      },
      
      sizes: {
        sm: {
          padding: '0.5rem 1rem',
          fontSize: '0.875rem',
        },
        md: {
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
        },
        lg: {
          padding: '1rem 2rem',
          fontSize: '1.125rem',
        },
        xl: {
          padding: '1.25rem 2.5rem',
          fontSize: '1.25rem',
        }
      },
      
      variants: {
        primary: {
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
          color: '#ffffff',
          boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.15)',
          hover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px -2px rgba(0, 0, 0, 0.2)',
          }
        },
        secondary: {
          background: '#ffffff',
          color: 'var(--color-primary)',
          border: '2px solid var(--color-primary)',
          boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.1)',
          hover: {
            background: 'var(--color-primary)',
            color: '#ffffff',
          }
        },
        ghost: {
          background: 'transparent',
          color: 'var(--color-primary)',
          hover: {
            background: 'rgba(0, 0, 0, 0.05)',
          }
        }
      }
    },
    
    input: {
      base: {
        padding: '0.875rem 1rem',
        borderRadius: '0.75rem',
        fontSize: '1rem',
        border: '2px solid #e5e5e5',
        transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        background: '#ffffff',
      },
      
      states: {
        focus: {
          borderColor: 'var(--color-primary)',
          boxShadow: '0 0 0 3px rgba(14, 165, 233, 0.1)',
          outline: 'none',
        },
        error: {
          borderColor: '#ef4444',
          boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
        },
        disabled: {
          background: '#f5f5f5',
          cursor: 'not-allowed',
          opacity: '0.6',
        }
      }
    },
    
    card: {
      base: {
        background: '#ffffff',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.08)',
        border: '1px solid #f5f5f5',
      },
      
      variants: {
        elevated: {
          boxShadow: '0 10px 20px -3px rgba(0, 0, 0, 0.12)',
        },
        outlined: {
          border: '2px solid #e5e5e5',
          boxShadow: 'none',
        },
        flat: {
          boxShadow: 'none',
          border: 'none',
        }
      }
    }
  },
  
  layout: {
    maxWidth: {
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      '7xl': '80rem',
      full: '100%',
    },
    
    containerPadding: {
      mobile: '1rem',
      tablet: '1.5rem',
      desktop: '2rem',
    }
  }
};

export type DesignSystem = typeof designSystem;
