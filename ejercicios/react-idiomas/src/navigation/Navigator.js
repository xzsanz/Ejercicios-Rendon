import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import Register from '../screens/Register';
import MostrarProduct from '../screens/MostrarProduct';
import AgregarProduct from '../screens/AgregarProduct';
import EditUsuario from '../screens/EditUsuario';

const Stack = createStackNavigator();

const Navigator = () => {
  const { authToken } = useAuth();

  return (
    <Stack.Navigator initialRouteName={authToken ? 'Home' : 'Login'}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="AgregarProduct" component={AgregarProduct} />
      <Stack.Screen name="MostrarProduct" component={MostrarProduct} />
      <Stack.Screen name="EditUsuario" component={EditUsuario} />
    </Stack.Navigator>
  );
};

export default Navigator;
