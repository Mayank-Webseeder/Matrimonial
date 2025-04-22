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
    color: "gray",
    fontFamily: 'Poppins-Regular',
  },
  fixedHeader: {
    marginVertical: SH(10),
    paddingBottom: SH(20)
  },
  righticons: {
    flexDirection: 'row',
  },
  image: {
    width: SW(100),
    height: SH(75),
    resizeMode: "cover",
    marginHorizontal: SW(10),
    marginVertical: SH(10),
    borderRadius: 5
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // ✅ Android only
    marginHorizontal: SW(10),
    marginVertical: SH(7),
    marginBottom: SH(3),
    paddingVertical: SH(3),
  },
  cardData: {
    flexDirection: "row"
  },
  text: {
    fontFamily: "Poppins-Bold",
    fontSize: SF(13)
  },
  sliderContainer: {
    marginBottom: SH(10),
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
    marginHorizontal: SW(15),
    marginTop: -SH(10)
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
    paddingHorizontal: SH(15),
    paddingVertical: SH(3),
    borderRadius: 8,
    alignItems: "center",
    width: SW(80)
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
    justifyContent: "center",
    marginVertical: SH(15),
    marginBottom: SH(36),
    justifyContent:"space-between"
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
  label: {
    fontSize: SF(13),
    marginBottom: SH(5),
    fontFamily: "Poppins-Medium"
  }

});

export default styles;
