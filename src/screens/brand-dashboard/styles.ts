import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
  },
  scrollContent: {
    paddingBottom: verticalScale(30),
  },

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

  welcomeSection: {
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(10),
  },
  welcomeText: {
    color: Colors.textPrimary,
    fontSize: moderateScale(22),
    fontFamily: 'Poppins-Regular',
  },
  welcomeName: {
    color: Colors.teal,
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  roleBadge: {
    color: '#000',
    backgroundColor: '#00b9c0',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(4),
    alignSelf: 'flex-start',
    marginTop: verticalScale(8),
    overflow: 'hidden',
  },

  statsRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    borderRadius: moderateScale(18),
    marginHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    marginTop: verticalScale(10),
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },

  sectionTitle: {
    paddingHorizontal: scale(24),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(5),
  },

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
