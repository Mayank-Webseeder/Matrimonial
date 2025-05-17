// import React from 'react';
// import { View, StyleSheet, Image } from 'react-native';
// import { SH } from '../../utils/Dimensions';
// const LoadingScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Image source={require('../../Images/AppLogo.jpg')} style={styles.appLogo} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#531e08',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   appLogo: {
//     width:"100%",
//     height:SH(350),
//     resizeMode: 'contain',
//     borderRadius:10
//   },
// });

// export default LoadingScreen;


import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Video
        source={require('../../Images/LoadingVedio.mp4')}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
        repeat
        muted
        paused={false}
        controls={false}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoadingScreen;
