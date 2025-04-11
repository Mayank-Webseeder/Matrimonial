import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, StatusBar, Image, FlatList, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../StyleScreens/IntrestedProfileStyle';
import Colors from '../../utils/Colors';
import Globalstyles from '../../utils/GlobalCss';
import axios from 'axios';
import { DELETE_SEND_REQUEST, RECEIVER_REQUESTS, SENDER_REQUESTS } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileImage from '../../Images/NoImage.png';
import { useFocusEffect } from '@react-navigation/native';
import { SF, SH, SW } from '../../utils/Dimensions';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const IntrestedProfile = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [interestSentData, setInterestSentData] = useState([]);
  const [interestReceivedData, setInterestReceivedData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(SENDER_REQUESTS, setInterestSentData);
    fetchData(RECEIVER_REQUESTS, setInterestReceivedData);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const fetchData = async (url, setData) => {
    try {
      setData([])
      setIsLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await axios.get(url, { headers });
      console.log("response.data.data", JSON.stringify(response.data.data));
      setData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(SENDER_REQUESTS, setInterestSentData);
      fetchData(RECEIVER_REQUESTS, setInterestReceivedData);
    }, [])
  );

  const renderSkeleton = () => (
    <SkeletonPlaceholder>
      <View style={{ margin: SH(20) }}>
        {[...Array(4)].map((_, index) => (
          <View key={index} style={{ flexDirection: "row", marginBottom: SH(20) }}>
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

  const renderItem = ({ item }, isSent) => {
    const userData = isSent ? item.toUserBioData : item.FromUserBioData;
    const isVisible = item?.isVisible;
    const status = item?.status;


    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          console.log("userData", userData);

          if (isSent) {
            const formattedUserData = {
              ...item.toUserBioData,
              requestId: item?.requestId,
              isSaved: item?.isSaved,
              isBlur: item?.toUserBioData?.isBlur,
            };

            navigation.navigate("MatrimonyPeopleProfile", {
              userDetails: formattedUserData,
              userId: formattedUserData?.userId,
              isSaved: formattedUserData?.isSaved,
              isVisible: isVisible,
              isBlur: formattedUserData?.isBlur,
              status: item?.status,
              requestId:item?.requestId
            });
          } else {
            navigation.navigate("IntrestReceivedProfilePage", {
              userId: userData?.userId,
              biodata: userData,
              requestId: item?.requestId,
              isBlur: item?.isVisible,
              status: item?.status
            });
          }
        }}
      >
        <View style={styles.leftContent}>
          <Image
            source={{ uri: userData?.personalDetails?.closeUpPhoto || profileImage }}
            style={styles.dpImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.userId} numberOfLines={1} ellipsizeMode="tail">
              ID : {userData?.bioDataId || 'Unknown'}
            </Text>
            <Text style={styles.name}>{userData?.personalDetails?.fullname || 'Unknown'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.Statusbutton}>
          <Text style={styles.StatusbuttonText}>
            {status === 'interested'
              ? 'Pending'
              : status
                ? status.charAt(0).toUpperCase() + status.slice(1)
                : 'Unknown'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };



  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.theme_color} />
      </View>
    );
  }

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name={'arrow-back-ios-new'} size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Matrimony</Text>
        </View>
      </View>

      <FlatList
        data={activeButton === 1 ? interestSentData : interestReceivedData}
        keyExtractor={(item) => item.requestId}
        renderItem={(item) => renderItem(item, activeButton === 1)}
        ListHeaderComponent={
          <View>
            <View style={styles.ButtonContainer}>
              {[['Interest Sent', 1], ['Interest Received', 2]].map(([label, id]) => (
                <TouchableOpacity
                  key={id}
                  style={[styles.button, activeButton === id ? styles.activeButton : styles.inactiveButton]}
                  onPress={() => setActiveButton(id)}
                >
                  <Text style={activeButton === id ? styles.activeText : styles.inactiveText}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        }
        ListEmptyComponent={
          isLoading ? renderSkeleton() : (
            <View style={{ alignItems: "center", marginTop: SH(50) }}>
              {
                activeButton === 1 ? (
                  <MaterialCommunityIcons
                    name="send-circle"
                    size={60}
                    color={Colors.theme_color}
                  />
                ) : (
                  <Ionicons
                    name="heart-circle-outline"
                    size={60}
                    color={Colors.theme_color}
                  />
                )
              }
              <Text style={[styles.noDataText, { fontFamily: "Poppins-Medium", fontSize: SF(17) }]}>
                {activeButton === 1 ? 'No Interests Sent' : 'No Interests Received'}
              </Text>
              <Text style={{ color: 'gray', textAlign: 'center', paddingHorizontal: SH(20), fontFamily: "Poppins-Medium" }}>
                {activeButton === 1
                  ? "Profiles you've shown interest in will appear here."
                  : "You'll see profiles here who are interested in you."}
              </Text>
            </View>
          )
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>

  );
};

export default IntrestedProfile;