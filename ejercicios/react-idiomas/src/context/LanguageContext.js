import React, { createContext, useState, useContext } from 'react';

const languages = {
  en: {
    welcome: 'Welcome',
    products: 'Products',
    takePhoto: 'Take a Photo',
    showList: 'Show list', 
    hideList: 'Hide list', 
    productNames: {
      '1': 'Product 1',
      '2': 'Product 2',
      '3': 'Product 3',
    },
  },
  es: {
    welcome: 'Bienvenido',
    products: 'Productos',
    takePhoto: 'Tomar una Foto',
    showList: 'Desplegar lista', 
    hideList: 'Ocultar lista', 
    productNames: {
      '1': 'Producto 1',
      '2': 'Producto 2',
      '3': 'Producto 3',
    },
  },
};

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es'); 

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, translations: languages[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};
