import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingTop: SH(30),
    paddingHorizontal: SW(6)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SW(15),
    paddingVertical: 0,
    paddingLeft: SW(5),
    backgroundColor: Colors.light,
    paddingTop: SH(30)
  },

  headerText: {
    color: Colors.theme_color,
    fontSize: SF(15),
    fontFamily: "Poppins-Regular"
  },
  form: {
    backgroundColor: Colors.light,
    paddingHorizontal: SW(20),
    paddingVertical: SH(10),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  label: {
    fontSize: SF(15),
    marginBottom: SH(5),
    fontFamily: "Poppins-Medium"
  },
  input: {
    height: SH(40),
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: SH(15),
    paddingHorizontal: SW(10),
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#800020',
    paddingHorizontal: SW(10),
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
  },
  arrow: {
    marginLeft: SW(290)
  },
  PickPhotoButton: {
    backgroundColor: '#800020',
    paddingHorizontal: SW(15),
    paddingVertical: SH(2),
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
    marginRight: SW(5),
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
  checkboxContainer1:{
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom:SH(5),
    borderRadius: 5,
    height:SH(40),
    justifyContent:"center",
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center"
  },
  servicesLabel:{
    fontSize: SF(15),
    marginBottom: SH(5),
    fontFamily: "Poppins-Bold"
  }

});

export default styles;