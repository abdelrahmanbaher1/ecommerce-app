import { TLocale, TLocaleConfig } from "../types";

/**
 * @param  {string} locale
 * @returns {TLocaleConfig} Locale Configuration
 */
export const getLocaleConfig = (locale: TLocale): TLocaleConfig => {
  return {
    textDir: locale === "en" ? "ltr" : "rtl",
    isEnglish: locale === "en",
    isArabic: locale === "ar",
  };
};

export const getLocale = (pathname: string) => {
  return "en";
};
