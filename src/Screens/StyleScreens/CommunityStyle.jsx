import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light,
        padding: SW(10)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SW(10),
        paddingLeft: SW(1)

    },
    headerText: {
        color: Colors.theme_color,
        fontSize: SF(15),
        fontFamily: "Poppins-Regular"
    },
    image: {
        width: SW(100),
        height: SH(100),
        resizeMode: "contain"
    },
    searchbar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.gray,
        marginHorizontal: SW(10),
        borderRadius: 50,
        paddingHorizontal: SW(10),
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        margin: SW(6),
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: '98%',
        padding: SW(2)
    },
    cardData: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: SW(10),
    },

    CityArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SH(5),
    },

    sharecontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: SH(10),
    },

    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SW(10),
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: SF(12)
    },
    Nametext: {
        fontFamily: "Poppins-Bold",
        fontSize: SF(15)
    },
    sliderContainer: {
        marginBottom: SH(30),
        height: SH(230),
    },
    sliderImage: {
        width: "100%",
        height: SH(250),
        resizeMode: 'cover',
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

    panditListData: {
        marginVertical: SH(10),
        marginBottom: SH(200)
    },
    ButtonContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    button: {
        width: SW(100),
        height: SH(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: SH(20),
        borderRadius: 8,
        marginHorizontal: SW(6),

    },
    activeButton: {
        backgroundColor: Colors.theme_color,
    },
    inactiveButton: {
        backgroundColor: 'white',
    },
    activeText: {
        color: 'white',
        fontFamily: "Poppins-Regular",
        fontSize: SF(15),
    },
    inactiveText: {
        color: 'black',
        fontFamily: "Poppins-Regular",
        fontSize: SF(15),
    },
    icon: {
        marginHorizontal: SW(10),
    },

    iconText: {
        fontSize: SF(13),
        color: Colors.dark,
        marginTop: SH(5),
        marginLeft: SW(4)
    },
    Button: {
        backgroundColor: Colors.theme_color,
        paddingHorizontal: SH(20),
        paddingVertical: SH(5),
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center"
    },
    buttonText: {
        color: Colors.light,
        fontFamily: "Poppins-Regular",
        fontSize: SF(10),
        marginLeft: SW(2)
    },

    leftContainer: {
        marginLeft: SH(10), flex: 1, marginTop: SH(7)
    }

});

export default styles;
