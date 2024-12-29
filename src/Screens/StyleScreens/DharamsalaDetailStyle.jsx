import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SW(15),
  },
  text: {
    paddingVertical: SH(4),
    fontFamily: "Poppins-Regular",
    color: Colors.theme_color,
    fontSize:SF(15)
  },
  sliderContainer: {
    marginBottom: SH(30),
    height: SH(230),
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
    marginTop: SW(100)
  },
  activeDot: {
    width: SW(25),
    height: SH(5),
    borderRadius: 4,
    backgroundColor: Colors.theme_color,
    marginTop: SW(100)
  },

  textContainer: {
    padding: SW(10),
    paddingBottom: 0
  },
  TextView: {
    backgroundColor: Colors.gray,
    padding: SW(10),
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
    marginHorizontal:SW(10)
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
    paddingHorizontal: SH(20),
    paddingVertical: SH(5),
    borderRadius: 8,
    width:SW(100),
    alignItems: "center",
    marginLeft: SW(5)
  },
  buttonText: {
    color: Colors.light,
    fontFamily: "Poppins-Regular",
    fontSize: SF(12),
    marginLeft: SW(2)
  },
});

export default styles;
