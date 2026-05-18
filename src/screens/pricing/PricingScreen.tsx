import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  ScrollView, StatusBar, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { AppNavigationProp } from '../../types/navigation';

type Props = {
  navigation: AppNavigationProp<'Pricing'>;
};

type FilterKey = 'all' | 'instagram' | 'youtube' | 'facebook' | 'twitter';

// Each pricing tier row
const PricingRow = ({
  title,
  description,
  price,
  iconEmoji,
  accentColor,
}: {
  title: string;
  description: string;
  price: string;
  iconEmoji: string;
  accentColor: string;
}) => (
  <View style={rowStyles.row}>
    <View style={rowStyles.textBlock}>
      <Text style={rowStyles.title}>{title}</Text>
      <Text style={rowStyles.description}>{description}</Text>
    </View>
    <View style={rowStyles.right}>
      <Text style={[rowStyles.price, { color: accentColor }]}>{price}</Text>
      <View style={[rowStyles.iconCircle, { borderColor: accentColor + '66' }]}>
        <Text style={{ fontSize: moderateScale(16) }}>{iconEmoji}</Text>
      </View>
    </View>
  </View>
);

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#1C1C1E',
    borderStyle: 'dashed',
  },
  textBlock: {
    flex: 1,
    paddingRight: scale(12),
  },
  title: {
    color: '#ffffff',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    marginBottom: verticalScale(4),
  },
  description: {
    color: '#666666',
    fontSize: moderateScale(11),
    lineHeight: verticalScale(16),
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  price: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  iconCircle: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111111',
  },
});

// Filter tab (same pattern as ContentScreen)
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
  activeTab: { backgroundColor: '#00b9c0' },
  label: { color: '#888888', fontSize: moderateScale(13), fontWeight: '600' },
  activeLabel: { color: '#000000' },
  tabIcon: { width: scale(18), height: scale(18) },
});

const PricingScreen = ({ navigation }: Props) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

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
          <Text style={styles.headerTitle}>Pricing</Text>
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

        {/* ── Rates card ────────────────────────── */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.ratesCard}>

            {/* Teal bordered header label matching the design */}
            <View style={styles.ratesCardHeader}>
              <Text style={styles.ratesCardHeaderText}>COLLABORATION RATES</Text>
            </View>

            <PricingRow
              title="STORY"
              description="Quick promotional stories with audience engagement and swipe-up interactions."
              price="₱ 1200"
              iconEmoji="📋"
              accentColor="#b6d82c"
            />
            <PricingRow
              title="POST"
              description="High-quality feed post with branded content and product promotion."
              price="₱ 1200"
              iconEmoji="🖼️"
              accentColor="#b6d82c"
            />
            <PricingRow
              title="SHORT VIDEO"
              description="Short-form engaging video content optimized for reach and engagement."
              price="₱ 1200"
              iconEmoji="🎬"
              accentColor="#b6d82c"
            />
            <PricingRow
              title="LONG VIDEO"
              description="Detailed promotional video with product explanation and audience targeting."
              price="₱ 1200"
              iconEmoji="📹"
              accentColor="#b6d82c"
            />
            <PricingRow
              title="MEETUP"
              description="Offline collaboration, event participation, or meet & greet sessions."
              price="₱ 1200"
              iconEmoji="🤝"
              accentColor="#b6d82c"
            />
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
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(32),
  },
  ratesCard: {
    backgroundColor: '#0D0D0D',
    borderRadius: moderateScale(12),
    borderWidth: 1.5,
    borderColor: '#00b9c0',
    overflow: 'hidden',
  },
  ratesCardHeader: {
    backgroundColor: '#0D1A1A',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#00b9c044',
  },
  ratesCardHeaderText: {
    color: '#00b9c0',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  // Pricing rows sit inside the card with side padding
  // (PricingRow itself handles its own padding and borders)
});

// Wrap PricingRow usage in a padded container inside the card
// by adjusting the card's own padding
Object.assign(styles, {
  ratesCard: {
    ...styles.ratesCard,
    paddingHorizontal: scale(14),
  },
});

export default PricingScreen;