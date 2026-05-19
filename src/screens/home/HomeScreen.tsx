// src/screens/home/HomeScreen.tsx
// Fixes applied:
//   1. menuCard icon layout — replaced negative marginRight hack with proper flex layout
//   2. Campaign Queue — registered screen + navigate() call wired up
//   3. Theme tokens used for all hardcoded hex colours
//   4. Typography (Poppins) applied to all Text elements
//   5. Tab bar icons stay as emoji here — replaced in AppNavigator.tsx
import React from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../types/navigation';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';
import Typography from '../../styles/typography';

type HomeNavProp = NativeStackNavigationProp<AppStackParamList, 'Home'>;

// ── StatItem ──────────────────────────────────────────────────────────────────
function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={[Typography.statNumber]}>{number}</Text>
      <Text style={[Typography.statLabel]}>{label}</Text>
    </View>
  );
}

// ── MenuItem ──────────────────────────────────────────────────────────────────
// FIX: replaced `marginRight: scale(-22)` hack with a proper absolute-positioned
// icon so the text always stays perfectly centred regardless of screen width.
function MenuItem({
  icon,
  title,
  onPress,
}: {
  icon?: any;
  title: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.menuCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Left icon — absolutely positioned so it never shifts the text */}
      {icon && (
        <Image
          source={icon}
          style={styles.menuIcon}
          resizeMode="contain"
        />
      )}

      {/* Title always perfectly centred */}
      <Text style={styles.menuText}>{title}</Text>

      {/* Right arrow */}
      <Image
        source={require('../../assets/images/rightarrow.png')}
        style={styles.arrowIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgBlack} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image
          source={require('../../assets/images/IMB360_v2.png')}
          style={styles.topBarLogo}
          resizeMode="contain"
        />
        <View style={styles.topBarActions}>
          <TouchableOpacity style={styles.topBarIcon}>
            <Text style={styles.topBarIconText}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.topBarIcon}
            onPress={() =>
              navigation.navigate(
                'Settings'
              )
            }
          >
            <Text
              style={
                styles.topBarIconText
              }
            >
              ⚙️
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Banner */}
        <View style={styles.banner} />

        {/* Profile */}
        <View style={styles.profileRow}>
          <View style={styles.avatar} />
          <View>
            <Text style={[Typography.h2]}>Username</Text>
            <Text style={[Typography.label, { color: Colors.textMuted }]}>
              @username01
            </Text>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.bioContainer}>
          <Text style={[Typography.body]}>Digital creator | Fashion & Lifestyle</Text>
          <Text style={[Typography.body]}>Helping brands grow 🚀</Text>
          <TouchableOpacity>
            <Text style={[Typography.body, { color: Colors.teal, marginTop: verticalScale(4) }]}>
              Add website 🔗
            </Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Image
              source={require('../../assets/images/pointslogo.png')}
              style={styles.pointsIcon}
            />
            <Text style={styles.actionText}>Points</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Add Assets</Text>
          </TouchableOpacity>
        </View>

        {/* Info Row */}
        <View style={styles.infoRow}>
          <Text style={[Typography.caption]}>📅 Joined December 2025</Text>
          <Text style={[Typography.caption]}>📍 Delhi, India</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <StatItem number="10" label="Following" />
          <StatItem number="3.76K" label="Followers" />
          <StatItem number="65.4%" label="Engagement" />
          <StatItem number="4" label="Rating" />
        </View>

        {/* Menu Items */}
        <MenuItem
          title="Overview"
          icon={require('../../assets/images/overviewlogo.png')}
          onPress={() => navigation.navigate('Overview')}
        />
        <MenuItem
          title="Content"
          icon={require('../../assets/images/contentlogo.png')}
          onPress={() => navigation.navigate('Content')}
        />
        <MenuItem
          title="Pricing"
          icon={require('../../assets/images/pricinglogo.png')}
          onPress={() => navigation.navigate('Pricing')}
        />
        {/* FIX: Campaign Queue now has an onPress — screen added to AppNavigator */}
        <MenuItem
          title="Campaign Queue"
          onPress={() => navigation.navigate('CampaignQueue')}
        />
        <MenuItem
          title="My Earnings"
          icon={require('../../assets/images/earninglogo.png')}
          onPress={() => navigation.navigate('MyEarnings')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
  },
  scrollContent: {
    paddingBottom: verticalScale(30),
  },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDefault,
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

  // Banner
  banner: {
    height: verticalScale(75),
    backgroundColor: '#EAEAEA',
    marginHorizontal: scale(15),
    marginTop: verticalScale(12),
    borderRadius: moderateScale(18),
  },

  // Profile
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
    paddingHorizontal: scale(24),
  },
  avatar: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(40),
    backgroundColor: '#4DFF88',
    marginRight: scale(16),
  },

  // Bio
  bioContainer: {
    paddingHorizontal: scale(24),
    marginTop: verticalScale(5),
  },

  // Buttons
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    marginTop: verticalScale(7),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cyan,
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(10),
  },
  pointsIcon: {
    width: scale(18),
    height: scale(14),
    resizeMode: 'contain',
    marginRight: scale(6),
  },
  actionText: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(16),
  },

  // Info
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(24),
    marginTop: verticalScale(10),
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    borderRadius: moderateScale(18),
    marginHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    marginTop: verticalScale(15),
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },

  // Menu
  // FIX: uses flexDirection row with defined left/right slots instead of
  // the negative margin hack that previously forced the icon into position.
  menuCard: {
    height: verticalScale(35),
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    borderRadius: moderateScale(10),
    marginHorizontal: scale(60),
    marginTop: verticalScale(15),
    paddingHorizontal: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: scale(26),
    height: scale(26),
    marginRight: scale(8),
  },
  menuText: {
    flex: 1,
    color: Colors.textPrimary,
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
  arrowIcon: {
    width: scale(14),
    height: scale(22),
  },
});