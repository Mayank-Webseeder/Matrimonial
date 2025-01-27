
import { Text, View, FlatList, TouchableOpacity, TextInput, Modal, ScrollView, SafeAreaView, StatusBar,Linking, Pressable } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { slider, CommitteeDataList } from '../../DummyData/DummyData';
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/CommunityStyle';
import Colors from '../../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AppIntroSlider from 'react-native-app-intro-slider';
import { subCasteOptions } from '../../DummyData/DropdownData';
import Globalstyles from '../../utils/GlobalCss';
import Entypo from 'react-native-vector-icons/Entypo';
import { SH } from '../../utils/Dimensions';
const Committee = ({ navigation }) => {
   const [modalVisible, setModalVisible] = useState(false);
    const [locality, setLocality] = useState('');
    const [activeButton, setActiveButton] = useState(null);
    const [subcaste, setSubcaste] = useState("");
    const [filteredOptions, setFilteredOptions] = useState([]);
    const sliderRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [listHeight, setListHeight] = useState(0);
   
    const handleInputChange = (text) => {
       setSubcaste(text);
       if (text.trim() === '') {
         setFilteredOptions([]); 
       } else {
         const filtered = subCasteOptions.filter((option) =>
           option.label.toLowerCase().includes(text.toLowerCase())
         );
         setFilteredOptions(filtered);
       }
     };
   
     const handleOptionSelect = (value) => {
       setSubcaste(value.label);
       setFilteredOptions([]);
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

  const SliderRenderItem = ({ item }) => {
    return (
      <View>
        <Image source={item.image} style={styles.sliderImage} />
      </View>
    );
  };



  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Pressable style={styles.cardData}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.leftContainer}>
        <Text style={styles.title}>{item.CommitteeTitle}</Text>
          <Text style={styles.Nametext}>{item.name}</Text>
          <View style={styles.CityArea}>
            <Text style={styles.text}>{item.city}</Text>
            <Text style={styles.text}>{item.subcaste}</Text>
          </View>
          <Text style={styles.text}>{item.area}</Text>
        </View>
      </Pressable>
      <View style={styles.sharecontainer}>
            <View style={styles.iconContainer}>
              <FontAwesome name="bookmark-o" size={20} color={Colors.dark} />
              <Text style={styles.iconText}>Save</Text>
            </View>
            <View style={styles.iconContainer}>
              <Feather name="send" size={20} color={Colors.dark} />
              <Text style={styles.iconText}>Shares</Text>
            </View>
            <TouchableOpacity style={styles.Button} onPress={()=>Linking.openURL('tel:9893458940')} >
                <MaterialIcons name="call" size={15} color={Colors.light} />
                <Text style={styles.RequestText}>Request for call</Text>
              </TouchableOpacity>
          </View>
    </View>
  );

  const handleOpenFilter = () => {
    setModalVisible(true);
    setActiveButton(1)
  };

  const handleCloseFilter = () => {
    setModalVisible(false);
  };

  const handleUploadButton = () => {
    setActiveButton(2)
    navigation.navigate('CommitteeSubmissionPage')
  }


  return (
    <SafeAreaView style={Globalstyles.container} showsVerticalScrollIndicator={false}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {/* Fixed Header */}
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

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
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
            onPress={handleUploadButton}
          >
            <Text style={activeButton === 2 ? styles.activeText : styles.inactiveText}>Upload</Text>
          </TouchableOpacity>
        </View>

        {/* Dharamsala List */}
        <FlatList
          data={CommitteeDataList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false} // Disable FlatList scrolling
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.DharamSalaList}
        />
      </ScrollView>

      {/* Filter Modal */}
      <Modal
  visible={modalVisible}
  transparent={true}
  animationType="slide"
  onRequestClose={handleCloseFilter}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <View style={styles.Filterheader}>
        <TouchableOpacity onPress={handleCloseFilter} style={{ flexDirection: 'row' }}>
          <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          <Text style={Globalstyles.headerText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={Globalstyles.form}>
        <Text style={Globalstyles.title}>Locality</Text>
        <View>
          <TextInput
            style={Globalstyles.input}
            value={locality}
            onChangeText={(text) => setLocality(text)}
            placeholder="Enter Locality"
            placeholderTextColor={Colors.gray}
          />
        </View>
        <View>
          <Text style={Globalstyles.title}>Sub-Caste</Text>
          <View>
            <TextInput
              value={subcaste}
              onChangeText={handleInputChange}
              placeholder="Enter your caste"
              placeholderTextColor={Colors.gray}
              style={Globalstyles.input}
            />
            {filteredOptions.length > 0 && (
              <FlatList
                data={filteredOptions.slice(0, 2)}
                scrollEnabled={false}
                keyExtractor={(item) => item.value}
                style={[Globalstyles.suggestions, { marginBottom: 10 }]}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleOptionSelect(item)}>
                    <Text style={styles.label}>{item.label}</Text>
                  </TouchableOpacity>
                )}
                onLayout={(event) => {
                  const height = event.nativeEvent.layout.height;
                  setListHeight(height); // Update list height dynamically
                }}
              />
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.applyButton} onPress={handleCloseFilter}>
          <Text style={styles.applyButtonText}>See results</Text>
        </TouchableOpacity>

        {/* Dynamically position the cross button */}
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={[
            styles.crossButton,
            { top: SH(200) + listHeight + 100 },
          ]}
        >
          <View style={styles.circle}>
            <Entypo name="cross" size={25} color={Colors.light} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
    </SafeAreaView>
  );
};

export default Committee;

