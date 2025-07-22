import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import MapView, { Marker } from 'react-native-maps'; // Importa el componente MapView

const EditUsuario = () => {
  const { authToken, username } = useAuth(); // Ya estás guardando esto
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    image: '',
    location: { latitude: 0, longitude: 0 }, // Valor predeterminado
  });

  const [newImage, setNewImage] = useState(null);

 // Cargar datos del usuario al iniciar sesión
useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://10.0.2.2:5000/api/auth/user/${username}`);
      setUserData(res.data);
      setNewImage(res.data.image); 
      if (res.data.location) {
        setUserData((prevState) => ({
          ...prevState,
          location: {
            latitude: res.data.location.coordinates[1], 
            longitude: res.data.location.coordinates[0],
          },
        }));
      }
    } catch (err) {
      console.error('Error cargando datos del usuario:', err);
      Alert.alert('Error', 'No se pudo cargar el perfil');
    }
  };

  fetchUser();
}, [username]);


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

  const handleMapRegionChange = (region) => {
  //caonsole.log('Nueva ubicación:', region); 
  setUserData({
    ...userData,
    location: {
      latitude: region.latitude,
      longitude: region.longitude,
    },
  });
};


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

  // Enviar las coordenadas de latitud y longitud por separado
  formData.append('latitude', userData.location.latitude);
  formData.append('longitude', userData.location.longitude);

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

      {/* Mapa con la ubicación */}
      <View style={{ height: 300, marginVertical: 20 }}>
        {userData.location.latitude !== 0 && userData.location.longitude !== 0 ? (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: userData.location.latitude,
              longitude: userData.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onRegionChangeComplete={handleMapRegionChange}
          >
            <Marker
              coordinate={{
                latitude: userData.location.latitude,
                longitude: userData.location.longitude,
              }}
              title="Ubicación actual"
              draggable
              onDragEnd={(e) => {
                const newLocation = e.nativeEvent.coordinate;
                handleMapRegionChange(newLocation);
              }}
            />
          </MapView>
        ) : (
          <Text>No se pudo cargar la ubicación.</Text>
        )}
      </View>

      <Button title="Guardar Cambios" onPress={handleSave} />
    </ScrollView>
  );
};

export default EditUsuario;
