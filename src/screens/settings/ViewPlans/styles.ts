import { StyleSheet } from 'react-native'

import {
    scale,
    verticalScale,
    moderateScale,
} from '../../../utils/scaling'

import { Colors } from '../../../config/theme'

import Typography from '../../../styles/typography'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgBlack,
    },
    tabBarContainer: {
        flexDirection: 'row',
        backgroundColor: '#050505',
        borderWidth: 1,
        borderColor: Colors.borderDefault,
        borderRadius: moderateScale(30),
        marginHorizontal: scale(16),
        marginTop: verticalScale(16),
        marginBottom: verticalScale(8),
        padding: scale(2),
    },
    tabButton: {
        flex: 1,
        paddingVertical: verticalScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(28),
    },
    tabButtonActive: {
        backgroundColor: Colors.cyan,
    },
    tabButtonText: {
        ...Typography.bodySmall,
        color: Colors.textSecondary,
        fontFamily: 'Poppins-Medium',
    },
    tabButtonTextActive: {
        color: Colors.bgBlack,
        fontFamily: 'Poppins-Bold',
    },
    scrollContent: {
        paddingHorizontal: scale(16),
        paddingBottom: verticalScale(100),
        paddingTop: verticalScale(16),
    },
    planCard: {
        backgroundColor: Colors.bgCard,
        borderWidth: 1,
        borderRadius: moderateScale(16),
        padding: scale(20),
        minHeight: verticalScale(400),
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: verticalScale(32),
    },
    iconCirclePlaceholder: {
        width: scale(44),
        height: scale(44),
        borderRadius: moderateScale(22),
        backgroundColor: '#161618',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.borderStrong,
    },
    iconEmoji: {
        fontSize: moderateScale(20),
    },
    activeBadge: {
        backgroundColor: 'rgba(34, 197, 94, 0.15)',
        borderWidth: 1,
        borderColor: Colors.success,
        borderRadius: moderateScale(6),
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(4),
    },
    activeBadgeText: {
        color: Colors.success,
        fontSize: moderateScale(11),
        fontFamily: 'Poppins-SemiBold',
    },
    planName: {
        ...Typography.h2,
        color: Colors.textPrimary,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        marginTop: verticalScale(16),
    },
    planDuration: {
        ...Typography.bodySmall,
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        marginTop: verticalScale(2),
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginTop: verticalScale(12),
    },
    currencySymbol: {
        ...Typography.h2,
        color: Colors.textPrimary,
        fontFamily: 'Poppins-Bold',
    },
    priceAmount: {
        ...Typography.displayLarge,
        color: Colors.textPrimary,
        fontFamily: 'Poppins-Bold',
    },
    discountRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(4),
    },
    originalPriceText: {
        ...Typography.bodySmall,
        color: Colors.textMuted,
        textDecorationLine: 'line-through',
        marginRight: scale(8),
    },
    discountBadge: {
        borderWidth: 1,
        borderColor: Colors.success,
        borderRadius: moderateScale(4),
        paddingHorizontal: scale(6),
        paddingVertical: verticalScale(1),
    },
    discountBadgeText: {
        color: Colors.success,
        fontSize: moderateScale(10),
        fontFamily: 'Poppins-Bold',
    },
    divider: {
        height: 1,
        backgroundColor: Colors.borderStrong,
        marginVertical: verticalScale(20),
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: verticalScale(14),
    },
    checkmarkIcon: {
        fontSize: moderateScale(14),
        color: Colors.success,
        fontWeight: 'bold',
        marginRight: scale(10),
        marginTop: verticalScale(1),
    },
    featureText: {
        ...Typography.body,
        color: Colors.textPrimary,
        flex: 1,
    },
    footerContainer: {
        position: 'absolute',
        bottom: verticalScale(20),
        left: scale(16),
        right: scale(16),
        backgroundColor: Colors.bgCard,
        borderWidth: 1,
        borderRadius: moderateScale(16),
        padding: scale(14),
        flexDirection: 'row',
        alignItems: 'center',
    },
    walletIconContainer: {
        width: scale(40),
        height: scale(40),
        borderRadius: moderateScale(20),
        backgroundColor: '#1C1C1E',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.borderStrong,
    },
    walletIconEmoji: {
        fontSize: moderateScale(18),
    },
    footerTextContainer: {
        marginLeft: scale(14),
        flex: 1,
    },
    footerTitle: {
        ...Typography.h3,
        color: Colors.textPrimary,
        fontFamily: 'Poppins-Bold',
    },
    footerSubtitle: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
})