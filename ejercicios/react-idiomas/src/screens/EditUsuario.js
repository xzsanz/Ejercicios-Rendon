import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const EditUsuario = () => {
  const { authToken, username } = useAuth(); // Ya estás guardando esto
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    image: '',
  });

  const [newImage, setNewImage] = useState(null);

  // Obtener datos del usuario al cargar la pantalla
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://10.0.2.2:5000/api/auth/user/${username}`);
        setUserData(res.data);
        setNewImage(res.data.image); // Mostrar imagen actual
      } catch (err) {
        console.error('Error cargando datos del usuario:', err);
        Alert.alert('Error', 'No se pudo cargar el perfil');
      }
    };

    fetchUser();
  }, []);

  // Tomar nueva foto
  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se requiere acceso a la cámara');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setNewImage(result.assets[0].uri);
    }
  };

  // Guardar cambios
  const handleSave = async () => {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('phone', userData.phone);

    if (newImage && newImage !== userData.image) {
      const filename = newImage.split('/').pop();
      const ext = filename.split('.').pop();
      formData.append('image', {
        uri: newImage,
        name: filename,
        type: `image/${ext}`,
      });
    }

    try {
      await axios.put(`http://10.0.2.2:5000/api/auth/update/${userData._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`, // si usas auth
        },
      });

      Alert.alert('Éxito', 'Perfil actualizado correctamente');
    } catch (err) {
      console.error('Error al actualizar perfil:', err.response?.data || err.message);
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text>Nombre completo</Text>
      <TextInput value={userData.name} onChangeText={(text) => setUserData({ ...userData, name: text })} />

      <Text>Nombre de usuario</Text>
      <TextInput value={userData.username} onChangeText={(text) => setUserData({ ...userData, username: text })} />

      <Text>Correo</Text>
      <TextInput value={userData.email} onChangeText={(text) => setUserData({ ...userData, email: text })} />

      <Text>Teléfono</Text>
      <TextInput value={userData.phone} onChangeText={(text) => setUserData({ ...userData, phone: text })} />

      <Button title="Cambiar Foto" onPress={takePhoto} />

      {newImage ? (
        <Image source={{ uri: newImage }} style={{ width: 200, height: 200, marginVertical: 10 }} />
      ) : null}

      <Button title="Guardar Cambios" onPress={handleSave} />
    </ScrollView>
  );
};

export default EditUsuario;
