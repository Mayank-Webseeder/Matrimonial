import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Modal, SafeAreaView, StatusBar, ToastAndroid } from 'react-native';
import Colors from '../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../StyleScreens/InactiveDeleteStyle';
import Globalstyles from '../../utils/GlobalCss';
import { DELETE_BIODATA } from '../../utils/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
const InActiveDelete = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [actionType, setActionType] = useState('');
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [IsLoading, setIsLoading] = useState('');
    const profileData = useSelector((state) => state.profile);
    const Profiledata = profileData?.profiledata || null;

    useEffect(() => {
        console.log("Profiledata", Profiledata);
    }, [])

    const DELETE_BIODATA_API = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem("userToken");

            if (!token) throw new Error("No token found");

            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            console.log("Headers:", headers);

            const response = await axios.delete(DELETE_BIODATA, { headers });

            console.log("✅ Response Data:", response.data);

            if (response.status === 200 && response.data.status === true) {
                ToastAndroid.show("Your Biodata has been deleted successfully!", ToastAndroid.SHORT);

                // ✅ Show success modal only if deletion succeeds
                setSuccessModalVisible(true);
            } else {
                throw new Error(response.data.message || "Unexpected response from server");
            }

        } catch (error) {
            console.error("❌ Error deleting Biodata:", error?.response?.data || error.message);

            let errorMessage = "Failed to delete Biodata. Please try again!";
            if (error.response && error.response.status === 400) {
                errorMessage = error.response.data.message || errorMessage; // ✅ Show API error message
            }

            ToastAndroid.show(errorMessage, ToastAndroid.LONG);
        } finally {
            setIsLoading(false);
        }
    };


    const handleAction = (type) => {
        setActionType(type);
        setIsModalVisible(true);
    };

    const handleConfirm = async () => {
        setIsModalVisible(false); // Close confirmation modal

        if (actionType === 'deleteBiodata') {
            try {
                const response = await DELETE_BIODATA_API(); // Call API

                if (response?.status === 400) {
                    Toast.show({
                        type: "error",
                        text1: "Error",
                        text2: response.data.message || "Failed to delete Biodata!",
                    });
                } else {
                    Toast.show({
                        type: "success",
                        text1: "Success",
                        text2: "Biodata Deleted Successfully!",
                    });
                }

            } catch (error) {
                console.error("❌ Error in handleConfirm:", error);

                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: error?.response?.data?.message || "Something went wrong!",
                });
            }
        }
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
