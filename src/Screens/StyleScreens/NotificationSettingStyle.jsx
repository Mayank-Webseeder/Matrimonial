import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import { SH, SW, SF } from "../../utils/Dimensions";

const styles = StyleSheet.create({
 toggleRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: SH(10),
  paddingHorizontal: SW(10),
  backgroundColor: Colors.white,
  borderColor: Colors.gray,
  borderWidth: 2,
  borderRadius: 10,
  marginHorizontal: SW(10),
  marginVertical: SH(10),
},

toggleTextContainer: {
  flex: 1, 
  paddingRight: SW(10),
},

toggleLabel: {
  fontSize: SF(14),
  color: Colors.theme_color,
  fontFamily: 'Poppins-Regular',
  flexWrap: 'wrap',
},

});

export default styles;