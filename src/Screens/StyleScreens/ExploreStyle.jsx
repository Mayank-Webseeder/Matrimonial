import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingTop:SW(20)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SW(10),
    paddingLeft:0
  },
  righticons: {
    flexDirection: 'row',
  },
  headerText: {
    color: Colors.theme_color,
    fontSize: SF(15),
    fontFamily: "Poppins-Regular"
  },
  images: {
    width: SW(80),
    height: SH(80)
  },
  sliderContainer: {
    marginBottom: SH(10),
    height: SH(200),
  },
  sliderImage: {
    width: "100%",
    height: SH(170),
    resizeMode: 'cover',
  },
  dot: {
    width: SW(25),
    height: SH(5),
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: SH(2),
    marginTop:SH(50)
  },
  activeDot: {
    width: SW(25),
    height: SH(5),
    borderRadius: 4,
    backgroundColor: Colors.theme_color,
    marginTop:SH(50)
  },
  ProfileImage: {
    width: "100%",
    height: SH(300),
    // marginHorizontal: SW(15),
    borderRadius: 10
  },
  ButtonContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-between"
  },
  button: {
    width: SW(150),
    height: SH(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    // marginVertical: SH(20),
    borderRadius: 8,
    marginHorizontal: SW(6)
  },
  Text:{
    color:Colors.dark,
    fontFamily: "Poppins-Regular",
    fontSize: SF(15)
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

  profileData: {
    disply: "flex",
    flexDirection: "row",
    justifyContent: "space-between", alignItems: "center",
    margin: SW(10)
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: SF(15)
  },
 
  sharecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: SW(10),
    backgroundColor: Colors.light,
    marginHorizontal:SW(20)
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    padding: SW(5),
    margin: SW(10)
  }

});

export default styles;