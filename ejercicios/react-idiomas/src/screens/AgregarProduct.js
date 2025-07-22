import React, { useState } from 'react';
import { View, TextInput, Button, Image, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AgregarProducto = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const { authToken } = useAuth();

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddProduct = async () => {
    try {
      setError('');

      const response = await axios.post(
        'http://10.0.2.2:5000/api/productos',
        {
          name,
          price: parseFloat(price),
          description,
          image, // URI o base64 si ajustas backend después
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log('Producto creado:', response.data);
      Alert.alert('Éxito', 'Producto agregado correctamente');
      navigation.goBack();
    } catch (err) {
      console.log('Error completo al agregar producto:', err);
      console.log('Response data:', err.response?.data);
      setError('Error al agregar el producto: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput placeholder="Precio" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput placeholder="Descripción" value={description} onChangeText={setDescription} />

      <Button title="Tomar Foto" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

      <Button title="Agregar Producto" onPress={handleAddProduct} />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
    </View>
  );
};

export default AgregarProducto;
