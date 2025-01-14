import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingTop: SH(35),
    paddingHorizontal: SW(6)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SW(10),
    paddingVertical: SH(7),
    paddingLeft: SW(1),
    paddingTop: 0

  },
  headerText: {
    color: Colors.theme_color,
    fontSize: SF(15),
    fontFamily: "Poppins-Regular",
    marginHorizontal: SW(10)
  },
  righticons: {
    flexDirection: 'row',
    alignItems:"center"
  },
  image: {
    width: SW(100),
    height: SH(100),
    resizeMode: "contain"
  },
  searchbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray,
    marginHorizontal: SW(10),
    borderRadius: 50,
    paddingHorizontal: SW(10),
    width: SW(320)
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: SH(3),
    marginHorizontal: SW(10),
    marginVertical: SH(10)
  },
  cardData: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: SW(10),
    paddingVertical: SH(10)
  },

  CityArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SH(5),
  },

  sharecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: SH(10),
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SW(10),
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: SF(12)
  },
  Nametext: {
    fontFamily: "Poppins-Bold",
    fontSize: SF(15)
  },
  sliderContainer: {
    marginBottom: SH(30),
    marginTop: SH(10)
  },
  sliderImage: {
    width: "100%",
    height: SH(180),
    resizeMode: 'cover',
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
    marginHorizontal: SW(2),
    marginTop: SH(105)
  },
  activeDot: {
    width: SW(25),
    height: SH(5),
    borderRadius: 4,
    backgroundColor: Colors.theme_color,
    marginTop: SH(105)
  },

  panditListData: {

    marginBottom: SH(200)
  },
  ButtonContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    width: SW(100),
    height: SH(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    // marginVertical: SH(20),
    borderRadius: 8,
    marginHorizontal: SW(6),

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
    fontSize: SF(15),
  },
  inactiveText: {
    color: 'black',
    fontFamily: "Poppins-Regular",
    fontSize: SF(15),
  },
  icon: {
    marginHorizontal: SW(10),
  },

  iconText: {
    fontSize: SF(13),
    color: Colors.dark,
    marginVertical: SH(5),
    marginHorizontal: SW(10)
  },
  Button: {
    backgroundColor: Colors.theme_color,
    paddingHorizontal: SW(20),
    paddingVertical: SH(5),
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  buttonText: {
    color: Colors.light,
    fontFamily: "Poppins-Regular",
    fontSize: SF(10),
    marginLeft: SW(2)
  },

  leftContainer: {
    marginLeft: SW(10), flex: 1, marginTop: SH(7)
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
    fontFamily: "Poppins-Bold",
    color: Colors.light,
    textAlign: "center"
  },
  inputContainer: {
    height: SH(40),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: SH(10),
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
    marginHorizontal: SW(10),
    marginVertical: SH(10)
  },


});

export default styles;
