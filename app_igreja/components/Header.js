import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header = ({ nome }) => {
  return (
    <View style={styles.container}>

      {/* LOGO */}
      <View style={styles.logoWrapper}>
        <Image
          source={require('../assets/logo_igreja_PIBT-correto.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* NOME DA IGREJA */}
      <Text style={styles.churchName}>
        Primeira Igreja Batista em Tabatinga
      </Text>

      {/* CUMPRIMENTO (BLOCO CENTRAL) */}
      <View style={styles.welcomeWrapper}>
        <Text style={styles.welcome}>
          Olá, {nome || 'seja bem-vindo'} 👋
        </Text>
      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  logoWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
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
    width: 100,
    height: 100
  },

  churchName: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  welcome: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
    paddingVertical: 5
  }
});

export default Header;
