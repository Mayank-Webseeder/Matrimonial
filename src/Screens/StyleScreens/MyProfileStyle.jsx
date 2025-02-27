import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import { SH, SW, SF } from "../../utils/Dimensions";

const styles = StyleSheet.create({
    container1: {
        flexGrow: 1,
        marginVertical: SH(10)
    },
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
        width: '100%',
        height: undefined,
        aspectRatio: 1.5,
        resizeMode: 'cover',
        borderRadius: 10
    },
    cameraIcon: {
        position: "absolute",
        top: SH(0)
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
    headerText: {
        color: Colors.theme_color,
        fontSize: SF(15),
        fontFamily: "Poppins-Regular",
        marginHorizontal: SW(10)
    },
    userDeatil: {
        borderColor: Colors.gray,
        borderWidth: 1,
        paddingHorizontal: SW(10),
        paddingVertical: SH(5),
        borderRadius: 10,
        marginHorizontal: SW(10),
        marginVertical: SH(10),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    // userData: {
    //     // flexDirection: "row",
    //     // justifyContent: "space-between",
    //     marginVertical: SH(10)
    // },
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
        fontSize: SF(15),
        paddingVertical: SH(3)
    },
    editText: {
        color: Colors.theme_color,
        paddingVertical: SH(3),
        paddingHorizontal: SW(10),
        borderRadius: 5,
        textAlign: "center",
        fontFamily: "Poppins-Medium",
        backgroundColor: Colors.light_theme,
        marginHorizontal: SW(5),
        marginVertical: SH(5),
        fontSize: SF(12),
        borderColor: Colors.theme_color,
        borderWidth: 1
    },
    profileButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginHorizontal: SW(10),
        marginVertical: SH(5)
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
        borderRadius: 10,
        paddingVertical: SH(10),
        paddingHorizontal: SH(20),
        marginRight: SW(10),
        alignItems: "center"
    },
    Gallerytext: {
        fontFamily: "Poppins-Regular",
        fontSize: SF(13),
        color: Colors.theme_color,
        marginHorizontal: SW(5)
    },
    camera: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    CameraText: {
        marginLeft: 10,
        color: Colors.theme_color,
        fontSize: 16,
    },
    switchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SW(10),
        paddingVertical: SH(10)
    },
    selectedProfileText: {
        marginRight: SW(15),
        color: Colors.theme_color,
        fontFamily: "Poppins-Medium"
    },
    profilemodalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilemodalContainer: {
        width: '80%',
        backgroundColor: Colors.light,
        borderRadius: 10,
        paddingHorizontal: SW(10),
        paddingVertical: SH(10),
        alignItems: 'center',
    },
    profilemodalTitle: {
        fontSize: SF(18),
        fontFamily: "Poppins-Bold",
        marginBottom: SH(10),
    },
    profilemodalItem: {
        paddingHorizontal: SW(15),
        paddingVertical: SH(15),
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: '100%',
    },
    profilemodalItemText: {
        fontSize: SF(13),
        color: '#333',
    },
    profilecloseButton: {
        marginTop: SH(10),
        paddingHorizontal: SW(50),
        paddingVertical: SH(5),
        backgroundColor: Colors.theme_color,
        borderRadius: 5,
    },
    profilecloseButtonText: {
        color: Colors.light,
        fontFamily: "Poppins-Medium"
    },

})
export default styles