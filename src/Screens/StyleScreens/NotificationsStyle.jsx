import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SH(200),
  },
  emptyText: {
    fontSize: SF(15),
    color: "gray",
    fontFamily: 'Poppins-Regular',
  },
  card: {
    backgroundColor: Colors.light,
    borderRadius: 10,
    overflow: "visible",
    marginHorizontal: SW(5),
    marginVertical: SH(6),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '98%',
    paddingHorizontal: SW(5),
    paddingVertical: SH(10)
  },
  notificationImage: {
  width: SW(50),
  height: SH(50),
  resizeMode: "cover",
  borderRadius: 50,
},
name: {
  fontFamily: "Poppins-Medium",
  fontSize: SF(13),
},
message: {
  fontFamily: "Poppins-Regular",
  fontSize: SF(11),
  flexWrap: "wrap",
  lineHeight: SH(18),
  flexShrink: 1,
},
  detailText: {
    fontFamily: "Poppins-Regular",
    fontSize: SF(14)
  },
  detailImage: {
    width: SW(340),
    height: SH(300),
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: SH(10)
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: SH(7),
    paddingHorizontal: SW(10),
    backgroundColor: "#f5f5f5",
  },
  tabButton: {
    paddingVertical: SH(7),
    paddingHorizontal: SW(15),
    borderRadius: 10,
    backgroundColor: "#ddd",
  },
  activeTab: {
    backgroundColor: Colors.theme_color,
  },
  tabText: {
    fontSize: SF(15),
    color: "#333",
  },
  activeTabText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
  },
  disabledTab: {
    backgroundColor: "#ccc",
  },
  disabledTabText: {
    color: "#777",
  }

});

export default styles;
