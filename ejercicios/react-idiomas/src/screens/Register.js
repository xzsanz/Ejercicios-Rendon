import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  // Validar formato de correo
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Función para tomar una foto con la cámara
  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se requiere permiso para acceder a la cámara.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const registerUser = async () => {
    if (!name || !username || !phone || !email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Correo inválido', 'Por favor ingresa un correo electrónico válido.');
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);

    if (image) {
      const filename = image.split('/').pop();
      const fileExt = filename.split('.').pop();
      formData.append("image", {
        uri: image,
        name: filename,
        type: `image/${fileExt}`,
      });
    }

    try {
      const response = await axios.post('http://10.0.2.2:5000/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Éxito', 'Usuario registrado correctamente.');
      navigation.navigate('Login');
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      Alert.alert('Error', 'No se pudo registrar el usuario.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text>Nombre completo</Text>
      <TextInput value={name} onChangeText={setName} />

      <Text>Nombre de usuario</Text>
      <TextInput value={username} onChangeText={setUsername} />

      <Text>Teléfono</Text>
      <TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      <Text>Correo electrónico</Text>
      <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Text>Contraseña</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />

      <Button title="Tomar Foto" onPress={takePhoto} />

      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginVertical: 10 }} />}

      <Button title="Registrar" onPress={registerUser} />
    </ScrollView>
  );
};

export default RegisterScreen;
