import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, StatusBar, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../StyleScreens/IntrestedProfileStyle';
import Colors from '../../utils/Colors';
import Globalstyles from '../../utils/GlobalCss';
import axios from 'axios';
import { RECEIVER_REQUESTS, SENDER_REQUESTS } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileImage from '../../Images/NoImage.png';
import { useFocusEffect } from '@react-navigation/native';
import { SH, SW } from '../../utils/Dimensions';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const IntrestedProfile = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [interestSentData, setInterestSentData] = useState([]);
  const [interestReceivedData, setInterestReceivedData] = useState([]);

  const fetchData = async (url, setData) => {
    try {
      setData([])
      setIsLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await axios.get(url, { headers });
      console.log("response.data.data",JSON.stringify(response.data.data));
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
          <View key={index} style={{ flexDirection: "row", marginBottom:SH(20) }}>
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
  
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          if (item?.status === 'accepted') {
            if (isSent) {
              const userData = {
                ...item.toUserBioData,
                requestId: item?.requestId,
                isSaved: item?.isSaved,
                isBlur: item?.isBlur, 
              };
              navigation.navigate("MatrimonyPeopleProfile", {
                userDetails: userData,
                userId: userData?.userId,
                isSaved: userData?.isSaved,
                isBlur: userData?.isBlur, 
                 status:item?.status
              });
            } else {
              navigation.navigate("IntrestReceivedProfilePage", {
                userId: userData?.userId,
                biodata: userData,
                requestId: item?.requestId,
                isSaved: item?.isSaved,
                isBlur: item?.isBlur,
              });
            }
          } else {
            alert("Profile can only be viewed when the request is accepted.");
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
            {item?.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'Unknown'}
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

      <ScrollView showsVerticalScrollIndicator={false}>
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

          {isLoading ? (
            renderSkeleton()
          ) : (
            <FlatList
              data={activeButton === 1 ? interestSentData : interestReceivedData}
              renderItem={(item) => renderItem(item, activeButton === 1)}
              scrollEnabled={false}
              keyExtractor={(item) => item.requestId}
              ListEmptyComponent={<Text style={styles.noDataText}>No interests {activeButton === 1 ? 'sent' : 'received'}</Text>}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IntrestedProfile;