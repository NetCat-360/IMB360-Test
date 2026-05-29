import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';

export const localStyles = StyleSheet.create({
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
  heading: {
    marginBottom: verticalScale(30),
    fontSize: moderateScale(22),
    textAlign: 'center',
  },
});
