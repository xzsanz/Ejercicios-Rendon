import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [camera, setCamera] = useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    if (camera) {
      const photoData = await camera.takePictureAsync();
      setPhoto(photoData.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={(ref) => setCamera(ref)}>
        <View style={styles.buttonContainer}>
          <Button title="Take Photo" onPress={takePhoto} />
        </View>
      </Camera>
      {photo && <Image source={{ uri: photo }} style={{ width: 100, height: 100 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: '40%',
  },
});

export default CameraScreen;
