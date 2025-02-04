import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import { SW, SH, SF } from "../../utils/Dimensions";

const styles = StyleSheet.create({
    optionsContainer: {
        marginHorizontal: SW(50),
        marginVertical:SH(50)
    },
    optionButton: {
        backgroundColor: Colors.light_theme,
        paddingVertical: SH(10),
        paddingHorizontal: SW(20),
        marginBottom: SH(15),
        borderRadius: 5,
        borderColor:Colors.theme_color,
        borderWidth:1
    },
    optionText: {
        color: Colors.theme_color,
        fontSize: SF(16),
        textAlign: 'center',
    },
    Text: {
        fontSize: SF(20),
        marginHorizontal: SW(10),
        marginVertical:SH(25),
        color: Colors.theme_color,
        textAlign: "center"
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(247, 239, 239, 0.5)',
    },
    modalContainer: {
        width: SW(300),
        paddingHorizontal: SW(20),
        paddingVertical:SH(20),
        backgroundColor: Colors.white,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: SF(16),
        color: Colors.theme_color,
        marginBottom: SH(20),
        textAlign: 'center',
        fontFamily: "Poppins-Regular"
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        backgroundColor: Colors.theme_color,
        paddingVertical: SH(5),
        paddingHorizontal: SW(35),
        borderRadius: 5,
        marginHorizontal: SW(10),
    },
    modalButtonText: {
        color: Colors.light,
        fontSize: SF(15),
        fontFamily: "Poppins-Regular",
    },
});

export default styles;
