import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "left", 
        marginHorizontal:SW(20) ,
        marginTop:SH(300)
       
    },
    title:{
   fontFamily:"Poppins-Bold",
   fontSize:SF(16)
    },
    input:{
        borderColor:Colors.gray,
        borderWidth:1,
        width:"100%",
        borderRadius:10

    },
    inputContainer:{
        marginVertical:SH(5)

    },
    button: {
        backgroundColor: Colors.theme_color,
        padding: SW(5),
        borderRadius: 50,
        marginTop: SH(30),
        width:"100%"
    },

    buttonText: {
        textAlign: "center",
        color: Colors.light,
        fontFamily: "Poppins-Bold",
        fontSize: SF(20),
    },

});

export default styles;
