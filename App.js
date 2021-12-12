/**
 * Morse Code React Native App
 * https://github.com/SamsUniAcct/MorseCodeApp
 */

 import React from 'react';
 import {
   StyleSheet,
   Text,
   TouchableHighlight,
   View
 } from 'react-native';
 
 const App = () => {
   const menuButtonPress = () => {
     alert('You tapped the button!');
   };
   return (
     <View style={styles.mainContainer}>
       <View style={styles.header}>
       </View>
       <View style={styles.mainSection}>
       </View>
       <View style={styles.footer}>
         <TouchableHighlight onPress={menuButtonPress} underlayColor="white" style={styles.footerButton}>
           <View >
             <Text style={styles.footerButtonText}>Touchable</Text>
           </View>
         </TouchableHighlight>
         <TouchableHighlight onPress={menuButtonPress} underlayColor="white" style={styles.footerButton}>
           <View >
             <Text style={styles.footerButtonText}>Touchable2</Text>
           </View>
         </TouchableHighlight>
         <TouchableHighlight onPress={menuButtonPress} underlayColor="white" style={styles.footerButton}>
           <View >
             <Text style={styles.footerButtonText}>Touchable2</Text>
           </View>
         </TouchableHighlight>
         <TouchableHighlight onPress={menuButtonPress} underlayColor="white" style={styles.footerButton}>
           <View >
             <Text style={styles.footerButtonText}>Touchable2</Text>
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
     backgroundColor: 'steelblue'
   },
   footerButton: {
     height: '100%',
     justifyContent: 'space-between',
     marginLeft: 5,
     marginRight: 5,
     flexGrow: 1,
     flexShrink: 1,
     flexBasis: "auto",
     backgroundColor: 'red'
   },
   footerButtonText: {
     color: 'white'
   }
 });
 
 export default App;
 