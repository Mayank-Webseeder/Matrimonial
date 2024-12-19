import { Image, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React,{useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/SavedProfileStyle';
import Colors from '../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeadingWithViewAll from '../../Components/HeadingWithViewAll';
import { SavedProfileData } from '../../DummyData/DummyData';

const SavedProfile = ({ navigation }) => {
    const [activeButton, setActiveButton] = useState(null);
    const handlePress = (buttonId, screenName) => {
      setActiveButton(buttonId);
      navigation.navigate(screenName);
    };
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image style={styles.image} source={item.image} />

      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.city}>{item.city}</Text>
        </View>

        <View style={styles.row2}>
          <Text style={styles.text}>Age: {item.age} /</Text>
          <Text style={styles.text}>Height: {item.height}</Text>
        </View>

        <Text style={styles.subcaste}>{item.subcaste}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
   
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')} style={{ flexDirection: 'row' }}>
          <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} />
          <Text style={{ color: Colors.theme_color }}>Saved</Text>
        </TouchableOpacity>
        <View style={styles.righticons}>
          <AntDesign name={'search1'} size={20} color={Colors.theme_color} style={{ marginHorizontal: 10 }} />
          <AntDesign name={'bells'} size={20} color={Colors.theme_color} />
        </View>
      </View>

      <HeadingWithViewAll heading="MATRIMONY Saved Profile" showViewAll={false} />
      <ScrollView horizontal={true} 
      showsHorizontalScrollIndicator={false}  style={styles.ButtonContainer}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeButton === 1 && styles.activeTab]}
          onPress={() => handlePress(1, 'BioData')}
        >
          <Text style={[styles.tabText, activeButton === 1 && styles.activeTabText]}>Biodata</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeButton === 2 && styles.activeTab]}
          onPress={() => handlePress(2, 'Pandit Jyotish')}
        >
          <Text style={[styles.tabText, activeButton === 2 && styles.activeTabText]}>Pandit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeButton === 3 && styles.activeTab]}
          onPress={() => handlePress(3, 'Dharmshala')}
        >
          <Text style={[styles.tabText, activeButton === 3 && styles.activeTabText]}>Dharmshala</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeButton === 4 && styles.activeTab]}
          onPress={() => handlePress(4, 'Community')}
        >
          <Text style={[styles.tabText, activeButton === 4 && styles.activeTabText]}>Community</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    <FlatList
        data={SavedProfileData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.ProfileContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SavedProfile;
