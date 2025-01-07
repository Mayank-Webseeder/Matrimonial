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
    Text: {
        fontSize: SF(13),
        color: Colors.theme_color,
        fontFamily: "Poppins-Regular"
    },
    postDescriptionText:{
        fontSize: SF(13),
        color: Colors.dark,
        fontFamily: "Poppins-Regular",
        margin:SW(15)
    },
    likeShareComment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical:SH(10)
        
    },
    likeShare: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shareText: {
        fontSize: SF(10),
        fontFamily: 'Poppins-Regular',
        color: Colors.dark,
        marginLeft: SW(4),
    },
    image: {
        width: "100%",
        height: "auto",
        borderRadius: 10
    },

})

export default styles