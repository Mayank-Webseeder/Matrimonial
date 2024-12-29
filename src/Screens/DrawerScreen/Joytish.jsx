import { Text, View, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { PanditData, slider } from '../../DummyData/DummyData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/JyotishStyle';
import Colors from '../../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Rating } from 'react-native-ratings';
import AppIntroSlider from 'react-native-app-intro-slider';

const Jyotish = ({ navigation }) => {
  const sliderRef = useRef(null);
  const [activeButton, setActiveButton] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < slider.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        sliderRef.current?.goToSlide(currentIndex + 1);
      } else {
        setCurrentIndex(0);
        sliderRef.current?.goToSlide(0);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const SliderrenderItem = ({ item }) => {
    return (
      <View>
        <Image source={item.image} style={styles.sliderImage} />
      </View>
    );
  };

  const handleRegister = () => {
    setActiveButton(2);
    navigation.navigate('JyotishRegister');
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('JyotishDetailsPage')}>
        <View style={styles.cardData}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.leftContainer}>
            <Text style={styles.text}>{item.name}</Text>
            <View style={styles.rating}>
              <Rating type="star" ratingCount={5} imageSize={15} startingValue={item.rating} readonly />
              <Text style={[styles.text, { fontFamily: 'Poppins-Regular' }]}> {item.rating} star Rating</Text>
            </View>
            <View style={styles.CityArea}>
              <Text style={styles.text}>{item.city}</Text>
              <Text style={styles.text}>{item.area}</Text>
            </View>
          </View>
        </View>
        <View style={styles.sharecontainer}>
          <View style={styles.iconContainer}>
            <FontAwesome name="bookmark-o" size={20} color={Colors.dark} />
            <Text style={styles.iconText}>Save</Text>
          </View>

          <View style={styles.iconContainer}>
            <Feather name="send" size={20} color={Colors.dark} />
            <Text style={styles.iconText}>Shares</Text>
          </View>
          <View style={styles.iconContainer}>
            <AntDesign name="minuscircleo" size={22} color={Colors.dark} />
            <Text style={styles.iconText}>Report</Text>
          </View>
          <TouchableOpacity style={styles.Button}>
            <MaterialIcons name="call" size={20} color={Colors.light} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View>
      <View style={styles.searchbar}>
        <AntDesign name={'search1'} size={20} color={'gray'} />
        <TextInput placeholder='Search in Your city' placeholderTextColor={'gray'} />
      </View>

      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          style={[styles.button, activeButton === 1 ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setActiveButton(1)}
        >
          <Text style={activeButton === 1 ? styles.activeText : styles.inactiveText}>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, activeButton === 2 ? styles.activeButton : styles.inactiveButton]}
          onPress={handleRegister}
        >
          <Text style={activeButton === 2 ? styles.activeText : styles.inactiveText}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sliderContainer}>
        <AppIntroSlider
          ref={sliderRef}
          data={slider}
          renderItem={SliderrenderItem}
          showNextButton={false}
          showDoneButton={false}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          onSlideChange={(index) => setCurrentIndex(index)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')} style={{ flexDirection: 'row' }}>
          <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} />
          <Text style={styles.headerText}>Jyotish</Text>
        </TouchableOpacity>
        <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => { navigation.navigate('Notification'); }} />
      </View>
      <FlatList
        data={PanditData}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.panditListData}
      />
    </View>
  );
};

export default Jyotish;
