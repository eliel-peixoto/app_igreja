import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {Input, Button} from 'react-native-elements';

const HomeScreen = ({navigation}) => {
    return (
        <View>
            <Text>Tela da Home</Text>
            <Button title='Sair' onPress={() => navigation.navigate('Login')}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default HomeScreen;