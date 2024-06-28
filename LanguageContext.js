import  { createContext, useState } from 'react';
import i18next from './services/i18next';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // const [selectedLanguage, setSelectedLanguage] = useState(i18next.languageResources);
  const [visible, setVisible] = useState(false);

  const changeLanguage = (lng) => {
    i18next.changeLanguage(lng);
    // setSelectedLanguage(lng);
    setVisible(false);
  };

  // useEffect(() => {
  //   const handleLanguageChange = (lng) => {
  //     setSelectedLanguage(lng);
  //   };

  //   i18next.on('languageChanged', handleLanguageChange);

  //   return () => {
  //     i18next.off('languageChanged', handleLanguageChange);
  //   };
  // }, []);

  return (
    <LanguageContext.Provider value={{ visible, setVisible, selectedLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};