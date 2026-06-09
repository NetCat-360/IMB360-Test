import React,
{
    useState,
} from 'react'

import {
    View,
    Text,
    Pressable,
    ScrollView,
} from 'react-native'

import ScreenHeader
    from '../../../components/ScreenHeader'

import Svg, { Rect, Path } from 'react-native-svg'

import {
    AppNavigationProp,
} from '../../../types/navigation'

import { Colors }
    from '../../../config/theme'

import { CURRENCY }
    from '../../../config/constants'

import { styles }
    from './styles'

type PlanTier = 'starter' | 'professional' | 'enterprise'

interface PlanDetails {
    id: PlanTier
    tabLabel: string
    name: string
    duration: string
    price: number
    originalPrice: number
    discountLabel: string
    isActive: boolean
    themeColor: string
    features: string[]
}

type Props = {
    navigation:
    AppNavigationProp<'ViewPlans'>
}

export default function ViewPlansScreen({
    navigation,
}: Props) {
    const [selectedTier, setSelectedTier] = useState<PlanTier>('professional')

    const plansData: Record<PlanTier, PlanDetails> = {
        starter: {
            id: 'starter',
            tabLabel: 'Starter',
            name: 'Starter Pack',
            duration: '3 months',
            price: 299,
            originalPrice: 374,
            discountLabel: '20% OFF',
            isActive: false,
            themeColor: '#FF6B00', // Deep Orange Accent
            features: [
                'Campaign creation & management',
                'Basic influencer discovery',
                'Email support',
                'Performance analytics',
                'Content approval workflow',
            ],
        },
        professional: {
            id: 'professional',
            tabLabel: 'Professional',
            name: 'Professional Pack',
            duration: '6 months',
            price: 599,
            originalPrice: 748,
            discountLabel: '20% OFF',
            isActive: true, // Render "Active Plan" badge
            themeColor: Colors.borderCyan, // Cyan Accent
            features: [
                'Advanced campaign tools',
                'AI-powered influencer matching',
                'Priority support',
                'Detailed ROI analytics',
                'Brand safety monitoring',
                'Multi-platform management',
            ],
        },
        enterprise: {
            id: 'enterprise',
            tabLabel: 'Enterprise',
            name: 'Enterprise Pack',
            duration: '12 months',
            price: 959,
            originalPrice: 1199,
            discountLabel: '20% OFF',
            isActive: false,
            themeColor: '#FFD700', // Yellow/Gold Accent
            features: [
                'White-label solutions',
                'Dedicated account manager',
                'Custom integrations',
                'Advanced reporting suite',
                'API access',
                '24/7 premium support',
            ],
        },
    }

    const currentPlan = plansData[selectedTier]

    return (
        <View style={styles.container}>
            <ScreenHeader
                title="View Plans"
                onBack={() =>
                    navigation.goBack()
                }
            />

            {/* Segmented Tab Bar Container */}
            <View style={styles.tabBarContainer}>
                {(Object.keys(plansData) as PlanTier[]).map((tierKey) => {
                    const item = plansData[tierKey]
                    const isTabActive = selectedTier === tierKey

                    return (
                        <Pressable
                            key={tierKey}
                            style={[
                                styles.tabButton,
                                isTabActive && styles.tabButtonActive,
                            ]}
                            onPress={() =>
                                setSelectedTier(tierKey)
                            }
                        >
                            <Text
                                style={[
                                    styles.tabButtonText,
                                    isTabActive && styles.tabButtonTextActive,
                                ]}
                            >
                                {item.tabLabel}
                            </Text>
                        </Pressable>
                    )
                })}
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Dynamic Focused Card Pattern */}
                <View
                    style={[
                        styles.planCard,
                        { borderColor: currentPlan.themeColor },
                    ]}
                >
                    {/* Active State Indicator Top Right Right-Aligned */}
                    <View style={styles.cardHeaderRow}>
                        <View style={styles.iconCirclePlaceholder}>
                            {currentPlan.id === 'starter' && (
                                <Svg width={50} height={50} viewBox="0 0 50 50" fill="none">
                                    <Rect x="0.5" y="0.5" width="49" height="49" rx="24.5" fill="#A24100" fillOpacity="0.4" />
                                    <Rect x="0.5" y="0.5" width="49" height="49" rx="24.5" stroke="#FF5500" />
                                    <Path d="M24.5 18.9448V36.9999M12 20.3337C12 19.9653 12.1463 19.6121 12.4068 19.3516C12.6673 19.0911 13.0205 18.9448 13.3889 18.9448H35.6111C35.9795 18.9448 36.3327 19.0911 36.5932 19.3516C36.8537 19.6121 37 19.9653 37 20.3337V23.1114C37 23.4797 36.8537 23.833 36.5932 24.0934C36.3327 24.3539 35.9795 24.5002 35.6111 24.5002H13.3889C13.0205 24.5002 12.6673 24.3539 12.4068 24.0934C12.1463 23.833 12 23.4797 12 23.1114V20.3337Z" stroke="#FF5500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <Path d="M34.2222 24.5003V34.2222C34.2222 34.9589 33.9296 35.6654 33.4086 36.1864C32.8877 36.7073 32.1812 36.9999 31.4444 36.9999H17.5556C16.8188 36.9999 16.1123 36.7073 15.5914 36.1864C15.0704 35.6654 14.7778 34.9589 14.7778 34.2222V24.5003M18.25 18.9449C17.3291 18.9449 16.4459 18.5791 15.7948 17.9279C15.1436 17.2768 14.7778 16.3936 14.7778 15.4727C14.7778 14.5519 15.1436 13.6687 15.7948 13.0176C16.4459 12.3664 17.3291 12.0006 18.25 12.0006C19.5898 11.9773 20.9028 12.6273 22.0177 13.8661C23.1326 15.1048 23.9976 16.8746 24.5 18.9449C25.0024 16.8746 25.8674 15.1048 26.9823 13.8661C28.0972 12.6273 29.4102 11.9773 30.75 12.0006C31.6709 12.0006 32.5541 12.3664 33.2052 13.0176C33.8564 13.6687 34.2222 14.5519 34.2222 15.4727C34.2222 16.3936 33.8564 17.2768 33.2052 17.9279C32.5541 18.5791 31.6709 18.9449 30.75 18.9449" stroke="#FF5500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </Svg>
                            )}
                            {currentPlan.id === 'professional' && (
                                <Svg width={50} height={50} viewBox="0 0 50 50" fill="none">
                                    <Rect x="0.5" y="0.5" width="49" height="49" rx="24.5" fill="#00888E" fillOpacity="0.4" />
                                    <Rect x="0.5" y="0.5" width="49" height="49" rx="24.5" stroke="#00ACB3" />
                                    <Path d="M18.0764 36.4558L24.9998 32.07L31.9232 36.5135L30.1099 28.2035L36.2091 22.6635L28.1868 21.9133L24.9998 14.065L21.8129 21.8556L13.7905 22.6058L19.8897 28.2035L18.0764 36.4558ZM24.9998 34.7869L17.0214 39.8467C16.787 39.9683 16.5694 40.0176 16.3687 39.9945C16.1694 39.9699 15.9752 39.8975 15.7862 39.7775C15.5957 39.6544 15.4521 39.4805 15.3554 39.2558C15.2587 39.0311 15.2499 38.7857 15.3291 38.5194L17.4522 29.0322L10.4299 22.6381C10.2321 22.4688 10.1017 22.2665 10.0387 22.031C9.9757 21.7956 9.98962 21.5701 10.0805 21.3547C10.1713 21.1392 10.2922 20.9623 10.4431 20.8238C10.5955 20.6899 10.8006 20.5991 11.0585 20.5514L20.3249 19.7019L23.9382 10.7179C24.0379 10.464 24.1815 10.2808 24.369 10.1685C24.5566 10.0562 24.7668 10 24.9998 10C25.2328 10 25.4438 10.0562 25.6328 10.1685C25.8218 10.2808 25.9647 10.464 26.0614 10.7179L29.6747 19.7019L38.9389 20.5514C39.1983 20.5976 39.4041 20.6891 39.5565 20.8261C39.7089 20.9615 39.8305 21.1377 39.9214 21.3547C40.0107 21.5701 40.0239 21.7956 39.9609 22.031C39.8979 22.2665 39.7675 22.4688 39.5697 22.6381L32.5474 29.0322L34.6706 38.5194C34.7526 38.7826 34.7446 39.0273 34.6464 39.2535C34.5482 39.4797 34.4039 39.6536 34.2134 39.7752C34.0259 39.8983 33.8317 39.9714 33.631 39.9945C33.4317 40.0176 33.2148 39.9683 32.9804 39.8467L24.9998 34.7869Z" fill="#00ACB3" />
                                </Svg>
                            )}
                            {currentPlan.id === 'enterprise' && (
                                <Svg width={50} height={50} viewBox="0 0 50 50" fill="none">
                                    <Rect x="0.5" y="0.5" width="49" height="49" rx="24.5" fill="#8E8200" fillOpacity="0.4" />
                                    <Rect x="0.5" y="0.5" width="49" height="49" rx="24.5" stroke="#FFD000" />
                                    <Path d="M24.0625 38.125V31.0863C22.3387 30.9587 20.8394 30.3344 19.5644 29.2131C18.2894 28.0919 17.4906 26.6806 17.1681 24.9794C15.1844 24.7456 13.4938 23.9325 12.0963 22.54C10.6988 21.1475 10 19.4675 10 17.5V16.7781C10 15.9406 10.295 15.2263 10.885 14.635C11.475 14.045 12.19 13.75 13.03 13.75H16.8512V13.0281C16.8512 12.1906 17.1463 11.4763 17.7363 10.885C18.3263 10.295 19.0406 10 19.8794 10H30.1206C30.9594 10 31.6737 10.295 32.2638 10.885C32.8537 11.475 33.1488 12.1894 33.1488 13.0281V13.75H36.9719C37.8094 13.75 38.5238 14.045 39.115 14.635C39.705 15.225 40 15.94 40 16.78V17.5C40 19.4663 39.3013 21.1462 37.9037 22.54C36.5063 23.9337 34.8156 24.7463 32.8319 24.9775C32.5094 26.68 31.7106 28.0919 30.4356 29.2131C29.1606 30.3344 27.6612 30.9594 25.9375 31.0881V38.125H30.8425C31.1087 38.125 31.3313 38.2144 31.51 38.3931C31.69 38.5719 31.78 38.795 31.78 39.0625C31.78 39.33 31.69 39.5531 31.51 39.7319C31.33 39.9106 31.1075 40 30.8425 40H19.1594C18.8919 40 18.6687 39.9106 18.49 39.7319C18.31 39.5531 18.22 39.33 18.22 39.0625C18.22 38.795 18.31 38.5719 18.49 38.3931C18.67 38.2144 18.8931 38.125 19.1594 38.125H24.0625ZM16.8512 22.9675V15.625H13.0281C12.6919 15.625 12.4156 15.7331 12.1994 15.9494C11.9831 16.1656 11.875 16.4425 11.875 16.78V17.5C11.875 18.9038 12.3513 20.1244 13.3038 21.1619C14.255 22.1994 15.4375 22.8013 16.8512 22.9675ZM29.3988 27.4525C30.6012 26.25 31.2025 24.7837 31.2025 23.0538V13.03C31.2025 12.6925 31.0938 12.4156 30.8762 12.1994C30.6612 11.9831 30.385 11.875 30.0475 11.875H19.9525C19.615 11.875 19.3387 11.9831 19.1238 12.1994C18.9062 12.4156 18.7975 12.6925 18.7975 13.03V23.0538C18.7975 24.7837 19.3988 26.25 20.6013 27.4525C21.8038 28.6537 23.27 29.2544 25 29.2544C26.73 29.2544 28.1962 28.6537 29.3988 27.4525ZM33.1488 22.9656C34.5625 22.8006 35.7456 22.1994 36.6981 21.1619C37.6494 20.1244 38.125 18.9038 38.125 17.5V16.7781C38.125 16.4419 38.0169 16.1656 37.8006 15.9494C37.5844 15.7331 37.3081 15.625 36.9719 15.625H33.1488V22.9656Z" fill="#FFD000" />
                                </Svg>
                            )}
                        </View>
                        {currentPlan.isActive && (
                            <View style={styles.activeBadge}>
                                <Text style={styles.activeBadgeText}>
                                    Active Plan
                                </Text>
                            </View>
                        )}
                    </View>

                    <Text style={styles.planName}>
                        {currentPlan.name}
                    </Text>

                    <Text
                        style={[
                            styles.planDuration,
                            { color: currentPlan.themeColor },
                        ]}
                    >
                        {currentPlan.duration}
                    </Text>

                    {/* Monetary Presentation Layer */}
                    <View style={styles.priceContainer}>
                        <Text style={styles.currencySymbol}>
                            {CURRENCY}
                        </Text>
                        <Text style={styles.priceAmount}>
                            {` ${currentPlan.price}`}
                        </Text>
                    </View>

                    {/* Markdown Strikethrough & Savings Label */}
                    <View style={styles.discountRow}>
                        <View style={styles.originalPriceContainer}>
                            <Text style={styles.originalPriceText}>
                                {`${CURRENCY} ${currentPlan.originalPrice}`}
                            </Text>
                        </View>
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountBadgeText}>
                                {currentPlan.discountLabel}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Checklist Feature Matrix Iterator */}
                    {currentPlan.features.map((feature, idx) => (
                        <View
                            key={idx}
                            style={styles.featureItem}
                        >
                            <Text style={styles.checkmarkIcon}>
                                ✓
                            </Text>
                            <Text style={styles.featureText}>
                                {feature}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Permanent Interactive Action Canvas Footer */}
            <View
                style={[
                    styles.footerContainer,
                    { borderColor: currentPlan.themeColor },
                ]}
            >
                <View style={styles.walletIconContainer}>
                    <Svg width={50} height={50} viewBox="0 0 50 50" fill="none">
                        <Rect width="50" height="50" rx="25" fill="#F0E4E4" fillOpacity="0.2" />
                        <Rect x="0.5" y="0.5" width="49" height="49" rx="24.5" stroke="white" strokeOpacity="0.6" />
                        <Path d="M16 18.25H22" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <Path d="M38.2495 19.8125H34.3465C31.669 19.8125 29.5 21.9109 29.5 24.5C29.5 27.0891 31.6705 29.1875 34.345 29.1875H38.2495C38.3755 29.1875 38.437 29.1875 38.4895 29.1844C39.2995 29.1328 39.9445 28.5094 39.997 27.7266C40 27.6766 40 27.6156 40 27.4953V21.5047C40 21.3844 40 21.3234 39.997 21.2734C39.943 20.4906 39.2995 19.8672 38.4895 19.8156C38.4385 19.8125 38.3755 19.8125 38.2495 19.8125Z" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" />
                        <Path d="M38.4475 19.8125C38.3305 16.8875 37.9555 15.0937 36.742 13.8312C34.9855 12 32.1565 12 26.5 12H22C16.3435 12 13.5145 12 11.758 13.8312C10.0015 15.6625 10 18.6078 10 24.5C10 30.3922 10 33.3391 11.758 35.1687C13.516 36.9984 16.3435 37 22 37H26.5C32.1565 37 34.9855 37 36.742 35.1687C37.9555 33.9062 38.332 32.1125 38.4475 29.1875" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" />
                        <Path d="M33.9865 24.5H34.0015" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                </View>
                <View style={styles.footerTextContainer}>
                    <Text style={styles.footerTitle}>
                        Payment Details
                    </Text>
                    <Text style={styles.footerSubtitle}>
                        Select a package to continue
                    </Text>
                </View>
            </View>
        </View>
    )
}