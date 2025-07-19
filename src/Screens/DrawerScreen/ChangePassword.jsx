import React, { useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, Modal, TextInput, StatusBar, Image, KeyboardAvoidingView, ScrollView, Platform, SafeAreaView } from 'react-native';
import Colors from '../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../StyleScreens/ChangePasswordStyle';
import Globalstyles from '../../utils/GlobalCss';
import { CHANGE_PASSWORD } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DrawerActions, useFocusEffect } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { SH, SW } from '../../utils/Dimensions';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ChangePassword = ({ navigation }) => {
  const insets = useSafeAreaInsets();
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
      showMessage({ type: 'danger', message: 'Validation Error', description: 'All fields are required!', icon: "danger", duration: 7000 });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      showMessage({ type: "danger", message: 'Validation Error', description: 'Passwords do not match!', duration: 7000 });
      return;
    }

    setPasswordError('');
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        showMessage({ type: "danger", message: 'Authentication Error', description: 'No token found! Please log in again.', duration: 5000 });
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
        showMessage({ type: 'success', message: 'Success', description: 'Password changed successfully!', icon: "success", duration: 7000 });
        setIsModalVisible(true);
      } else {
        showMessage({ type: 'danger', message: 'Error', description: response.data.message || "Something went wrong!", icon: "danger", duration: 5000 });
      }

    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching biodata:", errorMsg);

      const sessionExpiredMessages = [
        "User does not Exist....!Please login again",
        "Invalid token. Please login again",
        "Token has expired. Please login again"
      ];

      if (sessionExpiredMessages.includes(errorMsg)) {
        await AsyncStorage.removeItem("userToken");
        navigation.reset({
          index: 0,
          routes: [{ name: "AuthStack" }],
        });
      }
      setLoading(false);

      if (error.response && error.response.status === 400) {
        console.log("❌ API Error Response:", error.response.data);
        showMessage({ type: "danger", message: 'Error', description: errorMsg || "Error changing password!", duration: 7000 });
      } else {
        console.log("❌ Network Error:", error);
        showMessage({ type: "danger", message: 'Network Error', description: 'Please try again.', icon: "danger", duration: 7000 });
      }
    }
  };


  const closeModalAndNavigate = () => {
    setIsModalVisible(false);
    navigation.navigate('Tabs');
  };

  return (
    <SafeAreaView style={Globalstyles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <View style={Globalstyles.header}>
          <View style={{ flexDirection: 'row', alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image source={require('../../Images/menu.png')} style={{ width: SW(30), height: SH(30) }} />
            </TouchableOpacity>
            <Text style={Globalstyles.headerText}>Change Password</Text>
          </View>
        </View>

        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + SH(65), flexGrow: 1 }}>
          <View>
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
                  autoComplete="off"
                  textContentType="oldPassword"
                  importantForAutofill="no"
                  autoCorrect={false}
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
                  autoComplete="off"
                  textContentType="newPassword"
                  importantForAutofill="no"
                  autoCorrect={false}
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
                  autoComplete="off"
                  textContentType="confirmPassword"
                  importantForAutofill="no"
                  autoCorrect={false}
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePassword;
