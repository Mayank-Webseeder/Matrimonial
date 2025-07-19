import React, { useState, useEffect } from "react";
import { Text, View, Switch, TouchableOpacity, SafeAreaView, StatusBar, ToastAndroid,Image } from "react-native";
import Colors from "../../utils/Colors";
import styles from "../StyleScreens/NotificationSettingStyle";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Globalstyles from "../../utils/GlobalCss";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EVENT_NEWS_NOTIFICATION_HANDLE_API, CONNECTION_REQUEST_HANDLE_API } from "../../utils/BaseUrl";
import { useSelector } from "react-redux";
import { DrawerActions } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { SH,SW } from "../../utils/Dimensions";

const NotificationSettings = ({ navigation }) => {
  const ProfileData = useSelector((state) => state.profile);
  const profiledata = ProfileData?.profiledata || {};

  const [profileInterest, setProfileInterest] = useState(profiledata?.connReqNotification ?? false);
  const [newsEvents, setNewsEvents] = useState(profiledata?.eventPostNotification ?? false);
  const [loadingProfileInterest, setLoadingProfileInterest] = useState(false);
  const [loadingNewsEvents, setLoadingNewsEvents] = useState(false);

  useEffect(() => {
    console.log("ProfileData", ProfileData);
    console.log("connReqNotification", profileInterest);
    console.log("eventPostNotification", newsEvents);
  }, []);

  const updateProfileInterestNotification = async () => {
    const newState = !profileInterest;
    setProfileInterest(newState); // Optimistically toggle state

    try {
      setLoadingProfileInterest(true);
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.patch(CONNECTION_REQUEST_HANDLE_API, {}, { headers });

      if (response.status === 200 && response.data.status) {
        showMessage({
          type: "success",
          message: "Success",
          description: response.data.message || "Setting updated successfully!",
          icon:"success",
          duration: 5000
        });
      } else {
        throw new Error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error updating profile interest notification:", errorMsg);
      setProfileInterest(!newState); // Revert UI if API fails
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

      showMessage({
        type: "danger",
        message: "Error",
        description: errorMsg,
        icon:"danger",
        duration: 5000
      });
    } finally {
      setLoadingProfileInterest(false);
    }
  };

  const updateNewsEventsNotification = async () => {
    const newState = !newsEvents;
    setNewsEvents(newState); // Optimistically toggle state

    try {
      setLoadingNewsEvents(true);
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.patch(EVENT_NEWS_NOTIFICATION_HANDLE_API, {}, { headers });

      if (response.status === 200 && response.data.status === true) {
        showMessage({
          type: "success",
          message: "Success",
          description: response.data.message || "Notification updated successfully!",
          icon:"success",duration: 5000
        });
      } else {
        throw new Error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error updating news/events notification:", errorMsg);
      setNewsEvents(!newState);
      showMessage({
        type: "danger",
        message: "Error",
        description: errorMsg,
        icon:"danger",
        duration: 5000,
      });
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
    } finally {
      setLoadingNewsEvents(false);
    }
  };


  return (
    <SafeAreaView style={Globalstyles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={Globalstyles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={require('../../Images/menu.png')} style={{width: SW(30),height: SH(30)}} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Notification Settings</Text>
        </View>
      </View>

      <View style={styles.toggleContainer}>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Profile Interest Notifications</Text>
          <Switch
            trackColor={{ false: Colors.gray, true: Colors.gray }} // Set ON color correctly
            thumbColor={profileInterest ? Colors.theme_color : Colors.theme_color} // Change thumb color based on state
            onValueChange={updateProfileInterestNotification}
            value={profileInterest} // Keep the state as it is
            disabled={loadingProfileInterest}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>News/Events Notifications</Text>
          <Switch
            trackColor={{ false: Colors.gray, true: Colors.gray }}
            thumbColor={newsEvents ? Colors.theme_color : Colors.theme_color}
            onValueChange={updateNewsEventsNotification}
            value={newsEvents}
            disabled={loadingNewsEvents}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationSettings;