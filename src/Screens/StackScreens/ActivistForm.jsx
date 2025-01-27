import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView, FlatList
} from 'react-native';

import Colors from '../../utils/Colors';
import styles from '../StyleScreens/ActivistFormStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Globalstyles from '../../utils/GlobalCss';
import ImageCropPicker from 'react-native-image-crop-picker';
import { subCasteOptions, StateData, CityData } from '../../DummyData/DropdownData';

export default function ActivistForm({ navigation }) {
  const [subCasteInput, setSubCasteInput] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredSubCaste, setFilteredSubCaste] = useState([]);
  const [isCommitteeMember, setIsCommitteeMember] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState("Upload Image");
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSubCaste, setSelectedSubCaste] = useState('');

  const handleImagePick = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 250,
      cropping: true,
    })
      .then(image => {
        setSelectedImage(image.path);
        const imageName = image.path.split('/').pop();
        setSelectedImageName(imageName);
        console.log('Selected Image:', image);
      })
      .catch(error => {
        console.error('Image Picking Error:', error);
      });
  };

  const handleDateChange = (event, date) => {
    if (date) setSelectedDate(date);
    setShowDatePicker(false);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const handleStateInputChange = (text) => {
    setStateInput(text);
    if (text) {
      const filtered = StateData.filter((item) =>
        item?.label?.toLowerCase().includes(text.toLowerCase())
      ).map(item => item.label);
      setFilteredStates(filtered);
    } else {
      setFilteredStates([]);
    }
  };

  const handleSubCasteInputChange = (text) => {
    setSubCasteInput(text);
    if (text) {
      const filtered = subCasteOptions.filter((item) =>
        item?.label?.toLowerCase().includes(text.toLowerCase())
      ).map(item => item.label);
      setFilteredSubCaste(filtered);
    } else {
      setFilteredSubCaste([]);
    }
  };

  const handleCityInputChange = (text) => {
    setCityInput(text);
    if (text) {
      const filtered = CityData.filter((item) =>
        item?.label?.toLowerCase().includes(text.toLowerCase())
      ).map(item => item.label);
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };


  return (
    <SafeAreaView style={Globalstyles.container}>
      <View style={Globalstyles.header}>
        <View style={{ display: "flex", flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Activist</Text>
        </View>

      </View>
      <ScrollView style={Globalstyles.form} showsVerticalScrollIndicator={false}>
        <Text style={Globalstyles.title}>Name</Text>
        <TextInput style={Globalstyles.input} placeholder="Enter your Full Name"
          placeholderTextColor={Colors.gray} />

        {/* Sub Caste Dropdown */}
        <Text style={Globalstyles.title}>Sub Caste</Text>
        <TextInput
          style={Globalstyles.input}
          value={subCasteInput}
          onChangeText={handleSubCasteInputChange}
          placeholder="Enter your sub caste"
          placeholderTextColor={Colors.gray}
        />
        {filteredSubCaste.length > 0 && subCasteInput ? (
          <FlatList
            data={filteredSubCaste.slice(0, 5)}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSubCasteInput(item);
                  setSelectedSubCaste(item);
                  setFilteredSubCaste([]);
                }}
              >
                <Text style={Globalstyles.listItem}>{item}</Text>
              </TouchableOpacity>
            )}
            style={Globalstyles.suggestions}
          />
        ) : null}
        <View>
          <Text style={Globalstyles.title}>Date of Birth</Text>
          <View style={Globalstyles.inputContainer}>
            <Text style={styles.dateText}>
              {selectedDate ? formatDate(selectedDate) : " "}
            </Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <AntDesign name={"down"} size={20} style={styles.arrow} />
            </TouchableOpacity>
          </View>
          {errors.selectedDate && (
            <Text style={styles.errorText}>{errors.selectedDate}</Text>
          )}
        </View>

        {/* State Dropdown */}
        <Text style={Globalstyles.title}>State</Text>
        <TextInput
          style={Globalstyles.input}
          value={stateInput}
          onChangeText={handleStateInputChange}
          placeholder="Enter your state"
          placeholderTextColor={Colors.gray}
        />
        {filteredStates.length > 0 && stateInput ? (
          <FlatList
            data={filteredStates}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setStateInput(item);
                  setSelectedState(item);
                  setFilteredStates([]);
                }}
              >
                <Text style={Globalstyles.listItem}>{item}</Text>
              </TouchableOpacity>
            )}
            style={Globalstyles.suggestions}
          />
        ) : null}

        {/* City/Village Input */}
        <Text style={Globalstyles.title}>City/Village</Text>
        <TextInput
          style={Globalstyles.input}
          value={cityInput}
          onChangeText={handleCityInputChange}
          placeholder="Enter your city"
          placeholderTextColor={Colors.gray}
        />
        {filteredCities.length > 0 && cityInput ? (
          <FlatList
            data={filteredCities}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setCityInput(item);
                  setSelectedCity(item);
                  setFilteredCities([]);
                }}
              >
                <Text style={Globalstyles.listItem}>{item}</Text>
              </TouchableOpacity>
            )}
            style={Globalstyles.suggestions}
          />
        ) : null}

        {/* Contact Input */}
        <Text style={Globalstyles.title}>Contact</Text>
        <TextInput
          style={Globalstyles.input}
          placeholder="Enter contact number"
          keyboardType="numeric"
          placeholderTextColor={Colors.gray}
        />

        {/* Known Activist ID Input */}
        <Text style={Globalstyles.title}>Known Activist ID No.</Text>
        <TextInput style={Globalstyles.input} placeholder="Enter ID"
          placeholderTextColor={Colors.gray} />

        {/* Committee Membership Yes/No */}
        <Text style={Globalstyles.title}>Are you engaged in any committee?</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              isCommitteeMember === true && styles.radioSelected,
            ]}
            onPress={() => setIsCommitteeMember(true)}
          >
            <Text style={styles.radioText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              isCommitteeMember === false && styles.radioSelected,
            ]}
            onPress={() => setIsCommitteeMember(false)}
          >
            <Text style={styles.radioText}>No</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Picture Upload */}
        <Text style={Globalstyles.title}>Profile Picture</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
          <Text style={styles.uploadText}>{selectedImage ? 'Change Image' : 'Upload Image'}</Text>
        </TouchableOpacity>
        {selectedImage && (
          <View style={styles.imagePreviewContainer}>
            <Text style={Globalstyles.title}>Uploaded Image</Text>
            <Text style={styles.imageName}>{selectedImageName}</Text>
          </View>
        )}
        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={() => navigation.goBack()}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>


        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

      </ScrollView>
    </SafeAreaView>
  );
}
