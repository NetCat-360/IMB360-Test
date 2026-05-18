import React, { useState } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    StyleSheet,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'

import {
    scale,
    verticalScale,
    moderateScale,
} from '../../utils/scaling'

import { AppNavigationProp } from '../../types/navigation'

type Props = {
    navigation:
    AppNavigationProp<'MyEarnings'>
}

function EarningCard({
    status,
}: {
    status: 'Paid' | 'Pending'
}) {
    return (
        <View style={styles.earningCard}>
            <View style={styles.companyRow}>
                <Image
                    source={require('../../assets/images/earningcard.png')}
                    style={styles.companyLogo}
                />

                <View style={styles.companyInfo}>
                    <Text style={styles.companyName}>
                        Softiwo_IT Services
                    </Text>

                    <Text style={styles.companyDesc}>
                        Require influencers for
                    </Text>

                    <Text style={styles.companyDesc}>
                        product showcase
                    </Text>
                </View>
            </View>

            <View style={styles.paymentRow}>
                <Text style={styles.paymentDate}>
                    Payment Date: 2026-02-28
                </Text>

                <View style={styles.receivedRow}>
                    <Text
                        style={[
                            styles.receivedText,
                            status === 'Pending' &&
                            styles.pendingText,
                        ]}
                    >
                        {status}
                    </Text>

                    <Text style={styles.amountText}>
                        ₱1200
                    </Text>
                </View>
            </View>
        </View>
    )
}

const MyEarnings = ({
    navigation,
}: Props) => {
    const [selectedTab, setSelectedTab] =
        useState<'Paid' | 'Pending'>(
            'Paid'
        )

    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#000"
            />

            {/* Header */}
            <LinearGradient
                colors={[
                    '#00b9c0',
                    '#b6d82c',
                ]}
                start={{
                    x: 0,
                    y: 0,
                }}
                end={{
                    x: 1,
                    y: 0,
                }}
                style={styles.header}
            >
                <SafeAreaView
                    edges={['top']}
                    style={
                        styles.headerInner
                    }
                >
                    <TouchableOpacity
                        onPress={() =>
                            navigation.goBack()
                        }
                    >
                        <Image
                            source={require('../../assets/images/backbutton.png')}
                            style={
                                styles.backIcon
                            }
                        />
                    </TouchableOpacity>

                    <Text
                        style={
                            styles.headerTitle
                        }
                    >
                        My Earnings
                    </Text>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={
                    false
                }
                contentContainerStyle={
                    styles.scrollContent
                }
            >
                {/* Total Earnings Card */}
                <View
                    style={
                        styles.totalCard
                    }
                >
                    <Image
                        source={require('../../assets/images/earningcard.png')}
                        style={
                            styles.earningCardBg
                        }
                    />

                    <Text
                        style={
                            styles.totalLabel
                        }
                    >
                        TOTAL EARNINGS
                    </Text>

                    <Text
                        style={
                            styles.totalAmount
                        }
                    >
                        ₱ 2,200
                    </Text>
                </View>

                {/* Tabs */}
                <View style={styles.tabRow}>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            selectedTab ===
                            'Paid' &&
                            styles.activeTab,
                        ]}
                        onPress={() =>
                            setSelectedTab(
                                'Paid'
                            )
                        }
                    >
                        <Text
                            style={
                                styles.tabText
                            }
                        >
                            Paid
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            selectedTab ===
                            'Pending' &&
                            styles.activeTab,
                        ]}
                        onPress={() =>
                            setSelectedTab(
                                'Pending'
                            )
                        }
                    >
                        <Text
                            style={
                                styles.tabText
                            }
                        >
                            Pending
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* List */}
                <EarningCard
                    status={selectedTab}
                />

                <EarningCard
                    status={selectedTab}
                />

                <EarningCard
                    status={selectedTab}
                />
            </ScrollView>
        </>
    )
}

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:
                '#000',
            paddingHorizontal:
                scale(20),
        },
        
        scrollContent: {
            paddingBottom:
                verticalScale(120),
        },

        // Header
        header: {
            width: '100%',
        },

        headerInner: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal:
                scale(16),
            paddingBottom:
                verticalScale(16),
            paddingTop:
                verticalScale(4),
        },

        backIcon: {
            width: scale(30),
            height: scale(30),
            resizeMode:
                'contain',
            marginRight:
                scale(12),
        },

        headerTitle: {
            color: '#000',
            fontSize:
                moderateScale(22),
            fontWeight:
                '700',
        },

        // Total Card
        totalCard: {
            borderRadius:
                moderateScale(20),
            height:
                verticalScale(120),
            padding:
                scale(10),
            marginTop:
                verticalScale(22),
            overflow:
                'hidden',
            justifyContent:
                'center',
        },

        earningCardBg: {
            position:
                'absolute',
            width: '110%',
            height: '120%',
            top: 0,
            right: 0,
            resizeMode:
                'cover',
        },

        totalLabel: {
            color: '#FFF',
            fontSize:
                moderateScale(16),
            zIndex: 2,
            top: 10
        },

        totalAmount: {
            color: '#FFF',
            fontSize:
                moderateScale(34),
            fontWeight:
                '700',
            marginTop:
                verticalScale(8),
            zIndex: 2,
        },

        // Tabs
        tabRow: {
            flexDirection: 'row',
            borderWidth: 1,
            borderColor:
                '#00b9c0',
            borderRadius:
                moderateScale(12),
            overflow:
                'hidden',
            marginTop:
                verticalScale(22),
        },

        tabButton: {
            flex: 1,
            paddingVertical:
                verticalScale(5),
            alignItems:
                'center',
            backgroundColor:
                '#000',
        },

        activeTab: {
            backgroundColor:
                '#00b9c0',
        },

        tabText: {
            color: '#FFF',
            fontSize:
                moderateScale(16),
            fontWeight:
                '500',
        },

        // Earning Card
        earningCard: {
            borderWidth: 1,
            borderColor:
                '#00b9c0',
            borderRadius:
                moderateScale(14),
            padding:
                scale(18),
            marginTop:
                verticalScale(15),
                top: 18
        },

        companyRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },

        companyLogo: {
            width: scale(64),
            height: scale(64),
            borderRadius:
                scale(32),
            resizeMode:
                'contain',
            backgroundColor:
                '#FFF',
        },

        companyInfo: {
            marginLeft:
                scale(14),
            flex: 1,
        },

        companyName: {
            color: '#FFF',
            fontWeight:
                '700',
            fontSize:
                moderateScale(18),
        },

        companyDesc: {
            color: '#FFF',
            fontSize:
                moderateScale(14),
        },

        paymentRow: {
            flexDirection: 'row',
            justifyContent:
                'space-between',
            marginTop:
                verticalScale(18),
            alignItems:
                'center',
        },

        paymentDate: {
            color: '#888',
            fontSize:
                moderateScale(12),
        },

        receivedRow: {
            flexDirection: 'row',
            alignItems:
                'center',
        },

        receivedText: {
            color: '#DDD',
            fontSize:
                moderateScale(12),
            marginRight:
                scale(6),
        },

        amountText: {
            color: '#22C55E',
            fontWeight:
                '700',
            fontSize:
                moderateScale(18),
        },
        pendingText: {
            color: '#FF4D4D',
        },
    })

export default MyEarnings