import { Text, View, TouchableOpacity, FlatList, Image, Alert, ScrollView, BackHandler, SafeAreaView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import styles from '../StyleScreens/EventNewsStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { EventData } from '../../DummyData/DummyData';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useFocusEffect } from '@react-navigation/native';
import { SW, SH, SF } from '../../utils/Dimensions';

const EventNews = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const postsPerPage = 3;

  const handlePress = () => {
    navigation.navigate('CreatePost')
  };

  const getPostsForPage = () => {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return EventData.slice(startIndex, endIndex);
  };

  const loadNextPage = () => {
    if ((page * postsPerPage) < EventData.length) {
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


  const handleBackPress = () => {
    const state = navigation.getState();
    const activeRoute = state.routes[state.index];

    if (activeRoute.name === 'EventNews') {

      if (state.history && state.history.some((h) => h.type === 'drawer')) {
        navigation.toggleDrawer();
      } else if (state.history && state.history.some((h) => h.type === 'tab')) {
        navigation.navigate('HomeTab');
      } else {
        navigation.goBack();
      }
      return true;
    }
    return false;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [navigation])
  );


  const renderImages = (images, item) => {
    if (images.length === 0) {
      return <Text style={styles.noImageText}>No images available for this post</Text>;
    }

    if (images.length === 1) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('ViewPost', { image: images[0], post: item })}
        >
          <Image
            source={images[0]}
            style={[styles.image1, { width: '100%', height: SH(250) }]}
          />
        </TouchableOpacity>
      );
    }

    if (images.length === 2) {
      return (
        <View style={{ flexDirection: 'row' }}>
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('ViewPost', { image, post: item })}
            >
              <Image
                source={image}
                style={[styles.image1, { flex: 1, margin: SW(2) }]}
              />
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    if (images.length === 3) {
      return (
        <View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ViewPost', { image: images[0], post: item })}
            >
              <Image
                source={images[0]}
                style={[styles.image2, { flex: 1, margin: SW(2) }]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            {images.slice(1).map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('ViewPost', { image, post: item })}
              >
                <Image
                  source={image}
                  style={[styles.image1, { flex: 1, margin: SW(2) }]}
                />
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
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('ViewPost', { image, post: item })}
              >
                <Image
                  source={image}
                  style={[styles.image1, { flex: 1, margin: SW(1) }]}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flexDirection: 'row' }}>
            {images.slice(2, 4).map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('ViewPost', { image, post: item })}
              >
                <Image
                  source={image}
                  style={[styles.image1, { flex: 1, margin: SW(1) }]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }
  };



  const renderItem = ({ item }) => {
    const images = [item.image1, item.image2, item.image3, item.image4].filter(Boolean);

    return (
      <View style={styles.card}>
        <View style={styles.cardheader}>
          <View>
            {images.length > 0 && <Image source={images[0]} style={styles.EventheaderImage} />}
          </View>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.date_time}>{item.date_time}</Text>
          </View>
          <View>
            <Text style={styles.hour}>{item.hour} hours ago</Text>
          </View>
        </View>

        <View style={styles.container}>
          {renderImages(images, item)}
        </View>

        <Text style={styles.captionText}>{item.text}</Text>

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
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={styles.headerText}>News & Events</Text>
        </View>
        <View style={styles.righticons}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
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
      <ScrollView style={styles.bottomContainer}>


        <FlatList
          data={getPostsForPage()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity style={styles.loadMoreButton} onPress={loadNextPage}>
          <Text style={styles.loadMoreText}>Load More Posts</Text>
        </TouchableOpacity>

        <Image source={require('../../Images/EventImage.png')} style={styles.bannerImage} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventNews;
