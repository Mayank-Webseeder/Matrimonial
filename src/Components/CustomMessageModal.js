import React, { useEffect } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { SF, SH, SW } from '../utils/Dimensions';

const CustomMessageModal = ({ visible, type = 'success', message, description, onHide }) => {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                onHide?.();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    const backgroundColor = type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3';

    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={styles.modalBackground}>
                <View style={[styles.modalCard, { borderLeftColor: backgroundColor }]}>
                    <Text style={styles.title}>{message}</Text>
                    {description ? <Text style={styles.description}>{description}</Text> : null}
                </View>
            </View>
        </Modal>
    );
};

export default CustomMessageModal;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalCard: {
        width: '95%',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical:SH(20),
        paddingHorizontal,
        elevation: 10,
        borderLeftWidth: SW(6),
    },
    title: {
        fontSize: SF(18),
        fontFamily: "Poppins-Bold",
        marginBottom: SH(5),
    },
    description: {
        fontSize: SF(15),
        color: '#333',
        fontFamily: "Poppins-Regular"
    },
});
