import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingTop: SH(25),
    paddingHorizontal: SW(6)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SW(10),
    paddingLeft: 0
  },
  headerText: {
    color: Colors.theme_color,
    fontSize: SF(15),
    fontFamily: "Poppins-Regular",
    marginHorizontal: SW(10)
  },
  text: {
    paddingVertical: SH(4),
    fontFamily: "Poppins-Regular",
    color: Colors.theme_color,
    fontSize: SF(15)
  },
  sliderContainer: {
    marginBottom: SH(30),
    height: SH(180),
  },
  sliderImage: {
    width: "100%",
    height: SH(250),
    resizeMode: 'cover',
  },
  dot: {
    width: SW(25),
    height: SH(5),
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: SH(2),
    marginTop: SH(105)
  },
  activeDot: {
    width: SW(25),
    height: SH(5),
    borderRadius: 4,
    backgroundColor: Colors.theme_color,
    marginTop: SH(105)
  },

  textContainer: {
    paddingHorizontal: SW(10),
    paddingVertical: SH(10),
    paddingBottom: 0
  },
  TextView: {
    backgroundColor: Colors.gray,
    paddingHorizontal: SW(10),
    paddingVertical: SH(15),
    borderRadius: 20,
    marginBottom: SH(10)
  },
  descriptionText: {
    fontSize: SF(13),
    color: Colors.dark,
    marginVertical: SH(5),
    fontFamily: 'Poppins-Bold',
  },
  sharecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: SW(10)
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: "row",
    marginHorizontal: SW(10)
  },
  smalltext: {
    fontFamily: "Poppins-Regular",
    fontSize: SF(12)
  },

  iconText: {
    fontSize: SF(13),
    color: Colors.dark,
    marginTop: SH(5),
    marginLeft: SW(4)
  },
  Button: {
    backgroundColor: Colors.theme_color,
    paddingHorizontal: SW(20),
    paddingVertical: SH(5),
    borderRadius: 8,
    alignItems: "center",
    marginLeft: SW(10),
    width: SW(120),
    flexDirection: "row",
  },
  buttonText: {
    color: Colors.light,
    fontFamily: "Poppins-Regular",
    fontSize: SF(12),
    marginLeft: SW(2)
  },
  RequestText: {
    color: Colors.light,
    fontSize: SF(10),
    fontFamily: "Poppins-Regular"
  },
  addWindowImage: {
    width: "100%",
    height: SH(180),
    marginHorizontal: SW(5),
    marginVertical: SH(5),
    marginTop: SH(10)
  },
  descriptionText: {
    fontSize: SF(13),
    fontWeight: 'Poppins-Bold',
    marginBottom: SH(10),
    color: Colors.dark,
  },
  Text: {
    fontSize: SF(13),
    color: Colors.dark,
    marginVertical: SH(5),
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

});

export default styles;
