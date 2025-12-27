import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity
} from 'react-native';

import { Input, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegisterScreen = ({ navigation }) => {

  /* ---------------- ESTADOS ---------------- */

  const [nome, setNome] = useState('');

  const [cpf, setCpf] = useState('');

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

  /* ---------------- RENDER ---------------- */

  return (
    <View style={styles.container}>

      <Text>Nome</Text>
      <Input placeholder="Digite seu nome" value={nome} onChangeText={setNome}/>

      <Text>CPF</Text>
      <Input placeholder="Digite seu CPF" keyboardType="numeric" value={cpf} onChangeText={setCpf}/>

      {/* DATA DE NASCIMENTO */}
      <Text>Data de nascimento</Text>
      <Input
        placeholder="DD/MM/AAAA"
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
      />

      {/* RADIO */}
      <Text style={styles.label}>É membro ou congregado?</Text>
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

      {/* DATA DE BATISMO */}
      {possuiBatismo === 'sim' && (
        <>
          <Text>Data de batismo</Text>
          <Input
            placeholder="DD/MM/AAAA"
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
          />
        </>
      )}

      {/* DATE PICKER ÚNICO */}
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

      <Text>Senha</Text>
      <Input placeholder='Digite aqui para criar uma senha' value={senha} onChangeText={setSenha}/>

      <Button title="Cadastrar" />
      <Button
        title="Já possui cadastro? Entrar"
        onPress={() => navigation.navigate('Login')}
        containerStyle={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default RegisterScreen;
