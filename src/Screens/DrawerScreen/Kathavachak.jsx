import { Text, View, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React,{useState} from 'react'
import { PanditData, slider } from '../../DummyData/DummyData'
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/PanditJyotish';
import Colors from '../../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Rating } from 'react-native-ratings';
const Kathavachak = ({ navigation }) => {
   const [activeButton, setActiveButton] = useState(null);
  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardData}>
          <Image source={item.image} style={styles.image} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>{item.name}</Text>
            <View style={styles.rating}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={15}
                startingValue={item.rating}
                readonly

              />
              <Text style={[styles.text, { fontFamily: "Poppins-Regular" }]}> {item.rating} star Rating</Text>
            </View>
            <View style={styles.CityArea}>
              <Text style={styles.text}>{item.city}</Text>
              <Text style={styles.text}>{item.area}</Text>
            </View>
          </View>
        </View>
        <View style={styles.sharecontainer}>
          <View style={styles.iconContainer}>
            <FontAwesome name="bookmark-o" size={15} color={Colors.dark} />
            <Text style={styles.iconText}>Save</Text>
          </View>

          <View style={styles.iconContainer}>
            <Feather name="send" size={15} color={Colors.dark} />
            <Text style={styles.iconText}>Shares</Text>
          </View>
          <View style={styles.iconContainer}>
            <AntDesign name="minuscircleo" size={15} color={Colors.dark} />
            <Text style={styles.iconText}>Report</Text>
          </View>
          <TouchableOpacity style={styles.Button}>
            <AntDesign name="phone" size={10} color={Colors.light} />
            <Text style={styles.buttonText}>Request for call</Text>
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
          <Text style={{ color: Colors.theme_color }}>Kathavachak</Text>
        </TouchableOpacity>
        <AntDesign name={'bells'} size={20} color={Colors.theme_color} />
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
        onPress={() => setActiveButton(1)}
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
  data={PanditData}
  renderItem={renderItem}
  keyExtractor={(item) => item.id.toString()}
  scrollEnabled={true}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.panditListData}
/>

    </View>
  )
}

export default Kathavachak