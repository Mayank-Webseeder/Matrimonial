import { Text, View, Image, ImageBackground, TextInput, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/ProfileStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-element-dropdown';
import { DrawerActions } from '@react-navigation/native';
const DetailedProfile = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState('DetailedProfile');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [ManglikStatus, setManglikStatus] = useState('');
  const [gotra, setGotra] = useState('');
  const [Mothergotra, setMotherGotra] = useState('');
  const [livingStatus, setlivingStatus] = useState('');
  const [CurrentCity, setCurrentCity] = useState('');
  const [profileCreated, setProfileCreated] = useState('');
  const [fatherIncome, setfatherIncome] = useState('');
  const [motherIncome, setmotherIncome] = useState('');
  const [familyType, setfamilyType] = useState('');
  const [cooking, setCooking] = useState('');
  const [partnerDietHabit, setpartnerDietHabit] = useState('');
  const [smokingStatus, setsmokingStatus] = useState('');
  const [drinkingHabit, setdrinkingHabit] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [peoplePosition, setPeoplePosition] = useState(null);
  const [Occupation, setOccupation] = useState('');
  const [fatheroccupation, setFatheroccupation] = useState('');
  const [motheroccupation, setMotheroccupation] = useState('');
  const [Qualification, setQualification] = useState('');
  const [minHeightFeet, setMinHeightFeet] = useState('');
  const [maxHeightFeet, setMaxHeightFeet] = useState('');
  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');

  const feetData = Array.from({ length: 5 }, (_, i) => ({
    label: `${3 + i} ft`,
    value: `${3 + i}`,
  }));

  const weightData = Array.from({ length: 50 }, (_, i) => ({
    label: `${40 + i} kg`,
    value: `${40 + i}`,
  }));

  const OccupationData = [
    { label: 'Defence', value: 'Defence' }, 
    { label: 'Artist', value: 'Artist' }, 
    { label: 'Private Job / Employee', value: 'Private Job / Employee' },
    { label: 'Government Job / Employee', value: 'Government Job / Employee' },
    { label: 'Self Employed', value: 'Self Employed' },
    { label: 'Freelancer', value: 'Freelancer' },
    { label: 'Agriculture Professional', value: 'Agriculture Professional' },
    { label: 'Business Owner / Entrepreneur', value: 'Business Owner / Entrepreneur' },
    { label: 'Officer', value: 'Officer' },
    { label: 'Software Professional', value: 'Software Professional' },
    { label: 'Education Professional', value: 'Education Professional' },
    { label: 'Medical & Healthcare Professional', value: 'Medical & Healthcare Professional' },
    { label: 'Doctor / Surgeon', value: 'Doctor / Surgeon' },
    { label: 'Marketing Professional', value: 'Marketing Professional' },
    { label: 'Politician', value: 'Politician' },
    { label: 'Research Scholar', value: 'Research Scholar' },
    { label: 'Retired', value: 'Retired' },
    { label: 'Not Working', value: 'Not Working' },
    { label: 'Other', value: 'Other' }
];


  const QualificationData = [
    { label: 'High School', value: 'High School' },
    { label: 'Diploma', value: 'Diploma' },
    { label: 'Bachelor\'s Degree', value: 'Bachelor\'s Degree' },
    { label: 'Master\'s Degree', value: 'Master\'s Degree' },
    { label: 'Doctorates', value: 'Doctorates' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'CA/CS', value: 'CA/CS' },
    { label: 'MBBS', value: 'MBBS' },
    { label: 'Law', value: 'Law' },
    { label: 'Other', value: 'Other' },
  ];
  
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handlePress = (buttonName) => {
    setSelectedButton(buttonName);
    navigation.navigate(buttonName);
  };

  const maritalStatusData = [
    { label: 'Unmarried', value: 'Unmarried' },
    { label: 'Widow', value: 'Widow' },
    { label: 'Divorcee', value: 'Divorcee' },
    { label: 'Divorcee', value: 'Divorcee' },
    { label: 'Annulled', value: 'Annulled' }
  ];

  const ManglikStatusData = [
    { label: 'Purna Manglik', value: 'Purna Manglik' },
    { label: 'Anshik Manglik', value: 'Anshik Manglik' },
    { label: 'Doesn’t Matter', value: 'Doesn’t Matter' },
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
    { label: 'Abroad', value: 'Abroad' },
    { label: 'India', value: 'India' },
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
  const Income = [
    { label: 'Less than ₹1 Lakh', value: '<1L' },
    { label: '₹1 Lakh - ₹5 Lakh', value: '1L-5L' },
    { label: '₹5 Lakh - ₹10 Lakh', value: '5L-10L' },
    { label: '₹10 Lakh - ₹20 Lakh', value: '10L-20L' },
    { label: 'Above ₹20 Lakh', value: '>20L' },
  ]

  const FamilyType = [
    { label: 'Nuclear Family', value: 'Nuclear Family' },
    { label: 'Joint Family', value: 'Joint Family' },
    { label: 'Extended Family', value: 'Extended Family' },
  ]
  const CookingStatus = [
    { label: 'yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ]
  const DietHabit = [
    { label: 'Vegetarian', value: 'Vegetarian' },
    { label: 'Non-Vegetarian', value: 'Non-Vegetarian' },
    { label: 'Eggetarian', value: 'Eggetarian' },
    { label: 'Doesn’t Matter', value: 'Doesn’t Matter' },
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

  const PeoplePosition = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Activist', value: 'Activist' },
    { label: 'Pandit', value: 'Pandit' },
    { label: 'Kathavachak', value: 'Kathavachak' },
    { label: 'Jyotish', value: 'Jyotish' },
    { label: 'Member', value: 'Member' },
  ]

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
          <Text style={styles.headerText}>Matrimony Profile</Text>
           <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownContainer}>
            <AntDesign name={'caretdown'} color={Colors.theme_color} size={15} />
          </TouchableOpacity>
          {dropdownVisible && (
            <Dropdown
              style={styles.heightinput}
              data={PeoplePosition}
              labelField="label"
              valueField="value"
              value={peoplePosition}
              onChange={(item) => {
                setPeoplePosition(item.value);
                setDropdownVisible(false);
              }}
              placeholder="Select"
            />
          )}
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

          </View>

          <View style={styles.IconFlex}>
            <TouchableOpacity
              style={styles.IconsButton}
              onPress={() => handlePress('DetailedProfile')}
            >
              <AntDesign
                name={'user'}
                color={selectedButton === 'DetailedProfile' ? 'white' : Colors.theme_color}
                size={25}
                style={selectedButton === 'DetailedProfile' ? styles.Selectedicon : styles.icon}
              />
              <Text style={styles.logotext}>Detailed Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.IconsButton}
              onPress={() => handlePress('PartnersPreference')}
            >
              <FontAwesome5
                name={'user-friends'}
                color={selectedButton === 'PartnersPreference' ? 'white' : Colors.theme_color}
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
                color={selectedButton === 'PhotoGallery' ? 'white' : Colors.theme_color}
                size={25}
                style={selectedButton === 'PhotoGallery' ? styles.Selectedicon : styles.icon}
              />
              <Text style={styles.logotext}>Photo Gallery</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
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
                <View style={styles.row}>
                  <Dropdown
                    style={styles.dropdown}
                    data={feetData}
                    labelField="label"
                    valueField="value"
                    value={minHeightFeet}
                    onChange={(item) => setMinHeightFeet(item.value)}
                    placeholder="Min Height"
                  />
                  <Dropdown
                    style={styles.dropdown}
                    data={feetData}
                    labelField="label"
                    valueField="value"
                    value={maxHeightFeet}
                    onChange={(item) => setMaxHeightFeet(item.value)}
                    placeholder="Max Height"
                  />
                </View>
              </View>

              {/* Weight */}
              <View>
                <Text style={styles.inputHeading}>Weight (in kg)</Text>
                <View style={styles.row}>
                  <Dropdown
                    style={styles.dropdown}
                    data={weightData}
                    labelField="label"
                    valueField="value"
                    value={minWeight}
                    onChange={(item) => setMinWeight(item.value)}
                    placeholder="Min Weight"
                  />
                  <Dropdown
                    style={styles.dropdown}
                    data={weightData}
                    labelField="label"
                    valueField="value"
                    value={maxWeight}
                    onChange={(item) => setMaxWeight(item.value)}
                    placeholder="Max Weight"
                  />
                </View>
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
                <TextInput style={styles.input1} multiline={true} numberOfLines={6} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Mobile no.</Text>
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
                <Dropdown
                  style={styles.input}
                  data={OccupationData}
                  labelField="label"
                  valueField="value"
                  value={fatheroccupation}
                  onChange={item => setFatheroccupation(item.value)}
                  placeholder="Select occupdation"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>Father Income (Annually)</Text>
                <Dropdown
                  style={styles.input}
                  data={Income}
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
                <Dropdown
                  style={styles.input}
                  data={OccupationData}
                  labelField="label"
                  valueField="value"
                  value={motheroccupation}
                  onChange={item => setMotheroccupation(item.value)}
                  placeholder="Select occupdation"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>Mother Income (Annually)</Text>
                <Dropdown
                  style={styles.input}
                  data={Income}
                  labelField="label"
                  valueField="value"
                  value={motherIncome}
                  onChange={item => setmotherIncome(item.value)}
                  placeholder="Select Income"
                />
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
    </SafeAreaView>
  );
};

export default DetailedProfile;
