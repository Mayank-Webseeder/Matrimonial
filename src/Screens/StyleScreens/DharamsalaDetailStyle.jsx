import { StyleSheet } from 'react-native';
import { SH, SW, SF } from '../../utils/Dimensions';
import Colors from '../../utils/Colors';

const styles = StyleSheet.create({
  text: {
    paddingVertical: SH(4),
    fontFamily: 'Poppins-Regular',
    color: Colors.theme_color,
    fontSize: SF(15),
  },
  sliderContainer: {
    marginBottom: SH(30),
    height: SH(260),
  },
  sliderImage: {
    width: '100%',
    height: SH(260),
    resizeMode: 'cover',
  },
  dot: {
    width: SW(25),
    height: SH(5),
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: SH(2),
    marginTop: SH(105),
  },
  activeDot: {
    width: SW(25),
    height: SH(5),
    borderRadius: 4,
    backgroundColor: Colors.theme_color,
    marginTop: SH(105),
  },

  textContainer: {
    paddingHorizontal: SW(10),
    paddingVertical: SH(10),
    paddingBottom: 0,
  },
  TextView: {
    backgroundColor: Colors.gray,
    paddingHorizontal: SW(10),
    paddingVertical: SH(15),
    borderRadius: 20,
    marginBottom: SH(10),
  },
  descriptionText: {
    fontSize: SF(13),
    color: Colors.dark,
    marginVertical: SH(10),
    fontFamily: 'Poppins-Bold',
  },
  sharecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: SW(10),
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: SW(10),
  },
  smalltext: {
    fontFamily: 'Poppins-Bold',
    fontSize: SF(15),
  },

  iconText: {
    fontSize: SF(13),
    color: Colors.dark,
    marginLeft: SW(4),
  },
  Button: {
    backgroundColor:'green',
    justifyContent:'center',
    paddingVertical: SH(5),
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: SW(10),
    paddingHorizontal:SW(15),
    flexDirection: 'row',
  },
  buttonText: {
    color: Colors.light,
    fontFamily: 'Poppins-Regular',
    fontSize: SF(12),
    marginLeft: SW(2),
  },
  RequestText: {
    color: Colors.light,
    fontSize: SF(11),
    fontFamily: 'Poppins-Medium',
  },
  addWindowImage: {
    width: '100%',
    height: SH(200),
    marginHorizontal: SW(5),
    marginVertical: SH(5),
    marginTop: SH(10),
  },
  descriptionText: {
    fontSize: SF(13),
    fontFamily: 'Poppins-Regular',
    marginBottom: SH(10),
    color: Colors.dark,
  },
  Text: {
    fontSize: SF(13),
    color: Colors.dark,
    fontFamily: 'Poppins-Medium',
  },
  name: {
    fontSize: SF(13),
    marginBottom:SH(3),
    color: Colors.dark,
    fontFamily: 'Poppins-Bold',
  },
  smallText: {
    fontSize: SF(13),
    color: Colors.dark,
    lineHeight: SH(15),
  },
  viewMore: {
    fontSize: SF(13),
    color: Colors.theme_color,
    marginTop: SH(5),
    fontFamily: 'Poppins-Bold',
  },
  Bottomimage:{
    marginVertical:SH(10),
    paddingBottom:SH(15),
  },

});

export default styles;
