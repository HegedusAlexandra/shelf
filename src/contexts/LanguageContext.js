import { createContext ,useContext, useState,useEffect} from "react";
import { Language } from "../utils/Enum";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext()

export const LanguageProvider = ({children}) => {

    const [selectedLanguage,setSelectedLanguage] = useState(Language.EN)
    const { i18n } = useTranslation();
    const browserLanguages = navigator.languages;
  
    const findMatchingLanguage = () => {
      const availableLanguages = Object.values(Language);
      const match = browserLanguages.find((lang) =>
        availableLanguages.includes(lang)
      );
      return match.toUpperCase() || 'EN';
    };
  
    useEffect(
      () => findMatchingLanguage && setSelectedLanguage(findMatchingLanguage()),
      []
    );
  
    useEffect(() => {
      i18n.changeLanguage(selectedLanguage);
    }, [i18n, selectedLanguage]);

    return (
        <LanguageContext.Provider value={{selectedLanguage,setSelectedLanguage}}>
            {children}
        </LanguageContext.Provider>   
    )
}

export const useLanguage = () => useContext(LanguageContext)