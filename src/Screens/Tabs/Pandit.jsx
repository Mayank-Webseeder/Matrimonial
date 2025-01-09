import { Text, View, FlatList, TouchableOpacity, TextInput, Image, Modal, BackHandler, ScrollView, SafeAreaView,StatusBar } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { PanditData, slider } from '../../DummyData/DummyData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/PanditJyotishKathavachakStyle';
import Colors from '../../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Rating } from 'react-native-ratings';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Dropdown } from 'react-native-element-dropdown';

const Pandit = ({ navigation }) => {
  const sliderRef = useRef(null);
  const [activeButton, setActiveButton] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [services, setServices] = useState('');
  const [locality, setLocality] = useState('');


  const servicesData = [
    { label: 'Pooja', value: 'Pooja' },
    { label: 'Hawan', value: 'Hawan' },
    { label: 'Griha Pravesh', value: 'Griha Pravesh' },
  ];

  const LocalityData = [
    { label: 'Badnagar', value: 'Badnagar' },
  ];

  const handleOpenFilter = () => {
    setModalVisible(true);
    setActiveButton(1)
  };

  const handleCloseFilter = () => {
    setModalVisible(false);
  };

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
    navigation.navigate('RoleRegisterForm');
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PanditDetailPage')}>
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

          <TouchableOpacity style={styles.Button}>
            <MaterialIcons name="call" size={22} color={Colors.light} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Pandit</Text>
        </View>
        <View style={styles.righticons}>
          {/* <AntDesign name={'search1'} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} /> */}
          <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => { navigation.navigate('Notification') }} />
        </View>
      </View>
      <ScrollView>
        <View style={styles.searchbar}>
          <AntDesign name={'search1'} size={20} color={'gray'} />
          <TextInput placeholder='Search in Your city' placeholderTextColor={'gray'} />
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

        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            style={[styles.button, activeButton === 1 ? styles.activeButton : styles.inactiveButton]}
            onPress={handleOpenFilter}
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

        <FlatList
          data={PanditData}
          renderItem={renderItem}

          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.panditListData}
        />

      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseFilter}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.Filterheader}>
              <TouchableOpacity onPress={handleCloseFilter} style={{ flexDirection: "row" }}>
                <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} />
                <Text style={styles.headerText}>Filter</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.headingText}>Locality</Text>

            <View style={styles.inputContainer}>
              <Dropdown
                style={styles.dropdown}
                data={LocalityData}
                labelField="label"
                valueField="value"
                value={locality}
                onChange={item => setLocality(item.value)}
                placeholder="Locality"
              />
              <MaterialIcons name={'search'} size={20} color={'gray'} style={styles.icon} />
            </View>
            <Text style={styles.headingText}>Services</Text>
            <View style={styles.inputContainer}>
              <Dropdown
                data={servicesData}
                labelField="label"
                valueField="value"
                value={services}
                onChange={item => setServices(item.value)}
                placeholder="services"
                style={styles.dropdown}
              />
              <MaterialIcons name={'search'} size={20} color={'gray'} style={styles.icon} />
            </View>
            <TouchableOpacity style={styles.applyButton} onPress={handleCloseFilter}>
              <Text style={styles.applyButtonText}>See results</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Pandit;
