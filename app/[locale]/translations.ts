import "server-only";

const dictionaries = {
  en: () => import("@/translations/en.json").then((module) => module.default),
  nl: () => import("@/translations/ar.json").then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();
