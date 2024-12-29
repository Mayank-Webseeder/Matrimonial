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
        justifyContent: "space-between",
        marginVertical: SH(10),
    },
    IconsButton: {
        alignItems: "center",
        marginVertical: SH(5),
        marginHorizontal: SW(15)

    },
    logotext: {
        color: Colors.theme_color,
        fontSize: SF(12),
        fontFamily: "Poppins-Regular",
    },
    icon: {
        borderColor: Colors.theme_color,
        borderWidth: 1,
        padding: SW(7),
        borderRadius: 50
    },
    Selectedicon: {
        backgroundColor: Colors.theme_color,
        padding: SW(7),
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
    flex:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:SW(7)
    },
    selectedButton:{
        backgroundColor:Colors.theme_color
    },
    bottomImage:{
        width: "100%",
        height: SH(300),
        marginBottom:SH(10)

    }

})
export default styles