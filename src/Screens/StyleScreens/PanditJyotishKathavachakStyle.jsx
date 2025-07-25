import { StyleSheet } from 'react-native';
import { SH, SW, SF } from '../../utils/Dimensions';
import Colors from '../../utils/Colors';

const styles = StyleSheet.create({

  Filterheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  images: {
    width: SW(80),
    height: SH(80),
  },

  ProfileImage: {
    width: '90%',
    height: SH(300),
    marginHorizontal: SW(15),
    borderRadius: 10,
  },
  fixedHeader: {
    marginVertical: SH(10),
  },
  ButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: SW(10),
    marginBottom: SW(10),
  },

  button: {
    width: SW(70),
    height: SH(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    backgroundColor: 'white',
  },

  activeButton: {
    backgroundColor: Colors.theme_color,
  },

  inactiveButton: {
    backgroundColor: 'white',
  },

  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray,
    borderRadius: 8,
    paddingHorizontal: SW(10),
    width: SW(260),
    justifyContent: 'space-between',
  },
  activeText: {
    color: 'white',
  },
  inactiveText: {
    color: 'black',
  },
  icon: {
    marginBottom: SW(10),
  },
  iconContainer: {
  marginHorizontal:SW(20),
},
sharecontainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: SH(8),
},
  rating: {
    flexDirection: 'row',
  },
  iconText: {
    fontSize: SF(13),
    color: Colors.dark,
    marginVertical: SH(5),
    marginHorizontal: SW(10),
    fontFamily: 'Poppins-Regular',
  },
  Button: {
    backgroundColor: 'green',
    paddingHorizontal: SH(15),
    paddingVertical: SH(3),
    borderRadius: 8,
    alignItems: 'center',
    width: SW(80),
  },
  buttonText: {
    color: Colors.light,
    fontFamily: 'Poppins-Regular',
    fontSize: SF(12),
    marginLeft: SW(2),
  },
  mainContainer: {
    marginTop: SH(70),
    flex: 1,
  },
  image: {
    width: SW(110),
    height: SH(120),
    resizeMode: 'cover',
    marginHorizontal: SW(10),
    marginVertical: SH(10),
    borderRadius: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: SW(10),
    marginVertical: SH(7),
    marginBottom: SH(3),
    paddingVertical: SH(3),
    paddingBottom:SH(10)
  },
  cardData: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: SF(11),
    marginHorizontal: SW(2),
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: SF(13),
  },
  panditListData: {
    marginVertical: SH(10),
    marginTop:SH(6),
  },
  leftContainer: {
    marginVertical: SH(10),
    width: '80%',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: SH(40),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: SH(10),
    paddingLeft: SW(10),
    borderRadius: 5,
    backgroundColor: 'white',
    color: Colors.dark,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: SW(470),
  },
  modalContent: {
    backgroundColor: 'white',
    paddingHorizontal: SW(10),
    paddingVertical: SH(10),
    width: '80%',
    borderRadius: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyButton: {
    backgroundColor: Colors.theme_color,
    paddingHorizontal: SW(10),
    paddingVertical: SH(5),
    borderRadius: 5,
    marginHorizontal: SW(20),
    marginVertical: SH(20),
    borderRadius: 50,
  },
  applyButtonText: {
    fontFamily: 'Poppins-Medium',
    color: Colors.light,
    textAlign: 'center',
    fontSize: SF(17),
  },
  inputContainer: {
    height: SH(40),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: SH(5),
    paddingLeft: SW(10),
    borderRadius: 5,
    backgroundColor: 'white',
    color: Colors.dark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdown: {
    flex: 1,
    marginRight: SW(10),
  },
  headingText: {
    fontFamily: 'Poppins-Bold',
    fontSize: SF(15),
    marginVertical: SH(5),
    marginHorizontal: SW(10),
  },
  circle: {
    width: SW(50),
    height: SH(50),
    borderRadius: 25,
    backgroundColor: Colors.theme_color,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: SH(460),
    left: SW(150),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SW(20),
    paddingVertical: SH(20),
    marginTop: SH(50),
  },
  emptyText: {
    fontSize: SF(20),
    fontFamily: 'Poppins-Bold',
    color: '#555',
    marginBottom: SH(8),
  },
  infoText: {
    fontSize: SF(18),
    color: '#888',
    textAlign: 'center',
  },
});

export default styles;
