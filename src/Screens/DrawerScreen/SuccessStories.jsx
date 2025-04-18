import { Text, View, TouchableOpacity, Image, FlatList, SafeAreaView, StatusBar, RefreshControl } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../StyleScreens/SuccessStoriesStyle';
import { SuccessStoriesData } from '../../DummyData/DummyData';
import Globalstyles from '../../utils/GlobalCss';
import { DrawerActions } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { SUCESS_STORIES } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { SH,SW,SF } from '../../utils/Dimensions';

const SuccessStories = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [stories, setStories] = useState([]);
  const notifications = useSelector((state) => state.GetAllNotification.AllNotification);
  const notificationCount = notifications ? notifications.length : 0;

  useFocusEffect(useCallback(() => {
    fetchSuccessStories();
  }, []));

  const fetchSuccessStories = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      const res = await axios.get(SUCESS_STORIES, { headers });
      setStories(res.data.data); // Store stories in state
    } catch (error) {
      console.error("Error fetching success stories:", error.response ? error.response.data : error.message);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSuccessStories().finally(() => setRefreshing(false));
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={'star'}
          size={20}
          color={'#FF9900'}
          style={{ marginHorizontal: 2 }}
        />
      );
    }
    return stars;
  };

  const renderItem = ({ item }) => (
    <View style={styles.storyCard}>
      <Image source={{ uri: item.photoUrl }} style={styles.storyImage} />
      <View style={styles.textContainer}>
        <Text style={styles.storyName}>{item.groomName} ❤️ {item.brideName}</Text>
        <Text style={styles.storyDescription}>{item.thought}</Text>
        <View style={styles.ratingContainer}>{renderStars(item.rating)}</View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Success Stories</Text>
        </View>
        <View style={styles.righticons}>
        <TouchableOpacity style={{ position: 'relative' }} onPress={() => navigation.navigate('Notification')}>
            <AntDesign
              name="bells"
              size={25}
              color={Colors.theme_color}
            />
            {notificationCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  right: -5,
                  top: -5,
                  width: SW(16),
                  height: SW(16),
                  borderRadius: SW(16) / 2,
                  backgroundColor: "red",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: 'white', fontSize: SF(9), fontFamily: "Poppins-Bold" }}>
                  {notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={stories}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};


export default SuccessStories;