import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../StyleScreens/ViewPostStyle';
import Globalstyles from '../../utils/GlobalCss';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';

const ViewPost = ({ navigation, route }) => {
  const { post } = route.params || {};
  const MyActivistProfile = useSelector((state) => state.activist.activist_data);
  const isLiked = post?.isLiked;
  console.log("post", JSON.stringify(post));
  const author = post?.activistDetails || {};

  // ✅ Get images from API response correctly
  const images = post?.images || [];


  const formatDateTime = (createdAt) => {
    return moment(createdAt).format('MMM D [at] hh:mm A');
  };

  const [imageAspectRatios, setImageAspectRatios] = useState([]);

  const handleShare = async () => {
    showMessage({
      type: "info",
      message: "Under development",
      icon: "info",
      duarion: 5000
    });
  };

  useEffect(() => {
    const fetchAspectRatios = async () => {
      const ratios = await Promise.all(
        images.map((image) => {
          return new Promise((resolve) => {
            Image.getSize(image, (width, height) => {
              resolve(width / height);
            }, () => resolve(1)); // Handle errors gracefully
          });
        })
      );
      setImageAspectRatios(ratios);
    };

    if (images.length > 0) {
      fetchAspectRatios();
    }
  }, [images]);

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
          <Text style={Globalstyles.headerText}>{post.activistName}'s Post</Text>
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

      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.card}>
          <View style={styles.postHeader}>
            <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <Image
                  source={
                    author.profilePhoto
                      ? { uri: author.profilePhoto }
                      : require('../../Images/NoImage.png')
                  }
                  style={styles.EventheaderImage}
                />
              </View>
              <View>
                <Text style={styles.name}>
                  {author?.activistId} <Text style={styles.hour}>{author?.activistId}</Text>
                </Text>
                <Text style={styles.date_time}>{formatDateTime(post.createdAt)}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.postDescriptionText}>
            {post?.description}
          </Text>

          {images.length > 0 && (
            <View>
              {images.map((image, index) => (
                <View key={index} >
                  <View>
                    <Image
                      source={{ uri: image }}
                      style={[styles.image, { aspectRatio: imageAspectRatios[index] || 1 }]}
                      resizeMode="cover"
                    />
                  </View>
                  {/* <View style={styles.likeShareComment}>
                    <View style={styles.likeShare}>
                      <AntDesign name={isLiked ? "heart" : "hearto"} size={20} color={isLiked ? "red" : Colors.dark} />
                      <Text style={styles.shareText}>{post?.likes?.length} Likes</Text>
                    </View>
                    <View style={styles.likeShare}>
                      <EvilIcons name="comment" size={20} color={Colors.dark} />
                      <Text style={styles.shareText}>{post?.comments?.length} Comments</Text>
                    </View>
                    <TouchableOpacity style={styles.likeShare} onPress={handleShare}>
                      <Feather name="send" size={20} color={Colors.dark} />
                      <Text style={styles.shareText}>250 Shares</Text>
                    </TouchableOpacity>
                  </View> */}
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewPost;
