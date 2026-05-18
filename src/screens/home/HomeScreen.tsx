import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
  ScrollView, StatusBar, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { AppNavigationProp } from '../../types/navigation';

type Props = {
  navigation: AppNavigationProp<'Home'>;
};

// Each row in the navigation menu list
const MenuRow = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={menuStyles.row} onPress={onPress} activeOpacity={0.7}>
    <Text style={menuStyles.label}>{label}</Text>
    <Text style={menuStyles.arrow}>›</Text>
  </TouchableOpacity>
);

const menuStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#1C1C1E',
  },
  label: {
    color: '#ffffff',
    fontSize: moderateScale(15),
    fontWeight: '500',
  },
  arrow: {
    color: '#666666',
    fontSize: moderateScale(20),
  },
});

// A single stat block used in the stats row
const StatBlock = ({ value, label }: { value: string; label: string }) => (
  <View style={styles.statBlock}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const HomeScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* ── Top bar ─────────────────────────────── */}
      <View style={styles.topBar}>
        <Image
          source={require('../../assets/images/IMB360_v2.png')}
          style={styles.topBarLogo}
          resizeMode="contain"
        />
        <View style={styles.topBarActions}>
          <TouchableOpacity style={styles.topBarIcon}>
            {/* Message / notification icon placeholder */}
            <Text style={styles.topBarIconText}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topBarIcon}>
            <Text style={styles.topBarIconText}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* ── Cover banner ────────────────────────── */}
        <View style={styles.coverBanner}>
          <LinearGradient
            colors={['#1a1a1a', '#2a2a2a']}
            style={styles.coverGradient}
          />
        </View>

        {/* ── Avatar + name block ──────────────────── */}
        <View style={styles.profileBlock}>
          <View style={styles.avatarWrapper}>
            {/* Teal gradient ring around avatar matching the design */}
            <LinearGradient
              colors={['#00b9c0', '#b6d82c']}
              style={styles.avatarRing}
            >
              <View style={styles.avatarInner}>
                <Text style={styles.avatarEmoji}>👤</Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.nameBlock}>
            <Text style={styles.displayName}>Sudiksha</Text>
            <Text style={styles.handle}>@sudiksha0202</Text>
          </View>
        </View>

        {/* ── Bio ──────────────────────────────────── */}
        <View style={styles.bioBlock}>
          <Text style={styles.bioText}>
            Digital creator | Fashion &amp; Lifestyle{'\n'}
            Helping brands grow 🚀
          </Text>
          <TouchableOpacity>
            <Text style={styles.addWebsite}>Add website 🔗</Text>
          </TouchableOpacity>
        </View>

        {/* ── Action buttons ───────────────────────── */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.pointsButton}>
            <LinearGradient
              colors={['#00b9c0', '#b6d82c']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.pointsGradient}
            >
              <Text style={styles.pointsText}>⚡ Points</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addAssetsButton}>
            <Text style={styles.addAssetsText}>+ Add Assets</Text>
          </TouchableOpacity>
        </View>

        {/* ── Joined / location ────────────────────── */}
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>🗓 Joined December 2025</Text>
          <Text style={styles.metaText}>  📍 Delhi, India</Text>
        </View>

        {/* ── Stats row ────────────────────────────── */}
        <View style={styles.statsRow}>
          <StatBlock value="10"    label="Following" />
          <View style={styles.statDivider} />
          <StatBlock value="3.76K" label="Followers" />
          <View style={styles.statDivider} />
          <StatBlock value="65.4%" label="Engagement" />
          <View style={styles.statDivider} />
          <StatBlock value="4"     label="Rating" />
        </View>

        {/* ── Navigation menu list ─────────────────── */}
        <View style={styles.menuCard}>
          <MenuRow label="Overview"       onPress={() => navigation.navigate('Overview')} />
          <MenuRow label="Content"        onPress={() => navigation.navigate('Content')} />
          <MenuRow label="Pricing"        onPress={() => navigation.navigate('Pricing')} />
          <MenuRow label="Campaign Queue" onPress={() => {}} />
          <MenuRow label="My Earnings"    onPress={() => {}} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingBottom: verticalScale(32),
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#1C1C1E',
  },
  topBarLogo: {
    width: scale(100),
    height: verticalScale(28),
  },
  topBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarIcon: {
    marginLeft: scale(16),
  },
  topBarIconText: {
    fontSize: moderateScale(20),
  },

  // Cover
  coverBanner: {
    width: '100%',
    height: verticalScale(110),
    backgroundColor: '#1a1a1a',
    overflow: 'hidden',
  },
  coverGradient: {
    flex: 1,
  },

  // Profile block
  profileBlock: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: scale(16),
    marginTop: verticalScale(-28),
  },
  avatarWrapper: {
    marginRight: scale(14),
  },
  avatarRing: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: scale(34),
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: moderateScale(32),
  },
  nameBlock: {
    paddingBottom: verticalScale(4),
  },
  displayName: {
    color: '#ffffff',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  handle: {
    color: '#888888',
    fontSize: moderateScale(13),
    marginTop: verticalScale(2),
  },

  // Bio
  bioBlock: {
    paddingHorizontal: scale(16),
    marginTop: verticalScale(10),
  },
  bioText: {
    color: '#cccccc',
    fontSize: moderateScale(13),
    lineHeight: verticalScale(20),
  },
  addWebsite: {
    color: '#00b9c0',
    fontSize: moderateScale(13),
    marginTop: verticalScale(4),
  },

  // Action buttons
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    marginTop: verticalScale(14),
    gap: scale(8),
  },
  editButton: {
    flex: 1,
    height: verticalScale(36),
    borderRadius: moderateScale(18),
    borderWidth: 1,
    borderColor: '#00b9c0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#00b9c0',
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
  pointsButton: {
    flex: 1,
    height: verticalScale(36),
    borderRadius: moderateScale(18),
    overflow: 'hidden',
  },
  pointsGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsText: {
    color: '#000000',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  addAssetsButton: {
    flex: 1,
    height: verticalScale(36),
    borderRadius: moderateScale(18),
    borderWidth: 1,
    borderColor: '#b6d82c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAssetsText: {
    color: '#b6d82c',
    fontSize: moderateScale(12),
    fontWeight: '600',
  },

  // Meta
  metaRow: {
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    marginTop: verticalScale(12),
  },
  metaText: {
    color: '#666666',
    fontSize: moderateScale(12),
    marginRight: scale(16),
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: scale(16),
    marginTop: verticalScale(16),
    backgroundColor: '#0D0D0D',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#1C1C1E',
    paddingVertical: verticalScale(14),
  },
  statBlock: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#ffffff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#666666',
    fontSize: moderateScale(10),
    marginTop: verticalScale(3),
  },
  statDivider: {
    width: 1,
    backgroundColor: '#1C1C1E',
    marginVertical: verticalScale(4),
  },

  // Menu
  menuCard: {
    marginHorizontal: scale(16),
    marginTop: verticalScale(20),
    backgroundColor: '#0D0D0D',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#1C1C1E',
    overflow: 'hidden',
  },
});

export default HomeScreen;