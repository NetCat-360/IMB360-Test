// src/screens/home/styles.ts
import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';
import { Colors } from '../../../config/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
  },
  scrollContent: {
    paddingBottom: verticalScale(30),
  },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#00ACB34D',
  },
  topBarLogo: {
    width: scale(100),
    height: verticalScale(28),
  },
  topBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarIcon: {
    marginLeft: scale(16),
  },
  topBarIconText: {
    fontSize: moderateScale(20),
  },

  // Banner
  banner: {
    height: verticalScale(75),
    backgroundColor: '#EAEAEA',
    marginHorizontal: scale(15),
    marginTop: verticalScale(12),
    borderRadius: moderateScale(18),
  },

  // Profile
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
    paddingHorizontal: scale(24),
  },
  avatar: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(40),
    backgroundColor: '#4DFF88',
    marginRight: scale(16),
  },

  // Bio
  bioContainer: {
    paddingHorizontal: scale(24),
    marginTop: verticalScale(5),
  },

  // Buttons
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    marginTop: verticalScale(7),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cyan,
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(10),
  },
  pointsIcon: {
    width: scale(18),
    height: scale(14),
    resizeMode: 'contain',
    marginRight: scale(6),
  },
  actionText: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(16),
  },

  // Info
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(24),
    marginTop: verticalScale(10),
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    borderRadius: moderateScale(18),
    marginHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    marginTop: verticalScale(15),
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },

  // Menu
  menuCard: {
    height: verticalScale(35),
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    borderRadius: moderateScale(10),
    marginHorizontal: scale(60),
    marginTop: verticalScale(15),
    paddingHorizontal: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: scale(26),
    height: scale(26),
    marginRight: scale(8),
  },
  menuText: {
    flex: 1,
    color: Colors.textPrimary,
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
  arrowIcon: {
    width: scale(14),
    height: scale(22),
  },
});