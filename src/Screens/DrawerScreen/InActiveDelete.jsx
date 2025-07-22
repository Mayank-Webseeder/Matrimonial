import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Modal, SafeAreaView, StatusBar, Linking ,Image } from 'react-native';
import styles from '../StyleScreens/InactiveDeleteStyle';
import Globalstyles from '../../utils/GlobalCss';
import { DELETE_BIODATA } from '../../utils/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import { resetBioData } from '../../ReduxStore/Slices/BiodataSlice';
import { showMessage } from 'react-native-flash-message';
import { SH,SW } from '../../utils/Dimensions';

const InActiveDelete = ({ navigation }) => {
     const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [actionType, setActionType] = useState('');
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [IsLoading, setIsLoading] = useState('');
    const profileData = useSelector((state) => state.profile);
    const Profiledata = profileData?.profiledata || null;

    useEffect(() => {
        console.log('Profiledata', Profiledata);
    }, []);

    const DELETE_BIODATA_API = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('userToken');

            if (!token) {throw new Error('No token found');}

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.delete(DELETE_BIODATA, { headers });

            if (response.status === 200 && response.data.status === true) {
                // ✅ Success
                showMessage({
                    type: 'success',
                    message: 'Success',
                    description: 'Your Biodata has been deleted successfully!',
                    icon:'success',
                    duration: 5000,
                });
                setSuccessModalVisible(true);
                dispatch(resetBioData());
            } else {
                throw new Error(response.data.message || 'Unexpected response from server');
            }

        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error('Error deleting biodata:', errorMsg);

            const sessionExpiredMessages = [
              'User does not Exist....!Please login again',
              'Invalid token. Please login again',
              'Token has expired. Please login again',
            ];

            if (sessionExpiredMessages.includes(errorMsg)) {
              await AsyncStorage.removeItem('userToken');
              navigation.reset({
                index: 0,
                routes: [{ name: 'AuthStack' }],
              });
            }

            showMessage({
                type: 'danger',
                message: 'Error',
                description: errorMsg,
                icon:'danger',
                duration: 5000,
            });

        } finally {
            setIsLoading(false);
        }
    };

    const handleAction = (type) => {
        setActionType(type);
        setIsModalVisible(true);
    };

    const handleConfirm = async () => {
        setIsModalVisible(false);

        if (actionType === 'deleteBiodata') {
            await DELETE_BIODATA_API();
        } else if (actionType === 'deleteAccount') {
            Linking.openURL('https://accounts.brahminmilan.in/');
        }
    };

    const closeSuccessModal = () => {
        setSuccessModalVisible(false);
        navigation.navigate('Tabs');
    };

    return (
        <SafeAreaView style={Globalstyles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                       <Image source={require('../../Images/menu.png')} style={{width: SW(30),height: SH(30)}} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Account Settings</Text>
                </View>
            </View>

            <Text style={styles.Text}>Do you really want to Inactivate or Delete your Profile?</Text>

            <View style={styles.optionsContainer}>
                {/* {Profiledata?.isMatrimonial && (
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handleAction('inactivate')}
                    >
                        <Text style={styles.optionText}>Inactivate My Biodata</Text>
                    </TouchableOpacity>
                )} */}

                {Profiledata?.isMatrimonial && (
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handleAction('deleteBiodata')}
                    >
                        <Text style={styles.optionText}>Delete My Biodata</Text>
                    </TouchableOpacity>
                )}

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
