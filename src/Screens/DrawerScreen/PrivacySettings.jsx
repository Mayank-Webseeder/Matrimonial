import React, { useState } from 'react';
import { Text, View, Switch, TouchableOpacity,SafeAreaView,StatusBar } from 'react-native';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/NotificationSettingStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';

const PrivacySettings = ({ navigation }) => {
  const [inactivateId, setInactivateId] = useState(false);
  const [hideContactDetails, setHideContactDetails] = useState(false);
  const [blurPhotos, setBlurPhotos] = useState(false);
  const [hideOptionalDetails, setHideOptionalDetails] = useState(false);

  const toggleSwitch = (setter, value) => {
    setter(!value);
  };

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar 
                barStyle="dark-content" 
                backgroundColor="transparent" 
                translucent 
            />
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row',alignItems:"center" }}>
          <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Privacy Settings</Text>
        </View>
      </View>

      {/* Privacy Toggles */}
      <View style={styles.toggleContainer}>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Inactivate Id</Text>
          <Switch
            trackColor={{ false: Colors.gray, true: Colors.theme_color }}
            thumbColor={inactivateId ? Colors.white : Colors.gray}
            onValueChange={() => toggleSwitch(setInactivateId, inactivateId)}
            value={inactivateId}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Hide Contact Details</Text>
          <Switch
            trackColor={{ false: Colors.gray, true: Colors.theme_color }}
            thumbColor={hideContactDetails ? Colors.white : Colors.gray}
            onValueChange={() => toggleSwitch(setHideContactDetails, hideContactDetails)}
            value={hideContactDetails}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Blur Photos</Text>
          <Switch
            trackColor={{ false: Colors.gray, true: Colors.theme_color }}
            thumbColor={blurPhotos ? Colors.white : Colors.gray}
            onValueChange={() => toggleSwitch(setBlurPhotos, blurPhotos)}
            value={blurPhotos}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Hide Optional Details in Biodata Profile</Text>
          <Switch
            trackColor={{ false: Colors.gray, true: Colors.theme_color }}
            thumbColor={hideOptionalDetails ? Colors.white : Colors.gray}
            onValueChange={() => toggleSwitch(setHideOptionalDetails, hideOptionalDetails)}
            value={hideOptionalDetails}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PrivacySettings;
