// GCC Government and Public Services by Country

export interface GovernmentService {
  id: string;
  key: string;
  name: string;
  nameAr: string;
  category: string;
  description?: string;
}

export const getGovernmentServicesByCountry = (countryCode: string): GovernmentService[] => {
  const services: Record<string, GovernmentService[]> = {
    SA: [
      {
        id: 'mol',
        key: 'mol',
        name: 'Ministry of Labor',
        nameAr: 'وزارة الموارد البشرية',
        category: 'work_permits',
        description: 'تصاريح العمل والخدمات العمالية'
      },
      {
        id: 'moh',
        key: 'moh',
        name: 'Ministry of Health',
        nameAr: 'وزارة الصحة',
        category: 'medical',
        description: 'الخدمات الطبية والصحية'
      },
      {
        id: 'moe',
        key: 'moe',
        name: 'Ministry of Education',
        nameAr: 'وزارة التعليم',
        category: 'education',
        description: 'الخدمات التعليمية والأكاديمية'
      },
      {
        id: 'moi',
        key: 'moi',
        name: 'Ministry of Interior',
        nameAr: 'وزارة الداخلية',
        category: 'documents',
        description: 'الهوية الوطنية والوثائق'
      },
      {
        id: 'moj',
        key: 'moj',
        name: 'Ministry of Justice',
        nameAr: 'وزارة العدل',
        category: 'legal',
        description: 'الخدمات العدلية والقانونية'
      },
      {
        id: 'mcit',
        key: 'mcit',
        name: 'Ministry of Communications',
        nameAr: 'وزارة الاتصالات',
        category: 'telecom',
        description: 'خدمات الاتصالات والتقنية'
      },
      {
        id: 'moci',
        key: 'moci',
        name: 'Ministry of Commerce',
        nameAr: 'وزارة التجارة',
        category: 'business',
        description: 'السجل التجاري والتراخيص'
      },
      {
        id: 'hail',
        key: 'hail',
        name: 'Hail Municipality',
        nameAr: 'بلدية حائل',
        category: 'municipal',
        description: 'الخدمات البلدية'
      },
      {
        id: 'riyadh',
        key: 'riyadh',
        name: 'Riyadh Municipality',
        nameAr: 'بلدية الرياض',
        category: 'municipal',
        description: 'الخدمات البلدية'
      },
      {
        id: 'jeddah',
        key: 'jeddah',
        name: 'Jeddah Municipality',
        nameAr: 'بلدية جدة',
        category: 'municipal',
        description: 'الخدمات البلدية'
      }
    ],
    AE: [
      {
        id: 'mohre',
        key: 'mohre',
        name: 'Ministry of Human Resources',
        nameAr: 'وزارة الموارد البشرية',
        category: 'work_permits',
        description: 'تصاريح العمل والموارد البشرية'
      },
      {
        id: 'mohap',
        key: 'mohap',
        name: 'Ministry of Health',
        nameAr: 'وزارة الصحة',
        category: 'medical',
        description: 'الخدمات الصحية والطبية'
      },
      {
        id: 'moe',
        key: 'moe',
        name: 'Ministry of Education',
        nameAr: 'وزارة التربية والتعليم',
        category: 'education',
        description: 'الخدمات التعليمية'
      },
      {
        id: 'ica',
        key: 'ica',
        name: 'Federal Authority for Identity',
        nameAr: 'الهيئة الاتحادية للهوية والجنسية',
        category: 'documents',
        description: 'الهوية والجنسية'
      },
      {
        id: 'dubai-municipality',
        key: 'dubai-municipality',
        name: 'Dubai Municipality',
        nameAr: 'بلدية دبي',
        category: 'municipal',
        description: 'الخدمات البلدية'
      },
      {
        id: 'abu-dhabi-municipality',
        key: 'abu-dhabi-municipality',
        name: 'Abu Dhabi Municipality',
        nameAr: 'بلدية أبوظبي',
        category: 'municipal',
        description: 'الخدمات البلدية'
      },
      {
        id: 'sharjah-municipality',
        key: 'sharjah-municipality',
        name: 'Sharjah Municipality',
        nameAr: 'بلدية الشارقة',
        category: 'municipal',
        description: 'الخدمات البلدية'
      },
      {
        id: 'ajman-municipality',
        key: 'ajman-municipality',
        name: 'Ajman Municipality',
        nameAr: 'بلدية عجمان',
        category: 'municipal',
        description: 'الخدمات البلدية'
      },
      {
        id: 'rak-municipality',
        key: 'rak-municipality',
        name: 'Ras Al Khaimah Municipality',
        nameAr: 'بلدية رأس الخيمة',
        category: 'municipal',
        description: 'الخدمات البلدية'
      },
      {
        id: 'fujairah-municipality',
        key: 'fujairah-municipality',
        name: 'Fujairah Municipality',
        nameAr: 'بلدية الفجيرة',
        category: 'municipal',
        description: 'الخدمات البلدية'
      }
    ],
    KW: [
      {
        id: 'mol-kw',
        key: 'mol-kw',
        name: 'Ministry of Labor',
        nameAr: 'وزارة العمل',
        category: 'work_permits',
        description: 'تصاريح العمل'
      },
      {
        id: 'moh-kw',
        key: 'moh-kw',
        name: 'Ministry of Health',
        nameAr: 'وزارة الصحة',
        category: 'medical',
        description: 'الخدمات الصحية'
      },
      {
        id: 'moe-kw',
        key: 'moe-kw',
        name: 'Ministry of Education',
        nameAr: 'وزارة التربية',
        category: 'education',
        description: 'الخدمات التعليمية'
      },
      {
        id: 'paci',
        key: 'paci',
        name: 'Public Authority for Civil Information',
        nameAr: 'هيئة المعلومات المدنية',
        category: 'documents',
        description: 'البطاقة المدنية والوثائق'
      },
      {
        id: 'kuwait-municipality',
        key: 'kuwait-municipality',
        name: 'Kuwait Municipality',
        nameAr: 'بلدية الكويت',
        category: 'municipal',
        description: 'الخدمات البلدية'
      }
    ],
    QA: [
      {
        id: 'mol-qa',
        key: 'mol-qa',
        name: 'Ministry of Labor',
        nameAr: 'وزارة العمل',
        category: 'work_permits',
        description: 'تصاريح العمل'
      },
      {
        id: 'moph',
        key: 'moph',
        name: 'Ministry of Public Health',
        nameAr: 'وزارة الصحة العامة',
        category: 'medical',
        description: 'الخدمات الصحية'
      },
      {
        id: 'moehe',
        key: 'moehe',
        name: 'Ministry of Education',
        nameAr: 'وزارة التعليم العالي',
        category: 'education',
        description: 'الخدمات التعليمية'
      },
      {
        id: 'moi-qa',
        key: 'moi-qa',
        name: 'Ministry of Interior',
        nameAr: 'وزارة الداخلية',
        category: 'documents',
        description: 'الهوية والوثائق'
      },
      {
        id: 'doha-municipality',
        key: 'doha-municipality',
        name: 'Doha Municipality',
        nameAr: 'بلدية Doha',
        category: 'municipal',
        description: 'الخدمات البلدية'
      }
    ],
    OM: [
      {
        id: 'momr',
        key: 'momr',
        name: 'Ministry of Manpower',
        nameAr: 'وزارة القوى العاملة',
        category: 'work_permits',
        description: 'تصاريح العمل'
      },
      {
        id: 'moh-om',
        key: 'moh-om',
        name: 'Ministry of Health',
        nameAr: 'وزارة الصحة',
        category: 'medical',
        description: 'الخدمات الصحية'
      },
      {
        id: 'moe-om',
        key: 'moe-om',
        name: 'Ministry of Education',
        nameAr: 'وزارة التربية والتعليم',
        category: 'education',
        description: 'الخدمات التعليمية'
      },
      {
        id: 'roi',
        key: 'roi',
        name: 'Royal Oman Police',
        nameAr: 'شرطة عمان السلطانية',
        category: 'documents',
        description: 'الهوية والوثائق'
      },
      {
        id: 'muscat-municipality',
        key: 'muscat-municipality',
        name: 'Muscat Municipality',
        nameAr: 'بلدية مسقط',
        category: 'municipal',
        description: 'الخدمات البلدية'
      }
    ],
    BH: [
      {
        id: 'mol-bh',
        key: 'mol-bh',
        name: 'Ministry of Labor',
        nameAr: 'وزارة العمل',
        category: 'work_permits',
        description: 'تصاريح العمل'
      },
      {
        id: 'moh-bh',
        key: 'moh-bh',
        name: 'Ministry of Health',
        nameAr: 'وزارة الصحة',
        category: 'medical',
        description: 'الخدمات الصحية'
      },
      {
        id: 'moe-bh',
        key: 'moe-bh',
        name: 'Ministry of Education',
        nameAr: 'وزارة التربية والتعليم',
        category: 'education',
        description: 'الخدمات التعليمية'
      },
      {
        id: 'iop',
        key: 'iop',
        name: 'Information & eGovernment Authority',
        nameAr: 'هيئة المعلومات والحكومة الإلكترونية',
        category: 'documents',
        description: 'الهوية والوثائق'
      },
      {
        id: 'manama-municipality',
        key: 'manama-municipality',
        name: 'Manama Municipality',
        nameAr: 'بلدية المنامة',
        category: 'municipal',
        description: 'الخدمات البلدية'
      }
    ]
  };

  return services[countryCode] || [];
};
