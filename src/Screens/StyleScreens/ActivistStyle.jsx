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
        width:SW(60),
        height:SH(60),
        resizeMode:"contain",
        borderRadius:50
    },
    searchbar:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:Colors.gray,
        marginHorizontal:SW(10),
        borderRadius:50,
        paddingHorizontal:SW(10),
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
    width: '95%',
    marginHorizontal:SW(10),
    padding:SW(10),
    flexDirection:"row",
    justifyContent:"space-between"
    },
    cardData:{
      flexDirection:"row"
    },
    text:{
         fontFamily:"Poppins-Bold",
         fontSize:SF(16)
    },
    smalltext:{
         fontFamily:"Poppins-Regular",
         fontSize:SF(12)
    },
   
  ButtonContainer: {
    flex: 1,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between"
  },
  button: {
    width:SW(100),
    height:SH(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    marginVertical:SH(20),
    borderRadius: 8,
    marginHorizontal:SW(6),
    backgroundColor:Colors.theme_color
  },
  
  Button: {
    backgroundColor:Colors.theme_color,
    paddingHorizontal:SH(20),
    paddingVertical:SH(5),
    borderRadius:50,
  },
  buttonText: {
    color:Colors.light,
   fontFamily:"Poppins-Regular",
    fontSize:SF(12),
  },
  mainContainer:{
    marginTop:SH(70),
    flex:1
  },
  searchIcon:{
    marginHorizontal:SW(10)
  }
   
});

export default styles;
