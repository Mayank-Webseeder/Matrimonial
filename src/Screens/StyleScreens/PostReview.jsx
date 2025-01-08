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
        paddingLeft:0,
        backgroundColor: Colors.light,
    },

    headerText: {
        color: Colors.theme_color,
        fontSize: SF(15),
        fontFamily: "Poppins-Regular"
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: SH(20),
    },
    image: {
        width: SW(150),
        height: SH(150),
        borderRadius: 10,
        resizeMode: 'cover',
    },
    uploadPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 10,
        width: SW(150),
        height: SH(150),
    },
    uploadText: {
        fontSize: SF(14),
        color: Colors.gray,
        marginTop: SH(10),
    },
    label: {
        fontSize: SF(16),
        fontFamily: "Poppins-Bold",
        color: Colors.dark,
        marginBottom: SH(10),
    },
    textInput: {
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 10,
        paddingHorizontal: SW(10),
        paddingVertical:SH(10),
        fontSize: SF(14),
        marginBottom: SH(20),
        backgroundColor: '#fff',
        textAlignVertical: 'top',
        height: SH(100),
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: SH(20),
    },
    submitButton: {
        backgroundColor: Colors.theme_color,
        paddingHorizontal: SW(3),
        paddingVertical:SH(3),
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: SH(20),
        marginHorizontal:SW(20)
    },
    submitButtonText: {
        color: Colors.light,
        fontSize: SF(14),
        fontFamily: "Poppins-Bold"
    },
    contentContainer:{
        marginHorizontal:SW(10),
        marginVertical:SH(20)
    }
});

export default styles;