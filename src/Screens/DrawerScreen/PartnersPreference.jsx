import { StyleSheet, Text, View, Image, ImageBackground, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/PartnerPreferenceStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-element-dropdown';
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
  const DistrictData = [
    { label: 'Barwani', value: 'Barwani' },
    { label: 'Khargone', value: 'Khargone' },
  ]
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
            <Image source={require('../../Images/menu.png')} />
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Matrimony Profile</Text>
            <AntDesign name={'caretdown'} color={Colors.theme_color} size={15} />
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
            <View style={styles.userData}>
              <AntDesign name={'hearto'} color={Colors.theme_color} size={25} />
              <AntDesign name={'menu-unfold'} color={Colors.theme_color} size={25} />
              <Feather name={'minus-circle'} color={Colors.theme_color} size={25} />
              <MaterialIcons name={'report-gmailerrorred'} color={Colors.theme_color} size={25} />
            </View>
          </View>

          <View style={styles.IconFlex}>
            <TouchableOpacity style={styles.IconsButton} onPress={() => navigation.navigate('Profile')}>
              <AntDesign name={'user'} color={Colors.theme_color} size={25} style={styles.icon} />
              <Text style={styles.logotext}>Detailed Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.IconsButton} onPress={() => navigation.navigate('PartnersPreference')}>
              <FontAwesome5 name={'user-friends'} color={Colors.theme_color} size={25} style={styles.icon} />
              <Text style={styles.logotext}>Partner Preference</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.IconsButton} onPress={() => navigation.navigate('PhotoGallery')}>
              <MaterialIcons name={'insert-photo'} color={Colors.theme_color} size={25} style={styles.icon} />
              <Text style={styles.logotext}>Photo Gallery</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.detailText}>Preferences</Text>
            <View>
              <View>
                <Text style={styles.inputHeading}>Age Criteria</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Height Expected</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Weight</Text>
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
                <Dropdown
                  style={styles.input}
                  data={DistrictData}
                  labelField="label"
                  valueField="value"
                  value={District}
                  onChange={item => setDistrict(item.value)}
                  placeholder="Select district"
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
    </View>
  );
};

export default PartnersPreference;
