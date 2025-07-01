import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";
const styles = StyleSheet.create({
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    fontFamily: "Poppins-Medium",
    fontSize: SF(13),
    color: "red"
  },
  editText: {
    fontSize: SF(15),
    color: Colors.theme_color,
    marginLeft: SW(250),
    fontFamily: "Poppins-Bold"
  },
  profileImage: {
    width: SW(100), height: SH(100), borderRadius: 10
  },
  button: {
    backgroundColor: Colors.theme_color,
    paddingVertical: SH(5),
    borderRadius: 5,
    alignItems: 'center',
    marginTop: SH(20),
    marginBottom: SH(80)
  },
  buttonText: {
    color: Colors.light,
    fontSize: SF(15),
    fontWeight: 'Poppins-Bold',
    textTransform: "capitalize"
  },
  arrow: {
    marginLeft: SW(290)
  },
  PickPhotoButton: {
    backgroundColor: Colors.theme_color,
    paddingHorizontal: SW(15),
    paddingVertical: SH(5),
    borderRadius: 5,
    alignItems: 'center',

  },
  PickPhotoText: {
    color: Colors.light,
    fontSize: SF(13),
    fontWeight: 'Poppins-Bold',
  },
  photopickContainer: {
    flexDirection: "row", justifyContent: "space-between",
    marginBottom: SH(5)
  },
  photosContainer: {
    marginTop: SH(10),
    paddingVertical: SH(10),
  },

  photo: {
    width: SW(100),
    height: SH(100),
    marginHorizontal: SW(5),
    marginVertical: SH(5),
    borderRadius: 10,
  },
  checkboxContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: SH(5),
    paddingHorizontal: SW(10),
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  checkboxContainer1: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: SH(5),
    borderRadius: 5,
    height: SH(40),
    justifyContent: "center",
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center"
  },
  servicesLabel: {
    fontSize: SF(15),
    marginBottom: SH(5),
    fontFamily: "Poppins-Bold"
  },
  imagePlaceholder: {
    fontFamily: "Poppins-Regular",
    color: Colors.gray
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: SW(10),
    marginVertical: SH(20),
    paddingHorizontal: 0,
    paddingVertical: SH(15),
    borderRadius: 10,
    maxHeight: '85%',
  },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: SW(10),
        paddingBottom: SH(20),
    },
    card: {
    width: "95%",
    backgroundColor:Colors.light,
    borderRadius: 12,
    margin: SW(10),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  planImage: {
    width: "100%",
    height: SH(200)
  },
  cardContent: {
    paddingHorizontal: SW(12),
    paddingVertical:SH(5),
  },
  title: {
    fontSize: SF(16),
    fontFamily: "Inter-Bold",
    color: Colors.theme_color,
    marginBottom: SH(4),
  },
  Text: {
    fontSize: SF(13),
    color: "#000",
    fontFamily: "Poppins-Regular"
  },
  description: {
    fontSize: SF(12),
    marginTop: SH(6),
    color: "#666",
    fontFamily: "Poppins-Regular"
  },
  closeButton: {
    // backgroundColor:Colors.theme_color,
    borderRadius: 5,
    paddingHorizontal: SW(10),
    paddingVertical: SH(5),
    alignItems: 'center',
    marginTop: SH(10),
  },
  closeText: {
    color: Colors.theme_color,
    fontFamily: "Poppins-Bold",
    fontSize: SF(13)
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SH(12),
  },
  buyButton: {
    backgroundColor: '#866fe7',
    paddingHorizontal: SW(10),
    paddingVertical: SW(5),
    borderRadius: 10,
    flex: 1,
    marginRight: SW(5),
    alignItems: 'center',
    marginVertical: SH(10)
  },
  buyButtonText: {
    color: 'white',
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    fontSize: SF(14)
  },
  trialButton: {
    backgroundColor: '#666266',
    paddingHorizontal: SW(10),
    paddingVertical: SW(5),
    borderRadius: 10,
    flex: 1,
    marginRight: SW(5),
    alignItems: 'center',
  },
  trialText: {
    color: 'white',
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    fontSize: SF(15)
  },
  buttonRowAligned: {
    marginTop: SH(10),
  },

});

export default styles;