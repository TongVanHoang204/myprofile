"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { dictionaries, Language } from "@/app/data/dictionaries";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  dict: typeof dictionaries["vi"];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "vi";
    }

    try {
      const savedLang = localStorage.getItem("language") as Language | null;
      if (savedLang === "vi" || savedLang === "en") {
        return savedLang;
      }
    } catch {
      // Ignore storage access issues and use default language.
    }

    return "vi";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        dict: dictionaries[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
