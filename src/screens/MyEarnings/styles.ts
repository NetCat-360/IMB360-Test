import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';

export const emptyStyles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: scale(40), paddingTop: verticalScale(40),
  },
  icon: { fontSize: moderateScale(52), marginBottom: verticalScale(16) },
  title: {
    color: Colors.textPrimary, fontSize: moderateScale(18),
    fontFamily: 'Poppins-SemiBold', marginBottom: verticalScale(8), textAlign: 'center',
  },
  subtitle: {
    color: Colors.textMuted, fontSize: moderateScale(13),
    fontFamily: 'Poppins-Regular', textAlign: 'center', lineHeight: verticalScale(20),
  },
});

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgBlack, paddingHorizontal: scale(20) },
  scrollContent: { paddingBottom: verticalScale(20) },
  scrollContentEmpty: { flexGrow: 1 },

  totalCard: {
    borderRadius: moderateScale(20), height: verticalScale(120), padding: scale(10),
    marginTop: verticalScale(22), overflow: 'hidden', justifyContent: 'center',
  },
  earningCardBg: { position: 'absolute', width: '110%', height: '120%', top: 0, right: 0, resizeMode: 'cover' },

  tabRow: {
    flexDirection: 'row', borderWidth: 1, borderColor: Colors.borderTeal,
    borderRadius: moderateScale(12), overflow: 'hidden', marginTop: verticalScale(22),
  },
  tabButton: { flex: 1, paddingVertical: verticalScale(5), alignItems: 'center', backgroundColor: Colors.bgBlack },
  activeTab: { backgroundColor: Colors.teal },

  earningCard: {
    borderWidth: 1, borderColor: Colors.borderTeal, borderRadius: moderateScale(14),
    padding: scale(18), marginTop: verticalScale(15),
  },
  companyRow: { flexDirection: 'row', alignItems: 'center' },
  companyLogo: { width: scale(64), height: scale(64), borderRadius: scale(32), resizeMode: 'contain', backgroundColor: '#FFF' },
  companyInfo: { marginLeft: scale(14), flex: 1 },
  paymentRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(18), alignItems: 'center' },
  receivedRow: { flexDirection: 'row', alignItems: 'center' },
});
