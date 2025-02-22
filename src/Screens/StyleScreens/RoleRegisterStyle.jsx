import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";
const styles = StyleSheet.create({
  editText: {
    fontSize: SF(15),
    color: Colors.theme_color,
    marginLeft: SW(250),
    fontFamily: "Poppins-Bold"
  },
  button: {
    backgroundColor:Colors.theme_color,
    paddingVertical: SH(5),
    borderRadius: 5,
    alignItems: 'center',
    marginTop: SH(20),
    marginBottom: SH(80)
  },
  buttonText: {
    color: Colors.light,
    fontSize: SF(15),
    fontWeight: 'Poppins-Bold',
    textTransform:"capitalize"
  },
  arrow: {
    marginLeft: SW(290)
  },
  PickPhotoButton: {
    backgroundColor:Colors.theme_color,
    paddingHorizontal: SW(15),
    paddingVertical: SH(5),
    borderRadius: 5,
    alignItems: 'center',

  },
  PickPhotoText: {
    color: Colors.light,
    fontSize: SF(13),
    fontWeight: 'Poppins-Bold',
  },
  photopickContainer: {
    flexDirection: "row", justifyContent: "space-between",
    marginBottom: SH(5)
  },
  photosContainer: {
    marginTop: SH(10),
    paddingVertical: SH(10),
  },

  photo: {
    width: SW(100),
    height: SH(100),
    marginHorizontal: SW(5),
    marginVertical: SH(5),
    borderRadius: 10,
  },
  checkboxContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: SH(15),
    paddingHorizontal: SW(10),
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  checkboxContainer1: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: SH(5),
    borderRadius: 5,
    height: SH(40),
    justifyContent: "center",
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center"
  },
  servicesLabel: {
    fontSize: SF(15),
    marginBottom: SH(5),
    fontFamily: "Poppins-Bold"
  }

});

export default styles;