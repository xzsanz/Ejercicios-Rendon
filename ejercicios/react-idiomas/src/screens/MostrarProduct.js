import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MostrarProduct = () => {
  const { authToken } = useAuth();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProductos = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://192.168.0.144:5000/api/productos');
      setProductos(response.data);
    } catch (err) {
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ marginVertical: 5 }}>
      <Text>Nombre: {item.name}</Text>
      <Text>Precio: ${item.price}</Text>
      <Text>Descripción: {item.description}</Text>
    </View>
  );

  return (
    <View style={{ padding: 20 }}>
      {loading && <ActivityIndicator size="large" />}
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      <FlatList
        data={productos}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />

      <Button title="Actualizar lista" onPress={fetchProductos} />
    </View>
  );
};

export default MostrarProduct;
