import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  DimensionValue,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';
import { Colors } from '../../../config/theme';
import Typography from '../../../styles/typography';
import styles from './styles';
import AppHeader from '../../../components/AppHeader';

// ==========================================
// Static Mock Data Matrix
// ==========================================

const OVERVIEW_STATS = {
  reach: { value: '1.2M', change: '-12% vs LW', isPositive: false, changeColor: '#08F61C' },
  engagement: { value: '45.8K', change: '+5.4% vs LW', isPositive: true },
  er: { value: '3.82%', change: '-0.2% vs LW', isPositive: false, changeColor: '#FF6C04' },
  spent: { value: '$4.2K', status: 'On budget' },
};

const PLATFORM_DATA = [
  { name: 'Instagram', percentage: '45%', color: Colors.instagram, raw: 0.45 },
  { name: 'YouTube', percentage: '25%', color: Colors.youtube, raw: 0.25 },
  { name: 'Facebook', percentage: '20%', color: Colors.facebook, raw: 0.20 },
];

const AGE_DEMOGRAPHICS: { range: string; pct: string; width: DimensionValue }[] = [
  { range: '18â€“24', pct: '40%', width: '40%' },
  { range: '25â€“34', pct: '35%', width: '35%' },
  { range: '35â€“44', pct: '15%', width: '15%' },
];

const GROWTH_INSIGHTS = [
  { title: 'Engagement Rate Improved', update: '+8.3% this month', icon: 'trendUp' },
  { title: 'Follower Growth', update: '+15.2% growth rate', icon: 'followers' },
  { title: 'Content Shares', update: '+25% virality index', icon: 'share' },
];

const SMART_RECOMMENDATIONS = [
  {
    title: 'Post More Video Content',
    desc: 'Reels are performing 42% better than static posts for your niche this week.',
    icon: 'video',
  },
  {
    title: 'Optimize Posting Times',
    desc: 'Your audience is most active between 7 PM and 9 PM EST on Tuesdays.',
    icon: 'clock',
  },
];

// ==========================================
// Structural Sub-Components
// ==========================================

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  neutralStatus?: string;
  changeColor?: string;
}

function StatCard({ label, value, change, isPositive, neutralStatus, changeColor }: StatCardProps) {
  const changeTextColor = changeColor ?? (isPositive ? Colors.success : Colors.error);
  return (
    <View style={styles.statCard}>
      <Text style={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: 14, lineHeight: 16, letterSpacing: 0.6, color: Colors.textPrimary }}>{label}</Text>
      <Text style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: 24, lineHeight: 32, letterSpacing: 0, color: Colors.success, marginVertical: verticalScale(4) }}>{value}</Text>
        {neutralStatus ? (
          <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 14, lineHeight: 15, letterSpacing: 0, color: Colors.success }}>
            {neutralStatus}
          </Text>
        ) : (
          <Text style={{ fontFamily: 'Inter', fontWeight: '700', fontSize: 14, lineHeight: 15, letterSpacing: 0, color: changeTextColor }}>
            {change}
          </Text>
        )}
    </View>
  );
}

const barHeights = [verticalScale(70), verticalScale(55), verticalScale(85), verticalScale(95), verticalScale(10)];
const dates = ['01 Jun', '08 Jun', '15 Jun', '22 Jun', '29 Jun'];

function PerformanceTrendsSection() {
  return (
    <View style={styles.largeCard}>
      <View style={styles.cardHeaderRow}>
        <Text style={[Typography.h3, styles.textWhite]}>Performance Trends</Text>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: Colors.teal }]} />
          <View style={[styles.legendDot, { backgroundColor: '#FF6B4A', marginLeft: scale(6) }]} />
        </View>
      </View>

      <View style={styles.chartContainer}>
        {barHeights.map((height, idx) => (
          <View key={dates[idx]} style={styles.chartColumn}>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { height }]} />
            </View>
            <Text style={[Typography.caption, styles.chartAxisLabel]}>{dates[idx]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function PlatformDistributionSection() {
  const size = scale(90);
  const strokeWidth = scale(8);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <View style={styles.largeCard}>
      <Text style={[Typography.h3, styles.textWhite, { marginBottom: verticalScale(15) }]}>
        Platform Distribution
      </Text>
      
      <View style={styles.distributionContent}>
        <View style={styles.donutWrapper}>
          <Svg width={size} height={size}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={Colors.borderStrong || '#2C2C2E'}
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={Colors.teal}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - 0.45)}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </Svg>
          <View style={styles.donutCenterTextContainer}>
            <Text style={[Typography.h2, styles.textWhite, { lineHeight: moderateScale(20) }]}>6</Text>
            <Text style={[Typography.caption, { fontSize: moderateScale(8), color: Colors.textMuted }]}>
              PLATFORMS
            </Text>
          </View>
        </View>

        <View style={styles.legendBlock}>
          {PLATFORM_DATA.map((item, idx) => (
            <View key={item.name} style={styles.platformLegendItem}>
              <View style={styles.platformLabelGroup}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <Text style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 20, letterSpacing: 0, color: Colors.textSecondary, marginLeft: scale(8) }}>
                  {item.name}
                </Text>
              </View>
              <Text style={[Typography.bodySmall, styles.platformPercentage, { color: Colors.success }]}>
                {item.percentage}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function AudienceInsightsSection() {
  const femaleWidth: DimensionValue = '62%';
  const maleWidth: DimensionValue = '38%';

  return (
    <View style={{ marginTop: verticalScale(20) }}>
      <Text style={[Typography.h2, styles.textWhite, { marginBottom: verticalScale(12) }]}>Audience Insights</Text>
      
      <View style={styles.largeCard}>
        <Text style={[Typography.caption, styles.subSectionTitle]}>GENDER SPLIT</Text>
        <View style={styles.genderBarTrack}>
          <View style={[styles.genderBarFill, { width: femaleWidth, backgroundColor: Colors.teal }]}>
            <Text style={styles.genderBarText}>Female 62%</Text>
          </View>
          <View style={[styles.genderBarFill, { width: maleWidth, backgroundColor: '#FFD1DC', alignItems: 'flex-end' }]}>
            <Text style={[styles.genderBarText, { color: Colors.bgBlack }]}>Male 38%</Text>
          </View>
        </View>

        <Text style={[Typography.caption, styles.subSectionTitle, { marginTop: verticalScale(18) }]}>
          AGE DEMOGRAPHICS
        </Text>
        
        {AGE_DEMOGRAPHICS.map((item, idx) => (
          <View key={item.range} style={styles.ageDemographicRow}>
            <Text style={[Typography.bodySmall, styles.textSecondary, { width: scale(45) }]}>{item.range}</Text>
            <View style={styles.ageProgressTrack}>
              <View style={[styles.ageProgressBarFill, { width: item.width }]} />
            </View>
            <Text style={[Typography.bodySmall, { color: Colors.success, width: scale(35), textAlign: 'right' }]}>
              {item.pct}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function GrowthInsightsSection() {
  return (
    <View style={{ marginTop: verticalScale(20) }}>
      <Text style={[Typography.h2, styles.textWhite, { marginBottom: verticalScale(12) }]}>Growth Insights</Text>
      {GROWTH_INSIGHTS.map((item, idx) => (
        <View key={item.title} style={styles.insightRowCard}>
          <View style={styles.insightIconBadge}>
            {item.icon === 'trendUp' ? (
              <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
                <Rect width="40" height="40" rx="20" fill="#00ACB3" fillOpacity={0.5} />
                <Path d="M11.4 26L10 24.6L17.4 17.15L21.4 21.15L26.6 16H24V14H30V20H28V17.4L21.4 24L17.4 20L11.4 26Z" fill="#06F5FF" />
              </Svg>
            ) : item.icon === 'followers' ? (
              <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
                <Rect width="40" height="40" rx="20" fill="#00ACB3" fillOpacity={0.5} />
                <Path d="M20.5 19.95C20.98 19.42 21.35 18.81 21.61 18.13C21.87 17.44 22 16.73 22 16C22 15.27 21.87 14.56 21.61 13.88C21.35 13.19 20.98 12.58 20.5 12.05C21.5 12.18 22.33 12.63 23 13.38C23.67 14.13 24 15 24 16C24 17 23.67 17.88 23 18.63C22.33 19.38 21.5 19.82 20.5 19.95ZM26 28V25C26 24.4 25.87 23.83 25.6 23.29C25.33 22.75 24.98 22.27 24.55 21.85C25.4 22.15 26.19 22.54 26.91 23.01C27.64 23.49 28 24.15 28 25V28H26ZM28 21V19H26V17H28V15H30V17H32V19H30V21H28ZM16 20C14.9 20 13.96 19.61 13.18 18.83C12.39 18.04 12 17.1 12 16C12 14.9 12.39 13.96 13.18 13.18C13.96 12.39 14.9 12 16 12C17.1 12 18.04 12.39 18.83 13.18C19.61 13.96 20 14.9 20 16C20 17.1 19.61 18.04 18.83 18.83C18.04 19.61 17.1 20 16 20ZM8 28V25.2C8 24.63 8.15 24.11 8.44 23.64C8.73 23.16 9.12 22.8 9.6 22.55C10.63 22.03 11.68 21.65 12.75 21.39C13.82 21.13 14.9 21 16 21C17.1 21 18.18 21.13 19.25 21.39C20.32 21.65 21.37 22.03 22.4 22.55C22.88 22.8 23.27 23.16 23.56 23.64C23.85 24.11 24 24.63 24 25.2V28H8ZM16 18C16.55 18 17.02 17.8 17.41 17.41C17.8 17.02 18 16.55 18 16C18 15.45 17.8 14.98 17.41 14.59C17.02 14.2 16.55 14 16 14C15.45 14 14.98 14.2 14.59 14.59C14.2 14.98 14 15.45 14 16C14 16.55 14.2 17.02 14.59 17.41C14.98 17.8 15.45 18 16 18ZM10 26H22V25.2C22 25.02 21.95 24.85 21.86 24.7C21.77 24.55 21.65 24.43 21.5 24.35C20.6 23.9 19.69 23.56 18.77 23.34C17.86 23.11 16.93 23 16 23C15.07 23 14.14 23.11 13.23 23.34C12.31 23.56 11.4 23.9 10.5 24.35C10.35 24.43 10.23 24.55 10.14 24.7C10.05 24.85 10 25.02 10 25.2V26Z" fill="#06F5FF" />
              </Svg>
            ) : item.icon === 'share' ? (
              <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
                <Rect width="40" height="40" rx="20" fill="#00ACB3" fillOpacity={0.5} />
                <Path d="M26 30C25.17 30 24.46 29.71 23.88 29.13C23.29 28.54 23 27.83 23 27C23 26.9 23.03 26.67 23.08 26.3L16.05 22.2C15.78 22.45 15.48 22.65 15.13 22.79C14.78 22.93 14.4 23 14 23C13.17 23 12.46 22.71 11.88 22.13C11.29 21.54 11 20.83 11 20C11 19.17 11.29 18.46 11.88 17.88C12.46 17.29 13.17 17 14 17C14.4 17 14.78 17.07 15.13 17.21C15.48 17.35 15.78 17.55 16.05 17.8L23.08 13.7C23.04 13.58 23.02 13.47 23.01 13.36C23 13.25 23 13.13 23 13C23 12.17 23.29 11.46 23.88 10.88C24.46 10.29 25.17 10 26 10C26.83 10 27.54 10.29 28.13 10.88C28.71 11.46 29 12.17 29 13C29 13.83 28.71 14.54 28.13 15.13C27.54 15.71 26.83 16 26 16C25.6 16 25.23 15.93 24.88 15.79C24.53 15.65 24.22 15.45 23.95 15.2L16.93 19.3C16.96 19.42 16.98 19.53 16.99 19.64C17 19.75 17 19.87 17 20C17 20.13 17 20.25 16.99 20.36C16.98 20.47 16.96 20.58 16.93 20.7L23.95 24.8C24.22 24.55 24.53 24.35 24.88 24.21C25.23 24.07 25.6 24 26 24C26.83 24 27.54 24.29 28.13 24.88C28.71 25.46 29 26.17 29 27C29 27.83 28.71 28.54 28.13 29.13C27.54 29.71 26.83 30 26 30ZM26 28C26.28 28 26.52 27.9 26.71 27.71C26.9 27.52 27 27.28 27 27C27 26.72 26.9 26.48 26.71 26.29C26.52 26.1 26.28 26 26 26C25.72 26 25.48 26.1 25.29 26.29C25.1 26.48 25 26.72 25 27C25 27.28 25.1 27.52 25.29 27.71C25.48 27.9 25.72 28 26 28ZM14 21C14.28 21 14.52 20.9 14.71 20.71C14.9 20.52 15 20.28 15 20C15 19.72 14.9 19.48 14.71 19.29C14.52 19.1 14.28 19 14 19C13.72 19 13.48 19.1 13.29 19.29C13.1 19.48 13 19.72 13 20C13 20.28 13.1 20.52 13.29 20.71C13.48 20.9 13.72 21 14 21ZM26 14C26.28 14 26.52 13.9 26.71 13.71C26.9 13.52 27 13.28 27 13C27 12.72 26.9 12.48 26.71 12.29C26.52 12.1 26.28 12 26 12C25.72 12 25.48 12.1 25.29 12.29C25.1 12.48 25 12.72 25 13C25 13.28 25.1 13.52 25.29 13.71C25.48 13.9 25.72 14 26 14Z" fill="#06F5FF" />
              </Svg>
            ) : (
              <View style={[styles.innerBadgeDot, { backgroundColor: Colors.cyan }]} />
            )}
          </View>
          <View style={styles.insightTextContainer}>
            <Text style={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: 16, lineHeight: 24, letterSpacing: 0, color: Colors.textPrimary }}>{item.title}</Text>
            <Text style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: 16, lineHeight: 24, letterSpacing: 0, color: Colors.success, marginTop: verticalScale(2) }}>
              {item.update}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function SmartRecommendationsSection() {
  return (
    <View style={{ marginTop: verticalScale(20), marginBottom: verticalScale(30) }}>
      <Text style={[Typography.h2, styles.textWhite, { marginBottom: verticalScale(12) }]}>Smart Recommendations</Text>
      {SMART_RECOMMENDATIONS.map((item, idx) => (
        <View key={item.title} style={styles.recommendationCard}>
          <View style={styles.recHeaderRow}>
            {item.icon === 'video' ? (
              <Svg width={15} height={20} viewBox="0 0 15 20" fill="none">
                <Path d="M7.5 20C6.95 20 6.48 19.8 6.09 19.41C5.7 19.02 5.5 18.55 5.5 18H9.5C9.5 18.55 9.3 19.02 8.91 19.41C8.52 19.8 8.05 20 7.5 20ZM3.5 17V15H11.5V17H3.5ZM3.75 14C2.6 13.32 1.69 12.4 1.01 11.25C0.34 10.1 0 8.85 0 7.5C0 5.42 0.73 3.65 2.19 2.19C3.65 0.73 5.42 0 7.5 0C9.58 0 11.35 0.73 12.81 2.19C14.27 3.65 15 5.42 15 7.5C15 8.85 14.66 10.1 13.99 11.25C13.31 12.4 12.4 13.32 11.25 14H3.75ZM4.35 12H10.65C11.4 11.47 11.98 10.81 12.39 10.03C12.8 9.24 13 8.4 13 7.5C13 5.97 12.47 4.67 11.4 3.6C10.33 2.53 9.03 2 7.5 2C5.97 2 4.67 2.53 3.6 3.6C2.53 4.67 2 5.97 2 7.5C2 8.4 2.2 9.24 2.61 10.03C3.02 10.81 3.6 11.47 4.35 12Z" fill="#00ACB3" />
              </Svg>
            ) : item.icon === 'clock' ? (
              <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <Path d="M13.3 14.7L14.7 13.3L11 9.6V5H9V10.4L13.3 14.7ZM10 20C8.62 20 7.32 19.74 6.1 19.21C4.88 18.69 3.83 17.98 2.93 17.08C2.03 16.18 1.31 15.12 0.79 13.9C0.26 12.68 0 11.38 0 10C0 8.62 0.26 7.32 0.79 6.1C1.31 4.88 2.03 3.83 2.93 2.93C3.83 2.03 4.88 1.31 6.1 0.79C7.32 0.26 8.62 0 10 0C11.38 0 12.68 0.26 13.9 0.79C15.12 1.31 16.18 2.03 17.08 2.93C17.98 3.83 18.69 4.88 19.21 6.1C19.74 7.32 20 8.62 20 10C20 11.38 19.74 12.68 19.21 13.9C18.69 15.12 17.98 16.18 17.08 17.08C16.18 17.98 15.12 18.69 13.9 19.21C12.68 19.74 11.38 20 10 20ZM10 18C12.22 18 14.1 17.22 15.66 15.66C17.22 14.1 18 12.22 18 10C18 7.78 17.22 5.9 15.66 4.34C14.1 2.78 12.22 2 10 2C7.78 2 5.9 2.78 4.34 4.34C2.78 5.9 2 7.78 2 10C2 12.22 2.78 14.1 4.34 15.66C5.9 17.22 7.78 18 10 18Z" fill="#00ACB3" />
              </Svg>
            ) : (
              <View style={[styles.legendDot, { backgroundColor: Colors.cyan, borderRadius: moderateScale(999) }]} />
            )}
            <View style={{ flex: 1, marginLeft: scale(8) }}>
              <Text style={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: 16, lineHeight: 24, letterSpacing: 0, color: Colors.textPrimary }}>{item.title}</Text>
              <Text style={[Typography.bodySmall, styles.textSecondary, { marginTop: verticalScale(6), lineHeight: moderateScale(16) }]}>
                {item.desc}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

// ==========================================
// Main Screen Export
// ==========================================

export default function AnalyticsScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retain clean UX initialization lifecycle
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgBlack} />

      {/* Structured Corporate Logo Header Bar */}
      <View style={styles.headerBarContainer}>
        <Image
          source={require('../../../assets/images/IMB360_v2.png')}
          style={styles.appLogoImage}
          resizeMode="contain"
        />
      </View>

      {loading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator color={Colors.cyan} size="large" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Main Context Typography Headers */}
          <Text style={[Typography.displayMedium, styles.textWhite]}>Analytics</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: verticalScale(20) }}>
            <Text style={[Typography.bodySmall, styles.textMuted]}>
              Performance Summary
            </Text>
            <Pressable style={styles.dropdownSelectorButton}>
              <Text style={[Typography.caption, styles.textSecondary, { fontFamily: 'Poppins-Medium' }]}>
                June 2026
              </Text>
              <View style={styles.dropdownArrowIcon} />
            </Pressable>
          </View>

          {/* 2x2 Clean Overview Grid Alignment */}
          <View style={styles.statsGridContainer}>
            <View style={styles.gridRow}>
              <StatCard label="Total Reach" value={OVERVIEW_STATS.reach.value} change={OVERVIEW_STATS.reach.change} isPositive={OVERVIEW_STATS.reach.isPositive} changeColor={OVERVIEW_STATS.reach.changeColor} />
              <StatCard label="Total Eng." value={OVERVIEW_STATS.engagement.value} change={OVERVIEW_STATS.engagement.change} isPositive={OVERVIEW_STATS.engagement.isPositive} />
            </View>
            <View style={styles.gridRow}>
              <StatCard label="Avg. ER" value={OVERVIEW_STATS.er.value} change={OVERVIEW_STATS.er.change} isPositive={OVERVIEW_STATS.er.isPositive} changeColor={OVERVIEW_STATS.er.changeColor} />
              <StatCard label="Total Spent" value={OVERVIEW_STATS.spent.value} neutralStatus={OVERVIEW_STATS.spent.status} />
            </View>
          </View>

          {/* Visual Breakdown Stacks */}
          <PerformanceTrendsSection />
          <PlatformDistributionSection />
          <AudienceInsightsSection />
          <GrowthInsightsSection />
          <SmartRecommendationsSection />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}