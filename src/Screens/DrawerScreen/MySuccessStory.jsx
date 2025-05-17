import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../StyleScreens/SuccessStoriesStyle';
import Globalstyles from '../../utils/GlobalCss';
import { DrawerActions, useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SH, SW, SF } from '../../utils/Dimensions';
import ImageViewing from 'react-native-image-viewing';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DELETE_SUCCESS_STORY, MY_SUCCESS_STORY } from '../../utils/BaseUrl';

const MySuccessStory = ({ navigation, route }) => {
  const [myStory, setMyStory] = useState(route.params?.story || null);
  const [loadingMyStory, setLoadingMyStory] = useState(!route.params?.story);

  const story = route.params?.story || myStory;

  const { groomDetails: groom = {}, brideDetails: bride = {} } = story || {};

   const notifications = useSelector(
    (state) => state.GetAllNotification.AllNotification
  );
  const notificationCount = notifications ? notifications.length : 0;

  const [viewerVisible, setViewerVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!route.params?.story) {
        fetchMySuccessStory();
      }
    }, [])
  );

  const fetchMySuccessStory = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const res = await axios.get(MY_SUCCESS_STORY, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.data && res.data.data.length > 0) {
        setMyStory(res.data.data[0]);
      } else {
        setMyStory(null);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;

      const sessionExpiredMessages = [
        "User does not Exist....!Please login again",
        "Invalid token. Please login again",
        "Token has expired. Please login again"
      ];

      if (sessionExpiredMessages.includes(errorMsg)) {
        await AsyncStorage.removeItem("userToken");
        navigation.reset({
          index: 0,
          routes: [{ name: "AuthStack" }],
        });
      }
      setMyStory(null);
    } finally {
      setLoadingMyStory(false);
    }
  };

  if (loadingMyStory) {
    return (
      <SafeAreaView style={Globalstyles.container}>
        <Text style={{ textAlign: 'center', marginTop: 100 }}>Loading your story...</Text>
      </SafeAreaView>
    );
  }

  if (!story) {
    return (
      <SafeAreaView style={Globalstyles.container}>
        <Text style={{ textAlign: 'center', marginTop: 100 }}>No success story found.</Text>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Story',
      'Are you sure you want to delete this success story?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('userToken');
              if (!token) throw new Error('No token');

              const url = `${DELETE_SUCCESS_STORY}/${story._id}`;

              await axios.delete(url, {
                headers: { Authorization: `Bearer ${token}` },
              });

              Alert.alert('Deleted', 'Your story was removed.');
              navigation.goBack();
            } catch (error) {
              const errorMsg = error.response?.data?.message || error.message;
              console.error("Error fetching biodata:", errorMsg);

              const sessionExpiredMessages = [
                "User does not Exist....!Please login again",
                "Invalid token. Please login again",
                "Token has expired. Please login again"
              ];

              if (sessionExpiredMessages.includes(errorMsg)) {
                await AsyncStorage.removeItem("userToken");
                navigation.reset({
                  index: 0,
                  routes: [{ name: "AuthStack" }],
                });
              }
              Alert.alert('Error', 'Could not delete. Try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <MaterialIcons
              name="arrow-back-ios-new"
              size={25}
              color={Colors.theme_color}
            />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Your Story</Text>
        </View>

        <View style={styles.righticons}>
          <TouchableOpacity
            style={{ marginRight: SW(12) }}
            onPress={handleDelete}
          >
            <AntDesign name="delete" size={24} color={Colors.theme_color} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: 'relative' }}
            onPress={() => navigation.navigate('Notification')}
          >
            <AntDesign name="bells" size={25} color={Colors.theme_color} />
            {notificationCount > 0 && (
              <View
                style={{
                  position: 'absolute',
                  right: -5,
                  top: -5,
                  width: SW(16),
                  height: SW(16),
                  borderRadius: SW(8),
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: SF(9),
                    fontFamily: 'Poppins-Bold',
                  }}
                >
                  {notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.storyCard}>
        <View style={styles.collabHeader}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MatrimonyPeopleProfile', { userId: groom.userId })
            }
          >
            <Image source={{ uri: groom?.profileImage }} style={styles.avatar} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginLeft: -SW(20) }}
            onPress={() =>
              navigation.navigate('MatrimonyPeopleProfile', { userId: bride?.userId })
            }
          >
            <Image source={{ uri: bride?.profileImage }} style={styles.avatar} />
            <View style={styles.collabIcon}>
              <FontAwesome
                name="handshake-o"
                size={12}
                color={Colors.theme_color}
              />
            </View>
          </TouchableOpacity>

          <View style={{ marginLeft: SW(8) }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MatrimonyPeopleProfile', { userId: groom.userId })
                }
              >
                <Text style={styles.nameText}>{groom?.name}</Text>
              </TouchableOpacity>
              <Text style={styles.nameText}> & </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MatrimonyPeopleProfile', { userId: bride?.userId })
                }
              >
                <Text style={styles.nameText}>{bride?.name}</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: SF(10), color: '#888' }}>
              {groom?.bioDataId} · {bride?.bioDataId}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setViewerVisible(true)}
        >
          <Image
            source={{ uri: story.photoUrl }}
            style={{ width: '100%', aspectRatio: 1 }}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <ImageViewing
          images={[{ uri: story?.photoUrl }]}
          visible={viewerVisible}
          onRequestClose={() => setViewerVisible(false)}
        />
        <Text style={styles.storyName}>
          {story?.groomName} ❤️ {story?.brideName}
        </Text>
        <View style={styles.ratingRow}>
          <Text style={styles.ratingText}>
            🌟 {story?.rating}/5 App Rating
          </Text>
          <Text style={styles.ratingQuote}>
            “ Brahmin Milan helped us find each other — <Text style={styles.thought}>{story?.thought}</Text>”
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MySuccessStory;
