/**
 * Country to Currency and Title Mapping
 * تحديث ديناميكي للعملة والعنوان حسب الدولة
 */

export interface CountryData {
  currency: string;
  defaultTitle: string;
  currencyName: string;
  currencySymbol: string;
  nameAr: string;
}

const countryDataMap: Record<string, CountryData> = {
  // المملكة العربية السعودية
  SA: {
    currency: "SAR",
    defaultTitle: "Payment in Saudi Arabia",
    currencyName: "ريال سعودي",
    currencySymbol: "ر.س",
    nameAr: "المملكة العربية السعودية"
  },

  // دولة الإمارات العربية المتحدة
  AE: {
    currency: "AED",
    defaultTitle: "Payment in UAE",
    currencyName: "درهم إماراتي",
    currencySymbol: "د.إ",
    nameAr: "الإمارات العربية المتحدة"
  },

  // دولة الكويت
  KW: {
    currency: "KWD",
    defaultTitle: "Payment in Kuwait",
    currencyName: "دينار كويتي",
    currencySymbol: "د.ك",
    nameAr: "دولة الكويت"
  },

  // دولة قطر
  QA: {
    currency: "QAR",
    defaultTitle: "Payment in Qatar",
    currencyName: "ريال قطري",
    currencySymbol: "ر.ق",
    nameAr: "دولة قطر"
  },

  // سلطنة عُمان
  OM: {
    currency: "OMR",
    defaultTitle: "Payment in Oman",
    currencyName: "ريال عُماني",
    currencySymbol: "ر.ع",
    nameAr: "سلطنة عُمان"
  },

  // مملكة البحرين
  BH: {
    currency: "BHD",
    defaultTitle: "Payment in Bahrain",
    currencyName: "دينار بحريني",
    currencySymbol: "د.ب",
    nameAr: "مملكة البحرين"
  }
};

/**
 * Get country data with fallback
 * @param countryCode - Country code (e.g., 'SA', 'AE')
 * @returns Country data object
 */
export const getCountryData = (countryCode: string): CountryData => {
  if (!countryCode) {
    return countryDataMap.SA; // Default to Saudi Arabia
  }

  const code = countryCode.toUpperCase();
  return countryDataMap[code] || countryDataMap.SA;
};

/**
 * Get currency code for a country
 * @param countryCode - Country code
 * @returns Currency code
 */
export const getCurrency = (countryCode: string): string => {
  return getCountryData(countryCode).currency;
};

/**
 * Get default title for a country
 * @param countryCode - Country code
 * @returns Default title
 */
export const getDefaultTitle = (countryCode: string): string => {
  return getCountryData(countryCode).defaultTitle;
};
