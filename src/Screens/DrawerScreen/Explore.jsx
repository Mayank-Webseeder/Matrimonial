import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../StyleScreens/IntrestedProfileStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../utils/Colors';
import { slider } from '../../DummyData/DummyData';
import { ScrollView } from 'react-native-gesture-handler';
import AppIntroSlider from 'react-native-app-intro-slider';
const Explore = ({ navigation }) => {
  const sliderRef = useRef(null);
  const [activeButton, setActiveButton] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [value, setValue] = useState('');
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

  const renderItem = ({ item }) => {
    return (
      <View>
        <Image source={item.image} style={styles.sliderImage} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')} style={{ flexDirection: "row" }}>
          <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} />
          <Text style={{ color: Colors.theme_color }}>Matrimony</Text>
        </TouchableOpacity>
        <View style={styles.righticons}>
          <AntDesign name={'search1'} size={20} color={Colors.theme_color} style={{ marginHorizontal: 10 }} />
          a
        </View>
      </View>
      <View style={styles.sliderContainer}>
        <AppIntroSlider
          ref={sliderRef}
          data={slider}
          renderItem={renderItem}
          showNextButton={false}
          showDoneButton={false}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          onSlideChange={(index) => setCurrentIndex(index)}
        />
      </View>
     <ScrollView>
     <View>
        <View style={[styles.ButtonContainer, { marginHorizontal: 80 }]}>
          <TouchableOpacity
            style={[
              styles.button,
              activeButton === 1 ? styles.activeButton : styles.inactiveButton,
              { width: 100 }
            ]}
            onPress={() => setActiveButton(1)}
          >
            <Text style={activeButton === 1 ? styles.activeText : styles.inactiveText}>
              Girls
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[
              styles.button,
              activeButton === 2 ? styles.activeButton : styles.inactiveButton, { width: 100 }
            ]}
            onPress={() => setActiveButton(2)}
          >
            <Text style={activeButton === 2 ? styles.activeText : styles.inactiveText}>
              Boys
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
          />
          {!value && <Text style={styles.placeholder}>Set Preferences</Text>}
          <AntDesign name="search1" size={20} color={Colors.theme_color} style={styles.icon} />
        </View>
      </View>
      <Image source={require('../../Images/profile3.png')} style={styles.ProfileImage} />
      <View style={styles.profileData}>
        <View>
          <Text style={[styles.text, { fontFamily: "Poppins-Bold" }]}>Raj Sharma</Text>
          <Text style={styles.text}>Age: 25 /Height-5.95</Text>
          <Text style={styles.text}>Sub-caste name</Text>
          <Text style={styles.text}>Marital Status</Text>
          <Text style={styles.text}>Maglik Status :-</Text>
          <Text style={styles.text}>Disability :- No</Text>
        </View>
        <View>
          <Text style={styles.text}>Indore</Text>
          <Text style={styles.text}>occupation</Text>
          <Text style={styles.text}>Income</Text>
          <Text style={styles.text}>Qualification</Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>Description</Text>
        <Text style={styles.descriptionText}>Acharya Kiran is a well-known Astrologer. Having experience in the field of Vedic Astrology. Born and brought up in a Brahmin family, she has also benefited from the immense knowledge related to her grandfather. She has had a natural liking for Astrology since the age of 15</Text>
      </View>
      <View style={styles.sharecontainer}>
        <View style={styles.iconContainer}>
          <FontAwesome name="bookmark-o" size={24} color={Colors.dark} />
          <Text style={styles.iconText}>Save</Text>
        </View>

        <View style={styles.iconContainer}>
          <Feather name="send" size={24} color={Colors.dark} />
          <Text style={styles.iconText}>Shares</Text>
        </View>

        <TouchableOpacity style={styles.interestedButton}>
          <Text style={styles.buttonText}>Interested</Text>
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <AntDesign name="phone" size={24} color={Colors.dark} />
          <Text style={styles.iconText}>Call</Text>
        </View>

        <View style={styles.iconContainer}>
          <MaterialIcons name="error-outline" size={24} color={Colors.dark} />
          <Text style={styles.iconText}>Report</Text>
        </View>
      </View>
      <Image source={require('../../Images/profile3.png')} style={styles.ProfileImage} />
     </ScrollView>
    </View>
  );
};

export default Explore;
