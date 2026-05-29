import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(14),
    paddingBottom: verticalScale(60),
  },
  description: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: moderateScale(13),
    lineHeight: verticalScale(16),
    marginBottom: verticalScale(18),
  },
  label: {
    color: '#FFF',
    fontSize: moderateScale(13),
    fontWeight: '700',
    marginBottom: verticalScale(5),
  },
  input: {
    height: verticalScale(42),
    backgroundColor: '#2E2E2E',
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#00B9C0',
    paddingHorizontal: scale(12),
    color: '#FFF',
    fontSize: moderateScale(13),
    marginBottom: verticalScale(11),
  },
  dropdown: {
    height: verticalScale(42),
    backgroundColor: '#2E2E2E',
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#00B9C0',
    paddingHorizontal: scale(12),
    justifyContent: 'center',
    marginBottom: verticalScale(10),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  half: {
    width: '47%',
  },
  smallInput: {
    height: verticalScale(42),
    backgroundColor: '#2E2E2E',
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#00B9C0',
    paddingHorizontal: scale(12),
    color: '#FFF',
    fontSize: moderateScale(13),
  },
  smallDropdown: {
    height: verticalScale(42),
    backgroundColor: '#2E2E2E',
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#00B9C0',
    paddingHorizontal: scale(12),
    justifyContent: 'center',
  },
  placeholder: {
    color: '#A1A1A1',
    fontSize: moderateScale(13),
  },
  selectedText: {
    color: '#FFF',
    fontSize: moderateScale(13),
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    borderColor: '#00B9C0',
  },
  saveButton: {
    height: verticalScale(44),
    backgroundColor: '#11B8C7',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(16),
  },
  saveText: {
    color: '#000',
    fontSize: moderateScale(14),
    fontWeight: '700',
  },
});
