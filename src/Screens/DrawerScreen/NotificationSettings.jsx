import React, { useState } from 'react';
import { Text, View, Switch, TouchableOpacity,SafeAreaView,StatusBar } from 'react-native';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/NotificationSettingStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';
const NotificationSettings = ({ navigation }) => {
  const [profileInterest, setProfileInterest] = useState(false);
  const [newsEvents, setNewsEvents] = useState(false);
  const [adminNotifications, setAdminNotifications] = useState(false);
  const [updateNotifications, setUpdateNotifications] = useState(false);

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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Notification Settings</Text>
        </View>
      </View>
      {/* Notification Toggles */}
      <View style={styles.toggleContainer}>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Profile Interest Notifications</Text>
          <Switch
            trackColor={{ false: Colors.gray, true: Colors.theme_color }}
            thumbColor={profileInterest ? Colors.white : Colors.gray}
            onValueChange={() => toggleSwitch(setProfileInterest, profileInterest)}
            value={profileInterest}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>News/Events Notifications</Text>
          <Switch
            trackColor={{ false: Colors.gray, true: Colors.theme_color }}
            thumbColor={newsEvents ? Colors.white : Colors.gray}
            onValueChange={() => toggleSwitch(setNewsEvents, newsEvents)}
            value={newsEvents}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Admin (App) Notifications</Text>
          <Switch
            trackColor={{ false: Colors.gray, true: Colors.theme_color }}
            thumbColor={adminNotifications ? Colors.white : Colors.gray}
            onValueChange={() => toggleSwitch(setAdminNotifications, adminNotifications)}
            value={adminNotifications}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Update Notifications</Text>
          <Switch
            trackColor={{ false: Colors.gray, true: Colors.theme_color }}
            thumbColor={updateNotifications ? Colors.white : Colors.gray}
            onValueChange={() => toggleSwitch(setUpdateNotifications, updateNotifications)}
            value={updateNotifications}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationSettings;