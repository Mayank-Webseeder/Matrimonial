import { Text, View, FlatList, TouchableOpacity, TextInput, ScrollView,StatusBar,SafeAreaView,Linking } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { slider, CommitteeFilterDataList } from '../../DummyData/DummyData';
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/CommunityFilterStyle';
import Colors from '../../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AppIntroSlider from 'react-native-app-intro-slider';
import Globalstyles from '../../utils/GlobalCss';

const CommunityFilter = ({ navigation }) => {

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

  const SliderRenderItem = ({ item }) => {
    return (
      <View>
        <Image source={item.image} style={styles.sliderImage} />
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardData}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.leftContainer}>
            <Text style={styles.Nametext}>{item.name}</Text>
            <Text style={styles.text}>{item.profile}</Text>
            <View style={styles.sharecontainer}>
              <View style={styles.iconContainer}>
                <FontAwesome name="bookmark-o" size={15} color={Colors.dark} />
                <Text style={styles.iconText}>Save</Text>
              </View>

              <View style={styles.iconContainer}>
                <Feather name="send" size={15} color={Colors.dark} />
                <Text style={styles.iconText}>Shares</Text>
              </View>
              <TouchableOpacity style={styles.Button} onPress={()=>Linking.openURL('tel:9893458940')} >
                <MaterialIcons name="call" size={15} color={Colors.light} />
                <Text style={styles.RequestText}>Request for call</Text>
              </TouchableOpacity>
            </View>
          </View>
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
        <View style={{ flexDirection: 'row',alignItems:"center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back-ios-new"
              size={25}
              color={Colors.theme_color}
            />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Committee</Text>
        </View>
        <View style={styles.righticons}>
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
 
 <ScrollView>

 <View>
          {/* Search and Filter Section */}
          <View style={styles.searchbar}>
              <TextInput
                placeholder="Search in Your city"
                placeholderTextColor={'gray'}
              />
                <AntDesign name={'search1'} size={20} color={'gray'} />
            </View>

          {/* Image Slider */}
          <View style={styles.sliderContainer}>
            <AppIntroSlider
              ref={sliderRef}
              data={slider}
              renderItem={SliderRenderItem}
              showNextButton={false}
              showDoneButton={false}
              dotStyle={styles.dot}
              activeDotStyle={styles.activeDot}
              onSlideChange={(index) => setCurrentIndex(index)}
            />
          </View>
          <View style={styles.filterText}>
            <Text style={styles.filterHeading}>Indore</Text>
            <Text style={styles.filterHeading}>Vijay Nagar</Text>
            <Text style={styles.filterHeading}>Sub-caste</Text>
          </View>

          <FlatList
          data={CommitteeFilterDataList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false} // Disable FlatList scrolling
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.panditListData}
        />
        </View>

 </ScrollView>

    </SafeAreaView>
  );
};

export default CommunityFilter;
