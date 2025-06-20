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
import { SH, SW } from '../../utils/Dimensions';
import ImageViewing from 'react-native-image-viewing';

const ViewPost = ({ navigation, route }) => {
  const { post } = route.params || {};
  const MyActivistProfile = useSelector((state) => state.activist.activist_data);
  const isLiked = post?.isLiked;
  console.log("post", JSON.stringify(post));
  const author = post?.activistDetails || {};

  // ✅ Get images from API response correctly
  const images = post?.images || [];


  const [viewerVisible, setViewerVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openImageViewer = (index) => {
    setCurrentIndex(index);
    setViewerVisible(true);
  };


  const formatDateTime = (createdAt) => {
    return moment(createdAt).format('MMM D [at] hh:mm A');
  };


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
                  <Text style={styles.hour}>{author?.activistId}</Text>
                </Text>
                <Text style={styles.date_time}>{formatDateTime(post.createdAt)}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.postDescriptionText}>
            {post?.description}
          </Text>
          {images.length > 0 &&
            images.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => openImageViewer(index)}>
                <Image
                  source={{ uri: image }}
                  style={{
                    width: "100%",
                    height: SH(400),
                    borderRadius: 10,
                    marginBottom: SH(10),
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}

          <ImageViewing
            images={images.map((img) => ({ uri: img }))}
            imageIndex={currentIndex}
            visible={viewerVisible}
            onRequestClose={() => setViewerVisible(false)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewPost;
