import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';
import { Colors } from '../../../config/theme';
import Typography from '../../../styles/typography';

export const emptyStyles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: scale(40), paddingTop: verticalScale(60),
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
  header: { width: '100%' },
  headerInner: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: scale(16), paddingBottom: verticalScale(14), paddingTop: verticalScale(4) },
  backBtn: { marginRight: scale(12), padding: scale(4) },
  backIcon: { width: scale(30), height: scale(30), resizeMode: 'contain' },
  headerTitle: { color: '#000000', fontSize: moderateScale(20), fontFamily: 'Poppins-Bold' },
  body: { flex: 1, backgroundColor: Colors.bgBlack },
  tabBar: {
    flexDirection: 'row', marginHorizontal: scale(16), marginTop: verticalScale(14),
    marginBottom: verticalScale(6), borderRadius: moderateScale(10),
    backgroundColor: Colors.bgSurface, overflow: 'hidden',
  },
  tabItem: { flex: 1, paddingVertical: verticalScale(8), alignItems: 'center', borderRadius: moderateScale(10) },
  activeTabItem: { backgroundColor: Colors.teal },
  tabLabel: { fontFamily: 'Poppins-Medium', fontSize: moderateScale(13), color: Colors.textSecondary },
  activeTabLabel: { color: '#000', fontFamily: 'Poppins-SemiBold' },
  scrollContent: { paddingHorizontal: scale(16), paddingBottom: verticalScale(120) },
  card: {
    borderWidth: 1, borderColor: Colors.borderTeal, borderRadius: moderateScale(14),
    padding: scale(14), marginTop: verticalScale(12), backgroundColor: Colors.bgCard,
  },
  companyRow: { flexDirection: 'row', alignItems: 'center' },
  companyLogo: { width: scale(46), height: scale(46), borderRadius: scale(23), resizeMode: 'contain', backgroundColor: '#FFF' },
  companyInfo: { marginLeft: scale(12), flex: 1 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: verticalScale(10), gap: scale(6) },
  tag: { borderWidth: 1, borderColor: Colors.borderStrong, borderRadius: moderateScale(20), paddingHorizontal: scale(10), paddingVertical: verticalScale(2) },
  tagText: { fontFamily: 'Poppins-Regular', fontSize: moderateScale(10), color: Colors.textSecondary },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(10), alignItems: 'flex-start' },
  platformMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(10), flexWrap: 'wrap' },
  platformRow: { flexDirection: 'row', alignItems: 'center', marginRight: scale(12) },
  platformIcon: { width: scale(22), height: scale(22), borderRadius: scale(11), justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: Colors.bgCard },
  platformOverflow: { backgroundColor: Colors.bgInputBorder, marginLeft: scale(-6) },
  platformOverflowText: { fontFamily: 'Poppins-SemiBold', fontSize: moderateScale(8), color: Colors.textSecondary },
  addContentBtn: { flexDirection: 'row', alignItems: 'center' },
  addContentText: { fontFamily: 'Poppins-Medium', fontSize: moderateScale(11), color: Colors.teal },
  actionRow: { flexDirection: 'row', marginTop: verticalScale(12), gap: scale(10) },
  viewBtn: { flex: 1, height: verticalScale(36), borderRadius: moderateScale(8), borderWidth: 1, borderColor: Colors.borderTeal, justifyContent: 'center', alignItems: 'center' },
  viewBtnText: { fontFamily: 'Poppins-SemiBold', fontSize: moderateScale(13), color: Colors.textPrimary },
  markCompletedBtn: { flex: 2, height: verticalScale(36), borderRadius: moderateScale(8), overflow: 'hidden' },
  startCampaignBtn: { flex: 2, height: verticalScale(36), borderRadius: moderateScale(8), overflow: 'hidden' },
  markCompletedGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  markCompletedText: { fontFamily: 'Poppins-SemiBold', fontSize: moderateScale(12), color: '#000' },
  biddingCardInner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  biddingLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  statusBadge: { paddingHorizontal: scale(14), paddingVertical: verticalScale(5), borderRadius: moderateScale(8), marginLeft: scale(8) },
  statusBadgeText: { fontFamily: 'Poppins-SemiBold', fontSize: moderateScale(12), color: '#fff' },
});

// ── CampaignURLScreen styles ─────────────────────────────────────────────────

export const urlStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
  },
  contentContainer: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(40),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30),
  },
  backButton: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(21),
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: '#FFF',
    fontSize: moderateScale(22),
    fontWeight: '700',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: moderateScale(20),
    fontWeight: '700',
  },
  placeholder: {
    width: scale(42),
  },
  card: {
    backgroundColor: '#111',
    borderRadius: moderateScale(18),
    padding: scale(20),
    borderWidth: 1,
    borderColor: '#1F1F1F',
  },
  label: {
    ...Typography.body,
    color: Colors.textMuted,
    marginBottom: verticalScale(8),
  },
  campaignId: {
    ...Typography.h3,
    marginBottom: verticalScale(22),
  },
  input: {
    height: verticalScale(55),
    borderRadius: moderateScale(14),
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: scale(16),
    color: '#FFF',
    marginTop: verticalScale(6),
    marginBottom: verticalScale(28),
  },
  submitButton: {
    height: verticalScale(55),
    borderRadius: moderateScale(14),
    backgroundColor: Colors.teal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: '#000',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
});
