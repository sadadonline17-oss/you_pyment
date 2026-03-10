// Country currencies configuration
// تكوين العملات حسب الدولة

export interface CurrencyInfo {
  code: string;      // Currency code (e.g., 'SAR', 'AED')
  symbol: string;    // Currency symbol (e.g., 'ر.س', 'د.إ')
  name: string;      // Currency name in Arabic (e.g., 'ريال سعودي')
  nameEn: string;    // Currency name in English (e.g., 'Saudi Riyal')
  locale: string;    // Locale code (e.g., 'ar-SA', 'ar-AE')
}

export const countryCurrencies: Record<string, CurrencyInfo> = {
  // المملكة العربية السعودية
  SA: {
    code: 'SAR',
    symbol: 'ر.س',
    name: 'ريال سعودي',
    nameEn: 'Saudi Riyal',
    locale: 'ar-SA'
  },

  // دولة الإمارات العربية المتحدة
  AE: {
    code: 'AED',
    symbol: 'د.إ',
    name: 'درهم إماراتي',
    nameEn: 'UAE Dirham',
    locale: 'ar-AE'
  },

  // دولة الكويت
  KW: {
    code: 'KWD',
    symbol: 'د.ك',
    name: 'دينار كويتي',
    nameEn: 'Kuwaiti Dinar',
    locale: 'ar-KW'
  },

  // دولة قطر
  QA: {
    code: 'QAR',
    symbol: 'ر.ق',
    name: 'ريال قطري',
    nameEn: 'Qatari Riyal',
    locale: 'ar-QA'
  },

  // سلطنة عُمان
  OM: {
    code: 'OMR',
    symbol: 'ر.ع',
    name: 'ريال عُماني',
    nameEn: 'Omani Rial',
    locale: 'ar-OM'
  },

  // مملكة البحرين
  BH: {
    code: 'BHD',
    symbol: 'د.ب',
    name: 'دينار بحريني',
    nameEn: 'Bahraini Dinar',
    locale: 'ar-BH'
  }
};

/**
 * Get currency information for a specific country
 * الحصول على معلومات العملة لدولة محددة
 *
 * @param countryCode - Country code (e.g., 'SA', 'AE', 'KW')
 * @returns CurrencyInfo object or default SAR
 */
export const getCurrencyByCountry = (countryCode: string): CurrencyInfo => {
  const country = countryCode.toUpperCase();
  return countryCurrencies[country] || countryCurrencies.SA;
};

/**
 * Format currency amount with symbol
 * تنسيق المبلغ بالعملة مع الرمز
 *
 * @param amount - Amount to format
 * @param countryCodeOrCurrencyCode - Country code (e.g., 'SA', 'AE') or Currency code (e.g., 'SAR', 'AED')
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number | string, countryCodeOrCurrencyCode: string): string => {
  // Check if it's a currency code (3 letters) or country code (2 letters)
  let currencyInfo: CurrencyInfo;
  if (countryCodeOrCurrencyCode.length === 3) {
    // It's a currency code (e.g., 'SAR', 'AED')
    const currencyCode = countryCodeOrCurrencyCode.toUpperCase();
    // Find the currency by code
    const entry = Object.values(countryCurrencies).find(c => c.code === currencyCode);
    currencyInfo = entry || countryCurrencies.SA;
  } else {
    // It's a country code (e.g., 'SA', 'AE')
    currencyInfo = getCurrencyByCountry(countryCodeOrCurrencyCode);
  }
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `${numAmount} ${currencyInfo.symbol}`;
};

/**
 * Format currency with full locale formatting
 * تنسيق العملة بالتنسيق الكامل للبلد
 *
 * @param amount - Amount to format
 * @param countryCodeOrCurrencyCode - Country code (e.g., 'SA', 'AE') or Currency code (e.g., 'SAR', 'AED')
 * @returns Formatted currency string with locale formatting
 */
export const formatCurrencyWithLocale = (amount: number | string, countryCodeOrCurrencyCode: string): string => {
  let currencyInfo: CurrencyInfo;
  if (countryCodeOrCurrencyCode.length === 3) {
    const currencyCode = countryCodeOrCurrencyCode.toUpperCase();
    const entry = Object.values(countryCurrencies).find(c => c.code === currencyCode);
    currencyInfo = entry || countryCurrencies.SA;
  } else {
    currencyInfo = getCurrencyByCountry(countryCodeOrCurrencyCode);
  }
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  try {
    return new Intl.NumberFormat(currencyInfo.locale, {
      style: 'currency',
      currency: currencyInfo.code
    }).format(numAmount);
  } catch (error) {
    // Fallback to simple formatting if locale fails
    return `${numAmount} ${currencyInfo.symbol}`;
  }
};

/**
 * Get currency symbol only
 * الحصول على رمز العملة فقط
 *
 * @param countryCode - Country code
 * @returns Currency symbol
 */
export const getCurrencySymbol = (countryCode: string): string => {
  return getCurrencyByCountry(countryCode).symbol;
};

/**
 * Get currency code
 * الحصول على رمز العملة
 *
 * @param countryCode - Country code
 * @returns Currency code
 */
export const getCurrencyCode = (countryCode: string): string => {
  return getCurrencyByCountry(countryCode).code;
};

/**
 * Get country code from currency code
 * الحصول على رمز الدولة من رمز العملة
 *
 * @param currencyCode - Currency code (e.g., 'SAR', 'AED', 'QAR')
 * @returns Country code or 'SA' as default
 */
export const getCountryByCurrency = (currencyCode: string): string => {
  const currency = currencyCode.toUpperCase();
  for (const [countryCode, info] of Object.entries(countryCurrencies)) {
    if (info.code === currency) {
      return countryCode;
    }
  }
  return 'SA'; // Default to Saudi Arabia
};

/**
 * Get currency name in Arabic
 * الحصول على اسم العملة بالعربية
 *
 * @param countryCode - Country code
 * @returns Currency name in Arabic
 */
export const getCurrencyName = (countryCode: string): string => {
  return getCurrencyByCountry(countryCode).name;
};

/**
 * Check if currency uses decimal places
 * التحقق من العملة تستخدم المنازل العشرية
 *
 * @param countryCode - Country code
 * @returns true if currency has decimal places
 */
export const hasDecimalPlaces = (countryCode: string): boolean => {
  const code = getCurrencyCode(countryCode);
  // Most GCC currencies use 2 or 3 decimal places
  const noDecimals = ['KWD', 'BHD', 'OMR']; // These use 3 decimal places but displayed as 3
  return !noDecimals.includes(code);
};

/**
 * Get default decimal places for currency
 * الحصول على عدد المنازل العشرية الافتراضية للعملة
 *
 * @param countryCode - Country code
 * @returns Number of decimal places
 */
export const getDecimalPlaces = (countryCode: string): number => {
  const code = getCurrencyCode(countryCode);
  // Most currencies use 2 decimal places
  const currencies3Decimals = ['KWD', 'BHD', 'OMR'];
  return currencies3Decimals.includes(code) ? 3 : 2;
};
