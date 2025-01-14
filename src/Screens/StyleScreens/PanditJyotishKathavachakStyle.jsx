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
    paddingLeft:0
  },
  Filterheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SW(5),
    paddingVertical:SH(5)
  },
  headerText: {
    color: Colors.theme_color,
    fontSize: SF(15),
    fontFamily: "Poppins-Regular",
    marginHorizontal: SW(10)
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignItems:"center"
},
  righticons: {
    flexDirection: 'row',
  },
  searchbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray,
    borderRadius: 50,
  
  },
  images: {
    width: SW(80),
    height: SH(80)
  },
  sliderContainer: {
    marginBottom: SH(30),
    height: SH(180),
    marginTop:SH(10)
  },
  sliderImage: {
    width: "100%",
    height: SH(180),
    resizeMode: 'cover',
  },
  dot: {
    width: SW(25),
    height: SH(5),
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: SH(2),
    marginTop: SH(110)
  },
  activeDot: {
    width: SW(25),
    height: SH(5),
    borderRadius: 4,
    backgroundColor: Colors.theme_color,
    marginTop: SH(110)
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
  },
  inactiveText: {
    color: 'black',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: SW(10),
    height: SH(35),
    backgroundColor: Colors.gray,
    marginHorizontal: SW(10),
    marginVertical: SH(5),
    marginBottom: SH(30)
  },
  icon: {
    marginHorizontal:SW(10),
  },
  sharecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: SW(15),
    paddingVertical: SH(10),
    paddingTop:0
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
    paddingVertical: SH(1),
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
    height: SH(90),
    resizeMode: "contain",
    marginHorizontal:SW(10),
    marginVertical:SH(10)
  },
  searchbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray,
    marginHorizontal: SW(10),
    borderRadius: 50,
    paddingHorizontal: SW(10),
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
    marginVertical:SH(10),
    marginBottom:SH(3)
  },
  cardData: {
    flexDirection: "row"
  },
  text: {
    fontFamily: "Poppins-Bold",
    fontSize: SF(13)
  },
  panditListData: {
    marginVertical: SH(10),
    marginBottom: SH(20),
    marginTop:0
  },
  leftContainer: {
    marginHorizontal: SW(10),
    marginVertical:SH(15)
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
    paddingVertical:SH(10),
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
    paddingVertical:SH(3),
    borderRadius: 5,
    marginHorizontal: SW(20),
    marginVertical:SH(20),
    borderRadius: 50
  },
  applyButtonText: {
    fontFamily: "Poppins-Bold",
    color: Colors.light,
    textAlign: "center"
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
    marginHorizontal:SW(10)
  },

});

export default styles;