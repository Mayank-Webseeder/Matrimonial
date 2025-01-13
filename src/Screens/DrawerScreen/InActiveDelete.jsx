import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal,SafeAreaView,StatusBar } from 'react-native';
import Colors from '../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../StyleScreens/InactiveDeleteStyle';

const InActiveDelete = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [actionType, setActionType] = useState('');
    const [successModalVisible, setSuccessModalVisible] = useState(false);

    const handleInactivate = () => {
        setActionType('inactivate');
        setIsModalVisible(true);
    };

    const handleDelete = () => {
        setActionType('delete');
        setIsModalVisible(true);
    };

    const handleConfirm = () => {
        if (actionType === 'inactivate') {
            console.log('Account Inactivated');
        } else if (actionType === 'delete') {
            console.log('Account Deleted');
        }
        setIsModalVisible(false);
        setSuccessModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const closeSuccessModal = () => {
        setSuccessModalVisible(false);
        navigation.navigate('Tabs');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar 
                barStyle="dark-content" 
                backgroundColor="transparent" 
                translucent 
            />
            <View style={styles.header}>
                <View style={{ flexDirection: 'row',alignItems:"center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Account Settings</Text>
                </View>
            </View>

            <Text style={styles.Text}>Do you really want to Inactivate or Delete your Profile?</Text>

            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.optionButton} onPress={handleInactivate}>
                    <Text style={styles.optionText}>Inactivate Account</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} onPress={handleDelete}>
                    <Text style={styles.optionText}>Delete Account</Text>
                </TouchableOpacity>
            </View>

            {/* Modal for Inactivate/Delete Confirmation */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCancel}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>
                            Are you sure you want to {actionType === 'inactivate' ? 'Inactivate' : 'Delete'} your account?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
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
            <Modal
                visible={successModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeSuccessModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>
                            {actionType === 'inactivate' ? 'Account Deactivated Successfully!' : 'Account Deleted Successfully!'}
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
