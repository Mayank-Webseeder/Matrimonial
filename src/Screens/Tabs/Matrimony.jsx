import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../StyleScreens/ExploreStyle';
import Colors from '../../utils/Colors';
import { slider } from '../../DummyData/DummyData';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SW } from '../../utils/Dimensions';
import { DrawerActions } from '@react-navigation/native';

const Matrimony = ({ navigation }) => {
  const sliderRef = useRef(null);
  const [activeButton, setActiveButton] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);


  const girlsData = [
    {
      name: 'Priyanshi Sharma',
      age: 25,
      height: '5.95',
      subCaste: 'Sub-caste name',
      maritalStatus: 'Unmarried',
      manglikStatus: 'No',
      disability: 'No',
      city: 'Indore',
      occupation: 'Engineer',
      income: '₹10 LPA',
      qualification: 'MCA',
      image: require('../../Images/Committee.png')
    },
  ];

  const boysData = [
    {
      name: 'Amit Verma',
      age: 28,
      height: '6.0',
      subCaste: 'Sub-caste name',
      maritalStatus: 'Unmarried',
      manglikStatus: 'Yes',
      disability: 'No',
      city: 'Bhopal',
      occupation: 'Doctor',
      income: '₹15 LPA',
      qualification: 'MBBS',
      image: require('../../Images/profile3.png')
    },
  ];

  const renderItem = ({ item }) => (
    <View>
      <Image source={item.image} style={styles.sliderImage} />
    </View>
  );

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

  const dataToDisplay = activeButton === 1 ? girlsData : boysData;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Matrimony</Text>
        </View>
        <View style={styles.righticons}>
          <AntDesign name={'search1'} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} />
          <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => { navigation.navigate('Notification') }} />
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
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  activeButton === 1 ? styles.activeButton : styles.inactiveButton,
                  { width: SW(80) },
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
                  activeButton === 2 ? styles.activeButton : styles.inactiveButton,
                  { width: SW(80) },
                ]}
                onPress={() => setActiveButton(2)}
              >
                <Text style={activeButton === 2 ? styles.activeText : styles.inactiveText}>
                  Boys
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.Text}>Set Preferences</Text>
            </TouchableOpacity>

          </View>
        </View>
        {dataToDisplay.map((person, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('MatrimonyPeopleProfile')}
          >
            <View style={styles.card}>
              <Image source={person.image} style={styles.ProfileImage} />
              <View style={styles.profileData}>
                <View>
                  <Text style={[styles.text, { fontFamily: 'Poppins-Bold' }]}>{person.name}</Text>
                  <Text style={styles.text}>Age: {person.age} / Height: {person.height}</Text>
                  <Text style={styles.text}>{person.subCaste}</Text>
                  <Text style={styles.text}>{person.maritalStatus}</Text>
                  <Text style={styles.text}>Manglik Status: {person.manglikStatus}</Text>
                  <Text style={styles.text}>Disability: {person.disability}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.text}>{person.city}</Text>
                  <Text style={styles.text}>{person.occupation}</Text>
                  <Text style={styles.text}>{person.income}</Text>
                  <Text style={styles.text}>{person.qualification}</Text>
                </View>
              </View>
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

              <View style={styles.iconContainer}>
                <MaterialIcons name="call" size={24} color={Colors.dark} />
                <Text style={styles.iconText}>Call</Text>
              </View>

              <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ReportPage')} >
                <MaterialIcons name="error-outline" size={24} color={Colors.dark} />
                <Text style={styles.iconText}>Report</Text>
              </TouchableOpacity>
            </View>
            <Image source={person.image} style={styles.ProfileImage} />
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

export default Matrimony;