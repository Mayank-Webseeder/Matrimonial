import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  menuIcon:{
    width:SW(40),
    height:SH(40)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SW(15),

  },
  righticons: {
    flexDirection: 'row',
  },
  imageWrapper: {
    marginHorizontal: SW(5),
    marginVertical: SH(15),
  },
  CategoryContainer: {
    margin: SW(10),
    backgroundColor: Colors.light,
    marginHorizontal: SW(7),
    borderRadius: 10,
    paddingVertical: SH(10),
    paddingHorizontal: SW(10),
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },

  image: {
    width: SW(100),
    height: SH(100)
  },
  images: {
    width: SW(80),
    height: SH(80),
    resizeMode: "contain"
  },
  text: {
    paddingVertical: SH(4),
    fontFamily: "Poppins-Bold",
    paddingBottom: 0,
    fontSize: SF(14)
  },
  sliderContainer: {
    marginBottom: SH(30)
  },
  sliderImage: {
    width: "100%",
    height: SH(220),
    resizeMode: 'contain',
  },
  bottomImage: {
    width: "100%",
    height: SH(220),
    resizeMode: 'contain',
    marginBottom: SH(20)
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

});

export default styles;
