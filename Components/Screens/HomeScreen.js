/**
 * Morse Code React Native App
 * https://github.com/SamsUniAcct/MorseCodeApp
 * Home Screen
 */

import React, { useState } from 'react';
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

const HomeScreen = ({ navigation }) => {

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

                        <View style={styles.phraseButton}>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                                <View >
                                    <Text style={styles.phraseButtonText}>Phrase 1</Text>
                                    <Icon name="bubble" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonRight]}>
                                <View>
                                    <Icon name="options-vertical" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.phraseButton}>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                                <View >
                                    <Text style={styles.phraseButtonText}>Phrase 2</Text>
                                    <Icon name="bubble" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonRight]}>
                                <View>
                                    <Icon name="options-vertical" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.phraseButton}>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                                <View >
                                    <Text style={styles.phraseButtonText}>Phrase 3</Text>
                                    <Icon name="bubble" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonRight]}>
                                <View>
                                    <Icon name="options-vertical" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.phraseButton}>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                                <View >
                                    <Text style={styles.phraseButtonText}>Phrase 4</Text>
                                    <Icon name="bubble" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonRight]}>
                                <View>
                                    <Icon name="options-vertical" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.phraseButton}>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                                <View >
                                    <Text style={styles.phraseButtonText}>Phrase 5</Text>
                                    <Icon name="bubble" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonRight]}>
                                <View>
                                    <Icon name="options-vertical" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.phraseButton}>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                                <View >
                                    <Text style={styles.phraseButtonText}>Phrase 6</Text>
                                    <Icon name="bubble" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonRight]}>
                                <View>
                                    <Icon name="options-vertical" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.phraseButton}>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                                <View >
                                    <Text style={styles.phraseButtonText}>Phrase 7</Text>
                                    <Icon name="bubble" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonRight]}>
                                <View>
                                    <Icon name="options-vertical" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.phraseButton}>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                                <View >
                                    <Text style={styles.phraseButtonText}>Phrase 8</Text>
                                    <Icon name="bubble" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonRight]}>
                                <View>
                                    <Icon name="options-vertical" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.phraseButton}>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                                <View >
                                    <Text style={styles.phraseButtonText}>Phrase 9</Text>
                                    <Icon name="bubble" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonRight]}>
                                <View>
                                    <Icon name="options-vertical" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.phraseButton}>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                                <View >
                                    <Text style={styles.phraseButtonText}>Phrase 10</Text>
                                    <Icon name="bubble" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonRight]}>
                                <View>
                                    <Icon name="options-vertical" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.phraseButton}>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                                <View >
                                    <Text style={styles.phraseButtonText}>Phrase 11</Text>
                                    <Icon name="bubble" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonRight]}>
                                <View>
                                    <Icon name="options-vertical" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.phraseButton}>
                            <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={[styles.phraseButtonLeft, { backgroundColor: '#110F15' }]}>
                                <View >
                                    <Text style={styles.phraseButtonText}>Phrase 12</Text>
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
        paddingTop: 4,
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 4,
        flexWrap: 'wrap'
    },
    phraseButton: {
        width: '45%',
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
});

export default HomeScreen;