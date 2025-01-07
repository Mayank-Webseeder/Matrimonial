import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingTop:SH(20)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SW(10),
    paddingLeft: 0,
  },
  righticons: {
    flexDirection: 'row',
  },
  images: {
    width: SW(80),
    height: SH(80)
  },
  sliderContainer: {
    marginBottom: SH(30),
    height: SH(230),
  },
  sliderImage: {
    width: "100%",
    height: SH(220),
    resizeMode: 'contain',
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
  ProfileImage: {
    width: "90%",
    height: SH(300),
    marginHorizontal: SW(15),
    borderRadius: 10
  },
  ButtonContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    marginHorizontal: SW(25)
  },
  button: {
    width: SW(150),
    height: SH(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: SH(20),
    borderRadius: 8,
    marginHorizontal: SW(6)
  },
  activeButton: {
    backgroundColor: Colors.theme_color,
  },
  inactiveButton: {
    backgroundColor: 'white',
  },
  activeText: {
    color: 'white',
    fontFamily: "Poppins-Regular",
    fontSize: SF(15)
  },
  inactiveText: {
    color: 'black',
    fontFamily: "Poppins-Regular",
    fontSize: SF(15)
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: SH(10),
    height: SH(40),
    backgroundColor: Colors.gray,
    marginHorizontal: SW(10),
    marginVertical: SH(5),
    marginBottom: SH(30)
  },
  icon: {
    marginHorizontal: SW(10),
  },
  input: {
    flex: 1,
    fontSize: SF(16),
    color: Colors.theme_color,
    textAlign: 'center',
  },
  placeholder: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: SF(16),
    fontFamily: "Poppins-Bold",
    color: Colors.theme_color,
  },
  profileData: {
    disply: "flex",
    flexDirection: "row",
    justifyContent: "space-between", alignItems: "center",
    margin: SW(25)
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: SF(15)
  },
  descriptionContainer: {
    marginHorizontal: SW(20)
  },
  description: {
    fontFamily: "Poppins-Bold",
    fontSize: SF(17)
  },
  descriptionText: {
    fontFamily: "Poppins-Regular",
    fontSize: SF(12)
  },
  sharecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: SW(10),
    backgroundColor: Colors.light,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: SF(12),
    color: Colors.dark,
    marginTop: SH(5),
    fontFamily: "Poppins-Regular",
  },
  interestedButton: {
    backgroundColor: Colors.theme_color,
    paddingHorizontal: SH(20),
    paddingVertical: SH(10),
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.light,
    fontFamily: "Poppins-Bold",
    fontSize: SF(14),
  },

});

export default styles;
