import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

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
        paddingLeft: 0
    },
    headerText: {
        color: Colors.theme_color,
        fontSize: SF(15),
        fontFamily: "Poppins-Regular",
        marginHorizontal: SW(10)
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
        paddingVertical: SH(2),
        paddingHorizontal: SW(6),
    },
    PostText: {
        color: Colors.light,
        fontSize: SF(12),
    }
})

export default styles