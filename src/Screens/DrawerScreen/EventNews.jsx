import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import React from 'react';
import styles from '../StyleScreens/EventNewsStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { EventData } from '../../DummyData/DummyData';

const EventNews = ({ navigation }) => {

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardheader}>
          <View>
            <Image source={item.image1} style={styles.EventheaderImage} /></View>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.date_time}>{item.date_time}</Text>
          </View>
          <View>
            <Text style={styles.hour}>{item.hour} hours ago</Text>
            <Text></Text>
          </View>
        </View>
        <View>
          <Text style={styles.captionText}>{item.text}</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.imageContainer1}>
            <View>
              <View style={styles.imageContainer2}>
                <View>
                  <Image source={item.image1} style={styles.image1} />
                </View>
                <View>
                  <Image source={item.image2} style={styles.image2} />
                </View>

              </View>
              <View style={styles.image4}>
                <Image source={item.image4} />
              </View>
            </View>
            <Image source={item.image3} style={styles.image3} />
          </View>
        </View>
      </View>
    )

  }
  return (
    <View style={styles.container}>
     <View style={styles.bottomContainer}>
     <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')} style={{ flexDirection: "row" }}>
          <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} />
          <Text style={styles.headingText}>News & Events</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Post New Event & News</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={EventData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
     </View>
    </View>
  );
}

export default EventNews;
