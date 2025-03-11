import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StatusBar, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import styles from '../StyleScreens/NotificationsStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import Globalstyles from '../../utils/GlobalCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NOTIFICATION, VIEW_NOTIFICATION, SEEN_NOTIFICATION } from '../../utils/BaseUrl';
import axios from 'axios';
import { SH, SW, SF } from '../../utils/Dimensions';
import { useFocusEffect } from '@react-navigation/native';
const Notification = ({ navigation }) => {
  const [NotificationData, setNotificationData] = useState([]);
  const [seenotificationData, setseenNotificationData] = useState([]);
  const [viewNotification, setViewnotification] = useState({});
  const [IsLoading, setIsLoading] = useState(true);
  const [showSeen, setShowSeen] = useState(false);

  const GetAll_Notification = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const res = await axios.get(NOTIFICATION, { headers });
      const notificationData = res.data.data;
      console.log("notificationData", JSON.stringify(notificationData));
      setNotificationData(notificationData);
    } catch (error) {
      console.error("Error fetching notifications:", error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const GetAll_Seen_Notification = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const res = await axios.get(SEEN_NOTIFICATION, { headers });
      const notificationData = res.data.data;
      console.log("notificationData", JSON.stringify(notificationData));
      setseenNotificationData(notificationData);
    } catch (error) {
      console.error("Error fetching notifications:", error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const VIEW_Notification = async (_id) => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const res = await axios.patch(`${VIEW_NOTIFICATION}/${_id}`, {}, { headers });
      const notificationData = res.data.data;
      console.log("notificationData", JSON.stringify(notificationData));
      setViewnotification(notificationData);
      navigation.navigate('NotificationDetails', { notification: notificationData })
    } catch (error) {
      console.error("Error fetching notifications:", error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };


  useFocusEffect(
    useCallback(() => {
      GetAll_Notification();
      GetAll_Seen_Notification();
    }, [])
  );

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => VIEW_Notification(item._id)}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Notification Image */}
          {item.relatedData?.photoUrl?.length > 0 && (
            <Image
              source={{ uri: item.relatedData.photoUrl[0] }}
              style={styles.notificationImage}
            />
          )}
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.name}>{item.relatedData.likedBy?.name || item.relatedData.commentBy?.name}</Text>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSeenItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('NotificationDetails', { NotificationData: item })}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Notification Image */}
          {item.relatedData?.photoUrl?.length > 0 && (
            <Image
              source={{ uri: item.relatedData.photoUrl[0] }}
              style={styles.notificationImage}
            />
          )}
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.name}>{item.relatedData.likedBy?.name || item.relatedData.commentBy?.name}</Text>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={Globalstyles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name={'arrow-back-ios-new'} size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Notifications</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {/* Toggle Buttons */}
        <View style={{ flexDirection: "row", justifyContent: "space-around", marginVertical: 10 }}>
          <TouchableOpacity
            onPress={() => setShowSeen(false)}
            style={{
              paddingVertical: SH(10),
              paddingHorizontal: (10),
              backgroundColor: !showSeen ? Colors.theme_color : "lightgray",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white" }}>Unseen Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowSeen(true)}
            style={{
              paddingVertical: SH(10),
              paddingHorizontal: (10),
              backgroundColor: showSeen ? Colors.theme_color : "lightgray",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white" }}>Seen Notifications</Text>
          </TouchableOpacity>
        </View>

        {/* Notification List */}
        {IsLoading ? (
          <ActivityIndicator size="large" color={Colors.theme_color} style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={showSeen ? seenotificationData : NotificationData}
            renderItem={showSeen ? renderSeenItem : renderItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Text style={{ color: "gray" }}>No Notification Found yet.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Notification;
