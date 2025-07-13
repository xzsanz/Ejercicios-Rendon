import React from "react";
import Footer from "../src/Footer";
import { View, Text, StyleSheet, Button } from 'react-native';

export default function ListaScreens({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Lista de pantallas</Text>

      {/* Botones de navegación */}
      <View style={styles.buttonsContainer}>
        <Button
          title="Inicio"
          onPress={() => navigation.navigate('Inicio')} // Navegar a 'Inicio'
        />
        <Button
          title="Tabla"
          onPress={() => navigation.navigate('Tabla')} // Navegar a 'DetallesSc'
        />
        <Button
          title="Configuración"
          onPress={() => navigation.navigate('Configuracion')} // Navegar a 'ConfiScreensSc'
        />
        <Button
          title="Cámara"
          onPress={() => navigation.navigate('CamaraSc')} // Navegar a 'CamaraSc'
        />
      </View>

      {/* Footer */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Hace que el contenedor ocupe toda la pantalla
    justifyContent: 'space-between', // Distribuye el contenido entre la parte superior y el footer
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonsContainer: {
    flex: 1, // Hace que los botones ocupen todo el espacio disponible
    justifyContent: 'flex-start', // Alinea los botones al inicio (parte superior)
  },
});
