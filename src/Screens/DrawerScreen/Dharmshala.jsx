import { Text, View, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { slider, DharamsalaData } from '../../DummyData/DummyData';
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/DharmshalaStyle';
import Colors from '../../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-element-dropdown';
import AppIntroSlider from 'react-native-app-intro-slider';

const Dharmshala = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [subcaste, setSubcaste] = useState('');
  const [locality, setLocality] = useState('');

  const subcasteData = [
    { label: 'OBC', value: 'OBC' },
    { label: 'General', value: 'General' },
    { label: 'ST', value: 'ST' },
    { label: 'SC', value: 'SC' },
  ];

  const LocalityData = [
    { label: 'Badnagar', value: 'Badnagar' },
  ];

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
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DharamsalaDetail')}>
        <View style={styles.cardData}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.leftContainer}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.smalltext}>{item.subcaste}</Text>
            <Text style={styles.smalltext}>{item.city}</Text>
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
            <MaterialIcons name="call" size={20} color={Colors.light} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const handleOpenFilter = () => {
    setModalVisible(true);
  };

  const handleCloseFilter = () => {
    setModalVisible(false);
  };

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.searchContainer}>
          <View style={styles.searchbar}>
            <TextInput placeholder="Search in Your city" placeholderTextColor={"gray"} />
          </View>
          <TouchableOpacity style={styles.filterContainer} onPress={handleOpenFilter}>
            <FontAwesome name={"filter"} size={20} color={"gray"} />
            <Text>Filter</Text>
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
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')} style={{ flexDirection: 'row' }}>
          <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} />
          <Text style={styles.headerText}>Community</Text>
        </TouchableOpacity>
        <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => { navigation.navigate('Notification'); }} />
      </View>
      <FlatList
        data={DharamsalaData}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.DharamSalaList}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseFilter}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.navigate('Tabs')} style={{ flexDirection: "row" }}>
                <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} />
                <Text style={{ color: Colors.theme_color }}>Filter</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.headingText}>Sub-Caste</Text>
            <View style={styles.inputContainer}>
              <Dropdown
                data={subcasteData}
                labelField="label"
                valueField="value"
                value={subcaste}
                onChange={item => setSubcaste(item.value)}
                placeholder="Caste"
                style={styles.dropdown}
              />
              <MaterialIcons name={'search'} size={20} color={'gray'} style={styles.icon} />
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
            <TouchableOpacity style={styles.applyButton} onPress={handleCloseFilter}>
              <Text style={styles.applyButtonText}>See results</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Dharmshala;
