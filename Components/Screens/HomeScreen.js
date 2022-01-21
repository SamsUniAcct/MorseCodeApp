/**
 * Morse Code React Native App
 * https://github.com/SamsUniAcct/MorseCodeApp
 * Home Screen
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
import { isDisabled } from 'react-native/Libraries/LogBox/Data/LogBoxData';

const Phrase = (props) => {

    const [phrase, setPhrase] = useState('');
    const key = props.name;
    const [buttonPhrase, setButtonPhrase] = useState('');
    const [nowPlaying, setNowPlaying] = useState('');
    const [playing, setPlaying] = useState(false);
    const [playingColor, setPlayingColor] = useState('white');
    const [phraseIcon, setPhraseIcon] = useState('control-play');
    const [defaultStyle, setDefaultStyle] = useState(true)


    //start of async storage code adapted from https://github.com/JscramblerBlog/rnAsyncStorageExample/blob/master/App.js
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const phrase = await AsyncStorage.getItem(key)
            if (phrase !== null) {
                // value previously stored
                setButtonPhrase(phrase)
                setPhrase(phrase)
                console.log('Loaded data from storage');
                return true;
            } else {
                console.log('No data')
                return false;
            } return;
        } catch (e) {
            // error reading value
            console.log('Failed to fetch the data from storage or already read')
            return false;
        } return;
    }

    //end of adapted code

    // morse code converter 
    const dot = '.';
    const dash = '-';
    const space = ' ';
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

    function turnTextIntoCode() {
        for (let l = 0; l < morseText.length; l++) {
            codeArray[l] = morseText[l].replace(/0/g, dot).replace(/1/g, dash);
        }
        return codeArray;
    };

    const morsemaker = (phrase) => {

        const userMorse = String(phrase).toUpperCase();
        const text = "";
        for (let i = 0; i < userMorse.length; i++) {
            console.log('text is ' + userMorse[i] + text);
            var j = 0;
            while (j < Object.values(chars).length) {
                console.log('char in map is ' + Object.keys(chars)[j]);
                if (userMorse[i] == Object.keys(chars)[j]) {
                    morseText[i] = Object.values(chars)[j];
                    break;
                }
                j++;
            };
        }

        turnTextIntoCode();
        var codeArrayStr = String(codeArray);
        return codeArrayStr;
    }

    function playBox(codeArrayStr) {
        playLoop(codeArrayStr);
    }

    const torchOn = () => {
        Torch.switchState(true);
    };

    const torchOff = () => {
        Torch.switchState(false);
    };

    function playLoop(codeArrayStr) {
        const dotspeed = 300;
        const dashspeed = 800;
        const commaspeed = 200;
        const slashspeed = 300;
        let playloop = 0;
        props.phraseToHomeScreen(true);
        setNowPlaying('Now playing ');
        setPhraseIcon('bubble');
        setPlayingColor('green');

        ToastAndroid.show('Playing ' + codeArrayStr, ToastAndroid.LONG);

        if (playloop <= codeArrayStr.length) {

            setTimeout(function run() {
                console.log('color change ' + playloop);
                torchOff();
                console.log('box up ^');
                console.log('the position ' + playloop + ' code is a ');
                if (codeArrayStr[playloop] == '.') {
                    setTimeout(function pause() {
                        playloop++;
                        console.log('.');
                        torchOn();
                        console.log('box down ^');
                        setTimeout(run, dotspeed);
                    }, 300);
                } else if (codeArrayStr[playloop] == '-') {
                    setTimeout(function pause() {
                        playloop++;
                        console.log('-');
                        torchOn();
                        console.log('box down ^');
                        setTimeout(run, dashspeed);
                    }, 300);
                } else if (codeArrayStr[playloop] == ',') {
                    setTimeout(function pause() {
                        playloop++;
                        console.log(',');
                        torchOff();
                        console.log('box up ^');
                        setTimeout(run, commaspeed);
                    }, 300);
                } else if (codeArrayStr[playloop] == '/') {
                    setTimeout(function pause() {
                        playloop++;
                        console.log('/');
                        torchOff();
                        console.log('box up ^');
                        setTimeout(run, slashspeed);
                    }, 300);
                } else {
                    console.log('done!');
                    ToastAndroid.show('Finished playing ' + codeArrayStr, ToastAndroid.LONG);
                    props.phraseToHomeScreen(false);
                    setNowPlaying('');
                    setPhraseIcon('control-play');
                    setPlayingColor('white');
                }

            }, 500);
        } else {
            console.log('it is done!');
        }
    }

    function runMorse() {
        playBox(morsemaker(phrase));
    }



    return (
        <View>
            <View style={styles.phraseButton}>
                <View style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                    <TouchableHighlight onPress={runMorse} disabled={!buttonPhrase || props.disabled} underlayColor="#5E5C63" style={[styles.phraseButtonLeft, { backgroundColor: buttonPhrase && !props.disabled ? '#110F15' : '#232128' }]}>
                        <View >
                            <Text style={styles.phraseButtonText}>{nowPlaying}Phrase {props.phraseNumber}: {buttonPhrase}</Text>
                            <Icon name={phraseIcon} size={25} color={playingColor} style={styles.PhraseSymbolText} />
                        </View>
                    </TouchableHighlight>
                </View>

            </View>

        </View>
    );
}


const HomeScreen = ({ navigation }) => {

    const [playing, setPlaying] = useState(false);
    const [buttonColor, setButtonColor] = useState('#110F15');
    const [sosIconColor, setSosIconColor] = useState('white');
    const phraseToHomeScreen = (phraseComponentData) => {
        setPlaying(phraseComponentData);
    }



    //start of SOS play code
    const sosCode = ['.', '.', '.', ',', '-', '-', '-', ',', '.', '.', '.'];

    const torchOn = () => {
        Torch.switchState(true);
    };

    const torchOff = () => {
        Torch.switchState(false);
    };

    const sendSOS = () => {

        ToastAndroid.show('SOS playing', ToastAndroid.LONG);
        var dotspeed = 300;
        var dashspeed = 800;
        var commaspeed = 200;
        var slashspeed = 300;
        const sosLoop = () => {
            setPlaying(true);
            setButtonColor('#232128');
            setSosIconColor('red');

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
                        ToastAndroid.show('Finished playing SOS.', ToastAndroid.LONG);
                        setPlaying(false);
                        setButtonColor('#110F15');
                        setSosIconColor('white');
                    }
                }, 500);
            } else {
                console.log('it is done!');
            }
        };

        sosLoop();

    };


    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>

                <TouchableHighlight name='SOS' disabled={playing} onPress={sendSOS} underlayColor="#5E5C63" style={[styles.sosButton, { backgroundColor: buttonColor }]} >
                    <View >
                        <Text style={styles.footerButtonText}>SOS</Text>
                        <Icon name="flag" size={25} color={sosIconColor} style={styles.PhraseSymbolText} />
                    </View>

                </TouchableHighlight>
            </View>
            <View style={styles.mainSection}>

                <ScrollView >

                    <View style={styles.scrollSection}>

                        <Phrase name="phraseOne" phraseNumber="1" phraseToHomeScreen={phraseToHomeScreen} disabled={playing} />

                        <Phrase name="phraseTwo" phraseNumber="2" phraseToHomeScreen={phraseToHomeScreen} disabled={playing} />

                        <Phrase name="phraseThree" phraseNumber="3" phraseToHomeScreen={phraseToHomeScreen} disabled={playing} />

                        <Phrase name="phraseFour" phraseNumber="4" phraseToHomeScreen={phraseToHomeScreen} disabled={playing} />

                        <Phrase name="phraseFive" phraseNumber="5" phraseToHomeScreen={phraseToHomeScreen} disabled={playing} />

                        <Phrase name="phraseSix" phraseNumber="6" phraseToHomeScreen={phraseToHomeScreen} disabled={playing} />

                        <Phrase name="phraseSeven" phraseNumber="7" phraseToHomeScreen={phraseToHomeScreen} disabled={playing} />

                        <Phrase name="phraseEight" phraseNumber="8" phraseToHomeScreen={phraseToHomeScreen} disabled={playing} />

                        <Phrase name="phraseNine" phraseNumber="9" phraseToHomeScreen={phraseToHomeScreen} disabled={playing} />

                        <Phrase name="phraseTen" phraseNumber="10" phraseToHomeScreen={phraseToHomeScreen} disabled={playing} />


                    </View>
                </ScrollView>

            </View>
            <View style={styles.footer}>
                <TouchableHighlight onPress={() => navigation.push('Home')} underlayColor="#5E5C63" style={[styles.footerButton, { backgroundColor: '#110F15' }]}>
                    <View >
                        <Text style={styles.footerButtonText}>Send</Text>
                        <Icon name="paper-plane" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => navigation.push('Phrases')} underlayColor="#5E5C63" style={styles.footerButton}>
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
    sosButton: {
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 2,
        marginRight: 2,
        borderWidth: 0,
        borderRadius: 5,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 2,
        flexWrap: 'nowrap',
        backgroundColor: '#232128'
    },
    PhraseSymbolText: {
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
        borderWidth: 0,
        borderRadius: 10,
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
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 0,
        borderRadius: 10,
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

export default HomeScreen;