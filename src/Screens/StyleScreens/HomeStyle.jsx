import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
menuIcon: {
    width: SW(30),
    height: SH(30)
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    width: SW(30),
    height: SH(30)
  },
  righticons: {
    flexDirection: 'row',
  },
  imageWrapper: {
    marginHorizontal: SW(2),
    marginVertical: SH(7),
  },
  CategoryContainer: {
    marginHorizontal: SW(10),
    marginVertical: SH(10),
    backgroundColor: '#faf8f2',
    marginHorizontal: SW(7),
    borderRadius: 10,
    paddingHorizontal: SW(4),
    paddingVertical: SH(4),
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },

  image: {
    width: SW(100),
    height: SH(100)
  },
  images: {
    width: SW(100),
    height: SH(70),
    resizeMode: "contain"
  },
  ProfileImages: {
    width: SW(118),
    height: SH(115),
    resizeMode: "cover",
    borderRadius: 10,
  },
  verifiedContainer: {
    position: "absolute",
    top: SH(99),
    left: SW(69),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: SW(5),
    paddingVertical: SW(2),
    borderRadius: 5,
  },
  verifiedBadge: {
    width: SW(10),
    height: SH(10),
    marginRight: SW(1),
    resizeMode: "contain"
  },
  verifiedText: {
    color: "green",
    fontWeight: "bold",
    fontSize: SF(7),
  },
  text: {
    paddingVertical: SH(4),
    fontFamily: "Poppins-Bold",
    paddingBottom: 0,
    fontSize: SF(11),
    textTransform: "uppercase"
  },
  sliderContainer: {
    marginBottom: SH(30)
  },
  sliderImage: {
    width:"100%",
    height:SH(180),
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
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SH(10),
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SW(35),
    paddingVertical: SH(10),
    backgroundColor:Colors.light_theme,
    borderRadius: SW(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyText: {
    fontSize: SF(14),
    fontFamily: 'Poppins-Bold',
    color: '#555',
    marginBottom: SH(8),
    textAlign: 'center',
  },
  infoText: {
    fontSize: SF(12),
    color: '#888',
    textAlign: 'center',
  },
  bottomSlider:{
    paddingBottom:SH(10)
  }
});

export default styles;
