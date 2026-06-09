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
                            <Text
                                style={[
                                    styles.iconEmoji,
                                    { color: currentPlan.themeColor },
                                ]}
                            >
                                {currentPlan.id === 'starter' && '🎁'}
                                {currentPlan.id === 'professional' && '⭐'}
                                {currentPlan.id === 'enterprise' && '🏆'}
                            </Text>
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
                        <Text style={styles.originalPriceText}>
                            {`${CURRENCY} ${currentPlan.originalPrice}`}
                        </Text>
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
                    <Text style={styles.walletIconEmoji}>
                        👛
                    </Text>
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