import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import { SH, SW, SF } from "../../utils/Dimensions";

const styles = StyleSheet.create({

    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignItems: "center"
    },
    menuIcon: {
        width: SW(30),
        height: SH(30)
    },
    image: {
        width: "100%",
        height: SH(230),
        marginVertical: SH(10)
    },
    cameraIcon: {
        position: "absolute",
        top: SH(200)
    },
    smallHeader: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    name: {
        textAlign: "center",
        color: Colors.dark,
        fontFamily: "Poppins-Bold",
        fontSize: SF(17)
    },
    userDeatil: {
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
    editText: {
        color: Colors.theme_color,
        paddingVertical: SH(15),
        textAlign: "center",
        fontFamily: "Poppins-Bold",
        //  marginLeft:SW(250)
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: SW(15),
        paddingVertical: SW(15),
        // alignItems: 'center',
    },
    modalTitle: {
        fontSize: SF(18),
        fontFamily: "Poppins-Medium",
        marginBottom: SH(20),
        color: Colors.theme_color,
    },

    gallery: {
        borderColor: Colors.theme_color,
        borderWidth: 1,
        borderRadius: 50,
        paddingVertical: SH(7),
        marginRight: SW(217),
        alignItems: "center"
    },
    Gallerytext: {
        fontFamily: "Poppins-Regular",
        fontSize: SF(10),
        color: Colors.theme_color
    },
})
export default styles