import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function CamaraSc() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);  // Inicialización de la cámara trasera por defecto
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();  // Solicitar permiso de cámara
      setHasPermission(status === 'granted');  // Verificar si se concede el permiso
    })();
  }, []);

  // Si no tenemos permisos aún
  if (hasPermission === null) {
    return <Text>Solicitando permiso para acceder a la cámara...</Text>;
  }

  // Si el permiso fue denegado
  if (hasPermission === false) {
    return <Text>No se ha concedido permiso para usar la cámara</Text>;
  }

  // Función para capturar una foto
  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      console.log(photo.uri);  // Mostrar la URI de la foto capturada
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}  // Tipo de cámara (frontal o trasera)
        ref={(ref) => setCameraRef(ref)}  // Asignar la referencia de la cámara
      >
        <View style={styles.buttonContainer}>
          <Button title="Capturar Foto" onPress={takePicture} />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0.1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginBottom: 20,
  },
});
