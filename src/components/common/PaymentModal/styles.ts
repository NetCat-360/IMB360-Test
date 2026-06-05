import { StyleSheet } from 'react-native'
import { Colors } from '../../../config/theme'
import { scale, verticalScale, moderateScale } from '../../../utils/scaling'

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(24),
  },
  paymentModalContainer: {
    width: '100%',
    backgroundColor: '#000000', // Deep black background matching the mockup image
    borderRadius: moderateScale(24),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(32),
    alignItems: 'center',
    // Smooth shadow drop for depth visibility
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: scale(26),
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: verticalScale(6),
  },
  warningText: {
    fontSize: scale(15),
    fontWeight: '600',
    color: '#FF6B00', // Bright orange deduction label matching design mockup
    textAlign: 'center',
    marginBottom: verticalScale(28),
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(32),
  },
  balanceLabel: {
    fontSize: scale(22),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  balanceValue: {
    fontSize: scale(22),
    fontWeight: '700',
    color: '#00E676', // Vibrant green accent for the financial balance display
  },
  confirmBtnWrapper: {
    width: '80%', // Standardized structural layout block size matching the mockup ratio
    height: verticalScale(50),
    marginBottom: verticalScale(20),
  },
  confirmGradientElement: {
    flex: 1,
    borderRadius: moderateScale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: {
    fontSize: scale(18),
    fontWeight: '700',
    color: '#000000', // Jet black copy typography inside the brand gradient action asset
  },
  cancelTextLink: {
    fontSize: scale(16),
    fontWeight: '500',
    color: '#00B9C0',
    textDecorationLine: 'underline',
    paddingVertical: verticalScale(6),
  },
  summaryCard: {
    width: '100%',
    backgroundColor: Colors.bgCard,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    padding: scale(14),
    marginBottom: verticalScale(20),
  },
  summaryLabel: {
    fontSize: scale(13),
    color: Colors.textSecondary,
    marginBottom: verticalScale(6),
  },
  summaryDetail: {
    fontSize: scale(11),
    color: Colors.textMuted,
    lineHeight: scale(16),
  },
})