import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

import { Input, Button, Card } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import FormSection from '../components/FormSection';
import api from '../services/api';

const ProfileScreen = ({ route }) => {
  const { usuarioEncontrado } = route.params;

  /* ---------------- CONTROLE DE EDIÇÃO ---------------- */
  const [editando, setEditando] = useState(false);

  /* ---------------- ESTADOS (pré-preenchidos) ---------------- */

  const [nome, setNome] = useState(usuarioEncontrado.nome);
  const [cpf, setCpf] = useState(usuarioEncontrado.cpf);
  const [senha, setSenha] = useState(usuarioEncontrado.senha);

  const [endereco, setEndereco] = useState({
    logradouro: usuarioEncontrado.endereco?.logradouro || '',
    numero: usuarioEncontrado.endereco?.numero || '',
    complemento: usuarioEncontrado.endereco?.complemento || '',
    bairro: usuarioEncontrado.endereco?.bairro || '',
    cidade: usuarioEncontrado.endereco?.cidade || '',
    estado: usuarioEncontrado.endereco?.estado || '',
    cep: usuarioEncontrado.endereco?.cep || ''
  });

  const [possuiBatismo, setPossuiBatismo] = useState(
    usuarioEncontrado.membro ? 'sim' : 'nao'
  );

  const [textDateNasc, setTextDateNasc] = useState(
    usuarioEncontrado.dataNascimento
      ? usuarioEncontrado.dataNascimento.split('-').reverse().join('/')
      : ''
  );
  const [dateNasc, setDateNasc] = useState(
    usuarioEncontrado.dataNascimento ? new Date(usuarioEncontrado.dataNascimento) : null
  );

  const [textDateBatismo, setTextDateBatismo] = useState(
    usuarioEncontrado.dataBatismo
      ? usuarioEncontrado.dataBatismo.split('-').reverse().join('/')
      : ''
  );
  const [dateBatismo, setDateBatismo] = useState(
    usuarioEncontrado.dataBatismo ? new Date(usuarioEncontrado.dataBatismo) : null
  );

  const [pickerAberto, setPickerAberto] = useState(null);

  /* ---------------- FUNÇÕES (IGUAIS AO CADASTRO) ---------------- */

  const formatarData = (text) => {
    const numbers = text.replace(/\D/g, '').slice(0, 8);

    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    }
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4)}`;
  };

  const parseDate = (formatted, setDate) => {
    if (formatted.length === 10) {
      const [day, month, year] = formatted.split('/');
      const parsed = new Date(year, month - 1, day);
      if (!isNaN(parsed.getTime())) {
        setDate(parsed);
      }
    }
  };

  const onChangeCalendar = (event, selectedDate) => {
    setPickerAberto(null);
    if (!selectedDate) return;

    const formatted = selectedDate.toLocaleDateString('pt-BR');

    if (pickerAberto === 'nascimento') {
      setDateNasc(selectedDate);
      setTextDateNasc(formatted);
    }

    if (pickerAberto === 'batismo') {
      setDateBatismo(selectedDate);
      setTextDateBatismo(formatted);
    }
  };

  /* ---------------- PUT ---------------- */

  const handleSalvar = async () => {
    try {
      const payload = {
        nome,
        cpf,
        senha,
        membro: possuiBatismo === 'sim',
        dataNascimento: dateNasc
          ? dateNasc.toISOString().split('T')[0]
          : null,
        dataBatismo:
          possuiBatismo === 'sim' && dateBatismo
            ? dateBatismo.toISOString().split('T')[0]
            : null,
        endereco: {
          logradouro: endereco.logradouro,
          numero: endereco.numero,
          complemento: endereco.complemento || null,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          estado: endereco.estado,
          cep: endereco.cep || null
        }
      };

      await api.put(`/usuarios/${usuarioEncontrado.id}`, payload);
      alert('Dados atualizados com sucesso!');
      setEditando(false);
    } catch (error) {
      console.log('Erro ao atualizar perfil:', error.message);
      alert('Erro ao salvar alterações');
    }
  };

  /* ---------------- RENDER ---------------- */

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* VISUALIZAÇÃO */}
        {!editando && (
          <Card containerStyle={styles.card}>
            <Text style={styles.nome}>{nome}</Text>
            <Text style={styles.info}>CPF: {cpf}</Text>
            <Text style={styles.info}>
              Vínculo: {possuiBatismo === 'sim' ? 'Membro' : 'Congregado'}
            </Text>

            <Button
              title="✏️ Alterar dados"
              containerStyle={{ marginTop: 16 }}
              onPress={() => setEditando(true)}
            />
          </Card>
        )}

        {/* FORMULÁRIO (IGUAL AO REGISTER) */}
        {editando && (
          <>
            <FormSection title="Dados pessoais">
              <Input value={nome} onChangeText={setNome} placeholder="Nome completo" containerStyle={styles.input}/>
              <Input value={cpf} onChangeText={setCpf} placeholder="CPF" keyboardType="numeric" containerStyle={styles.input}/>
            </FormSection>

            <FormSection title="Datas">
              <Input
                placeholder="Data de nascimento (DD/MM/AAAA)"
                value={textDateNasc}
                keyboardType="numeric"
                onChangeText={(text) => {
                  const formatted = formatarData(text);
                  setTextDateNasc(formatted);
                  parseDate(formatted, setDateNasc);
                }}
                rightIcon={
                  <TouchableOpacity onPress={() => setPickerAberto('nascimento')}>
                    <MaterialIcons name="calendar-today" size={22} color="#555" />
                  </TouchableOpacity>
                }
                containerStyle={styles.input}
              />
            </FormSection>

            <FormSection title="Vínculo">
              <RadioButton.Group
                value={possuiBatismo}
                onValueChange={setPossuiBatismo}
              >
                <RadioButton.Item label="Congregado" value="nao" />
                <RadioButton.Item label="Membro" value="sim" />
              </RadioButton.Group>

              {possuiBatismo === 'sim' && (
                <Input
                  value={textDateBatismo}
                  placeholder="Data de batismo (DD/MM/AAAA)"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    const formatted = formatarData(text);
                    setTextDateBatismo(formatted);
                    parseDate(formatted, setDateBatismo);
                  }}
                  rightIcon={
                    <TouchableOpacity onPress={() => setPickerAberto('batismo')}>
                      <MaterialIcons name="calendar-today" size={22} color="#555" />
                    </TouchableOpacity>
                  }
                  containerStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
                />
              )}
            </FormSection>

            <FormSection title="Endereço">
          <Input
            placeholder="Rua"
            value={endereco.logradouro}
            onChangeText={(text) =>
              setEndereco({ ...endereco, logradouro: text })
            }
            containerStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
          />

          <Input
            placeholder="Número"
            keyboardType="numeric"
            value={endereco.numero}
            onChangeText={(text) =>
              setEndereco({ ...endereco, numero: text })
            }
            containerStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
          />

          <Input
            placeholder="Complemento (opcional)"
            value={endereco.complemento}
            onChangeText={(text) =>
              setEndereco({ ...endereco, complemento: text })
            }
            containerStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
          />

          <Input
            placeholder="Bairro"
            value={endereco.bairro}
            onChangeText={(text) =>
              setEndereco({ ...endereco, bairro: text })
            }
            containerStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
          />

          <Input
            placeholder="Cidade"
            value={endereco.cidade}
            onChangeText={(text) =>
              setEndereco({ ...endereco, cidade: text })
            }
            containerStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
          />

          <Input
            placeholder="Estado (UF)"
            maxLength={2}
            autoCapitalize="characters"
            value={endereco.estado}
            onChangeText={(text) =>
              setEndereco({ ...endereco, estado: text })
            }
            containerStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
          />

          <Input
            placeholder="CEP (opcional)"
            keyboardType="numeric"
            value={endereco.cep}
            onChangeText={(text) =>
              setEndereco({ ...endereco, cep: text })
            }
            containerStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
          />
        </FormSection>

            <FormSection title="Segurança">
              <Input secureTextEntry value={senha} onChangeText={setSenha} placeholder='Senha' containerStyle={styles.input}
            inputContainerStyle={styles.inputContainer}/>
            </FormSection>

            <Button title="💾 Salvar alterações" onPress={handleSalvar} />
            <Button title="Cancelar" type="clear" onPress={() => setEditando(false)} />
          </>
        )}

        {pickerAberto && (
          <DateTimePicker
            value={
              pickerAberto === 'nascimento'
                ? dateNasc || new Date()
                : dateBatismo || new Date()
            }
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            maximumDate={new Date()}
            onChange={onChangeCalendar}
          />
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32
  },
  card: {
    borderRadius: 12
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8
  },
  info: {
    fontSize: 16,
    color: '#555'
  },
  input: {
    paddingHorizontal: 0,
    marginBottom: 16
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});

export default ProfileScreen;
