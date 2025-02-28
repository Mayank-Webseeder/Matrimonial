import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({

  Filterheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SW(5),
    paddingVertical: SH(5)
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray,
    marginHorizontal: SW(10),
    borderRadius: 50,
    paddingHorizontal: SW(10),
    width: SW(350),
    justifyContent: "space-between"
  },
  images: {
    width: SW(80),
    height: SH(80)
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
    marginHorizontal: SW(50),
  },
  button: {
    width: SW(130),
    height: SH(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    marginTop: SH(20),
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
  },
  inactiveText: {
    color: 'black',
  },
  icon: {
    marginHorizontal: SW(10),
  },
  sharecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: SW(15),
    marginTop:-SH(10)
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: "row"
  },
  CityArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    flexDirection: 'row',
  },
  iconText: {
    fontSize: SF(13),
    color: Colors.dark,
    marginVertical: SH(5),
    marginHorizontal: SW(10),
    fontFamily: "Poppins-Regular",
  },
  Button: {
    backgroundColor: Colors.theme_color,
    paddingHorizontal: SH(15),
    paddingVertical: SH(3),
    borderRadius: 8,
    alignItems: "center",
    width: SW(80)
  },
  buttonText: {
    color: Colors.light,
    fontFamily: "Poppins-Regular",
    fontSize: SF(12),
    marginLeft: SW(2)
  },
  mainContainer: {
    marginTop: SH(70),
    flex: 1
  },
  image: {
    width: SW(100),
    height: SH(75),
    resizeMode: "cover",
    marginHorizontal: SW(10),
    marginVertical: SH(10),
    borderRadius:5
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: SW(10),
    marginVertical: SH(7),
    marginBottom: SH(3),
    paddingVertical:SH(3)
  },
  cardData: {
    flexDirection: "row"
  },
  text: {
    fontFamily: "Poppins-Medium",
    fontSize: SF(11)
  },
  name:{
    fontFamily: "Poppins-Bold",
    fontSize: SF(13)
  },
  panditListData: {
    marginVertical: SH(10),
    marginBottom: SH(10),
    marginTop: 0
  },
  leftContainer: {
    marginHorizontal: SW(10),
    marginTop: SH(10),
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    height: SH(40),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: SH(10),
    paddingLeft: SW(10),
    borderRadius: 5,
    backgroundColor: 'white',
    color: Colors.dark
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: SW(470)
  },
  modalContent: {
    backgroundColor: 'white',
    paddingHorizontal: SW(10),
    paddingVertical: SH(10),
    width: '80%',
    borderRadius: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyButton: {
    backgroundColor: Colors.theme_color,
    paddingHorizontal: SW(10),
    paddingVertical: SH(5),
    borderRadius: 5,
    marginHorizontal: SW(20),
    marginVertical: SH(20),
    borderRadius: 50
  },
  applyButtonText: {
    fontFamily: "Poppins-Medium",
    color: Colors.light,
    textAlign: "center",
    fontSize: SF(17)
  },
  inputContainer: {
    height: SH(40),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: SH(5),
    paddingLeft: SW(10),
    borderRadius: 5,
    backgroundColor: 'white',
    color: Colors.dark,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  dropdown: {
    flex: 1,
    marginRight: SW(10),
  },
  headingText: {
    fontFamily: "Poppins-Bold",
    fontSize: SF(15),
    marginVertical: SH(5),
    marginHorizontal: SW(10)
  },

  circle: {
    width: SW(50),
    height: SH(50),
    borderRadius: 25,
    backgroundColor: Colors.theme_color,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossButton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: SH(460),
    left: SW(150)
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height:SH(200),
  },
  emptyText: {
    fontSize:SF(15),
    color: Colors.gray,
    fontFamily: 'Poppins-Regular',
  },
  

});

export default styles;