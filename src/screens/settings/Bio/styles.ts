import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(32),
  },
  description: {
    color: '#FFF',
    fontSize: moderateScale(15),
    textAlign: 'center',
    lineHeight: verticalScale(26),
    marginBottom: verticalScale(20),
    paddingHorizontal: scale(20),
  },
  label: {
    color: '#FFF',
    fontSize: moderateScale(16),
    fontWeight: '700',
    marginBottom: verticalScale(10),
  },
  input: {
    height: verticalScale(180),
    backgroundColor: '#2E2E2E',
    borderWidth: 1,
    borderColor: '#00B9C0',
    borderRadius: moderateScale(16),
    padding: scale(18),
    color: '#FFF',
    fontSize: moderateScale(14),
  },
  saveButton: {
    height: verticalScale(40),
    backgroundColor: '#10C7D4',
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(35),
  },
  saveText: {
    color: '#000',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
});
