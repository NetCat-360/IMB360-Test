import { StyleSheet } from 'react-native';
import { Colors } from '../../config/theme';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
  },
  headerImageContainer: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#00ACB399',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  logoTextMain: {
    color: Colors.teal,
    marginLeft: scale(6),
    fontWeight: 'bold',
  },
  logoTextSub: {
    color: Colors.lime,
  },
  screenHeaderRow: {
    paddingHorizontal: scale(16),
    marginTop: verticalScale(12),
    marginBottom: verticalScale(8),
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(4),
  },
  filterButton: {
    padding: scale(4),
  },
  filterDrawerStack: {
    marginHorizontal: scale(16),
    marginBottom: verticalScale(20),
    backgroundColor: Colors.bgCard,
    borderRadius: moderateScale(12),
    padding: scale(12),
    gap: verticalScale(10),
  },
  inputWrapperContainer: {
    backgroundColor: Colors.bgInput,
    borderRadius: moderateScale(8),
    height: verticalScale(35),
    paddingHorizontal: scale(14),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#00ACB399',
  },
  inputSearchIcon: {
    marginRight: scale(10),
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.bgInput,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(12),
    height: verticalScale(35),
    borderWidth: 1,
    borderColor: '#00ACB399',
  },
  dropdownLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownIcon: {
    marginRight: scale(8),
  },
  dropdownLabelText: {
    color: Colors.textSecondary,
  },
  dropdownExpandedListContent: {
    backgroundColor: Colors.bgBlack,
    borderColor: Colors.borderStrong,
    borderWidth: 1,
    borderRadius: moderateScale(8),
    maxHeight: verticalScale(180),
    paddingVertical: verticalScale(4),
  },
  dropdownScrollContainer: {
    paddingHorizontal: scale(12),
  },
  dropdownListItemTouchArea: {
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDefault,
  },
  dropdownListItemTouchAreaLast: {
    paddingVertical: verticalScale(10),
    borderBottomWidth: 0,
  },
  dropdownListItemText: {
    color: Colors.textSecondary,
  },
  dropdownListItemTextActive: {
    color: Colors.teal,
    fontWeight: 'bold',
  },
  submitBtn: {
    borderRadius: moderateScale(8),
    overflow: 'hidden',
  },
  submitGradient: {
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    color: Colors.bgBlack,
  },
  listContent: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(24),
  },
  cardContainer: {
    backgroundColor: Colors.bgSurface,
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: '#00ACB34D',
    padding: scale(20),
    marginBottom: verticalScale(16),
  },
  brandTitle: {
    marginBottom: verticalScale(12),
  },
  descriptionText: {
    color: Colors.textSecondary,
    lineHeight: verticalScale(20),
    marginBottom: verticalScale(16),
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  availableLabel: {
    color: Colors.cyan,
  },
  dateText: {
    color: Colors.textSecondary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  locationText: {
    color: Colors.textMuted,
    marginLeft: scale(6),
  },
  bottomMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: verticalScale(4),
  },
  socialStats: {
    flexDirection: 'row',
    gap: scale(14),
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  statNumberText: {
    color: Colors.textSecondary,
  },
  pricingContainer: {
    alignItems: 'flex-end',
    gap: verticalScale(8),
  },
  priceText: {
    color: Colors.success,
    fontWeight: 'bold',
  },
  rentButton: {
    width: scale(120),
    height: verticalScale(36),
    borderRadius: moderateScale(8),
    overflow: 'hidden',
  },
  gradientButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
