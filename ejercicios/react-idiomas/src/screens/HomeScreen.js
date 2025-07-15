import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '@react-navigation/native';


const products = [
  { id: '1', image: 'https://via.placeholder.com/100' },
  { id: '2', image: 'https://via.placeholder.com/100' },
  { id: '3', image: 'https://via.placeholder.com/100' },
];

const HomeScreen = () => {
  const { translations, changeLanguage } = useLanguage();
  const navigation = useNavigation();
  const [showList, setShowList] = useState(false);
  const toggleProductList = () => {
    setShowList(!showList);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>{translations.welcome}</Text>
      <View style={{ flexDirection: 'row', marginVertical: 20 }}>
        <Button title="Español" onPress={() => changeLanguage('es')} />
        <Button title="English" onPress={() => changeLanguage('en')} />
      </View>

      <Text style={{ fontSize: 18, marginBottom: 10 }}>{translations.products}</Text>
      <TouchableOpacity onPress={toggleProductList}>
        <Text style={{ fontSize: 18, color: 'blue' }}>
          {showList ? translations.hideList : translations.showList}
        </Text>
      </TouchableOpacity>

      {showList && (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text>{translations.productNames[item.id]}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
        <Text style={{ color: 'blue', marginTop: 20 }}>{translations.takePhoto}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export default HomeScreen;
