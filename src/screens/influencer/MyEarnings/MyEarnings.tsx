// src/screens/MyEarnings/MyEarnings.tsx
import React, { useState } from 'react';
import {
  View, Text, Image, Pressable,
  ScrollView, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from '../../../utils/scaling';
import { AppNavigationProp } from '../../../types/navigation';
import { Colors } from '../../../config/theme';
import Typography from '../../../styles/typography';
import ScreenHeader from '../../../components/ScreenHeader';
import { emptyStyles, styles } from './styles';

type Props = { navigation: AppNavigationProp<'MyEarnings'> };

import { CURRENCY } from '../../../config/constants';

// ── Empty state ───────────────────────────────────────────────────────────────

const EmptyState = ({ tab }: { tab: 'Paid' | 'Pending' }) => (
  <View style={emptyStyles.container}>
    <Text style={emptyStyles.icon}>{tab === 'Paid' ? '💳' : '⏳'}</Text>
    <Text style={emptyStyles.title}>
      {tab === 'Paid' ? 'No payments yet' : 'No pending payments'}
    </Text>
    <Text style={emptyStyles.subtitle}>
      {tab === 'Paid'
        ? 'Completed campaign payments from brands will appear here.'
        : 'Payments awaiting release from ongoing campaigns will appear here.'}
    </Text>
  </View>
);

// ── Earning card ──────────────────────────────────────────────────────────────

function EarningCard({ status }: { status: 'Paid' | 'Pending' }) {
  return (
    <View style={styles.earningCard}>
      <View style={styles.companyRow}>
        <Image source={require('../../../assets/images/earningcard.png')} style={styles.companyLogo} />
        <View style={styles.companyInfo}>
          <Text style={Typography.h3}>Softiwo_IT Services</Text>
          <Text style={[Typography.body, { color: Colors.textPrimary }]}>
            Require influencers for product showcase
          </Text>
        </View>
      </View>
      <View style={styles.paymentRow}>
        <Text style={Typography.caption}>Payment Date: 2026-02-28</Text>
        <View style={styles.receivedRow}>
          <Text style={[Typography.caption, { marginRight: scale(6) }, status === 'Pending' ? { color: Colors.pending } : { color: Colors.textSecondary }]}>
            {status}
          </Text>
          <Text style={[Typography.h3, { color: Colors.success }]}>{CURRENCY}1200</Text>
        </View>
      </View>
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

const EMPTY_PAID_ITEMS: null[] = [];
const EMPTY_PENDING_ITEMS: null[] = [];

const MyEarnings = ({ navigation }: Props) => {
  const [selectedTab, setSelectedTab] = useState<'Paid' | 'Pending'>('Paid');

  // Empty — real data from API
  const paidItems = EMPTY_PAID_ITEMS;
  const pendingItems = EMPTY_PENDING_ITEMS;

  const currentItems = selectedTab === 'Paid' ? paidItems : pendingItems;
  const isEmpty = currentItems.length === 0;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <ScreenHeader title="My Earnings" onBack={() => navigation.goBack()} />

      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgBlack }} edges={['bottom']}>
        <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, isEmpty && styles.scrollContentEmpty]}
      >
        {/* Total Earnings Card */}
        <View style={styles.totalCard}>
          <Image source={require('../../../assets/images/earningcard.png')} style={styles.earningCardBg} />
          <Text style={[Typography.label, { color: Colors.textPrimary, zIndex: 2 }]}>TOTAL EARNINGS</Text>
          <Text style={[Typography.displayLarge, { zIndex: 2, marginTop: verticalScale(8) }]}>
            {CURRENCY} 0
          </Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {(['Paid', 'Pending'] as const).map(tab => (
            <Pressable
              key={tab}
              style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[Typography.body, { fontFamily: 'Poppins-Medium' }]}>{tab}</Text>
            </Pressable>
          ))}
        </View>

        {/* List or empty */}
        {isEmpty ? (
          <EmptyState tab={selectedTab} />
        ) : (
          currentItems.map((_, i) => <EarningCard key={'earning-' + i} status={selectedTab} />)
        )}
      </ScrollView>
      </SafeAreaView>
    </>
  );
};



export default MyEarnings;
