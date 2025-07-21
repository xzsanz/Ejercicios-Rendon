import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';
import AgregarProduct from './AgregarProduct';

const HomeScreen = ({ navigation }) => {
  const { authToken, logout } = useAuth();

  useEffect(() => {
    if (!authToken) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  }, [authToken]);

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View>
      <Text>Pantalla inicial</Text>
      <Button
        title="Agregar Producto"
        onPress={() => navigation.navigate('AgregarProduct')}
      />
      <Button
        title="Ver Productos"
        onPress={() => navigation.navigate('MostrarProduct')}
      />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
