import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({

  Text: {
    fontSize: SF(22),
    fontFamily: "Poppins-Bold",
    color: Colors.theme_color,
    textAlign: 'center',
    marginBottom: SH(5),
  },

  description: {
    fontSize: SF(14),
    color: "gray",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginTop: SH(10),

  },
  inputWrapper: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderColor: Colors.gray,
    borderWidth: 1,
    paddingHorizontal: SW(10),
    paddingVertical: SH(10),
    marginBottom: SH(30),

    // Cross-platform shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android only
  },
  submitButton: {
    backgroundColor: Colors.theme_color,
    paddingHorizontal: SW(50),
    paddingVertical: SH(10),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SH(10),
    alignSelf: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: SF(15),
    fontFamily: "Poppins-Medium"
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SH(10),
    justifyContent: "center"
  },
  star: {
    marginHorizontal: SW(3),
  },
  menuIcon: {
    width: SW(30),
    height: SH(30)
  },
  feedBackContainer: {
    paddingHorizontal: SW(10),
    paddingVertical: SH(10)
  }

});

export default styles;
