import { StyleSheet } from "react-native";
import { SH,SW,SF } from "./Dimensions";
import Colors from "./Colors";
const Globalstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingTop: SH(10),
    paddingHorizontal:SW(10)
  }
});

export default Globalstyles;
