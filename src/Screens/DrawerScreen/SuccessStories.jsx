import { Text, View, TouchableOpacity, Image, FlatList,SafeAreaView,StatusBar } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../StyleScreens/SuccessStoriesStyle';
import { SuccessStoriesData } from '../../DummyData/DummyData';
import Globalstyles from '../../utils/GlobalCss';

const SuccessStories = ({ navigation }) => {
  const [ratings, setRatings] = useState({}); 

  const handleStarPress = (storyId, rating) => {
    setRatings((prevRatings) => ({ ...prevRatings, [storyId]: rating }));
  };
  

  const renderStars = (storyId) => {
    const currentRating = ratings[storyId] || 0;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleStarPress(storyId, i)}>
          <FontAwesome
            name={i <= currentRating ? 'star' : 'star-o'}
            size={20}
            color={'#FF9900'}
            style={{ marginHorizontal: 2 }}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.storyCard}>
        <Image source={item.image} style={styles.storyImage} />
        <View style={styles.textContainer}>
          <Text style={styles.storyName}>{item.name}</Text>
          <Text style={styles.storyDescription}>{item.description}</Text>
          <View style={styles.ratingContainer}>{renderStars(item.id)}</View>
        </View>
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Success Stories</Text>
        </View>
        <View style={styles.righticons}>
          <TouchableOpacity onPress={()=>navigation.navigate('PostSuccessStories')}>
            <Text style={styles.postText}>Post</Text>
          </TouchableOpacity>
          <AntDesign
            name={'bells'}
            size={25}
            color={Colors.theme_color}
            onPress={() => navigation.navigate('Notification')}
          />
        </View>
      </View>

      <FlatList
        data={SuccessStoriesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SuccessStories;
