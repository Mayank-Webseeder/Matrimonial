import { Text, View, TouchableOpacity, FlatList, Image, Alert, ScrollView, SafeAreaView, StatusBar, TextInput, ActivityIndicator, RefreshControl, Linking, BackHandler, Share, Modal } from 'react-native';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import styles from '../StyleScreens/EventNewsStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';
import { SW, SH, SF } from '../../utils/Dimensions';
import Globalstyles from '../../utils/GlobalCss';
import { GET_ALL_EVENT_NEWS, LIKEPOST, COMMENTPOST, VIEW_EVENT, BASE_URL, BOTTOM_EVENT_NEWS_ADVERDISE_WINDOW, DeepLink } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showMessage } from 'react-native-flash-message';
import AppIntroSlider from 'react-native-app-intro-slider';
import { CommonActions } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';


const EventNews = ({ navigation }) => {
  const route = useRoute();
  const { postId } = route.params || {};
  const sheetRef = useRef(null);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slider, setSlider] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [eventdata, setEventData] = useState([]);
  const [likeData, setLikeData] = useState({});
  const [commentData, setCommentData] = useState({});
  const [myComment, setMyComment] = useState("");
  const MyActivistProfile = useSelector((state) => state.activist.activist_data);
  const [page, setPage] = useState(1);
  const postsPerPage = 10;
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [myeventpost, setMyeventpost] = useState([]);
  const ProfileData = useSelector((state) => state.profile);
  const profileData = ProfileData?.profiledata || {};
  const myprofile_id = profileData?._id || null;
  const [LikeLoading, setLikeLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [eventList, setEventList] = useState([]);
  const notifications = useSelector((state) => state.GetAllNotification.AllNotification);
  const notificationCount = notifications ? notifications.length : 0;

  const [modalVisible, setModalVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [formattedImages, setFormattedImages] = useState([]);

  useEffect(() => {
    console.log("myprofile_id", myprofile_id);
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchPostData();
      GetEventNews();
      setPage(1);
    }, 2000);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'MainApp' }],
          })
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const handlePress = async () => {
    if (MyActivistProfile && MyActivistProfile._id) {
      navigation.navigate("CreatePost");
    } else {
      showMessage({
        type: "info",
        message: "You are not an activist!",
        description: "Create an activist profile if you want to upload Event News.",
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  };

  const shareProfile = async (profileId) => {
    const profileType = "event-news";
    console.log("profileId:", profileId);

    try {
      if (!profileId) throw new Error("Missing profile ID");

      const directLink = `${DeepLink}/${profileType}/${profileId}`;

      await Share.share({
        message: `Check this profile in Brahmin Milan app:\n${directLink}`
      });
    } catch (error) {
      console.error("Sharing failed:", error?.message || error);
    }
  };

  const GetTimeAgo = (date) => {
    const eventTime = moment(date);
    const currentTime = moment();
    const diffInMinutes = currentTime.diff(eventTime, 'minutes');
    const diffInHours = currentTime.diff(eventTime, 'hours');

    if (diffInMinutes < 0) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours >= 24) {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    } else {
      return `${diffInHours} hours ago`;
    }
  };


  const formatDateTime = (createdAt) => {
    return moment(createdAt).format('MMM D [at] hh:mm A');
  };


  useFocusEffect(
    useCallback(() => {
      fetchPostData();
      GetEventNews();
      Advertisement_window();
      setPage(1);
    }, [])
  );


  useEffect(() => {
    fetchPostData();
    Advertisement_window();
  }, []);


  useEffect(() => {
    if (slider.length === 0) return;

    const currentSlide = slider[currentIndex];
    const durationInSeconds = currentSlide?.duration || 4;
    const bufferMs = 800;
    const durationInMilliseconds = durationInSeconds * 1000 + bufferMs;
    console.log("durationInSeconds", durationInSeconds);
    const timeout = setTimeout(() => {
      const nextIndex = currentIndex < slider.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(nextIndex);
      sliderRef.current?.goToSlide(nextIndex);
    }, durationInMilliseconds);

    return () => clearTimeout(timeout);
  }, [currentIndex, slider]);

  const Advertisement_window = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(BOTTOM_EVENT_NEWS_ADVERDISE_WINDOW, { headers });

      if (response.data) {
        const fetchedData = response.data.data;
        console.log("event news fetchedData", JSON.stringify(fetchedData));

        const fullSliderData = fetchedData.flatMap((item) =>
          item.media.map((mediaItem) => ({
            id: `${item._id}_${mediaItem._id}`,
            title: item.title,
            description: item.description,
            image: `https://api-matrimonial.webseeder.tech/${mediaItem.mediaUrl}`,
            resolution: mediaItem.resolution,
            hyperlink: mediaItem.hyperlink,
            duration: Number(mediaItem.duration) || 4,
          }))
        );

        setSlider(fullSliderData);
        console.log("Slider Data:", fullSliderData);
      } else {
        setSlider([]);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching advertisement:", errorMsg);

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

  const LIKE = async (postId) => {
    try {
      setLikeLoading(true);
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(LIKEPOST, { postId }, { headers });

      if (!(response.status === 200 || response.data.status === true)) {
        throw new Error(response.data.message || "Failed to like event.");
      }

      console.log("liked data", JSON.stringify(response.data));

      const { isLiked } = response.data.event;
      const { likesCount } = response.data;
      console.log("isLiked", isLiked, "likesCount", likesCount);

      setLikeData((prev) => ({
        ...prev,
        [postId]: {
          isLiked,
          likesCount,
        },
      }));

    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;

      console.error("Error liking post:", errorMsg);
      showMessage({
        type: "error",
        message: "Error",
        description: errorMsg || "Failed to like event.",
      });

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
    } finally {
      setLikeLoading(false);
    }
  };

  const COMMENT = async (postId) => {
    try {
      setCommentLoading(true);
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const payload = {
        postId: postId,
        comment: myComment,
      };

      const response = await axios.post(COMMENTPOST, payload, { headers });

      if (response.status === 200 && response.data.status === true) {
        const fetchedData = response.data;
        console.log("Updated comments:", JSON.stringify(fetchedData.event.comments));

        // Set the comments data to state after successful comment addition
        const fetchedComments = response.data.event.comments;
        setCommentData(fetchedComments);
        setMyComment(""); // Clear the comment input field

        setEventList((prevList) =>
          prevList.map((post) =>
            post._id === postId
              ? { ...post, comments: fetchedComments } // replace with updated comments array
              : post
          )
        );
        showMessage({
          type: "success",
          message: "Success",
          description: fetchedData.message || "Comment added successfully!",
          duration: 3000
        });
      } else if (response.status === 400) {
        throw new Error(response.data.message || "Invalid request.");
      }

    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error adding comment:", errorMsg);

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
      showMessage({
        type: "error",
        message: "Error",
        description: errorMsg || "Failed to add comment. Please try again!",
      });
    } finally {
      setCommentLoading(false);
    }
  };

  const DELETE_COMMENT = async (postId, commentId) => {
    console.log("postId", postId, "commentId", commentId);
    try {
      setDeletingCommentId(commentId);

      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(
        `${BASE_URL}/event/${postId}/delete-comment/${commentId}`,
        { headers }
      );

      if (response.data) {
        setCommentData((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );

        setEventList((prevList) =>
          prevList.map((post) =>
            post._id === postId
              ? { ...post, comments: post.comments.filter((comment) => comment._id !== commentId) }
              : post
          )
        );

        showMessage({
          type: "success",
          message: "Success",
          description: "Comment deleted successfully!",
          icon: "success",
        });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error deleting comment::", errorMsg);

      showMessage({
        type: "danger",
        message: "Error",
        description:
          error?.response?.data?.message ||
          "Failed to delete comment. Please try again!",
        icon: "danger",
      });

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
    } finally {
      setDeletingCommentId(null);
    }
  };


  const fetchPostData = async () => {
    try {
      setMyeventpost([]);
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(VIEW_EVENT, { headers });

      if (response.status === 200 && response.data.status === true) {
        const postData = response.data.data.eventPosts;
        console.log("myeventpost", JSON.stringify(postData));
        setMyeventpost(postData);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching post data", errorMsg);

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

  const GetEventNews = async () => {
    try {
      setEventData([])
      setIsLoading(true)
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(GET_ALL_EVENT_NEWS, { headers });
      if (response.data.data) {
        const fetchedData = response.data?.data;
        console.log("My event news data", JSON.stringify(fetchedData));
        setEventData(fetchedData);
        setIsLoading(false)
      } else {
        setEventData([]);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching event news:", errorMsg);

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
    finally {
      setIsLoading(false)
    }
  };

  const getPostsForPage = () => {
    if (!Array.isArray(eventdata)) {
      console.error("eventdata is not an array:", eventdata);
      return []; // Return an empty array to prevent crashes
    }
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return eventdata.slice(startIndex, endIndex);
  };


  const loadNextPage = () => {
    if (!Array.isArray(eventdata) || eventdata.length === 0) {
      Alert.alert('No event data available');
      return;
    }

    if ((page * postsPerPage) < eventdata.length) {
      setPage(page + 1);
    } else {
      Alert.alert('No more posts available', '', [
        {
          text: 'OK',
          onPress: () => setPage(1),
        },
      ]);
    }
  };

  const openBottomSheet = (postId, comments) => {
    console.log("commentData", commentData);
    console.log("postId", postId);
    setSelectedPostId(postId);
    setCommentData(comments);
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };

  const closeBottomSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
    navigation.navigate("MainApp", {
      screen: "Tabs",
      params: { screen: "EventNews" },
    });

  }

  const renderImages = (images, item) => {
    if (images.length === 0) return null;

    const openImageViewer = (index) => {
      console.log("📷 Opening viewer for images:", images);
      console.log("👉 Opening at index:", index);

      const cleanImages = images
        .filter(img => typeof img === 'string' && img.startsWith('http'))
        .map(uri => ({ url: uri }));

      console.log("✅ Formatted for ImageViewer:", cleanImages);

      setImageIndex(index);
      setFormattedImages(cleanImages);
      setModalVisible(true);
    };

    if (images.length === 1) {
      return (
        <TouchableOpacity onPress={() => openImageViewer(0)}>
          <Image source={{ uri: images[0] }} style={[styles.image1, { width: '100%', height: SH(250) }]} />
        </TouchableOpacity>
      );
    }

    if (images.length === 2) {
      return (
        <View style={{ flexDirection: 'row' }}>
          {images.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => openImageViewer(index)}>
              <Image source={{ uri: image }} style={[styles.image1, { flex: 1, margin: SW(2) }]} />
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    if (images.length === 3) {
      return (
        <View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => openImageViewer(0)}>
              <Image source={{ uri: images[0] }} style={[styles.image2, { flex: 1, margin: SW(2) }]} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            {images.slice(1).map((image, index) => (
              <TouchableOpacity key={index} onPress={() => openImageViewer(index + 1)}>
                <Image source={{ uri: image }} style={[styles.image1, { flex: 1, margin: SW(2) }]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }

    if (images.length >= 4) {
      return (
        <View>
          <View style={{ flexDirection: 'row' }}>
            {images.slice(0, 2).map((image, index) => (
              <TouchableOpacity key={index} onPress={() => openImageViewer(index)}>
                <Image source={{ uri: image }} style={[styles.image1, { flex: 1, margin: SW(1) }]} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flexDirection: 'row' }}>
            {images.slice(2, 4).map((image, index) => (
              <TouchableOpacity key={index} onPress={() => openImageViewer(index + 2)}>
                <Image source={{ uri: image }} style={[styles.image1, { flex: 1, margin: SW(1) }]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }
  };


  const renderItem = ({ item }) => {
    const likeInfo = likeData[item._id] || {
      isLiked: item.isLiked,
      likesCount: item.likes?.length || 0,
    };
    console.log("likeInfo", likeInfo);
    const images = item.images || [];

    return (
      <View style={styles.card}>
        <View style={styles.cardheader}>
          <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Image source={{ uri: item?.activistDetails?.profilePhoto }} style={styles.EventheaderImage} />
            </View>
            <View>
              <Text style={styles.name}>
                {item.activistName} <Text style={styles.hour}>{item?.activistDetails?.activistId}</Text>
              </Text>
              <Text style={styles.date_time}>{formatDateTime(item.createdAt)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.Imagecontainer}>{renderImages(images, item)}</View>

        <Text style={styles.captionText}>{item.description}</Text>

        <View style={styles.likeShareComment}>
          <TouchableOpacity
            style={styles.likeShare}
            onPress={() => LIKE(item._id)}
          >
            <AntDesign
              name={likeInfo.isLiked ? "heart" : "hearto"}
              size={20}
              color={likeInfo.isLiked ? "red" : Colors.dark}
            />
            <Text style={styles.shareText}>
              {likeInfo.likesCount} Likes
            </Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.likeShare} onPress={() => openBottomSheet(item._id, item.comments)}>
            <FontAwesome5 name="comment" size={20} color="black" />
            <Text style={styles.shareText}>{item.comments.length} Comments</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.likeShare} onPress={() => shareProfile(item._id)}>
            <Feather name="send" size={20} color={Colors.dark} />
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </View>
        <RBSheet
          ref={sheetRef}
          height={400}
          openDuration={250}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            container: styles.bottomSheet,
            draggableIcon: { backgroundColor: "#000" }
          }}
        >
          <View style={styles.bottomSheetContent}>
            <View style={styles.headerContainer}>
              <Text style={styles.sheetHeader}>Comments</Text>
              <TouchableOpacity onPress={closeBottomSheet}>
                <Entypo name={'cross'} color={Colors.dark} size={30} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={Array.isArray(commentData) ? commentData : []}
              keyExtractor={(item, index) => item?._id || index.toString()}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No Comments Posted Yet</Text>
                </View>
              }
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.commentRow}>
                  <Image
                    source={
                      item?.user?.photoUrl?.length > 0
                        ? { uri: item.user.photoUrl[0] }
                        : require('../../Images/NoImage.png')
                    }
                    style={styles.profileImage}
                  />

                  <View style={styles.commentDetails}>
                    <View style={styles.nameTimeRow}>
                      <Text style={styles.userName}>{item?.user?.username || "Unknown"}</Text>
                      <Text style={styles.commentTime}>{GetTimeAgo(item?.date)}</Text>
                    </View>
                    <Text style={styles.commentText}>{item?.comment}</Text>
                  </View>

                  {item?.user?._id === myprofile_id && (
                    <TouchableOpacity
                      onPress={() => DELETE_COMMENT(selectedPostId, item?._id)}
                      disabled={deletingCommentId === item?._id}
                    >
                      {deletingCommentId === item?._id ? (
                        <Text style={{ color: Colors.theme_color, fontSize: SF(13), fontFamily: "Poppins-Regular" }}>
                          Deleting...
                        </Text>
                      ) : (
                        <Entypo name={"cross"} color={Colors.theme_color} size={17} />
                      )}
                    </TouchableOpacity>
                  )}

                </View>
              )}
              contentContainerStyle={{ paddingBottom: SH(60) }}
            />
            <View style={styles.fixedCommentInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Write a comment..."
                value={myComment}
                onChangeText={setMyComment}
                placeholderTextColor={Colors.gray}
              />
              <TouchableOpacity
                style={styles.postButton}
                onPress={() => COMMENT(selectedPostId)}
                disabled={commentLoading || !Boolean(myComment.trim())}
              >
                <Text style={styles.postButtonText}>
                  {commentLoading ? "Posting..." : "Post"}
                </Text>
              </TouchableOpacity>


            </View>
          </View>
        </RBSheet>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <ImageViewer
              imageUrls={formattedImages}
              index={imageIndex}
              enableSwipeDown={true}
              enablePreload={true}
              onSwipeDown={() => setModalVisible(false)}
              onCancel={() => setModalVisible(false)}
              saveToLocalByLongPress={false}
              backgroundColor="rgba(0,0,0,0.95)"
              renderIndicator={(currentIndex, allSize) => (
                <View
                  style={{
                    position: "absolute",
                    top: SH(30),
                    alignSelf: "center",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    paddingHorizontal: SW(8),
                    borderRadius: 5,
                    paddingVertical: SH(8),
                    zIndex: 999
                  }}
                >
                  <Text style={{ color: "white", fontSize: SF(16), fontWeight: "bold" }}>
                    {currentIndex} / {allSize}
                  </Text>
                </View>
              )}
              renderImage={(props) => (
                <Image
                  {...props}
                  resizeMode="contain"
                  style={{ width: '100%', height: '100%' }}
                />
              )}
            />
          </View>
        </Modal>


      </View>
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
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'MainApp' }],
                })
              );
            }}
          >
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>News & Events</Text>
        </View>
        <View style={styles.righticons}>
          <TouchableOpacity
            style={[styles.button, !MyActivistProfile ? styles.disabledButton : null]}
            onPress={handlePress}
            disabled={!MyActivistProfile}
          >
            <Text style={styles.buttonText}>Post</Text>
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
      {myeventpost.length > 0 && (
        <TouchableOpacity
          style={[styles.button, { alignSelf: "flex-end", marginBottom: SH(2) }]}
          onPress={() => navigation.navigate('ViewMyEventPost', { events: myeventpost })}>
          <Text style={[styles.buttonText]}>Uploaded Events</Text>
        </TouchableOpacity>
      )}

      <ScrollView
        style={styles.bottomContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FlatList
          data={postId ? eventdata : getPostsForPage()}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name={'newspaper'}
                size={60}
                color={Colors.theme_color}
                style={{ marginBottom: SH(10) }}
              />
              <Text style={[styles.emptyText, { fontFamily: "POppins-Bold", fontSize: SF(16) }]}>
                No Event & News Posted Yet
              </Text>
              <Text style={{ color: 'gray', textAlign: 'center', marginTop: SH(5), paddingHorizontal: SW(20), fontFamily: "POppins-Medium" }}>
                Events or news uploaded by Activists will be shown here.
              </Text>
            </View>
          }
        />
        {getPostsForPage().length >= 10 && (
          <TouchableOpacity style={styles.loadMoreButton} onPress={loadNextPage}>
            <Text style={styles.loadMoreText}>Load More Posts</Text>
          </TouchableOpacity>
        )}

        <View style={[Globalstyles.bottomImage, { paddingBottom: SH(10) }]}>
          <AppIntroSlider
            ref={sliderRef}
            data={slider}
            renderItem={({ item }) => {
              const { width, height } = item.resolution;

              const handlePress = () => {
                if (item.hyperlink) {
                  Linking.openURL(item.hyperlink).catch(err =>
                    console.error("Failed to open URL:", err)
                  );
                }
              };

              return (
                <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: "100%", height: SH(180), resizeMode: 'contain' }}
                  />
                </TouchableOpacity>
              );
            }}
            showNextButton={false}
            showDoneButton={false}
            dotStyle={Globalstyles.dot}
            activeDotStyle={Globalstyles.activeDot}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default EventNews;
