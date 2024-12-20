import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light,
        marginBottom:SH(10)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SW(15),
    },
    text: {
        paddingVertical: SH(4),
        fontFamily: "Poppins-Regular",
        color: Colors.theme_color
    },
    sliderContainer:{
        marginHorizontal:SW(5),
        marginBottom:SH(150)
       },
       sliderImage:{
        width:SW(320),
        height:SH(200),
       },

    textContainer: {
        padding: SW(15),
    },
    TextView:{
        backgroundColor:Colors.gray,
        padding:SW(10),
        paddingVertical:SH(15),
        borderRadius:20,
        marginBottom:SH(10)
    },
    descriptionText: {
        fontSize: SF(13),
        color: Colors.dark,
        marginVertical: SH(5),
        fontFamily: 'Poppins-Bold',
    },
    sharecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#fff',
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection:"row"
  },
  smalltext:{
    fontFamily:"Poppins-Regular",
    fontSize:SF(12)
  },
 
  iconText: {
    fontSize: SF(10),
    color:Colors.dark,
    marginTop:SH(5),
    marginLeft:SW(4)
  },
  Button: {
    backgroundColor:Colors.theme_color,
    paddingHorizontal:SH(20),
    paddingVertical:SH(5),
    borderRadius: 8,
    flexDirection:"row",
    alignItems:"center",
    marginLeft:SW(5)
  },
  buttonText: {
    color:Colors.light,
   fontFamily:"Poppins-Regular",
    fontSize:SF(10),
    marginLeft:SW(2)
  },
});

export default styles;
