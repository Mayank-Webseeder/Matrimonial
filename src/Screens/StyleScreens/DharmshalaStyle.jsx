import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    padding: SW(10)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SW(10),

  },
  headerText: {
        color: Colors.theme_color,
        fontSize: SF(15),
        fontFamily: "Poppins-Regular"
    },
  image: {
    width: SW(100),
    height: SH(90),
    resizeMode: "contain"
  },
  searchbar: {
    backgroundColor: Colors.gray,
    marginHorizontal: SW(5),
    borderRadius: 50,
    paddingHorizontal: SW(10),
    width: SW(250),
  },
  card: {
    backgroundColor:Colors.light,
    borderRadius: 10,
    overflow: 'hidden',
    margin: SW(6),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '98%',
    padding: SW(10)
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
    height: SH(230),
    marginTop:SH(10)
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
  DharamSalaList: {
    marginVertical: SH(10),
    marginBottom: SH(200)
  },

  sharecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:Colors.light,
    margin: SW(5)
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: "row"
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
    alignItems: "center",
    marginLeft: SW(5),
    width:SW(100)
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
    padding: SW(10),
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
    padding: SW(10),
    width: '80%',
    borderRadius: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyButton: {
    backgroundColor: Colors.theme_color,
    padding: SW(10),
    borderRadius: 5,
    margin: SW(20),
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
    margin: SH(10)
  },
  leftContainer:{
    margin:SW(10)
  }

});

export default styles;
