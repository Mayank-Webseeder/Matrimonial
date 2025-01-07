import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import { SW, SH, SF } from "../../utils/Dimensions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light,
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
    optionsContainer: {
        margin: SW(50),
    },
    optionButton: {
        backgroundColor: Colors.theme_color,
        paddingVertical: SH(5),
        paddingHorizontal: SW(20),
        marginBottom: SH(15),
        borderRadius: 5,
    },
    optionText: {
        color: Colors.light,
        fontSize: SF(16),
        textAlign: 'center',
    },
    Text: {
        fontSize: SF(15),
        margin: SW(25),
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
        padding: SW(20),
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
        marginHorizontal: SH(10),
    },
    modalButtonText: {
        color: Colors.light,
        fontSize: SF(15),
        fontFamily: "Poppins-Regular",
    },
});

export default styles;
