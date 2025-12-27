import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {Input, Button} from 'react-native-elements';

const LoginScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <Input></Input>
            <Text>Senha</Text>
            <Input></Input>
            <Button title='Entrar'></Button>
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