"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, TRANSLATIONS, LANGUAGES, LanguageOption } from "@/i18n/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  currentLanguageOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    // Read saved language from localStorage if available
    const savedLang = localStorage.getItem("fedex_express_gift_lang") as Language;
    if (savedLang && TRANSLATIONS[savedLang]) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("fedex_express_gift_lang", lang);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.fr;
    let text = dict[key] || TRANSLATIONS.fr[key] || key;

    if (params) {
      Object.entries(params).forEach(([paramKey, val]) => {
        text = text.replace(`{${paramKey}}`, String(val));
      });
    }

    return text;
  };

  const currentLanguageOption = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentLanguageOption }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
