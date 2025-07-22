import { StyleSheet } from 'react-native';
import Colors from '../../utils/Colors';
import { SH, SW, SF } from '../../utils/Dimensions';

const styles = StyleSheet.create({

    label: {
        fontSize: SF(16),
        fontFamily: 'Poppins-Bold',
        color: Colors.dark,
        marginBottom: SH(10),
    },
    textInput: {
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 10,
        paddingHorizontal: SW(10),
        paddingVertical: SH(10),
        fontSize: SF(14),
        marginBottom: SH(20),
        backgroundColor: '#fff',
        textAlignVertical: 'top',
        height: SH(100),
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: SH(20),
        marginLeft:-SW(160),
    },
    submitButton: {
        backgroundColor: Colors.theme_color,
        paddingHorizontal: SW(3),
        paddingVertical: SH(5),
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: SH(20),
        marginHorizontal: SW(20),
    },
    submitButtonText: {
        color: Colors.light,
        fontSize: SF(14),
        fontFamily: 'Poppins-Bold',
    },
    contentContainer: {
        marginHorizontal: SW(10),
        marginVertical: SH(20),
    },
});

export default styles;
