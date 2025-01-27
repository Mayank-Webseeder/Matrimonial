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
        paddingVertical: SH(5),
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
        marginLeft: 0,
        textAlign: "center"
    },
    dateText: {
        flex: 1,
        fontSize: SF(16),
        color: Colors.dark,
        paddingVertical: SH(10)
    },
    arrow: {
        marginLeft: SW(10),
    },

    button: {
        backgroundColor: Colors.theme_color,
        paddingHorizontal: SW(5),
        paddingVertical: SH(5),
        borderRadius: 50,
        marginTop: SH(30),
        width: "100%",
        marginBottom: SH(20)
    },

    buttonText: {
        textAlign: "center",
        color: Colors.light,
        fontFamily: "Poppins-Bold",
        fontSize: SF(17),
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    backArrow: {
        marginHorizontal: SW(14),
        marginVertical: SH(30),
        marginHorizontal: SW(15)
    },
    errorText: {
        color: 'red',
        fontSize: SF(13),
        fontFamily: "Poppins-Regular"
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical:SH(20),
    },
    selectedImage: {
        width:SW(150),
        height:SH(150),
        borderRadius: 75,
    },
    imagePlaceholder: {
        color:Colors.gray,
        fontSize:SF(15),
        textDecorationLine: 'underline',
    },

});

export default styles;