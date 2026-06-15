// src/screens/pricing/styles.ts
import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';
import { Colors } from '../../../config/theme';

export const tabStyles = StyleSheet.create({
  tab: {
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(12),
    marginRight: scale(4),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: scale(40),
    height: verticalScale(28),
  },
  activeTab: { 
    backgroundColor: Colors.teal 
  },
  label: { 
    color: '#FFFFFF', 
    fontSize: moderateScale(13), 
    fontFamily: 'Poppins-Medium'
  },
  activeLabel: { 
    color: '#000000',
    fontFamily: 'Poppins-SemiBold'
  },
  tabIcon: { 
    width: scale(18), 
    height: scale(18) 
  },
});

export const pcStyles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: moderateScale(12),
    borderWidth: 1.5,
    borderColor: Colors.teal,
    marginBottom: verticalScale(16),
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D1A1A',
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.teal + '44',
  },
  platformIcon: { 
    width: scale(20), 
    height: scale(20), 
    marginRight: scale(8) 
  },
  platformName: {
    color: Colors.teal,
    fontSize: moderateScale(12),
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
    flex: 1,
  },
  cardActions: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: scale(8) 
  },
  editBtn: {
    borderWidth: 1,
    borderColor: Colors.teal,
    borderRadius: moderateScale(6),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(3),
  },
  editBtnText: { 
    color: Colors.teal, 
    fontSize: moderateScale(11), 
    fontFamily: 'Poppins-Medium' 
  },
  deleteBtn: {
    backgroundColor: Colors.error,
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnText: { 
    color: '#fff', 
    fontSize: moderateScale(10), 
    fontWeight: 'bold' 
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#1C1C1E',
  },
  priceLabel: { 
    color: Colors.textSecondary, 
    fontSize: moderateScale(13), 
    fontFamily: 'Poppins-Regular' 
  },
  priceValue: { 
    color: Colors.lime, 
    fontSize: moderateScale(13), 
    fontFamily: 'Poppins-SemiBold' 
  },
});

export const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(40),
    paddingBottom: verticalScale(80), 
  },
  icon: { 
    fontSize: moderateScale(52), 
    marginBottom: verticalScale(16) 
  },
  title: {
    color: Colors.textPrimary, 
    fontSize: moderateScale(18),
    fontFamily: 'Poppins-SemiBold', 
    marginBottom: verticalScale(8),
  },
  subtitle: {
    color: Colors.textMuted, 
    fontSize: moderateScale(13),
    fontFamily: 'Poppins-Regular', 
    textAlign: 'center',
    lineHeight: verticalScale(20), 
    marginBottom: verticalScale(28),
  },
  addBtn: {
    backgroundColor: Colors.teal,
    paddingHorizontal: scale(32),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(12),
  },
  addBtnText: { 
    color: '#000', 
    fontSize: moderateScale(15), 
    fontFamily: 'Poppins-SemiBold' 
  },
});

export const styles = StyleSheet.create({
  header: { 
    width: '100%' 
  },
  headerInner: {
    flexDirection: 'row', 
    alignItems: 'center',
    paddingHorizontal: scale(16), 
    paddingBottom: verticalScale(14), 
    paddingTop: verticalScale(4),
  },
  backBtn: { 
    marginRight: scale(12), 
    padding: scale(4) 
  },
  backBtnText: { 
    color: '#000000', 
    fontSize: moderateScale(22), 
    fontWeight: 'bold' 
  },
  headerTitle: { 
    color: '#000000', 
    fontSize: moderateScale(20), 
    fontWeight: 'bold', 
    flex: 1 
  },
  body: { 
    flex: 1, 
    backgroundColor: '#000000' 
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(12),
  },
  filterScrollView: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#1C1C1E',
    borderRadius: moderateScale(14),
    paddingHorizontal: scale(4),
    paddingVertical: verticalScale(4),
    backgroundColor: '#0A0A0A',
  },
  filterStrip: {
    alignItems: 'center',
  },
  scrollContent: { 
    paddingHorizontal: scale(16), 
    paddingBottom: verticalScale(32) 
  },
  emptyWrapper: {
    flex: 1,
  }
});

// ── AddPricingScreen ────────────────────────────────────────────────────────────

export const addDropStyles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: Colors.bgInput, borderRadius: moderateScale(10),
    paddingHorizontal: scale(14), paddingVertical: verticalScale(12),
    marginBottom: verticalScale(20), borderWidth: 1, borderColor: Colors.borderStrong,
  },
  text: { color: Colors.textPrimary, fontSize: moderateScale(14), fontFamily: 'Poppins-Regular' },
  placeholder: { color: Colors.textMuted },
  arrow: { color: Colors.textMuted, fontSize: moderateScale(14) },
});

export const addPickerStyles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100 },
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.7)' },
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.bgCard,
    borderTopLeftRadius: moderateScale(20), borderTopRightRadius: moderateScale(20),
    maxHeight: verticalScale(340), paddingVertical: verticalScale(8),
  },
  option: {
    paddingHorizontal: scale(20), paddingVertical: verticalScale(13),
    borderBottomWidth: 1, borderBottomColor: Colors.borderDefault,
  },
  optionText: { color: Colors.textPrimary, fontSize: moderateScale(14), fontFamily: 'Poppins-Regular' },
});

export const addPiStyles = StyleSheet.create({
  row: { marginBottom: verticalScale(14) },
  label: {
    color: Colors.textSecondary, fontSize: moderateScale(13),
    fontFamily: 'Poppins-Medium', marginBottom: verticalScale(6),
  },
  input: {
    backgroundColor: Colors.bgInput, borderRadius: moderateScale(10),
    paddingHorizontal: scale(14), paddingVertical: verticalScale(11),
    color: Colors.textPrimary, fontSize: moderateScale(14),
    fontFamily: 'Poppins-Regular', borderWidth: 1, borderColor: Colors.borderStrong,
  },
});

export const addPriceStyles = StyleSheet.create({
  header: { width: '100%' },
  headerInner: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: scale(16), paddingBottom: verticalScale(14), paddingTop: verticalScale(4),
  },
  backBtn: { marginRight: scale(12), padding: scale(4) },
  backBtnText: { color: '#000', fontSize: moderateScale(22), fontWeight: 'bold' },
  headerTitle: { color: '#000', fontSize: moderateScale(20), fontWeight: 'bold' },
  body: { flex: 1, backgroundColor: Colors.bgBlack },
  scrollContent: { paddingHorizontal: scale(20), paddingTop: verticalScale(24), paddingBottom: verticalScale(20) },
  sectionLabel: {
    color: Colors.textSecondary, fontSize: moderateScale(13),
    fontFamily: 'Poppins-Medium', marginBottom: verticalScale(8),
  },
  footer: {
    paddingHorizontal: scale(20), paddingVertical: verticalScale(16),
    borderTopWidth: 1, borderTopColor: Colors.borderDefault,
  },
  saveBtn: { borderRadius: moderateScale(12), overflow: 'hidden' },
  saveBtnDisabled: { opacity: 0.5 },
  saveBtnGradient: { paddingVertical: verticalScale(14), alignItems: 'center' },
  saveBtnText: { color: '#000', fontSize: moderateScale(16), fontFamily: 'Poppins-SemiBold' },
});

// ── EditPricingScreen ───────────────────────────────────────────────────────────

export const editPricingStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  title: { color: '#FFF', fontSize: 24, fontWeight: '700', marginBottom: 20 },
  contentId: { color: '#AAA', fontSize: 16, marginBottom: 40 },
  backBtn: { backgroundColor: '#00D2B5', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 12 },
  backBtnText: { color: '#000', fontWeight: '700' },
});