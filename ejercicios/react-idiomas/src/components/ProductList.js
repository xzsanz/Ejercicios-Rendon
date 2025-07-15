import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const ProductList = ({ products }) => {
  const { translations } = useLanguage(); // Accedemos a las traducciones

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            {/* Usamos las traducciones para obtener el nombre del producto */}
            <Text>{translations.productNames[item.id]}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default ProductList;
