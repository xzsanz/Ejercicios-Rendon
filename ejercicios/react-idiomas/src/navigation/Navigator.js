import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';


const Stack = createStackNavigator();

const Navigator = () => {
  const { authToken } = useAuth();

  return (
    <Stack.Navigator initialRouteName={authToken ? 'Home' : 'Login'}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;
