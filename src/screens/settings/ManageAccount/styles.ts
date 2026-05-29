import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    padding: scale(20),
  },
  dropdownHeader: {
    backgroundColor: '#2E2E2E',
    borderWidth: 1,
    borderColor: '#00B9C0',
    borderRadius: moderateScale(16),
    padding: scale(18),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  dropdownTitle: {
    color: '#FFF',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  arrow: {
    color: '#FFF',
  },
  dropdownBody: {
    marginBottom: verticalScale(20),
  },
  input: {
    height: verticalScale(40),
    backgroundColor: '#2E2E2E',
    borderWidth: 1,
    borderColor: '#00B9C0',
    borderRadius: moderateScale(16),
    paddingHorizontal: scale(18),
    color: '#FFF',
    marginBottom: verticalScale(14),
  },
  saveButton: {
    height: verticalScale(40),
    backgroundColor: '#10C7D4',
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  saveText: {
    color: '#000',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
  },
  modalContainer: {
    backgroundColor: '#000',
    borderRadius: moderateScale(22),
    padding: scale(22),
  },
  otpTitle: {
    color: '#FFF',
    fontSize: moderateScale(28),
    fontWeight: '700',
    marginBottom: verticalScale(10),
  },
  otpSubtitle: {
    color: '#FFF',
    fontSize: moderateScale(14),
    lineHeight: verticalScale(22),
    marginBottom: verticalScale(24),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(24),
  },
  otpInput: {
    width: scale(40),
    height: verticalScale(52),
    backgroundColor: '#E8E8E8',
    borderRadius: moderateScale(10),
    textAlign: 'center',
    fontSize: moderateScale(20),
    fontWeight: '700',
  },
  verifyButton: {
    height: verticalScale(48),
    backgroundColor: '#10C7D4',
    borderRadius: moderateScale(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyText: {
    color: '#FFF',
    fontSize: moderateScale(20),
    fontWeight: '700',
  },
  resendText: {
    color: '#10C7D4',
    textAlign: 'center',
    marginTop: verticalScale(16),
    textDecorationLine: 'underline',
  },
});
