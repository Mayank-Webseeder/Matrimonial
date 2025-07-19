import { Text, View, FlatList, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Linking, Pressable, Modal } from 'react-native';
import React, { useState } from 'react';
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../StyleScreens/CommunityStyle';
import Colors from '../../utils/Colors';
import Globalstyles from '../../utils/GlobalCss';
import axios from 'axios';
import ImageViewing from 'react-native-image-viewing';
import { DELETE_DHARAMSALA } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SH } from '../../utils/Dimensions';
import { showMessage } from 'react-native-flash-message';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MyuploadedDharamsala = ({ navigation, route }) => {
   const insets = useSafeAreaInsets();
  const { DharmshalaData } = route.params;
  const [isImageVisible, setImageVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [selectedItem, setSelectedItem] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);

  const openImageViewer = (imageUri) => {
    if (imageUri) {
      setSelectedImage([{ url: imageUri }]); // Important: `url` key is used by ImageViewer
      setImageVisible(true);
    }
  };

  const handleDelete = async (id) => {
    console.log("🗑️ Deleting Committee ID:", id);

    try {
      setIsLoading(true);

      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("Authorization token is missing");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      console.log("🔹 Headers:", headers);

      const response = await axios.delete(`${DELETE_DHARAMSALA}/${id}`, { headers });

      console.log("✅ Delete Response:", response.data);

      if (response.status === 200 && response.data.status === true) {
        showMessage({
          type: "success",
          message: "dharamsala deleted successfully!",
          icon: "success",
          duarion: 5000
        });

        setModalVisible(false);
        setSelectedItem(null);
        if (navigation && navigation.navigate) {
          navigation.navigate('MainApp', {
            screen: 'Dharmshala',
          });
        } else {
          console.warn("⚠️ Navigation is not available");
        }

        return;
      }

      throw new Error(response.data.message || "Failed to delete committee.");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching biodata:", errorMsg);
      showMessage({
        type: "danger",
        message: errorMsg,
        icon: "danger",
        duarion: 5000
      });
      const sessionExpiredMessages = [
        "User does not Exist....!Please login again",
        "Invalid token. Please login again",
        "Token has expired. Please login again"
      ];

      if (sessionExpiredMessages.includes(errorMsg)) {
        await AsyncStorage.removeItem("userToken");
        navigation.reset({
          index: 0,
          routes: [{ name: "AuthStack" }],
        });
      }
    } finally {
      setIsLoading(false);  // Hide loading indicator
    }
  };




  const openMenu = (item, event) => {
    setSelectedItem(item);
    setModalPosition({
      top: event.nativeEvent.pageY + 5,
      left: event.nativeEvent.pageX - 150,
    });
    setModalVisible(true);
  };

  const renderItem = ({ item }) => {
    const isSaved = item.isSaved || null;
    return (
      <View style={styles.card}
      >
        <Pressable style={styles.cardData} >
          <TouchableOpacity onPress={() => openImageViewer(item?.images?.[0])}>
            <Image
              source={item?.images?.[0] ? { uri: item?.images?.[0] } : require('../../Images/NoImage.png')}
              style={styles.image}
            />
          </TouchableOpacity>

          {selectedImage && (
            <Modal visible={isImageVisible} transparent={true} onRequestClose={() => setImageVisible(false)}>
              <ImageViewer
                imageUrls={selectedImage}
                enableSwipeDown={true}
                onSwipeDown={() => setImageVisible(false)}
                onCancel={() => setImageVisible(false)}
                enablePreload={true}
                saveToLocalByLongPress={false}
                renderIndicator={() => null}
              />
            </Modal>
          )}
          <View style={[styles.leftContainer, { marginTop: SH(5) }]}>
            <Text style={styles.text}>{item.dharmshalaName}</Text>
            <Text style={[styles.smalltext, { fontFamily: 'Poppins-Medium' }]}>
              {item.subCaste}
            </Text>
            <Text style={styles.smalltext}>{item.city}</Text>
          </View>
          <TouchableOpacity onPress={(event) => openMenu(item, event)}>
            <MaterialIcons name="more-vert" size={24} color={Colors.black} />
          </TouchableOpacity>
        </Pressable>

        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay1}
            onPress={() => setModalVisible(false)}
          >
            <View style={[styles.modalContent1, { top: modalPosition.top, left: modalPosition.left }]}>
              {/* Update Option */}
              <TouchableOpacity
                style={styles.modalOption1}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('UpdateDharamsala', { DharmshalaData: selectedItem });
                }}
              >
                <Text style={styles.updateText}>Update</Text>
              </TouchableOpacity>

              {/* Delete Option */}
              <TouchableOpacity
                style={styles.modalOption}
                onPress={async () => {
                  try {
                    await handleDelete(selectedItem._id);
                    setModalVisible(false);
                    console.log("🗑️ Committee Deleted:", selectedItem._id);
                  } catch (error) {
                    console.error("🚨 Error deleting committee:", error);
                  }
                }}
              >
                <Text style={[styles.deleteText, { color: 'red' }]}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => navigation.navigate("DharamsalaDetail", { DharamsalaData: item, isSaved: isSaved, _id: item?._id })}
              >
                <Text style={[styles.updateText]}>View Details</Text>
              </TouchableOpacity>

            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };

  return (
    <SafeAreaView style={Globalstyles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>My Dharamsala</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: insets.bottom + SH(50), flexGrow: 1}}>
        <View>
          <FlatList
            data={DharmshalaData}
            renderItem={renderItem}
            keyExtractor={(item) => item?._id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.panditListData}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No dharamsala Available</Text>
              </View>
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyuploadedDharamsala;
