import { Text, View, TouchableOpacity, FlatList, Image, Alert, ScrollView, SafeAreaView, StatusBar, Modal, TextInput } from 'react-native';
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
import Toast from 'react-native-toast-message';
import RBSheet from "react-native-raw-bottom-sheet";
import { DELETE_EVENT, COMMENTPOST, LIKEPOST } from '../../utils/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
const ViewMyEventPost = ({ navigation, route }) => {
  const sheetRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [modalData, setModalData] = useState(null);
  const { events } = route.params;
  const [commentData, setCommentData] = useState({});
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [page, setPage] = useState(1);
  const [IsLoading, setIsLoading] = useState(false);
  const MyActivistProfile = useSelector((state) => state.activist.activist_data);
  const postsPerPage = 3;
  const [myComment, setMyComment] = useState("");
  const [likeData, setLikeData] = useState({});
  const [LikeLoading, setLikeLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [deletecommentLoading, setdeletecommentLoading] = useState(false);
  const ProfileData = useSelector((state) => state.profile);
  const profileData = ProfileData?.profiledata || {};
  const myprofile_id = profileData?._id || null;

  const getTimeAgo = (createdAt) => {
    const eventTime = moment(createdAt);
    const currentTime = moment();
    const diffInHours = currentTime.diff(eventTime, 'hours');

    if (diffInHours >= 24) {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    } else {
      return `${diffInHours} hours ago`;
    }
  };

  const handleShare = async () => {
    Toast.show({
      type: "info",
      text1: "Info",
      text2: "Under development",
      position: "top",
    });
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
      setPage(1);
    }, [])
  );

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
      console.error("Error liking post:", error?.response?.data || error.message);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "Failed to like event. Please try again!",
        position: "top",
      });

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

        Toast.show({
          type: "success",
          text1: "Success",
          text2: fetchedData.message || "Comment added successfully!",
          position: "top",
          onHide: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "EventNews" }],
            });
          }
        });

      } else if (response.status === 400) {
        throw new Error(response.data.message || "Invalid request.");
      }

    } catch (error) {
      console.error("Error adding comment:", error?.response?.data || error.message);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "Failed to add comment. Please try again!",
        position: "top",
      });
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
        `https://api-matrimonial.webseeder.tech/api/v1/event/${postId}/delete-comment/${commentId}`,
        { headers }
      );

      if (response.data) {
        console.log("Updated comments:", JSON.stringify(response.data.comments));

        setCommentData((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Comment deleted successfully!",
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error deleting comment:", error?.response?.data || error.message);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "Failed to delete comment. Please try again!",
        position: "top",
      });
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
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Event post deleted successfully!",
          position: "top",
        });

        // ✅ Close modal if used
        setModalVisible(false);

        // ✅ Ensure navigation is available before using it
        if (navigation && navigation.navigate) {
          navigation.navigate("EventNews");
        } else {
          console.warn("⚠️ Navigation is not available");
        }

        return;
      }

      throw new Error(response.data.message || "Failed to delete event post.");
    } catch (error) {
      console.error("🚨 Error deleting event post:", error?.response?.data || error.message);

      let errorMessage = "Failed to delete event post. Please try again!";
      if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || "Bad request.";
      }

      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };




  const getPostsForPage = () => {
    if (!Array.isArray(events)) {
      console.error("eventdata is not an array:", events);
      return []; // Return an empty array to prevent crashes
    }
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return events.slice(startIndex, endIndex);
  };


  const loadNextPage = () => {
    if (!Array.isArray(events) || events.length === 0) {
      Alert.alert('No event data available');
      return;
    }

    if ((page * postsPerPage) < events.length) {
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
    navigation.reset({
      index: 0,
      routes: [{ name: "EventNews" }],
    });
  }

  const showModal = (event, item) => {
    event.stopPropagation(); // Stop event bubbling
    setModalData(item); // Set the correct event data
    setModalVisible(true);

    // Get button position
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
    // Ensure images are properly extracted from the array
    const images = item.images || []; // Use the 'images' array directly

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
                {item.activistName} <Text style={styles.hour}>{MyActivistProfile?.activistId}</Text>
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
                        await DELETE_EVENT_POST(item._id);
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


          <TouchableOpacity style={styles.likeShare} onPress={handleShare}>
            <Feather name="send" size={20} color={Colors.dark} />
            <Text style={styles.shareText}>250 Shares</Text>
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
                        <Text style={{ color: Colors.theme_color, fontSize: 12 }}>Deleting...</Text>
                      ) : (
                        <Entypo name={'cross'} color={Colors.theme_color} size={15} />
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
          data={getPostsForPage()}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />

        {getPostsForPage().length > 3 && (
          <TouchableOpacity style={styles.loadMoreButton} onPress={loadNextPage}>
            <Text style={styles.loadMoreText}>Load More Posts</Text>
          </TouchableOpacity>
        )}

        {/* <Image source={require('../../Images/EventImage.png')} style={styles.bannerImage} /> */}
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default ViewMyEventPost;
