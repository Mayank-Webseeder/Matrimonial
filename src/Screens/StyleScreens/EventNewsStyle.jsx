import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

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
        paddingVertical: SH(10),
        paddingLeft: 0,
    },
    headerText: {
        color: Colors.theme_color,
        fontSize: SF(15),
        fontFamily: 'Poppins-Regular',
    },
    righticons: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: Colors.theme_color,
        borderRadius: 5,
        paddingHorizontal: SW(15),
        marginRight: SW(10),
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors.light,
        fontSize: SF(13),
        fontFamily: 'Poppins-Regular',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginHorizontal: SW(10),
        marginVertical:SH(10),
        marginBottom: SH(3),
        paddingHorizontal:SW(5),
        paddingVertical:SH(5)
    },
    EventheaderImage: {
        width: SW(50),
        height: SH(50),
        borderRadius: 30,
    },
    cardheader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image1: {
        width: SW(170),
        height: SH(150),
        marginRight: 0,
        borderRadius: 2,
    },
    image2: {
        width: SW(343),
        height: SH(150),
        marginRight: 0,
        borderRadius: 2,
    },
    noImageText: {
        color: '#777',
        fontSize: SF(13),
        marginTop: SH(10),
    },
    captionText: {
        marginHorizontal: SW(7),
        fontSize: SF(12),
        fontFamily: 'Poppins-Regular',
        marginVertical:SH(10)
    },
    name: {
        fontSize: SF(13),
        fontFamily: 'Poppins-Bold',
        marginLeft: SW(5),
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
    likeShareComment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SW(10),
        paddingVertical:SH(3)
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
    bannerImage: {
        width: '100%',
        height: SH(200),
        marginVertical: SH(10),
    },
    loadMoreButton: {
        backgroundColor: Colors.theme_color,
        borderRadius: 5,
        paddingVertical: SH(5),
        marginVertical: SH(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: SW(100)
    },
    loadMoreText: {
        color: Colors.light,
        fontSize: SF(13),
        fontFamily: 'Poppins-Regular',
    },
});

export default styles;
