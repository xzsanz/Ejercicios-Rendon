// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await register(username, password);
      navigation.navigate('Login');
    } catch (err) {
      setError('Error al registrar. Inténtalo de nuevo.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nuevo Usuario"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Nueva Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Button title="Crear Cuenta" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
