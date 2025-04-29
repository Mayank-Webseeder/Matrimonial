import { Text, View, TouchableOpacity, Image, FlatList, SafeAreaView, StatusBar, RefreshControl } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../StyleScreens/SuccessStoriesStyle';
import Globalstyles from '../../utils/GlobalCss';
import { DrawerActions } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { SUCESS_STORIES, MY_SUCCESS_STORY } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { SH, SW, SF } from '../../utils/Dimensions';
import ImageViewing from 'react-native-image-viewing';

const SuccessStories = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [stories, setStories] = useState([]);
  const notifications = useSelector((state) => state.GetAllNotification.AllNotification);
  const notificationCount = notifications ? notifications.length : 0;
  const [viewerVisible, setViewerVisible] = useState(false);
  const [currentImg, setCurrentImg] = useState(null);
  const [myStory, setMyStory] = useState(null);
  const [loadingMyStory, setLoadingMyStory] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchSuccessStories();
      fetchMySuccessStory();
    }, [])
  );

  const fetchSuccessStories = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      const res = await axios.get(SUCESS_STORIES, { headers });
      console.log("sucess story data ", JSON.stringify(res.data.data))
      setStories(res.data.data);
    } catch (error) {
      console.error("Error fetching success stories:", error.response ? error.response.data : error.message);
    }
  };

  const fetchMySuccessStory = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(MY_SUCCESS_STORY, { headers });

      if (res.data.data && res.data.data.length > 0) {
        setMyStory(res.data.data[0]);
      } else {
        setMyStory(null);
      }
    } catch (err) {
      console.log(
        'Error fetching my success story:',
        err.response ? err.response.data : err.message
      );
      setMyStory(null);
    } finally {
      setLoadingMyStory(false);
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

  const renderItem = ({ item }) => {
    const groom = item.groomDetails || {};

    const bride = item.brideDetails || {};
    return (
      <View style={styles.storyCard}>
        <View style={styles.collabHeader}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MatrimonyPeopleProfile', { userId: groom.userId })
            }
          >
            <Image
              source={{ uri: groom.profileImage || require('../../Images/NoImage.png') }}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginLeft: -SW(20) }}
            onPress={() =>
              navigation.navigate('MatrimonyPeopleProfile', { userId: bride.userId })
            }
          >
            <Image
              source={{ uri: bride.profileImage || require('../../Images/NoImage.png') }}
              style={styles.avatar}
            />
            <View style={styles.collabIcon}>
              <FontAwesome name="handshake-o" size={12} color={Colors.theme_color} />
            </View>
          </TouchableOpacity>

          <View style={{ marginLeft: SW(8) }}>
            <View style={{ flexDirection: 'row', marginLeft: SW(8) }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MatrimonyPeopleProfile', { userId: groom.userId })
                }
              >
                <Text style={styles.nameText}>{groom.name || NA}</Text>
              </TouchableOpacity>

              <Text style={styles.nameText}> & </Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MatrimonyPeopleProfile', { userId: bride.userId })
                }
              >
                <Text style={styles.nameText}>{bride.name || 'NA'}</Text>
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: SF(10), color: '#888', marginLeft: SW(9) }}>
              {groom.bioDataId || 'NA'} · {bride.bioDataId || 'NA'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setCurrentImg(item.photoUrl);
            setViewerVisible(true);
          }}
        >
          <Image
            source={{ uri: item.photoUrl }}
            style={{ width: '100%', aspectRatio: 1 }}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <ImageViewing
          images={currentImg ? [{ uri: currentImg }] : []}
          imageIndex={0}
          visible={viewerVisible}
          onRequestClose={() => setViewerVisible(false)}
        />

        <Text style={styles.storyName}>
          {item.groomName || 'NA'} ❤️ {item.brideName || 'NA'}
        </Text>

        <Text style={styles.thought}>{item.thought}</Text>

        <View style={styles.ratingRow}>{renderStars(item.rating)}</View>
      </View>

    );
  };




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
          <TouchableOpacity onPress={() => navigation.navigate('PostSuccessStories')}>
            <Text style={styles.postText}>Post</Text>
          </TouchableOpacity>
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

      {!loadingMyStory && myStory && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MySuccessStory', { story: myStory })
          }
        >
          <Text style={[styles.postText, { alignSelf: "flex-end" }]}>View Your Story</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={stories}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.noDataContainer}>
            <FontAwesome
              name="heart"
              size={60}
              color={Colors.theme_color}
              style={{ marginBottom: SH(10) }}
            />
            <Text style={[styles.noDataText, { fontFamily: "POppins-Bold", fontSize: SF(16) }]}>
              No success stories yet
            </Text>
            <Text style={{
              color: 'gray',
              textAlign: 'center',
              marginTop: SH(5),
              paddingHorizontal: SW(20),
              fontFamily: "POppins-Medium"
            }}>
              Once couples share their stories, they will be displayed here to inspire others.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};


export default SuccessStories;