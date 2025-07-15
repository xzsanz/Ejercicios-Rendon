import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '@react-navigation/native';

const products = [
  { id: '1', name: 'Product 1' },
  { id: '2', name: 'Product 2' },
  { id: '3', name: 'Product 3' },
];

const HomeScreen = () => {
  const { translations, changeLanguage } = useLanguage();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>{translations.welcome}</Text>
      <View style={{ flexDirection: 'row', marginVertical: 20 }}>
        <Button title="Español" onPress={() => changeLanguage('es')} />
        <Button title="English" onPress={() => changeLanguage('en')} />
      </View>

      <Text style={{ fontSize: 18, marginBottom: 10 }}>{translations.products}</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
        <Text style={{ color: 'blue', marginTop: 20 }}>{translations.takePhoto}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
