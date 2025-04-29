import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
   panditListData: {
      marginVertical: SH(10),
      marginBottom: SH(20),
      marginTop: 0
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: SH(200),
    },
    emptyText: {
      fontSize: SF(15),
      color:"gray",
      fontFamily: 'Poppins-Regular',
    },
    fixedHeader: {
      marginVertical: SH(10),
      paddingBottom:SH(20)
    },
  righticons: {
    flexDirection: 'row',
    alignItems:"center"
  },
  image: {
    width: SW(90),
    height: SH(90),
    resizeMode: "cover",
    borderRadius:50,
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
    justifyContent:"space-between"
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
    marginHorizontal: SW(10),
    marginVertical: SH(7),
    marginBottom: SH(3),
    paddingVertical:SH(3)
  },
  cardData: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: SW(10),
    paddingVertical: SH(10)
  },

  CityArea: {
    flexDirection: 'row',
    alignItems:"center",
    justifyContent:"space-between",
    marginRight:SW(5)
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
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SW(10),
  },
  text: {
    fontFamily: "Poppins-Medium",
    fontSize: SF(13)
  },
  smalltext: {
    fontFamily: "Poppins-Regular",
    fontSize: SF(12)
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: SF(15)
  },
  Nametext:{
    fontFamily: "Poppins-Medium",
    fontSize: SF(13)
  },
  sliderContainer: {
    marginBottom: SH(20),
    // marginTop: SH(10)
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

  ButtonContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-between",
    marginVertical:SH(15)
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
    paddingVertical: SH(3),
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  RequestText: {
    color: Colors.light,
    fontSize: SF(10),
    fontFamily: "Poppins-Regular",
    paddingHorizontal:SW(2)
},
  buttonText: {
    color: Colors.light,
    fontFamily: "Poppins-Regular",
    fontSize: SF(10),
    marginLeft: SW(2)
  },

  leftContainer: {
    marginLeft: SW(10), flex: 1,
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
    top: SH(300),
    left: SW(150)
  },
  label:{
    fontSize: SF(13),
    marginBottom: SH(5),
    fontFamily: "Poppins-Medium"
  },
  modalOverlay1: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
},
  modalContent1: {
    position: "absolute",
    backgroundColor: "white",
    paddingHorizontal: SW(15),
    paddingVertical: SH(10),
    borderRadius: 10,
    width: SW(150),
    elevation: 5,
},
modalOption1: {
    paddingHorizontal: SW(10),
    paddingVertical: SH(2),
},
optionText: {
    fontSize: SF(15),
    fontFamily: "Poppins-Regular"
},
  updateText:{
    fontSize:SF(15),
    fontFamily:"Poppins-Regular",
    textAlign:"center"
  },
  deleteText:{
    fontSize:SF(15),
    fontFamily:"Poppins-Regular",
    textAlign:"center",
    color:"red"
  }

});

export default styles;
