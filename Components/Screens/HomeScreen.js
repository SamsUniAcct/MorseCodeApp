/**
 * Morse Code React Native App
 * https://github.com/SamsUniAcct/MorseCodeApp
 * Home Screen
 */

import React, { useState, useEffect } from 'react';
import {
    Button,
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

const STORAGE_KEY = '@save_phrase_one';
const STORAGE_KEY_TWO = '@save_phrase_two';
const STORAGE_KEY_THREE = '@save_phrase_three';
const STORAGE_KEY_FOUR = '@save_phrase_four';

const HomeScreen = ({ navigation }) => {

    //start of async sotrage code adapted from https://github.com/JscramblerBlog/rnAsyncStorageExample/blob/master/App.js
    const [phraseOne, setPhraseOne] = useState('')

    useEffect(() => {
        readData()
    }, [])

    // read data
    const readData = async () => {
        try {
            const phraseOne = await AsyncStorage.getItem(STORAGE_KEY)

            if (phraseOne !== null) {
                setPhraseOne(phraseOne)
            }
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }

    // save data

    const saveData = async () => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, phraseOne)
            setPhraseOne(phraseOne)
            alert('Data successfully saved')
        } catch (e) {
            alert('Failed to save the data to the storage')
        }
    }

    const clearStorage = async () => {
        try {
            await AsyncStorage.clear()
            alert('Storage successfully cleared!')
        } catch (e) {
            alert('Failed to clear the async storage.')
        }
    }

    const onChangeText = phraseOne => setPhraseOne(phraseOne)

    const onSubmitEditing = () => {
        if (!phraseOne) return
        saveData(phraseOne)
        setPhraseOne('')
    };




//start of async sotrage code adapted from https://github.com/JscramblerBlog/rnAsyncStorageExample/blob/master/App.js
//button two
const [phraseTwo, setPhraseTwo] = useState('')

useEffect(() => {
    readDataTwo()
}, [])

// read data
const readDataTwo = async () => {
    try {
        const phraseTwo = await AsyncStorage.getItem(STORAGE_KEY_TWO)

        if (phraseTwo !== null) {
            setPhraseTwo(phraseTwo)
        }
    } catch (e) {
        alert('Failed to fetch the data from storage')
    }
}

// save data

const saveDataTwo = async () => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY_TWO, phraseTwo)
        setPhraseTwo(phraseTwo)
        alert('Data successfully saved')
    } catch (e) {
        alert('Failed to save the data to the storage')
    }
}



const onChangeTextTwo = phraseTwo => setPhraseTwo(phraseTwo)

const onSubmitEditingTwo = () => {
    if (!phraseTwo) return
    saveDataTwo(phraseTwo)
    setPhraseTwo('')
};


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

                <TouchableHighlight name='SOS' disabled={playing} onPress={sendSOS} underlayColor="#5E5C63" style={[styles.footerButton, { backgroundColor: buttonColor }]} >
                    <View >
                        <Text style={styles.footerButtonText}>SOS</Text>
                        <Icon name="flag" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                    </View>

                </TouchableHighlight>
            </View>
            <View style={styles.mainSection}>

                <ScrollView >

                    <View style={styles.scrollSection}>

                        <View>
                            <TextInput
                                style={styles.phraseButtonText}
                                value={phraseOne}
                                placeholder="Phrase"
                                onChangeText={onChangeText}
                                onSubmitEditing={onSubmitEditing}
                            />
                            <View style={styles.phraseButton}>
                                <View style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                                    <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                                        <View >
                                            <Text style={styles.phraseButtonText}>Play</Text>
                                            <Icon name="bubble" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonRight]}>
                                        <View>
                                            <Icon name="options-vertical" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>


                        <View>
                            <TextInput
                                style={styles.phraseButtonText}
                                value={phraseTwo}
                                placeholder="Phrase"
                                onChangeText={onChangeTextTwo}
                                onSubmitEditing={onSubmitEditingTwo}
                            />
                            <View style={styles.phraseButton}>
                                <View style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                                    <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                                        <View >
                                            <Text style={styles.phraseButtonText}>Play</Text>
                                            <Icon name="bubble" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonRight]}>
                                        <View>
                                            <Icon name="options-vertical" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>


                        

                    </View>
                </ScrollView>

            </View>
            <View style={styles.footer}>
                <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.footerButton, { backgroundColor: '#110F15' }]}>
                    <View >
                        <Text style={styles.footerButtonText}>Send</Text>
                        <Icon name="paper-plane" size={25} color="#4F8EF7" style={styles.footerButtonText} />

                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => navigation.navigate('Phrases')} underlayColor="#5E5C63" style={styles.footerButton}>
                    <View >
                        <Text style={styles.footerButtonText}>Phrases</Text>
                        <Icon name="bubble" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => navigation.navigate('Dictionary')} underlayColor="#5E5C63" style={styles.footerButton}>
                    <View >
                        <Text style={styles.footerButtonText}>Dictionary</Text>
                        <Icon name="book-open" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => navigation.navigate('Settings')} underlayColor="#5E5C63" style={styles.footerButton}>
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
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',

        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
        flexWrap: 'nowrap',
        backgroundColor: '#232128'
    },
    phraseButtonRight: {
        width: '15%',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',

        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
        flexWrap: 'nowrap',
        backgroundColor: '#423532'
    },
    phraseInput: {
        alignItems: 'center'
    }
});

export default HomeScreen;