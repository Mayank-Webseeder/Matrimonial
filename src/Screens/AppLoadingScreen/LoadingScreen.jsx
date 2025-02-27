import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SH } from '../../utils/Dimensions';
const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../Images/AppLogo.jpg')} style={styles.appLogo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#531e08',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appLogo: {
    width:"100%",
    height:SH(350),
    resizeMode: 'contain',
    borderRadius:10
  },
});

export default LoadingScreen;
