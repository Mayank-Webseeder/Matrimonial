import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light,
        marginBottom: SH(10)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SW(15),

    },
    button: {
        backgroundColor: Colors.theme_color,
        padding: SW(7),
        borderRadius: 5

    },
    buttonText: {
        color: Colors.light,
        fontSize: SF(13)

    },
    card: {
        backgroundColor: Colors.light,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        marginBottom: SH(10),
        margin: SW(10),
        padding: SW(10),
        borderRadius: 10

    },
    EventheaderImage: {
        width: SW(50),
        height: SH(50),
        borderRadius: 50
    },
    cardheader: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    imageContainer1: {
        flexDirection: "row",
        padding: SW(3)
    },
    image4: {
        margin: SW(2)
    },
    image1: {
        margin: SW(2), height: SH(80), width: SW(98)
    },
    image2: {
        margin: SW(2),
        height: SH(80),
        width: SW(98)
    },
    image3: {
        height: SH(180)
    },
    imageContainer2: {
        flexDirection: "row",
        margin: SW(3)
    },
    captionText: {
        margin: SW(7),
        fontSize: SF(12),
        fontFamily: "Poppins-Regular"
    },
    name: {
        fontSize: SF(12),
        fontFamily: "Poppins-Bold",
        marginLeft: SW(5)
    },
    date_time: {
        fontSize: SF(12),
        fontFamily: "Poppins-Regular",
        marginLeft: SW(5)
    },
    hour: {
        color: 'gray',
        fontSize: SF(10),
        fontFamily: "Poppins-Regular",
    }


});

export default styles;