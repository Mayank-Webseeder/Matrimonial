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
  },
  appLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default LoadingScreen;
