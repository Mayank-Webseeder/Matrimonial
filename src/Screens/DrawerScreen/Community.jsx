import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { slider, CommitteeDataList } from '../../DummyData/DummyData'
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/CommunityStyle';
import Colors from '../../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const Community = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState(null);
  const handleFilter=()=>{
    setActiveButton(1)
    navigation.navigate('CommunityFilter');
  }
  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardData}>
          <Image source={item.image} style={styles.image} />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={styles.text}>{item.name}</Text>
            <View style={styles.CityArea}>
              <Text style={styles.text}>{item.city}</Text>
              <Text style={styles.text}>{item.subcaste}</Text>
              <Text style={styles.text}>{item.area}</Text>
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
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')} style={{ flexDirection: "row" }}>
          <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} />
          <Text style={{ color: Colors.theme_color }}>Community</Text>
        </TouchableOpacity>
        <AntDesign name={'bells'} size={20} color={Colors.theme_color} onPress={()=>{navigation.navigate('Notification')}}/>
      </View>
      <View style={styles.searchbar}>
        <AntDesign name={'search1'} size={20} color={'gray'} />
        <TextInput placeholder='Search in Your city' placeholderTextColor={'gray'} />
      </View>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 1 ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={handleFilter}
        >
          <Text style={activeButton === 1 ? styles.activeText : styles.inactiveText}>
            Filter
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 2 ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => setActiveButton(2)}
        >
          <Text style={activeButton === 2 ? styles.activeText : styles.inactiveText}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer} />
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
        data={CommitteeDataList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.panditListData}
      />

    </View>
  )
}

export default Community