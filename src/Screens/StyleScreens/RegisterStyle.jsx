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
        backgroundColor: Colors.light,
        marginHorizontal: SW(5),
        borderRadius: 20,
        marginTop: SH(175),
        paddingHorizontal: SW(10),
        paddingVertical:SH(5),
        marginBottom: SH(10),
        shadowColor: Colors.theme_color,
        elevation: 5, 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.84,
    },
    text: {
        fontSize: SF(24),
        fontFamily: "Poppins-Bold",
        color: Colors.theme_color,
        marginVertical: SH(2),
        marginLeft:0
    },
    date: {
        borderColor: Colors.gray,
        borderWidth: 1,
        width: "100%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: SW(10),
        paddingVertical: SH(10),
        color:Colors.dark
    },
    dateText: {
        flex: 1,
        fontSize: SF(16),
        color: Colors.dark,
    },
    arrow: {
        marginLeft: SW(10),
    },
    title: {
        fontFamily: "Poppins-Medium",
        fontSize: SF(16),
    },
    input: {
        borderColor: Colors.gray,
        borderWidth: 1,
        width: "100%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: SW(10),
        paddingVertical: SH(10),
        color:Colors.dark
    },
    inputContainer: {
        marginVertical: SH(5)

    },
    button: {
        backgroundColor: Colors.theme_color,
        paddingHorizontal: SW(5),
        paddingVertical:SH(5),
        borderRadius: 50,
        marginTop: SH(30),
        width: "100%",
        marginBottom:SH(20)
    },

    buttonText: {
        textAlign: "center",
        color: Colors.light,
        fontFamily: "Poppins-Bold",
        fontSize: SF(17),
    },
    inputContain: {
        borderColor: Colors.gray,
        borderWidth: 1,
        width: "100%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: SW(10),
        paddingVertical: SH(10),
        color:Colors.dark
    }, modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dropdown:{
        borderColor: Colors.gray,
        borderWidth: 1,
        width: "100%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: SW(10),
        paddingVertical: SH(7),
    },
    backArrow:{
        marginHorizontal:SW(14),
        marginVertical:SH(30),
        marginHorizontal:SW(15)
    },
    errorText:{
        color:'red',
        fontSize:SF(13),
        fontFamily:"Poppins-Regular"
    },
    passwordContainer:{
        borderColor: Colors.gray,
        borderWidth: 1,
        width: "100%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between",
        paddingHorizontal: SW(10),
    },
    passwordInput:{
        color:Colors.dark  
    }
});

export default styles;