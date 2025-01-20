import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../StyleScreens/ViewPostStyle';
import Globalstyles from '../../utils/GlobalCss';

const ViewPost = ({ navigation, route }) => {
  const { post } = route.params;
  const images = [post.image1, post.image2, post.image3, post.image4].filter(Boolean);

  const [imageAspectRatios, setImageAspectRatios] = useState([]);

  useEffect(() => {
    const fetchAspectRatios = async () => {
      const ratios = await Promise.all(
        images.map((image) => {
          return new Promise((resolve) => {
            Image.getSize(image, (width, height) => {
              resolve(width / height);
            });
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
          <Text style={Globalstyles.headerText}>{post.name}'s Post</Text>
        </View>
        <View style={styles.righticons}>
          <AntDesign name={'search1'} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} />
          <AntDesign
            name={'bells'}
            size={25}
            color={Colors.theme_color}
            onPress={() => navigation.navigate('Notification')}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}  >
        <View style={styles.postHeader}>
          <Image source={require('../../Images/user.png')} />
          <View style={styles.postTextContainer}>
            <Text style={styles.Text}>{post.name}</Text>
            <Text style={styles.Text}>{post.date_time}</Text>
          </View>
        </View>

        <Text style={styles.postDescriptionText}>
          {post.text}
        </Text>

        {images.length > 0 && (
          <View>
            {images.map((image, index) => (
              <View key={index} style={styles.card}>
                <View>
                  <Image
                    source={image}
                    style={[styles.image, { aspectRatio: imageAspectRatios[index] || 1 }]}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.likeShareComment}>
                  <View style={styles.likeShare}>
                    <AntDesign name="hearto" size={20} color={Colors.dark} />
                    <Text style={styles.shareText}>25k Likes</Text>
                  </View>
                  <View style={styles.likeShare}>
                    <EvilIcons name="comment" size={20} color={Colors.dark} />
                    <Text style={styles.shareText}>90 Comments</Text>
                  </View>
                  <View style={styles.likeShare}>
                    <Feather name="send" size={20} color={Colors.dark} />
                    <Text style={styles.shareText}>250 Shares</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewPost;
