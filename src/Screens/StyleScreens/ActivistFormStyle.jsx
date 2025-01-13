import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import { SH, SW, SF } from "../../utils/Dimensions";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light,
        paddingTop: SH(25),
        paddingHorizontal: SW(6),
        paddingBottom: SH(20)
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
    label: {
        fontSize: SF(15),
        marginBottom: SH(5),
        fontFamily: "Poppins-Medium",
    },
    input: {
        borderColor: Colors.gray,
        borderWidth: 1,
        width: "100%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: SW(10),
        paddingVertical: SH(10),
        color: Colors.dark,
        marginVertical: SH(5)
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: SW(10),
        paddingVertical: SH(10),
        marginBottom: SH(15),
    },
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
        color:Colors.theme_color,
    },
    submitButton: {
        backgroundColor: Colors.theme_color,
        paddingHorizontal: SW(5),
        paddingVertical: SH(5),
        borderRadius: 5,
        alignItems: 'center',
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
    },
});

export default styles;
