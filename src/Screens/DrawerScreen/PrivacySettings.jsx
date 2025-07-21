import React, { useState, useEffect } from 'react';
import { Text, View, Switch, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, Image } from 'react-native';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/NotificationSettingStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';
import { HIDE_CONTACT, HIDE_OPTIONAL_DETAILS, INACTIVE_ID, BLUR_PHOTOS } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { DrawerActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { SH, SW } from '../../utils/Dimensions';

const PrivacySettings = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const MyprofileData = useSelector((state) => state.getBiodata);
  const hideContact = MyprofileData?.Biodata?.hideContact ?? false;
  const hideOptionalDetails = MyprofileData?.Biodata?.hideOptionalDetails ?? false;
  const isActive = MyprofileData?.Biodata?.activityStatus === "Inactive";
  const isBlur = MyprofileData?.Biodata?.isBlur ?? false;
  const [inactivateId, setInactivateId] = useState(isActive);
  const [hideContactDetails, setHideContactDetails] = useState(hideContact);
  const [hideOptionalDetailsState, setHideOptionalDetailsState] = useState(hideOptionalDetails);
  const [blurPhotos, setBlurPhotos] = useState(isBlur);

  useEffect(() => {
    console.log("MyprofileData", JSON.stringify(MyprofileData));
  }, [])

  const togglePrivacySetting = async (settingType, currentValue, setter, apiUrl) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const newValue = !currentValue;
      setter(newValue);

      const response = await axios.patch(apiUrl, { status: newValue }, { headers });

      console.log("Toggle API Response:", response.data);

      if (response.status === 200) {
        showMessage({
          type: "success",
          message: "Success",
          description: response.data.message || `${settingType} updated successfully!`,
          icon: "success"
        });
      } else {
        throw new Error(response.data.message || "Something went wrong!");
      }

    } catch (error) {
      console.error(`Error updating ${settingType}:`, error?.response?.data || error.message);
      const errorMsg = error.response?.data?.message || error.message;
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
        return;
      }
      let errorMessage = `Failed to update ${settingType}. Please try again!`;
      if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || "Invalid request!";
      }
      showMessage({
        type: "danger",
        message: "Info",
        description: errorMessage,
        icon: "danger"
      });
      setter(currentValue);
    }
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.theme_color} />
      </View>
    );
  }


  return (
    <SafeAreaView style={Globalstyles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={require('../../Images/menu.png')} style={{ width: SW(30), height: SH(30) }} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Privacy Settings</Text>
        </View>
      </View>

      {/* Privacy Toggles */}
      <View style={styles.toggleContainer}>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Inactivate Id</Text>
          <Switch
            trackColor={{ false: Colors.gray, true: Colors.gray }}
            thumbColor={inactivateId ? Colors.theme_color : Colors.theme_color}
            onValueChange={() => togglePrivacySetting("Inactivate ID", inactivateId, setInactivateId, INACTIVE_ID)}
            value={inactivateId}
            disabled={isLoading}
            animated
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Hide Contact Details</Text>
          <Switch
            trackColor={{ false: Colors.gray, true: Colors.gray }}
            thumbColor={hideContactDetails ? Colors.theme_color : Colors.theme_color}
            onValueChange={() => togglePrivacySetting("Hide Contact Details", hideContactDetails, setHideContactDetails, HIDE_CONTACT)}
            value={hideContactDetails}
            disabled={isLoading}
            animated
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Blur Photos</Text>
          <Switch
            trackColor={{ false: Colors.gray, true: Colors.gray }}
            thumbColor={blurPhotos ? Colors.theme_color : Colors.theme_color}
            onValueChange={() => togglePrivacySetting("Blur Photos", blurPhotos, setBlurPhotos, BLUR_PHOTOS)}
            value={blurPhotos}
            animated
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Hide Optional Details in Biodata Profile</Text>
          <Switch
            trackColor={{ false: Colors.gray, true: Colors.gray }}
            thumbColor={hideOptionalDetailsState ? Colors.theme_color : Colors.theme_color}
            onValueChange={() => togglePrivacySetting("Hide Optional Details", hideOptionalDetailsState, setHideOptionalDetailsState, HIDE_OPTIONAL_DETAILS)}
            value={hideOptionalDetailsState}
            disabled={isLoading}
            animated
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PrivacySettings;
