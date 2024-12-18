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
        paddingTop: SH(300),
        marginTop: SH(10)
    },

    button: {
        backgroundColor: Colors.theme_color,
        padding: SW(7),
        marginHorizontal: SW(35),
        borderRadius: 50,
        marginTop: SH(35)

    },
    buttonText: {
        textAlign: "center",
        color: Colors.light,
        fontFamily: "Poppins-Bold",
        fontSize: SF(20)
    },
    passwordText: {
        fontFamily: "Poppins-regular",
        fontSize: SF(18),
        color: Colors.dark,
        marginHorizontal: SW(40),
        textAlign: "center",
        marginBottom: SH(35)
    },
    inputText: {
        borderColor: Colors.theme_color,
        padding: SW(10),
        borderWidth: 1,
        borderRadius: 15,
        marginHorizontal: SW(25),
        paddingVertical: SH(20),
        color: Colors.dark,
        marginBottom:SH(15)
    },
    phoneText: {
        position: "absolute",
        left: SW(45),
        top: SH(490),
        backgroundColor: Colors.light,
        zIndex: 10,
        paddingHorizontal: SW(5),
        paddingVertical: SH(2),
        color: Colors.theme_color
    },
    password: {
        position: "absolute",
        left: SW(45),
        top: SH(566),
        backgroundColor: Colors.light,
        zIndex: 10,
        paddingHorizontal: SW(5),
        paddingVertical: SH(2),
        color: Colors.theme_color
    }

});

export default styles;
