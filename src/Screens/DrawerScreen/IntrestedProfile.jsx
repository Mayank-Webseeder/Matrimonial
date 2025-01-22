import React, { useState } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, StatusBar, Image, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../StyleScreens/IntrestedProfileStyle';
import Colors from '../../utils/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import Globalstyles from '../../utils/GlobalCss';

// Import local image
import profileImage from '../../Images/Profile1.png';

const IntrestedProfile = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState(1); // Track selected button

  // Mock data for Interest Sent and Interest Received
  const interestSentData = [
    { id: 1, name: 'John Doe', dp: profileImage, status: 'Pending',user_id:"abc1234e" },
    { id: 2, name: 'Jane Smith', dp:profileImage, status: 'Accepted',user_id:"abc1234e" },
    { id: 3, name: 'Mark Jacobs', dp:profileImage, status: 'Declined',user_id:"abc1234e" },
  ];

  const interestReceivedData = [
    { id: 1, name: 'Alice Lee', dp:profileImage, status: 'Pending',user_id:"abc1234e" },
    { id: 2, name: 'Bob Turner', dp:profileImage, status: 'You Accepted',user_id:"abc1234e" },
    { id: 3, name: 'Charlie Brown', dp:profileImage, status: 'You Declined',user_id:"abc1234e" },
  ];

  // Render Item for Interest Sent or Received
  const renderIntrestsentItem = (item) => (
    <View style={styles.card}>
      <View style={styles.leftContent}>
        <Image source={item.dp} style={styles.dpImage} />
        <View style={styles.cardContent}>
          <Text style={styles.userId}>{item.user_id}</Text>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.Statusbutton}>
        <Text style={styles.StatusbuttonText}>{item.status}</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderIntrestReceviedItem = (item) => (
    <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('MatrimonyPeopleProfile')}>
      <View style={styles.leftContent}>
        <Image source={item.dp} style={styles.dpImage} />
        <View style={styles.cardContent}>
          <Text style={styles.userId}>{item.user_id}</Text>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.Statusbutton}>
        <Text style={styles.StatusbuttonText}>{item.status}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name={'arrow-back-ios-new'}
              size={25}
              color={Colors.theme_color}
            />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Matrimony</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.ButtonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                activeButton === 1 ? styles.activeButton : styles.inactiveButton,
              ]}
              onPress={() => setActiveButton(1)}
            >
              <Text
                style={activeButton === 1 ? styles.activeText : styles.inactiveText}
              >
                Interest Sent
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                activeButton === 2 ? styles.activeButton : styles.inactiveButton,
              ]}
              onPress={() => setActiveButton(2)}
            >
              <Text
                style={activeButton === 2 ? styles.activeText : styles.inactiveText}
              >
                Interest Received
              </Text>
            </TouchableOpacity>
          </View>

          {/* Display List Based on Active Button */}
          {activeButton === 1 && (
            <FlatList
              data={interestSentData}
              renderItem={({ item }) => renderIntrestsentItem(item)}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          )}

          {activeButton === 2 && (
            <FlatList
              data={interestReceivedData}
              renderItem={({ item }) => renderIntrestReceviedItem(item)}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
      <View>

      </View>
    </SafeAreaView>
  );
};

export default IntrestedProfile;
