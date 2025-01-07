import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingTop:SW(20)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SW(10),
    paddingLeft:0
  },
  headerText: {
    color: Colors.theme_color,
    fontSize: SF(15),
    fontFamily: "Poppins-Regular"
  },

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
    padding: SW(15),
    borderRadius: 5,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: SF(15),
    fontWeight: 'bold',
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
    padding:SW(10)
  }

});

export default styles;
