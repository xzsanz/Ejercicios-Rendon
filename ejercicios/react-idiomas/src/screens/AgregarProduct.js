import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AgregarProduct = ({ navigation }) => {
  const { authToken } = useAuth();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleAddProduct = async () => {
    if (!name || !description || !price) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      setError('');

      const response = await axios.post(
        'http://192.168.0.144:5000/api/productos',
        {
          name,
          description,
          price: parseFloat(price),
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      Alert.alert('Éxito', 'Producto agregado correctamente');
      navigation.goBack();

    } catch (err) {
      console.error('Error al agregar producto:', err.response?.data || err.message);
      setError('Error al agregar el producto');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Precio"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
      <Button title="Agregar Producto" onPress={handleAddProduct} />
    </View>
  );
};

export default AgregarProduct;
