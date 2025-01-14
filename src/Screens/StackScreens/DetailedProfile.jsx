import { Text, View, Image, ImageBackground, TextInput, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/ProfileStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-element-dropdown';
import { CREATE_BIODATA, UPDATE_BIODATA } from '../../utils/BaseUrl';
import axios from 'axios';
import {
  OccupationData, QualificationData, maritalStatusData, ManglikStatusData, gotraData, MotherGotraData, LivingData,
  ProfileCreatedData, CityData, Income, FamilyType, CookingStatus, DietHabit, smokingStatusData, DrinkingHabit, PeoplePosition
} from '../../DummyData/DropdownData';

const DetailedProfile = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState('DetailedProfile');
  const [peoplePosition, setPeoplePosition] = useState(null);
  const [personalDetail, setpersonalDetail] = useState('');

  const [fullname, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [ability, setAbility] = useState('');
  const [minHeightFeet, setMinHeightFeet] = useState('');
  const [maxHeightFeet, setMaxHeightFeet] = useState('');
  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');
  const [complexion, setComplexion] = useState('');
  const [ManglikStatus, setManglikStatus] = useState('');
  const [nadi, setNadi] = useState('');
  const [gotra, setGotra] = useState('');
  const [Mothergotra, setMotherGotra] = useState('');
  const [Qualification, setQualification] = useState('');
  const [Occupation, setOccupation] = useState('');
  const [income, setIncome] = useState('');
  const [livingStatus, setlivingStatus] = useState('');
  const [CurrentCity, setCurrentCity] = useState('');
  const [aboutme, setAboutme] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [profileCreatedBy, setProfileCreatedBy] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [fatheroccupation, setFatheroccupation] = useState('');
  const [motherName, setMotherName] = useState('');
  const [motheroccupation, setMotheroccupation] = useState('');
  const [fatherIncome, setfatherIncome] = useState('');
  const [motherIncome, setmotherIncome] = useState('');
  const [OtherFamilyOccupation, setOtherFamilyOccupation] = useState('');
  const [familyType, setfamilyType] = useState('');
  const [Siblings, setSiblings] = useState('');
  const [familyInfo, setFamilyInfo] = useState('');
  const [fatherMobileNumber, setfatherMobileNumber] = useState('');
  const [motherMobileNumber, setmotherMobileNumber] = useState('');
  const [familyMobileNumber, setfamilyMobileNumber] = useState('');
  const [parmanentAddress, setparmanentAddress] = useState('');
  const [residentialAddress, setresidentialAddress] = useState('');
  const [cooking, setCooking] = useState('');
  const [partnerDietHabit, setpartnerDietHabit] = useState('');
  const [smokingStatus, setsmokingStatus] = useState('');
  const [drinkingHabit, setdrinkingHabit] = useState('');
  const [hobbies, sethobbies] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const feetData = Array.from({ length: 5 }, (_, i) => ({
    label: `${3 + i} ft`,
    value: `${3 + i}`,
  }));

  const weightData = Array.from({ length: 50 }, (_, i) => ({
    label: `${40 + i} kg`,
    value: `${40 + i}`,
  }));

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handlePress = (buttonName) => {
    setSelectedButton(buttonName);
    navigation.navigate(buttonName);
  };

  // create bio data api 

  // const createBiodata = async () => {
  //   try {
  //   const payload = {
  //     fullname:fullname,
  //     dob:dob,
  //     birthPlace:birthPlace,
  //     maritalStatus:maritalStatus,
  //     ability:ability,
  //     minHeightFeet:minHeightFeet,
  //     maxHeightFeet:maxHeightFeet,
  //     minWeight:minWeight,
  //     maxWeight:maxWeight,
  //     complexion:complexion,
  //     ManglikStatus:ManglikStatus,
  //     nadi:nadi,
  //     gotra:gotra,
  //     Mothergotra:Mothergotra,
  //     Qualification:Qualification,
  //     Occupation:Occupation,
  //     income:income,
  //     livingStatus:livingStatus,
  //     CurrentCity:CurrentCity,
  //     aboutme:aboutme,
  //     mobileNumber:mobileNumber,
  //     profileCreatedBy:profileCreatedBy,
  //     fatherName:fatherName,
  //     fatheroccupation:fatheroccupation,
  //     motherName:motherName,
  //     motheroccupation:motheroccupation,
  //     fatherIncome:fatherIncome,
  //     motherIncome:motherIncome,
  //     OtherFamilyOccupation:OtherFamilyOccupation,
  //     familyType:familyType,
  //     Siblings:Siblings,
  //     familyInfo:familyInfo,
  //     fatherMobileNumber:fatherMobileNumber,
  //     motherMobileNumber:motherMobileNumber,
  //     familyMobileNumber:familyMobileNumber,
  //     parmanentAddress:parmanentAddress,
  //     residentialAddress:residentialAddress,
  //     cooking:cooking,
  //     partnerDietHabit:partnerDietHabit,
  //     smokingStatus:smokingStatus,
  //     drinkingHabit:drinkingHabit,
  //     hobbies:hobbies,
  //   };
    
  //   const response = await axios.post(CreateBioData, payload);

  //   }
  //   catch (error) {
  //     console.log("error", error);
  //   }
  // }

  // update bio data 

  // const updateBiodata = async () => {
  //   try {
  //     const payload = {
  //       fullname:fullname,
  //       dob:dob,
  //       birthPlace:birthPlace,
  //       maritalStatus:maritalStatus,
  //       ability:ability,
  //       minHeightFeet:minHeightFeet,
  //       maxHeightFeet:maxHeightFeet,
  //       minWeight:minWeight,
  //       maxWeight:maxWeight,
  //       complexion:complexion,
  //       ManglikStatus:ManglikStatus,
  //       nadi:nadi,
  //       gotra:gotra,
  //       Mothergotra:Mothergotra,
  //       Qualification:Qualification,
  //       Occupation:Occupation,
  //       income:income,
  //       livingStatus:livingStatus,
  //       CurrentCity:CurrentCity,
  //       aboutme:aboutme,
  //       mobileNumber:mobileNumber,
  //       profileCreatedBy:profileCreatedBy,
  //       fatherName:fatherName,
  //       fatheroccupation:fatheroccupation,
  //       motherName:motherName,
  //       motheroccupation:motheroccupation,
  //       fatherIncome:fatherIncome,
  //       motherIncome:motherIncome,
  //       OtherFamilyOccupation:OtherFamilyOccupation,
  //       familyType:familyType,
  //       Siblings:Siblings,
  //       familyInfo:familyInfo,
  //       fatherMobileNumber:fatherMobileNumber,
  //       motherMobileNumber:motherMobileNumber,
  //       familyMobileNumber:familyMobileNumber,
  //       parmanentAddress:parmanentAddress,
  //       residentialAddress:residentialAddress,
  //       cooking:cooking,
  //       partnerDietHabit:partnerDietHabit,
  //       smokingStatus:smokingStatus,
  //       drinkingHabit:drinkingHabit,
  //       hobbies:hobbies,
  //     };
  //     const response = await axios.post(UPDATE_BIODATA, payload);

  //   }
  //   catch (error) {
  //     console.log("error", error);
  //   }
  // }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
                <Text style={styles.inputHeading} value={fullname} onchange={item => setFullName(item.value)}>Full Name</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading} value={dob} onchange={item => setDob(item.value)}>Date of Birth</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading} value={birthPlace} onchange={item => setBirthPlace(item.value)}>Place of Birth</Text>
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
                <Text style={styles.inputHeading} value={ability} onchange={item => setAbility(item.value)}>
                  Special Ability (physical, mental, etc.)</Text>
                <TextInput style={styles.input} />
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
                <Text style={styles.inputHeading} value={complexion} onchange={item => setComplexion(item.value)}>Complexion</Text>
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
                <Text style={styles.inputHeading} value={nadi} onchange={item => setNadi(item.value)}>Nadi</Text>
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
                <Text style={styles.inputHeading} value={income} onchange={item => setIncome(item.value)}>Income (Annually)</Text>
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
                <Text style={styles.inputHeading} value={aboutme} onchange={item => setAboutme(item.value)}>About Me</Text>
                <TextInput style={styles.input1} multiline={true} numberOfLines={6} />
              </View>
              <View>
                <Text style={styles.inputHeading} value={mobileNumber} onchange={item => setMobileNumber(item.value)}>Mobile no.</Text>
                <TextInput style={styles.input} multiline={true} numberOfLines={6} />
              </View>

              <View>
                <Text style={styles.inputHeading}>Profile created by</Text>
                <Dropdown
                  style={styles.input}
                  data={ProfileCreatedData}
                  labelField="label"
                  valueField="value"
                  value={profileCreatedBy}
                  onChange={item => setProfileCreatedBy(item.value)}
                  placeholder="Select Person"
                />
              </View>
            </View>
            <Text style={styles.headText}>Family details </Text>
            <View>
              <View>
                <Text style={styles.inputHeading} value={fatherName} onchange={item => setFatherName(item.value)}>Father Full Name</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading} value={motherName} onchange={item => setMotherName(item.value)}>Mother Full Name</Text>
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
                <Dropdown
                  style={styles.input}
                  data={OccupationData}
                  labelField="label"
                  valueField="value"
                  value={OtherFamilyOccupation}
                  onChange={item => setOtherFamilyOccupation(item.value)}
                  placeholder="Select occupdation"
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
                <Text style={styles.inputHeading} value={Siblings} onchange={item => setSiblings(item.value)}>Siblings</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading} value={familyInfo} onchange={item => setFamilyInfo(item.value)}>Any family member info. (optinal)</Text>
                <TextInput style={styles.input} multiline={true} numberOfLines={6} />
              </View>
              <View>
                <Text style={styles.inputHeading} value={fatherMobileNumber} onchange={item => setfatherMobileNumber(item.value)}>Father Mobile no.</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading} value={motherMobileNumber} onchange={item => setmotherMobileNumber(item.value)}>Mother Mobile no.</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading} value={familyMobileNumber} onchange={item => setfamilyMobileNumber(item.value)}>Family member Mobile no.</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading} value={parmanentAddress} onchange={item => setparmanentAddress(item.value)}>Permanent Address</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading} value={residentialAddress} onchange={item => setresidentialAddress(item.value)}>Residential Address</Text>
                <TextInput style={styles.input} />
              </View>
              <Text style={styles.headText} value={personalDetail} onchange={item => setpersonalDetail(item.value)} >Other Personal Detail</Text>
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
                <Text style={styles.inputHeading} value={hobbies} onchange={item => sethobbies(item.value)}>Your Hobbies</Text>
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
