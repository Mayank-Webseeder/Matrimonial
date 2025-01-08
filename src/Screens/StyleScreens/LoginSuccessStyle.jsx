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
        alignItems: "center",  
        marginTop:SH(200)
    },

    text: {
        fontSize: SF(24),
        fontFamily: "Poppins-Bold",
        color: Colors.dark,
        textAlign: "center",
        marginTop: SH(10),
    },
    success:{
        fontSize: SF(18),
        fontFamily: "Poppins-Regular",
        color: Colors.dark,
        textAlign: "center",
        marginTop: SH(10),
        marginHorizontal:SW(50)
    },
    button: {
        backgroundColor: Colors.theme_color,
        paddingHorizontal: SW(7),
        paddingVertical:SH(7),
        marginHorizontal: SW(35),
        borderRadius: 50,
        marginTop: SH(35),
        width:SW(300)

    },
    buttonText: {
        textAlign: "center",
        color: Colors.light,
        fontFamily: "Poppins-Bold",
        fontSize: SF(20)
    },
    success_image: {
        width: SW(100),
        height: SH(105),
        resizeMode: "cover",
    },
});

export default styles;
