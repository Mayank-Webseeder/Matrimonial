import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({

  Text: {
    fontSize: SF(24),
    fontFamily: "Poppins-Bold",
    color: Colors.theme_color,
  },
 
  description: {
    fontSize: SF(13),
    color: Colors.theme_color,
    marginBottom: SH(10),
    fontFamily: "Poppins-Bold"
  },
  textInput: {
    borderColor: Colors.gray,
    borderWidth: 1,
    paddingBottom: SH(60),
    borderRadius: 10,
    marginBottom: SH(50)
  },
  submitButton: {
    backgroundColor: Colors.theme_color,
    paddingHorizontal: SW(15),
    paddingVertical:SH(7),
    borderRadius: 5,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: SF(15),
   fontFamily:"Poppins-Bold"
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SH(25)
  },
  star: {
    marginHorizontal: SW(3),
  },
  menuIcon:{
    width:SW(30),
    height:SH(30)
  },
  feedBackContainer:{
    paddingHorizontal:SW(10),
    paddingVertical:SH(10)
  }

});

export default styles;
