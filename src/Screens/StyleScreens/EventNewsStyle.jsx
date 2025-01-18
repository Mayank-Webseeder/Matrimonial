import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    righticons: {
        flexDirection: 'row',
        alignItems: "center"
    },
    Imagecontainer: {
        marginVertical: SH(10)
    },
    button: {
        backgroundColor: Colors.theme_color,
        borderRadius: 5,
        paddingHorizontal: SW(15),
        marginRight: SW(10),
        justifyContent: 'center',
        height: SH(30)
    },
    buttonText: {
        color: Colors.light,
        fontSize: SF(13),
        fontFamily: 'Poppins-Regular',
        textAlign: "center"
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
        marginVertical: SH(10),
        marginBottom: SH(3),
        paddingHorizontal: SW(5),
        paddingVertical: SH(5)
    },
    EventheaderImage: {
        width: SW(50),
        height: SH(50),
        borderRadius: 30,
    },
    cardheader: {
        display:"flex",
        flexDirection: 'row',
        alignItems: 'center',
    },
    image1: {
        width: SW(160),
        height: SH(150),
        marginRight: 0,
        borderRadius: 2,
    },
    image2: {
        width: SW(320),
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
        marginVertical: SH(10)
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
    likeShareComment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SW(10),
        paddingVertical: SH(3)
    },
    likeShare: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shareText: {
        fontSize: SF(10),
        color: Colors.dark,
        marginVertical: SH(5),
        marginHorizontal: SW(10),
        fontFamily: "Poppins-Regular",
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
