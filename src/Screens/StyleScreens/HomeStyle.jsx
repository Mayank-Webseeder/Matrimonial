import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingTop: SH(25),
    paddingHorizontal:SW(6)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SW(10),
    paddingVertical:SH(10),
    paddingLeft: 0,
  },
  menuIcon: {
    width: SW(30),
    height: SH(30)
  },
  righticons: {
    flexDirection: 'row',
  },
  imageWrapper: {
    marginHorizontal: SW(2),
    marginVertical: SH(15),
  },
  CategoryContainer: {
    marginHorizontal: SW(10),
    marginVertical:SH(10),
    backgroundColor: Colors.light_theme,
    marginHorizontal: SW(7),
    borderRadius: 10,
    paddingHorizontal: SW(4),
    paddingVertical:SH(4),
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
    width: SW(100),
    height: SH(70),
    resizeMode: "contain"
  },
  ProfileImages: {
    width: SW(118),
    height: SH(115),
    resizeMode: "cover",
    borderRadius: 10,
  },
  text: {
    paddingVertical: SH(4),
    fontFamily: "Poppins-Bold",
    paddingBottom: 0,
    fontSize: SF(12)
  },
  sliderContainer: {
    marginBottom: SH(30)
  },
  sliderImage: {
    width: "100%",
    height: SH(180),
    resizeMode: 'cover',
  },
  bottomImage: {
    width: "95%",
    height: SH(180),
    resizeMode: 'cover',
    marginVertical: SH(10),
    marginHorizontal:SW(10)
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
