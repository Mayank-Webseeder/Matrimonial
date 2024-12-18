import React from 'react';
import { View, TouchableOpacity, FlatList, Image, Alert ,Text } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/HomeStyle';
import Colors from '../../utils/Colors';
import HeadingWithViewAll from '../../Components/HeadingWithViewAll';
import { profileImages , Category ,communityData } from '../../DummyData/DummyData';
import { ScrollView } from 'react-native-gesture-handler';

const Home = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <AntDesign name={'menufold'} size={20} color={Colors.theme_color} />
        </TouchableOpacity>
        <View style={styles.righticons}>
          <AntDesign name={'search1'} size={20} color={Colors.theme_color} />
          <AntDesign name={'bells'} size={20} color={Colors.theme_color} />
        </View>
      </View>

     <View>
     <HeadingWithViewAll
        heading="MATRIMONY"
        showViewAll={true}
        onViewAllPress={() => Alert.alert('View All Pressed')}
      />
      
      <FlatList
        data={profileImages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image source={item.image} style={styles.image} />
          </View>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
     </View>

     <View>
     <HeadingWithViewAll
        heading="PANDIT / JOYTISH / KATHAVACHAK"
        showViewAll={false}
      />
       <FlatList
        data={Category}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.CategoryContainer}>
            <Image source={item.image} style={styles.images} />
            <Text style={styles.text}>{item.text}</Text>
          </TouchableOpacity>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
     </View>
      <View>
      <HeadingWithViewAll
        heading="BRAHMIN COMMUNITY"
        showViewAll={false}
      />
        <FlatList
        data={communityData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.CategoryContainer}>
            <Image source={item.image} style={styles.images} />
            <Text style={styles.text}>{item.text}</Text>
          </TouchableOpacity>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      </View>
      <Image source={require('../../Images/slider.png')} style={styles.sliderImage}/>
    </ScrollView>
  );
};

export default Home;
