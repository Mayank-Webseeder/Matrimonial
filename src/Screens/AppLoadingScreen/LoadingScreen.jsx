import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SH } from '../../utils/Dimensions';
import Colors from '../../utils/Colors';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../Images/MatrimonialLogo.png')} style={styles.appLogo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light,
  },
  appLogo: {
    width: "100%",
    height: SH(300),
    resizeMode: "contain"
  }
});

export default LoadingScreen;
