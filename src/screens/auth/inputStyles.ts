import { StyleSheet, Platform } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';

export const authInputStyles = StyleSheet.create({
  inputWrapper: {
    width: '100%',
    height: verticalScale(50),
    marginBottom: verticalScale(16),
    justifyContent: 'center',
    position: 'relative',
  },
  inputOutline: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: '#2C2C2E',
    borderRadius: moderateScale(8),
    backgroundColor: '#000000', // Swapped out gray for True Black canvas base
  },
  inputOutlineActive: {
    borderColor: '#b6d82c',
  },
  floatingLabel: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: '#000000', // Adjusted container background mask to pure black
    paddingHorizontal: scale(4),
    fontWeight: '500',
  },
  textInput: {
    flex: 1,
    height: '100%',
    color: '#ffffff',
    fontSize: moderateScale(15),
    paddingHorizontal: scale(14),
    paddingTop: Platform.OS === 'android' ? verticalScale(2) : 0,
  }
});