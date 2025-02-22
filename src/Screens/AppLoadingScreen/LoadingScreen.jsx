import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

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
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appLogo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius:10
  },
});

export default LoadingScreen;
