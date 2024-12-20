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

    },
    image: {
        width: SW(100),
        height: SH(90),
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
        padding: SW(10)
    },
    cardData: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: SW(10),
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
        fontFamily: "Poppins-Bold",
        fontSize: SF(13)
    },
    sliderContainer: {
        marginHorizontal: SW(5),
        marginBottom: SH(150)
    },
    sliderImage: {
        width: SW(320),
        height: SH(200),
    },
    panditListData: {
        marginVertical: SH(10),
        marginBottom: SH(200)
    },
    ButtonContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent:"center"
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
        marginHorizontal: SW(6)
    },
    activeButton: {
        backgroundColor: Colors.theme_color,
    },
    inactiveButton: {
        backgroundColor:Colors.light,
    },
    activeText: {
        color:Colors.light,
    },
    inactiveText: {
        color:Colors.dark,
    },
    icon: {
        marginHorizontal: 10,
    },

    iconText: {
        fontSize: SF(8),
        color: Colors.dark,
        marginTop: SH(5),
        marginLeft: SW(4)
    },
    Button: {
        backgroundColor: Colors.theme_color,
        paddingHorizontal: SH(15),
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
    mainContainer: {
        marginTop: SH(70),
        flex: 1
    },
    filterText:{
        flexDirection:"row",
        justifyContent:"space-between",
        margin:SW(15)
        
    },
    filterHeading:{
        fontFamily:"Poppins-Bold",
        fontSize:SF(15)
    }

});

export default styles;
