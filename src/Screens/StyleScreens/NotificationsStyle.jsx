import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    container: {
        padding: SW(15),
        flex: 1,
        backgroundColor: Colors.light,
        paddingTop: SH(25),
        paddingBottom: SH(60)
    },
    card: {
        backgroundColor: Colors.light,
        borderRadius: 10,
        overflow: 'hidden',
        margin: SW(6),
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: '98%',
        padding: SW(10)
    },
    header: {
        paddingBottom: SH(12),
        marginLeft:SW(5)
    },
    name: {
        fontFamily: "Poppins-Medium",
        fontSize: SF(13)

    },
    message: {
        fontFamily: "Poppins-Regular",
        fontSize: SF(11)
    }

});

export default styles;
