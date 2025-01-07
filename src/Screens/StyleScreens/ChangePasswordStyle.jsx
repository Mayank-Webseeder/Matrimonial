import { StyleSheet } from "react-native";
import { SH,SW,SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light,
        paddingTop: SW(20)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SW(10),
        paddingLeft: 0
    },
    headerText: {
        color: Colors.theme_color,
        fontSize: SF(15),
        fontFamily: "Poppins-Regular"
    },
    Text: {
      fontSize: SF(16),
      color: Colors.theme_color,
      margin: SH(20),
      marginTop:SW(50),
    },
    inputContainer: {
      marginTop: SH(50),
      margin:SW(20)
    },
    input: {
      backgroundColor: Colors.light_theme,
      borderRadius: 5,
      marginBottom: SH(15),
      paddingHorizontal:SW(15),
      height:SH(45),
      borderColor: Colors.gray,
      borderWidth: 1,
      color:Colors.theme_color
    },
    errorText: {
      color: 'red',
      fontSize:SF(13),
      textAlign: 'center',
      marginBottom:SH(10),
    },
    optionButton: {
      backgroundColor: Colors.theme_color,
      paddingVertical:SW(5),
      paddingHorizontal:SW(20),
      marginBottom:SH(15),
      borderRadius: 5,
    },
    optionText: {
      color: Colors.light,
      fontSize: SF(15),
      fontFamily:"Poppins-Regular",
      textAlign:"center"
    },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: Colors.darkGrey,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: Colors.theme_color,
    padding: 10,
    borderRadius: 8,
    width: '50%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
