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
    date: {
        borderColor:Colors.gray,
        borderWidth: 1,
        width: "100%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10, 
        paddingVertical: 10, 
    },
    dateText: {
        flex: 1,
        fontSize:SF(16),
        color:Colors.dark,
    },
    arrow: {
        marginLeft:SW(10),
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
        borderRadius:10,
        color:Colors.dark

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
    inputContain:{
        borderColor:Colors.gray,
        borderWidth:1,
        width:"60%",
        borderRadius:10
    }, modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%', // Adjust based on your design
    },
});

export default styles;
