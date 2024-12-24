import { Text, View, Image, ImageBackground, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/ProfileStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-element-dropdown';
const Profile = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [ManglikStatus, setManglikStatus] = useState('');
  const [gotra, setGotra] = useState('');
  const [Mothergotra, setMotherGotra] = useState('');
  const [livingStatus, setlivingStatus] = useState('');
  const [CurrentCity, setCurrentCity] = useState('');
  const [profileCreated, setProfileCreated] = useState('');
  const [fatherIncome, setfatherIncome] = useState('');
  const [familyType, setfamilyType] = useState('');
  const [cooking, setCooking] = useState('');
  const [partnerDietHabit, setpartnerDietHabit] = useState('');
  const [smokingStatus, setsmokingStatus] = useState('');
  const [drinkingHabit, setdrinkingHabit] = useState('');

  const maritalStatusData = [
    { label: 'Unmarried', value: 'Unmarried' },
    { label: 'Widow', value: 'Widow' },
    { label: 'Divorcee', value: 'Divorcee' },
    { label: 'Doesn’t Matter', value: 'Doesn’t Matter' }
  ];

  const ManglikStatusData = [
    { label: 'Pooja', value: 'Pooja' },
  ];
  const gotraData = [
    { label: 'Pooja', value: 'Pooja' }
  ]
  const MotherGotraData = [
    { label: '01', value: '01' },
    { label: '02', value: '02' },
    { label: '03', value: '03' },
  ]
  const LivingData = [
    { label: 'yes', value: 'Yes' },
    { label: 'Nes', value: 'No' },
  ]
  const ProfileCreatedData = [
    { label: 'Mother', value: 'Mother' },
    { label: 'Father', value: 'Father' },
    { label: 'Sister', value: 'Sister' },
    { label: 'Brother', value: 'Brother' },
  ]

  const CityData = [
    { label: 'Indore', value: 'Indore' },
    { label: 'Bhopal', value: 'Bhopal' },
  ]
  const FatherIncome = [
    { label: 'Single', value: 'Single' },
    { label: 'Double', value: 'Double' },
  ]
  const FamilyType = [
    { label: 'Joint', value: 'Joint' },
    { label: 'Not-Joint', value: 'Not-Joint' },
  ]
  const CookingStatus = [
    { label: 'yes', value: 'Yes' },
    { label: 'Nes', value: 'No' },
  ]
  const DietHabit = [
    { label: 'yes', value: 'Yes' },
    { label: 'Nes', value: 'No' },
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
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={require('../../Images/menu.png')} />
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Matrimony Profile</Text>
            <AntDesign name={'caretdown'} color={Colors.theme_color} size={15} />
          </View>
        </View>
        <Text style={styles.RepostText}>Repost</Text>
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
            <View style={styles.detail}>
              <Text style={styles.detailText}>Personal Details</Text>
              <Text style={styles.detailText}>Edit</Text>
            </View>
            <View>
              <View>
                <Text style={styles.inputHeading}>Full Name</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Date of Birth</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Place of Birth</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Marital Status</Text>
                <Dropdown
                  style={styles.input}
                  data={maritalStatusData}
                  labelField="label"
                  valueField="value"
                  value={maritalStatus}
                  onChange={item => setMaritalStatus(item.value)}
                  placeholder="Select a service"
                />

              </View>
              <View>
                <Text style={styles.inputHeading}>Height</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Weight</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Complexion</Text>
                <TextInput style={styles.input} />
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
                <Text style={styles.inputHeading}>Nadi</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Gotra (self)</Text>
                <Dropdown
                  style={styles.input}
                  data={gotraData}
                  labelField="label"
                  valueField="value"
                  value={gotra}
                  onChange={item => setGotra(item.value)}
                  placeholder="Select gotra"
                />

              </View>
              <View>
                <Text style={styles.inputHeading}>Gotra (Mother)</Text>
                <Dropdown
                  style={styles.input}
                  data={MotherGotraData}
                  labelField="label"
                  valueField="value"
                  value={Mothergotra}
                  onChange={item => setMotherGotra(item.value)}
                  placeholder="Select mother gotra"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>Qualification</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Occupation</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Income (Annually)</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Are you living with Family</Text>
                <Dropdown
                  style={styles.input}
                  data={LivingData}
                  labelField="label"
                  valueField="value"
                  value={livingStatus}
                  onChange={item => setlivingStatus(item.value)}
                  placeholder="Select status"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>Which city do you currently living?</Text>
                <Dropdown
                  style={styles.input}
                  data={CityData}
                  labelField="label"
                  valueField="value"
                  value={CurrentCity}
                  onChange={item => setCurrentCity(item.value)}
                  placeholder="Select status"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>About Me</Text>
                <TextInput style={styles.input} multiline={true} numberOfLines={6} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Mobile no.</Text>
                <TextInput style={styles.input} multiline={true} numberOfLines={6} />
              </View>
              <View>
                <Text style={styles.inputHeading}>About My Nature & Personality</Text>
                <TextInput style={styles.input} multiline={true} numberOfLines={6} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Profile created by</Text>
                <Dropdown
                  style={styles.input}
                  data={ProfileCreatedData}
                  labelField="label"
                  valueField="value"
                  value={profileCreated}
                  onChange={item => setProfileCreated(item.value)}
                  placeholder="Select Person"
                />
              </View>
            </View>
            <Text style={styles.headText}>Family details </Text>
            <View>
              <View>
                <Text style={styles.inputHeading}>Father Full Name</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Mother Full Name</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Father Occupation</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Father Income (Annually)</Text>
                <Dropdown
                  style={styles.input}
                  data={FatherIncome}
                  labelField="label"
                  valueField="value"
                  value={fatherIncome}
                  onChange={item => setfatherIncome(item.value)}
                  placeholder="Select Income"
                />

              </View>
              <View>
                <Text style={styles.inputHeading}>Family Type</Text>
                <Dropdown
                  style={styles.input}
                  data={FamilyType}
                  labelField="label"
                  valueField="value"
                  value={familyType}
                  onChange={item => setfamilyType(item.value)}
                  placeholder="Select type"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>Mother Occupation (If any)</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Mother Income (Annually)</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Other family member Occupation (optional)</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Siblings</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Any family member info. (optinal)</Text>
                <TextInput style={styles.input} multiline={true} numberOfLines={6} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Father Mobile no.</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Mother Mobile no.</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Family member Mobile no.</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Permanent Address</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Residential Address</Text>
                <TextInput style={styles.input} />
              </View>
              <Text style={styles.headText}>Other Personal Detail</Text>
              <View>
                <Text style={styles.inputHeading}>Do you know cooking</Text>
                <Dropdown
                  style={styles.input}
                  data={CookingStatus}
                  labelField="label"
                  valueField="value"
                  value={cooking}
                  onChange={item => setCooking(item.value)}
                  placeholder="Select a service"
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
                  placeholder="Select Habit"
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
                  placeholder="Select status"
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
                <Text style={styles.inputHeading}>Your Hobbies</Text>
                <TextInput style={styles.input} multiline={true} numberOfLines={6} />
              </View>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
