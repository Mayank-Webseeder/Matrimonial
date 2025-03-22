import React, { useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, Modal, TextInput, SafeAreaView, StatusBar } from 'react-native';
import Colors from '../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../StyleScreens/ChangePasswordStyle';
import Globalstyles from '../../utils/GlobalCss';
import { CHANGE_PASSWORD } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DrawerActions, useFocusEffect } from '@react-navigation/native';

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, [])
  );

  const togglePasswordVisibility = (field) => {
    if (field === "old") setShowOldPassword(!showOldPassword);
    else if (field === "new") setShowNewPassword(!showNewPassword);
    else setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required!");
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'All fields are required!' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Passwords do not match!' });
      return;
    }

    setPasswordError('');
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Toast.show({ type: 'error', text1: 'Authentication Error', text2: 'No token found! Please log in again.' });
        setLoading(false);
        return;
      }

      const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
      const payload = { oldPassword, newPassword };

      console.log("🔹 Sending API Request:", payload);
      const response = await axios.post(CHANGE_PASSWORD, payload, { headers });

      console.log("✅ API Response:", response.data);
      setLoading(false);

      if (response.status === 200 && response.data.status === true) {
        Toast.show({ type: 'success', text1: 'Success', text2: 'Password changed successfully!' });
        setIsModalVisible(true);
      } else {
        Toast.show({ type: 'error', text1: 'Error', text2: response.data.message || "Something went wrong!" });
      }

    } catch (error) {
      setLoading(false);

      if (error.response && error.response.status === 400) {
        console.log("❌ API Error Response:", error.response.data);
        Toast.show({ type: 'error', text1: 'Error', text2: error.response.data.message || "Error changing password!" });
      } else {
        console.log("❌ Network Error:", error);
        Toast.show({ type: 'error', text1: 'Network Error', text2: 'Please try again.' });
      }
    }
  };


  const closeModalAndNavigate = () => {
    setIsModalVisible(false);
    navigation.navigate('Tabs');
  };

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Change Password</Text>
        </View>
      </View>

      <Text style={styles.Text}>Please enter your new password and confirm it to change your old password</Text>

      <View style={styles.inputContainer}>
        {/* Old Password Field */}
        <View style={styles.passwordField}>
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            secureTextEntry={!showOldPassword}
            value={oldPassword}
            onChangeText={setOldPassword}
            placeholderTextColor={Colors.gray}
          />
          <TouchableOpacity onPress={() => togglePasswordVisibility("old")} style={styles.eyeIcon}>
            <AntDesign name={showOldPassword ? "eye" : "eyeo"} size={24} color={Colors.theme_color} />
          </TouchableOpacity>
        </View>

        {/* New Password Field */}
        <View style={styles.passwordField}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholderTextColor={Colors.gray}
          />
          <TouchableOpacity onPress={() => togglePasswordVisibility("new")} style={styles.eyeIcon}>
            <AntDesign name={showNewPassword ? "eye" : "eyeo"} size={24} color={Colors.theme_color} />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Field */}
        <View style={styles.passwordField}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor={Colors.gray}
          />
          <TouchableOpacity onPress={() => togglePasswordVisibility("confirm")} style={styles.eyeIcon}>
            <AntDesign name={showConfirmPassword ? "eye" : "eyeo"} size={24} color={Colors.theme_color} />
          </TouchableOpacity>
        </View>

        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TouchableOpacity style={styles.optionButton} onPress={handleChangePassword} disabled={loading}>
          <Text style={styles.optionText}>{loading ? "Updating..." : "Change Password"}</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Password changed successfully!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModalAndNavigate}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Toast />
    </SafeAreaView>
  );
};

export default ChangePassword;
