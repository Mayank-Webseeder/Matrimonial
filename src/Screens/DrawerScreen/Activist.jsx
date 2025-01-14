import { Text, View, FlatList, TouchableOpacity, TextInput, Modal, Linking, SafeAreaView,StatusBar } from 'react-native';
import React, { useState } from 'react';
import { ActivistData } from '../../DummyData/DummyData';
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/ActivistStyle';
import Colors from '../../utils/Colors';
import { Dropdown } from 'react-native-element-dropdown';
import { subCasteOptions,LocalityData } from '../../DummyData/DropdownData';
const Activist = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [subcaste, setSubcaste] = useState('');
  const [locality, setLocality] = useState('');


  const handleOpenFilter = () => {
    setModalVisible(true);
  };

  const handleCloseFilter = () => {
    setModalVisible(false);
  };

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
          <TouchableOpacity style={styles.Button} onPress={()=>Linking.openURL('tel:9893458940')}>
            <Text style={styles.buttonText}>Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.searchbar}>
          <AntDesign name={'search1'} size={20} color={'gray'} />
          <TextInput placeholder='Search in Your city' placeholderTextColor={'gray'} />
        </View>

        <View style={styles.ButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleOpenFilter}>
            <Text style={styles.buttonText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('ActivistForm')}>
            <Text style={styles.buttonText}> Be an Activist</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
                barStyle="dark-content" 
                backgroundColor="transparent" 
                translucent 
            />
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => { navigation.navigate('Tabs') }}>
            <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Activist</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <AntDesign name="search1" size={25} color={Colors.theme_color} style={styles.searchIcon} />
          <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => { navigation.navigate('Notification') }} />
        </View>
      </View>

      <FlatList
        data={ActivistData}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader} 
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.panditListData}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseFilter}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.Filterheader}>
              <TouchableOpacity onPress={handleCloseFilter} style={{ flexDirection: "row" }}>
                <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} />
                <Text style={styles.headerText}>Filter</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.headingText}>Sub-Caste</Text>
            <View style={styles.inputContainer}>
              <Dropdown
                data={subCasteOptions}
                labelField="label"
                valueField="value"
                value={subcaste}
                onChange={item => setSubcaste(item.value)}
                placeholder="Caste"
                style={styles.dropdown}
              />
              <MaterialIcons name={'search'} size={20} color={'gray'} style={styles.icon} />
            </View>
            <Text style={styles.headingText}>Locality</Text>

            <View style={styles.inputContainer}>
              <Dropdown
                style={styles.dropdown}
                data={LocalityData}
                labelField="label"
                valueField="value"
                value={locality}
                onChange={item => setLocality(item.value)}
                placeholder="Locality"
              />
              <MaterialIcons name={'search'} size={20} color={'gray'} style={styles.icon} />
            </View>
            <TouchableOpacity style={styles.applyButton} onPress={handleCloseFilter}>
              <Text style={styles.applyButtonText}>See results</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Activist;
