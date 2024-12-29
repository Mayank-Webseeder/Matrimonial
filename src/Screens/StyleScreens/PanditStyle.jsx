import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    marginBottom: SH(10),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SW(15),

  },
  headerText: {
    color: Colors.theme_color,
    fontSize: SF(15),
    fontFamily: "Poppins-Regular"
  },
  righticons: {
    flexDirection: 'row',
  },
  searchbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray,
    marginHorizontal: SW(10),
    borderRadius: 50,
    paddingHorizontal: SW(10),
  },
  images: {
    width: SW(80),
    height: SH(80)
  },
  sliderContainer: {
    marginBottom: SH(30),
    height: SH(230),
  },
  sliderImage: {
    width: "100%",
    height: SH(220),
    resizeMode: 'contain',
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
  ProfileImage: {
    width: "90%",
    height: SH(300),
    marginHorizontal: SW(15),
    borderRadius: 10
  },
  ButtonContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    marginHorizontal: SW(25),
  },
  button: {
    width: SW(150),
    height: SH(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: SH(20),
    borderRadius: 8,
    marginHorizontal: SW(6)
  },
  activeButton: {
    backgroundColor: Colors.theme_color,
  },
  inactiveButton: {
    backgroundColor: 'white',
  },
  activeText: {
    color: 'white',
  },
  inactiveText: {
    color: 'black',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: SH(10),
    height: SH(35),
    backgroundColor: Colors.gray,
    marginHorizontal: SW(10),
    marginVertical: SH(5),
    marginBottom: SH(30)
  },
  icon: {
    marginHorizontal: 10,
  },
  sharecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: SW(10),
    paddingVertical: SH(10)
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: "row"
  },
  CityArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    flexDirection: 'row',
  },
  iconText: {
    fontSize: SF(13),
    color: Colors.dark,
    marginTop: SH(5),
    marginLeft: SW(4)
  },
  Button: {
    backgroundColor: Colors.theme_color,
    paddingHorizontal: SH(15),
    paddingVertical: SH(5),
    borderRadius: 8,
    alignItems: "center",
    width: SW(100)
  },
  buttonText: {
    color: Colors.light,
    fontFamily: "Poppins-Regular",
    fontSize: SF(12),
    marginLeft: SW(2)
  },
  mainContainer: {
    marginTop: SH(70),
    flex: 1
  },
  image: {
    width: SW(100),
    height: SH(90),
    resizeMode: "contain"
  },
  searchbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray,
    marginHorizontal: SW(10),
    borderRadius: 50,
    paddingHorizontal: SW(10),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    padding: SW(10),
    margin: SW(10)
  },
  cardData: {
    flexDirection: "row"
  },
  text: {
    fontFamily: "Poppins-Bold",
    fontSize: SF(13)
  },
  panditListData: {
    marginVertical: SH(10),
    marginBottom: SH(200)
  },
  leftContainer: {
    margin: SW(10)
  }

});

export default styles;