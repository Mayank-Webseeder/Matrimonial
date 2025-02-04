import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, StatusBar, Image, FlatList, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../StyleScreens/IntrestedProfileStyle';
import Colors from '../../utils/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import Globalstyles from '../../utils/GlobalCss';
import axios from 'axios';
import { RECEIVER_REQUESTS, SENDER_REQUESTS } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileImage from '../../Images/Profile1.png';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const IntrestedProfile = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [interestSentData, setInterestSentData] = useState([]);
  const [interestReceivedData, setInterestReceivedData] = useState([]);
  const getAllBiodata = useSelector((state) => state.getAllBiodata);
  console.log("interestReceivedData", JSON.stringify(interestReceivedData));

  const getInterestSentData = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(SENDER_REQUESTS, { headers });
      setInterestSentData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching sent interests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getInterestReceivedData = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(RECEIVER_REQUESTS, { headers });
      setInterestReceivedData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching received interests:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getInterestSentData();
      getInterestReceivedData();
    }, [])
  );

  const renderInterestSentItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.leftContent}>
        <Image source={{ uri: item.toUserBioData?.personalDetails?.closeUpPhoto || profileImage }} style={styles.dpImage} />
        <View style={styles.cardContent}>
          <Text style={styles.userId} numberOfLines={1} ellipsizeMode="tail">
            {item.toUserBioData?.userId || 'Unknown'}
          </Text>
          <Text style={styles.name}>
            {item.toUserBioData?.personalDetails?.fullname || 'Unknown'}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.Statusbutton}>
        <Text style={styles.StatusbuttonText}>
          {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'Unknown'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderInterestReceivedItem = ({ item }) => {
    const matchedBiodata = getAllBiodata?.allBiodata?.find(bio => bio.user._id === item.FromUserBioData?.userId);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('IntrestReceivedProfilePage', {
            userId: item.FromUserBioData?.userId,
            biodata: matchedBiodata,
            requestId: item.requestId,
          })
        }
      >
        <View style={styles.leftContent}>
          <Image
            source={{ uri: item.FromUserBioData?.personalDetails?.closeUpPhoto || profileImage }}
            style={styles.dpImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.userId} numberOfLines={1} ellipsizeMode="tail">
              {item.FromUserBioData?.userId || 'Unknown'}
            </Text>
            <Text style={styles.name}>
              {item.FromUserBioData?.personalDetails?.fullname || 'Unknown'}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.Statusbutton}>
          <Text style={styles.StatusbuttonText}>
            {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'Unknown'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

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
            <TouchableOpacity
              style={[styles.button, activeButton === 1 ? styles.activeButton : styles.inactiveButton]}
              onPress={() => setActiveButton(1)}
            >
              <Text style={activeButton === 1 ? styles.activeText : styles.inactiveText}>
                Interest Sent
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, activeButton === 2 ? styles.activeButton : styles.inactiveButton]}
              onPress={() => setActiveButton(2)}
            >
              <Text style={activeButton === 2 ? styles.activeText : styles.inactiveText}>
                Interest Received
              </Text>
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.theme_color} style={{ marginTop: 20 }} />
          ) : (
            <>
              {activeButton === 1 && (interestSentData.length > 0 ? (
                <FlatList
                  data={interestSentData}
                  renderItem={renderInterestSentItem}
                  keyExtractor={(item) => item.requestId}
                  scrollEnabled={false}
                />
              ) : (
                <Text style={styles.noDataText}>No interests sent</Text>
              ))}

              {activeButton === 2 && (interestReceivedData.length > 0 ? (
                <FlatList
                  data={interestReceivedData}
                  renderItem={renderInterestReceivedItem}
                  keyExtractor={(item) => item.requestId}
                  scrollEnabled={false}
                />
              ) : (
                <Text style={styles.noDataText}>No interests received</Text>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IntrestedProfile;
