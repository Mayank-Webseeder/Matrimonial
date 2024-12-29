import { Text, View, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
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

const CommunityFilter = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState(null);
  const handleFilter = () => {
    setActiveButton(1);
    navigation.navigate('CommunityFilter');
  };

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
                <FontAwesome name="bookmark-o" size={20} color={Colors.dark} />
                <Text style={styles.iconText}>Save</Text>
              </View>

              <View style={styles.iconContainer}>
                <Feather name="send" size={20} color={Colors.dark} />
                <Text style={styles.iconText}>Shares</Text>
              </View>
              <TouchableOpacity style={styles.Button}>
                <MaterialIcons name="call" size={25} color={Colors.light} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View>
        {/* Header Content */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Tabs')} style={{ flexDirection: 'row' }}>
            <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} />
            <Text style={styles.headerText}>Community</Text>
          </TouchableOpacity>
          <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => { navigation.navigate('Notification'); }} />
        </View>

        <View style={styles.searchbar}>
          <AntDesign name={'search1'} size={20} color={'gray'} />
          <TextInput placeholder='Search in Your city' placeholderTextColor={'gray'} />
        </View>

        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            style={[styles.button, activeButton === 1 ? styles.activeButton : styles.inactiveButton]}
            onPress={handleFilter}
          >
            <Text style={activeButton === 1 ? styles.activeText : styles.inactiveText}>
              Filter
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, activeButton === 2 ? styles.activeButton : styles.inactiveButton]}
            onPress={() => setActiveButton(2)}
          >
            <Text style={activeButton === 2 ? styles.activeText : styles.inactiveText}>
              Register
            </Text>
          </TouchableOpacity>
        </View>

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
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CommitteeFilterDataList}
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

export default CommunityFilter;
