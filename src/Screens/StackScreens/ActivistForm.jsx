import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView, Image
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/ActivistFormStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Globalstyles from '../../utils/GlobalCss';

export default function ActivistForm({navigation}) {
  const [subCaste, setSubCaste] = useState('');
  const [state, setState] = useState('');
  const [isCommitteeMember, setIsCommitteeMember] = useState(null);
  const [photos, setPhotos] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const subCasteOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ];

  const stateOptions = [
    { label: 'MP', value: 'mp' },
    { label: 'UP', value: 'up' },
  ];

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, response => {
      if (response.assets) {
        setPhotos(response.assets);
      }
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


  return (
    <SafeAreaView style={Globalstyles.container}>
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row',alignItems:"center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Activist</Text>
        </View>

      </View>
      <ScrollView style={Globalstyles.form}>
        <Text style={Globalstyles.title}>Name</Text>
        <TextInput style={Globalstyles.input} placeholder="Enter your name" />

        {/* Sub Caste Dropdown */}
        <Text style={Globalstyles.title}>Sub Caste</Text>
        <Dropdown
          style={Globalstyles.input1}
          data={subCasteOptions}
          labelField="label"
          valueField="value"
          placeholder="Select Sub Caste"
          value={subCaste}
          onChange={(item) => setSubCaste(item.value)}
        />
        <View>
          <Text style={Globalstyles.title}>Date of Birth</Text>
          <View style={Globalstyles.input1}>
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
        <Dropdown
          style={Globalstyles.input1}
          data={stateOptions}
          labelField="label"
          valueField="value"
          placeholder="Select State"
          value={state}
          onChange={(item) => setState(item.value)}
        />

        {/* City/Village Input */}
        <Text style={Globalstyles.title}>City/Village</Text>
        <TextInput style={Globalstyles.input} placeholder="Enter city/village" />

        {/* Contact Input */}
        <Text style={Globalstyles.title}>Contact</Text>
        <TextInput
          style={Globalstyles.input}
          placeholder="Enter contact number"
          keyboardType="numeric"
        />

        {/* Known Activist ID Input */}
        <Text style={Globalstyles.title}>Known Activist ID No.</Text>
        <TextInput style={Globalstyles.input} placeholder="Enter ID" />

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
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
        {photos.length > 0 && (
          <View style={styles.photosContainer}>
            <Text style={Globalstyles.title}>Uploaded Photos:</Text>
            <View>
              {photos.map((photo, index) => (
                <Image key={index} source={{ uri: photo.uri }} style={styles.photo} />
              ))}
            </View>
          </View>
        )}
        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={()=>navigation.goBack()}>
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
