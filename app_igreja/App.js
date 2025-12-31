import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import ProfileScreen from './screens/ProfileScreen';
import DevocionalScreen from './screens/DevocionalScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='Cadastro' component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='Programacao' component={ScheduleScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Perfil' component={ProfileScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Devocional' component={DevocionalScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Teste</Text>
    // </View>
  );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// })
