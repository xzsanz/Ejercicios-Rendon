import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LanguageProvider } from './src/context/LanguageContext'; // Importamos el provider de idioma
import Navigator from './src/navigation/Navigator';// Importamos el archivo de navegación

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Navigator /> {/* Usamos el componente Navigation aquí */}
      </NavigationContainer>
    </LanguageProvider>
  );
}
