// src/screens/overview/OverviewScreen.tsx
// Fix: "Subcribers" → "Subscribers" typo corrected.
// Improvement: Theme tokens replace hardcoded hex strings. Typography applied.
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { verticalScale } from '../../utils/scaling';
import { AppNavigationProp } from '../../types/navigation';
import { Colors } from '../../config/theme';
import Typography from '../../styles/typography';
import { cardStyles, segStyles, styles } from './styles';

type Props = { navigation: AppNavigationProp<'Overview'> };

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
      <Text style={[Typography.label, { flex: 1, color: Colors.textPrimary }]}>{handle}</Text>
    </View>
    <View style={cardStyles.metricsRow}>
      <View style={cardStyles.metricBlock}>
        <Text style={Typography.h3}>{metric1Value}</Text>
        <Text style={Typography.caption}>{metric1Label}</Text>
      </View>
      <View style={cardStyles.metricBlock}>
        <Text style={Typography.h3}>{metric2Value}</Text>
        <Text style={Typography.caption}>{metric2Label}</Text>
      </View>
    </View>
  </View>
);



const SegmentBar = ({
  label,
  percentage,
  color,
}: {
  label: string;
  percentage: number;
  color: string;
}) => (
  <View style={segStyles.row}>
    <Text style={[Typography.caption, segStyles.label]}>{label}</Text>
    <View style={segStyles.track}>
      <View style={[segStyles.fill, { width: `${percentage}%`, backgroundColor: color }]} />
    </View>
  </View>
);



const OverviewScreen = ({ navigation }: Props) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgBlack} />

      <LinearGradient
        colors={[Colors.teal, Colors.lime]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <SafeAreaView edges={['top']} style={styles.headerInner}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Image
              source={require('../../assets/images/backbutton.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile Overview</Text>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>

        <View style={styles.sectionHeader}>
          <Text style={Typography.h3}>Connected Platforms</Text>
          <TouchableOpacity>
            <Text style={[Typography.label, { color: Colors.teal }]}>+ Add More</Text>
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
            accentColor={Colors.instagram}
          />
          <PlatformCard
            icon={require('../../assets/images/youtube.png')}
            handle="@ragecodess"
            metric1Label="Subscribers" // FIX: was "Subcribers"
            metric1Value="3.76K"
            metric2Label="Videos"
            metric2Value="87"
            accentColor={Colors.youtube}
          />
          <PlatformCard
            icon={require('../../assets/images/facebook.png')}
            handle="@ragecodess"
            metric1Label="Followers"
            metric1Value="3.76K"
            metric2Label="Posts"
            metric2Value="87"
            accentColor={Colors.facebook}
          />
          <PlatformCard
            icon={require('../../assets/images/Twitter.png')}
            handle="@ragecodess"
            metric1Label="Followers"
            metric1Value="3.76K"
            metric2Label="Posts"
            metric2Value="87"
            accentColor={Colors.twitter}
          />
        </View>

        {/* Follower Growth chart placeholder */}
        <View style={styles.card}>
          <View style={styles.chartHeader}>
            <Text style={Typography.h3}>Follower Growth</Text>
            <TouchableOpacity style={styles.dateChip}>
              <Text style={[Typography.caption, { color: Colors.teal }]}>June 2024 ▾</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chartArea}>
            <Text style={[Typography.caption, { color: '#444444' }]}>📈  Chart coming soon</Text>
          </View>
          <View style={styles.legend}>
            {[
              { label: 'Instagram', color: Colors.instagram },
              { label: 'Youtube',   color: Colors.youtube },
              { label: 'Facebook',  color: Colors.facebook },
              { label: 'Twitter',   color: Colors.twitter },
            ].map(item => (
              <View key={item.label} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <Text style={Typography.caption}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Follower Segmentation */}
        <View style={[styles.card, { marginBottom: verticalScale(32) }]}>
          <Text style={[Typography.h3, { marginBottom: verticalScale(16) }]}>
            Follower Segmentation
          </Text>
          <SegmentBar label="Below 18 years old" percentage={30} color={Colors.teal} />
          <SegmentBar label="18-24 years old"    percentage={75} color={Colors.textPrimary} />
          <SegmentBar label="25-32 years old"    percentage={55} color={Colors.teal} />
          <SegmentBar label="33-50 years old"    percentage={40} color={Colors.lime} />
        </View>

      </ScrollView>
    </>
  );
};



export default OverviewScreen;
