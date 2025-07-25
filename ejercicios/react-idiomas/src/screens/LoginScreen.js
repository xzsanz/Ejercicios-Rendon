import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Register from './Register';
const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <Button title='Registrarse' onPress={()=> navigation.navigate('Register')}/>
    </View>
  );
};

export default LoginScreen;
