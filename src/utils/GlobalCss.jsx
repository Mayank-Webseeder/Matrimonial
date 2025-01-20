import { StyleSheet } from "react-native";
import { SH, SW, SF } from "./Dimensions";
import Colors from "./Colors";

const Globalstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingHorizontal: SW(5)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: SH(50),
    marginVertical: SH(35),
    marginBottom: SH(5),
    backgroundColor: '#f5edf0',
    paddingRight: SW(10)
  },
  headerText: {
    color: Colors.theme_color,
    fontSize: SF(15),
    fontFamily: "Poppins-Regular",
    marginHorizontal: SW(10)
  },
  suggestions: {
    padding: SW(10),
    backgroundColor: Colors.light,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: SH(5),
  },
  listItem: {
    fontFamily: "Poppins-Medium",
    fontSize: SF(14),
    padding: SW(5)
  },
  input: {
    // height: SH(40),
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: SH(15),
    padding: SW(10),
    borderRadius: 5,
    color: Colors.dark
  },
  textInput:{
    height: SH(100),
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: SH(15),
    paddingHorizontal: SW(10),
    borderRadius: 5,
    color: Colors.dark
  },
  title: {
    fontFamily: "Poppins-Medium",
    fontSize: SF(16),
  },
  form: {
    backgroundColor: Colors.light,
    paddingHorizontal: SW(10),
    paddingVertical: SH(10),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  input1: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: SH(15),
    padding: SW(10),
    borderRadius: 5,
    color: Colors.dark,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomImage: {
    width: "98%",
    height: SH(160),
    resizeMode: 'cover',
    marginVertical: SH(10),
    marginHorizontal: SW(5),
    borderRadius: 10
  },
  sliderContainer: {
    marginVertical: SH(10)
  },
  sliderImage: {
    width: "100%",
    height: SH(180),
    resizeMode: 'cover',
  },
  dot: {
    width: SW(25),
    height: SH(5),
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: SH(2),
    marginTop: SW(100)
  },
  activeDot: {
    width: SW(25),
    height: SH(5),
    borderRadius: 4,
    backgroundColor: Colors.theme_color,
    marginTop: SW(100)
  },
})

export default Globalstyles;