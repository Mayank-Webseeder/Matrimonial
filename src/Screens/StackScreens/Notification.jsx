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

const Notification = ({ navigation }) => {
  const [NotificationData, setNotificationData] = useState([]);
  const [seenotificationData, setseenNotificationData] = useState([]);
  const [viewNotification, setViewnotification] = useState({});
  const [IsLoading, setIsLoading] = useState(true);
  const [showSeen, setShowSeen] = useState(false);
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
      navigation.reset({
        index: 0,
        routes: [{ name: "Notification" }],
      });
    } catch (error) {
      console.error("Error fetching notifications:", error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
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
      ? item.relatedData.photoUrl[0] // Get the first URL if it's an array
      : item?.relatedData?.photoUrl;
    return (
      <TouchableOpacity style={styles.card} onPress={() => VIEW_Notification(item._id)}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Notification Image */}

          <Image
            source={{ uri: photoUrl }}
            style={styles.notificationImage}
            onError={(e) => console.log("Image Load Error:", e.nativeEvent.error)}
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
      <TouchableOpacity style={styles.card}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: photoUrl }}
            style={styles.notificationImage}
            onError={(e) => console.log("Image Load Error:", e.nativeEvent.error)}
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
