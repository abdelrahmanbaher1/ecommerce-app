import React, { useState } from "react";
import { LanguageIcon } from "@heroicons/react/24/outline";

import { LOCALES } from "@/lib/helpers/constants";
import useAppContext from "@/contexts/AppContext";
import { TLocale } from "@/lib/types";

const LanguageSwitcher: React.FC = () => {
  const { locale } = useAppContext();
  const [lang, setLang] = useState(locale);

  return (
    <select className="p-2 flex text-center pr-2">
      {LOCALES.map((locale) => (
        <option
          key={`locale-${Math.random()}`}
          value={locale}
          onSelect={() => setLang(locale as TLocale)}
        >
          {locale}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
