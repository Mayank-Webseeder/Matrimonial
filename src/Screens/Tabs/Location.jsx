import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView,StatusBar,SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/LocationStyle';

const Location = ({ navigation }) => {
  const profileDetails = [
    { label: 'Sub-caste', value: true },
    { label: 'Manglik', value: true },
    { label: 'Martial', value: true },
    { label: 'Disability', value: false },
    { label: 'Qualification', value: true },
    { label: 'Occupation', value: true },
    { label: 'Income', value: true },
    { label: 'Family Type', value: false },
    { label: 'Age', value: true },
    { label: 'Height', value: true },
    { label: 'Location', value: true },
    { label: 'Diet', value: true },
    { label: 'Smoke', value: false },
    { label: 'Drink', value: false },
    { label: 'Cooking', value: false },
  ];

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
          <Text style={styles.headerText}>Raj Sharma</Text>
        </View>
        <View style={styles.righticons}>
          {/* <AntDesign name={'search1'} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} /> */}
          <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => { navigation.navigate('Notification') }} />
        </View>
      </View>
      <ScrollView>
        <View style={styles.sliderCotainer}>
          <Swiper
            style={styles.wrapper}
            showsButtons={true}
            autoplay={true}
            autoplayTimeout={2.5}
            loop={true}
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.activeDot} />}
            prevButton={<MaterialIcons name="chevron-left" size={50} color={'gray'} />}
            nextButton={<MaterialIcons name="chevron-right" size={50} color={'gray'} />}
          >
            <View style={styles.slide}>
              <Image source={require('../../Images/profile3.png')} style={styles.image} />
            </View>
            <View style={styles.slide}>
              <Image source={require('../../Images/profile3.png')} style={styles.image} />
            </View>
            <View style={styles.slide}>
              <Image source={require('../../Images/profile3.png')} style={styles.image} />
            </View>
          </Swiper>
        </View>
        <View style={styles.flexContainer}>
          <View style={styles.flex}>
            <Text style={styles.Idtext}>ID NO. :- 123456</Text>
            <Text style={styles.toptext}>92% Compatible according to your preference</Text>
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
              <MaterialIcons name="call" size={24} color={Colors.dark} />
              <Text style={styles.iconText}>Call</Text>
            </View>

            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ReportPage')} >
              <MaterialIcons name="error-outline" size={24} color={Colors.dark} />
              <Text style={styles.iconText}>Report</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.flexContainer1}>
          <View>
            <Text style={styles.HeadingText}>Raj Sharma</Text>
            <Text style={styles.text}>Age: 24 / Height: 5.95 feet</Text>
            <Text style={styles.text}>Sub-caste name</Text>
            <Text style={styles.text}>Marital Status</Text>
            <Text style={styles.text}>Maglik Status :-</Text>
            <Text style={styles.text}>Disability :- No</Text>
            <Text style={styles.text}>Profile created by :- Father</Text>
          </View>
          <View>
            <Text />
            <Text style={styles.text}>Indore</Text>
            <Text style={styles.text}>Occupation</Text>
            <Text style={styles.text}>Income</Text>
            <Text style={styles.text}>Qualification</Text>
          </View>
        </View>
        <View style={styles.flexContainer1}>
          <View>
            <Text style={styles.HeadingText}>Horoscope</Text>
            <Text style={styles.text}>Date of Birth: 01/01/1995 / Time: 12:45 PM</Text>
            <Text style={styles.text}>Place of Birth: Indore</Text>
            <View style={styles.flexContainer2}>
              <Text style={styles.text}>Nadi :-</Text>
              <Text style={styles.text}>Gotra (self) :- </Text>
            </View>
            <View style={styles.flexContainer2}>
              <Text style={styles.text}>Maglik Status:-</Text>
              <Text style={styles.text}>Gotra (Mother) :- </Text>
            </View>
          </View>
        </View>
        <View style={styles.flexContainer1}>
          <View>
            <Text style={styles.HeadingText}>About Me</Text>
            <Text style={styles.text}>Acharya Kiran is a well-known Astrologer. Having experience in the field of Vedic Astrology. Born and brought up in a Brahmin family, she has also benefited from the immense knowledge related to her grandfather. She has had a natural liking for Astrology since the age of 15.</Text>
            <View style={styles.flexContainer2}>
              <Text style={styles.text}>Completion: White</Text>
              <Text style={styles.text}>Weight: 70kg </Text>
            </View>
            <View style={styles.flexContainer2}>
              <Text style={styles.text}>Currently Living city: Indore</Text>
              <Text style={styles.text}>Living with family: Yes</Text>
            </View>
          </View>
        </View>
        <View style={styles.flexContainer1}>
          <View>
            <Text style={styles.HeadingText}>Family Section</Text>
            <Text style={styles.text}>Father’s Name: Aman Sharma</Text>
            <Text style={styles.text}>Father’s Occupation:</Text>
            <Text style={styles.text}>Mother’s Name: Shanti Sharma</Text>
            <Text style={styles.text}>Family Income (Annually):</Text>
            <Text style={styles.text}>Family Type:</Text>
            <Text style={styles.text}>Brother’s: 1, Unmarried</Text>
            <Text style={styles.text}>Sister’s: 2, married</Text>
            <Text style={styles.HeadingText}>About My family</Text>
            <Text style={styles.text}>Acharya Kiran is a well-known Astrologer. Having experience in the field of Vedic Astrology. Born and brought up in a Brahmin family, she has also benefited from the immense knowledge related to her grandfather. She has had a natural liking for Astrology since the age of 15.</Text>
          </View>
        </View>
        <View style={styles.flexContainer1}>
          <View>
            <Text style={styles.HeadingText}>Contact Details:</Text>
            <Text style={styles.text}>Mobile No. 1: 1234567890</Text>
            <Text style={styles.text}>Mobile No. 2: 1234567890</Text>
            <Text style={styles.text}>Email ID: raj.sharma@gmail.com</Text>
            <Text style={styles.text}>Permanent Address: 01, Sagar Vihar Colony, Shukliya, Near MR10, Chandragupt Chouraha, Indore, 452010, M.P.</Text>
          </View>
        </View>
        <Text style={styles.ButtonText}>Request for contact</Text>
        <View style={styles.flexContainer1}>
          <View>
            <Text style={styles.HeadingText}>Other Details:</Text>
            <Text style={styles.text}>Cooking: Yes</Text>
            <Text style={styles.text}>Diet: Yes</Text>
            <Text style={styles.text}>Smoke: No</Text>
            <Text style={styles.text}>Drink: No</Text>
          </View>
        </View>
        <View style={styles.flexContainer3}>
          <Text style={styles.HeadingText}>Expectation with partner</Text>
          <Text style={styles.text}>Acharya Kiran is a well-known Astrologer. Having experience in the field of Vedic Astrology. Born and brought up in a Brahmin family, she has also benefited from the immense knowledge related to her grandfather. She has had a natural liking for Astrology since the age of 15.</Text>
        </View>
        <View style={styles.flexContainer3}>
          <Text style={styles.HeadingText}>Matches</Text>
          <View style={styles.flex}>
            <Image source={require('../../Images/profile3.png')} style={styles.smallImage} />
            <Text style={styles.text}>11/15</Text>
            <Image source={require('../../Images/profile3.png')} style={styles.smallImage} />
          </View>
          {profileDetails.map((item, index) => (
            <View key={index} style={styles.flexContainer5}>
              <Text style={styles.label}>{item.label}</Text>
              {item.value ? (
                <MaterialIcons name="check" style={[styles.icon, styles.checkIcon]} />
              ) : (
                <MaterialIcons name="close" style={[styles.icon, styles.crossIcon]} />
              )}
            </View>
          ))}
        </View>
        <Image source={require('../../Images/slider.png')} style={styles.bottomImage} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Location;
