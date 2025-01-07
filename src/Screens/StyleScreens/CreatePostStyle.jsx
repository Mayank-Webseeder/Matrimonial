import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.light,
        paddingTop: SW(20)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SW(10),
        paddingLeft: 0
    },
    headerText: {
        color: Colors.theme_color,
        fontSize: SF(15),
        fontFamily: "Poppins-Regular"
    },
    righticons: {
        flexDirection: 'row',
    },
    postHeader: {
        flexDirection: "row",
        padding: SW(10),
        alignItems: "center"
    },
    postTextContainer: {
        marginLeft: SW(5)
    },
    postText: {
        fontSize: SF(13),
        color: Colors.theme_color,
        fontFamily: "Poppins-Regular"
    },
    textContainer:{
        margin:SW(10)
    },
    input:{
        padding:SH(10),
        borderRadius:10,
        borderWidth:1,
        borderColor:"gray",
        margin:SH(10)
    },
    Textinput:{
        padding:SH(10),
        borderRadius:10,
        borderWidth:1,
        borderColor:"gray",
        margin:SH(10),
        paddingBottom:SH(130)
    },
    Text:{
        color:Colors.theme_color,
        fontSize:SF(13),
        fontFamily:"Poppins-Regular"
    },
    addPhoto:{
        flexDirection:"row",
        justifyContent:"space-between",
        margin:SW(20)
    }
})

export default styles