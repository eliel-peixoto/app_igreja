import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header = ({ userName }) => {
  return (
    <View style={styles.container}>
      
      {/* LOGO */}
      <View style={styles.logoWrapper}>
        <Image
          source={require('../assets/logo_PIBT.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* TEXTOS */}
      <Text style={styles.churchName}>Igreja Vida Nova</Text>
      <Text style={styles.welcome}>Olá, {userName || 'seja bem-vindo'} 👋</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24
  },

  logoWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

    // sombra (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,

    // sombra (Android)
    elevation: 6,

    marginBottom: 12
  },

  logo: {
    width: 80,
    height: 80
  },

  churchName: {
    fontSize: 22,
    fontWeight: 'bold'
  },

  welcome: {
    fontSize: 15,
    color: '#555',
    marginTop: 4
  }
});

export default Header;
