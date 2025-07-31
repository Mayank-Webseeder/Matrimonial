import { StyleSheet } from 'react-native';
import { SH, SW, SF } from '../../utils/Dimensions';
import Colors from '../../utils/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },


    text: {
        fontSize: SF(24),
        fontFamily: 'Poppins-Bold',
        color: Colors.dark,
        textAlign: 'center',
        marginHorizontal: SW(75),
        marginVertical: SH(70),
        paddingTop: SH(350),
    },

    signUpTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SH(10),
    },
    boldSignupText: {
        fontFamily: 'Poppins-Bold',
        fontSize: SF(15),
        color: Colors.dark,
        marginLeft: SW(7),
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: SW(30),
        marginTop: SH(10),
    },
    button: {
        flex: 1, // Makes both buttons occupy equal width
        backgroundColor: Colors.theme_color,
        paddingVertical: SH(12),
        borderRadius: 50,
        marginHorizontal: SW(5),
        alignItems: 'center', // Center text inside
    },
    buttonText: {
        color: Colors.light,
        fontFamily: 'Poppins-Medium',
        fontSize: SF(16),
    },
    signuptext: {
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: SF(14),
        color: Colors.dark,
        marginTop: SH(20),
    },

    linkText: {
        color: Colors.theme_color,
        textDecorationLine: 'underline',
        fontFamily: 'poppins-Regular',
        fontSize: SF(13),
        textAlign: 'center',
        marginTop: SH(80),
    },
});

export default styles;
