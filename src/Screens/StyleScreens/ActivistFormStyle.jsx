import { StyleSheet } from 'react-native';
import Colors from '../../utils/Colors';
import { SH, SW, SF } from '../../utils/Dimensions';

const styles = StyleSheet.create({
    errorInput: {
        borderColor: 'red',
        borderWidth: 1,
    },
    tag: {
        flexDirection: 'row',
        backgroundColor: '#E0E0E0',
        paddingHorizontal: SW(10),
        paddingVertical: SH(5),
        borderRadius: 20,
        marginVertical: SH(5),
        marginHorizontal: SW(5),
        alignItems: 'center',
    },
    tagText: {
        color: 'green',
        marginRight: SW(8),
        fontFamily:"Poppins-Regular"
    },
    removeTag: {
        color: 'red',
        fontSize: SF(16),
        fontFamily: 'Poppins-Bold',
    },
    radioGroup: {
        flexDirection: 'row',
        marginBottom: SH(15),
    },
    radioButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: SW(20),
        paddingVertical: SH(5),
        marginRight: SW(10),
    },
    radioSelected: {
        backgroundColor: '#007BFF',
    },
    radioText: {
        color: '#000',
           fontFamily:"Poppins-Regular"
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
        textAlign: 'center',
           fontFamily:"Poppins-Regular"
    },
    imagePreviewContainer: {
        marginVertical: SH(10),
        width: SW(70),
        height: SH(70),
        borderRadius: 10,
    },
    submitButton: {
        backgroundColor: Colors.theme_color,
        paddingVertical: SH(5),
        borderRadius: 5,
        alignItems: 'center',
        marginTop: SH(20),
        marginBottom: SH(80),
    },
    submitText: {
        color: Colors.light,
        fontSize: SF(15),
         fontFamily:"Poppins-Medium",
        textTransform: 'capitalize',
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
        color: 'gray',
        paddingVertical: SH(10),
           fontFamily:"Poppins-Regular"
    },
    arrow: {
        marginLeft: SW(10),
    },
    errorText: {
        color: 'red',
        fontSize: SF(13),
        fontFamily: 'Poppins-Regular',
    },
});

export default styles;
