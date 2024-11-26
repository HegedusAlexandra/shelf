import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, Navigation } from "../utils/Enum"; // Import enums for language and navigation
import { useTranslation } from "react-i18next";

// Create a Context
const LanguageNavContext = createContext();

export const LanguageNavProvider = ({ children }) => {
  // State for the selected language
  const [selectedLanguage, setSelectedLanguage] = useState(Language.EN); // Default to English

  // State for the current navigation name
  const [currentNavigation, setCurrentNavigation] = useState(Navigation.MAIN); // Default navigation

  const { i18n } = useTranslation();

  // Detect browser language and match it with available languages
  const findMatchingLanguage = () => {
    const browserLanguages = navigator.languages || [navigator.language];
    const availableLanguages = Object.values(Language);

    const match = browserLanguages.find((lang) =>
      availableLanguages.includes(lang.toUpperCase())
    );

    return match ? match.toUpperCase() : Language.EN; // Default to 'EN' if no match
  };

  // Set language on mount
  useEffect(() => {
    const matchingLanguage = findMatchingLanguage();
    setSelectedLanguage(matchingLanguage);
  }, []);

  // Change i18n language when `selectedLanguage` changes
  useEffect(() => {
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [i18n, selectedLanguage]);

  return (
    <LanguageNavContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
        currentNavigation,
        setCurrentNavigation,
      }}
    >
      {children}
    </LanguageNavContext.Provider>
  );
};

// Custom hook to access LanguageNavContext
export const useLanguageNav = () => {
  const context = useContext(LanguageNavContext);
  if (!context) {
    throw new Error("useLanguageNav must be used within a LanguageNavProvider");
  }
  return context;
};
