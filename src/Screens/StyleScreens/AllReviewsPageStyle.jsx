import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
const styles = StyleSheet.create({

  FlexContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  section: {
    marginBottom: SH(15),
  },
  sectionTitle: {
    fontSize: SF(15),
    fontFamily: 'Poppins-Bold',
    marginBottom: SH(8),
  },
  reviewContainer: {
    marginBottom: SH(15),
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: SW(10),
    marginVertical: SH(2),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '95%',
    paddingHorizontal: SW(10),
    paddingVertical: SH(10),
  },
  reviewRating: {
    alignSelf: "flex-start"
  },
  reviewName: {
    fontSize: SF(12),
    fontFamily: 'Poppins-Bold',
  },
  reviewDate: {
    fontSize: SF(11),
    color: 'gray',
  },
  reviewText: {
    fontSize: SF(11),
    fontFamily: "Poppins-Regular",
    flexWrap: "wrap",
    flexShrink: 1,
    width: "100%",
  },
});
export default styles;