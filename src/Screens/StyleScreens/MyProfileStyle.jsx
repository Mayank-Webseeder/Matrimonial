import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import { SH, SW, SF } from "../../utils/Dimensions";

const styles = StyleSheet.create({
    container: {
        padding: SW(15),
        flex: 1,
        backgroundColor: Colors.light
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SH(20)
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerText: {
        fontSize: SF(15),
        color: Colors.theme_color,
        marginRight: SW(10)
    },
    menuIcon: {
        width: SW(30),
        height: SH(30)
    },
    RepostText: {
        backgroundColor: Colors.theme_color,
        color: Colors.light,
        padding: SW(10),
        borderRadius: 10,
        paddingHorizontal: SW(15)
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
        borderRadius: 10
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
        fontSize:SF(13),
        textAlign: "center",
        marginTop: 5,
        color: Colors.theme_color,
      },
      Selectedicon: {
        backgroundColor: Colors.theme_color,
        borderRadius: 50,
        padding:SW(5),
      },
      icon: {
        backgroundColor: "transparent",
      },
      
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: SF(15)
    },
    detail: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: SH(20)
    },
    detailText: {
        fontFamily: "Poppins-Bold",
        fontSize: SF(15)
    },
    input: {
        height: SH(40),
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: SH(10),
        paddingLeft: SW(10),
        borderRadius: 5,
        backgroundColor: 'white',
        color: Colors.dark
    },
    topinput: {
        height: SH(30),
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: SH(10),
        left: SW(60),
        borderRadius: 5,
        backgroundColor: 'white',
        color: Colors.dark,
        width: SW(130),
        top: SH(40),
        position: "absolute",
        zIndex: 999,
        padding: SW(5)
    },
    headText: {
        fontFamily: "Poppins-Bold",
        fontSize: SF(15),
        marginVertical: SH(1)
    },
    button: {
        backgroundColor: Colors.theme_color,
        marginHorizontal: SW(90),
        margin: SW(20),
        padding: SW(10),
        borderRadius: 10
    },
    buttonText: {
        fontSize: SF(15),
        color: Colors.light,
        textAlign: "center"
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
        padding: SW(7)
    },

})
export default styles