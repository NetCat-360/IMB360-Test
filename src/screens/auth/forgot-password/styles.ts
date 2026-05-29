import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';

export const localStyles = StyleSheet.create({
  topAlignedContent: { justifyContent: 'flex-start' },
  logoTopContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(5),
  },
  adaptedLogoStyle: {
    width: scale(220),
    height: verticalScale(55),
  },
  formWrapperOffset: { marginTop: verticalScale(-5) },
  forgotTextTitle: {
    marginBottom: verticalScale(14),
    color: '#b6d82c',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionTextSpacing: {
    textAlign: 'center',
    color: '#666666',
    marginBottom: verticalScale(28),
    paddingHorizontal: scale(12),
    lineHeight: verticalScale(18),
    fontSize: moderateScale(13),
  },
  customOutline: {
    borderColor: '#7f9221',
    borderWidth: 1.5,
    borderRadius: moderateScale(10),
    backgroundColor: '#000000',
  },
  customOutlineActive: { borderColor: '#b6d82c' },
  customFloatingLabel: {
    backgroundColor: '#000000',
    paddingHorizontal: scale(6),
    zIndex: 100,
  },
  customTextInput: {
    color: '#ffffff',
    fontSize: moderateScale(15),
  },
});
