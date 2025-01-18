import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
 
    righticons: {
        flexDirection: 'row',
        alignItems:"center"
    },
    images: {
        width: SW(80),
        height: SH(80)
    },
    sliderContainer: {
        marginBottom: SH(30),
        height: SH(230),
    },
    sliderImage: {
        width: "100%",
        height: SH(220),
        resizeMode: 'contain',
    },
    dot: {
        width: SW(25),
        height: SH(5),
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: SW(2),
        marginTop: SW(100)
    },
    activeDot: {
        width: SW(25),
        height: SH(5),
        borderRadius: 4,
        backgroundColor: Colors.theme_color,
        marginTop: SH(100)
    },
    EditPerference: {
        flexDirection: "row", justifyContent: "space-between",
        marginHorizontal: SW(15), alignItems: "center",
        marginVertical:SH(15)
    },
    editText: {
        borderColor: Colors.dark,
        borderWidth: 1,
        paddingHorizontal: SW(5),
        paddingVertical:SH(5),
        borderRadius: 5
    },
    viewAll: {
        marginHorizontal: SW(10),
        marginVertical: SH(10),
        paddingHorizontal: SW(15),
        backgroundColor: Colors.gray,
        paddingVertical: SH(7),

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
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginHorizontal: SW(10),
        marginVertical:SH(10),
        paddingHorizontal: SW(10),
        paddingVertical:SH(10)
    },
    image: {
        width: '100%',
        height: SH(150),
    },
    detailsContainer: {
        paddingHorizontal: SW(10),
        marginVertical:SH(10)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
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
        height: SH(250),
    },
    icon: {
        backgroundColor: Colors.gray,
        paddingHorizontal: SW(10),
        paddingVertical:SH(10),
        borderRadius: 10
    }

});

export default styles;