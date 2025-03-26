import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    background: {
        width: "100%",
        height: SH(230)
    },
    contactCard: {
        paddingVertical: SH(5),
        paddingHorizontal: SW(20),
        marginVertical: SH(20),
        marginHorizontal: SW(10),
        borderRadius: 12,
        alignItems: "center",
    },
    title: {
        fontSize: SF(18),
        fontWeight: "bold",
        color: Colors.light,
        marginBottom: SH(5),
    },
    subtitle: {
        fontSize: SF(14),
        color: Colors.light,
        marginBottom: SH(15),
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: SH(5),
        marginHorizontal:SW(5)
    },
    contactText: {
        color: Colors.light,
        fontSize: SF(14),
        marginLeft: SW(3),
    },
    socialContainer: {
        flexDirection: "row",
        marginTop: SH(10),
    },
    socialIcon: {
        marginHorizontal: SW(10),
    },
    button: {
        backgroundColor: Colors.theme_color,
        paddingHorizontal: SW(15),
        paddingVertical: SH(7),
        borderRadius: 5,
        alignItems: 'center',
        marginTop: SH(10)
    },
    buttonText: {
        color: 'white',
        fontSize: SF(15),
        fontFamily: "Poppins-Bold"
    },

});

export default styles;