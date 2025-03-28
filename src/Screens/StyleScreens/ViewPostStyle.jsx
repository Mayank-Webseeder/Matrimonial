import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    profileImage: {
        width: SW(50), height: SH(50), borderRadius: 50
    },
    righticons: {
        flexDirection: 'row',
        alignItems: "center"
    },
    postHeader: {
        flexDirection: "row",
        paddingHorizontal: SW(10),
        paddingVertical: SH(5),
        alignItems: "center"
    },
    postTextContainer: {
        marginHorizontal: SW(10)
    },
    Text: {
        fontSize: SF(13),
        color: Colors.theme_color,
        fontFamily: "Poppins-Regular"
    },
    postDescriptionText: {
        fontSize: SF(13),
        color: Colors.dark,
        fontFamily: "Poppins-Regular",
        marginHorizontal: SW(15),
        marginVertical: SH(10)
    },
    likeShareComment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: SH(10),
        marginHorizontal: SW(15)
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
        borderRadius: 10,
        marginBottom: SH(10)
    },
    profilePhoto: {
        width: SW(50),
        height: SH(50),
        borderRadius: 50
    }

})

export default styles