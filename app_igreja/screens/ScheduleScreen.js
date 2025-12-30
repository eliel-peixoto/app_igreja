import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

import {programacao} from '../data/Schedule'

const ScheduleScreen = () => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* HEADER */}
      <LinearGradient
        colors={['#1e3c72', '#2a5298']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Programação da Semana</Text>
        <Text style={styles.headerSubtitle}>
          Acompanhe todos os cultos e atividades
        </Text>
      </LinearGradient>

      {/* LISTAGEM DINÂMICA */}
      {programacao.map((dia) => (
        <Card key={dia.diaSemana} containerStyle={styles.card}>
          <Text style={styles.dayTitle}>{dia.label.toUpperCase()}</Text>

          {dia.eventos.map((evento, index) => (
            <View key={index} style={styles.eventRow}>
              <MaterialIcons name="schedule" size={18} color="#2a5298" />
              <Text style={styles.eventText}>
                {evento.hora} • {evento.nome}
              </Text>
            </View>
          ))}
        </Card>
      ))}

      {/* AVISO */}
      <View style={styles.warningBox}>
        <Text style={styles.warningTitle}>📌 Aviso Importante</Text>
        <Text style={styles.warningText}>
          Toda última quarta-feira do mês, mini vigília após o culto,
          até às 22h30.
        </Text>
      </View>

    </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
    backgroundColor: '#f5f6fa',
  },

  header: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  headerSubtitle: {
    color: '#e0e0e0',
    marginTop: 6,
    fontSize: 14,
  },

  card: {
    borderRadius: 12,
    marginBottom: 16,
  },

  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2a5298',
  },

  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  eventText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },

  warningBox: {
    backgroundColor: '#fff3cd',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#f0ad4e',
  },

  warningTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 15,
  },

  warningText: {
    color: '#555',
    fontSize: 14,
  },
});

export default ScheduleScreen;