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
    overflow: 'hidden',
    marginHorizontal: SW(6),
    marginVertical: SH(6),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '98%',
    paddingHorizontal: SW(10),
    paddingVertical: SH(10)
  },
  name: {
    fontFamily: "Poppins-Medium",
    fontSize: SF(13)

  },
  message: {
    fontFamily: "Poppins-Regular",
    fontSize: SF(11)
  },
  notificationImage: {
    width: SW(50),
    height: SH(50),
    resizeMode: "cover",
    borderRadius: 50
  }

});

export default styles;
