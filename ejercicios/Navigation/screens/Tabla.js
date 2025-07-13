import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Datos para la tabla (puedes modificar esto según lo que necesites mostrar)
const data = [
  { id: '1', name: 'John', age: '30', occupation: 'Engineer' },
  { id: '2', name: 'Jane', age: '28', occupation: 'Designer' },
  { id: '3', name: 'Sam', age: '35', occupation: 'Teacher' },
  { id: '4', name: 'Lisa', age: '25', occupation: 'Artist' },
];

export default function TablaSc() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de la Tabla</Text>

      {/* Tabla */}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.age}</Text>
            <Text style={styles.cell}>{item.occupation}</Text>
          </View>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    fontSize: 16,
    textAlign: 'left',
    flex: 1, // Esto asegura que las celdas se distribuyan proporcionalmente
  },
});
