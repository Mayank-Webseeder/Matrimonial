import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, SafeAreaView, StatusBar } from 'react-native';
import Colors from '../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../StyleScreens/InactiveDeleteStyle';
import Globalstyles from '../../utils/GlobalCss';

const InActiveDelete = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [actionType, setActionType] = useState('');
    const [successModalVisible, setSuccessModalVisible] = useState(false);

    const handleAction = (type) => {
        setActionType(type);
        setIsModalVisible(true);
    };

    const handleConfirm = () => {
        if (actionType === 'inactivate') {
            console.log('Biodata Inactivated');
        } else if (actionType === 'deleteBiodata') {
            console.log('Biodata Deleted');
        } else if (actionType === 'deleteAccount') {
            console.log('Account Deleted');
        }
        setIsModalVisible(false);
        setSuccessModalVisible(true);
    };

    const closeSuccessModal = () => {
        setSuccessModalVisible(false);
        navigation.navigate('Tabs');
    };

    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Account Settings</Text>
                </View>
            </View>

            <Text style={styles.Text}>Do you really want to Inactivate or Delete your Profile?</Text>

            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.optionButton} onPress={() => handleAction('inactivate')}>
                    <Text style={styles.optionText}>Inactivate My Biodata</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} onPress={() => handleAction('deleteBiodata')}>
                    <Text style={styles.optionText}>Delete My Biodata</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} onPress={() => handleAction('deleteAccount')}>
                    <Text style={styles.optionText}>Delete My Account</Text>
                </TouchableOpacity>
            </View>

            {/* Modal for Confirmation */}
            <Modal visible={isModalVisible} transparent animationType="fade" onRequestClose={() => setIsModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>
                            Are you sure you want to {actionType === 'inactivate' ? 'Inactivate' : actionType === 'deleteBiodata' ? 'Delete your Biodata' : 'Delete your Account'}?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={handleConfirm}>
                                <Text style={styles.modalButtonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Success Modal */}
            <Modal visible={successModalVisible} transparent animationType="slide" onRequestClose={closeSuccessModal}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>
                            {actionType === 'inactivate' ? 'Biodata Inactivated Successfully!' : actionType === 'deleteBiodata' ? 'Biodata Deleted Successfully!' : 'Account Deleted Successfully!'}
                        </Text>
                        <TouchableOpacity style={styles.modalButton} onPress={closeSuccessModal}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default InActiveDelete;
