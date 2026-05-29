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
    flexGrow: 1,
  },
  dropdown: {
    height: verticalScale(40),
    backgroundColor: '#2E2E2E',
    borderWidth: 1,
    borderColor: '#00B9C0',
    borderRadius: moderateScale(16),
    paddingHorizontal: scale(18),
    marginBottom: verticalScale(20),
  },
  dropdownContainer: {
    backgroundColor: '#2E2E2E',
    borderRadius: moderateScale(16),
    borderColor: '#00B9C0',
    overflow: 'hidden',
  },
  dropdownText: {
    color: '#FFF',
    fontSize: moderateScale(16),
  },
  placeholderText: {
    color: '#8E8E93',
    fontSize: moderateScale(16),
  },
  dropdownItemText: {
    color: '#FFF',
    fontSize: moderateScale(15),
  },
  label: {
    color: '#FFF',
    fontSize: moderateScale(20),
    fontWeight: '700',
    marginBottom: verticalScale(20),
    marginTop: verticalScale(10),
    marginLeft: verticalScale(5),
  },
  input: {
    height: verticalScale(40),
    backgroundColor: '#2E2E2E',
    borderWidth: 1,
    borderColor: '#00B9C0',
    borderRadius: moderateScale(16),
    paddingHorizontal: scale(18),
    color: '#FFF',
    fontSize: moderateScale(16),
    marginBottom: verticalScale(20),
  },
  addButton: {
    height: verticalScale(40),
    backgroundColor: '#10C7D4',
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: verticalScale(60),
  },
  addText: {
    color: '#000',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
});
