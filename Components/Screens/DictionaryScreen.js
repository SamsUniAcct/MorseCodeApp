/**
 * Morse Code React Native App
 * https://github.com/SamsUniAcct/MorseCodeApp
 * Dictionary Screen
 */

import React, { useState } from 'react';
import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

const CONTENT = {
    tableHead: ['Column 0/Row 0', 'Column 1', 'Column 2', 'Column 3'],
    //tableTitle: ['Row', 'Row 2', 'Row 3', 'Row 4','Row', 'Row 2', 'Row 3', 'Row 4','Row', 'Row 2', 'Row 3', 'Row 4'],
    tableData: [
        ['A:', '.-', 'B:', '-...', 'C:', '-.-.'],
        ['D:', '-..', 'E:', '.', 'F:', '..-.'],
        ['G:', '--.', 'H:', '....', 'I:', '..'],
        ['J:', '.---', 'K:', '-.-', 'L:', '.-..'],
        ['M:', '--', 'N:', '-.', 'O:', '---'],
        ['P:', '.--.', 'Q:', '--.-', 'R:', '.-.'],
        ['S:', '...', 'T:', '-', 'U:', '..-'],
        ['V:', '...-', 'W:', '.--', 'X:', '-..-'],
        ['Y:', '-.--', 'Z:', '--..', '0:', '-----'],
        ['1:', '.----', '2:', '..---', '3:', '...--'],
        ['4:', '....-', '5:', '.....', '6:', '-....'],
        ['7:', '--...', '8:', '---..', '9:', '	----.'],
    ],
};


const DictionaryScreen = ({ navigation }) => {

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>

                <Text style={styles.footerButtonText}>Dictionary</Text>
            </View>
            <View style={styles.mainSection}>
                <ScrollView >

                    <View style={styles.scrollSection}>
                        <View style={styles.container}>
                            <Table borderStyle={{ borderWidth: 0.25 }}>
                                
                                <TableWrapper style={styles.wrapper}>
                                    <Col
                                        data={CONTENT.tableTitle}
                                        style={styles.title}
                                        heightArr={[28, 28]}
                                        textStyle={styles.text}
                                    />
                                    <Rows
                                        data={CONTENT.tableData}
                                        flexArr={[2, 3, 2, 3, 2, 3]}
                                        style={styles.row}
                                        textStyle={styles.text}
                                    />
                                </TableWrapper>
                            </Table>
                        </View>
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
                <TouchableHighlight onPress={() => navigation.push('Phrases')} underlayColor="#5E5C63" style={styles.footerButton}>
                    <View >
                        <Text style={styles.footerButtonText}>Phrases</Text>
                        <Icon name="bubble" size={25} color="#4F8EF7" style={styles.footerButtonText} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => navigation.push('Dictionary')} underlayColor="#5E5C63" style={[styles.footerButton, { backgroundColor: '#110F15' }]}>
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
        flex: 1,
        
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#3D3B42' },
    head: { height: 10, backgroundColor: 'white' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#2ecc71' },
    row: { height: 28 },
    text: { textAlign: 'center', color: 'white' },
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

export default DictionaryScreen;