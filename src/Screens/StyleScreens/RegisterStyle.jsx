import { StyleSheet } from 'react-native';
import { SH, SW, SF } from '../../utils/Dimensions';
import Colors from '../../utils/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '105%',
        resizeMode: 'contain',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: Colors.light,
        marginHorizontal: SW(5),
        borderRadius: 20,
        marginTop: SH(130),
        paddingHorizontal: SW(10),
        paddingVertical: SH(5),
        marginBottom: SH(40),
        shadowColor: Colors.theme_color,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    text: {
        fontSize: SF(24),
        fontFamily: 'Poppins-Bold',
        color: Colors.theme_color,
        marginVertical: SH(2),
        marginLeft: 0,
        textAlign: 'center',
    },
    dateText: {
        flex: 1,
        fontSize: SF(16),
        color: 'gray',
        paddingVertical: SH(7),
    },
    arrow: {
        marginLeft: SW(10),
    },

    button: {
        backgroundColor: Colors.theme_color,
        paddingHorizontal: SW(5),
        paddingVertical: SH(5),
        borderRadius: 50,
        marginTop: SH(15),
        width: '100%',
        marginBottom: SH(25),
    },
    otpButton: {
        paddingHorizontal: SW(5),
        paddingVertical: SH(5),
        paddingRight: SW(10),
    },
    otpButtonText: {
        color: Colors.theme_color,
        fontFamily: 'Poppins-Bold',
        fontSize: SF(13),
    },
    buttonText: {
        textAlign: 'center',
        color: Colors.light,
        fontFamily: 'Poppins-Bold',
        fontSize: SF(17),
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    backArrow: {
    marginHorizontal: SW(15),
    marginVertical: SH(40),
    backgroundColor: 'rgba(0,0,0,0.4)', 
    width: SW(35),
    height: SW(35),
    borderRadius: SW(20),
    justifyContent: 'center',
    alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: SF(13),
        fontFamily: 'Poppins-Regular',
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: SH(20),
    },
    selectedImage: {
        width: SW(150),
        height: SH(150),
        borderRadius: 75,
    },
    imagePlaceholder: {
        color: 'gray',
        fontSize: SF(15),
        textDecorationLine: 'underline',
    },
    passwordContainer: {
        // borderColor: Colors.theme_color,
        paddingHorizontal: SW(10),
        // paddingVertical: SH(5),
        // borderWidth: 1,
        // borderRadius:10,
        // marginHorizontal: SW(25),
        borderColor: '#ccc',
        borderWidth: 1,
        color: Colors.dark,
        marginBottom: SH(10),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    passwordInput: {
        flex: 1,
        color: Colors.dark,
    },

});

export default styles;
