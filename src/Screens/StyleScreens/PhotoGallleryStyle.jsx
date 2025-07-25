import { StyleSheet } from 'react-native';
import Colors from '../../utils/Colors';
import { SH, SW, SF } from '../../utils/Dimensions';

const styles = StyleSheet.create({
    noImageText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: SF(16),
        marginTop: SH(20),
        paddingHorizontal: 20,
    },

    righticons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    menuIcon: {
        width: SW(30),
        height: SH(30),
    },
    image: {
        width: '100%',
        height: SH(250),
    },
    cameraIcon: {
        position: 'absolute',
        top: SH(220),
    },
    smallHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    editText: {
        color: Colors.theme_color,
        paddingVertical: SH(15),
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        //  marginLeft:SW(250)
    },
    name: {
        textAlign: 'center',
        color: Colors.dark,
        fontFamily: 'Poppins-Bold',
        fontSize: SF(15),
    },
    userDeatil: {
        borderColor: Colors.gray,
        borderWidth: 1,
        paddingHorizontal: SW(10),
        paddingVertical: SH(10),
        borderRadius: 10,
        marginHorizontal: SW(10),
    },
    userData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: SH(10),
    },
    IconFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: SH(10),
    },
    IconsButton: {
        alignItems: 'center',
        marginVertical: SH(5),
        marginHorizontal: SW(15),

    },
    logotext: {
        color: Colors.theme_color,
        fontSize: SF(12),
        fontFamily: 'Poppins-Regular',
    },
    icon: {
        borderColor: Colors.theme_color,
        borderWidth: 1,
        paddingHorizontal: SW(7),
        paddingVertical: SH(7),
        borderRadius: 50,
    },
    Selectedicon: {
        backgroundColor: Colors.theme_color,
        paddingHorizontal: SW(7),
        paddingVertical: SH(7),
        borderRadius: 50,
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: SF(15),
    },
    detailText: {
        fontFamily: 'Poppins-Bold',
        fontSize: SF(15),
    },
    headText: {
        fontFamily: 'Poppins-Bold',
        fontSize: SF(15),
        marginVertical: SH(1),
    },
    button: {
        backgroundColor: Colors.theme_color,
        marginHorizontal: SW(90),
        marginHorizontal: SW(20),
        marginVertical: SH(20),
        paddingHorizontal: SW(10),
        paddingVertical: SH(5),
        borderRadius: 10,
    },
    buttonText: {
        fontSize: SF(15),
        color: Colors.light,
        textAlign: 'center',
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SW(7),
        paddingVertical: SH(7),
    },
    selectedButton: {
        backgroundColor: Colors.theme_color,
    },
    bottomImage: {
        width: '100%',
        height: SH(300),
        marginBottom: SH(10),
        borderRadius: 10,
    },


});
export default styles;
