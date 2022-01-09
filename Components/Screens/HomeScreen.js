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

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
            
                <TouchableHighlight name='SOS'  underlayColor="#5E5C63" >
                    <View >
                        <Text style={styles.footerButtonText}>SOS</Text>
                        <Icon name="flag" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                    </View>
                    
                </TouchableHighlight>
            </View>
            <View style={styles.mainSection}>
                <ScrollView>
                     <Text style={{ fontSize: 96 }}>Test</Text>
                     <Text style={{ fontSize: 96 }}>Test</Text>
                     <Text style={{ fontSize: 96 }}>Test</Text>
                     <Text style={{ fontSize: 96 }}>Test</Text>
                     <Text style={{ fontSize: 96 }}>Test</Text>
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
        backgroundColor: '#3D3B42'
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 4,
        backgroundColor: '#110F15'
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
    }
});

export default HomeScreen;