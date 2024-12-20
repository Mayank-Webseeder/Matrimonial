import React from 'react';
import { View, TouchableOpacity, Image, Text,FlatList } from 'react-native';
import styles from '../StyleScreens/DharamsalaDetailStyle';
import Colors from '../../utils/Colors';
import { DharamsalaSlider } from '../../DummyData/DummyData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DharamsalaDetail = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Dharmshala')}>
          <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} />
        </TouchableOpacity>
        <Text style={styles.text}>Hotel NH Valencia Center</Text>
      </View>
      <FlatList
        data={DharamsalaSlider}
        renderItem={({ item }) => {
          return (
            <View style={styles.sliderContainer}>
            <Image
              source={item.image}
              style={styles.sliderImage}
            />
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.textContainer}>
       <Text style={styles.TextView}><Text style={styles.descriptionText}>Hotel NH Valencia Center</Text></Text>
       <View style={styles.TextView}><Text style={styles.descriptionText}>Sub-Caste Name</Text></View>
        <View style={styles.TextView}>
            <Text>Address</Text>
            <Text>Mira road,Bombay, India</Text>
        </View>
        <View style={styles.TextView}>
            <Text style={styles.descriptionText}>Description</Text>
            <Text>This hotel has a terrace and a small rooftop pool, open all year round. Located opposite the Valencia Botanical Garden and the Nuevo Centro shopping centre, the property also has a gym and sauna.</Text>
       <Text>In addition, NH Valencia Center is a 5-minute walk from Túria Metro Station, offering easy access to the center of Valencia. Guests enjoy a 20% discount on a public car park that can be accessed directly from the hotel.</Text>
        </View>
      </View>
      <View style={styles.sharecontainer}>
          <View style={styles.iconContainer}>
            <FontAwesome name="bookmark-o" size={20} color={Colors.dark} />
            <Text style={styles.iconText}>Save</Text>
          </View>

          <View style={styles.iconContainer}>
            <Feather name="send" size={20} color={Colors.dark} />
            <Text style={styles.iconText}>Shares</Text>
          </View>
          <TouchableOpacity style={styles.Button}>
            <AntDesign name="phone" size={10} color={Colors.light} />
            <Text style={styles.buttonText}>Request for call</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default DharamsalaDetail;
