/**
 * Morse Code React Native App
 * https://github.com/SamsUniAcct/MorseCodeApp
 * Phrases Screen
 */

 import React from 'react';
 import {
     StyleSheet,
     Text,
     TouchableHighlight,
     View
 } from 'react-native';
 
 const PhrasesScreen = ({ navigation }) => {
 
     return (
         <View style={styles.mainContainer}>
             <View style={styles.header}>
             </View>
             <View style={styles.mainSection}>
             </View>
             <View style={styles.footer}>
                 <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="white" style={styles.footerButton}>
                     <View >
                         <Text style={styles.footerButtonText}>SOS</Text>
                     </View>
                 </TouchableHighlight>
                 <TouchableHighlight onPress={() => navigation.navigate('Phrases')} underlayColor="white" style={styles.footerButton}>
                     <View >
                         <Text style={styles.footerButtonText}>Phrases</Text>
                     </View>
                 </TouchableHighlight>
                 <TouchableHighlight onPress={() => navigation.navigate('Dictionary')} underlayColor="white" style={styles.footerButton}>
                     <View >
                         <Text style={styles.footerButtonText}>Dictionary</Text>
                     </View>
                 </TouchableHighlight>
                 <TouchableHighlight onPress={() => navigation.navigate('Settings')} underlayColor="white" style={styles.footerButton}>
                     <View >
                         <Text style={styles.footerButtonText}>Settings</Text>
                     </View>
                 </TouchableHighlight>
             </View>
         </View>
     );
 
 };
 
 const styles = StyleSheet.create({
     mainContainer: {
         flex: 1
     },
     header: {
         flex: 1,
         backgroundColor: 'powderblue'
     },
     mainSection: {
         flex: 4,
         backgroundColor: 'skyblue'
     },
     footer: {
         flex: 1,
         flexDirection: 'row',
         justifyContent: 'space-between',
         paddingTop: 4,
         backgroundColor: 'steelblue'
     },
     footerButton: {
         height: '100%',
         justifyContent: 'center',
         alignItems: 'center',
         marginLeft: 2,
         marginRight: 2,
         flexGrow: 1,
         flexShrink: 1,
         flexBasis: 2,
         backgroundColor: 'red'
     },
     footerButtonText: {
         color: 'white',
         alignContent: 'center'
     }
 });
 
 export default PhrasesScreen;