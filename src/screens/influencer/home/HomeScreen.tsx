// src/screens/home/HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../../types/navigation';
import { useAppSelector } from '../../../hooks/redux';
import { verticalScale } from '../../../utils/scaling';
import { Colors } from '../../../config/theme';
import Typography from '../../../styles/typography';
import styles from './styles';
import AppHeader from '../../../components/AppHeader';

type HomeNavProp = NativeStackNavigationProp<AppStackParamList, 'Home'>;

// ── StatItem ──────────────────────────────────────────────────────────────────
function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={Typography.statNumber}>{number}</Text>
      <Text style={Typography.statLabel}>{label}</Text>
    </View>
  );
}

// ── MenuItem ──────────────────────────────────────────────────────────────────
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
    <Pressable
      style={styles.menuCard}
      onPress={onPress}
    >
      {icon && (
        <Image
          source={icon}
          style={styles.menuIcon}
          resizeMode="contain"
        />
      )}

      <Text style={styles.menuText}>{title}</Text>

      <Image
        source={require('../../../assets/images/rightarrow.png')}
        style={styles.arrowIcon}
        resizeMode="contain"
      />
    </Pressable>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();
  const user = useAppSelector(state => state.auth.user);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgBlack} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image
          source={require('../../../assets/images/IMB360_v2.png')}
          style={styles.topBarLogo}
          resizeMode="contain"
        />
        <View style={styles.topBarActions}>
          <Pressable style={styles.topBarIcon} onPress={() => navigation.navigate('Chat')}>
            <Text style={styles.topBarIconText}>💬</Text>
          </Pressable>
          <Pressable
            style={styles.topBarIcon}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.topBarIconText}>⚙️</Text>
          </Pressable>
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
          <View style={{ flex: 1 }}>
            <Text style={Typography.h2}>{user?.name || 'User'}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={[Typography.label, { color: Colors.textMuted }]}>
                @{user?.username || 'user'}
              </Text>
              {user?.role && (
                <View style={{ backgroundColor: '#b6d82c', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 }}>
                  <Text style={{ color: '#000', fontSize: 12, fontWeight: 'bold' }}>{user.role}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.bioContainer}>
          <Text style={Typography.body}>Digital creator | Fashion & Lifestyle</Text>
          <Text style={Typography.body}>Helping brands grow 🚀</Text>
          <Pressable>
            <Text style={[Typography.body, { color: Colors.teal, marginTop: verticalScale(4) }]}>
              Add website 🔗
            </Text>
          </Pressable>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <Pressable style={styles.actionButton}
          onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.actionText}>Edit Profile</Text>
          </Pressable>

          <Pressable style={styles.actionButton}>
            <Image
              source={require('../../../assets/images/pointslogo.png')}
              style={styles.pointsIcon}
            />
            <Text style={styles.actionText}>Points</Text>
          </Pressable>

          <Pressable style={styles.actionButton}
          onPress={() => navigation.navigate('AddAssets')}>
            <Text style={styles.actionText}>Add Assets</Text>
          </Pressable>
        </View>

        {/* Info Row */}
        <View style={styles.infoRow}>
          <Text style={Typography.caption}>📅 Joined December 2025</Text>
          <Text style={Typography.caption}>📍 Delhi, India</Text>
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
          icon={require('../../../assets/images/overviewlogo.png')}
          onPress={() => navigation.navigate('Overview')}
        />
        <MenuItem
          title="Content"
          icon={require('../../../assets/images/contentlogo.png')}
          onPress={() => navigation.navigate('Content')}
        />
        <MenuItem
          title="Pricing"
          icon={require('../../../assets/images/pricinglogo.png')}
          onPress={() => navigation.navigate('Pricing')}
        />
        <MenuItem
          title="Campaign Queue"
          icon={require('../../../assets/images/campaignqueue.png')}
          onPress={() => navigation.navigate('CampaignQueue')}
        />
        <MenuItem
          title="My Earnings"
          icon={require('../../../assets/images/earninglogo.png')}
          onPress={() => navigation.navigate('MyEarnings')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}