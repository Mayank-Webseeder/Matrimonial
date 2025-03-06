import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView, SafeAreaView, StatusBar, Linking } from 'react-native';
import styles from '../StyleScreens/DharamsalaDetailStyle';
import Colors from '../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppIntroSlider from 'react-native-app-intro-slider';
import Globalstyles from '../../utils/GlobalCss';

const DharamsalaDetail = ({ navigation, route }) => {
  const { DharamsalaData } = route.params;
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullText, setShowFullText] = useState(false);

  const description = DharamsalaData.description || "No description available.";
  const truncatedDescription = description.slice(0, 100) + "..."; // First 100 characters

  // Automatically slide images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < DharamsalaData.images.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        sliderRef.current?.goToSlide(currentIndex + 1);
      } else {
        setCurrentIndex(0);
        sliderRef.current?.goToSlide(0);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const SliderrenderItem = ({ item }) => (
    <View>
      <Image source={{ uri: item }} style={styles.sliderImage} />
    </View>
  );

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>{DharamsalaData.dharmshalaName}</Text>
        </View>
        <View style={styles.righticons}>
          <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => navigation.navigate('Notification')} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Image Slider */}
        <View style={styles.sliderContainer}>
          <AppIntroSlider
            ref={sliderRef}
            data={DharamsalaData.images}
            renderItem={SliderrenderItem}
            showNextButton={false}
            showDoneButton={false}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            onSlideChange={(index) => setCurrentIndex(index)}
          />
        </View>

        {/* Dharamsala Details */}
        <View style={styles.textContainer}>
          <View style={styles.TextView}>
            <Text style={[Globalstyles.title,{fontFamily:"Poppins-Bold"}]}>{DharamsalaData.dharmshalaName}</Text>
            <Text style={styles.Text}>{DharamsalaData.subCaste || "N/A"}</Text>
            <Text style={styles.smalltext}>{DharamsalaData.city}</Text>
          </View>

          {/* Description with Read More / Read Less */}
          <View style={styles.TextView}>
            <Text style={Globalstyles.title}>Description</Text>
            <Text style={styles.smallText}>
              {showFullText ? description : truncatedDescription}
            </Text>
            {description.length > 100 && (
              <TouchableOpacity onPress={() => setShowFullText(!showFullText)}>
                <Text style={styles.viewMore}>
                  {showFullText ? 'Read Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Share & Call Section */}
        <View style={styles.sharecontainer}>
          <View style={styles.iconContainer}>
            <FontAwesome name="bookmark-o" size={20} color={Colors.dark} />
            <Text style={styles.iconText}>Save</Text>
          </View>

          <View style={styles.iconContainer}>
            <Feather name="send" size={20} color={Colors.dark} />
            <Text style={styles.iconText}>Share</Text>
          </View>

          <TouchableOpacity style={styles.Button} onPress={() => Linking.openURL(`tel:${DharamsalaData.mobileNo}`)}>
            <MaterialIcons name="call" size={20} color={Colors.light} />
            <Text style={styles.RequestText}>Request for call</Text>
          </TouchableOpacity>
        </View>

        <Image source={require('../../Images/slider.png')} style={Globalstyles.bottomImage} />

      </ScrollView>
    </SafeAreaView>
  );
};

export default DharamsalaDetail;
