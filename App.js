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

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Phrases" component={PhrasesScreen} />
        <Stack.Screen name="Dictionary" component={DictionaryScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
