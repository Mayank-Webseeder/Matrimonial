import { StyleSheet, Text, View, Image, ImageBackground, TextInput, ScrollView } from 'react-native'
import React,{useState} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/ProfileStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';
const Profile = ({navigation}) => {
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
         <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
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
                <Text style={styles.inputHeading}>Nadi</Text>
                <TextInput style={styles.input} />
              </View>
              <View>
                <Text style={styles.inputHeading}>Gotra (self)</Text>
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{ManglikStatus}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={gotra}
                  onValueChange={(itemValue) => setGotra(itemValue)}
                >
                  <Picker.Item label="pooja" value="pooja" />
                </Picker>
              </View>
              </View>
              <View>
                <Text style={styles.inputHeading}>Gotra (Mother)</Text>
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{Mothergotra}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={maritalStatus}
                  onValueChange={(itemValue) => setMotherGotra(itemValue)}
                >
                 <Picker.Item label="01" value="01" />
                 <Picker.Item label="02" value="02" />
                 <Picker.Item label="03" value="03" />
                </Picker>
              </View>
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
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{livingStatus}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={maritalStatus}
                  onValueChange={(itemValue) => setlivingStatus(itemValue)}
                >
                 <Picker.Item label="yes" value="yes" />
                 <Picker.Item label="no" value="no" />
                </Picker>
              </View>
              </View>
              <View>
                <Text style={styles.inputHeading}>Which city do you currently living?</Text>
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{CurrentCity}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={maritalStatus}
                  onValueChange={(itemValue) => setCurrentCity(itemValue)}
                >
                 <Picker.Item label="indore" value="indore" />
                 <Picker.Item label="jaipur" value="jaipur" />
                 <Picker.Item label="Ahmedabad" value="Ahmedabad" />
                </Picker>
              </View>
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
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{profileCreated}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={profileCreated}
                  onValueChange={(itemValue) => setProfileCreated(itemValue)}
                >
                 <Picker.Item label="father" value="father" />
                 <Picker.Item label="mother" value="mother" />
                 <Picker.Item label="sister" value="sister" />
                 <Picker.Item label="brother" value="brother" />
                </Picker>
              </View>
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
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{fatherIncome}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={fatherIncome}
                  onValueChange={(itemValue) => setfatherIncome(itemValue)}
                >
                 <Picker.Item label="single" value="single" />
                 <Picker.Item label="double" value="double" />
                </Picker>
              </View>
              </View>
              <View>
                <Text style={styles.inputHeading}>Family Type</Text>
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{familyType}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={familyType}
                  onValueChange={(itemValue) => setfamilyType(itemValue)}
                >
                 <Picker.Item label="joint" value="joint" />
                 <Picker.Item label="not joint" value="not joint" />
                </Picker>
              </View>
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
                <View style={styles.input}>
                 <View style={styles.flex}>
                 <Text>{cooking}</Text>
                 <AntDesign name={'down'} color={Colors.dark} size={20} />
                 </View>
                <Picker
                  selectedValue={cooking}
                  onValueChange={(itemValue) => setCooking(itemValue)}
                >
                 <Picker.Item label="yes" value="yes" />
                 <Picker.Item label="no" value="no" />
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
                 <Picker.Item label="Doesn’t Matter" value="Doesn’t Matter" />
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
                 <Picker.Item label="Occasionally" value="Occasionally" />
                 <Picker.Item label="Doesn’t Matter" value="Doesn’t Matter" />
                </Picker>
              </View>
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
