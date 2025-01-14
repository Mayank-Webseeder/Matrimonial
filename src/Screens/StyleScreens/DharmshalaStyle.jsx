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
    paddingHorizontal: SW(10),
    paddingVertical: SH(10),
    paddingLeft: 0
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
  image: {
    width: SW(100),
    height: SH(90),
    resizeMode: "contain",
    marginHorizontal: SW(10),
    marginVertical: SH(10),
    marginRight: 0
  },
  searchbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray,
    marginHorizontal: SW(10),
    borderRadius: 50,
    paddingHorizontal: SW(10),
    width: SW(300)
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
    marginVertical: SH(10),
    marginBottom: SH(3)
  },
  cardData: {
    flexDirection: "row"
  },
  text: {
    fontFamily: "Poppins-Bold",
    fontSize: SF(13)
  },
  sliderContainer: {
    marginBottom: SH(30),
    height: SH(180),
    marginTop: SH(10)
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
    marginTop: SH(105)
  },
  activeDot: {
    width: SW(25),
    height: SH(5),
    borderRadius: 4,
    backgroundColor: Colors.theme_color,
    marginTop: SH(105)
  },
  DharamSalaList: {
    marginVertical: SH(10),
    marginBottom: SH(200)
  },

  sharecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: SW(10),
    marginVertical: 0,
    paddingVertical: SH(10)
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: "row",
  },
  smalltext: {
    fontFamily: "Poppins-Regular",
    fontSize: SF(12)
  },

  iconText: {
    fontSize: SF(13),
    color: Colors.dark,
    marginVertical: SH(5),
    marginHorizontal: SW(5),
    fontFamily: "Poppins-Regular",
  },
  Button: {
    backgroundColor: Colors.theme_color,
    paddingHorizontal: SW(15),
    paddingVertical: SH(5),
    borderRadius: 8,
    alignItems: "center",
    width: SW(100)
  },
  buttonText: {
    color: Colors.light,
    fontFamily: "Poppins-Regular",
    fontSize: SF(11),
    marginLeft: SW(2)
  },
  mainContainer: {
    marginTop: SH(10)
  },
  filterContainer: {
    backgroundColor: Colors.gray,
    padding: SW(5),
    borderRadius: 50,
    flexDirection: "row",
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
    paddingVertical: SH(3),
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
    marginHorizontal: SH(10),
    marginVertical: SH(10)
  },
  leftContainer: {
    marginHorizontal: SW(10),
    marginVertical: SH(15)
  },
  RequestText: {
    color: Colors.light,
    fontSize: SF(10),
    fontFamily: "Poppins-Regular"
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

});

export default styles;
