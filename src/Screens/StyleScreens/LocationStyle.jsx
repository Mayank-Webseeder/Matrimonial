import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({

  righticons: {
    flexDirection: 'row',
    alignItems: "center"
  },
  topContainer: {
    marginBottom: SH(20)
  },

  image: {
    width: SW(350), height: SH(270), borderRadius: 10, resizeMode: "cover"
  },
  verifiedContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: SW(5),
    paddingVertical: SW(2),
    borderRadius: 5,
    alignSelf: "flex-end"
  },
  verifiedBadge: {
    width: SW(20),
    height: SH(20),
    marginRight: SW(1),
    resizeMode: "contain"
  },
  verifiedText: {
    color: "green",
    fontWeight: "bold",
    fontSize: SF(13),
    paddingHorizontal: SW(2),
    textTransform: "capitalize"
  },
  dot: {
    backgroundColor: Colors.light,
  },
  activeDot: {
    backgroundColor: Colors.light,
  },
  flexContainer1: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: SW(10),
    paddingVertical: SH(10),
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    marginVertical: SH(5),
  },

  leftContainer: {
    width: "52%",
    marginBottom: SH(10),
  },

  rightContainer: {
    width: "48%",
    paddingTop: SH(37),
    paddingLeft: SW(5),
    alignSelf: "flex-start",
  },

  HeadingText: {
    fontSize: SF(15),
    fontFamily: "Poppins-Bold",
    marginBottom: SH(5),
    textTransform: "capitalize"
  },

  text: {
    fontSize: SF(13),
    color: Colors.dark,
    marginBottom: SH(2),
    fontFamily: "Poppins-Regular",
    textTransform: "capitalize"
  },

  flexContainer: {
    paddingHorizontal: SW(10),
    paddingVertical: SH(10),
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 10,

  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"

  },

  toptext: {
    fontSize: SF(10),
    fontFamily: "Poppins-Regular",
    textTransform: "capitalize"
  },
  Idtext: {
    fontSize: SF(12),
    fontFamily: "Poppins-Bold",
  },
  flexContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  sharecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: SW(3),
    paddingVertical: SH(3),
    backgroundColor: Colors.light,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: SF(12),
    color: Colors.dark,
    marginTop: SH(5),
    textTransform: "capitalize"
  },
  interestedButton: {
    backgroundColor: Colors.theme_color,
    paddingHorizontal: SW(20),
    paddingVertical: SH(3),
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.light,
    fontFamily: "Poppins-Medium",
    fontSize: SF(12),
    textTransform: "capitalize",

  },
  ButtonText: {
    color: Colors.light,
    fontFamily: "Poppins-Bold",
    fontSize: SF(12),
    textAlign: "center",
    backgroundColor: Colors.theme_color,
    paddingVertical: SH(5),
    marginTop: SH(10),
    borderRadius: 10,
    marginHorizontal: SW(90),
    textTransform: "capitalize"
  },
  smallImage: {
    width: SW(80),
    height: SH(85),
    resizeMode: "cover",
    borderRadius: 50
  },
  flexContainer3: {
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: SH(5),
    paddingHorizontal: SW(10),
    paddingVertical: SH(10)
  },
  flexContainer4: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    flex: 1,
    textTransform: "capitalize"
  },
  icon: {
    fontSize: SF(20),
  },
  checkIcon: {
    color: 'green',
  },
  crossIcon: {
    color: 'red',
  },
  flexContainer5: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SW(10),
    paddingVertical: SH(10)
  },
  bottomContainer: {
    paddingVertical: SH(10),
    paddingHorizontal: SW(10),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "gray",
    borderWidth: 1
  },
  declineButton: {
    backgroundColor: "#c10007",
    paddingVertical: SH(7),
    paddingHorizontal: SH(40),
    borderRadius: 50,
    marginHorizontal: SW(10),
    display: "flex",
    flexDirection: "row"
  },
  declineButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
    fontSize: SF(15),
    marginHorizontal: SW(5)
  },
  acceptButton: {
    backgroundColor: "#008236",
    paddingVertical: SH(7),
    paddingHorizontal: SH(40),
    borderRadius: 50,
    marginHorizontal: SW(10),
    display: "flex",
    flexDirection: "row"
  },
  acceptButtonText: {
    color: "#fff", fontFamily: "Poppins-Regular",
    fontSize: SF(15),
    textTransform: "capitalize"
  },
  warningText: {
    color: "red",
    fontSize: SF(14),
    textAlign: "center",
    marginVertical: SH(10),
    fontFamily: "Poppins-Bold",
    textTransform: "capitalize"
  },

});

export default styles;
