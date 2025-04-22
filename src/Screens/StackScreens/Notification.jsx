import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StatusBar, Image, ActivityIndicator, RefreshControl } from 'react-native';
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
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useSelector } from 'react-redux';
import { setAllNotification } from '../../ReduxStore/Slices/GetAllNotificationSlice';
import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Notification = ({ navigation }) => {
  const [NotificationData, setNotificationData] = useState([]);
  const [seenotificationData, setseenNotificationData] = useState([]);
  const [viewNotification, setViewnotification] = useState({});
  const [IsLoading, setIsLoading] = useState(true);
  const [showSeen, setShowSeen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();
  const Notificationdata = useSelector((state) => state.GetAllNotification);
  // const NotificationDatas = Notificationdata?.AllNotification;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    GetAll_Seen_Notification();
    GetAll_Notification();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const GetAll_Notification = async () => {
    setNotificationData([]);
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
      dispatch(setAllNotification(notificationData));
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

  const VIEW_Notification = (notification) => {
    // Logging the entire notification object for inspection
    console.log("📬 Received notification object:", JSON.stringify(notification, null, 2));

    const { notificationType, _id, userId } = notification;

    // Check if _id exists
    if (!_id) {
      console.warn("❌ Notification ID is missing!", { _id });
      return;
    }

    // Check if userId exists
    if (!userId) {
      console.warn("❌ User ID is missing!", { userId });
      return;
    }

    // Logging the details of the notification
    console.log("✅ Notification Details - Type:", notificationType, "ID:", _id, "User ID:", userId);

    // Navigate based on the notification type
    switch (notificationType) {
      case 'comment':
      case 'like':
        console.log("🚀 Navigating to EventNews with ID:", _id, "User ID:", userId);
        navigation.navigate('EventNews', { id: _id, userId });
        break;

      case 'activistApproved':
        console.log("🚀 Navigating to Activist with ID:", _id, "User ID:", userId);
        navigation.navigate('Activist', { id: _id, userId });
        break;

      case 'connectionRequestResponse':
        console.log("🚀 Navigating to MatrimonyPeopleProfile with ID:", notification._id, "User ID:", notification.relatedData.toUserId);
        navigation.navigate('MatrimonyPeopleProfile', {
          id: notification._id,
          userId: notification?.relatedData?.toUserId,
        });
        break;

      case 'connectionRequest':
        console.log("📩 Navigating to IntrestReceivedProfilePage with ID:", notification._id, "User ID:", notification.relatedData.fromUserId);
        navigation.navigate('IntrestReceivedProfilePage', {
          id: notification._id,
          userId: notification?.relatedData?.fromUserId, // 👈 correct key
        });
        break;

      case 'kathavachakApproved':
        console.log("🚀 Navigating to KathavachakDetailsPage with kathavachak_id:", notification?.relatedData?.kathavachakId, "User ID:", userId);
        navigation.navigate('KathavachakDetailsPage', { kathavachak_id: notification?.relatedData?.kathavachakId, userId });
        break;

      case 'jyotishApproved':
        console.log("🚀 Navigating to JyotishDetailsPage with jyotish_id:", notification?.relatedData?.jyotishId, "User ID:", userId);
        navigation.navigate('JyotishDetailsPage', { jyotish_id: notification?.relatedData?.jyotishId, userId });
        break;

      case 'panditApproved':
        console.log("🚀 Navigating to PanditDetailPage with pandit_id:", notification?.relatedData?.panditId, "User ID:", userId);
        navigation.navigate('PanditDetailPage', { pandit_id: notification?.relatedData?.panditId, userId });
        break;

      default:
        console.log('⚠️ Unknown notification type:', notificationType);
    }

    // Mark the notification as seen
    setTimeout(async () => {
      try {
        console.log("📤 Marking notification as seen for ID:", _id);

        const token = await AsyncStorage.getItem("userToken");
        if (!token) throw new Error("No token found");

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const res = await axios.patch(`${VIEW_NOTIFICATION}/${_id}`, {}, { headers });

        console.log("✅ Notification marked as seen:", res.data.data);
      } catch (error) {
        console.error("❌ Error marking notification as seen:", error.response ? error.response.data : error.message);
      }
    }, 500);
  };


  const handleNavigation = (notification) => {
    console.log("notification", JSON.stringify(notification))
    const { notificationType, _id, userId } = notification;

    switch (notificationType) {
      case 'comment':
      case 'like':
        navigation.navigate('EventNews', { id: _id, userId });
        break;

      case 'activistApproved':
        navigation.navigate('Activist', { id: _id, userId });
        break;

      case 'connectionRequestResponse':
        console.log("🚀 Navigating to MatrimonyPeopleProfile with ID:", notification._id, "User ID:", notification.relatedData.fromUserId);
        navigation.navigate('MatrimonyPeopleProfile', {
          id: notification._id,
          userId: notification?.relatedData?.fromUserId,
        });
        break;

      case 'connectionRequest':
        console.log("📩 Navigating to IntrestReceivedProfilePage with ID:", notification._id, "User ID:", notification.relatedData.fromUserId);
        navigation.navigate('IntrestReceivedProfilePage', {
          id: notification._id,
          userId: notification?.relatedData?.fromUserId,
        });
        break;

      case 'kathavachakApproved':
        console.log("🚀 Navigating to KathavachakDetailsPage with kathavachak_id:", notification?.relatedData?.kathavachakId, "User ID:", userId);
        navigation.navigate('KathavachakDetailsPage', { kathavachak_id: notification?.relatedData?.kathavachakId, userId });
        break;

      case 'jyotishApproved':
        console.log("🚀 Navigating to JyotishDetailsPage with jyotish_id:", notification?.relatedData?.jyotishId, "User ID:", userId);
        navigation.navigate('JyotishDetailsPage', { jyotish_id: notification?.relatedData?.jyotishId, userId });
        break;

      case 'panditApproved':
        console.log("🚀 Navigating to PanditDetailPage with pandit_id:", notification?.relatedData?.panditId, "User ID:", userId);
        navigation.navigate('PanditDetailPage', { pandit_id: notification?.relatedData?.panditId, userId });
        break;

      default:
        console.log('Unknown notification type:', notificationType);
    }
  };


  useFocusEffect(
    useCallback(() => {
      console.log("NotificationData in notification page", NotificationData)
      GetAll_Seen_Notification();
      GetAll_Notification();
    }, [])
  );

  const renderSkeleton = () => (
    <SkeletonPlaceholder>
      <View style={{ margin: SH(20) }}>
        {[1, 2, 3, 4].map((_, index) => (
          <View key={index} style={{ flexDirection: "row", marginBottom: 20 }}>
            <View style={{ width: SW(80), height: SH(80), borderRadius: 40, marginRight: SW(10) }} />
            <View>
              <View style={{ width: SW(150), height: SH(20), borderRadius: 4 }} />
              <View style={{ width: SW(100), height: SH(15), borderRadius: 4, marginTop: SH(6) }} />
              <View style={{ width: SW(80), height: SH(15), borderRadius: 4, marginTop: SH(6) }} />
            </View>
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );

  const renderItem = ({ item }) => {
    const photoUrl = Array.isArray(item?.relatedData?.photoUrl)
      ? item.relatedData.photoUrl[0]
      : item?.relatedData?.photoUrl;
    return (
      <TouchableOpacity style={styles.card} onPress={() => VIEW_Notification(item)}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={
              imageError || !photoUrl
                ? require('../../Images/AppLogo.jpg')
                : { uri: photoUrl }
            }
            style={styles.notificationImage}
            onError={() => {
              console.log("Image Load Error");
              setImageError(true);
            }}
          />

          <View style={{ marginLeft: SW(10) }}>
            <Text style={styles.name}>{item.relatedData.username || item?.relatedData?.likedBy?.name || item?.relatedData?.commentBy?.name}</Text>
            <Text style={styles.message}>{item?.message}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSeenItem = ({ item }) => {
    const photoUrl = Array.isArray(item?.relatedData?.photoUrl)
      ? item.relatedData.photoUrl[0]
      : item?.relatedData?.photoUrl;
    return (
      <TouchableOpacity style={styles.card}
        onPress={() => handleNavigation(item)}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={
              imageError || !photoUrl
                ? require('../../Images/AppLogo.jpg')
                : { uri: photoUrl }
            }
            style={styles.notificationImage}
            onError={() => {
              console.log("Image Load Error");
              setImageError(true);
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.name}>{item.relatedData.username || item.relatedData.likedBy?.name || item.relatedData.commentBy?.name}</Text>
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
          <TouchableOpacity onPress={() => navigation.navigate("MainApp")}>
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
              paddingHorizontal: (13),
              backgroundColor: showSeen ? Colors.theme_color : "lightgray",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white" }}>Seen Notifications</Text>
          </TouchableOpacity>
        </View>

        {/* Notification List */}
        {IsLoading ? (
          renderSkeleton()
        ) : (
          <FlatList
            data={showSeen ? seenotificationData : NotificationData}
            renderItem={showSeen ? renderSeenItem : renderItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Ionicons name={'notifications-circle-sharp'} color={Colors.theme_color} size={100} />
                <Text style={{ color: "gray", fontWeight: '600', fontSize: SF(15), fontFamily: "Poppins-Bold" }}>Notifications will appear here</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Notification;
