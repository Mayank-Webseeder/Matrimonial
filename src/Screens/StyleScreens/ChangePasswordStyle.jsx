import { StyleSheet } from 'react-native';
import { SH, SW, SF } from '../../utils/Dimensions';
import Colors from '../../utils/Colors';

const styles = StyleSheet.create({
  Text: {
    fontSize: SF(17),
    color: Colors.theme_color,
    marginHorizontal: SW(20),
    marginTop: SW(30),
    fontFamily: 'Poppins-Regular',
  },
  inputContainer: {
    marginHorizontal: SW(20),
    marginVertical: SH(20),
  },
  passwordField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: SH(15),
    paddingHorizontal: SW(15),
    borderColor: Colors.gray,
    borderWidth: 1,
    color: Colors.theme_color,
  },

  input: {
    flex: 1,
    color: Colors.dark,
    fontSize: SF(13),
  },

  eyeIcon: {
    position: 'absolute',
    right: SW(15),
  },
  errorText: {
    color: 'red',
    fontSize: SF(13),
    textAlign: 'center',
    marginBottom: SH(10),
  },
  optionButton: {
    backgroundColor: Colors.theme_color,
    paddingVertical: SH(5),
    paddingHorizontal: SW(20),
    marginBottom: SH(15),
    borderRadius: 5,
  },
  optionText: {
    color: Colors.light,
    fontSize: SF(15),
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: SW(20),
    paddingVertical: SH(20),
    alignItems: 'center',
  },
  modalText: {
    fontSize: SF(18),
    color: Colors.darkGrey,
    marginBottom: SH(20),
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: Colors.theme_color,
    paddingHorizontal: SW(3),
    paddingVertical: SH(3),
    borderRadius: 8,
    width: '50%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: Colors.light,
    fontSize: SF(15),
    fontFamily: 'Poppins-Bold',
  },
});

export default styles;
