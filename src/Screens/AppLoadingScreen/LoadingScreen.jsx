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
