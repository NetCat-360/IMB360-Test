// src/screens/MyEarnings/MyEarnings.tsx
import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  ScrollView, StatusBar, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { AppNavigationProp } from '../../types/navigation';
import { Colors } from '../../config/theme';
import Typography from '../../styles/typography';
import ScreenHeader from '../../components/ScreenHeader';

type Props = { navigation: AppNavigationProp<'MyEarnings'> };

import { CURRENCY } from '../../config/constants';

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

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: scale(40), paddingTop: verticalScale(40),
  },
  icon: { fontSize: moderateScale(52), marginBottom: verticalScale(16) },
  title: {
    color: Colors.textPrimary, fontSize: moderateScale(18),
    fontFamily: 'Poppins-SemiBold', marginBottom: verticalScale(8), textAlign: 'center',
  },
  subtitle: {
    color: Colors.textMuted, fontSize: moderateScale(13),
    fontFamily: 'Poppins-Regular', textAlign: 'center', lineHeight: verticalScale(20),
  },
});

// ── Earning card ──────────────────────────────────────────────────────────────

function EarningCard({ status }: { status: 'Paid' | 'Pending' }) {
  return (
    <View style={styles.earningCard}>
      <View style={styles.companyRow}>
        <Image source={require('../../assets/images/earningcard.png')} style={styles.companyLogo} />
        <View style={styles.companyInfo}>
          <Text style={[Typography.h3]}>Softiwo_IT Services</Text>
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

const MyEarnings = ({ navigation }: Props) => {
  const [selectedTab, setSelectedTab] = useState<'Paid' | 'Pending'>('Paid');

  // Empty — real data from API
  const paidItems: null[] = [];
  const pendingItems: null[] = [];

  const currentItems = selectedTab === 'Paid' ? paidItems : pendingItems;
  const isEmpty = currentItems.length === 0;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <ScreenHeader title="My Earnings" onBack={() => navigation.goBack()} />

      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, isEmpty && styles.scrollContentEmpty]}
      >
        {/* Total Earnings Card */}
        <View style={styles.totalCard}>
          <Image source={require('../../assets/images/earningcard.png')} style={styles.earningCardBg} />
          <Text style={[Typography.label, { color: Colors.textPrimary, zIndex: 2 }]}>TOTAL EARNINGS</Text>
          <Text style={[Typography.displayLarge, { zIndex: 2, marginTop: verticalScale(8) }]}>
            {CURRENCY} 0
          </Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {(['Paid', 'Pending'] as const).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[Typography.body, { fontFamily: 'Poppins-Medium' }]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* List or empty */}
        {isEmpty ? (
          <EmptyState tab={selectedTab} />
        ) : (
          currentItems.map((_, i) => <EarningCard key={i} status={selectedTab} />)
        )}
      </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgBlack, paddingHorizontal: scale(20) },
  scrollContent: { paddingBottom: verticalScale(120) },
  scrollContentEmpty: { flexGrow: 1 },

  totalCard: {
    borderRadius: moderateScale(20), height: verticalScale(120), padding: scale(10),
    marginTop: verticalScale(22), overflow: 'hidden', justifyContent: 'center',
  },
  earningCardBg: { position: 'absolute', width: '110%', height: '120%', top: 0, right: 0, resizeMode: 'cover' },

  tabRow: {
    flexDirection: 'row', borderWidth: 1, borderColor: Colors.borderTeal,
    borderRadius: moderateScale(12), overflow: 'hidden', marginTop: verticalScale(22),
  },
  tabButton: { flex: 1, paddingVertical: verticalScale(5), alignItems: 'center', backgroundColor: Colors.bgBlack },
  activeTab: { backgroundColor: Colors.teal },

  earningCard: {
    borderWidth: 1, borderColor: Colors.borderTeal, borderRadius: moderateScale(14),
    padding: scale(18), marginTop: verticalScale(15),
  },
  companyRow: { flexDirection: 'row', alignItems: 'center' },
  companyLogo: { width: scale(64), height: scale(64), borderRadius: scale(32), resizeMode: 'contain', backgroundColor: '#FFF' },
  companyInfo: { marginLeft: scale(14), flex: 1 },
  paymentRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(18), alignItems: 'center' },
  receivedRow: { flexDirection: 'row', alignItems: 'center' },
});

export default MyEarnings;
