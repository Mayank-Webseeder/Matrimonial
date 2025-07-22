import { StyleSheet } from 'react-native';
import { SH, SW, SF } from '../../utils/Dimensions';
import Colors from '../../utils/Colors';

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: SH(290),
    },
    contactCard1: {
        paddingVertical: SH(5),
        paddingHorizontal: SW(20),
        marginHorizontal: SW(10),
        marginRight: SW(150),
        borderRadius: 12,
        alignItems: 'center',
        marginTop: SH(195),
        flexDirection:"row"
    },
    contactCard: {
        // paddingVertical: SH(5),
        paddingHorizontal: SW(20),
        // marginVertical: SH(20),
        marginHorizontal: SW(10),
        marginRight: SW(130),
        borderRadius: 12,
        alignItems: 'center',
    },
    title: {
        fontSize: SF(18),
        fontFamily: 'Poppins-Bold',
        color: Colors.light,
        marginBottom: SH(5),
    },
    subtitle: {
        fontSize: SF(14),
        color: Colors.light,
        marginBottom: SH(15),
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: SW(2),
    },
    contactText: {
        color: Colors.dark,
        fontSize: SF(9.5),
        marginLeft: SW(3),
        fontFamily:'Poppins-Bold',
    },
    socialContainer: {
        flexDirection: 'row',
        marginTop: SH(10),
    },
    socialIcon: {
        marginHorizontal: SW(10),
    },
    button: {
        backgroundColor: Colors.theme_color,
        paddingHorizontal: SW(15),
        paddingVertical: SH(7),
        borderRadius: 5,
        alignItems: 'center',
        marginTop: SH(10),
    },
    buttonText: {
        color: 'white',
        fontSize: SF(15),
        fontFamily: 'Poppins-Bold',
    },
    errorText: {
        color: 'red',
        fontSize: SF(13),
        fontFamily: 'Poppins-Regular',
    },
    errorInput: {
        borderColor: 'red',
        borderWidth: 1,
    },

});

export default styles;
