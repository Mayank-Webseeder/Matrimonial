import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
  RepostText: {
    color: Colors.light,
    paddingVertical: SH(3),
    paddingHorizontal: SW(10),
    borderRadius: 5,
    fontFamily: "Poppins-Regular",
    fontSize: SF(13),
    textAlign: "center",
    marginHorizontal: SW(10),
    marginBottom: 0
  },
  biodataname: {
    fontSize: SF(15),
    color: Colors.dark,
    marginBottom: SH(2),
    fontFamily: "Poppins-Bold",
    paddingLeft: SW(10)
  },
  matrimonyImage: {
    width: "100%",
    height: SH(350),
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  topContainer: {
    marginBottom: SH(20)
  },

  sliderCotainer: {
    height: SH(600),
    width: "100%",
    marginVertical: -SH(130)
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: "100%",
    height: SH(250),
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  dot: {
    backgroundColor: Colors.light,
  },
  activeDot: {
    backgroundColor: Colors.light,
  },
  flexContainer1: {
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-between",
    // paddingHorizontal: SW(10),
    // paddingVertical: SH(10),
    // borderColor: Colors.gray,
    // borderWidth: 1,
    // borderRadius: 10,
    // width: "100%",
    // marginVertical: SH(5),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: SW(8),
    paddingVertical: SH(10),
    borderRadius: 10,
    width: "99%",
    marginVertical: SH(5),
    backgroundColor: "#fff", // Ensure background for shadow to show properly
    marginHorizontal: SW(2),
    // Updated shadow
    shadowColor: Colors.theme_color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  socialContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: SW(10),
    paddingVertical: SH(10),
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    marginHorizontal: SW(5),
    marginVertical: SH(5)
  },

  leftContainer: {
    width: "52%",
    marginBottom: SH(10),
  },

  rightContainer: {
    width: "48%",
    paddingTop: SH(37),
    paddingLeft: SW(5),
    alignSelf: "flex-start",
  },

  HeadingText: {
    fontSize: SF(15),
    fontFamily: "Poppins-Bold",
    textTransform: "capitalize",
    lineHeight: SF(18),
    paddingTop: SH(2)
  },

  text: {
    fontfamily: "Poppins-Regular",
    color: '#000',
    fontSize: SF(15)
  },
  flexContainer: {
    paddingHorizontal: SW(10),
    paddingVertical: SH(10),
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 10,

  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"

  },

  toptext: {
    fontSize: SF(10),
    fontFamily: "Poppins-Regular"
  },
  Idtext: {
    fontSize: SF(12),
    fontFamily: "Poppins-Bold"
  },
  flexContainer2: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
  },
  sharecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: SW(3),
    paddingVertical: SH(3),
    backgroundColor: Colors.light,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: SF(12),
    color: Colors.dark,
    marginTop: SH(5),
  },

  smallImage: {
    width: SW(80),
    height: SH(85),
    resizeMode: "cover",
    borderRadius: 50
  },
  flexContainer3: {
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: SH(5),
    paddingHorizontal: SW(10),
    paddingVertical: SH(10)
  },
  flexContainer4: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    flex: 1,
  },
  icon: {
    fontSize: SF(20),
  },
  checkIcon: {
    color: 'green',
  },
  crossIcon: {
    color: 'red',
  },
  flexContainer5: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SW(10),
    paddingVertical: SH(10)
  },

  editButton: {
    backgroundColor: Colors.theme_color,
    marginRight: SW(10),
    paddingHorizontal: SW(10),
    paddingVertical: SH(5),
    borderRadius: 5,
    alignSelf: "flex-end"
    //  marginVertical:SH(10)
  },
  ActiveButton: {
    backgroundColor: '#E6F9F0',          // Light green tint background
    paddingHorizontal: SW(12),
    paddingVertical: SH(6),
    borderRadius: 20,                    // Pill-style rounded edges
    borderColor: '#04AA6D',
    borderWidth: 1,                      // Thicker border for visibility
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  ActiveButtonText: {
    color: '#04AA6D',
    fontSize: SF(12),
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  editButtonText: {
    colr: Colors.light,
    fontSize: SF(13),
    textAlign: "center"
  },
  link: {
    color: "#4948b8",
    textDecorationLine: "underline",
    fontSize: SF(13),
    fontFamily: "Poppins-Bold",
    marginHorizontal: SH(5),
  },
  profileSection: {
    alignItems: 'center',
    // marginBottom: SH(20),
    flexDirection: "row",
    marginHorizontal: SW(10),
    marginTop: SH(5)
  },
  profileImage: {
    width: SW(120),
    height: SH(120),
    resizeMode: "cover",
    marginRight: SW(10),
    borderRadius: 5
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
    fontSize: SF(13),
    fontFamily: "Poppins-regular",
    marginRight: SW(5)
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
  section: {
    marginVertical: SH(5),
  },
  sectionTitle: {
    fontSize: SF(15),
    fontFamily: 'Poppins-Bold',
    marginBottom: SH(8),
  },
  text: {
    fontfamily: "Poppins-Regular",
    color: '#000',
    fontSize: SF(15),
    textTransform: "capitalize"
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
    paddingVertical: SH(6),
    marginHorizontal: SW(5),
    marginVertical: SH(5),
    maxWidth: '80%',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },

  serviceText: {
    fontSize: SF(11),
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    color: Colors.dark,
    textAlign: "center",
    textTransform: "capitalize"
  },
  ratingCount: {
    marginRight: SW(260),
    marginVertical: SH(5)
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
    paddingVertical: SH(7),
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
    width: SW(75)
  },
  buttonText: {
    color: Colors.light,
    fontFamily: "Poppins-Regular",
    fontSize: SF(10),
    marginLeft: SW(2)
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

  imageContainer: {
    flexDirection: 'column',
    marginTop: 0,
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
  detailbox: {
    // paddingHorizontal: SW(10),
    // paddingVertical: SH(10),
    // borderColor: Colors.gray,
    // borderWidth: 1,
    // borderRadius: 10,
    // width: "100%",
    // marginVertical: SH(5),

    paddingHorizontal: SW(8),
    paddingVertical: SH(10),
    borderRadius: 10,
    width: "99%",
    marginVertical: SH(5),
    backgroundColor: "#fff", // Ensure background for shadow to show properly
    marginHorizontal: SW(2),
    // Updated shadow
    shadowColor: Colors.theme_color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  noImagesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SW(20),
    paddingVertical: SH(20)
  },
  noImagesText: {
    fontSize: SF(18),
    color: Colors.gray,
    textAlign: 'center',
  },
  icon: {
    marginBottom: SH(10),
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
  noReviewsContainer: {
    alignItems: 'center',
    marginVertical: SH(20),
  },
  noReviewsTitle: {
    fontSize: SF(24),
    fontFamily: "Poppins-Bold",
    color: Colors.gray,
    marginBottom: SH(8),
  },
  noReviewsSubtitle: {
    fontSize: SF(16),
    color: Colors.gray,
    textAlign: 'center',
    marginTop: SH(10),
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: SH(5),
  },
  infoLabel: {
    width: SW(150),
    fontfamily: "Poppins-Regular",
    color: '#000',
    fontSize: SF(15)
  },
  infoValue: {
    flex: 1,
    color: '#000',
    flexWrap: 'wrap',
  },
  familyDiv: {
    paddingHorizontal: SW(8),
    paddingVertical: SH(10),
    borderRadius: 10,
    width: "99%",
    backgroundColor: "#fff", // Ensure background for shadow to show properly
    marginHorizontal: SW(2),
    // Updated shadow
    shadowColor: Colors.theme_color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: SH(5),
  },
  sliderContainer: {
    marginBottom: SH(30),
    height: SH(290),
  },
  sliderImage: {
    width: "100%",
    height: SH(290),
    resizeMode: 'cover',
  },
 trialBox: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#ffe5e5',
  padding: 4,
  borderRadius: 5,
  borderLeftWidth: 3,
  borderLeftColor: '#d9534f',
  marginTop: SH(3),
  width:"50%"
},
trialBoxText: {
  fontSize: SF(10),
  fontFamily: 'Poppins-Medium',
  color: '#d9534f',
  marginLeft: 3,
},
});

export default styles;
