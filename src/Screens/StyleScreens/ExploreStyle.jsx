import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignItems: "center"
  },
  menuIcon: {
    width: SW(30),
    height: SH(30)
  },
  righticons: {
    flexDirection: 'row',
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
    marginHorizontal: SW(2),
    marginTop: SH(50)
  },
  activeDot: {
    width: SW(25),
    height: SH(5),
    borderRadius: 4,
    backgroundColor: Colors.theme_color,
    marginTop: SH(50)
  },
  ProfileImage: {
    width: "97%",
    height: SH(250),
    marginHorizontal: SW(5),
    marginVertical: SH(5),
    borderRadius: 10
  },
  verifiedContainer: {
    position: "absolute",
    top: SH(235),
    left: SW(257),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: SW(7),
    paddingVertical: SW(3),
    borderRadius: 5,
  },
  verifiedBadge: {
    width: SW(15),
    height: SH(15),
    marginRight: SW(5),
    resizeMode: "contain"
  },
  verifiedText: {
    color: "green",
    fontWeight: "bold",
    fontSize: SF(11),
  },
  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SW(10),
    marginRight: SW(20)
  },

  leftButtons: {
    flexDirection: "row",
    gap: SW(10)
  },

  button: {
    width: SW(140),
    height: SH(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  Text: {
    color: Colors.dark,
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
    fontSize: SF(13)
  },
  inactiveText: {
    color: 'black',
    fontFamily: "Poppins-Regular",
    fontSize: SF(13)
  },

  profileData: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: SW(10),
    // marginVertical: SH(10),
    // paddingVertical: SH(10),
    paddingHorizontal: SW(10),
    marginTop: 0, paddingTop: 0,
  },

  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  leftColumn: {
    flex: 1,
    paddingRight: SW(10),
    alignSelf: "stretch",
  },

  rightColumn: {
    flex: 1,
    paddingLeft: SW(12),
    alignSelf: "stretch",
  },

  text: {
    fontFamily: "Poppins-Regular",
    fontSize: SF(13),
    flexWrap: "wrap",
    maxWidth: "100%",
  },

  rowItem: {
    justifyContent: "center",
  },

  boldText: {
    fontFamily: "Poppins-Bold",
    fontSize: SF(18),
  },

  sharecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: SW(10),
    paddingVertical: SH(7),
    backgroundColor: Colors.light,
    marginHorizontal: SW(20)
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
    paddingHorizontal: SW(5),
    paddingVertical: SH(5),
    marginHorizontal: SW(10),
    marginVertical: SH(10)
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SH(200),
  },
  emptyText: {
    fontSize: SF(15),
    color: Colors.gray,
    fontFamily: 'Poppins-Regular',
  },

});

export default styles;