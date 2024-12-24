import { Text, View, FlatList, TouchableOpacity, TextInput  } from 'react-native'
import React,{useState} from 'react'
import { slider ,DharamsalaData } from '../../DummyData/DummyData'
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/DharmshalaStyle';
import Colors from '../../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const Dharmshala = ({ navigation }) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('DharamsalaDetail')}>
        <View style={styles.cardData}>
          <Image source={item.image} style={styles.image} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.smalltext}>{item.subcaste}</Text>
            <Text style={styles.smalltext}>{item.city}</Text>
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
            <MaterialIcons name="call" size={20} color={Colors.light} />
            <Text style={styles.buttonText}>Request for call</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')} style={{ flexDirection: "row" }}>
          <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} />
          <Text style={{ color: Colors.theme_color }}>Community</Text>
        </TouchableOpacity>
        <AntDesign name={'camerao'} size={20} color={Colors.theme_color} />
      </View>
      <View style={styles.searchContainer}>
      <View style={styles.searchbar}>
        <TextInput placeholder='Search in Your city' placeholderTextColor={'gray'} />
      </View>
      <TouchableOpacity style={styles.filterContainer} onPress={()=>navigation.navigate('Filter')}>
      <FontAwesome name={'filter'} size={20} color={'gray'} />
        <Text>Filter</Text>
      </TouchableOpacity>
      </View>
     
    <View style={styles.mainContainer}/>
      <FlatList
        data={slider}
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
    <FlatList
  data={DharamsalaData}
  renderItem={renderItem}
  keyExtractor={(item) => item.id.toString()}
  scrollEnabled={true}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.DharamSalaList}
/>

    </View>
  )
}

export default Dharmshala