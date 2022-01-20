/**
 * Morse Code React Native App
 * https://github.com/SamsUniAcct/MorseCodeApp
 * Phrases Screen
 */

 import React, { useState, useEffect, useRef } from 'react';
 import {
     Button,
     Keyboard,
     ScrollView,
     StyleSheet,
     Text,
     TextInput,
     ToastAndroid,
     TouchableHighlight,
     View
 } from 'react-native';
 import Icon from 'react-native-vector-icons/SimpleLineIcons';
 import Torch from 'react-native-torch';
 import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 
 const comingSoon = () => {
     ToastAndroid.show('Coming in a future update', ToastAndroid.LONG);
 }
 
 const getAllKeys = async () => {
     let keys = []
     try {
         keys = await AsyncStorage.getAllKeys()
     } catch (e) {
         // read key error
     }
 
     alert(keys)
     // example console.log result:
     // ['@MyApp_user', '@MyApp_key']
 }
 
 const Phrase = (props) => {
 
     const [phrase, setPhrase] = useState('')
     const key = props.name
     const [isEditMode, setEditMode] = useState(false)
     const [defaultStyle, setDefaultStyle] = useState(true)
     const [buttonPhrase, setButtonPhrase] = useState('')
 
     //start of async storage code adapted from https://github.com/JscramblerBlog/rnAsyncStorageExample/blob/master/App.js
     useEffect(() => {
         getData()
     }, [])
 
     const storeData = async () => {
         try {
             await AsyncStorage.setItem(key, phrase)
             alert('Phrase successfully stored')
         } catch (e) {
             // saving error
             alert('Failed to save the phrase to the storage')
         }
     }
 
     const getData = async () => {
         try {
             const phrase = await AsyncStorage.getItem(key)
             if (phrase !== null) {
                 // value previously stored
                 setButtonPhrase(phrase)
                 setPhrase(phrase)
                 //morsemaker(phrase)
                 console.log('Loaded data from storage')
             } else {
            //     alert('No data')
             }
         } catch (e) {
             // error reading value
             console.log('Failed to fetch the data from storage or already read')
         }
     }
 
     const onChangeText = phrase => setPhrase(phrase)
 
     const onSubmitEditing = () => {
         if (!phrase) return
         setButtonPhrase(phrase)
         storeData(phrase)
         setEditMode(false)
        
         setDefaultStyle(true)
         //setPhrase('')
     }
 
     //end of adapted code
 
     const editMode = () => {
         if (!isEditMode) {
             setEditMode(true)
             setDefaultStyle(false)
         } else {
             setEditMode(false)
             setDefaultStyle(true)
         }
     }
 

 
 
     return (
         <View>
             <TextInput
                 style={[defaultStyle ? styles.phraseButtonText && styles.phraseInputDefault : styles.phraseInputEdit]}
                 value={phrase}
                 //defaultValue={buttonPhrase}
                 placeholder='enter phrase'
                 onChangeText={onChangeText}
                 onSubmitEditing={onSubmitEditing}
                 editable={isEditMode}
 
             />
             <View style={styles.phraseButton}>
                 <View style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                     <TouchableHighlight disabled={isEditMode || !buttonPhrase} underlayColor="#5E5C63" style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                         <View >
                             <Text style={styles.phraseButtonText}>Phrase {props.phraseNumber}: {buttonPhrase}</Text>
                             <Icon name="bubble" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                         </View>
                     </TouchableHighlight>
                 </View>
                 <View style={[styles.phraseButtonContainerRight, { backgroundColor: '#110F15' }]}>
                     <TouchableHighlight onPress={editMode} underlayColor="#5E5C63" style={[styles.phraseButtonRightEdit]}>
                         <View>
                             <Icon name="options-vertical" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                         </View>
                     </TouchableHighlight>
                     <TouchableHighlight onPress={editMode} underlayColor="#5E5C63" style={[styles.phraseButtonRightRemove]}>
                         <View>
                             <Icon name="trash" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                         </View>
                     </TouchableHighlight>
                 </View>
 
 
             </View>
 
 
 
         </View>
     );
 }
 
 const PhrasesScreen = ({ navigation }) => {
 
 
     //start of SOS play code
     const sosCode = ['.', '.', '.', ',', '-', '-', '-', ',', '.', '.', '.'];
 
     const torchOn = () => {
         Torch.switchState(true);
     };
 
     const torchOff = () => {
         Torch.switchState(false);
     };
 
     const [playing, setPlaying] = useState(false);
 
     const [buttonColor, setButtonColor] = useState('#110F15');
 
 
     const sendSOS = () => {
         ToastAndroid.show('SOS code is ' + sosCode + ' !', ToastAndroid.LONG);
         var dotspeed = 300;
         var dashspeed = 800;
         var commaspeed = 200;
         var slashspeed = 300;
         const playLoop = () => {
             setPlaying(true);
             setButtonColor('#232128');
 
             let playloop = 0;
             if (playloop <= sosCode.length) {
 
                 setTimeout(function run() {
                     console.log('color change ' + playloop);
                     torchOff();
                     console.log('box up ^');
                     console.log('the position ' + playloop + ' code is a ');
                     if (sosCode[playloop] == '.') {
                         setTimeout(function pause() {
                             playloop++;
                             console.log('.');
                             torchOn();
                             console.log('box down ^');
                             setTimeout(run, dotspeed);
                         }, 300);
                     } else if (sosCode[playloop] == '-') {
                         setTimeout(function pause() {
                             playloop++;
                             console.log('-');
                             torchOn();
                             console.log('box down ^');
                             setTimeout(run, dashspeed);
                         }, 300);
                     } else if (sosCode[playloop] == ',') {
                         setTimeout(function pause() {
                             playloop++;
                             console.log(',');
                             torchOff();
                             console.log('box up ^');
                             setTimeout(run, commaspeed);
                         }, 300);
                     } else if (sosCode[playloop] == '/') {
                         setTimeout(function pause() {
                             playloop++;
                             console.log('/');
                             torchOff();
                             console.log('box up ^');
                             setTimeout(run, slashspeed);
                         }, 300);
                     } else {
                         console.log('done!');
                         setPlaying(false);
                         setButtonColor('#110F15');
                         return;
                     }
                 }, 500);
             } else {
                 console.log('it is done!');
             }
 
         };
 
         playLoop();
 
     };
 
 
     return (
         <View style={styles.mainContainer}>
             <View style={styles.header}>
 
                 <TouchableHighlight name='SOS' disabled={playing} onPress={getAllKeys} underlayColor="#5E5C63" style={[styles.footerButton, { backgroundColor: 'blue' }]} >
                     <View >
                         <Text style={styles.footerButtonText}>SOS</Text>
                         <Icon name="flag" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                     </View>
 
                 </TouchableHighlight>
             </View>
             <View style={styles.mainSection}>
 
                 <ScrollView >
 
                     <View style={styles.scrollSection}>
 
                         <Phrase name="phraseOne" phraseNumber="1" />
 
                         <Phrase name="phraseTwo" phraseNumber="2"/>
 
                         <Phrase name="phraseThree" phraseNumber="3"/>
 
                         <Phrase name="phraseFour" phraseNumber="4"/>
 
                         <Phrase name="phraseFive" phraseNumber="5"/>
 
                         <Phrase name="phraseSix" phraseNumber="6"/>
 
                         <Phrase name="phraseSeven" phraseNumber="7"/>
 
                         <Phrase name="phraseEight" phraseNumber="8"/>
 
                         <Phrase name="phraseNine" phraseNumber="9"/>
 
                         <Phrase name="phraseTen" phraseNumber="10"/>
 
 
                     </View>
                 </ScrollView>
 
             </View>
             <View style={styles.footer}>
                 <TouchableHighlight onPress={() => navigation.push('Home')} underlayColor="#5E5C63" style={styles.footerButton}>
                     <View >
                         <Text style={styles.footerButtonText}>Send</Text>
                         <Icon name="paper-plane" size={25} color="#4F8EF7" style={styles.footerButtonText} />
 
                     </View>
                 </TouchableHighlight>
                 <TouchableHighlight onPress={() => navigation.push('Phrases')} underlayColor="#5E5C63" style={[styles.footerButton, { backgroundColor: '#110F15' }]}>
                     <View >
                         <Text style={styles.footerButtonText}>Phrases</Text>
                         <Icon name="bubble" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                     </View>
                 </TouchableHighlight>
                 <TouchableHighlight onPress={() => navigation.push('Dictionary')} underlayColor="#5E5C63" style={styles.footerButton}>
                     <View >
                         <Text style={styles.footerButtonText}>Dictionary</Text>
                         <Icon name="book-open" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                     </View>
                 </TouchableHighlight>
                 <TouchableHighlight onPress={() => navigation.push('Settings')} underlayColor="#5E5C63" style={styles.footerButton}>
                     <View >
                         <Text style={styles.footerButtonText}>Settings</Text>
                         <Icon name="settings" size={25} color="#4F8EF7" style={styles.footerButtonText} />
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
         backgroundColor: '#3D3B42',
         paddingTop: 4,
         paddingBottom: 4
     },
     mainSection: {
         flex: 4,
         backgroundColor: '#3D3B42',
         flexDirection: 'row',
         justifyContent: 'space-between',
         paddingTop: 8,
         paddingBottom: 8
     },
     footer: {
         flex: 1,
         flexDirection: 'row',
         justifyContent: 'space-between',
         paddingTop: 4,
         backgroundColor: '#110F15',
         alignItems: 'flex-start'
     },
     footerButton: {
         height: '100%',
         justifyContent: 'space-evenly',
         alignItems: 'center',
         flexDirection: 'column',
         marginLeft: 2,
         marginRight: 2,
         flexGrow: 1,
         flexShrink: 1,
         flexBasis: 2,
         flexWrap: 'nowrap',
         backgroundColor: '#232128'
     },
     footerButtonText: {
         color: 'white',
         alignSelf: 'center',
         flexGrow: 0,
         flexShrink: 1,
         paddingBottom: 4,
         flexBasis: 'auto'
     },
     scrollSection: {
         flex: 1,
         backgroundColor: '#3D3B42',
         flexDirection: 'column',
         justifyContent: 'space-around',
         paddingTop: 4,
         flexWrap: 'wrap'
     },
     phraseButton: {
 
         height: 100,
         justifyContent: 'space-evenly',
         alignItems: 'center',
         flexDirection: 'row',
         marginLeft: 10,
         marginRight: 10,
         marginBottom: 10,
         flexGrow: 0,
         flexShrink: 1,
         flexBasis: 'auto',
         flexWrap: 'nowrap',
         backgroundColor: '#232128'
     },
     phraseButtonText: {
         color: 'white',
         alignSelf: 'center',
         flexGrow: 0,
         flexShrink: 1,
         paddingBottom: 4,
         flexBasis: 'auto'
     },
     phraseButtonLeft: {
         width: '85%',
         height: '100%',
         justifyContent: 'space-evenly',
         alignItems: 'center',
         flexDirection: 'row',
 
         flexGrow: 1,
         flexShrink: 0,
         flexBasis: 'auto',
         flexWrap: 'nowrap',
         backgroundColor: '#232128'
     },
     phraseButtonContainerRight: {
         width: '15%',
         height: '100%',
         justifyContent: 'space-evenly',
         alignItems: 'center',
         flexDirection: 'column',
 
         flexGrow: 1,
         flexShrink: 0,
         flexBasis: 'auto',
         flexWrap: 'nowrap',
         backgroundColor: '#423532'
     },
     phraseButtonRightEdit: {
         width: '100%',
         //height: '100%',
         justifyContent: 'space-evenly',
         alignItems: 'center',
         flexDirection: 'row',
 
         flexGrow: 1,
         flexShrink: 0,
         flexBasis: 'auto',
         flexWrap: 'nowrap',
         backgroundColor: '#423532'
     },
     phraseButtonRightRemove: {
         width: '100%',
         //height: '100%',
         justifyContent: 'space-evenly',
         alignItems: 'center',
         flexDirection: 'row',
 
         flexGrow: 1,
         flexShrink: 0,
         flexBasis: 'auto',
         flexWrap: 'nowrap',
         backgroundColor: '#423532'
     },
     phraseInputDefault: {
         color: 'white',
         alignSelf: 'center',
         flexGrow: 0,
         flexShrink: 1,
         paddingBottom: 4,
         flexBasis: 'auto',
         backgroundColor: '#3D3B42'
     },
     phraseInputEdit: {
         color: 'black',
         alignSelf: 'center',
         flexGrow: 0,
         flexShrink: 1,
         paddingBottom: 4,
         flexBasis: 'auto',
 
         backgroundColor: 'white'
     }
 });
 
 export default PhrasesScreen;