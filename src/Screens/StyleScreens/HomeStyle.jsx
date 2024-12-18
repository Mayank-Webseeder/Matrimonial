import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    container:{
       flex:1,
       backgroundColor:Colors.light,
    },
    header:{
        flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding:SW(15),
         
    },
    righticons:{
        flexDirection: 'row',
    },
    imageWrapper:{
        marginHorizontal: SW(5),
        marginVertical: SH(15), 
    },
    CategoryContainer:{
    margin: SW(10),
    backgroundColor: Colors.light,
    marginHorizontal: SW(7),
    borderRadius: 10,
    paddingVertical: SH(10),
    paddingHorizontal: SW(10),
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    },
    
    image:{
        width:SW(100),
        height:SH(100)
    },
    images:{
        width:SW(80),
        height:SH(80)
    },
    text:{
        paddingVertical:SH(4),
        fontFamily:"Poppins-Bold"
    },
    sliderImage:{
        width:"95%",
        height:SH(200),
        marginBottom: SH(20),
        margin:SW(10)
    }
   
});

export default styles;
