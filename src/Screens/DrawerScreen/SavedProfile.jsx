import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView, Image, SafeAreaView,StatusBar } from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "../StyleScreens/SavedProfileStyle";
import Colors from "../../utils/Colors";
import { SavedProfileData } from "../../DummyData/DummyData";
import HeadingWithViewAll from "../../Components/HeadingWithViewAll";

const SavedProfile = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState("Biodata");

  // Filtered data based on the selected category
  const filteredData = SavedProfileData.filter((item) => item.category === activeCategory);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.detailsContainer}>
        {activeCategory === "Biodata" && (
          <View>
            <Image style={styles.image} source={item.image} />
             <View style={styles.row}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.text}>{item.city}</Text>
            </View>
            <View style={styles.row2}>
              <Text style={styles.text}>Age: {item.age} /</Text>
              <Text style={styles.text}>Height: {item.height}</Text>
            </View>
            <Text style={styles.text}>{item.subcaste}</Text>
          </View>
        )}

        {activeCategory === "Pandit" && (
          <View>
            <Image style={styles.image} source={item.image} />
             <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.text}>{item.subcaste}</Text>
            <View style={styles.row}>
            <Text style={styles.text}>{item.city}</Text>
            <Text style={styles.text}>{item.area}</Text>
          </View>
          </View>
        )}

        {activeCategory === "Dharmshala" && (
          <View>
              <Image style={styles.image} source={item.image} />
            <Text style={styles.text}>{item.subcaste}</Text>
            <Text style={styles.city}>{item.city}</Text>
          </View>
        )}

        {activeCategory === "Community" && (
          <View>
              <Image style={styles.image} source={item.image} />         
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.text}>{item.city}</Text>
            <Text style={styles.text}>{item.area}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar 
                      barStyle="dark-content" 
                      backgroundColor="transparent" 
                      translucent 
                  />
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
            <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={{ color: Colors.theme_color }}>Saved</Text>
        </View>
        <View style={styles.righticons}>
          <AntDesign name={'search1'} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} />
          <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => navigation.navigate('Notification')} />
        </View>
      </View>

      {/* Category Tabs */}
      <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.ButtonContainer}>
        <View style={styles.tabContainer}>
          {["Biodata", "Pandit", "Dharmshala", "Community"].map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tabButton, activeCategory === category && styles.activeTab]}
              onPress={() => setActiveCategory(category)}
            >
              <Text style={[styles.tabText, activeCategory === category && styles.activeTabText]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <HeadingWithViewAll heading={"MATRIMONY Saved Profile"} />

      </View>
      {/* Heading with View All */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.ProfileContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SavedProfile;
