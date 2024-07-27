import React from "react";
import { LanguageIcon } from "@heroicons/react/24/outline";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { LOCALES } from "@/lib/helpers/constants";

// Define the structure of a locale
interface Locale {
  code: string;
  label: string;
}

// Make sure LOCALES is an array of Locale objects
const LOCALES: Locale[] = [
  { code: "en", label: "en" },
  { code: "ar", label: "ar" },
  // Add more locales as needed
];

const LanguageSwitcher: React.FC = () => {
  return (
    <Select>
      <SelectTrigger className="w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow">
        {/* Wrap the icon with a label for better accessibility */}
        <SelectValue
          placeholder={
            <span className="flex items-center gap-2">
              <LanguageIcon className="h-5 w-5" />
            </span>
          }
        />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          {/* <SelectLabel>Select a Language</SelectLabel> */}
          {LOCALES.map((locale) => (
            <SelectItem key={locale.code} value={locale.code}>
              {locale.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
