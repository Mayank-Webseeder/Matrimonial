
import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import { SW,SH,SF } from "../../utils/Dimensions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light,
        padding: SW(5)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SW(10),
        paddingLeft:0,
        backgroundColor: Colors.light,
    },

    headerText: {
        color: Colors.theme_color,
        fontSize: SF(15),
        fontFamily: "Poppins-Regular"
    },
  
    label: {
      fontSize: SF(16),
      fontFamily:"Poppins-Bold",
      color: Colors.dark,
      marginBottom: SH(10),
    },
    dropdown: {
      height:SH(50),
      borderColor: Colors.gray,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal:SW(8),
      backgroundColor:Colors.light,
      marginBottom: SH(20),
    },
    placeholderStyle: {
      fontSize:SF(16),
      color: Colors.gray,
    },
    selectedTextStyle: {
      fontSize: SF(16),
      color: Colors.dark,
    },
    textInput: {
      borderWidth: 1,
      borderColor: Colors.gray,
      borderRadius: 10,
      padding:SW(10),
      fontSize: SF(14),
      marginBottom: SH(20),
      backgroundColor:Colors.light,
      textAlignVertical: 'top',
      height:SH(100),
    },
    submitButton: {
      backgroundColor: Colors.theme_color,
      padding: SW(3),
      borderRadius: 10,
      alignItems: 'center',
      marginTop: SH(20),
      margin:SW(20)
    },
    submitButtonText: {
      color:Colors.light,
      fontSize:SF(14),
      fontFamily:"Poppins-Bold"
    },
    contentContainer:{
      margin:SW(5)
    }
  });

  export default styles;
  