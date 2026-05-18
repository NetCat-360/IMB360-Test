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
  navigation: AppNavigationProp<'Overview'>;
};

// Social platform card showing handle, metric labels and values
const PlatformCard = ({
  icon,
  handle,
  metric1Label,
  metric1Value,
  metric2Label,
  metric2Value,
  accentColor,
}: {
  icon: any;
  handle: string;
  metric1Label: string;
  metric1Value: string;
  metric2Label: string;
  metric2Value: string;
  accentColor: string;
}) => (
  <View style={[cardStyles.card, { borderColor: accentColor + '44' }]}>
    <View style={cardStyles.cardHeader}>
      <Image source={icon} style={cardStyles.platformIcon} resizeMode="contain" />
      <Text style={cardStyles.handle}>{handle}</Text>
    </View>
    <View style={cardStyles.metricsRow}>
      <View style={cardStyles.metricBlock}>
        <Text style={cardStyles.metricValue}>{metric1Value}</Text>
        <Text style={cardStyles.metricLabel}>{metric1Label}</Text>
      </View>
      <View style={cardStyles.metricBlock}>
        <Text style={cardStyles.metricValue}>{metric2Value}</Text>
        <Text style={cardStyles.metricLabel}>{metric2Label}</Text>
      </View>
    </View>
  </View>
);

const cardStyles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: '#0D0D0D',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    padding: scale(12),
    marginBottom: verticalScale(12),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  platformIcon: {
    width: scale(20),
    height: scale(20),
    marginRight: scale(8),
  },
  handle: {
    color: '#ffffff',
    fontSize: moderateScale(12),
    fontWeight: '600',
    flex: 1,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricBlock: {
    alignItems: 'flex-start',
  },
  metricValue: {
    color: '#ffffff',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  metricLabel: {
    color: '#666666',
    fontSize: moderateScale(10),
    marginTop: verticalScale(2),
  },
});

// Simple bar for follower segmentation
const SegmentBar = ({ label, percentage, color }: { label: string; percentage: number; color: string }) => (
  <View style={segStyles.row}>
    <Text style={segStyles.label}>{label}</Text>
    <View style={segStyles.track}>
      <View style={[segStyles.fill, { width: `${percentage}%`, backgroundColor: color }]} />
    </View>
  </View>
);

const segStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  label: {
    color: '#aaaaaa',
    fontSize: moderateScale(12),
    width: scale(110),
  },
  track: {
    flex: 1,
    height: verticalScale(4),
    backgroundColor: '#1C1C1E',
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
});

const OverviewScreen = ({ navigation }: Props) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Teal-to-lime gradient header matching the design */}
      <LinearGradient
        colors={['#00b9c0', '#b6d82c']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <SafeAreaView edges={['top']} style={styles.headerInner}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Image
              source={require('../../assets/images/backbutton.png')}
              style={
                styles.backIcon
              }
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile Overview</Text>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>

        {/* ── Platform cards grid ───────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Connected Platforms</Text>
          <TouchableOpacity>
            <Text style={styles.addMore}>+ Add More</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardsGrid}>
          <PlatformCard
            icon={require('../../assets/images/Instagram.png')}
            handle="@ragecodess"
            metric1Label="Followers"
            metric1Value="3.76K"
            metric2Label="Posts"
            metric2Value="87"
            accentColor="#E1306C"
          />
          <PlatformCard
            icon={require('../../assets/images/youtube.png')}
            handle="@ragecodess"
            metric1Label="Subcribers"
            metric1Value="3.76K"
            metric2Label="Videos"
            metric2Value="87"
            accentColor="#FF0000"
          />
          <PlatformCard
            icon={require('../../assets/images/facebook.png')}
            handle="@ragecodess"
            metric1Label="Followers"
            metric1Value="3.76K"
            metric2Label="Posts"
            metric2Value="87"
            accentColor="#1877F2"
          />
          <PlatformCard
            icon={require('../../assets/images/Twitter.png')}
            handle="@ragecodess"
            metric1Label="Followers"
            metric1Value="3.76K"
            metric2Label="Posts"
            metric2Value="87"
            accentColor="#1DA1F2"
          />
        </View>

        {/* ── Follower Growth chart placeholder ─── */}
        <View style={styles.card}>
          <View style={styles.chartHeader}>
            <Text style={styles.cardTitle}>Follower Growth</Text>
            <TouchableOpacity style={styles.dateChip}>
              <Text style={styles.dateChipText}>June 2024 ▾</Text>
            </TouchableOpacity>
          </View>

          {/* Chart placeholder — replace with a real chart library when ready */}
          <View style={styles.chartArea}>
            <Text style={styles.chartPlaceholder}>📈  Chart coming soon</Text>
          </View>

          {/* Legend */}
          <View style={styles.legend}>
            {[
              { label: 'Instagram', color: '#E1306C' },
              { label: 'Youtube',   color: '#FF0000' },
              { label: 'Facebook',  color: '#1877F2' },
              { label: 'Twitter',   color: '#888888' },
            ].map((item) => (
              <View key={item.label} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <Text style={styles.legendLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Follower Segmentation ─────────────── */}
        <View style={[styles.card, { marginBottom: verticalScale(32) }]}>
          <Text style={styles.cardTitle}>Follower Segmentation</Text>
          <View style={{ marginTop: verticalScale(16) }}>
            <SegmentBar label="Below 18 years old" percentage={30} color="#00b9c0" />
            <SegmentBar label="18-24 years old"    percentage={75} color="#ffffff" />
            <SegmentBar label="25-32 years old"    percentage={55} color="#00b9c0" />
            <SegmentBar label="33-50 years old"    percentage={40} color="#b6d82c" />
          </View>
        </View>

      </ScrollView>
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
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
  addMore: {
    color: '#00b9c0',
    fontSize: moderateScale(13),
    fontWeight: '600',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#0D0D0D',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#1C1C1E',
    padding: scale(14),
    marginBottom: verticalScale(16),
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
  dateChip: {
    backgroundColor: '#1C1C1E',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(12),
  },
  dateChipText: {
    color: '#00b9c0',
    fontSize: moderateScale(12),
  },
  chartArea: {
    height: verticalScale(140),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(12),
  },
  chartPlaceholder: {
    color: '#444444',
    fontSize: moderateScale(14),
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(12),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    marginRight: scale(5),
  },
  legendLabel: {
    color: '#888888',
    fontSize: moderateScale(11),
  },
  backIcon: {
    width: scale(30),
    height: scale(30),
    resizeMode:
      'contain',
    marginRight:
      scale(12),
  },
});

export default OverviewScreen;