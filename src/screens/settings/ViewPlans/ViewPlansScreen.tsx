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

export default function ViewPlansScreen({
    navigation,
}: Props) {
    const [selectedTier, setSelectedTier] = useState<PlanTier>('professional')

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
                                    <Path d="M24.5 18.94V37M12 20.33C12 19.97 12.15 19.61 12.41 19.35C12.67 19.09 13.02 18.94 13.39 18.94H35.61C35.98 18.94 36.33 19.09 36.59 19.35C36.85 19.61 37 19.97 37 20.33V23.11C37 23.48 36.85 23.83 36.59 24.09C36.33 24.35 35.98 24.5 35.61 24.5H13.39C13.02 24.5 12.67 24.35 12.41 24.09C12.15 23.83 12 23.48 12 23.11V20.33Z" stroke="#FF5500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <Path d="M34.22 24.5V34.22C34.22 34.96 33.93 35.67 33.41 36.19C32.89 36.71 32.18 37 31.44 37H17.56C16.82 37 16.11 36.71 15.59 36.19C15.07 35.67 14.78 34.96 14.78 34.22V24.5M18.25 18.94C17.33 18.94 16.45 18.58 15.79 17.93C15.14 17.28 14.78 16.39 14.78 15.47C14.78 14.55 15.14 13.67 15.79 13.02C16.45 12.37 17.33 12 18.25 12C19.59 11.98 20.9 12.63 22.02 13.87C23.13 15.1 24 16.87 24.5 18.94C25 16.87 25.87 15.1 26.98 13.87C28.1 12.63 29.41 11.98 30.75 12C31.67 12 32.55 12.37 33.21 13.02C33.86 13.67 34.22 14.55 34.22 15.47C34.22 16.39 33.86 17.28 33.21 17.93C32.55 18.58 31.67 18.94 30.75 18.94" stroke="#FF5500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </Svg>
                            )}
                            {currentPlan.id === 'professional' && (
                                <Svg width={50} height={50} viewBox="0 0 50 50" fill="none">
                                    <Rect x="0.5" y="0.5" width="49" height="49" rx="24.5" fill="#00888E" fillOpacity="0.4" />
                                    <Rect x="0.5" y="0.5" width="49" height="49" rx="24.5" stroke="#00ACB3" />
                                    <Path d="M18.08 36.46L25 32.07L31.92 36.51L30.11 28.2L36.21 22.66L28.19 21.91L25 14.07L21.81 21.86L13.79 22.61L19.89 28.2L18.08 36.46ZM25 34.79L17.02 39.85C16.79 39.97 16.57 40.02 16.37 39.99C16.17 39.97 15.98 39.9 15.79 39.78C15.6 39.65 15.45 39.48 15.36 39.26C15.26 39.03 15.25 38.79 15.33 38.52L17.45 29.03L10.43 22.64C10.23 22.47 10.1 22.27 10.04 22.03C9.98 21.8 9.99 21.57 10.08 21.35C10.17 21.14 10.29 20.96 10.44 20.82C10.6 20.69 10.8 20.6 11.06 20.55L20.32 19.7L23.94 10.72C24.04 10.46 24.18 10.28 24.37 10.17C24.56 10.06 24.77 10 25 10C25.23 10 25.44 10.06 25.63 10.17C25.82 10.28 25.96 10.46 26.06 10.72L29.67 19.7L38.94 20.55C39.2 20.6 39.4 20.69 39.56 20.83C39.71 20.96 39.83 21.14 39.92 21.35C40.01 21.57 40.02 21.8 39.96 22.03C39.9 22.27 39.77 22.47 39.57 22.64L32.55 29.03L34.67 38.52C34.75 38.78 34.74 39.03 34.65 39.25C34.55 39.48 34.4 39.65 34.21 39.78C34.03 39.9 33.83 39.97 33.63 39.99C33.43 40.02 33.21 39.97 32.98 39.85L25 34.79Z" fill="#00ACB3" />
                                </Svg>
                            )}
                            {currentPlan.id === 'enterprise' && (
                                <Svg width={50} height={50} viewBox="0 0 50 50" fill="none">
                                    <Rect x="0.5" y="0.5" width="49" height="49" rx="24.5" fill="#8E8200" fillOpacity="0.4" />
                                    <Rect x="0.5" y="0.5" width="49" height="49" rx="24.5" stroke="#FFD000" />
                                    <Path d="M24.06 38.13V31.09C22.34 30.96 20.84 30.33 19.56 29.21C18.29 28.09 17.49 26.68 17.17 24.98C15.18 24.75 13.49 23.93 12.1 22.54C10.7 21.15 10 19.47 10 17.5V16.78C10 15.94 10.3 15.23 10.89 14.64C11.48 14.05 12.19 13.75 13.03 13.75H16.85V13.03C16.85 12.19 17.15 11.48 17.74 10.89C18.33 10.3 19.04 10 19.88 10H30.12C30.96 10 31.67 10.3 32.26 10.89C32.85 11.48 33.15 12.19 33.15 13.03V13.75H36.97C37.81 13.75 38.52 14.05 39.12 14.64C39.71 15.23 40 15.94 40 16.78V17.5C40 19.47 39.3 21.15 37.9 22.54C36.51 23.93 34.82 24.75 32.83 24.98C32.51 26.68 31.71 28.09 30.44 29.21C29.16 30.33 27.66 30.96 25.94 31.09V38.13H30.84C31.11 38.13 31.33 38.21 31.51 38.39C31.69 38.57 31.78 38.8 31.78 39.06C31.78 39.33 31.69 39.55 31.51 39.73C31.33 39.91 31.11 40 30.84 40H19.16C18.89 40 18.67 39.91 18.49 39.73C18.31 39.55 18.22 39.33 18.22 39.06C18.22 38.8 18.31 38.57 18.49 38.39C18.67 38.21 18.89 38.13 19.16 38.13H24.06ZM16.85 22.97V15.63H13.03C12.69 15.63 12.42 15.73 12.2 15.95C11.98 16.17 11.88 16.44 11.88 16.78V17.5C11.88 18.9 12.35 20.12 13.3 21.16C14.26 22.2 15.44 22.8 16.85 22.97ZM29.4 27.45C30.6 26.25 31.2 24.78 31.2 23.05V13.03C31.2 12.69 31.09 12.42 30.88 12.2C30.66 11.98 30.39 11.88 30.05 11.88H19.95C19.61 11.88 19.34 11.98 19.12 12.2C18.91 12.42 18.8 12.69 18.8 13.03V23.05C18.8 24.78 19.4 26.25 20.6 27.45C21.8 28.65 23.27 29.25 25 29.25C26.73 29.25 28.2 28.65 29.4 27.45ZM33.15 22.97C34.56 22.8 35.75 22.2 36.7 21.16C37.65 20.12 38.13 18.9 38.13 17.5V16.78C38.13 16.44 38.02 16.17 37.8 15.95C37.58 15.73 37.31 15.63 36.97 15.63H33.15V22.97Z" fill="#FFD000" />
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
                            key={feature}
                            style={styles.featureItem}
                        >
                            <Text style={styles.checkmarkIcon}>
                                âœ“
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
                        <Path d="M38.25 19.81H34.35C31.67 19.81 29.5 21.91 29.5 24.5C29.5 27.09 31.67 29.19 34.35 29.19H38.25C38.38 29.19 38.44 29.19 38.49 29.18C39.3 29.13 39.94 28.51 40 27.73C40 27.68 40 27.62 40 27.5V21.5C40 21.38 40 21.32 40 21.27C39.94 20.49 39.3 19.87 38.49 19.82C38.44 19.81 38.38 19.81 38.25 19.81Z" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" />
                        <Path d="M38.45 19.81C38.33 16.89 37.96 15.09 36.74 13.83C34.99 12 32.16 12 26.5 12H22C16.34 12 13.51 12 11.76 13.83C10 15.66 10 18.61 10 24.5C10 30.39 10 33.34 11.76 35.17C13.52 37 16.34 37 22 37H26.5C32.16 37 34.99 37 36.74 35.17C37.96 33.91 38.33 32.11 38.45 29.19" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" />
                        <Path d="M33.99 24.5H34" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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