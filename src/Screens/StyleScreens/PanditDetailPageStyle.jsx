import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import { SH, SW, SF } from "../../utils/Dimensions";
const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    flexDirection: "row",
    marginHorizontal: SW(10),
    marginRight: SW(15),
    marginVertical: SH(5)
  },
  profileImage: {
    width: SW(120),
    height: SH(120),
    resizeMode: "cover",
    marginRight: SW(10),
    borderRadius: 5
  },
  name: {
    fontSize: SF(14),
    fontFamily: "Poppins-Bold",
    flexWrap: "wrap",
    maxWidth: SW(200),
  },
  city: {
    fontSize: SF(12),
    fontFamily: "Poppins-regular",
  },
  rating: {
    fontSize: SF(13),
    marginVertical: SH(10),
    marginHorizontal: SW(3)
  },
  FlexContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: SF(15),
    fontFamily: 'Poppins-Bold',
    marginBottom: SH(8),
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
    paddingHorizontal: SW(10),
    paddingVertical: SH(5),
    marginHorizontal: SW(5),
    marginVertical: SH(5),
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  serviceText: {
    fontSize: SF(10),
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    color: Colors.dark,
    textAlign: "center",
    textTransform:"capitalize"
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
    alignSelf:"flex-start"
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
  FlexContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  images: {
    width: SW(100),
    height: SH(100),
    marginHorizontal: SW(5),
    marginVertical: SH(5),
    resizeMode: "contain"
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: SW(10),
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
    paddingHorizontal: SW(20),
    paddingVertical: SH(3),
    borderRadius: 8,
    alignItems: "center",
    width: SW(75),
},
buttonText: {
    color: Colors.light,
    fontFamily: "Poppins-Regular",
    fontSize: SF(10),
    marginLeft: SW(2),
},
disabledButton: {
    backgroundColor: Colors.gray, // ✅ Gray background for disabled buttons
    opacity: 0.5, // ✅ Reduce opacity to indicate it's disabled
},
disabledText: {
    color: Colors.gray, // ✅ Gray text for disabled buttons
},
  iconText: {
    fontSize: SF(13),
    color: Colors.dark,
    marginVertical: SH(5),
    marginHorizontal: SW(10),
    fontFamily: "Poppins-Regular",
  },
  contentContainer: {
    marginHorizontal: SW(10),
    marginVertical: SH(10)
  },
  websiteIcon: {
    width: SW(30),
    height: SH(30)
  },
  Bottomimage: {
    width: "100%",
    height: SH(180),
    resizeMode: "cover",
    marginBottom: SH(10)
  },
  ReviewPost: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight:SW(5)
  },
  postReviewButton: {
    paddingHorizontal: SW(10),
    backgroundColor: Colors.theme_color,
    borderRadius: 5,
    paddingVertical: SH(4)
  },
  postReviewText: {
    fontSize: SF(13),
    color: Colors.light,
    fontFamily: "poppins-Regular"

  },
  viewMoreButton: {
    paddingHorizontal: SW(4),
    backgroundColor: Colors.theme_color,
    borderRadius: 5,
    marginHorizontal: SW(100),
    paddingVertical: SW(3),
  },
  viewMoreText: {
    fontSize: SF(13),
    color: Colors.light,
    fontFamily: "poppins-Regular",
    textAlign: "center"
  },
  imageContainer: {
    flexDirection: 'column',
    marginTop: SH(10),
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SH(2),
  },
  image: {
    width: '50%',
    height: SH(100),
    marginBottom: SH(1),
    marginRight: SW(10),
    borderRadius: 3
  },
  noReviewsText: {
    textAlign: "center",
    color: Colors.gray,
    fontFamily: "Poppins-Regular"
  }
});
export default styles;