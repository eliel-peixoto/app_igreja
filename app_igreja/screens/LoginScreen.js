import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import api from '../services/api';

const LoginScreen = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (login && senha) {
      try {
        const response = await api.get('/usuarios', {
          params: { cpf: login, senha: senha }
        });
        const usuarioEncontrado = response.data[0];

        if (usuarioEncontrado) {
          navigation.navigate('Home', { usuarioEncontrado });
        } else {
          alert('Usuário ou senha inválidos');
        }
      } catch (error) {
        console.error('Usuário não encontrado', error);
      }
    } else {
      alert('Tentativa inválida, preencha todos os campos');
    }
  };

  return (
    <LinearGradient
      colors={['#0077B6', '#0095D9', '#00AEEF']}
      style={{flex: 1}}
    >
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* LOGO */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo_igreja_PIBT-correto.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* CARD LOGIN */}
      <View style={styles.card}>
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>
          Acesse sua conta para continuar
        </Text>

        <Input
          placeholder="CPF"
          keyboardType="numeric"
          value={login}
          onChangeText={setLogin}
          leftIcon={<MaterialIcons name="person" size={22} color="#00AEEF" />}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />

        <Input
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          leftIcon={<MaterialIcons name="lock" size={22} color="#00AEEF" />}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />

        <Button
          title="Entrar"
          onPress={handleLogin}
          buttonStyle={styles.loginButton}
          titleStyle={styles.loginButtonText}
        />

        <Button
          title="Criar conta"
          type="clear"
          titleStyle={styles.registerText}
          onPress={() => navigation.navigate('Cadastro')}
        />
      </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1
    },

  container: {
    flex: 1,
    //backgroundColor: '#ecefffff',
    //backgroundColor: '#F4F9FD',
    justifyContent: 'center',
    paddingHorizontal: 20
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 24
  },

  logo: {
    width: 140,
    height: 140
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 6, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0B3C5D',
    textAlign: 'center'
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20
  },

  inputContainer: {
    paddingHorizontal: 0,
    marginBottom: 12
  },

  input: {
    fontSize: 16
  },

  loginButton: {
    backgroundColor: '#0288D1',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 10
  },

  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  registerText: {
    color: '#00AEEF',
    marginTop: 8
  }
});


export default LoginScreen;
