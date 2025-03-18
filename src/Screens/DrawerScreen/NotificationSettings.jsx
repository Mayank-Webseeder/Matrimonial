import React, { useState, useEffect } from "react";
import { Text, View, Switch, TouchableOpacity, SafeAreaView, StatusBar, ToastAndroid } from "react-native";
import Colors from "../../utils/Colors";
import styles from "../StyleScreens/NotificationSettingStyle";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Globalstyles from "../../utils/GlobalCss";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EVENT_NEWS_NOTIFICATION_HANDLE_API, CONNECTION_REQUEST_HANDLE_API } from "../../utils/BaseUrl";

const NotificationSettings = ({ navigation }) => {
  const [profileInterest, setProfileInterest] = useState(true); // Always ON initially
  const [newsEvents, setNewsEvents] = useState(true); // Always ON initially
  const [loadingProfileInterest, setLoadingProfileInterest] = useState(false);
  const [loadingNewsEvents, setLoadingNewsEvents] = useState(false);

  const updateProfileInterestNotification = async () => {
    try {
      setLoadingProfileInterest(true);
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.patch(CONNECTION_REQUEST_HANDLE_API, {}, { headers });

      setProfileInterest(prevState => !prevState); // Just toggle the state
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error updating profile interest notification:", error);
      ToastAndroid.show("Failed to update setting. Try again!", ToastAndroid.LONG);
    } finally {
      setLoadingProfileInterest(false);
    }
  };

  const updateNewsEventsNotification = async () => {
    try {
      setLoadingNewsEvents(true);
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.patch(EVENT_NEWS_NOTIFICATION_HANDLE_API, {}, { headers });

      setNewsEvents(prevState => !prevState); // Just toggle the state
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error updating news/events notification:", error);
      ToastAndroid.show("Failed to update setting. Try again!", ToastAndroid.LONG);
    } finally {
      setLoadingNewsEvents(false);
    }
  };

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={Globalstyles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Notification Settings</Text>
        </View>
      </View>

      <View style={styles.toggleContainer}>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Profile Interest Notifications</Text>
          <Switch
            trackColor={{ false: Colors.gray, true: Colors.gray }}
            thumbColor={profileInterest ? Colors.theme_color : Colors.theme_color}
            onValueChange={updateProfileInterestNotification}
            value={profileInterest}
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
