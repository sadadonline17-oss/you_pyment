import { governmentPaymentBranding } from './brandingSystem';

export const mapEntityToServiceKey = (entityKey: string): string => {
  const mapping: Record<string, string> = {
    'government_payment': 'sadad',
    'local_payment': 'local_service',
    'health_links': 'health_service',
    'chalets': 'chalet_service',
    'invoices': 'invoice_service',
    'contracts': 'contract_service',
    'bank_pages': 'bank_service',
  };

  return mapping[entityKey] || entityKey;
};

export const enrichLinkWithEntity = (
  linkPayload: Record<string, any>,
  entityKey?: string
): Record<string, any> => {
  if (!entityKey) return linkPayload;

  const serviceKey = mapEntityToServiceKey(entityKey);
  
  return {
    ...linkPayload,
    entity_type: entityKey,
    service_key: serviceKey,
    service_name: getEntityServiceName(entityKey),
  };
};

export const getEntityServiceName = (entityKey: string): string => {
  const names: Record<string, string> = {
    'government_payment': 'الدفع الحكومي - سداد',
    'local_payment': 'الدفع المحلي',
    'health_links': 'الخدمات الصحية',
    'chalets': 'حجز الشاليهات',
    'invoices': 'الفواتير',
    'contracts': 'العقود',
    'bank_pages': 'الخدمات البنكية',
  };

  return names[entityKey] || entityKey;
};

export const getBrandingForEntity = (entityKey: string) => {
  switch (entityKey) {
    case 'government_payment':
      return governmentPaymentBranding['sadad'];
    case 'health_links':
      return {
        colors: {
          primary: '#008080',
          secondary: '#20B2AA',
          accent: '#00CED1',
          background: '#E0FFFF',
          surface: '#F0FFFF',
          text: '#1A1A1A',
          textLight: '#666666',
          textOnPrimary: '#FFFFFF',
          border: '#B0E0E6',
        },
        fonts: {
          primary: 'Arial, sans-serif',
          secondary: 'Verdana, sans-serif',
          arabic: 'Cairo, Tajawal, sans-serif',
        },
        gradients: {
          primary: 'linear-gradient(135deg, #008080 0%, #20B2AA 100%)',
          secondary: 'linear-gradient(180deg, #008080 0%, #006666 100%)',
          hero: 'linear-gradient(to right, #008080 0%, #20B2AA 100%)',
        },
        shadows: {
          sm: '0 1px 2px 0 rgba(0, 128, 128, 0.08)',
          md: '0 4px 6px -1px rgba(0, 128, 128, 0.15)',
          lg: '0 10px 15px -3px rgba(0, 128, 128, 0.20)',
        },
        borderRadius: {
          sm: '6px',
          md: '10px',
          lg: '14px',
        },
      };
    case 'chalets':
      return {
        colors: {
          primary: '#FF6F00',
          secondary: '#FFA000',
          accent: '#FF8F00',
          background: '#FFF3E0',
          surface: '#FFF8E1',
          text: '#1A1A1A',
          textLight: '#666666',
          textOnPrimary: '#FFFFFF',
          border: '#FFE0B2',
        },
        fonts: {
          primary: 'Roboto, sans-serif',
          secondary: 'Arial, sans-serif',
          arabic: 'Cairo, Tajawal, sans-serif',
        },
        gradients: {
          primary: 'linear-gradient(135deg, #FF6F00 0%, #FFA000 100%)',
          secondary: 'linear-gradient(180deg, #FF6F00 0%, #F57C00 100%)',
          hero: 'linear-gradient(to right, #FF6F00 0%, #FFA000 100%)',
        },
        shadows: {
          sm: '0 1px 2px 0 rgba(255, 111, 0, 0.08)',
          md: '0 4px 6px -1px rgba(255, 111, 0, 0.15)',
          lg: '0 10px 15px -3px rgba(255, 111, 0, 0.20)',
        },
        borderRadius: {
          sm: '6px',
          md: '10px',
          lg: '14px',
        },
      };
    default:
      return null;
  }
};

export default {
  mapEntityToServiceKey,
  enrichLinkWithEntity,
  getEntityServiceName,
  getBrandingForEntity,
};
