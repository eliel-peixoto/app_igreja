import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

import { Input, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import FormSection from '../components/FormSection';
import api from '../services/api';

const RegisterScreen = ({ navigation }) => {

  /* ---------------- ESTADOS ---------------- */

  const [nome, setNome] = useState('');

  const [cpf, setCpf] = useState('');

    const [endereco, setEndereco] = useState({
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  cep: ''
});


  const [possuiBatismo, setPossuiBatismo] = useState('nao');

  const [textDateNasc, setTextDateNasc] = useState('');
  const [dateNasc, setDateNasc] = useState(null);

  const [textDateBatismo, setTextDateBatismo] = useState('');
  const [dateBatismo, setDateBatismo] = useState(null);

  // controla QUAL calendário está aberto
  const [pickerAberto, setPickerAberto] = useState(null);
  // valores possíveis: 'nascimento' | 'batismo' | null

  const [senha, setSenha] = useState('');

  /* ---------------- FUNÇÕES ---------------- */

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

  const handleCadastrar = async () => {
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

    await api.post('/usuarios', payload);
    navigation.navigate('Login');

  }catch (error){
    console.log('Erro ao cadastrar:', error.message);
  }

};

  /* ---------------- RENDER ---------------- */

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <FormSection title="Dados pessoais">
          <Input
            placeholder="Nome completo"
            value={nome}
            onChangeText={setNome}
            containerStyle={styles.input}
          />

          <Input
            placeholder="CPF"
            keyboardType="numeric"
            value={cpf}
            onChangeText={setCpf}
            containerStyle={styles.input}
          />
        </FormSection>

        <FormSection title="Datas">
          <Input
            placeholder="Data de nascimento (DD/MM/AAAA)"
            keyboardType="numeric"
            value={textDateNasc}
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
          <View style={styles.radioGroup}>
            <RadioButton.Group
              value={possuiBatismo}
              onValueChange={(value) => {
                setPossuiBatismo(value);
                if (value === 'nao') {
                  setTextDateBatismo('');
                  setDateBatismo(null);
                }
              }}
            >
              <RadioButton.Item label="Congregado" value="nao" />
              <RadioButton.Item label="Membro" value="sim" />
            </RadioButton.Group>
          </View>

          {possuiBatismo === 'sim' && (
            <Input
              placeholder="Data de batismo (DD/MM/AAAA)"
              keyboardType="numeric"
              value={textDateBatismo}
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
          <Input
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            containerStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
          />
        </FormSection>

        <Button title="Cadastrar" onPress={handleCadastrar} />

        <Button
          title="Já possui cadastro? Entrar"
          type="clear"
          onPress={() => navigation.navigate('Login')}
          containerStyle={{ marginTop: 12 }}
        />

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

  input: {
    paddingHorizontal: 0,
    marginBottom: 16
  },

  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});

export default RegisterScreen;
