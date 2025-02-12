import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Linking } from 'react-native';
import { SH, SW, SF } from '../utils/Dimensions';
import Colors from '../utils/Colors';
const InternetCheck = () => {
    const [isConnected, setIsConnected] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (!state.isConnected) {
                setModalVisible(true);
            } else {
                setModalVisible(false);
            }
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const openNetworkSettings = () => {
        if (Platform.OS === 'android') {
            Linking.openSettings();
        } else {
            Linking.openURL('App-Prefs:root=WIFI');
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>No Internet Connection</Text>
                    <Text style={styles.modalMessage}>Please turn on your internet connection.</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.okButton]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.turnOnButton]}
                            onPress={openNetworkSettings}
                        >
                            <Text style={styles.buttonText}>Turn On</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: SW(300),
        paddingHorizontal: SW(20),
        paddingVertical: SH(20),
        backgroundColor: Colors.light,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: SF(20),
        fontFamily: "Poppins-Bold",
        marginBottom: SH(10),
    },
    modalMessage: {
        fontSize: SF(16),
        textAlign: 'center',
        marginBottom: SH(20),
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        paddingHorizontal: SW(10),
        paddingVertical: SH(10),
        marginHorizontal: SW(5),
        marginVertical: SH(5),
        borderRadius: 5,
        alignItems: 'center',
    },
    okButton: {
        backgroundColor: '#888',
    },
    turnOnButton: {
        backgroundColor: '#007bff',
    },
    buttonText: {
        color: 'white',
        fontSize: SF(16),
        fontFamily: "Poppins-Bold"
    },
});

export default InternetCheck;
