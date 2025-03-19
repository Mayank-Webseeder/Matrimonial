import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    righticons: {
        flexDirection: 'row',
        alignItems: "center"
    },
    images: {
        width: SW(80),
        height: SH(80)
    },
    sliderContainer: {
        marginBottom: SH(30),
        marginTop: SH(10)
    },
    sliderImage: {
        width: "100%",
        height: SH(180),
        resizeMode: 'cover',
    },
    dot: {
        width: SW(25),
        height: SH(5),
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: SW(2),
        marginTop: SH(105)
    },
    activeDot: {
        width: SW(25),
        height: SH(5),
        borderRadius: 4,
        backgroundColor: Colors.theme_color,
        marginTop: SH(105)
    },
    EditPerference: {
        flexDirection: "row", justifyContent: "space-between",
        marginHorizontal: SW(15), alignItems: "center",
        marginVertical: SH(7), marginTop: 0
    },
    editText: {
        borderColor: Colors.theme_color,
        borderWidth: 1,
        paddingHorizontal: SW(5),
        paddingVertical: SH(5),
        borderRadius: 5,
        color: Colors.theme_color
    },
    viewAll: {
        marginHorizontal: SW(10),
        marginVertical: SH(10),
        paddingHorizontal: SW(15),
        backgroundColor: Colors.gray,
    },
    ViewAllText: {
        fontSize: SF(14),
        color: Colors.theme_color,
        fontFamily: 'Poppins-Bold',
        textAlign: "center"

    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: SW(2),
        paddingVertical: SH(6),
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginVertical: SH(5),
        gap: 10,
        width: SW(180)
    },

    image: {
        width: '100%',
        height: SH(150),
        borderRadius: 10
    },
    detailsContainer: {
        paddingHorizontal: SW(10),
        paddingVertical: SH(10)
    },
    row: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
        // marginBottom: 5,
    },
    row2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: SF(14),
        fontFamily: 'Poppins-Bold',
        color: '#333',
    },
    city: {
        fontSize: SF(14),
        fontFamily: 'Poppins-Regular',
        color: '#555',
    },
    text: {
        fontSize: SF(13),
        fontFamily: 'Poppins-Regular',
        color: '#555',
    },
    subcaste: {
        fontSize: SF(13),
        fontFamily: 'Poppins-Regular',
        color: '#555',
        marginTop: 5,
    },
    Sliderimage: {
        width: '100%',
        height: SH(180),
        marginBottom: SH(10)
    },
    icon: {
        backgroundColor: Colors.gray,
        paddingHorizontal: SW(10),
        paddingVertical: SH(10),
        borderRadius: 10
    }

});

export default styles;