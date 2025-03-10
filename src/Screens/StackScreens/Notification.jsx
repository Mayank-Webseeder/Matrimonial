import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StatusBar, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../StyleScreens/NotificationsStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import Globalstyles from '../../utils/GlobalCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NOTIFICATION } from '../../utils/BaseUrl';
import axios from 'axios';

const Notification = ({ navigation }) => {
  const [NotificationData, setNotificationData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);

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
      setNotificationData(notificationData);
    } catch (error) {
      console.error("Error fetching notifications:", error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetAll_Notification();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
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
      </View>
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
        {IsLoading ? (
          <ActivityIndicator size="large" color={Colors.theme_color} style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={NotificationData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No Notification Found yet.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Notification;
