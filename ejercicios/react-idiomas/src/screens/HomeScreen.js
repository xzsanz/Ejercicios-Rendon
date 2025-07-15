// src/screens/HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { authToken, logout } = useAuth();

  useEffect(() => {
    if (!authToken) {
      navigation.navigate('Login');
    }
  }, [authToken]);

  return (
    <View>
      <Text>Welcome to the Home Screen</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default HomeScreen;
