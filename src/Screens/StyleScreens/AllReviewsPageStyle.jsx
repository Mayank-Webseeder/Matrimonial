import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import { SH, SW, SF } from "../../utils/Dimensions";
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
    // justifyContent: 'space-between',
    paddingHorizontal: SW(10),
    paddingVertical:SH(10),
    backgroundColor: Colors.light,
    paddingLeft:0
  },
 
  headerText: {
    color: Colors.theme_color,
    fontSize: SF(15),
    fontFamily: "Poppins-Regular",
    marginHorizontal: SW(10)
  },

  FlexContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    marginBottom: SH(15),
  },
  sectionTitle: {
    fontSize: SF(15),
    fontFamily: 'Poppins-Bold',
    marginBottom:SH(8),
  },
  reviewRating: {
    marginLeft: SW(210)
  },
  reviewContainer: {
    marginBottom: SH(15),
    backgroundColor: '#fff',
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
  reviewName: {
    fontSize: SF(16),
    fontFamily: 'Poppins-Medium',
  },
  reviewStatus: {
    fontSize: SF(13),
    color: 'green',
    fontFamily: "Poppins-Regular",
  },
  reviewDate: {
    fontSize: SF(13),
    color: 'gray',
    marginLeft: SW(75)
  },
  reviewText: {
    fontSize: SF(13),
    marginVertical: SH(5),
    fontFamily: "Poppins-Regular",
  },
  helpfulText: {
    fontSize: SF(13),
    color: 'gray',
    fontFamily: "Poppins-Regular",
  },
});
export default styles;