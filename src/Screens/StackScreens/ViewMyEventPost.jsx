import { Text, View, TouchableOpacity, FlatList, Image, Alert, ScrollView, SafeAreaView, StatusBar, Modal, TextInput, RefreshControl, Share } from 'react-native';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import styles from '../StyleScreens/EventNewsStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SW, SH, SF } from '../../utils/Dimensions';
import Globalstyles from '../../utils/GlobalCss';
import moment from 'moment';
import RBSheet from "react-native-raw-bottom-sheet";
import { DELETE_EVENT, COMMENTPOST, LIKEPOST, BASE_URL, DeepLink } from '../../utils/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { CommonActions } from '@react-navigation/native';
import { VIEW_EVENT } from '../../utils/BaseUrl';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BackHandler } from 'react-native';

const ViewMyEventPost = ({ navigation, route }) => {
  const sheetRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [modalData, setModalData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [myeventpost, setMyeventpost] = useState([]);
  const events = route?.params?.events || myeventpost;
  const { id = null } = route?.params || {};
  const [commentData, setCommentData] = useState({});
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [IsLoading, setIsLoading] = useState(false);
  const MyActivistProfile = useSelector((state) => state.activist.activist_data);
  const [myComment, setMyComment] = useState("");
  const [likeData, setLikeData] = useState({});
  const [LikeLoading, setLikeLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [deletecommentLoading, setdeletecommentLoading] = useState(false);
  const ProfileData = useSelector((state) => state.profile);
  const profileData = ProfileData?.profiledata || {};
  const myprofile_id = profileData?._id || null;


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("MainApp", {
          screen: "Tabs",
          params: { screen: "EventNews" },
        });
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation])
  );


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchPostData();
    }, 2000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPostData();
    }, [])
  );

  useEffect(() => {
    fetchPostData();
  }, [])

  const fetchPostData = async () => {
    try {
      setMyeventpost([]);
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(VIEW_EVENT, { headers });

      if (response.status === 200 && response.data.status === true) {
        const postData = response.data.data.eventPosts;
        console.log("myeventpost", postData);
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

  const LIKE = async (postId, initialLikesCount) => {
    try {
      setLikeLoading(true);
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      setLikeData((prevState) => {
        const prevLikeData = prevState[postId] || {
          isLiked: false,
          likesCount: initialLikesCount
        };

        return {
          ...prevState,
          [postId]: {
            ...prevLikeData,
            isLiked: !prevLikeData.isLiked,
            likesCount: prevLikeData.isLiked
              ? prevLikeData.likesCount - 1
              : prevLikeData.likesCount + 1,
          },
        };
      });

      const response = await axios.post(LIKEPOST, { postId }, { headers });

      if (!(response.status === 200 && response.data.status === true)) {
        throw new Error(response.data.message || "Failed to like event.");
      }

    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error on doing like:", errorMsg);

      // Reverse the like state on error
      setLikeData((prevState) => {
        const prevLikeData = prevState[postId] || {
          isLiked: false,
          likesCount: initialLikesCount
        };

        return {
          ...prevState,
          [postId]: {
            ...prevLikeData,
            isLiked: !prevLikeData.isLiked,
            likesCount: prevLikeData.isLiked
              ? prevLikeData.likesCount + 1
              : prevLikeData.likesCount - 1,
          },
        };
      });

      showMessage({
        type: "danger",
        message: "Error",
        message: errorMsg || "Failed to like event. Please try again!",
        icon: "danger",
        duarion: 5000
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
        console.log("Updated comments:", JSON.stringify(fetchedData.comments));

        setMyComment("");

        showMessage({
          type: "success",
          message: "Success",
          message: fetchedData.message || "Comment added successfully!",
          duarion: 5000,
          // onHide: () => {
          //   navigation.navigate("MainApp", {
          //     screen: "Tabs",
          //     params: { screen: "EventNews" }
          //   });
          // }
        });

      } else if (response.status === 400) {
        throw new Error(response.data.message || "Invalid request.");
      }

    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error adding comment:", errorMsg);
      showMessage({
        type: "danger",
        message: errorMsg || "Failed to add comment. Please try again!",
        icon: "danger",
        duarion: 5000
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
      setCommentLoading(false);
    }
  };

  const DELETE_COMMENT = async (postId, commentId) => {
    console.log("postId", postId, "commentId", commentId);
    try {
      setdeletecommentLoading(true);
      const token = await AsyncStorage.getItem("userToken");

      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      console.log("headers", headers);

      const response = await axios.delete(
        `${BASE_URL}/event/${postId}/delete-comment/${commentId}`,
        { headers }
      );

      if (response.data) {
        console.log("Updated comments:", JSON.stringify(response.data.comments));

        setCommentData((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );

        showMessage({
          type: "success",
          message: "Success",
          message: "Comment deleted successfully!",
          position: "Bottom",
          duarion: 5000
        });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error deleting comment :", errorMsg);
      showMessage({
        type: "danger",
        message: "Error",
        message: errorMsg || "Failed to delete comment. Please try again!",
        icon: "danger",
        duarion: 5000
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
      setdeletecommentLoading(false);
    }
  };


  const DELETE_EVENT_POST = async (postId) => {
    console.log("🗑️ Deleting Post ID:", postId);

    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("userToken");

      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      console.log("🔹 Headers:", headers);

      const response = await axios.delete(`${DELETE_EVENT}/${postId}`, { headers });

      console.log("✅ Delete Response:", response.data);

      if (response.status === 200 && response.data.status === true) {
        showMessage({
          type: "success",
          message: "Success",
          message: "Event post deleted successfully!",
          icon: "success",
          duarion: 5000
        });

        // ✅ Close modal if used
        setModalVisible(false);

        // ✅ Ensure navigation is available before using it
        if (navigation && navigation.replace) {
          navigation.replace("ViewMyEventPost");
        } else {
          console.warn("⚠️ Navigation is not available");
        }

        return;
      }

      throw new Error(response.data.message || "Failed to delete event post.");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error deleting event:", errorMsg);
      showMessage({
        type: "danger",
        message: "Error",
        message: errorMsg,
        duarion: 5000
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
      setIsLoading(false);
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
      params: { screen: "EventNews" }
    });
  }

  const showModal = (event, item) => {
    event.stopPropagation();
    setModalData(item);
    setModalVisible(true);
    event.target.measure((fx, fy, width, height, px, py) => {
      setModalPosition({ top: py + height + 5, left: px - 130 });
    });
  };

  const renderImages = (images, item) => {
    if (images.length === 0) {
      return <Text style={styles.noImageText}>No images available for this post</Text>;
    }

    if (images.length === 1) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('ViewPost', { image: images[0], post: item })}
        >
          <Image source={{ uri: images[0] }} style={[styles.image1, { width: '100%', height: SH(250) }]} />
        </TouchableOpacity>
      );
    }

    if (images.length === 2) {
      return (
        <View style={{ flexDirection: 'row' }}>
          {images.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('ViewPost', { image, post: item })}>
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
            <TouchableOpacity onPress={() => navigation.navigate('ViewPost', { image: images[0], post: item })}>
              <Image source={{ uri: images[0] }} style={[styles.image2, { flex: 1, margin: SW(2) }]} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            {images.slice(1).map((image, index) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('ViewPost', { image, post: item })}>
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
              <TouchableOpacity key={index} onPress={() => navigation.navigate('ViewPost', { image, post: item })}>
                <Image source={{ uri: image }} style={[styles.image1, { flex: 1, margin: SW(1) }]} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flexDirection: 'row' }}>
            {images.slice(2, 4).map((image, index) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('ViewPost', { image, post: item })}>
                <Image source={{ uri: image }} style={[styles.image1, { flex: 1, margin: SW(1) }]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }
  };

  const renderItem = ({ item }) => {
    const isLiked = item.isLiked || null;
    const images = item.images || [];

    return (
      <View style={styles.card}>
        <View style={styles.cardheader}>
          <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Image source={{ uri: MyActivistProfile?.profilePhoto }} style={styles.EventheaderImage} />
            </View>
            <View>
              {/* <Text style={styles.name}>
                {item.activistName} <Text style={styles.hour}>{getTimeAgo(item.createdAt)}</Text>
              </Text> */}
              <Text style={styles.name}>
                {item.activistName} <Text style={styles.hour}>{MyActivistProfile?.activistName}</Text>
              </Text>
              <Text style={styles.date_time}>{formatDateTime(item.createdAt)}</Text>
            </View>
          </View>
          <View style={{ position: "relative" }}>
            {/* Three-dot button */}
            <TouchableOpacity onPress={(event) => showModal(event, item)}>
              <Entypo name="dots-three-vertical" size={20} color="black" />
            </TouchableOpacity>

            {/* Modal */}
            <Modal
              animationType="none"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                onPress={() => setModalVisible(false)}
              >
                <View
                  style={[
                    styles.modalContent,
                    { top: modalPosition.top, left: modalPosition.left },
                  ]}
                >
                  {/* Update Event */}
                  <TouchableOpacity
                    style={styles.modalOption}
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate("UpdateEventPost", { eventData: modalData });
                    }}
                  >
                    <Text style={styles.optionText}>Update Event</Text>
                  </TouchableOpacity>

                  {/* Delete Event */}
                  <TouchableOpacity
                    style={styles.modalOption}
                    onPress={async () => {
                      try {
                        await DELETE_EVENT_POST(modalData?._id);
                        setModalVisible(false);
                        console.log("Event Deleted: ", modalData?._id);
                      } catch (error) {
                        console.error("Error deleting event:", error);
                      }
                    }}

                  >
                    <Text style={[styles.optionText, { color: "red" }]}>
                      Delete Event
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>
          </View>

        </View>

        <View style={styles.Imagecontainer}>{renderImages(images, item)}</View>

        <Text style={styles.captionText}>{item.description}</Text>

        <View style={styles.likeShareComment}>
          <TouchableOpacity
            style={styles.likeShare}
            onPress={() => LIKE(item._id, item.likes.length)}
          >
            <AntDesign
              name={likeData[item._id]?.isLiked ? "heart" : "hearto"}
              size={20}
              color={likeData[item._id]?.isLiked ? "red" : Colors.dark}
            />
            <Text style={styles.shareText}>{likeData[item._id]?.likesCount ?? item.likes.length} Likes</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.likeShare} onPress={() => openBottomSheet(item._id, item.comments)}>
            <FontAwesome5 name="comment" size={20} color="black" />
            <Text style={styles.shareText}>{item.comments.length} Comments</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.likeShare} onPress={() => shareProfile(item._id || id)}>
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
                      disabled={deletecommentLoading}
                    >
                      {deletecommentLoading ? (
                        <Text style={{ color: Colors.theme_color, fontSize: SF(13), fontFamily: "Poppins-Regular" }}>Deleting...</Text>
                      ) : (
                        <Entypo name={'cross'} color={Colors.theme_color} size={17} />
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

      </View>
    );
  };


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
          <Text style={Globalstyles.headerText}>My News & Events</Text>
        </View>
        <View style={styles.righticons}>
          {/* <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity> */}
          <AntDesign
            name={'bells'}
            size={25}
            color={Colors.theme_color}
            onPress={() => {
              navigation.navigate('Notification');
            }}
          />
        </View>
      </View>
      <ScrollView style={styles.bottomContainer} showsVerticalScrollIndicator={false}>
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewMyEventPost;
