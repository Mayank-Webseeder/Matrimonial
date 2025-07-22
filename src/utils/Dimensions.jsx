import {Dimensions,PixelRatio,Text,TextInput,Platform} from 'react-native';
import {heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const SW = (size) => (SCREEN_WIDTH / guidelineBaseWidth) * size;
export const SH = (size) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
export const SF = (size) => {
  const scale = SCREEN_WIDTH / guidelineBaseWidth;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const heightPercent = (percent) => hp(percent);
export const widthPercent = (percent) => wp(percent);

export const fontPercent = (percent) => hp(percent);

if (Text.defaultProps == null) {Text.defaultProps = {};}
if (TextInput.defaultProps == null) {TextInput.defaultProps = {};}
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps.allowFontScaling = false;

export const logFontScale = () => {
  console.log('📏 Font Scale: ', PixelRatio.getFontScale());
};
