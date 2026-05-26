// src/screens/pricing/styles.ts
import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';

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