// ConfiScreensSc.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// Datos para la lista de configuraciones
const settingsData = [
  { id: '1', setting: 'Cambiar Contraseña' },
  { id: '2', setting: 'Notificaciones' },
  { id: '3', setting: 'Idioma' },
  { id: '4', setting: 'Privacidad' },
  { id: '5', setting: 'Acerca de la App' },
];

export default function ConfiguracionSc() {
  const handlePress = (setting) => {
    // Aquí podrías hacer algo al presionar una configuración
    alert(`Configuración seleccionada: ${setting}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Configuración</Text>

      {/* Lista de configuraciones */}
      <FlatList
        data={settingsData}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handlePress(item.setting)} // Acción al presionar un item
          >
            <Text style={styles.itemText}>{item.setting}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemText: {
    fontSize: 18,
  },
});
