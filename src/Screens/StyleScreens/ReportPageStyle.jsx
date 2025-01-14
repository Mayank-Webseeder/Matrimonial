
import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import { SW,SH,SF } from "../../utils/Dimensions";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.light,
      paddingTop: SH(25),
      paddingHorizontal:SW(6)
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
      fontFamily: "Poppins-Regular",
      marginHorizontal: SW(10)
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
      paddingHorizontal: SW(3),
      paddingVertical:SH(3),
      borderRadius: 10,
      alignItems: 'center',
      marginHorizontal:SW(20),
      marginVertical:SH(50)
    },
    submitButtonText: {
      color:Colors.light,
      fontSize:SF(14),
      fontFamily:"Poppins-Bold"
    },
    contentContainer:{
      marginHorizontal:SW(5),
      marginVertical:SH(5),
      paddingVertical:SH(5),
      paddingHorizontal:SW(5)
    }
  });

  export default styles;
  