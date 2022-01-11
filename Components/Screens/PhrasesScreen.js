/**
 * Morse Code React Native App
 * https://github.com/SamsUniAcct/MorseCodeApp
 * Phrases Screen
 */

import React, { useState, useEffect } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Phrase = (props) => {

    const [phrase, setPhrase] = useState('')
    const key = props.name

    useEffect(() => {
        getData()
      }, [])
    

    const storeData = async () => {
        try {
            await AsyncStorage.setItem(key, phrase)
        } catch (e) {
            // saving error
            alert('Failed to save the data to the storage')
        }
    }



    const getData = async () => {
        try {
            const phrase = await AsyncStorage.getItem(key)
            if (phrase !== null) {
                // value previously stored
                setPhrase(phrase)
                alert(phrase)
            } else {
                setPhrase('')
            }
        } catch (e) {
            // error reading value
            alert('Failed to fetch the data from storage')
        }
    }



    const onChangeText = phrase => setPhrase(phrase)

    const onSubmitEditing = () => {
        if (!phrase) return
        storeData(phrase)
        setPhrase('')
    }

    return (
        <View>
            <TextInput
                placeholder="phrase"
                value={phrase}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
            />
            <Text>Cool {phrase}</Text>
            <Button
                
                //disabled={!phrase}
                title={!phrase ? "Enter A Phrase To Play" : "Play " + (phrase)}
            />
        </View>
    );
}

const clearStorage = async () => {
    try {
      await AsyncStorage.clear()
      alert('Storage successfully cleared!')
    } catch (e) {
      alert('Failed to clear the async storage.')
    }
  }

  


const PhrasesScreen = ({ navigation }) => {


    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
            </View>
            <View style={styles.mainSection}>
                

                <TouchableHighlight onPress={clearStorage}>
          <Text style={styles.buttonText}>Clear Storage</Text>
        </TouchableHighlight>
            </View>
            <View style={styles.footer}>
                <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor="#5E5C63" style={styles.footerButton}>
                    <View >
                        <Text style={styles.footerButtonText}>Send</Text>
                        <Icon name="paper-plane" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => navigation.navigate('Phrases')} underlayColor="#5E5C63" style={[styles.footerButton, { backgroundColor: '#110F15' }]}>
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
        backgroundColor: '#5E5C63'
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

export default PhrasesScreen;