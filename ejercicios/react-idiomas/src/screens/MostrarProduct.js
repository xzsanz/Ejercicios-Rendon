import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Button, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MostrarProducto = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuth();

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/api/productos'); // Cambia IP si usas dispositivo real
      setProductos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener productos:', error.message);
      setLoading(false);
    }
  };

  const eliminarProducto = (id) => {
    Alert.alert(
      'Eliminar producto',
      '¿Estás seguro de que deseas eliminar este producto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`http://10.0.2.2:5000/api/productos/${id}`, {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              });
              setProductos(productos.filter((p) => p._id !== id));
            } catch (error) {
              console.error('Error al eliminar el producto:', error.message);
              Alert.alert('Error', 'No se pudo eliminar el producto');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
      }}
    >
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={{ width: 80, height: 80, marginRight: 10 }}
        />
      ) : (
        <View
          style={{
            width: 80,
            height: 80,
            marginRight: 10,
            backgroundColor: '#eee',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Sin imagen</Text>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        <Text>${item.price}</Text>
        <Text>{item.description}</Text>
        <Button title="Eliminar producto" onPress={() => eliminarProducto(item._id)} />
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={productos}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MostrarProducto;
