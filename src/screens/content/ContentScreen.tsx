import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  ScrollView, StatusBar, StyleSheet, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { AppNavigationProp } from '../../types/navigation';

type Props = {
  navigation: AppNavigationProp<'Content'>;
};

// Filter tab strip — "All", then one per platform
const FilterTab = ({
  label,
  active,
  onPress,
  isIcon,
  icon,
}: {
  label?: string;
  active: boolean;
  onPress: () => void;
  isIcon?: boolean;
  icon?: any;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[tabStyles.tab, active && tabStyles.activeTab]}
    activeOpacity={0.8}
  >
    {isIcon && icon ? (
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
  activeTab: {
    backgroundColor: '#00b9c0',
  },
  tabLabel: {
    color: '#888888',
    fontSize: moderateScale(13),
    fontWeight: '600',
  },
  activeLabel: {
    color: '#000000',
  },
  tabIcon: {
    width: scale(18),
    height: scale(18),
  },
});

// A single content card (thumbnail + platform badge + VIEW button)
const ContentCard = ({
  platform,
  platformIcon,
  platformColor,
}: {
  platform: string;
  platformIcon: any;
  platformColor: string;
}) => (
  <View style={contentCardStyles.card}>
    {/* Thumbnail placeholder — swap for real Image when you have URLs */}
    <View style={contentCardStyles.thumbnail}>
      <Text style={contentCardStyles.thumbnailText}>🎬</Text>
    </View>
    <View style={[contentCardStyles.footer, { borderTopColor: platformColor + '55' }]}>
      <Image source={platformIcon} style={contentCardStyles.footerIcon} resizeMode="contain" />
      <TouchableOpacity style={[contentCardStyles.viewBtn, { borderColor: platformColor }]}>
        <Text style={[contentCardStyles.viewBtnText, { color: platformColor }]}>VIEW</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const contentCardStyles = StyleSheet.create({
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
  thumbnailText: {
    fontSize: moderateScale(28),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(6),
    borderTopWidth: 1,
  },
  footerIcon: {
    width: scale(16),
    height: scale(16),
  },
  viewBtn: {
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
  },
  viewBtnText: {
    fontSize: moderateScale(9),
    fontWeight: 'bold',
  },
});

type FilterKey = 'all' | 'instagram' | 'youtube' | 'facebook' | 'twitter';

const ContentScreen = ({ navigation }: Props) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  // Represents the content items. In production these come from your API.
  const allContent = [
    { id: '1', platform: 'instagram', platformIcon: require('../../assets/images/Instagram.png'), color: '#E1306C' },
    { id: '2', platform: 'youtube',   platformIcon: require('../../assets/images/youtube.png'),   color: '#FF0000' },
    { id: '3', platform: 'facebook',  platformIcon: require('../../assets/images/facebook.png'),  color: '#1877F2' },
    { id: '4', platform: 'instagram', platformIcon: require('../../assets/images/Instagram.png'), color: '#E1306C' },
    { id: '5', platform: 'youtube',   platformIcon: require('../../assets/images/youtube.png'),   color: '#FF0000' },
    { id: '6', platform: 'twitter',   platformIcon: require('../../assets/images/Twitter.png'),   color: '#1DA1F2' },
  ];

  const filtered = activeFilter === 'all'
    ? allContent
    : allContent.filter((item) => item.platform === activeFilter);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <LinearGradient
        colors={['#00b9c0', '#b6d82c']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <SafeAreaView edges={['top']} style={styles.headerInner}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Content</Text>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.body}>
        {/* ── Filter strip ──────────────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterStrip}
        >
          <FilterTab label="All" active={activeFilter === 'all'} onPress={() => setActiveFilter('all')} />
          <FilterTab isIcon icon={require('../../assets/images/Instagram.png')} active={activeFilter === 'instagram'} onPress={() => setActiveFilter('instagram')} />
          <FilterTab isIcon icon={require('../../assets/images/youtube.png')}   active={activeFilter === 'youtube'}   onPress={() => setActiveFilter('youtube')} />
          <FilterTab isIcon icon={require('../../assets/images/facebook.png')}  active={activeFilter === 'facebook'}  onPress={() => setActiveFilter('facebook')} />
          <FilterTab isIcon icon={require('../../assets/images/Twitter.png')}   active={activeFilter === 'twitter'}   onPress={() => setActiveFilter('twitter')} />
        </ScrollView>

        {/* ── Content grid ──────────────────────── */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
          <View style={styles.gridRow}>
            {filtered.map((item) => (
              <ContentCard
                key={item.id}
                platform={item.platform}
                platformIcon={item.platformIcon}
                platformColor={item.color}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
  },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(14),
    paddingTop: verticalScale(4),
  },
  backBtn: {
    marginRight: scale(12),
    padding: scale(4),
  },
  backBtnText: {
    color: '#000000',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#000000',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    backgroundColor: '#000000',
  },
  filterStrip: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    alignItems: 'center',
  },
  grid: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(32),
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default ContentScreen;