import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "../utils/Enum"; 
import { useTranslation } from "react-i18next";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(Language.EN);

  const { i18n } = useTranslation();

  const findMatchingLanguage = () => {
    const browserLanguages = navigator.languages || [navigator.language];
    const availableLanguages = Object.values(Language);

    const match = browserLanguages.find((lang) =>
      availableLanguages.includes(lang.toUpperCase())
    );

    return match ? match.toUpperCase() : Language.EN;
  };

  useEffect(() => {
    const matchingLanguage = findMatchingLanguage();
    setSelectedLanguage(matchingLanguage);
  }, []);

  useEffect(() => {
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [i18n, selectedLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to access LanguageNavContext
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageNavProvider");
  }
  return context;
};
