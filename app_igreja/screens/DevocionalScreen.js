import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';
import api from '../services/api';

const DevotionalScreen = () => {
  const [devocional, setDevocional] = useState(null);

  useEffect(() => {
    const carregarDevocional = async () => {
      const hoje = new Date().toISOString().split('T')[0];

      try {
        const response = await api.get('/devocionais', {
          params: { data: hoje, ativo: true }
        });

        if (response.data.length > 0) {
          setDevocional(response.data[0]);
        }
      } catch (error) {
        console.log('Erro ao carregar devocional', error);
      }
    };

    carregarDevocional();
  }, []);

  if (!devocional) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.emptyContainer}>
          <Text style={styles.semDevocional}>
            Nenhum devocional disponível para hoje 🙏
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>

          <Text style={styles.titulo}>
            {devocional.titulo}
          </Text>

          <Text style={styles.versiculo}>
            “{devocional.textoBiblico}”
          </Text>

          <Text style={styles.referencia}>
            {devocional.livro} {devocional.capitulo}:{devocional.versiculo}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.mensagem}>
            {devocional.mensagem}
          </Text>

          <Text style={styles.autor}>
            — {devocional.autor}
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f5f6fa'
  },

  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
    alignItems: 'center',

  },

  card: {
    width: '100%',
    maxWidth: 500, // não estica demais em tablets/celulares grandes
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    marginTop: 50
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#222'
  },

  versiculo: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 10,
    color: '#333'
  },

  referencia: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
    fontSize: 14
  },

  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16
  },

  mensagem: {
    fontSize: 16,
    lineHeight: 26,
    color: '#444',
    marginBottom: 24,
    textAlign: 'justify'
  },

  autor: {
    textAlign: 'right',
    fontStyle: 'italic',
    color: '#555',
    fontSize: 14
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },

  semDevocional: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center'
  }
});

export default DevotionalScreen;
