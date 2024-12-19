import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding:SW(20),
    backgroundColor:Colors.light,
  },
  header: {
    flexDirection:"row"
  },
  Text: {
    fontSize:SF(24),
   fontFamily:"Poppins-Bold",
    color:Colors.theme_color,
  },
  headerText:{
    fontSize:SF(17),
    fontFamily:"Poppins-Regular",
    color:Colors.theme_color,
    marginLeft:SW(10),
    marginBottom:SH(50)
  },
  description: {
    fontSize:SF(13),
    color:Colors.theme_color,
    marginBottom:SH(10),
    fontFamily:"Poppins-Bold"
  },
  textInput:{
    borderColor:Colors.gray,
    borderWidth:1,
    paddingBottom:SH(60),
    borderRadius:10,
    marginBottom:SH(50)
  },
  submitButton: {
    backgroundColor:Colors.theme_color,
    padding:SW(15),
    borderRadius: 5,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize:SF(15),
    fontWeight: 'bold',
  },
 ratingContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom:SH(25)
},
star: {
  marginHorizontal:SW(3),
}

});

export default styles;
