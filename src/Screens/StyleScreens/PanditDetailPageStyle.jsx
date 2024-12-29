import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import { SH, SW, SF } from "../../utils/Dimensions";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SW(16),
    backgroundColor: Colors.light
  },
  header: {
    padding: SW(10),
    paddingLeft: 0
  },
  profileSection: {
    alignItems: 'center',
    marginBottom:SH(20),
    flexDirection: "row",
    margin: SW(10)
  },
  profileImage: {
    width: SW(100),
    height: SH(100),
    resizeMode: "contain",
    marginRight: SW(10)
  },
  name: {
    fontSize: SF(15),
    fontFamily: "Poppins-Bold"
  },
  surname: {
    fontSize: SF(12),
    fontFamily: "Poppins-regular"
  },
  city: {
    fontSize: SF(12),
    fontFamily: "Poppins-regular",
    marginRight: SW(5)
  },
  rating: {
    fontSize: SF(13),
    marginVertical:SH(10),
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
  text: {
    fontSize: SF(13),
    fontFamily: 'Poppins-Regular',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: SH(2),
  },

  serviceContainer: {
    backgroundColor: Colors.light,
    borderRadius: 50,
    elevation: 5,
    padding: SW(5),
    margin: SW(5),
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  serviceText: {
    fontSize: SF(10),
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    color: Colors.dark,
  },
  ratingCount: {
    marginRight: SW(260),
    marginVertical: SH(5)
  },
  reviewRating: {
    marginLeft: SW(210)
  },
  reviewContainer: {
    marginBottom: SH(15),
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    margin: SW(6),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '98%',
    padding: SW(10)
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
  images: {
    width: SW(100),
    height: SH(100),
    margin: SW(5),
    resizeMode: "contain"
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: SW(10),
    marginVertical: SH(15)
  },
  sharecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginVertical: SH(10)
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: "row"
  },
  Button: {
    backgroundColor: Colors.theme_color,
    paddingHorizontal: SH(20),
    paddingVertical: SH(5),
    borderRadius: 8,
    alignItems: "center",
    width:SW(100)
  },
  buttonText: {
    color: Colors.light,
    fontFamily: "Poppins-Regular",
    fontSize: SF(10),
    marginLeft: SW(2)
  },
  iconText: {
    marginHorizontal: SW(5),
    fontFamily: "Poppins-Regular",
  }
});
export default styles;