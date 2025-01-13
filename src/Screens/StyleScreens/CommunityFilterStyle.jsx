import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingTop: SH(35),
    paddingHorizontal:SW(6)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SW(10),
        paddingVertical:SH(7),
        paddingLeft: SW(1),
        paddingTop:0

    },
    headerText: {
        color: Colors.theme_color,
        fontSize: SF(15),
        fontFamily: "Poppins-Regular",
        marginHorizontal: SW(10)
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
        marginHorizontal: SW(6),
        marginVertical:SH(6),
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: '98%',
        paddingHorizontal: SW(2),
        paddingVertical:SH(2)
    },
    cardData: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: SW(10),
        paddingVertical:SH(5)
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
        marginRight: SW(8),
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: SF(12)
    },
    Nametext:{
        fontFamily: "Poppins-Bold",
        fontSize: SF(15)
    },
    sliderContainer: {
        marginBottom: SH(30),
        height: SH(180),
        marginTop:SH(10)
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
    
    panditListData: {
        marginVertical: SH(10),
        marginBottom: SH(200)
    },
    icon: {
        marginHorizontal:SW(10),
    },

    iconText: {
        fontSize: SF(12),
        color: Colors.dark,
        marginTop: SH(5),
        marginLeft: SW(3)
    },
    Button: {
        backgroundColor: Colors.theme_color,
        paddingHorizontal: SW(6),
        paddingVertical: SH(3),
        borderRadius: 8,
        alignItems: "center",
        width:SW(103),
        display:"flex",
        flexDirection:"row"
    },
    buttonText: {
        color: Colors.light,
        fontFamily: "Poppins-Regular",
        fontSize: SF(10.5),
    },
    mainContainer: {
        marginTop: SH(70),
        flex: 1
    },
    leftContainer:{
        marginLeft:SW(10), flex: 1 ,marginTop:SH(7)
    },
    filterText: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: SW(15),
        marginVertical: SH(5)

    },
    filterHeading: {
        fontFamily: "Poppins-Bold",
        fontSize: SF(15)
    },
    RequestText:{
      color:Colors.light,
      fontSize:SF(10),
      fontFamily: "Poppins-Regular",
    }

});

export default styles;
