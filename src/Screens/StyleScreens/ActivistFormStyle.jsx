import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import { SH, SW, SF } from "../../utils/Dimensions";
const styles = StyleSheet.create({
    radioGroup: {
        flexDirection: 'row',
        marginBottom: SH(15),
    },
    radioButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: SW(10),
        paddingVertical: SH(10),
        marginRight: SW(10),
    },
    radioSelected: {
        backgroundColor: '#007BFF',
    },
    radioText: {
        color: '#000',
    },
    uploadButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: SW(10),
        paddingVertical: SH(10),
        alignItems: 'center',
        marginBottom: SH(15),
    },
    uploadText: {
        color: Colors.theme_color,
    },
    submitButton: {
        backgroundColor: Colors.theme_color,
        paddingHorizontal: SW(5),
        paddingVertical: SH(5),
        borderRadius: 5,
        alignItems: 'center',
        marginBottom:SH(20)
    },
    submitText: {
        color: '#fff',
        fontSize: SF(16),
        fontFamily: "Poppins-Bold"
    },
    photosContainer: {
        paddingVertical: SH(10),
    },

    photo: {
        width: SW(100),
        height: SH(100),
        marginRight: SW(5),
        borderRadius: 10,
    },
    dateText: {
        flex: 1,
        fontSize: SF(16),
        color: Colors.dark,
        paddingVertical:SH(10)
    },
    arrow: {
        marginLeft: SW(10),
    },
});

export default styles;
