import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';

export const localStyles = StyleSheet.create({
  topAlignedContent: {
    justifyContent: 'flex-start',
  },
  rigidLogoContainer: {
    width: '100%',
    height: verticalScale(60),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(40),
  },
  adaptedLogoAsset: {
    width: scale(220),
    height: verticalScale(55),
  },
  mainFormFlowWrapper: {
    width: '100%',
    paddingHorizontal: scale(24),
    marginTop: verticalScale(35),
  },
  verifyTextTitle: {
    color: '#b6d82c',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(10),
  },
  descriptionTextSpacing: {
    textAlign: 'center',
    color: '#666666',
    marginBottom: verticalScale(35),
    paddingHorizontal: scale(12),
    lineHeight: verticalScale(18),
  },
  highlightedEmail: {
    color: '#ffffff',
    fontWeight: '500',
  },
  otpInputContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: scale(4),
  },
  otpBoxWrapper: {
    width: scale(44),
    height: scale(48),
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpTextInput: {
    color: '#ffffff',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    padding: 0,
  },
  resendCodeLink: {
    alignSelf: 'center',
    marginTop: verticalScale(24),
  },
  resendText: {
    color: '#666666',
    fontSize: moderateScale(14),
  },
  resendActionText: {
    color: '#00b9c0',
    fontWeight: '600',
  },
});
