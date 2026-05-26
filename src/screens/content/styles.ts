// src/screens/content/styles.ts
import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';

export const tabStyles = StyleSheet.create({
  tab: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(20),
    marginRight: scale(6),
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: scale(36),
    height: scale(36),
  },
  activeTab: { backgroundColor: Colors.teal },
  tabLabel: { color: '#888888', fontSize: moderateScale(13), fontWeight: '600' },
  activeLabel: { color: '#000000' },
  tabIcon: { width: scale(18), height: scale(18) },
});

export const cardStyles = StyleSheet.create({
  card: {
    width: '31%',
    backgroundColor: '#0D0D0D',
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1C1C1E',
    marginBottom: verticalScale(12),
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 0.75,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailText: { fontSize: moderateScale(28) },
  deleteBtn: {
    position: 'absolute',
    top: scale(4),
    right: scale(4),
    backgroundColor: Colors.error,
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnText: { color: '#fff', fontSize: moderateScale(9), fontWeight: 'bold' },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(6),
    borderTopWidth: 1,
  },
  footerIcon: { width: scale(16), height: scale(16) },
  viewBtn: {
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
  },
  viewBtnText: { fontSize: moderateScale(9), fontWeight: 'bold' },
});

export const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(40),
    paddingTop: verticalScale(40),
  },
  icon: { fontSize: moderateScale(52), marginBottom: verticalScale(16) },
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
    fontFamily: 'Poppins-SemiBold',
  },
});

export const mainStyles = StyleSheet.create({
  header: { width: '100%' },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(14),
    paddingTop: verticalScale(4),
  },
  backBtn: { marginRight: scale(12), padding: scale(4) },
  backBtnText: { color: '#000000', fontSize: moderateScale(22), fontWeight: 'bold' },
  headerTitle: { color: '#000000', fontSize: moderateScale(20), fontWeight: 'bold', flex: 1 },
  headerAddBtn: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  headerAddBtnText: { color: '#000', fontSize: moderateScale(13), fontFamily: 'Poppins-SemiBold' },
  body: { flex: 1, backgroundColor: '#000000' },
  
  // Creates the explicit black gap below the header
  filterContainer: {
    backgroundColor: '#000000',
    paddingTop: verticalScale(16), 
  },
  filterStrip: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(12),
    alignItems: 'center',
  },
  grid: { paddingHorizontal: scale(16), paddingBottom: verticalScale(32) },
  gridRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});