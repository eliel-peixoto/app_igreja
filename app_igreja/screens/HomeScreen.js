import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Button, Card } from 'react-native-elements';
import Header from '../components/Header';
import QRCode from 'react-native-qrcode-svg';

const HomeScreen = ({ navigation }) => {

  // Exemplo de payload PIX (substitua pelo real)
  const pixPayload =
    '00020126360014BR.GOV.BCB.PIX0111SUA-CHAVE-PIX-AQUI5204000053039865802BR5920IGREJA VIDA NOVA6009SAO PAULO62070503***6304ABCD';

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Header userName="João"/>

      {/* PRÓXIMO CULTO */}
      <Card containerStyle={styles.card}>
        <Text style={styles.cardTitle}>📅 Próximo Culto</Text>
        <Text style={styles.eventDay}>Domingo • 17h</Text>
        <Text style={styles.eventName}>Culto Evangelístico</Text>

        <Button
          title="Ver programação completa"
          type="clear"
          onPress={() => navigation.navigate('Programacao')}
        />
      </Card>

      {/* PIX */}
      <Card containerStyle={styles.card}>
        <Text style={styles.cardTitle}>🙏 Contribua com a obra</Text>

        <View style={styles.qrContainer}>
          <QRCode value={pixPayload} size={180} />
        </View>

        <Text style={styles.pixText}>
          Use o QR Code para ofertar
        </Text>

        <Button
          title="Ampliar QR Code"
          type="outline"
          containerStyle={{ marginTop: 12 }}
        />
      </Card>

      {/* AÇÕES */}
      <View style={styles.actionsRow}>
        <Button
          title="📖 Devocional"
          buttonStyle={styles.actionButton}
        />
        <Button
          title="👤 Perfil"
          buttonStyle={styles.actionButton}
        />
      </View>

      {/* SAIR */}
      <Button
        title="🚪 Sair"
        buttonStyle={styles.logoutButton}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        }
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#f5f6fa'
  },

  card: {
    borderRadius: 12,
    marginBottom: 20
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },

  eventDay: {
    fontSize: 16,
    fontWeight: '600'
  },

  eventName: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8
  },

  qrContainer: {
    alignItems: 'center',
    marginVertical: 12
  },

  pixText: {
    textAlign: 'center',
    color: '#666'
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8
  },

  logoutButton: {
    backgroundColor: '#c62828',
    borderRadius: 8
  }
});

export default HomeScreen;
