import { StyleSheet } from 'react-native';
import { SH, SW, SF } from '../../utils/Dimensions';
import Colors from '../../utils/Colors';

const styles = StyleSheet.create({
    profileImage: {
        width: SW(50), height: SH(50), borderRadius: 50,
    },
    righticons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginHorizontal: SW(3),
        marginVertical: SH(10),
        marginBottom: SH(3),
        paddingHorizontal: SW(5),
        paddingVertical: SH(5),
    },
    postHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: "space-between"
    },
    postTextContainer: {
        marginHorizontal: SW(10),
    },
    Text: {
        fontSize: SF(13),
        color: Colors.theme_color,
        fontFamily: 'Poppins-Regular',
    },
    postDescriptionText: {
        fontSize: SF(13),
        color: Colors.dark,
        fontFamily: 'Poppins-Regular',
        marginHorizontal: SW(15),
        marginVertical: SH(10),
    },
    likeShareComment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: SH(10),
        marginHorizontal: SW(15),
    },
    likeShare: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shareText: {
        fontSize: SF(10),
        fontFamily: 'Poppins-Regular',
        color: Colors.dark,
        marginLeft: SW(4),
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: 10,
        marginBottom: SH(10),
    },
    EventheaderImage: {
        width: SW(50),
        height: SH(50),
        borderRadius: 30,
    },
    name: {
        fontSize: SF(13),
        fontFamily: 'Poppins-Bold',
        marginLeft: SW(10),
    },
    date_time: {
        fontSize: SF(12),
        fontFamily: 'Poppins-Regular',
        marginLeft: SW(10),
    },
    hour: {
        color: 'gray',
        fontSize: SF(12),
        fontFamily: 'Poppins-Regular',
    },

});

export default styles;
