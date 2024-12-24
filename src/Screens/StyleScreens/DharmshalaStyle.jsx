import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    container:{
       flex:1,
       backgroundColor:Colors.light,
       padding:SW(10)
    },
    header:{
        flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding:SW(10),
         
    },
    image:{
        width:SW(100),
        height:SH(90),
        resizeMode:"contain"
    },
    searchbar:{
        backgroundColor:Colors.gray,
        marginHorizontal:SW(10),
        borderRadius:50,
        paddingHorizontal:SW(10),
        width:SW(250)
    },
    card:{
    backgroundColor: '#fff',
    borderRadius:10,
    overflow: 'hidden',
    margin:SW(6),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '98%',
    padding:SW(10)
    },
    cardData:{
      flexDirection:"row"
    },
    text:{
         fontFamily:"Poppins-Bold",
         fontSize:SF(13)
    },
    sliderContainer:{
     marginHorizontal:SW(5),
     marginBottom:SH(150)
    },
    sliderImage:{
     width:SW(320),
     height:SH(200),
    },
    DharamSalaList:{
       marginVertical:SH(10),
       marginBottom:SH(200)
    },
  icon: {
    marginHorizontal: 10,
  },

  sharecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start',
    backgroundColor: '#fff',
    margin:SW(5)
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
    fontSize: SF(11),
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
    fontSize:SF(11),
    marginLeft:SW(2)
  },
  mainContainer:{
    marginTop:SH(10)
  },
  filterContainer:{
    backgroundColor:Colors.gray,
    padding:SW(10),
    borderRadius:50,
    flexDirection:"row",
  },
  searchContainer:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
 
});

export default styles;
