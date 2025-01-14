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
        paddingVertical:SH(10),
        paddingLeft:0
      },
      headerText: {
        color: Colors.theme_color,
        fontSize: SF(15),
        fontFamily: "Poppins-Regular",
        marginHorizontal: SW(10)
      },
    card: {
        backgroundColor: Colors.light,
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: SW(6),
        marginVertical:SH(6),
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: '98%',
        paddingHorizontal: SW(10),
        paddingVertical:SH(10)
    },
    name: {
        fontFamily: "Poppins-Medium",
        fontSize: SF(13)

    },
    message: {
        fontFamily: "Poppins-Regular",
        fontSize: SF(11)
    }

});

export default styles;
