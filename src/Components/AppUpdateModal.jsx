import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Linking, Platform, StyleSheet, SafeAreaView } from 'react-native';
import VersionCheck from 'react-native-version-check';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SH, SF, SW } from '../utils/Dimensions';
import Colors from '../utils/Colors';

const AppUpdateModal = () => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const storeUrl = 'https://play.google.com/store/apps/details?id=com.brahminmilanbyappwin.app';

  useEffect(() => {
    if (__DEV__) return;
    checkForUpdate();
  }, []);

const checkForUpdate = async () => {
  try {
    const latestVersion = await VersionCheck.getLatestVersion({ provider: 'playStore' });
    const currentVersion = await VersionCheck.getCurrentVersion();

    if (latestVersion && currentVersion && latestVersion !== currentVersion) {
      setIsUpdateAvailable(true);
    }
  } catch (error) {
    console.log('Update check failed:', error);
  }
};


  const handleUpdateNow = () => {
    Linking.openURL(storeUrl);
  };

  return (
    <SafeAreaView>
      <Modal transparent visible={isUpdateAvailable} animationType="fade"
        statusBarTranslucent={true} // Android ke liye
        presentationStyle="overFullScreen" // iOS ke liye
      >
        <View style={styles.modelContainer}>
          <View style={styles.modelSubContainer}>

            <TouchableOpacity onPress={() => setIsUpdateAvailable(false)} style={styles.closeTouch}>
              <MaterialCommunityIcons name="close" size={SF(22)} color="#333" />
            </TouchableOpacity>

            <View style={styles.logoView}>
              <FontAwesome name="handshake-o" size={SF(55)} color={Colors.theme_color} />
            </View>

            <Text style={styles.headingText}>App Update Available!</Text>
            <Text style={styles.titleText}>
              A new version of Brahmin Milan is available. Update now to enjoy the latest features and improvements.
            </Text>

            <TouchableOpacity onPress={handleUpdateNow} style={styles.buttonTouch}>
              <MaterialCommunityIcons name="update" size={SF(16)} color="#fff" style={{ marginRight: SW(8) }} />
              <Text style={styles.buttonText}>Update Now</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsUpdateAvailable(false)} style={styles.maybetouch}>
              <Text style={styles.maybeText}>Maybe Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modelContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SW(20),
  },
  modelSubContainer: {
    backgroundColor: '#fff',
    width: SW(320),
    borderRadius: SW(12),
    padding: SW(20),
    alignItems: 'center'
  },
  closeTouch: { position: 'absolute', top: SH(10), right: SW(10) },
  logoView: { marginBottom: SH(20) },
  headingText: { fontSize: SF(18), fontFamily: "Poppins-Bold", marginBottom: SH(10) },
  titleText: { fontSize: SF(12), textAlign: 'center', marginBottom: SH(20), fontFamily: "Poppins-Regular" },
  buttonTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:Colors.theme_color,
    paddingVertical: SH(5),
    paddingHorizontal: SW(15),
    borderRadius: SW(8),
    marginBottom: SH(10)
  },
  buttonText: { color: '#fff', fontSize: SF(15), fontFamily: "Poppins-Regular" },
  maybetouch: { paddingVertical: SH(8) },
  maybeText: { color:"gray", fontSize: SF(14), fontFamily: "Poppins-Regular" }
});

export default AppUpdateModal;
