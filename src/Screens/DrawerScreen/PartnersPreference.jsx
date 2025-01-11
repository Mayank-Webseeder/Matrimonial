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
  const [subCaste, setSubCaste] = useState('');
  const [BodyStructure, setBodyStructure] = useState('');
  const [selectedButton, setSelectedButton] = useState('PartnersPreference');
  const [state, setState] = useState('');
  const [village, setVillage] = useState('');
  const [minIncome, setMinIncome] = useState('');
  const [maxIncome, setMaxIncome] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [minHeightFeet, setMinHeightFeet] = useState('');
  const [maxHeightFeet, setMaxHeightFeet] = useState('');
  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');
  const [familyIncome, setFamilyIncome] = useState('');
  const [familyFinancialStatus, setFamilyFinancialStatus] = useState('');
 
  const [familyType, setFamilyType] = useState('');
 
  const ageData = Array.from({ length: 18 }, (_, i) => ({
    label: `${18 + i}`,
    value: `${18 + i}`,
  }));

  const feetData = Array.from({ length: 5 }, (_, i) => ({
    label: `${3 + i} ft`,
    value: `${3 + i}`,
  }));

  const weightData = Array.from({ length: 50 }, (_, i) => ({
    label: `${40 + i} kg`,
    value: `${40 + i}`,
  }));

  const incomeData = Array.from({ length: 20 }, (_, i) => ({
    label: `${(i + 1) * 10000} INR`,
    value: `${(i + 1) * 10000}`,
  }));


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

  const FamilyTypeData = [
    { label: 'Nuclear Family', value: 'Nuclear Family' },
    { label: 'Joint Family', value: 'Joint Family' },
    { label: 'Extended Family', value: 'Extended Family' },
  ];

  const FamilyFinancialStatusData = [
    { label: 'Lower Class', value: 'Lower Class' },
    { label: 'Middle Class', value: 'Middle Class' },
    { label: 'Upper Middle Class', value: 'Upper Middle Class' },
    { label: 'Upper Class', value: 'Upper Class' },
  ];

  const FamilyIncomeData = [
    { label: 'Less than ₹1 Lakh', value: '<1L' },
    { label: '₹1 Lakh - ₹5 Lakh', value: '1L-5L' },
    { label: '₹5 Lakh - ₹10 Lakh', value: '5L-10L' },
    { label: '₹10 Lakh - ₹20 Lakh', value: '10L-20L' },
    { label: 'Above ₹20 Lakh', value: '>20L' },
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


  const subCasteOptions = [
    { label: 'subCaste1', value: 'subCaste1' },
    { label: 'subCaste2', value: 'subCaste2' },
    { label: 'subCaste3', value: 'subCaste3' },
  ];

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
                <Text style={styles.inputHeading}>Sub Caste</Text>
                <Dropdown
                  style={styles.input}
                  data={subCasteOptions}
                  labelField="label"
                  valueField="value"
                  value={subCaste}
                  onChange={item => setSubCaste(item.value)}
                  placeholder="Select status"
                />
              </View>
              <View>
                <Text style={styles.inputHeading}>Age Criteria</Text>
                <View style={styles.row}>
                  <Dropdown
                    style={styles.dropdown}
                    data={ageData}
                    labelField="label"
                    valueField="value"
                    value={minAge}
                    onChange={(item) => setMinAge(item.value)}
                    placeholder="Min Age"
                  />
                  <Dropdown
                    style={styles.dropdown}
                    data={ageData}
                    labelField="label"
                    valueField="value"
                    value={maxAge}
                    onChange={(item) => setMaxAge(item.value)}
                    placeholder="Max Age"
                  />
                </View>
              </View>

              {/* Height */}
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
                <Text style={styles.inputHeading}>Income Range (in INR)</Text>
                <View style={styles.row}>
                  <Dropdown
                    style={styles.dropdown}
                    data={incomeData}
                    labelField="label"
                    valueField="value"
                    value={minIncome}
                    onChange={(item) => setMinIncome(item.value)}
                    placeholder="Min Income"
                  />
                  <Dropdown
                    style={styles.dropdown}
                    data={incomeData}
                    labelField="label"
                    valueField="value"
                    value={maxIncome}
                    onChange={(item) => setMaxIncome(item.value)}
                    placeholder="Max Income"
                  />
                </View>
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
                <Text style={styles.inputHeading}>Family Type</Text>
                <Dropdown
                  style={styles.input}
                  data={FamilyTypeData}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Family Type"
                  value={familyType}
                  onChange={(item) => setFamilyType(item.value)}
                />
              </View>

              <View>
                <Text style={styles.inputHeading}>Family Financial Status</Text>
                <Dropdown
                  style={styles.input}
                  data={FamilyFinancialStatusData}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Family Financial Status"
                  value={familyFinancialStatus}
                  onChange={(item) => setFamilyFinancialStatus(item.value)}
                />
              </View>

              <View>
                <Text style={styles.inputHeading}>Family Income</Text>
                <Dropdown
                  style={styles.input}
                  data={FamilyIncomeData}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Family Income"
                  value={familyIncome}
                  onChange={(item) => setFamilyIncome(item.value)}
                />
              </View>

              <View>
                <Text style={styles.inputHeading}>Expectations from Partner</Text>
                <TextInput style={styles.input1} multiline={true} numberOfLines={6} />
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
