import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../StyleScreens/IntrestedProfileStyle';
import Colors from '../../utils/Colors';
import { slider } from '../../DummyData/DummyData';
import { ScrollView } from 'react-native-gesture-handler';
import AppIntroSlider from 'react-native-app-intro-slider';

const IntrestedProfile = ({ navigation }) => {
  const sliderRef = useRef(null);
  const [activeButton, setActiveButton] = useState(1); // Default to Interest Sent
  const [currentIndex, setCurrentIndex] = useState(0);
  const [value, setValue] = useState('');
  const [showProfile, setShowProfile] = useState(true); // Control profile visibility
  const [isModalVisible, setModalVisible] = useState(false); // Modal visibility

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
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.header}>
        <View style={{ flexDirection: 'row',alignItems:"center" }}>
          <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
            <MaterialIcons
              name={'arrow-back-ios-new'}
              size={20}
              color={Colors.theme_color}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Matrimony</Text>
        </View>
        <View style={styles.righticons}>
          <AntDesign
            name={'search1'}
            size={25}
            color={Colors.theme_color}
            style={{ marginHorizontal: 10 }}
          />
          <AntDesign
            name={'bells'}
            size={25}
            color={Colors.theme_color}
            onPress={() => navigation.navigate('Notification')}
          />
        </View>
      </View>
      <ScrollView>
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
        <View>
          <View style={styles.ButtonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                activeButton === 1 ? styles.activeButton : styles.inactiveButton,
              ]}
              onPress={() => setActiveButton(1)}
            >
              <Text
                style={
                  activeButton === 1 ? styles.activeText : styles.inactiveText
                }
              >
                Interest Sent
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                activeButton === 2 ? styles.activeButton : styles.inactiveButton,
              ]}
              onPress={() => {
                setActiveButton(2);
                setShowProfile(true); // Ensure profile is visible when switching to "Interest Received"
              }}
            >
              <Text
                style={
                  activeButton === 2 ? styles.activeText : styles.inactiveText
                }
              >
                Interest Received
              </Text>
            </TouchableOpacity>

          </View>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={setValue}
            />
            {!value && (
              <Text style={styles.placeholder}>Set Preferences</Text>
            )}
            <AntDesign
              name="search1"
              size={20}
              color={Colors.theme_color}
              style={styles.icon}
            />
          </View>
        </View>
        {showProfile && (
  <View style={styles.profileSection}>
    <Image
      source={require('../../Images/profile3.png')}
      style={styles.ProfileImage}
    />
    <View style={styles.profileData}>
      <View>
        <Text style={[styles.text, { fontFamily: 'Poppins-Bold' }]}>
          Raj Sharma
        </Text>
        <Text style={styles.text}>Age: 25 / Height-5.95</Text>
        <Text style={styles.text}>Sub-caste name</Text>
        <Text style={styles.text}>Marital Status</Text>
        <Text style={styles.text}>Maglik Status :-</Text>
        <Text style={styles.text}>Disability :- No</Text>
      </View>
      <View>
        <Text style={styles.text}>Indore</Text>
        <Text style={styles.text}>Occupation</Text>
        <Text style={styles.text}>Income</Text>
        <Text style={styles.text}>Qualification</Text>
      </View>
    </View>
    <View style={styles.descriptionContainer}>
      <Text style={styles.description}>Description</Text>
      <Text style={styles.descriptionText}>
        Acharya Kiran is a well-known Astrologer. Having experience in
        the field of Vedic Astrology. Born and brought up in a Brahmin
        family, she has also benefited from the immense knowledge
        related to her grandfather. She has had a natural liking for
        Astrology since the age of 15
      </Text>
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

      {activeButton === 1 ? (
        <TouchableOpacity
          style={styles.interestedButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Un Interested</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.interestedButton}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      )}

      <View style={styles.iconContainer}>
        <MaterialIcons name="call" size={24} color={Colors.dark} />
        <Text style={styles.iconText}>Call</Text>
      </View>

      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('ReportPage')}
      >
        <MaterialIcons
          name="error-outline"
          size={24}
          color={Colors.dark}
        />
        <Text style={styles.iconText}>Report</Text>
      </TouchableOpacity>
    </View>
  </View>
)}
{/* Always show this image at the bottom */}
<Image
  source={require('../../Images/profile3.png')}
  style={styles.ProfileImage}
/>

      </ScrollView>

      {/* Modal */}
      <Modal
        transparent
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Do you really want to remove this profile from the Interested
              list?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setShowProfile(false);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    
    </SafeAreaView>
  );
};

export default IntrestedProfile;
