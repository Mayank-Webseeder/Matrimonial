import { Text, View, FlatList, TouchableOpacity, TextInput, Modal, Linking, SafeAreaView, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/ActivistStyle';
import Colors from '../../utils/Colors';
import { subCasteOptions } from '../../DummyData/DropdownData';
import Globalstyles from '../../utils/GlobalCss';
import Entypo from 'react-native-vector-icons/Entypo';
import { SH, SW } from '../../utils/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { GET_ACTIVIST_PROFILES } from '../../utils/BaseUrl';
import { useFocusEffect } from '@react-navigation/native';
import ImageViewing from 'react-native-image-viewing';


const Activist = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activistData, setActivistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subcaste, setSubcaste] = useState('');
  const [locality, setLocality] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [listHeight, setListHeight] = useState(0);
  const [modalLocality, setModalLocality] = useState('');
 const [isImageVisible, setImageVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageViewer = (imageUri) => {
    setSelectedImage(imageUri);
    setImageVisible(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      setLocality('');
      setSubcaste('');
      setActivistData([]);
      fetchActivistData("all"); // Fetch full list by default when coming back
    }, [])
  );

  const fetchActivistData = async (filterType = "search") => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let queryParams = [];

      if (filterType === "search") {
        const cleanedLocality = locality.trim();
        const cleanedSubCaste = subcaste.trim();
        if (cleanedLocality) queryParams.push(`locality=${encodeURIComponent(cleanedLocality.toLowerCase())}`);
        if (cleanedSubCaste) queryParams.push(`subCaste=${encodeURIComponent(cleanedSubCaste.toLowerCase())}`);
      } else if (filterType === "modal") {
        const cleanedModalLocality = modalLocality.trim();
        const cleanedModalSubCaste = subcaste.trim();
        if (cleanedModalLocality) queryParams.push(`locality=${encodeURIComponent(cleanedModalLocality.toLowerCase())}`);
        if (cleanedModalSubCaste) {
          const isCustomSubCaste = !subCasteOptions.some(option => option.label.toLowerCase() === cleanedModalSubCaste.toLowerCase());
          queryParams.push(`subCaste=${encodeURIComponent(isCustomSubCaste ? cleanedModalSubCaste : '')}`);
        }
      }

      const url = filterType === "all" ? GET_ACTIVIST_PROFILES : `${GET_ACTIVIST_PROFILES}?${queryParams.join("&")}`;

      console.log("Fetching Data from:", url);

      const response = await axios.get(url, { headers });

      if (response.data && response.data.data) {
        setActivistData(response.data.data);
      } else {
        setActivistData([]);
      }
    } catch (error) {
      console.error("Error fetching activist data:", error);
      setError(error.response ? error.response.data.message : "Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleOpenFilter = () => {
    setModalVisible(true);
  };

  const handleCloseFilter = () => {
    setModalVisible(false);
    setLocality('');
    setModalLocality('');
    setSubcaste('');
    setActivistData([]);
    fetchActivistData("modal");
  };

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


  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardData}>
        <TouchableOpacity onPress={() => openImageViewer(item.profilePhoto )}>
            <Image
              source={item.profilePhoto  ? { uri: item.profilePhoto  } : require('../../Images/NoImage.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          {selectedImage && (
            <ImageViewing
              images={[{ uri: selectedImage }]} 
              imageIndex={0}
              visible={isImageVisible}
              onRequestClose={() => setImageVisible(false)}
            />
          )}
          <View style={{ marginLeft: SW(10) }}>
            <Text style={styles.text}>{item.fullname}</Text>
            <Text style={styles.smalltext}>{item.subCaste}</Text>
            <Text style={styles.smalltext}>{item.city}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.Button} onPress={() => Linking.openURL(`tel:${item.mobileNo}`)}>
            <Text style={styles.buttonText}>Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
     <View>
     <View style={Globalstyles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
            <MaterialIcons name={'arrow-back-ios-new'} size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Activist</Text>
        </View>
        <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => navigation.navigate('Notification')} />
      </View>
      <View>
          <View style={styles.searchbar}>
            <TextInput
              placeholder='Search in Your City'
              placeholderTextColor="gray"
              value={locality}
              onChangeText={(text) => {
                setLocality(text);
                fetchActivistData("search");
              }}
            />


            <AntDesign name={'search1'} size={20} color={'gray'} />
          </View>

          <View style={styles.ButtonContainer}>
            <TouchableOpacity style={[styles.button,{paddingHorizontal:SW(20)}]} onPress={handleOpenFilter}>
              <Text style={styles.buttonText}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ActivistForm')}>
              <Text style={styles.buttonText}> Be an Activist</Text>
            </TouchableOpacity>
          </View>
        </View>
     </View>
      <ScrollView>

        {loading ? (
          <ActivityIndicator size="large" color={Colors.theme_color} style={{ marginTop:SH(20) }} />
        ) : error ? (
          <Text style={{ textAlign: 'center', marginTop:SH(20), color: 'red' }}>{error}</Text>
        ) : activistData.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop:SH(20), color: 'gray' }}>No activist profiles yet</Text>
        ) : (
          <FlatList
            data={activistData}
            renderItem={renderItem}
            scrollEnabled={false}
            keyExtractor={(item) => item._id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.panditListData}
          />
        )}

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
                    value={modalLocality}
                    onChangeText={(text) => setModalLocality(text)}
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
                      placeholder="Type your caste"
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
                          setListHeight(height);
                        }}
                      />
                    )}
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={() => {
                    fetchActivistData();
                    handleCloseFilter();
                  }}
                >
                  <Text style={styles.applyButtonText}>See Results</Text>
                </TouchableOpacity>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Activist;
