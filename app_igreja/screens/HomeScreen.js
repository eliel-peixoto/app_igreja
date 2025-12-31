import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Button, Card } from 'react-native-elements';
import api from '../services/api';
import Header from '../components/Header';
import QRCode from 'react-native-qrcode-svg';
import { programacao } from '../data/Schedule';

const HomeScreen = ({ route, navigation }) => {

  // const buscaNome = async () => {
  //   try {
  //     const response = await api.get('/usuarios')
  //     const usuarioEncontrado = response.data[0];
  //     const nomeUsuario = usuarioEncontrado.nome
  //     return nomeUsuario;
  //   }catch(error){
  //     console.error('Usuário não encontrado', error);
  //   }

  // }

  const { usuarioEncontrado } = route.params;
  const nomeUsuario = usuarioEncontrado.nome;

  const cultoTerminou = (diaSemana, horaInicio, agora) => {
    const minutosAgora = agora.getHours() * 60 + agora.getMinutes();
    const [h, m] = horaInicio.split(':').map(Number);
    const inicio = h * 60 + m;

    // Domingo
    if (diaSemana === 0) {
      return minutosAgora >= 19 * 60;
    }

    // Quarta
    if (diaSemana === 3) {
      return minutosAgora >= 21 * 60;
    }

    // Outros dias → culto só tem início
    return minutosAgora >= inicio;
  };


  const agora = new Date();
  const diaHoje = agora.getDay();
  const horaAtual = agora.getHours() * 60 + agora.getMinutes();

  const hoje = programacao.find(d => d.diaSemana === diaHoje);

  const eventosHoje = hoje
    ? hoje.eventos.filter(ev => {
      const [h, m] = ev.hora.split(':').map(Number);
      return h * 60 + m > horaAtual;
    })
    : [];

  let proximoCulto = null;

  for (let i = 0; i <= 7; i++) {
    const dia = (diaHoje + i) % 7;
    const diaProg = programacao.find(d => d.diaSemana === dia);

    if (!diaProg) continue;

    const cultos = diaProg.eventos.filter(e => e.classificacao === 'culto');

    for (const culto of cultos) {
      if (i === 0 && cultoTerminou(dia, culto.hora, agora)) continue;

      proximoCulto = {
        diaLabel: diaProg.label,
        ...culto,
      };
      break;
    }

    if (proximoCulto) break;
  }


  // Exemplo de payload PIX (substitua pelo real)
  const pixPayload =
    '00020126360014BR.GOV.BCB.PIX0111SUA-CHAVE-PIX-AQUI5204000053039865802BR5920IGREJA VIDA NOVA6009SAO PAULO62070503***6304ABCD';

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Header nome={nomeUsuario} />

      <Card containerStyle={styles.card}>
        {/* EVENTOS DE HOJE */}
        {eventosHoje.length > 0 && (
          <>
            <Text style={styles.cardTitle}>📅 Hoje na Igreja</Text>

            {eventosHoje.map((ev, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.hour}>🕒 {ev.hora}</Text>
                <Text style={styles.event}>{ev.nome}</Text>
              </View>
            ))}
          </>
        )}

        {/* DIVISOR */}
        <View style={styles.divider} />

        {/* PRÓXIMO CULTO */}
        {proximoCulto && (
          <View style={styles.nextBox}>
            <Text style={styles.nextLabel}>⭐ Próximo Culto</Text>

            <Text style={styles.nextDay}>
              {proximoCulto.diaLabel} • {proximoCulto.hora}
            </Text>

            <Text style={styles.nextEvent}>
              {proximoCulto.nome}
            </Text>
          </View>
        )}

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
          onPress={() => navigation.navigate('Devocional')}
        />
        <Button
          title="👤 Perfil"
          buttonStyle={styles.actionButton}
          onPress={() => navigation.navigate('Perfil', {usuarioEncontrado})}
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
    borderRadius: 14,
    marginBottom: 20
  },

  cardTitle: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8
  },

  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },

  hour: {
    width: 70,
    fontWeight: '600',
  },

  event: {
    flex: 1,
    color: '#555',
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },

  /* DESTAQUE DO PRÓXIMO CULTO */
  nextBox: {
    backgroundColor: '#eef3ff',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2a5298',
  },

  nextLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2a5298',
    marginBottom: 4,
  },

  nextDay: {
    fontSize: 15,
    fontWeight: '600',
  },

  nextEvent: {
    fontSize: 14,
    color: '#333',
  },

  qrContainer: {
    alignItems: 'center',
    marginVertical: 12
  },

  pixText: {
    textAlign: 'center',
    alignItems: 'center',
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
