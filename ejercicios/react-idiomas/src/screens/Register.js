import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  // Función para seleccionar una imagen
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  // Función para registrar el usuario
  const registerUser = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);

    if (image) {
      const filename = image.split('/').pop();
      const type = `image/${filename.split('.').pop()}`;
      formData.append("image", {
        uri: image,
        name: filename,
        type,
      });
    }

    try {
      const response = await axios.post('http://10.0.2.2:5000/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert("Usuario registrado", "¡Te has registrado correctamente!");
      navigation.navigate('Login'); // Redirige a Login
    } catch (error) {
      console.error("Error al registrar usuario", error);
      Alert.alert("Error", "Hubo un error al registrar el usuario");
    }
  };

  return (
    <View>
      <Text>Nombre</Text>
      <TextInput value={name} onChangeText={setName} />
      <Text>Teléfono</Text>
      <TextInput value={phone} onChangeText={setPhone} />
      <Text>Correo</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Contraseña</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />

      <Button title="Seleccionar Imagen" onPress={pickImage} />

      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}

      <Button title="Registrar" onPress={registerUser} />
    </View>
  );
};

export default RegisterScreen;
