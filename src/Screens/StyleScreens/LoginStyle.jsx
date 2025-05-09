import { StyleSheet ,Platform} from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
        marginTop: SH(300),
    },
    button: {
        backgroundColor: Colors.theme_color,
        paddingHorizontal: SW(7),
        paddingVertical: SH(3),
        marginHorizontal: SW(35),
        borderRadius: 50,
        marginTop: SH(20),
    },
    buttonText: {
        textAlign: "center",
        color: Colors.light,
        fontFamily: "Poppins-Bold",
        fontSize: SF(20),
    },
    passwordText: {
        fontFamily: "Poppins-Regular",
        fontSize: SF(17),
        color: Colors.dark,
        marginHorizontal: SW(40),
        textAlign: "center",
        marginBottom: SH(5),
    },
    inputText: {
        borderColor: Colors.theme_color,
        paddingHorizontal: SW(10),
        paddingVertical: SH(10),
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: SW(25),
        color: Colors.dark,
        marginBottom: SH(20),
    },
    HeadingText: {
        backgroundColor: Colors.light,
        paddingHorizontal: SW(5),
        color: Colors.theme_color,
        marginLeft: SW(25),
        marginBottom: SH(5),
        fontSize: SF(15),
        fontFamily: "Poppins-Medium",
    },
    passwordContainer: {
        paddingHorizontal: SW(10),
        marginHorizontal: SW(25),
        borderColor:Colors.theme_color,
        borderWidth: 1,
        color: Colors.dark,
        marginBottom: SH(10),
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
    },
    passwordInput: {
        flex: 1,
        color: Colors.dark,
        paddingVertical: Platform.OS === 'ios' ? SH(10) : SH(10),
    },
    errorText: {
        color: "red",
        fontSize: SF(13),
        fontFamily: "Poppins-Regular",
        marginHorizontal: SW(30),
    },
    forgotPasswordButton: {
        alignSelf: "flex-end",
        marginRight: SW(30)
    },
    forgotPasswordText: {
        color: Colors.theme_color,
        fontFamily: "Poppins-Bold"
    }

});

export default styles;
