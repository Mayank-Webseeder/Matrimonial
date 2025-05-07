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


    text: {
        fontSize: SF(24),
        fontFamily: "Poppins-Bold",
        color: Colors.dark,
        textAlign: "center",
        margin: SW(75),
        paddingTop: SH(350)
    },

    signUpTextContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: SH(10)
    },

    signuptext: {
        fontFamily: "Poppins-Regular",
        fontSize: SF(15),
        color: Colors.dark,
    },

    boldSignupText: {
        fontFamily: "Poppins-Bold",
        fontSize: SF(15),
        color: Colors.dark,
        marginLeft: SW(7),
    },
    button: {
        backgroundColor: Colors.theme_color,
        padding: SW(7),
        marginHorizontal: SW(30),
        borderRadius: 50

    },
    buttonText: {
        textAlign: "center",
        color: Colors.light,
        fontFamily: "Poppins-Bold",
        fontSize: SF(20)
    },
    linkText: {
        color: Colors.theme_color,
        textDecorationLine: 'underline',
        fontFamily: "poppins-Regular",
        fontSize: SF(13),
        textAlign: "center",
        marginTop: SH(60)
    },
});

export default styles;
