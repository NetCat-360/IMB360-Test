import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
  },
  scrollContent: {
    paddingHorizontal: scale(21),
    paddingBottom: verticalScale(60),
    paddingTop: verticalScale(4),
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(15),
  },
  avatar: {
    width: scale(78),
    height: scale(78),
    borderRadius: scale(39),
    backgroundColor: Colors.teal,
    marginRight: scale(18),
  },
  name: {
    color: '#FFF',
    fontSize: moderateScale(24),
    fontWeight: '700',
  },
  username: {
    color: '#8E8E93',
    fontSize: moderateScale(14),
    marginTop: verticalScale(3),
  },
  section: {
    backgroundColor: Colors.bgInputBorder,
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(14),
    marginBottom: verticalScale(16),
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: moderateScale(16),
    fontWeight: '700',
    marginBottom: verticalScale(18),
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
  },
  settingText: {
    color: '#FFF',
    fontSize: moderateScale(16),
    marginLeft: scale(12),
  },
  logoutButton: {
    height: verticalScale(35),
    borderRadius: moderateScale(12),
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF3B30',
    marginTop: verticalScale(10),
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
  arrowIcon: {
    width: scale(12),
    height: scale(20),
    resizeMode: 'contain',
  },
});
