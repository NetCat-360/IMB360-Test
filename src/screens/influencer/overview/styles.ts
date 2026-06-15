import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';
import { Colors } from '../../../config/theme';

export const cardStyles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: Colors.bgCard,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    padding: scale(12),
    marginBottom: verticalScale(12),
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(8) },
  platformIcon: { width: scale(20), height: scale(20), marginRight: scale(8) },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metricBlock: { alignItems: 'flex-start' },
});

export const segStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(12) },
  label: { width: scale(110) },
  track: {
    flex: 1,
    height: verticalScale(4),
    backgroundColor: Colors.borderDefault,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 2 },
});

export const styles = StyleSheet.create({
  header: { width: '100%' },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(14),
    paddingTop: verticalScale(4),
  },
  backBtn: { marginRight: scale(12), padding: scale(4) },
  backIcon: { width: scale(30), height: scale(30), resizeMode: 'contain', marginRight: scale(12) },
  headerTitle: { color: '#000000', fontSize: moderateScale(20), fontWeight: 'bold' },
  body: { flex: 1, backgroundColor: Colors.bgBlack, paddingHorizontal: scale(16), paddingTop: verticalScale(16) },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  cardsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    padding: scale(14),
    marginBottom: verticalScale(16),
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  dateChip: {
    backgroundColor: Colors.borderDefault,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(12),
  },
  chartArea: {
    height: verticalScale(140),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(12),
  },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: scale(12) },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendDot: { width: scale(8), height: scale(8), borderRadius: scale(4), marginRight: scale(5) },
});
