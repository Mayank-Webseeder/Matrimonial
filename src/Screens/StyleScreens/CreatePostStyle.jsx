import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({

    righticons: {
        flexDirection: 'row',
        alignItems:"center"
    },
    postHeader: {
        flexDirection: "row",
        padding: SW(10),
        alignItems: "center"
    },
    postTextContainer: {
        marginHorizontal: SW(10)
    },
    postText: {
        fontSize: SF(13),
        color: Colors.theme_color,
        fontFamily: "Poppins-Regular"
    },
    textContainer: {
        marginHorizontal: SW(8),
        marginVertical: SH(5)
    },
    input: {
        padding: SH(10),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "gray",
        marginVertical: SH(10),
        marginHorizontal: SW(10)
    },
    Textinput: {
        paddingVertical: SH(10),
        paddingHorizontal: SW(10),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "gray",
        marginVertical: SH(10),
        marginHorizontal: SW(10),
        paddingBottom: SH(130)
    },
    Text: {
        color: Colors.theme_color,
        fontSize: SF(13),
        fontFamily: "Poppins-Regular"
    },
    addPhoto: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: SW(20),
        marginVertical: SH(10)
    },
    photosContainer: {
        marginHorizontal: SW(20),
        marginVertical: SH(10)
    },
    photo: {
        width: SW(100),
        height: SH(100),
        marginRight: SW(5),
        borderRadius: 10,
    },
    label: {
        fontFamily: "Poppins-Bold",
        marginVertical: SH(10)
    },
    PostButton: {
        backgroundColor: Colors.theme_color,
        borderRadius:5,
        paddingVertical: SH(7),
        paddingHorizontal: SW(6),
        marginVertical:SH(60),
        marginHorizontal:SW(40)
    },
    PostText: {
        color: Colors.light,
        fontSize: SF(13),
        textAlign:"center",
        fontFamily:"Poppins-Bold"
    }
})

export default styles