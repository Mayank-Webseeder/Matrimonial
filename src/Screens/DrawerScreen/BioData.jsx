import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image ,FlatList, ScrollView,SafeAreaView,StatusBar} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { slider } from '../../DummyData/DummyData';
import styles from '../StyleScreens/BioDataStyle';
import AppIntroSlider from 'react-native-app-intro-slider';
import HeadingWithViewAll from '../../Components/HeadingWithViewAll';
import { SavedProfileData } from '../../DummyData/DummyData';
const BioData = ({ navigation }) => {
  const sliderRef = useRef(null);
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

  const renderItem = ({ item }) => {
    return (
      <View>
        <Image source={item.image} style={styles.sliderImage} />
      </View>
    );
  };

  const renderProfileData = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image style={styles.image} source={item.image} />

      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.city}>{item.city}</Text>
        </View>

        <View style={styles.row2}>
          <Text style={styles.text}>Age: {item.age} /</Text>
          <Text style={styles.text}>Height: {item.height}</Text>
        </View>

        <Text style={styles.subcaste}>{item.subcaste}</Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
                barStyle="dark-content" 
                backgroundColor="transparent" 
                translucent 
            />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')} style={{ flexDirection: "row" }}>
          <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} />
          <Text style={{ color: Colors.theme_color }}>Matrimony</Text>
        </TouchableOpacity>
        <View style={styles.righticons}>
          <AntDesign name={'bells'} size={20} color={Colors.theme_color} />
          <AntDesign name={'search1'} size={20} color={Colors.theme_color} style={{ marginHorizontal: 10 }} />
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

      <View style={styles.EditPerference}>
        <Text style={styles.editText}>Edit Preferences</Text>
        <AntDesign name={'search1'} size={20} color={Colors.theme_color} style={styles.icon}/>
      </View>

    <View>
    <View>
     <HeadingWithViewAll
        heading={'MATRIMONY'}
        headingStyle={{ color: Colors.theme_color }} 
      />
      <FlatList
        data={SavedProfileData}
        renderItem={renderProfileData}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.ProfileContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
     </View>
      <View style={styles.viewAll}>
        <Text style={styles.ViewAllText}>View All</Text>
      </View>
    </View>
    <View>
    <View>
     <HeadingWithViewAll
        heading={'Saved Profile'}
        headingStyle={{ color: Colors.theme_color }} 
      />
      <FlatList
        data={SavedProfileData}
        renderItem={renderProfileData}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.ProfileContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
     </View>
      <View style={styles.viewAll}>
        <Text style={styles.ViewAllText}>View All</Text>
      </View>
    </View>
    <View>
    <View>
     <HeadingWithViewAll
        heading={'Interested Profile'}
        headingStyle={{ color: Colors.theme_color }} 
      />
      <FlatList
        data={SavedProfileData}
        renderItem={renderProfileData}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.ProfileContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
     </View>
      <View style={styles.viewAll}>
        <Text style={styles.ViewAllText}>View All</Text>
      </View>
    </View>
    <View>
    <View>
     <HeadingWithViewAll
        heading={'All Girls / Boys'}
        headingStyle={{ color: Colors.theme_color }} 
      />
      <FlatList
        data={SavedProfileData}
        renderItem={renderProfileData}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.ProfileContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
     </View>
      <View style={styles.viewAll}>
        <Text style={styles.ViewAllText}>View All</Text>
      </View>
    </View>
    <Image source={require('../../Images/slider.png')} style={styles.Sliderimage}/>
    <View>
    <View>
     <HeadingWithViewAll
        heading={'All'}
        headingStyle={{ color: Colors.theme_color }} 
      />
      <FlatList
        data={SavedProfileData}
        renderItem={renderProfileData}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.ProfileContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
     </View>
      <View style={styles.viewAll}>
        <Text style={styles.ViewAllText}>View All</Text>
      </View>
    </View>
     </ScrollView>
    </SafeAreaView>
  );
};

export default BioData;
