import { Text, View, TouchableOpacity, FlatList, Image, Alert, ScrollView, SafeAreaView, StatusBar, TextInput, ToastAndroid, ActivityIndicator } from 'react-native';
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
import { GET_ALL_EVENT_NEWS, LIKEPOST, COMMENTPOST, VIEW_EVENT } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from 'react-native-vector-icons/Entypo';

const EventNews = ({ navigation }) => {
  const sheetRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [eventdata, setEventData] = useState([]);
  const [likeData, setLikeData] = useState(' ');
  const [commentData, setCommentData] = useState(' ');
  const [myComment, setMyComment] = useState("");
  const MyActivistProfile = useSelector((state) => state.activist.activist_data);
  const [page, setPage] = useState(1);
  const postsPerPage = 3;
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [myeventpost, setMyeventpost] = useState([]);
  const ProfileData = useSelector((state) => state.profile);
  const profileData = ProfileData?.profiledata || {};
  const myprofile_id = profileData?._id || null;

  useEffect(() => {
    console.log("myprofile_id", myprofile_id);
  }, [])

  const handlePress = () => {
    console.log("MyActivistProfile", MyActivistProfile);
    if (MyActivistProfile && MyActivistProfile._id) {
      ToastAndroid.show(
        "You can post event & news details!", 
        ToastAndroid.SHORT
      );
      navigation.navigate('CreatePost');
    } else {
      ToastAndroid.show(
        "Only activists can post events & news!", 
        ToastAndroid.SHORT
      );
    }
  };


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

  const LIKE = async (postId) => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const payload = { postId };

      const response = await axios.post(LIKEPOST, payload, { headers });

      if (response.data) {
        const { message, likesCount } = response.data;

        console.log("My event news data", JSON.stringify(response.data));

        // Update like count
        setLikeData(prevState => ({
          ...prevState,
          likesCount,
        }));

        ToastAndroid.show(`${message}`,ToastAndroid.SHORT)
        // Show proper toast message
        navigation.reset({
          index: 0,
          routes: [{ name: 'EventNews' }],
        });
      } else {
        setLikeData(prevState => ({
          ...prevState,
          likesCount: 0, // Fallback
        }));
      }
    } catch (error) {
      console.error("Error fetching event news:", error);
      ToastAndroid.show("Failed to like event. Please try again!",ToastAndroid.SHORT)
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchPostData = async () => {
        try {
          const token = await AsyncStorage.getItem('userToken');
          if (!token) throw new Error('No token found');

          const headers = { Authorization: `Bearer ${token}` };
          const response = await axios.get(VIEW_EVENT, { headers });

          if (response.status === 200) {
            const postData = response.data.data;
            console.log("myeventpost", postData);
            setMyeventpost(postData);
          }
        } catch (error) {
          console.error('Error fetching post data:', error);
        }
      };

      fetchPostData();
    }, []) // Empty dependency array to prevent multiple re-renders
  );


  const COMMENT = async (postId) => {
    try {
      setIsLoading(true);
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
  
      if (response.data) {
        const fetchedData = response.data;
        console.log("Updated comments:", JSON.stringify(fetchedData.comments));
  
        setMyComment(""); // Clear input field
  
        // Show success toast
        ToastAndroid.show(fetchedData.message || "Comment added successfully!", ToastAndroid.SHORT);
  
        navigation.reset({
          index: 0,
          routes: [{ name: "EventNews" }],
        });
      }
    } catch (error) {
      console.error("Error adding comment:", error?.response?.data || error.message);
  
      ToastAndroid.show(
        error?.response?.data?.message || "Failed to add comment. Please try again!",
        ToastAndroid.SHORT
      );
    } finally {
      setIsLoading(false);
    }
  };

  const DELETE_COMMENT = async (postId, commentId) => {
    console.log("postId", postId, "commentId", commentId);
    try {
      setIsLoading(true);
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

        ToastAndroid.show("Comment deleted successfully!", ToastAndroid.SHORT);

        navigation.reset({
          index: 0,
          routes: [{ name: 'EventNews' }],
        });
      }
    } catch (error) {
      console.error("Error deleting comment:", error?.response?.data || error.message);

      ToastAndroid.show(
        error?.response?.data?.message || "Failed to delete comment. Please try again!",
        ToastAndroid.LONG
      );
    } finally {
      setIsLoading(false);
    }
  };

  const GetEventNews = async () => {
    try {
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
      console.error("Error fetching event news :", error);
    }
    finally {
      setIsLoading(false)
    }
  };

  useFocusEffect(
    useCallback(() => {
      GetEventNews();
    }, [])
  )

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


  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error('No token found');

        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(VIEW_EVENT, { headers });

        if (response.status === 200) {
          const postData = response.data.data[0];
          console.log("postData", postData);
          // setEventData(postData)
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, []);

  const handleShare = async () => {
    ToastAndroid.show("Under development", ToastAndroid.SHORT);
  };

  const openBottomSheet = (postId, comments) => {
    console.log("commentData", commentData);
    console.log("postId", postId);
    setSelectedPostId(postId); // Set the selected post ID
    setCommentData(comments); // Set comments for that specific post
    if (sheetRef.current) {
      sheetRef.current.open(); // Open bottom sheet
    }
  };

  const closeBottomSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  }

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
              {images.length > 0 && (
                <Image source={{ uri: images[0] }} style={styles.EventheaderImage} />
              )}
            </View>
            <View>
              <Text style={styles.name}>
                {item.activistName} <Text style={styles.hour}>{getTimeAgo(item.createdAt)}</Text>
              </Text>
              <Text style={styles.date_time}>{formatDateTime(item.createdAt)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.Imagecontainer}>{renderImages(images, item)}</View>

        <Text style={styles.captionText}>{item.description}</Text>

        <View style={styles.likeShareComment}>
          <TouchableOpacity style={styles.likeShare} onPress={() => LIKE(item._id)}>
            <AntDesign name={isLiked ? "heart" : "hearto"} size={20} color={isLiked ? "red" : Colors.dark} />
            <Text style={styles.shareText}>{item.likes.length} Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.likeShare} onPress={() => openBottomSheet(item._id, item.comments)} >
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SH(10) }}>
              <Text style={styles.sheetHeader}>Comments</Text>
              <TouchableOpacity onPress={closeBottomSheet}>
                <Entypo name={'cross'} color={Colors.dark} size={30} />
              </TouchableOpacity>
            </View>
            {/* List of Comments */}
            <FlatList
              data={Array.isArray(commentData) ? commentData : []}
              keyExtractor={(item, index) => item?._id || index.toString()}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No Comments Posted Yet</Text>
                </View>
              }
              renderItem={({ item }) => (
                <View style={styles.commentContainer}>
                  <Text style={styles.commentText}>{item?.comment}</Text>
                  <Text style={styles.hour}>{GetTimeAgo(item?.date)}</Text>
                  {item?.user === myprofile_id && (
                    <TouchableOpacity onPress={() => DELETE_COMMENT(selectedPostId, item?._id)}>
                      <Entypo name={'cross'} color={Colors.theme_color} size={15} />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            />

            {/* Comment Input */}
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Write a comment..."
                value={myComment}
                onChangeText={setMyComment}
                placeholderTextColor={Colors.gray}
              />
              <TouchableOpacity
                style={styles.postButton}
                onPress={() => {
                  COMMENT(selectedPostId);
                  closeBottomSheet();
                }}
                disabled={!myComment.trim()}
              >
                <Text style={styles.postButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>

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
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
      {myeventpost.length > 0 && (
        <TouchableOpacity
          style={[styles.button, { alignSelf: "flex-end", marginBottom: SH(2) }]}
          onPress={() => navigation.navigate('ViewMyEventPost', { events: myeventpost })}>
          <Text style={[styles.buttonText]}>Uploaded Events</Text>
        </TouchableOpacity>
      )}

      <ScrollView style={styles.bottomContainer} showsVerticalScrollIndicator={false}>

        <FlatList
          data={getPostsForPage()}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No Event & News Posted Yet</Text>
            </View>
          }
        />

        {getPostsForPage().length > 3 && (
          <TouchableOpacity style={styles.loadMoreButton} onPress={loadNextPage}>
            <Text style={styles.loadMoreText}>Load More Posts</Text>
          </TouchableOpacity>
        )}


        {/* <Image source={require('../../Images/EventImage.png')} style={styles.bannerImage} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventNews;
