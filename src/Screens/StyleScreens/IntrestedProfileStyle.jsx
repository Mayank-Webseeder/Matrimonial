import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({

  ButtonContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    marginHorizontal: SW(25)
  },
  button: {
    width: SW(150),
    height: SH(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor:Colors.theme_color,
    marginVertical: SH(10),
    borderRadius: 8,
    marginHorizontal: SW(6)
  },
  activeButton: {
    backgroundColor: Colors.theme_color,
  },
  inactiveButton: {
    backgroundColor: 'white',
  },
  activeText: {
    color:Colors.light,
    fontFamily: "Poppins-Regular",
    fontSize: SF(15)
  },
  inactiveText: {
    color:Colors.theme_color,
    fontFamily: "Poppins-Regular",
    fontSize: SF(15)
  },
  card: {
    paddingVertical: SH(10),
    paddingHorizontal: SW(10),
    marginVertical: SH(10),
    marginHorizontal: SW(10),
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Ensures it takes available space
  },
  dpImage: {
    width: SW(50),
    height: SH(50),
    borderRadius: 25,
    marginRight: SW(10),
  },
  cardContent: {
    flexDirection: "column",
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "center",
  },
  userId: {
    fontFamily:"poppins-Regular",
    fontSize: SF(11),
  },
  name: {
    fontSize: SF(16),
    color: "black",
    fontFamily:"Poppins-Bold"
  },
  Statusbutton: {
    backgroundColor: Colors.light_theme,
    paddingVertical: SH(5),
    paddingHorizontal: SW(10),
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.theme_color,
    borderWidth: 1,
    width: SW(100),
  },
  StatusbuttonText: {
    color: Colors.theme_color,
    fontFamily: "Poppins-Medium",
    fontSize: SF(13),
    
  },
  noDataText:{
    fontSize:SF(15),
    color: Colors.gray,
    fontFamily: 'Poppins-Regular',
    textAlign:"center"
  }
  
});

export default styles;
