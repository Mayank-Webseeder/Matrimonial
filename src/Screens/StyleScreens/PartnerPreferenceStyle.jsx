import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import { SH, SW, SF } from "../../utils/Dimensions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    backgroundColor: Colors.light,
    paddingTop: SH(25),
    paddingHorizontal:SW(6)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SW(10),
        paddingVertical:SH(10),
        paddingLeft: 0
    },

    headerText: {
        color: Colors.theme_color,
        fontSize: SF(15),
        fontFamily: "Poppins-Regular",
        marginHorizontal:SW(5),
        marginVertical:SH(5)
    },
    righticons: {
        flexDirection: 'row',
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    menuIcon: {
        width: SW(30),
        height: SH(30)
    },
    image: {
        width: "100%",
        height: SH(250)
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
        marginTop: SH(200)
    },
    name: {
        textAlign: "center",
        color: Colors.dark,
        fontFamily: "Poppins-Bold",
        fontSize: SF(15)
    },
    userDeatil: {
        marginTop: SH(60),
        borderColor: Colors.gray,
        borderWidth: 1,
        paddingHorizontal: SW(10),
        paddingVertical:SH(10),
        borderRadius: 10,
        marginHorizontal:SW(10)
    },
    userData: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: SH(10)
    },
    IconFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: SH(10),
    },
    IconsButton: {
        alignItems: "center",
        marginVertical: SH(5),
        marginHorizontal: SW(15)

    },
    contentContainer:{
     marginHorizontal:SW(10),
     marginVertical:SH(10)
    },
    logotext: {
        color: Colors.theme_color,
        fontSize: SF(12),
        fontFamily: "Poppins-Regular",
    },
    icon: {
        borderColor: Colors.theme_color,
        borderWidth: 1,
        paddingHorizontal: SW(7),
        paddingVertical:SH(7),
        borderRadius: 50
    },
    Selectedicon: {
        backgroundColor: Colors.theme_color,
        paddingHorizontal: SW(7),
        paddingVertical:SH(7),
        borderRadius: 50,
      },
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: SF(15)
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
        color: Colors.dark,
    },
    heightinput:{
        height: SH(40),
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: SH(10),
        paddingLeft: SW(10),
        borderRadius: 5,
        backgroundColor: 'white',
        color: Colors.dark,
        paddingTop:SH(5)
    },
    headText: {
        fontFamily: "Poppins-Bold",
        fontSize: SF(15),
        marginVertical: SH(1)
    },
    button: {
        backgroundColor: Colors.theme_color,
        marginHorizontal: SW(90),
        marginHorizontal: SW(20),
        marginVertical:SH(20),
        paddingHorizontal: SW(10),
        paddingVertical:SH(5),
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
        paddingHorizontal: SW(7),
        paddingVertical:SH(7)
    },
    selectedButton: {
        backgroundColor: Colors.theme_color
    }

})
export default styles