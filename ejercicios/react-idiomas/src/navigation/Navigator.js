import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Product List' }} 
      />
      <Stack.Screen 
        name="Camera" 
        component={CameraScreen} 
        options={{ title: 'Take a Photo' }} 
      />
    </Stack.Navigator>
  );
};

export default Navigator;
