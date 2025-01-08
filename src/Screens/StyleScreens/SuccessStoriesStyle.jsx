import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

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
    },
    headerText: {
        color: Colors.theme_color,
        fontSize: SF(15),
        fontFamily: "Poppins-Regular"
    },
    righticons: {
        flexDirection: 'row',
        alignItems: "center",
        marginRight:SW(10)
    },
    postText: {
        fontSize: SF(13),
        color: Colors.light,
        backgroundColor: Colors.theme_color,
        padding: SW(3),
        paddingHorizontal: SW(15),
        margin: SW(10),
        borderRadius: 5
    },
    storyCard: {
        margin: SW(10)
    },
    storyImage: {
        width: "100%",
        height: SH(200),
        borderRadius: 10
    },
    textContainer: {
        marginTop: SW(10)
    },
    storyName: {
        fontSize: SF(15),
        fontFamily: "Poppins-Bold"
    },
    storyDescription: {
        fontSize: SF(13),
        fontFamily: "Poppins-Regular"
    },
    ratingContainer: {
        flexDirection: 'row',
        marginTop:SH(5),
      },


})

export default styles