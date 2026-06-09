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
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';
import Typography from '../../styles/typography';
import styles from './styles';

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
  { range: '18–24', pct: '40%', width: '40%' },
  { range: '25–34', pct: '35%', width: '35%' },
  { range: '35–44', pct: '15%', width: '15%' },
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

function PerformanceTrendsSection() {
  const barHeights = [verticalScale(70), verticalScale(55), verticalScale(85), verticalScale(95), verticalScale(10)];
  const dates = ['01 Jun', '08 Jun', '15 Jun', '22 Jun', '29 Jun'];

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
          <View key={idx} style={styles.chartColumn}>
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
            <View key={idx} style={styles.platformLegendItem}>
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
          <View key={idx} style={styles.ageDemographicRow}>
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
        <View key={idx} style={styles.insightRowCard}>
          <View style={styles.insightIconBadge}>
            {item.icon === 'trendUp' ? (
              <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
                <Rect width="40" height="40" rx="20" fill="#00ACB3" fillOpacity={0.5} />
                <Path d="M11.4 26L10 24.6L17.4 17.15L21.4 21.15L26.6 16H24V14H30V20H28V17.4L21.4 24L17.4 20L11.4 26Z" fill="#06F5FF" />
              </Svg>
            ) : item.icon === 'followers' ? (
              <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
                <Rect width="40" height="40" rx="20" fill="#00ACB3" fillOpacity={0.5} />
                <Path d="M20.5 19.95C20.9833 19.4167 21.3542 18.8083 21.6125 18.125C21.8708 17.4417 22 16.7333 22 16C22 15.2667 21.8708 14.5583 21.6125 13.875C21.3542 13.1917 20.9833 12.5833 20.5 12.05C21.5 12.1833 22.3333 12.625 23 13.375C23.6667 14.125 24 15 24 16C24 17 23.6667 17.875 23 18.625C22.3333 19.375 21.5 19.8167 20.5 19.95ZM26 28V25C26 24.4 25.8667 23.8292 25.6 23.2875C25.3333 22.7458 24.9833 22.2667 24.55 21.85C25.4 22.15 26.1875 22.5375 26.9125 23.0125C27.6375 23.4875 28 24.15 28 25V28H26ZM28 21V19H26V17H28V15H30V17H32V19H30V21H28ZM16 20C14.9 20 13.9583 19.6083 13.175 18.825C12.3917 18.0417 12 17.1 12 16C12 14.9 12.3917 13.9583 13.175 13.175C13.9583 12.3917 14.9 12 16 12C17.1 12 18.0417 12.3917 18.825 13.175C19.6083 13.9583 20 14.9 20 16C20 17.1 19.6083 18.0417 18.825 18.825C18.0417 19.6083 17.1 20 16 20ZM8 28V25.2C8 24.6333 8.14583 24.1125 8.4375 23.6375C8.72917 23.1625 9.11667 22.8 9.6 22.55C10.6333 22.0333 11.6833 21.6458 12.75 21.3875C13.8167 21.1292 14.9 21 16 21C17.1 21 18.1833 21.1292 19.25 21.3875C20.3167 21.6458 21.3667 22.0333 22.4 22.55C22.8833 22.8 23.2708 23.1625 23.5625 23.6375C23.8542 24.1125 24 24.6333 24 25.2V28H8ZM16 18C16.55 18 17.0208 17.8042 17.4125 17.4125C17.8042 17.0208 18 16.55 18 16C18 15.45 17.8042 14.9792 17.4125 14.5875C17.0208 14.1958 16.55 14 16 14C15.45 14 14.9792 14.1958 14.5875 14.5875C14.1958 14.9792 14 15.45 14 16C14 16.55 14.1958 17.0208 14.5875 17.4125C14.9792 17.8042 15.45 18 16 18ZM10 26H22V25.2C22 25.0167 21.9542 24.85 21.8625 24.7C21.7708 24.55 21.65 24.4333 21.5 24.35C20.6 23.9 19.6917 23.5625 18.775 23.3375C17.8583 23.1125 16.9333 23 16 23C15.0667 23 14.1417 23.1125 13.225 23.3375C12.3083 23.5625 11.4 23.9 10.5 24.35C10.35 24.4333 10.2292 24.55 10.1375 24.7C10.0458 24.85 10 25.0167 10 25.2V26Z" fill="#06F5FF" />
              </Svg>
            ) : item.icon === 'share' ? (
              <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
                <Rect width="40" height="40" rx="20" fill="#00ACB3" fillOpacity={0.5} />
                <Path d="M26 30C25.1667 30 24.4583 29.7083 23.875 29.125C23.2917 28.5417 23 27.8333 23 27C23 26.9 23.025 26.6667 23.075 26.3L16.05 22.2C15.7833 22.45 15.475 22.6458 15.125 22.7875C14.775 22.9292 14.4 23 14 23C13.1667 23 12.4583 22.7083 11.875 22.125C11.2917 21.5417 11 20.8333 11 20C11 19.1667 11.2917 18.4583 11.875 17.875C12.4583 17.2917 13.1667 17 14 17C14.4 17 14.775 17.0708 15.125 17.2125C15.475 17.3542 15.7833 17.55 16.05 17.8L23.075 13.7C23.0417 13.5833 23.0208 13.4708 23.0125 13.3625C23.0042 13.2542 23 13.1333 23 13C23 12.1667 23.2917 11.4583 23.875 10.875C24.4583 10.2917 25.1667 10 26 10C26.8333 10 27.5417 10.2917 28.125 10.875C28.7083 11.4583 29 12.1667 29 13C29 13.8333 28.7083 14.5417 28.125 15.125C27.5417 15.7083 26.8333 16 26 16C25.6 16 25.225 15.9292 24.875 15.7875C24.525 15.6458 24.2167 15.45 23.95 15.2L16.925 19.3C16.9583 19.4167 16.9792 19.5292 16.9875 19.6375C16.9958 19.7458 17 19.8667 17 20C17 20.1333 16.9958 20.2542 16.9875 20.3625C16.9792 20.4708 16.9583 20.5833 16.925 20.7L23.95 24.8C24.2167 24.55 24.525 24.3542 24.875 24.2125C25.225 24.0708 25.6 24 26 24C26.8333 24 27.5417 24.2917 28.125 24.875C28.7083 25.4583 29 26.1667 29 27C29 27.8333 28.7083 28.5417 28.125 29.125C27.5417 29.7083 26.8333 30 26 30ZM26 28C26.2833 28 26.5208 27.9042 26.7125 27.7125C26.9042 27.5208 27 27.2833 27 27C27 26.7167 26.9042 26.4792 26.7125 26.2875C26.5208 26.0958 26.2833 26 26 26C25.7167 26 25.4792 26.0958 25.2875 26.2875C25.0958 26.4792 25 26.7167 25 27C25 27.2833 25.0958 27.5208 25.2875 27.7125C25.4792 27.9042 25.7167 28 26 28ZM14 21C14.2833 21 14.5208 20.9042 14.7125 20.7125C14.9042 20.5208 15 20.2833 15 20C15 19.7167 14.9042 19.4792 14.7125 19.2875C14.5208 19.0958 14.2833 19 14 19C13.7167 19 13.4792 19.0958 13.2875 19.2875C13.0958 19.4792 13 19.7167 13 20C13 20.2833 13.0958 20.5208 13.2875 20.7125C13.4792 20.9042 13.7167 21 14 21ZM26 14C26.2833 14 26.5208 13.9042 26.7125 13.7125C26.9042 13.5208 27 13.2833 27 13C27 12.7167 26.9042 12.4792 26.7125 12.2875C26.5208 12.0958 26.2833 12 26 12C25.7167 12 25.4792 12.0958 25.2875 12.2875C25.0958 12.4792 25 12.7167 25 13C25 13.2833 25.0958 13.5208 25.2875 13.7125C25.4792 13.9042 25.7167 14 26 14Z" fill="#06F5FF" />
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
        <View key={idx} style={styles.recommendationCard}>
          <View style={styles.recHeaderRow}>
            {item.icon === 'video' ? (
              <Svg width={15} height={20} viewBox="0 0 15 20" fill="none">
                <Path d="M7.5 20C6.95 20 6.47917 19.8042 6.0875 19.4125C5.69583 19.0208 5.5 18.55 5.5 18H9.5C9.5 18.55 9.30417 19.0208 8.9125 19.4125C8.52083 19.8042 8.05 20 7.5 20ZM3.5 17V15H11.5V17H3.5ZM3.75 14C2.6 13.3167 1.6875 12.4 1.0125 11.25C0.3375 10.1 0 8.85 0 7.5C0 5.41667 0.729167 3.64583 2.1875 2.1875C3.64583 0.729167 5.41667 0 7.5 0C9.58333 0 11.3542 0.729167 12.8125 2.1875C14.2708 3.64583 15 5.41667 15 7.5C15 8.85 14.6625 10.1 13.9875 11.25C13.3125 12.4 12.4 13.3167 11.25 14H3.75ZM4.35 12H10.65C11.4 11.4667 11.9792 10.8083 12.3875 10.025C12.7958 9.24167 13 8.4 13 7.5C13 5.96667 12.4667 4.66667 11.4 3.6C10.3333 2.53333 9.03333 2 7.5 2C5.96667 2 4.66667 2.53333 3.6 3.6C2.53333 4.66667 2 5.96667 2 7.5C2 8.4 2.20417 9.24167 2.6125 10.025C3.02083 10.8083 3.6 11.4667 4.35 12Z" fill="#00ACB3" />
              </Svg>
            ) : item.icon === 'clock' ? (
              <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <Path d="M13.3 14.7L14.7 13.3L11 9.6V5H9V10.4L13.3 14.7ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2167 18 14.1042 17.2208 15.6625 15.6625C17.2208 14.1042 18 12.2167 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18Z" fill="#00ACB3" />
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
          source={require('../../assets/images/IMB360_v2.png')}
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