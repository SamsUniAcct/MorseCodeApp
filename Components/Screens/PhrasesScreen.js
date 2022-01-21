/**
 * Morse Code React Native App
 * https://github.com/SamsUniAcct/MorseCodeApp
 * Phrases Screen
 */

import React, { useState, useEffect, useRef } from 'react';
import {
    Button,
    Keyboard,
    KeyboardAvoidingView,
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
    const [codeArrayStr, setCodeArrayStr] = useState('')

    // morse code converter 
    const dot = '.';
    const dash = '-';
    const space = '  ';
    const morseText = []



    const chars = {
        'A': '01', 'B': '1000', 'C': '1010', 'D': '100', 'E': '0', 'F': '0010',
        'G': '110', 'H': '0000', 'I': '00', 'J': '0111', 'K': '101', 'L': '0100',
        'M': '11', 'N': '10', 'O': '111', 'P': '0110', 'Q': '1101', 'R': '010',
        'S': '000', 'T': '1', 'U': '001', 'V': '0001', 'W': '011', 'X': '1001',
        'Y': '1011', 'Z': '1100', ' ': '/', '0': '11111', '1': '01111', '2': '00111', '3': '00011', '4': '00001',
        '5': '00000', '6': '10000', '7': '11000', '8': '11100', '9': '11110', '.': '010101', ',': '110011', '?': '001100', '\'': '011110', '!': '101011', '/': '10010',
        '(': '10110', ')': '101101', '&': '01000', ':': '111000', ';': '101010', '=': '10001',
        '+': '01010', '-': '100001', '_': '001101', '"': '010010', '$': '0001001', '@': '011010',
        '¿': '00101', '¡': '110001'
    }

    const [codeArray] = useState([])
    const [codeForPlay, setCodeForPlay] = useState('')
    //const [codeArrayStr, setCodeArrayStr] = useState('')
    //const codeArray = [];
    const setted = {};

    function turnTextIntoCode() {
        // codeArray = [];
        for (let l = 0; l < morseText.length; l++) {
            codeArray[l] = morseText[l].replace(/0/g, dot).replace(/1/g, dash);
        }

        return codeArray;
    };

    // function makeCodeArrayStr() {
    //     setCodeArrayStr(String(codeArray))
    // //    alert(codeArrayStr)
    //     return codeArrayStr;
    // };


    const morsemaker = (phrase) => {
        //alert(String(phrase));
        const userMorse = String(phrase).toUpperCase();
        //userMorse = document.getElementById("userMorse").value.toUpperCase();

        //document.getElementById("users").innerHTML = userMorse;

        //alert(userMorse)
        //alert(codeForPlay)
        const morseLength = userMorse.length;
        const text = "";
        //  const morseText = [];
        for (let i = 0; i < userMorse.length; i++) {

            console.log('text is ' + userMorse[i] + text);
            var j = 0;
            while (j < Object.values(chars).length) {

                console.log('char in map is ' + Object.keys(chars)[j]);
                if (userMorse[i] == Object.keys(chars)[j]) {
                    morseText[i] = Object.values(chars)[j];
                    //alert('char and map match! Adding morse to text.  Morse text currently is ' + morseText + '.');
                    break;
                }
                j++;
            };

        }

        turnTextIntoCode();
        //    makeCodeArrayStr();
        // alert(codeArrayStr)
        var codeArrayStr = String(codeArray);
        var codeArrayReadable = codeArrayStr.replace(/,/g, space);
        // document.getElementById("loc").innerHTML = codeArrayReadable;
        //ToastAndroid.show('Morse code for ' + userMorse + ' is: ' + codeArrayReadable + ' !', ToastAndroid.LONG);
        //codeForPlay = codeArrayStr.split('')
        // codeForPlay = codeArrayStr.split('')
        //   ToastAndroid.show(codeArrayStr, ToastAndroid.LONG);

        //   playBox();
        return codeArrayReadable;
    }


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
                setCodeArrayStr(morsemaker(phrase))
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
        setCodeArrayStr(morsemaker(phrase))

        setDefaultStyle(true)
        //setPhrase('')
    }

    //end of adapted code

    const editMode = () => {
        if (!isEditMode) {
            setEditMode(true)
            handleFocus()
            setDefaultStyle(false)
        } else {
            setEditMode(false)
            setDefaultStyle(true)
        }
    }

    const searchInput = useRef(null)

    function handleFocus(){
        searchInput.current.focus()
      }

      const removeData = async () => {
        try {
            await AsyncStorage.removeItem(key)
            alert('Phrase successfully deleted')
        } catch (e) {
            // saving error
            alert('Failed to delete the phrase')
        }
    }

    const deletePhrase = () => {
        if (buttonPhrase) {
            removeData(buttonPhrase)
            setPhrase('')
            setButtonPhrase('')
            
        }
    }

    return (
        <View>

            <View style={styles.phraseButton}>
                <View style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                    <TouchableHighlight disabled={isEditMode || !buttonPhrase} underlayColor="#5E5C63" style={[styles.phraseButtonLeft, { backgroundColor: isEditMode ? '#5E5C63' : '#110F15' }]}>
                        <View >
                            <TextInput
                                style={[defaultStyle ? styles.phraseButtonText && styles.phraseInputDefault : styles.phraseInputEdit]}
                                value={phrase}
                                //defaultValue={buttonPhrase}
                                placeholder='enter phrase'
                                placeholderTextColor={'white'}
                                onChangeText={onChangeText}
                                ref={searchInput}
                               onBlur={console.log('blur')}
                                onSubmitEditing={onSubmitEditing}
                                editable={isEditMode}

                            />
                            <Text style={styles.phraseButtonText}>{codeArrayStr}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={[styles.phraseButtonContainerRight, { backgroundColor: '#110F15' }]}>
                    <TouchableHighlight onPress={editMode} underlayColor="#5E5C63" style={[styles.phraseButtonRightEdit]}>
                        <View>
                            <Icon name="options-vertical" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={deletePhrase} underlayColor="#5E5C63" style={[styles.phraseButtonRightRemove]}>
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



    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>

            </View>
            <KeyboardAvoidingView style={styles.mainSection} behavior='position'>

                <ScrollView >

                    <View style={styles.scrollSection}>

                        <Phrase name="phraseOne" phraseNumber="1" />

                        <Phrase name="phraseTwo" phraseNumber="2" />

                        <Phrase name="phraseThree" phraseNumber="3" />

                        <Phrase name="phraseFour" phraseNumber="4" />

                        <Phrase name="phraseFive" phraseNumber="5" />

                        <Phrase name="phraseSix" phraseNumber="6" />

                        <Phrase name="phraseSeven" phraseNumber="7" />

                        <Phrase name="phraseEight" phraseNumber="8" />

                        <Phrase name="phraseNine" phraseNumber="9" />

                        <Phrase name="phraseTen" phraseNumber="10" />


                    </View>
                </ScrollView>

            </KeyboardAvoidingView>
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
        backgroundColor: '#5E5C63',
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
        marginBottom: 40,
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
        textAlign: 'center',
        flexGrow: 0,
        flexShrink: 1,
        paddingBottom: 4,
        flexBasis: 'auto',
        backgroundColor: '#110F15'
    },
    phraseInputEdit: {
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
        flexGrow: 0,
        flexShrink: 0,
        paddingBottom: 4,
        flexBasis: 'auto',

        backgroundColor: '#5E5C63'
    }
});

export default PhrasesScreen;