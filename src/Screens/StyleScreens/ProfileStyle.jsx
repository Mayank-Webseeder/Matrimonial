import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import { SH, SW, SF } from "../../utils/Dimensions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: SH(10)
    },
    righticons: {
        flexDirection: 'row',
        alignItems: "center"
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    menuIcon: {
        width: SW(30),
        height: SH(30)
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: Colors.theme_color,
        borderRadius: 50,
        marginVertical: SH(10)
    },
    activeIcon: {
        backgroundColor: Colors.theme_color,
    },
    RepostText: {
        backgroundColor: Colors.theme_color,
        color: Colors.light,
        paddingVertical: SH(5),
        paddingHorizontal: SW(10),
        borderRadius: 5,
        fontFamily: "Poppins-Regular",
        fontSize: SF(13),
        marginVertical: SH(5),
        textAlign: "center",
        alignSelf: "flex-end",
        marginHorizontal: SW(10),
        marginBottom: 0
    },

    image: {
        width: SW(140),
        height: SH(150),
        resizeMode: 'cover',
        borderRadius: 100
    },
    cameraIcon: {
        position: "absolute",
        top: SH(250)
    },
    smallHeader: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    buttoncontainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: SW(10),
        marginVertical: SH(5),
        alignItems: "center"
    },
    name: {
        textAlign: "center",
        color: Colors.dark,
        fontFamily: "Poppins-Bold",
        fontSize: SF(15)
    },
    userDeatil: {
        paddingHorizontal: SW(10),
        borderRadius: 10,
    },
    topContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: SH(10),
        paddingHorizontal: SW(10),
        marginVertical: SH(15),
        marginBottom: 0,
        marginHorizontal: SW(7),
        borderRadius: 10,
        elevation: 10,
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    IconFlex: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    contentContainer: {
        marginHorizontal: SW(10),
        marginVertical: SH(10)
    },
    logotext: {
        color: Colors.theme_color,
        fontSize: SF(12),
        fontFamily: "Poppins-Regular",
    },

    IconsButton: {
        flexDirection: "column",
        alignItems: "center",
        paddingVertical: SH(5),
        paddingHorizontal: SW(10),
        marginHorizontal: SW(5),
        backgroundColor: "transparent",
        paddingTop: 0
    },
    logotext: {
        fontSize: SF(12),
        color: Colors.theme_color,
    },
    IconFlex: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: SH(10),
    },

    text: {
        fontFamily: "Poppins-Regular",
        fontSize: SF(15),
    },
    Gallerytext: {
        fontFamily: "Poppins-Regular",
        fontSize: SF(10),
        color: Colors.theme_color
    },
    detail: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    Formtitle: {
        fontFamily: "Poppins-Medium",
        fontSize: SF(18),
        color: Colors.theme_color
    },
    detailText: {
        fontFamily: "Poppins-Bold",
        fontSize: SF(15),
        color: Colors.theme_color
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
    input: {
        height: SH(40),
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: SH(10),
        paddingLeft: SW(10),
        borderRadius: 5,
        backgroundColor: 'white',
        color: Colors.dark,
    },
    DobInput: {
        height: SH(40),
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: SH(10),
        paddingLeft: SW(10),
        borderRadius: 5,
        backgroundColor: 'white',
        color: Colors.dark,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: SW(10)
    },
    imagePlaceholder: {
        fontFamily: "Poppins-Regular",
        color: Colors.gray
    },
    selectedImage: {
        width: SW(100),
        height: SH(100),
        borderRadius: 8,
        resizeMode: 'cover',
    },
    headText: {
        color: Colors.theme_color,
        fontSize: SF(15),
        fontFamily: "Poppins-Bold",
        marginHorizontal: SW(10),
        marginLeft: 0,
        marginVertical: SH(10)
    },
    button: {
        backgroundColor: Colors.theme_color,
        paddingVertical: SH(5),
        borderRadius: 5,
        alignItems: 'center',
        marginTop: SH(20),
        marginBottom: SH(80)
    },
    buttonText: {
        color: Colors.light,
        fontSize: SF(15),
        fontWeight: 'Poppins-Bold',
        textTransform: "capitalize"
    },
    inputHeading: {
        fontSize: SF(15),
        fontFamily: "Poppins-Medium",
        paddingVertical: SH(7)
    },
    flex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: SW(7),
        paddingVertical: SH(7)
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between", alignItems: "center"
    },
    dropdownContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    loading: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: SH(150)
    },
    errorText: {
        fontFamily: "Poppins-Medium",
        fontSize: SF(13),
        color: "red"
    },
    // subscripiton style 
    modalOverlay: {
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        marginHorizontal: SW(20),
        marginVertical: SH(20),
        paddingHorizontal:0,
        paddingVertical: SH(15),
        borderRadius: 10,
        maxHeight: '85%',
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal:SW(10),
        paddingBottom:SH(20),
      },
    card: {
        marginHorizontal:SW(10),
        backgroundColor: '#e8dae8',
        borderRadius: SW(12),
        overflow: 'hidden',
        marginVertical: SH(10),
        paddingHorizontal: SW(10),
        paddingVertical: SH(15),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        borderWidth: 0.5,
        borderColor: '#e0e0e0',
    },
    title: {
        fontSize: SF(18),
        fontFamily: "Poppins-Bold",
        marginBottom: SH(5),
        color: Colors.theme_color,
         textAlign:"center"
    },
    Text: {
        fontSize: SF(12),
        color: Colors.light,
        marginTop: SH(5),
        fontFamily: "Poppins-Regular",
        color: Colors.dark,
    },
    description: {
        fontSize: SF(12),
        color: Colors.light,
        marginTop: SH(10),
        fontFamily: "Poppins-Regular",
        color: Colors.dark,
    },
    closeButton: {
        // backgroundColor:Colors.theme_color,
        borderRadius: 5,
        paddingHorizontal: SW(10),
        paddingVertical: SH(5),
        alignItems: 'center',
        marginTop: SH(10),
    },
    closeText: {
        color: Colors.theme_color,
        fontFamily: "Poppins-Bold",
        fontSize: SF(13)
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SH(12),
    },
    buyButton: {
        backgroundColor: '#866fe7',
        paddingHorizontal: SW(10),
        paddingVertical: SW(5),
        borderRadius: 10,
        flex: 1,
        marginRight: SW(5),
        alignItems: 'center',
        marginVertical: SH(10)
    },
    buyButtonText: {
        color: 'white',
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        fontSize: SF(14)
    },
    trialButton: {
        backgroundColor: '#666266',
        paddingHorizontal: SW(10),
        paddingVertical: SW(5),
        borderRadius: 10,
        flex: 1,
        marginRight: SW(5),
        alignItems: 'center',
    },
    trialText: {
        color: 'white',
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        fontSize: SF(15)
    },
    buttonRowAligned: {
        marginTop: SH(10),
      },

})
export default styles