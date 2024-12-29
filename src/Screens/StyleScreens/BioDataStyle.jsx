import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light,
        marginBottom: SH(10)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SW(15),

    },
    righticons: {
        flexDirection: 'row',
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
        marginHorizontal: SH(2),
        marginTop: SW(100)
    },
    activeDot: {
        width: SW(25),
        height: SH(5),
        borderRadius: 4,
        backgroundColor: Colors.theme_color,
        marginTop: SW(100)
    },
    EditPerference: {
        flexDirection: "row", justifyContent: "space-between",
        margin: SW(15), alignItems: "center"
    },
    editText: {
        borderColor: Colors.dark,
        borderWidth: 1,
        padding: SW(5),
        borderRadius: 5
    },
    viewAll: {
        marginHorizontal: SH(10),
        marginVertical: SH(10),
        paddingHorizontal: SH(15),
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
        margin: SW(10),
        padding: SW(10),
    },
    image: {
        width: '100%',
        height: SH(150),
    },
    detailsContainer: {
        padding: SW(10),
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
    Sliderimage:{
        width: '100%',
        height: SH(250),
    },
    icon:{
        backgroundColor:Colors.gray,
        padding:SW(10),
        borderRadius:10
    }

});

export default styles;