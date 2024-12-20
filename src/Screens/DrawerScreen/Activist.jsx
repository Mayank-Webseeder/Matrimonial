import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import {ActivistData } from '../../DummyData/DummyData'
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/ActivistStyle';
import Colors from '../../utils/Colors';

const Activist = ({ navigation }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardData}>
          <Image source={item.image} style={styles.image} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.smalltext}>{item.subcaste}</Text>
          
            <Text style={styles.smalltext}>{item.city}</Text>
          </View>
        </View>
        <View>
        <TouchableOpacity style={styles.Button}>
            <Text style={styles.buttonText}>connect</Text>
          </TouchableOpacity>
        </View>
       
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')} style={{ flexDirection: "row" }}>
          <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} />
          <Text style={{ color: Colors.theme_color }}>Activist</Text>
        </TouchableOpacity>
       <View style={{ flexDirection: "row" }}>
       <AntDesign name="search1" size={20} color={Colors.theme_color} />
       <AntDesign name={'bells'} size={20} color={Colors.theme_color} onPress={()=>{navigation.navigate('Notification')}}/>
       </View>
      </View>
      <View style={styles.searchbar}>
        <AntDesign name={'search1'} size={20} color={'gray'} />
        <TextInput placeholder='Search in Your city' placeholderTextColor={'gray'} />
      </View>
      <View style={styles.ButtonContainer}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Filter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}> Be an Activist</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.mainContainer}/>
    <FlatList
  data={ActivistData}
  renderItem={renderItem}
  keyExtractor={(item) => item.id.toString()}
  scrollEnabled={true}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.panditListData}
/>

    </View>
  )
}

export default Activist