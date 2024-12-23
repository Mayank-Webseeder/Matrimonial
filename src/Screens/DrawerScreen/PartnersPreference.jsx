import { StyleSheet, Text, View, Image, ImageBackground, TextInput, ScrollView } from 'react-native'
import React,{useState} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/PartnerPreferenceStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';
const PartnersPreference = ({navigation}) => {
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
  const [Occupation,setOccupation]=useState('');
  const [Qualification,setQualification]=useState('');
  const [Complexion,setComplexion]=useState('');
  const [disaAbility,setdisaAbility]=useState('');
  const [PartnersLivein,setPartnersLivein]=useState('');
const  [District,setDistrict]=useState('');
const  [BodyStructure,setBodyStructure]=useState('');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
        <TouchableOpacity onPress={()=>navigation.navigate()}>
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
            <TouchableOpacity style={styles.IconsButton}>
              <AntDesign name={'user'} color={Colors.theme_color} size={25} style={styles.icon} />
              <Text style={styles.logotext}>Detailed Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.IconsButton}>
              <FontAwesome5 name={'user-friends'} color={Colors.theme_color} size={25} style={styles.icon} />
              <Text style={styles.logotext}>Partner Preference</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.IconsButton}>
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
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{maritalStatus}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={maritalStatus}
                  onValueChange={(itemValue) => setMaritalStatus(itemValue)}
                >
                  <Picker.Item label="Unmarried" value="Unmarried" />
                  <Picker.Item label="Widow" value="Widow" />
                  <Picker.Item label="Divorcee" value="Divorcee" />
                  <Picker.Item label="Doesn’t Matter" value="Doesn't Matter" />
                </Picker>
              </View>
              </View>
              <View>
                <Text style={styles.inputHeading}>Income</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Occupation</Text>
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{Occupation}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={Occupation}
                  onValueChange={(itemValue) => setOccupation(itemValue)}
                >
                  <Picker.Item label="Nigeria" value="Nigeria" />
                </Picker>
              </View>
              </View>
              <View>
                <Text style={styles.inputHeading}>Qualification</Text>
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{Qualification}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={Qualification}
                  onValueChange={(itemValue) => setQualification(itemValue)}
                >
                  <Picker.Item label="Nigeria" value="Nigeria" />
                </Picker>
              </View>
              </View>
              <View>
                <Text style={styles.inputHeading}>Disabilities (Physical/Mental)</Text>
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{disaAbility}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={disaAbility}
                  onValueChange={(itemValue) => setdisaAbility(itemValue)}
                >
                  <Picker.Item label="Yes" value="Yes" />
                  <Picker.Item label="No" value="No" />
                  <Picker.Item label="Doesn’t Matter" value="Doesn’t Matter" />
                </Picker>
              </View>
              </View>
              <View>
                <Text style={styles.inputHeading}>Manglik Status</Text>
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{ManglikStatus}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={ManglikStatus}
                  onValueChange={(itemValue) => setManglikStatus(itemValue)}
                >
                  <Picker.Item label="pooja" value="pooja" />
                </Picker>
              </View>
              </View>
              <View>
                <Text style={styles.inputHeading}>Partners Livein</Text>
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{PartnersLivein}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={PartnersLivein}
                  onValueChange={(itemValue) => setPartnersLivein(itemValue)}
                >
                  <Picker.Item label="Abroad" value="Abroad" />
                  <Picker.Item label="India" value="India" />
                </Picker>
              </View>
              </View>
              <View>
                <Text style={styles.inputHeading}>District</Text>
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{District}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={District}
                  onValueChange={(itemValue) => setDistrict(itemValue)}
                >
                  <Picker.Item label="Barwani" value="Barwani" />
                  <Picker.Item label="Khargone" value="Khargone" />
                </Picker>
              </View>
              </View>
              <View>
                <Text style={styles.inputHeading}>Partners body Structure</Text>
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{BodyStructure}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={BodyStructure}
                  onValueChange={(itemValue) => setBodyStructure(itemValue)}
                >
                  <Picker.Item label="Slim" value="Slim" />
                  <Picker.Item label="Normal" value="Normal" />
                  <Picker.Item label="Fatty" value="Fatty" />
                  <Picker.Item label="Doesn’t Matter" value="Doesn’t Matter" />
                </Picker>
              </View>
              </View>
              <View>
                <Text style={styles.inputHeading}>Complexion</Text>
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{Complexion}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={Complexion}
                  onValueChange={(itemValue) => setComplexion(itemValue)}
                >
                  <Picker.Item label="Pale" value="Pale" />
                  <Picker.Item label="Fair" value="Fair" />
                  <Picker.Item label="Medium" value="Medium" />
                  <Picker.Item label="Olive" value="Olive" />
                  <Picker.Item label="Naturally brown " value="Naturally brown " />
                  <Picker.Item label="Dark Brown/Black" value="Dark Brown/Black" />
                  <Picker.Item label="Doesn’t Matter" value="Doesn’t Matter" />
                </Picker>
              </View>
              </View>
              <View>
                <Text style={styles.inputHeading}>Partner Dietary Habits</Text>
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{partnerDietHabit}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={drinkingHabit}
                  onValueChange={(itemValue) => setpartnerDietHabit(itemValue)}
                >
                 <Picker.Item label="yes" value="yes" />
                 <Picker.Item label="no" value="no" />
                </Picker>
              </View>
              </View>
              <View>
                <Text style={styles.inputHeading}>Smoking Habits</Text>
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{smokingStatus}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={drinkingHabit}
                  onValueChange={(itemValue) => setsmokingStatus(itemValue)}
                >
                 <Picker.Item label="yes" value="yes" />
                 <Picker.Item label="no" value="no" />
                </Picker>
              </View>
              </View>
              <View>
                <Text style={styles.inputHeading}>Drinking Habits</Text>
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{drinkingHabit}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={drinkingHabit}
                  onValueChange={(itemValue) => setdrinkingHabit(itemValue)}
                >
                 <Picker.Item label="yes" value="yes" />
                 <Picker.Item label="no" value="no" />
                </Picker>
              </View>
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
