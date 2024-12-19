import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    container:{
       flex:1,
       backgroundColor:Colors.light,
       marginBottom:SH(10)
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding:SW(10),
    marginBottom:SH(10)
  },
  tabButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor:Colors.light,
    width:SW(100),
    height:SH(40),
    borderWidth:1,
    borderColor:Colors.dark,
    marginRight:SW(10)
  },
  activeTab: {
    backgroundColor:Colors.theme_color,
  },
  tabText: {
    fontSize:SF(15),
    color: '#333',
    textAlign:"center"
  },
  activeTabText: {
    color: '#fff',
  },
 card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    margin:SW(6),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '47%',
  },
  image: {
    width: '100%',
    height: SH(150),
  },
  detailsContainer: {
    padding:SW(10),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  row2:{
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

   
});

export default styles;
