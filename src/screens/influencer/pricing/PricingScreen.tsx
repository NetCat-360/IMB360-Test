// src/screens/pricing/PricingScreen.tsx
import React, { useState, useCallback } from 'react';
import {
  View, Text, Image, Pressable,
  StatusBar, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../config/theme';
import { AppNavigationProp } from '../../../types/navigation';
import { tabStyles, pcStyles, emptyStyles, styles } from './styles';

type Props = { navigation: AppNavigationProp<'Pricing'> };

type FilterKey = 'all' | 'instagram' | 'youtube' | 'facebook' | 'twitter';

const FILTER_TABS: { key: FilterKey; icon?: any; label?: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'instagram', icon: require('../../../assets/images/Instagram.png') },
  { key: 'youtube',   icon: require('../../../assets/images/youtube.png') },
  { key: 'facebook',  icon: require('../../../assets/images/facebook.png') },
  { key: 'twitter',   icon: require('../../../assets/images/Twitter.png') },
];

const FilterTab = ({
  label, active, onPress, icon,
}: { label?: string; active: boolean; onPress: () => void; icon?: any }) => (
  <Pressable
    onPress={onPress}
    style={[tabStyles.tab, active && tabStyles.activeTab]}
  >
    {icon ? (
      <Image source={icon} style={tabStyles.tabIcon} resizeMode="contain" />
    ) : (
      <Text style={[tabStyles.label, active && tabStyles.activeLabel]}>{label}</Text>
    )}
  </Pressable>
);

// ── Pricing card ──────────────────────────────────────────────────────────────

type PricingItem = {
  id: string;
  platform: FilterKey;
  dedicatedVideo?: string;
  integratedVideo?: string;
  youtubeShorts?: string;
  instagramReel?: string;
  instagramStory?: string;
  communityPost?: string;
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
    { label: 'Dedicated Video', value: item.dedicatedVideo },
    { label: 'Integrated Video', value: item.integratedVideo },
    { label: 'Youtube Shorts', value: item.youtubeShorts },
    { label: 'Instagram Reel', value: item.instagramReel },
    { label: 'Instagram Story', value: item.instagramStory },
    { label: 'Community Post', value: item.communityPost },
  ].filter(r => r.value);

  return (
    <View style={pcStyles.card}>
      <View style={pcStyles.cardHeader}>
        {icon && <Image source={icon} style={pcStyles.platformIcon} resizeMode="contain" />}
        <Text style={pcStyles.platformName}>{item.platform.toUpperCase()}</Text>
        <View style={pcStyles.cardActions}>
          <Pressable style={pcStyles.editBtn} onPress={onEdit}>
            <Text style={pcStyles.editBtnText}>Edit</Text>
          </Pressable>
          <Pressable style={pcStyles.deleteBtn} onPress={onDelete}>
            <Text style={pcStyles.deleteBtnText}>✕</Text>
          </Pressable>
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

// ── Empty state ───────────────────────────────────────────────────────────────

const EmptyState = ({ onAdd }: { onAdd: () => void }) => (
  <View style={emptyStyles.container}>
    <Text style={emptyStyles.icon}>💰</Text>
    <Text style={emptyStyles.title}>No pricing set yet</Text>
    <Text style={emptyStyles.subtitle}>
      Set your collaboration rates so brands know what to expect.
    </Text>
    <Pressable style={emptyStyles.addBtn} onPress={onAdd}>
      <Text style={emptyStyles.addBtnText}>+ Add Pricing</Text>
    </Pressable>
  </View>
);

// ── Screen Component ──────────────────────────────────────────────────────────

const PricingScreen = ({ navigation }: Props) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  
  // Clean initialization with no local mock elements
  const [pricing, setPricing] = useState<PricingItem[]>([]);

  const filtered = activeFilter === 'all'
    ? pricing
    : pricing.filter(item => item.platform === activeFilter);

  const isEmpty = filtered.length === 0;

  const handleClearCard = useCallback((id: string) => {
    setPricing(prev => prev.filter(element => element.id !== id));
  }, []);

  const renderPricingItem = useCallback(({ item }: { item: PricingItem }) => (
    <PricingCard
      item={item}
      onEdit={() => navigation.navigate('EditPricing', { pricingId: item.id })}
      onDelete={() => handleClearCard(item.id)}
    />
  ), [navigation, handleClearCard]);

  const handleFilterPress = useCallback((key: FilterKey) => {
    setActiveFilter(key);
  }, []);

  const renderFilterTabItem = useCallback(({ item }: { item: typeof FILTER_TABS[0] }) => (
    <FilterTab
      label={item.label}
      icon={item.icon}
      active={activeFilter === item.key}
      onPress={() => handleFilterPress(item.key)}
    />
  ), [activeFilter, handleFilterPress]);

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
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Pricing</Text>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.filterContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScrollView}
            contentContainerStyle={styles.filterStrip}
            data={FILTER_TABS}
            keyExtractor={(item) => item.key}
            renderItem={renderFilterTabItem}
          />
        </View>

        {isEmpty ? (
          <View style={styles.emptyWrapper}>
            <EmptyState onAdd={() => navigation.navigate('AddPricing')} />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            data={filtered}
            keyExtractor={item => item.id}
            renderItem={renderPricingItem}
          />
        )}
      </View>
    </>
  );
};

export default PricingScreen;