// GCC Payment Services by Country

export interface PaymentService {
  id: string;
  key: string;
  name: string;
  nameAr: string;
  category: 'bank' | 'wallet' | 'card' | 'transfer';
  logo?: string;
  color?: string;
  description?: string;
}

export const getPaymentServicesByCountry = (countryCode: string): PaymentService[] => {
  const services: Record<string, PaymentService[]> = {
    SA: [
      {
        id: 'stc-pay',
        key: 'stc-pay',
        name: 'STC Pay',
        nameAr: 'إتحاس(STC باي)',
        category: 'wallet',
        color: '#E30613',
        description: 'محفظة إلكترونية من شركة الاتصالات السعودية'
      },
      {
        id: 'mada',
        key: 'mada',
        name: 'mada',
        nameAr: 'مدى',
        category: 'card',
        color: '#006C35',
        description: 'نظام المدفوعات الوطني السعودي'
      },
      {
        id: 'alrajhi',
        key: 'alrajhi',
        name: 'Al Rajhi Bank',
        nameAr: 'بنك الراجحي',
        category: 'bank',
        color: '#006C35',
        description: 'التحويل البنكي عبر بنك الراجحي'
      },
      {
        id: 'riyadh',
        key: 'riyadh',
        name: 'Riyad Bank',
        nameAr: 'بنك الرياض',
        category: 'bank',
        color: '#003366',
        description: 'التحويل البنكي عبر بنك الرياض'
      },
      {
        id: 'snb',
        key: 'snb',
        name: 'SNB',
        nameAr: 'البنك الأهلي',
        category: 'bank',
        color: '#E30613',
        description: 'التحويل البنكي عبر البنك الأهلي'
      },
      {
        id: 'visa',
        key: 'visa',
        name: 'Visa',
        nameAr: 'فيزا',
        category: 'card',
        color: '#1A1F71',
        description: 'بطاقات Visa الائتمانية'
      },
      {
        id: 'mastercard',
        key: 'mastercard',
        name: 'Mastercard',
        nameAr: 'ماستركارد',
        category: 'card',
        color: '#EB001B',
        description: 'بطاقات Mastercard الائتمانية'
      }
    ],
    AE: [
      {
        id: 'dubai-first',
        key: 'dubai-first',
        name: 'Dubai First',
        nameAr: 'دبي الأول',
        category: 'card',
        color: '#006C35',
        description: 'بطاقات الائتمان من بنك دبي الأول'
      },
      {
        id: 'adcb',
        key: 'adcb',
        name: 'ADCB',
        nameAr: 'بنك أبوظبي التجاري',
        category: 'bank',
        color: '#003366',
        description: 'التحويل البنكي عبر بنك أبوظبي التجاري'
      },
      {
        id: ' Emirates NBD',
        key: 'emirates-nbd',
        name: 'Emirates NBD',
        nameAr: 'بنك الإمارات دبي الوطني',
        category: 'bank',
        color: '#C8102E',
        description: 'التحويل البنكي عبر بنك الإمارات دبي الوطني'
      },
      {
        id: 'FAB',
        key: 'fab',
        name: 'FAB',
        nameAr: 'بنك أبوظبي الأول',
        category: 'bank',
        color: '#006C35',
        description: 'التحويل البنكي عبر بنك أبوظبي الأول'
      },
      {
        id: 'mashreq',
        key: 'mashreq',
        name: 'Mashreq',
        nameAr: 'بنك mashreq',
        category: 'bank',
        color: '#C8102E',
        description: 'التحويل البنكي عبر بنك mashreq'
      }
    ],
    KW: [
      {
        id: 'kbt',
        key: 'kbt',
        name: 'KBT',
        nameAr: 'البنك الأهلي الكويتي',
        category: 'bank',
        color: '#007A33',
        description: 'التحويل البنكي عبر البنك الأهلي الكويتي'
      },
      {
        id: 'nbk',
        key: 'nbk',
        name: 'NBK',
        nameAr: 'بنك الكويت الوطني',
        category: 'bank',
        color: '#003366',
        description: 'التحويل البنكي عبر بنك الكويت الوطني'
      },
      {
        id: 'gulf',
        key: 'gulf',
        name: 'Gulf Bank',
        nameAr: 'بنك الخليج',
        category: 'bank',
        color: '#C8102E',
        description: 'التحويل البنكي عبر بنك الخليج'
      }
    ],
    QA: [
      {
        id: 'qnb',
        key: 'qnb',
        name: 'QNB',
        nameAr: 'بنك قطر الوطني',
        category: 'bank',
        color: '#8E1838',
        description: 'التحويل البنكي عبر بنك قطر الوطني'
      },
      {
        id: 'cboq',
        key: 'cboq',
        name: 'CBOQ',
        nameAr: 'بنك قطر التجاري',
        category: 'bank',
        color: '#003366',
        description: 'التحويل البنكي عبر بنك قطر التجاري'
      },
      {
        id: 'ibq',
        key: 'ibq',
        name: 'IBQ',
        nameAr: 'بنك الخليج الدولي',
        category: 'bank',
        color: '#8E1838',
        description: 'التحويل البنكي عبر بنك الخليج الدولي'
      }
    ],
    OM: [
      {
        id: 'bankmuscat',
        key: 'bankmuscat',
        name: 'BankMuscat',
        nameAr: 'بنك مسقط',
        category: 'bank',
        color: '#ED1C24',
        description: 'التحويل البنكي عبر بنك مسقط'
      },
      {
        id: 'sohar',
        key: 'sohar',
        name: 'Sohar Bank',
        nameAr: 'بنك صحار',
        category: 'bank',
        color: '#009639',
        description: 'التحويل البنكي عبر بنك صحار'
      },
      {
        id: 'nbo',
        key: 'nbo',
        name: 'NBO',
        nameAr: 'البنك الأهلي',
        category: 'bank',
        color: '#ED1C24',
        description: 'التحويل البنكي عبر البنك الأهلي'
      }
    ],
    BH: [
      {
        id: 'nbf',
        key: 'nbf',
        name: 'NBF',
        nameAr: 'البنك الأهلي المتحد',
        category: 'bank',
        color: '#CE1126',
        description: 'التحويل البنكي عبر البنك الأهلي المتحد'
      },
      {
        id: 'bbk',
        key: 'bbk',
        name: 'BBK',
        nameAr: 'بنك البحرين والكويت',
        category: 'bank',
        color: '#003366',
        description: 'التحويل البنكي عبر بنك البحرين والكويت'
      },
      {
        id: 'abc',
        key: 'abc',
        name: 'ABC',
        nameAr: 'بنك البحرين الأهلي',
        category: 'bank',
        color: '#CE1126',
        description: 'التحويل البنكي عبر بنك البحرين الأهلي'
      }
    ]
  };

  return services[countryCode] || [];
};
