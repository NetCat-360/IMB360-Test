// src/screens/content/ContentScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  ScrollView, StatusBar, StyleSheet, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';
import { AppNavigationProp } from '../../types/navigation';

type Props = { navigation: AppNavigationProp<'Content'> };

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
      <Text style={[tabStyles.tabLabel, active && tabStyles.activeLabel]}>{label}</Text>
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
  tabLabel: { color: '#888888', fontSize: moderateScale(13), fontWeight: '600' },
  activeLabel: { color: '#000000' },
  tabIcon: { width: scale(18), height: scale(18) },
});

// ── Content card (real item) ──────────────────────────────────────────────────

type ContentItem = {
  id: string;
  platform: FilterKey;
  platformIcon: any;
  color: string;
  contentUrl?: string;
};

const ContentCard = ({
  item,
  onEdit,
  onDelete,
}: {
  item: ContentItem;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <View style={cardStyles.card}>
    <View style={cardStyles.thumbnail}>
      <Text style={cardStyles.thumbnailText}>🎬</Text>
      {/* Delete button */}
      <TouchableOpacity style={cardStyles.deleteBtn} onPress={onDelete} activeOpacity={0.7}>
        <Text style={cardStyles.deleteBtnText}>✕</Text>
      </TouchableOpacity>
    </View>
    <View style={[cardStyles.footer, { borderTopColor: item.color + '55' }]}>
      <Image source={item.platformIcon} style={cardStyles.footerIcon} resizeMode="contain" />
      <TouchableOpacity style={[cardStyles.viewBtn, { borderColor: item.color }]} onPress={onEdit}>
        <Text style={[cardStyles.viewBtnText, { color: item.color }]}>EDIT</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const cardStyles = StyleSheet.create({
  card: {
    width: '31%',
    backgroundColor: '#0D0D0D',
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1C1C1E',
    marginBottom: verticalScale(12),
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 0.75,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailText: { fontSize: moderateScale(28) },
  deleteBtn: {
    position: 'absolute',
    top: scale(4),
    right: scale(4),
    backgroundColor: Colors.error,
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnText: { color: '#fff', fontSize: moderateScale(9), fontWeight: 'bold' },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(6),
    borderTopWidth: 1,
  },
  footerIcon: { width: scale(16), height: scale(16) },
  viewBtn: {
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
  },
  viewBtnText: { fontSize: moderateScale(9), fontWeight: 'bold' },
});

// ── Empty state ───────────────────────────────────────────────────────────────

const EmptyState = ({ onAdd }: { onAdd: () => void }) => (
  <View style={emptyStyles.container}>
    <Text style={emptyStyles.icon}>🎬</Text>
    <Text style={emptyStyles.title}>No content yet</Text>
    <Text style={emptyStyles.subtitle}>
      Add your first piece of content to show brands what you can create.
    </Text>
    <TouchableOpacity style={emptyStyles.addBtn} onPress={onAdd} activeOpacity={0.8}>
      <Text style={emptyStyles.addBtnText}>+ Add Content</Text>
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
    color: Colors.textPrimary,
    fontSize: moderateScale(18),
    fontFamily: 'Poppins-SemiBold',
    marginBottom: verticalScale(8),
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: moderateScale(13),
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: verticalScale(20),
    marginBottom: verticalScale(28),
  },
  addBtn: {
    backgroundColor: Colors.teal,
    paddingHorizontal: scale(32),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(12),
  },
  addBtnText: {
    color: '#000',
    fontSize: moderateScale(15),
    fontFamily: 'Poppins-SemiBold',
  },
});

// ── Screen ────────────────────────────────────────────────────────────────────

const ContentScreen = ({ navigation }: Props) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  // Empty array — real data will come from API
  const [content] = useState<ContentItem[]>([]);

  const filtered = activeFilter === 'all'
    ? content
    : content.filter(item => item.platform === activeFilter);

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
          <Text style={styles.headerTitle}>Content</Text>
          {/* Add button in header */}
          <TouchableOpacity
            style={styles.headerAddBtn}
            onPress={() => navigation.navigate('AddContent')}
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

        {/* Content */}
        {isEmpty ? (
          <EmptyState onAdd={() => navigation.navigate('AddContent')} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
            <View style={styles.gridRow}>
              {filtered.map(item => (
                <ContentCard
                  key={item.id}
                  item={item}
                  onEdit={() => navigation.navigate('EditContent', { contentId: item.id })}
                  onDelete={() => {}}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: { width: '100%' },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(14),
    paddingTop: verticalScale(4),
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
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    alignItems: 'center',
  },
  grid: { paddingHorizontal: scale(16), paddingBottom: verticalScale(32) },
  gridRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});

export default ContentScreen;
