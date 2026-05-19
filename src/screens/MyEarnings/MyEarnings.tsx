// src/screens/MyEarnings/MyEarnings.tsx
// Fix: currency symbol (₱) moved to a constant — easy to swap once
//      locale/currency comes from the user's profile via API.
// Improvement: theme tokens replace hardcoded hex strings, Typography applied.
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { AppNavigationProp } from '../../types/navigation';
import { Colors } from '../../config/theme';
import Typography from '../../styles/typography';

type Props = { navigation: AppNavigationProp<'MyEarnings'> };

// FIX: currency symbol in one place — swap to user.currency from Redux once backend lands
const CURRENCY = '₱';

function EarningCard({ status }: { status: 'Paid' | 'Pending' }) {
  return (
    <View style={styles.earningCard}>
      <View style={styles.companyRow}>
        <Image
          source={require('../../assets/images/earningcard.png')}
          style={styles.companyLogo}
        />
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
          <Text
            style={[
              Typography.caption,
              { marginRight: scale(6) },
              status === 'Pending' ? { color: Colors.pending } : { color: Colors.textSecondary },
            ]}
          >
            {status}
          </Text>
          <Text style={[Typography.h3, { color: Colors.success }]}>
            {CURRENCY}1200
          </Text>
        </View>
      </View>
    </View>
  );
}

const MyEarnings = ({ navigation }: Props) => {
  const [selectedTab, setSelectedTab] = useState<'Paid' | 'Pending'>('Paid');

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <LinearGradient
        colors={[Colors.teal, Colors.lime]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <SafeAreaView edges={['top']} style={styles.headerInner}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/images/backbutton.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Earnings</Text>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Total Earnings Card */}
        <View style={styles.totalCard}>
          <Image
            source={require('../../assets/images/earningcard.png')}
            style={styles.earningCardBg}
          />
          <Text style={[Typography.label, { color: Colors.textPrimary, zIndex: 2 }]}>
            TOTAL EARNINGS
          </Text>
          <Text style={[Typography.displayLarge, { zIndex: 2, marginTop: verticalScale(8) }]}>
            {CURRENCY} 2,200
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

        {/* List */}
        <EarningCard status={selectedTab} />
        <EarningCard status={selectedTab} />
        <EarningCard status={selectedTab} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgBlack, paddingHorizontal: scale(20) },
  scrollContent: { paddingBottom: verticalScale(120) },

  header: { width: '100%' },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(16),
    paddingTop: verticalScale(4),
  },
  backIcon: { width: scale(30), height: scale(30), resizeMode: 'contain', marginRight: scale(12) },
  headerTitle: { color: '#000', fontSize: moderateScale(22), fontWeight: '700' },

  totalCard: {
    borderRadius: moderateScale(20),
    height: verticalScale(120),
    padding: scale(10),
    marginTop: verticalScale(22),
    overflow: 'hidden',
    justifyContent: 'center',
  },
  earningCardBg: { position: 'absolute', width: '110%', height: '120%', top: 0, right: 0, resizeMode: 'cover' },

  tabRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.borderTeal,
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    marginTop: verticalScale(22),
  },
  tabButton: {
    flex: 1,
    paddingVertical: verticalScale(5),
    alignItems: 'center',
    backgroundColor: Colors.bgBlack,
  },
  activeTab: { backgroundColor: Colors.teal },

  earningCard: {
    borderWidth: 1,
    borderColor: Colors.borderTeal,
    borderRadius: moderateScale(14),
    padding: scale(18),
    marginTop: verticalScale(15),
  },
  companyRow: { flexDirection: 'row', alignItems: 'center' },
  companyLogo: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    resizeMode: 'contain',
    backgroundColor: '#FFF',
  },
  companyInfo: { marginLeft: scale(14), flex: 1 },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(18),
    alignItems: 'center',
  },
  receivedRow: { flexDirection: 'row', alignItems: 'center' },
});

export default MyEarnings;
