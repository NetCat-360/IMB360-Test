// src/screens/pricing/PricingScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  ScrollView, StatusBar, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';
import { AppNavigationProp } from '../../types/navigation';

type Props = { navigation: AppNavigationProp<'Pricing'> };

type FilterKey = 'all' | 'instagram' | 'youtube' | 'facebook' | 'twitter';

const FILTER_TABS: { key: FilterKey; icon?: any; label?: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'instagram', icon: require('../../assets/images/Instagram.png') },
  { key: 'youtube',   icon: require('../../assets/images/youtube.png') },
  { key: 'facebook',  icon: require('../../assets/images/facebook.png') },
  { key: 'twitter',   icon: require('../../assets/images/Twitter.png') },
];

const FilterTab = ({
  label, active, onPress, icon,
}: { label?: string; active: boolean; onPress: () => void; icon?: any }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[tabStyles.tab, active && tabStyles.activeTab]}
    activeOpacity={0.8}
  >
    {icon ? (
      <Image source={icon} style={tabStyles.tabIcon} resizeMode="contain" />
    ) : (
      <Text style={[tabStyles.label, active && tabStyles.activeLabel]}>{label}</Text>
    )}
  </TouchableOpacity>
);

const tabStyles = StyleSheet.create({
  tab: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(20),
    marginRight: scale(6),
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: scale(36),
    height: scale(36),
  },
  activeTab: { backgroundColor: Colors.teal },
  label: { color: '#888888', fontSize: moderateScale(13), fontWeight: '600' },
  activeLabel: { color: '#000000' },
  tabIcon: { width: scale(18), height: scale(18) },
});

// ── Pricing card (real item) ──────────────────────────────────────────────────

type PricingItem = {
  id: string;
  platform: FilterKey;
  reels?: string;
  story?: string;
  post?: string;
  shortVideo?: string;
  longVideo?: string;
  meetup?: string;
};

const PricingCard = ({
  item,
  onEdit,
  onDelete,
}: {
  item: PricingItem;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const icon = FILTER_TABS.find(t => t.key === item.platform)?.icon;
  const rows = [
    { label: 'Reels', value: item.reels },
    { label: 'Story', value: item.story },
    { label: 'Post', value: item.post },
    { label: 'Short Video', value: item.shortVideo },
    { label: 'Long Video', value: item.longVideo },
    { label: 'Meetup / Collab', value: item.meetup },
  ].filter(r => r.value);

  return (
    <View style={pcStyles.card}>
      <View style={pcStyles.cardHeader}>
        {icon && <Image source={icon} style={pcStyles.platformIcon} resizeMode="contain" />}
        <Text style={pcStyles.platformName}>{item.platform.toUpperCase()}</Text>
        <View style={pcStyles.cardActions}>
          <TouchableOpacity style={pcStyles.editBtn} onPress={onEdit}>
            <Text style={pcStyles.editBtnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={pcStyles.deleteBtn} onPress={onDelete}>
            <Text style={pcStyles.deleteBtnText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
      {rows.map(r => (
        <View key={r.label} style={pcStyles.priceRow}>
          <Text style={pcStyles.priceLabel}>{r.label}</Text>
          <Text style={pcStyles.priceValue}>{r.value}</Text>
        </View>
      ))}
    </View>
  );
};

const pcStyles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: moderateScale(12),
    borderWidth: 1.5,
    borderColor: Colors.borderTeal,
    marginBottom: verticalScale(16),
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D1A1A',
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderTeal + '44',
  },
  platformIcon: { width: scale(20), height: scale(20), marginRight: scale(8) },
  platformName: {
    color: Colors.teal,
    fontSize: moderateScale(12),
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
    flex: 1,
  },
  cardActions: { flexDirection: 'row', alignItems: 'center', gap: scale(8) },
  editBtn: {
    borderWidth: 1,
    borderColor: Colors.teal,
    borderRadius: moderateScale(6),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(3),
  },
  editBtnText: { color: Colors.teal, fontSize: moderateScale(11), fontFamily: 'Poppins-Medium' },
  deleteBtn: {
    backgroundColor: Colors.error,
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnText: { color: '#fff', fontSize: moderateScale(10), fontWeight: 'bold' },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDefault,
  },
  priceLabel: { color: Colors.textSecondary, fontSize: moderateScale(13), fontFamily: 'Poppins-Regular' },
  priceValue: { color: Colors.lime, fontSize: moderateScale(13), fontFamily: 'Poppins-SemiBold' },
});

// ── Empty state ───────────────────────────────────────────────────────────────

const EmptyState = ({ onAdd }: { onAdd: () => void }) => (
  <View style={emptyStyles.container}>
    <Text style={emptyStyles.icon}>💰</Text>
    <Text style={emptyStyles.title}>No pricing set yet</Text>
    <Text style={emptyStyles.subtitle}>
      Set your collaboration rates so brands know what to expect.
    </Text>
    <TouchableOpacity style={emptyStyles.addBtn} onPress={onAdd} activeOpacity={0.8}>
      <Text style={emptyStyles.addBtnText}>+ Add Pricing</Text>
    </TouchableOpacity>
  </View>
);

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(40),
    paddingTop: verticalScale(60),
  },
  icon: { fontSize: moderateScale(52), marginBottom: verticalScale(16) },
  title: {
    color: Colors.textPrimary, fontSize: moderateScale(18),
    fontFamily: 'Poppins-SemiBold', marginBottom: verticalScale(8),
  },
  subtitle: {
    color: Colors.textMuted, fontSize: moderateScale(13),
    fontFamily: 'Poppins-Regular', textAlign: 'center',
    lineHeight: verticalScale(20), marginBottom: verticalScale(28),
  },
  addBtn: {
    backgroundColor: Colors.teal,
    paddingHorizontal: scale(32),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(12),
  },
  addBtnText: { color: '#000', fontSize: moderateScale(15), fontFamily: 'Poppins-SemiBold' },
});

// ── Screen ────────────────────────────────────────────────────────────────────

const PricingScreen = ({ navigation }: Props) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  // Empty — real data from API
  const [pricing] = useState<PricingItem[]>([]);

  const filtered = activeFilter === 'all'
    ? pricing
    : pricing.filter(item => item.platform === activeFilter);

  const isEmpty = filtered.length === 0;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <LinearGradient
        colors={[Colors.teal, Colors.lime]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <SafeAreaView edges={['top']} style={styles.headerInner}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pricing</Text>
          <TouchableOpacity
            style={styles.headerAddBtn}
            onPress={() => navigation.navigate('AddPricing')}
            activeOpacity={0.8}
          >
            <Text style={styles.headerAddBtnText}>+ Add</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.body}>
        {/* Filter strip */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterStrip}
        >
          {FILTER_TABS.map(tab => (
            <FilterTab
              key={tab.key}
              label={tab.label}
              icon={tab.icon}
              active={activeFilter === tab.key}
              onPress={() => setActiveFilter(tab.key)}
            />
          ))}
        </ScrollView>

        {isEmpty ? (
          <EmptyState onAdd={() => navigation.navigate('AddPricing')} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {filtered.map(item => (
              <PricingCard
                key={item.id}
                item={item}
                onEdit={() => navigation.navigate('EditPricing', { pricingId: item.id })}
                onDelete={() => {}}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: { width: '100%' },
  headerInner: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: scale(16), paddingBottom: verticalScale(14), paddingTop: verticalScale(4),
  },
  backBtn: { marginRight: scale(12), padding: scale(4) },
  backBtnText: { color: '#000000', fontSize: moderateScale(22), fontWeight: 'bold' },
  headerTitle: { color: '#000000', fontSize: moderateScale(20), fontWeight: 'bold', flex: 1 },
  headerAddBtn: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  headerAddBtnText: { color: '#000', fontSize: moderateScale(13), fontFamily: 'Poppins-SemiBold' },
  body: { flex: 1, backgroundColor: '#000000' },
  filterStrip: {
    paddingHorizontal: scale(16), paddingVertical: verticalScale(12), alignItems: 'center',
  },
  scrollContent: { paddingHorizontal: scale(16), paddingBottom: verticalScale(32) },
});

export default PricingScreen;
