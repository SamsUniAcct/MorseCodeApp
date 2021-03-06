/**
 * Morse Code React Native App
 * https://github.com/SamsUniAcct/MorseCodeApp
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Components/Screens/HomeScreen';
import PhrasesScreen from './Components/Screens/PhrasesScreen';
import DictionaryScreen from './Components/Screens/DictionaryScreen';
import SettingsScreen from './Components/Screens/SettingsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const clearStorage = async () => {
    try {
        await AsyncStorage.clear()
        alert('Storage successfully cleared!')
    } catch (e) {
        alert('Failed to clear the async storage.')
    }
}

const App = () => {
    return (

        <NavigationContainer>

            <Stack.Navigator initialRouteName='Home' screenOptions={{
                animation: 'none',
                animationTypeForReplace: 'push',
                headerShown: false
            }}>
                <Stack.Screen name="Phrases" component={PhrasesScreen} options={{
                    title: 'My Phrases',
                    headerStyle: {
                        backgroundColor: '#5E5C63',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{
                    title: 'Send Message',
                    headerStyle: {
                        backgroundColor: '#5E5C63',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
                
                <Stack.Screen name="Dictionary" component={DictionaryScreen} options={{
                    title: 'Dictionary',
                    headerStyle: {
                        backgroundColor: '#5E5C63',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
                <Stack.Screen name="Settings" component={SettingsScreen} options={{
                    title: 'Settings',
                    headerStyle: {
                        backgroundColor: '#5E5C63',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
