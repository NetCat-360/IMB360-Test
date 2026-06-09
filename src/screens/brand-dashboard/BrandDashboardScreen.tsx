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
import { BrandStackParamList } from '../../types/navigation';
import { useAppSelector } from '../../hooks/redux';
import { Colors } from '../../config/theme';
import Typography from '../../styles/typography';
import styles from './styles';

type BrandNavProp = NativeStackNavigationProp<BrandStackParamList, 'BrandMainTabs'>;

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={Typography.statNumber}>{number}</Text>
      <Text style={Typography.statLabel}>{label}</Text>
    </View>
  );
}

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
    <Pressable style={styles.menuCard} onPress={onPress}>
      {icon && (
        <Image source={icon} style={styles.menuIcon} resizeMode="contain" />
      )}
      <Text style={styles.menuText}>{title}</Text>
      <Image
        source={require('../../assets/images/rightarrow.png')}
        style={styles.arrowIcon}
        resizeMode="contain"
      />
    </Pressable>
  );
}

export default function BrandDashboardScreen() {
  const navigation = useNavigation<BrandNavProp>();
  const user = useAppSelector(state => state.auth.user);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgBlack} />

      <View style={styles.topBar}>
        <Image
          source={require('../../assets/images/IMB360_v2.png')}
          style={styles.topBarLogo}
          resizeMode="contain"
        />
        <View style={styles.topBarActions}>
          <Pressable style={styles.topBarIcon}>
            <Text style={styles.topBarIconText}>🔔</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome back,{'\n'}
            <Text style={styles.welcomeName}>{user?.name || 'Brand'}</Text>
          </Text>
          <Text style={styles.roleBadge}>BRAND</Text>
        </View>

        <View style={styles.statsRow}>
          <StatItem number="4" label="Active Campaigns" />
          <StatItem number="12" label="Total Creators" />
          <StatItem number="₱45K" label="Total Spend" />
          <StatItem number="4.8" label="Avg Rating" />
        </View>

        <Text style={[Typography.h2, styles.sectionTitle]}>Quick Actions</Text>

        <MenuItem
          title="Create Campaign"
          onPress={() => navigation.navigate('Campaign')}
        />
        <MenuItem
          title="Find Creators"
          onPress={() => navigation.navigate('Explore')}
        />
        <MenuItem
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
