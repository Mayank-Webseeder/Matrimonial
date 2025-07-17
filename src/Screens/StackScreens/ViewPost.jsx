import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity, SafeAreaView, StatusBar, BackHandler, Modal ,Dimensions } from 'react-native';
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../StyleScreens/ViewPostStyle';
import Globalstyles from '../../utils/GlobalCss';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';
import { SH } from '../../utils/Dimensions';
import { VIEW_LIKE_COMMENT_EVENTNEWS } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';

const { width: screenWidth } = Dimensions.get('window');
const imageHeight = SH(400);

const ViewPost = ({ navigation, route }) => {
  const { postId, id } = route.params || {};
  const final_id = postId || id;
  const [postData, setPostData] = useState(null);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openImageViewer = (index) => {
    setCurrentIndex(index);
    setViewerVisible(true);
  };

  const formatDateTime = (createdAt) => {
    return moment(createdAt).format('MMM D [at] hh:mm A');
  };

  useEffect(() => {
    getEventNewsData();
    // console.log("post",post)
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("MainApp", {
          screen: "Tabs",
          params: {
            screen: "EventNews",
          },
        });
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );




  const getEventNewsData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        showMessage({
          type: "danger",
          message: "Authentication Error",
          description: "No token found. Please log in again.",
          duration: 5000
        });

        navigation.reset({
          index: 0,
          routes: [{ name: "AuthStack" }],
        });
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${VIEW_LIKE_COMMENT_EVENTNEWS}/${final_id}`, { headers });


      if (response.status === 200 && response.data.status === true) {
        console.log("✅ Fetched Event Data:", response.data.data);
        setPostData(response.data.data);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("❌ Error fetching event post:", errorMsg);

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
    }
  };

  if (!postData) return null;

  const images = postData?.images || [];
  const author = postData?.activistDetails || {};

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("MainApp", {
            screen: "Tabs",
            params: {
              screen: "EventNews",
            },
          })}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>{postData?.activistName}'s Post</Text>
        </View>
        <View style={styles.righticons}>
          <AntDesign
            name={'bells'}
            size={25}
            color={Colors.theme_color}
            onPress={() => navigation.navigate('Notification')}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.postHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={author.profilePhoto ? { uri: author.profilePhoto } : require('../../Images/NoImage.png')}
                style={styles.EventheaderImage}
              />
              <View>
                <Text style={styles.name}>{author?.activistId}</Text>
                <Text style={styles.date_time}>{formatDateTime(postData?.createdAt)}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.postDescriptionText}>{postData?.description || "No description"}</Text>
<View style={{ flex: 1 }}>
  {images.length > 0 && (
    <ScrollView
      pagingEnabled
      showsVerticalScrollIndicator={false}
    >
      {images.map((img, index) => (
        <View
          key={index}
          style={{
            width: screenWidth,
            height: imageHeight,
            backgroundColor: 'white',
          }}
        >
          <ImageViewer
            imageUrls={[{ url: img }]}
            backgroundColor="transparent"
            enableSwipeDown={false}
            saveToLocalByLongPress={false}
            renderIndicator={() => null}
            enablePreload={true}
            renderImage={(props) => (
              <Image
                {...props}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                }}
              />
            )}
          />
        </View>
      ))}
    </ScrollView>
  )}
</View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewPost;
