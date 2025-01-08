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
        fontFamily: "Poppins-Regular"
    },
    toggleContainer: {
        marginTop: SH(20),
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: SH(10),
        paddingVertical: SH(10),
        paddingHorizontal: SW(10),
        borderRadius: 5,
        backgroundColor: Colors.white,
        borderColor: Colors.gray,
        borderWidth: 2,
        borderRadius: 10,
        marginHorizontal: SW(10),
        marginVertical:SH(10),
        marginTop: 0
    },
    toggleLabel: {
        fontSize: SF(14),
        color: Colors.theme_color,
        fontFamily: 'Poppins-Regular',
    },
});

export default styles;