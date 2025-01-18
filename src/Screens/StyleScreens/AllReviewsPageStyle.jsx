import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
const styles = StyleSheet.create({

  FlexContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between"
  },
  section: {
    marginBottom: SH(15),
  },
  sectionTitle: {
    fontSize: SF(15),
    fontFamily: 'Poppins-Bold',
    marginBottom:SH(8),
  },
  reviewContainer: {
    marginBottom: SH(15),
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: SW(10),
    marginVertical:SH(2),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '95%',
    paddingHorizontal: SW(10),
    paddingVertical:SH(10),
  },
  reviewRating:{
    marginLeft:-SW(255)
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
  },
  reviewText: {
    fontSize: SF(13),
    marginVertical: SH(5),
    fontFamily: "Poppins-Regular",
  },
});
export default styles;