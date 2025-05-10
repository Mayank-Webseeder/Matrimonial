import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
  righticons: {
    flexDirection: 'row',
    alignItems: "center",
    marginRight: SW(10)
  },
  postText: {
    fontSize: SF(13),
    color: Colors.light,
    backgroundColor: Colors.theme_color,
    padding: SW(5),
    paddingHorizontal: SW(15),
    borderRadius: 5,
    marginHorizontal: SW(5)
  },
  storyCard: {
    backgroundColor: '#fff',
    marginHorizontal: SW(3),
    marginVertical: SH(5),
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  collabHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SW(12),
  },
  avatar: {
    width: SW(42),
    height: SW(42),
    borderRadius: SW(21),
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: SW(8),
  },
  collabIcon: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    backgroundColor: '#fff',
    borderRadius: SW(10),
    padding: 2,
  },
  nameText: {
    fontFamily: 'Poppins-Medium',
    fontSize: SF(14),
    color: '#000',
    textTransform: "capitalize"
  },
  thought: {
    fontFamily: 'Poppins-Regular',
    fontSize: SF(12),
    color: '#444',
    paddingHorizontal: SW(12),
    paddingBottom: SH(8),
  },
  ratingRow: {
    paddingHorizontal: SW(12),
    paddingBottom: SH(10),
  },
  ratingText: {
    fontStyle: 'italic',
    marginTop: SH(4),
    fontSize: SF(14),
    color: '#555',
    lineHeight: SH(20),
  },
  ratingQuote: {
    fontStyle: 'italic',
    marginTop: SH(4),
    fontSize: SF(14),
    color: '#555',
    lineHeight: SH(20),
  },

  textContainer: {
    marginTop: SW(10)
  },
  storyName: {
    fontSize: SF(15),
    fontFamily: "Poppins-Bold",
    marginLeft: SW(10),
    marginTop: SH(10)
  },
  storyDescription: {
    fontSize: SF(13),
    fontFamily: "Poppins-Regular"
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: SH(5),
  },
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: SH(20),
  },
  noDataText: {
    fontSize: SF(16),
    color: "gray",
    fontWeight: "bold",
  },
  uploadedImage: {
    width: SW(100), height: SH(100), borderRadius: 10
  },
})

export default styles