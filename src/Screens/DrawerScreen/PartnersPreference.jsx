import { StyleSheet, Text, View, Image, ImageBackground, TextInput, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/PartnerPreferenceStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-element-dropdown';
import { DrawerActions } from '@react-navigation/native';
const PartnersPreference = ({ navigation }) => {
  const [maritalStatus, setMaritalStatus] = useState('');
  const [ManglikStatus, setManglikStatus] = useState('');
  const [partnerDietHabit, setpartnerDietHabit] = useState('');
  const [smokingStatus, setsmokingStatus] = useState('');
  const [drinkingHabit, setdrinkingHabit] = useState('');
  const [Occupation, setOccupation] = useState('');
  const [Qualification, setQualification] = useState('');
  const [Complexion, setComplexion] = useState('');
  const [disaAbility, setdisaAbility] = useState('');
  const [PartnersLivein, setPartnersLivein] = useState('');
  const [District, setDistrict] = useState('');
  const [BodyStructure, setBodyStructure] = useState('');
  const [selectedButton, setSelectedButton] = useState('PartnersPreference');
  const [state, setState] = useState('');
  const [village, setVillage] = useState('');
  const [feet, setFeet] = useState(null);
  const [inches, setInches] = useState(null);
  const [showHeightDropdowns, setShowHeightDropdowns] = useState(false);

  const feetData = [
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
  ];

  const inchesData = Array.from({ length: 11 }, (_, index) => ({
    label: (index + 1).toString(),
    value: (index + 1).toString(),
  }));

  const toggleHeightDropdown = () => {
    setShowHeightDropdowns(!showHeightDropdowns);
  };

  const maritalStatusData = [
    { label: 'Unmarried', value: 'Unmarried' },
    { label: 'Widow', value: 'Widow' },
    { label: 'Divorcee', value: 'Divorcee' },
    { label: 'Doesn’t Matter', value: 'Doesn’t Matter' }
  ];

  const ManglikStatusData = [
    { label: 'Pooja', value: 'Pooja' },
  ];
  const OccupationData = [
    { label: 'Nigeria', value: 'Nigeria' }
  ]
  const QualificationData = [
    { label: 'Nigeria', value: 'Nigeria' }
  ]
  const stateData = [
    { label: 'Barwani', value: 'Barwani' },
    { label: 'Khargone', value: 'Khargone' },
    { label: 'Indore', value: 'Indore' },
    { label: 'Bhopal', value: 'Bhopal' },
  ];

  const Villages = [
    { label: 'Ajnaria', value: 'Ajnaria' },
    { label: 'Badhawani', value: 'Badhawani' },
    { label: 'Bhamkheda', value: 'Bhamkheda' },
    { label: 'Jalgaon', value: 'Jalgaon' },
  ];


  const PartnersLiveinData = [
    { label: 'India', value: 'India' },
    { label: 'Abroad', value: 'Abroad' },
  ]
  const BodyStructureData = [
    { label: 'Slim', value: 'Slim' },
    { label: 'Normal', value: 'Normal' },
    { label: 'Fatty', value: 'Fatty' },
    { label: 'Doesn’t Matter', value: 'Doesn’t Matter' },
  ]

  const ComplexionData = [
    { label: 'Pale', value: 'Pale' },
    { label: 'Fair', value: 'Fair' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Olive', value: 'Olive' },
    { label: 'Naturally brown ', value: 'Naturally brown ' },
    { label: 'Dark Brown/Black', value: 'Dark Brown/Black' },
    { label: 'Doesn’t Matter', value: 'Doesn’t Matter' },
  ]
  const DietHabit = [
    { label: 'yes', value: 'Yes' },
    { label: 'Nes', value: 'No' },
  ]
  const Disabilities = [
    { label: 'yes', value: 'Yes' },
    { label: 'Nes', value: 'No' },
    { label: 'Doesn’t Matter', value: 'Doesn’t Matter' }
  ]
  const smokingStatusData = [
    { label: 'yes', value: 'Yes' },
    { label: 'Nes', value: 'No' },
    { label: 'Doesn’t Matter', value: 'Doesn’t Matter' }
  ]

  const DrinkingHabit = [
    { label: 'yes', value: 'Yes' },
    { label: 'Nes', value: 'No' },
    { label: 'Occasionally', value: 'Occasionally' },
    { label: 'Doesn’t Matter', value: 'Doesn’t Matter' },
  ]

  const handlePress = (buttonName) => {
    setSelectedButton(buttonName);
    navigation.navigate(buttonName);
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={require('../../Images/menu.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Matrimony Profile</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <ImageBackground source={require('../../Images/profile3.png')} style={styles.image}>
            <View style={styles.smallHeader}>
              <Image source={require('../../Images/profile3.png')} style={styles.smallimage} />
              <Text style={styles.name}>Raj Shah</Text>
            </View>
          </ImageBackground>

          <View style={styles.userDeatil}>
            <View style={styles.userData}>
              <Text style={styles.text}>User ID: 1212312313</Text>
              <Text style={styles.text}>23 yrs</Text>
            </View>
            <View style={styles.userData}>
              <Text style={styles.text}>Unmarried</Text>
              <Text style={styles.text}>Lives in London</Text>
            </View>

          </View>

          <View style={styles.IconFlex}>
            <TouchableOpacity
              style={styles.IconsButton}
              onPress={() => handlePress('Profile')}
            >
              <AntDesign
                name={'user'}
                color={selectedButton === 'Profile' ? 'white' : Colors.theme_color} // Change icon color based on active state
                size={25}
                style={selectedButton === 'Profile' ? styles.Selectedicon : styles.icon}
              />
              <Text style={styles.logotext}>Detailed Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.IconsButton}
              onPress={() => handlePress('PartnersPreference')}
            >
              <FontAwesome5
                name={'user-friends'}
                color={selectedButton === 'PartnersPreference' ? 'white' : Colors.theme_color} // Icon color change
                size={25}
                style={selectedButton === 'PartnersPreference' ? styles.Selectedicon : styles.icon}
              />
              <Text style={styles.logotext}>Partner Preference</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.IconsButton}
              onPress={() => handlePress('PhotoGallery')}
            >
              <MaterialIcons
                name={'insert-photo'}
                color={selectedButton === 'PhotoGallery' ? 'white' : Colors.theme_color} // Icon color change
                size={25}
                style={selectedButton === 'PhotoGallery' ? styles.Selectedicon : styles.icon}
              />
              <Text style={styles.logotext}>Photo Gallery</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.detailText}>Preferences</Text>
            <View>
              <View>
                <Text style={styles.inputHeading}>Age Criteria</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Height</Text>

                <TouchableOpacity onPress={toggleHeightDropdown} style={styles.inputWrapper}>

                  <Text style={styles.heightinput}>{feet ? `${feet} feet ${inches} inches` : 'Select Height'}</Text>
                </TouchableOpacity>

                {showHeightDropdowns && (
                  <View>

                    <View style={styles.inputWrapper}>
                      <Text style={styles.inputLabel}>Feet</Text>
                      <Dropdown
                        style={styles.input}
                        data={feetData}
                        labelField="label"
                        valueField="value"
                        value={feet}
                        onChange={(item) => setFeet(item.value)}
                        placeholder="Select Feet"
                      />
                    </View>


                    <View style={styles.inputWrapper}>
                      <Text style={styles.inputLabel}>Inches</Text>
                      <Dropdown
                        style={styles.input}
                        data={inchesData}
                        labelField="label"
                        valueField="value"
                        value={inches}
                        onChange={(item) => setInches(item.value)}
                        placeholder="Select Inches"
                      />
                    </View>
                  </View>
                )}
              </View>
              <View>
                <Text style={styles.inputHeading}>Weight (in kg)</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Partners Marital Status</Text>
                <Dropdown
                  style={styles.input}
                  data={maritalStatusData}
                  labelField="label"
                  valueField="value"
                  value={maritalStatus}
                  onChange={item => setMaritalStatus(item.value)}
                  placeholder="Select status"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>Income</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Occupation</Text>
                <Dropdown
                  style={styles.input}
                  data={OccupationData}
                  labelField="label"
                  valueField="value"
                  value={Occupation}
                  onChange={item => setOccupation(item.value)}
                  placeholder="Select occupdation"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>Qualification</Text>
                <Dropdown
                  style={styles.input}
                  data={QualificationData}
                  labelField="label"
                  valueField="value"
                  value={Qualification}
                  onChange={item => setQualification(item.value)}
                  placeholder="Select Qualification"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>Disabilities (Physical/Mental)</Text>
                <Dropdown
                  style={styles.input}
                  data={Disabilities}
                  labelField="label"
                  valueField="value"
                  value={disaAbility}
                  onChange={item => setdisaAbility(item.value)}
                  placeholder="Select disability"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>Manglik Status</Text>
                <Dropdown
                  style={styles.input}
                  data={ManglikStatusData}
                  labelField="label"
                  valueField="value"
                  value={ManglikStatus}
                  onChange={item => setManglikStatus(item.value)}
                  placeholder="Select status"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>Partners Livein</Text>
                <Dropdown
                  style={styles.input}
                  data={PartnersLiveinData}
                  labelField="label"
                  valueField="value"
                  value={PartnersLivein}
                  onChange={item => setPartnersLivein(item.value)}
                  placeholder="Select Livein"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>District</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>State</Text>
                <Dropdown
                  style={styles.input}
                  data={stateData}
                  labelField="label"
                  valueField="value"
                  value={state}
                  onChange={item => setState(item.value)}
                  placeholder="Select state"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>Village</Text>
                <Dropdown
                  style={styles.input}
                  data={Villages}
                  labelField="label"
                  valueField="value"
                  value={village}
                  onChange={item => setVillage(item.value)}
                  placeholder="Select village"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>Partners body Structure</Text>
                <Dropdown
                  style={styles.input}
                  data={BodyStructureData}
                  labelField="label"
                  valueField="value"
                  value={BodyStructure}
                  onChange={item => setBodyStructure(item.value)}
                  placeholder="Select structure"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>Complexion</Text>
                <Dropdown
                  style={styles.input}
                  data={ComplexionData}
                  labelField="label"
                  valueField="value"
                  value={Complexion}
                  onChange={item => setComplexion(item.value)}
                  placeholder="Select Complexion"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>Partner Dietary Habits</Text>
                <Dropdown
                  style={styles.input}
                  data={DietHabit}
                  labelField="label"
                  valueField="value"
                  value={partnerDietHabit}
                  onChange={item => setpartnerDietHabit(item.value)}
                  placeholder="Select Diet"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>Smoking Habits</Text>
                <Dropdown
                  style={styles.input}
                  data={smokingStatusData}
                  labelField="label"
                  valueField="value"
                  value={smokingStatus}
                  onChange={item => setsmokingStatus(item.value)}
                  placeholder="Select smoking"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>Drinking Habits</Text>
                <Dropdown
                  style={styles.input}
                  data={DrinkingHabit}
                  labelField="label"
                  valueField="value"
                  value={drinkingHabit}
                  onChange={item => setdrinkingHabit(item.value)}
                  placeholder="Select Habit"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>Expectations from Partner</Text>
                <TextInput style={styles.input} multiline={true} numberOfLines={6} />
              </View>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PartnersPreference;
