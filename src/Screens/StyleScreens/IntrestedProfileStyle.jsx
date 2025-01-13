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
  headerText: {
    color: Colors.theme_color,
    fontSize: SF(15),
    fontFamily: "Poppins-Regular",
    marginHorizontal: SW(10)
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
    height: SH(180),
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
    marginTop: SH(105)
  },
  activeDot: {
    width: SW(25),
    height: SH(5),
    borderRadius: 4,
    backgroundColor: Colors.theme_color,
    marginTop: SH(105)
  },
  ProfileImage: {
    width: "94%",
    height: SH(300),
    marginHorizontal: SW(10),
    borderRadius: 10,
    marginVertical:SH(10),
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
    marginVertical: SH(10),
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
    paddingHorizontal: SW(10),
    height: SH(30),
    backgroundColor: Colors.gray,
    marginHorizontal: SW(10),
    marginVertical: SH(5),
    marginBottom: SH(10)
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
    marginHorizontal: SW(10),
    marginVertical: SH(10)
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: SF(15)
  },
  descriptionContainer: {
    marginHorizontal: SW(10),
    marginVertical:SH(10),
    marginTop:0
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
    paddingHorizontal: SW(10),
    paddingVertical:SH(5),
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
    paddingHorizontal: SW(20),
    paddingVertical: SH(3),
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.light,
    fontFamily: "Poppins-Bold",
    fontSize: SF(14),
  },
  profileSection: {
    marginHorizontal:SW(10),
    marginVertical:SH(10),
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
    paddingHorizontal:0,
    paddingVertical:SH(10),
    backgroundColor: Colors.light,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width:SW(350),
    backgroundColor: Colors.light,
    paddingHorizontal:SW(20),
    paddingVertical:SH(20),
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal:SW(20)
  },
  modalText: {
    fontSize:SF(16),
    color: Colors.dark,
    marginBottom:SH(20),
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    paddingVertical:SH(5),
    paddingHorizontal:SW(40),
    backgroundColor: Colors.theme_color,
    borderRadius: 10,
    marginHorizontal:SW(10),
  },
  modalButtonText: {
    color: Colors.light,
    fontFamily:"Poppins-Bold"
  },

});

export default styles;
