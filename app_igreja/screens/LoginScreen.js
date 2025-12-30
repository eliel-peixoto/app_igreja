import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {Input, Button} from 'react-native-elements';

import api from '../services/api'

const LoginScreen = ({navigation}) => {

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        if (login && senha){
            try{
                const response = await api.get('/usuarios', {params: {cpf: login, senha: senha}});
                const usuarioEncontrado = response.data[0];

                if (usuarioEncontrado){
                    navigation.navigate('Home', {nomeUsuario: usuarioEncontrado.nome});
                }else{
                    alert('Usuário ou senha inválidos')
                }
            }catch (error){
                console.error('Usuário não encontrado', error);
            }
        }else{
            alert('Tentativa inválida, preencha todos os campos');
        }
    }


    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <Input value={login} onChangeText={setLogin} keyboardType='numeric' placeholder='Digite seu CPF'></Input>
            <Text>Senha</Text>
            <Input value={senha} onChangeText={setSenha} secureTextEntry placeholder='Digite sua senha'></Input>
            <Button title='Entrar' onPress={handleLogin}></Button>
            <Button onPress={() => navigation.navigate('Cadastro')} title='Cadastre-se'></Button>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default LoginScreen;