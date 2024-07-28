import { ICONS } from "./Icon";

type TLocale = "en" | "ar";
type TLocaleConfig = {
  textDir: "ltr" | "rtl"; // HTML text direction
  isEnglish: boolean; // Whether the locale is English
  isArabic: boolean; // Whether the locale is Arabic
};

type TTheme = "light" | "dark";
type TDevice = "desktop" | "mobile";

type TCategory = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};
type TProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: TCategory;
};

type TCartItem = TProduct & {
  quantity: number;
  variant: string;
};

type TNavDepartment = Omit<TCategory, "creationAt" | "updatedAt">;
type TConfigIcons = keyof typeof ICONS;

type TFilterOption = {
  id: number;
  option: string;
};

export type {
  TLocale,
  TTheme,
  TCategory,
  TProduct,
  TNavDepartment,
  TDevice,
  TLocaleConfig,
  TConfigIcons,
  TCartItem,
  TFilterOption,
};
