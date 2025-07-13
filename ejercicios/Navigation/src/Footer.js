// src/Footer.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text>© MiApp 2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60, // Altura del footer
  },
});
