import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import { SH, SW, SF } from "../../utils/Dimensions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light,
        paddingTop: SH(25),
        paddingHorizontal: SW(6)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SW(10),
        paddingVertical: SH(10),
        paddingLeft: 0,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignItems:"center"
    },
    headerText: {
        color: Colors.theme_color,
        fontSize: SF(15),
        fontFamily: "Poppins-Regular",
        marginHorizontal: SW(10)
    },
    menuIcon: {
        width: SW(30),
        height: SH(30)
    },
    image: {
        width: "100%",
        height: SH(270)
    },
    smallimage: {
        width: SW(100),
        height: SH(100),
        borderRadius: 50,
    },
    smallHeader: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        marginTop: SH(235)
    },
    name: {
        textAlign: "center",
        color: Colors.dark,
        fontFamily: "Poppins-Bold",
        fontSize: SF(17)
    },
    userDeatil: {
        marginTop: SH(60),
        borderColor: Colors.gray,
        borderWidth: 1,
        padding: SW(10),
        borderRadius: 10,
        marginHorizontal: SW(10),
        marginVertical: SH(10)
    },
    userData: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: SH(10)
    },
    IconFlex: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginVertical: SH(10),
    },
    IconsButton: {
        alignItems: "center",
        justifyContent: "center",
        width: SW(150),
        marginHorizontal: SW(10),
    },
    logotext: {
        fontSize: SF(13),
        textAlign: "center",
        marginTop: SH(5),
        color: Colors.theme_color,
    },
    Selectedicon: {
        backgroundColor: Colors.theme_color,
        borderRadius: 50,
        paddingHorizontal: SW(5),
        paddingVertical: SH(5)
    },
    icon: {
        backgroundColor: "transparent",
    },

    text: {
        fontFamily: "Poppins-Regular",
        fontSize: SF(15)
    },
})
export default styles