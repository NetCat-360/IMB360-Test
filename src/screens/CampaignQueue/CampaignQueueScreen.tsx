// src/screens/CampaignQueue/CampaignQueueScreen.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Campaign Queue screen with three tabs: Ongoing, Upcoming, Bidding.
//
// Ongoing  – campaigns the influencer is currently running.
//            Shows budget, deadline, platforms, "Add Content URL", View +
//            Mark as completed buttons.
// Upcoming – campaigns accepted but not yet started.
//            Shows same meta but with "Start Campaign" button.
// Bidding  – campaigns the influencer has bid on, awaiting brand decision.
//            Shows reward amount and a status badge (Pending / Accepted /
//            Rejected).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';
import Typography from '../../styles/typography';
import { AppNavigationProp } from '../../types/navigation';

// ── Types ────────────────────────────────────────────────────────────────────

type Tab = 'Ongoing' | 'Upcoming' | 'Bidding';
type BidStatus = 'Pending' | 'Accepted' | 'Rejected';

interface Platform {
  icon: string; // MaterialCommunityIcons name
  color: string;
}

interface BaseCampaign {
  id: string;
  companyName: string;
  description: string;
  reward: number;
}

interface ActiveCampaign extends BaseCampaign {
  budget: number;
  deadline: string;
  platforms: Platform[];
}

interface BidCampaign extends BaseCampaign {
  status: BidStatus;
}

// ── Mock data ────────────────────────────────────────────────────────────────

const CURRENCY = '₱';

const PLATFORMS: Platform[] = [
  { icon: 'instagram', color: Colors.instagram },
  { icon: 'twitter', color: Colors.twitter },
  { icon: 'facebook', color: Colors.facebook },
];

// Note: valid MaterialCommunityIcons names for social platforms:
// instagram → 'instagram'  ✓
// twitter   → 'twitter'    ✓
// facebook  → 'facebook'   ✓
// If icons still don't show, use: 'alpha-i-circle', 'alpha-t-circle', 'alpha-f-circle'

const ONGOING_CAMPAIGNS: ActiveCampaign[] = [
  {
    id: 'o1',
    companyName: 'Softiwo_IT Services',
    description: 'Require influencers for product showcase',
    budget: 1200,
    deadline: '2026-01-25',
    platforms: PLATFORMS,
    reward: 1200,
  },
  {
    id: 'o2',
    companyName: 'Softiwo_IT Services',
    description: 'Require influencers for product showcase',
    budget: 1200,
    deadline: '2026-02-28',
    platforms: PLATFORMS,
    reward: 1200,
  },
];

const UPCOMING_CAMPAIGNS: ActiveCampaign[] = [
  {
    id: 'u1',
    companyName: 'Softiwo_IT Services',
    description: 'Require influencers for product showcase',
    budget: 1200,
    deadline: '2026-02-28',
    platforms: PLATFORMS,
    reward: 1200,
  },
  {
    id: 'u2',
    companyName: 'Softiwo_IT Services',
    description: 'Require influencers for product showcase',
    budget: 1200,
    deadline: '2026-02-28',
    platforms: PLATFORMS,
    reward: 1200,
  },
];

const BIDDING_CAMPAIGNS: BidCampaign[] = [
  {
    id: 'b1',
    companyName: 'Softiwo_IT Services',
    description: 'Require influencers for product showcase',
    reward: 1200,
    status: 'Rejected',
  },
  {
    id: 'b2',
    companyName: 'Softiwo_IT Services',
    description: 'Require influencers for product showcase',
    reward: 1200,
    status: 'Accepted',
  },
  {
    id: 'b3',
    companyName: 'Softiwo_IT Services',
    description: 'Require influencers for product showcase',
    reward: 1200,
    status: 'Pending',
  },
];

// ── Sub-components ───────────────────────────────────────────────────────────

/** Company logo + name + description row shared by all card types */
const CompanyRow = ({
  companyName,
  description,
}: {
  companyName: string;
  description: string;
}) => (
  <View style={styles.companyRow}>
    <Image
      source={require('../../assets/images/earningcard.png')}
      style={styles.companyLogo}
    />
    <View style={styles.companyInfo}>
      <Text style={[Typography.h3]}>{companyName}</Text>
      <Text style={[Typography.bodySmall, { color: Colors.textSecondary }]}>
        {description}
      </Text>
    </View>
  </View>
);

/** Platform icon row with overflow "+N" badge */
const PlatformRow = ({ platforms }: { platforms: Platform[] }) => {
  const visible = platforms.slice(0, 3);
  const overflow = platforms.length - 3;
  return (
    <View style={styles.platformRow}>
      {visible.map((p, i) => (
        <View
          key={i}
          style={[styles.platformIcon, { backgroundColor: p.color, marginLeft: i === 0 ? 0 : scale(-6) }]}
        >
          <Icon name={p.icon} size={moderateScale(13)} color="#fff" />
        </View>
      ))}
      {overflow > 0 && (
        <View style={[styles.platformIcon, styles.platformOverflow]}>
          <Text style={styles.platformOverflowText}>+{overflow}</Text>
        </View>
      )}
    </View>
  );
};

/** Status badge for Bidding tab */
const StatusBadge = ({ status }: { status: BidStatus }) => {
  const badgeColor =
    status === 'Accepted'
      ? Colors.success
      : status === 'Rejected'
      ? Colors.error
      : '#F59E0B'; // amber for Pending

  return (
    <View style={[styles.statusBadge, { backgroundColor: badgeColor }]}>
      <Text style={styles.statusBadgeText}>{status}</Text>
    </View>
  );
};

/** Card for Ongoing tab */
const OngoingCard = ({
  campaign,
  onView,
  onMarkCompleted,
  onAddContentUrl,
}: {
  campaign: ActiveCampaign;
  onView: () => void;
  onMarkCompleted: () => void;
  onAddContentUrl: () => void;
}) => (
  <View style={styles.card}>
    <CompanyRow
      companyName={campaign.companyName}
      description={campaign.description}
    />

    {/* Tags */}
    <View style={styles.tagRow}>
      {['Gifting', 'Corporate', 'Corporate'].map((tag, i) => (
        <View key={i} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>

    {/* Budget + Deadline */}
    <View style={styles.metaRow}>
      <Text style={[Typography.caption, { color: Colors.textSecondary }]}>
        Budget:{' '}
        <Text style={[Typography.caption, { color: Colors.textPrimary }]}>
          {CURRENCY}{campaign.budget}
        </Text>
      </Text>
      <Text style={[Typography.caption, { color: Colors.error }]}>
        Ends in 30 Days{'\n'}
        <Text style={[Typography.caption, { color: Colors.error }]}>
          Deadline: {campaign.deadline}
        </Text>
      </Text>
    </View>

    {/* Platforms + Add Content URL */}
    <View style={styles.platformMetaRow}>
      <Text style={[Typography.caption, { color: Colors.textMuted, marginRight: scale(4) }]}>
        Platforms:
      </Text>
      <PlatformRow platforms={campaign.platforms} />
      <TouchableOpacity style={styles.addContentBtn} onPress={onAddContentUrl}>
        <Icon name="plus" size={moderateScale(11)} color={Colors.teal} />
        <Text style={styles.addContentText}> Add Content URL</Text>
      </TouchableOpacity>
    </View>

    {/* Action buttons */}
    <View style={styles.actionRow}>
      <TouchableOpacity style={styles.viewBtn} onPress={onView}>
        <Text style={styles.viewBtnText}>View</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.markCompletedBtn} onPress={onMarkCompleted}>
        <LinearGradient
          colors={[Colors.teal, Colors.lime]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.markCompletedGradient}
        >
          <Text style={styles.markCompletedText}>Mark as completed</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  </View>
);

/** Card for Upcoming tab */
const UpcomingCard = ({
  campaign,
  onView,
  onStartCampaign,
}: {
  campaign: ActiveCampaign;
  onView: () => void;
  onStartCampaign: () => void;
}) => (
  <View style={styles.card}>
    <CompanyRow
      companyName={campaign.companyName}
      description={campaign.description}
    />

    {/* Tags */}
    <View style={styles.tagRow}>
      {['Gifting', 'Corporate', 'Corporate'].map((tag, i) => (
        <View key={i} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>

    {/* Budget + Deadline */}
    <View style={styles.metaRow}>
      <Text style={[Typography.caption, { color: Colors.textSecondary }]}>
        Budget:{' '}
        <Text style={[Typography.caption, { color: Colors.textPrimary }]}>
          {CURRENCY}{campaign.budget}
        </Text>
      </Text>
      <Text style={[Typography.caption, { color: Colors.error }]}>
        Ends in 30 Days{'\n'}
        <Text style={[Typography.caption, { color: Colors.error }]}>
          Deadline: {campaign.deadline}
        </Text>
      </Text>
    </View>

    {/* Platforms + Add Content URL */}
    <View style={styles.platformMetaRow}>
      <Text style={[Typography.caption, { color: Colors.textMuted, marginRight: scale(4) }]}>
        Platforms:
      </Text>
      <PlatformRow platforms={campaign.platforms} />
      <TouchableOpacity style={styles.addContentBtn} onPress={() => {}}>
        <Icon name="plus" size={moderateScale(11)} color={Colors.teal} />
        <Text style={styles.addContentText}> Add Content URL</Text>
      </TouchableOpacity>
    </View>

    {/* Action buttons */}
    <View style={styles.actionRow}>
      <TouchableOpacity style={styles.viewBtn} onPress={onView}>
        <Text style={styles.viewBtnText}>View</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.startCampaignBtn} onPress={onStartCampaign}>
        <LinearGradient
          colors={[Colors.teal, Colors.lime]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.markCompletedGradient}
        >
          <Text style={styles.markCompletedText}>Start Campaign</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  </View>
);

/** Card for Bidding tab */
const BiddingCard = ({ campaign }: { campaign: BidCampaign }) => (
  <View style={styles.card}>
    <View style={styles.biddingCardInner}>
      <View style={styles.biddingLeft}>
        <Image
          source={require('../../assets/images/earningcard.png')}
          style={styles.companyLogo}
        />
        <View style={styles.companyInfo}>
          <Text style={[Typography.h3]}>{campaign.companyName}</Text>
          <Text style={[Typography.bodySmall, { color: Colors.textSecondary }]}>
            {campaign.description}
          </Text>
          <Text style={[Typography.caption, { color: Colors.success, marginTop: verticalScale(4) }]}>
            Reward: {CURRENCY}{campaign.reward}
          </Text>
        </View>
      </View>
      <StatusBadge status={campaign.status} />
    </View>
  </View>
);

// ── Props ────────────────────────────────────────────────────────────────────

type Props = {
  navigation: AppNavigationProp<'CampaignQueue'>;
};

// ── Main screen ──────────────────────────────────────────────────────────────

const CampaignQueueScreen = ({ navigation }: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>('Ongoing');

  const tabs: Tab[] = ['Ongoing', 'Upcoming', 'Bidding'];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* ── Gradient header ── */}
      <LinearGradient
        colors={[Colors.teal, Colors.lime]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <SafeAreaView edges={['top']} style={styles.headerInner}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Image
              source={require('../../assets/images/backbutton.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Campaign Queue</Text>
        </SafeAreaView>
      </LinearGradient>

      {/* ── Body ── */}
      <View style={styles.body}>

        {/* Tab switcher */}
        <View style={styles.tabBar}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === tab && styles.activeTabLabel,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {activeTab === 'Ongoing' &&
            ONGOING_CAMPAIGNS.map(campaign => (
              <OngoingCard
                key={campaign.id}
                campaign={campaign}
                onView={() => {}}
                onMarkCompleted={() => {}}
                onAddContentUrl={() => {}}
              />
            ))}

          {activeTab === 'Upcoming' &&
            UPCOMING_CAMPAIGNS.map(campaign => (
              <UpcomingCard
                key={campaign.id}
                campaign={campaign}
                onView={() => {}}
                onStartCampaign={() => {}}
              />
            ))}

          {activeTab === 'Bidding' &&
            BIDDING_CAMPAIGNS.map(campaign => (
              <BiddingCard key={campaign.id} campaign={campaign} />
            ))}
        </ScrollView>
      </View>
    </>
  );
};

// ── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // ── Header
  header: { width: '100%' },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(14),
    paddingTop: verticalScale(4),
  },
  backBtn: { marginRight: scale(12), padding: scale(4) },
  backIcon: { width: scale(30), height: scale(30), resizeMode: 'contain' },
  headerTitle: {
    color: '#000000',
    fontSize: moderateScale(20),
    fontFamily: 'Poppins-Bold',
  },

  // ── Body
  body: { flex: 1, backgroundColor: Colors.bgBlack },

  // ── Tab bar
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: scale(16),
    marginTop: verticalScale(14),
    marginBottom: verticalScale(6),
    borderRadius: moderateScale(10),
    backgroundColor: Colors.bgSurface,
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    paddingVertical: verticalScale(8),
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  activeTabItem: {
    backgroundColor: Colors.teal,
  },
  tabLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(13),
    color: Colors.textSecondary,
  },
  activeTabLabel: {
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },

  // ── Scroll
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(120),
  },

  // ── Campaign card (shared)
  card: {
    borderWidth: 1,
    borderColor: Colors.borderTeal,
    borderRadius: moderateScale(14),
    padding: scale(14),
    marginTop: verticalScale(12),
    backgroundColor: Colors.bgCard,
  },

  // ── Company row
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyLogo: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23),
    resizeMode: 'contain',
    backgroundColor: '#FFF',
  },
  companyInfo: { marginLeft: scale(12), flex: 1 },

  // ── Tags
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: verticalScale(10),
    gap: scale(6),
  },
  tag: {
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    borderRadius: moderateScale(20),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(2),
  },
  tagText: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(10),
    color: Colors.textSecondary,
  },

  // ── Meta row (budget + deadline)
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(10),
    alignItems: 'flex-start',
  },

  // ── Platform row
  platformMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
    flexWrap: 'wrap',
  },
  platformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(12),
  },
  platformIcon: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.bgCard,
  },
  platformOverflow: {
    backgroundColor: Colors.bgInputBorder,
    marginLeft: scale(-6),
  },
  platformOverflowText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: moderateScale(8),
    color: Colors.textSecondary,
  },

  // ── Add content URL
  addContentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addContentText: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(11),
    color: Colors.teal,
  },

  // ── Action buttons
  actionRow: {
    flexDirection: 'row',
    marginTop: verticalScale(12),
    gap: scale(10),
  },
  viewBtn: {
    flex: 1,
    height: verticalScale(36),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: Colors.borderTeal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtnText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: moderateScale(13),
    color: Colors.textPrimary,
  },
  markCompletedBtn: {
    flex: 2,
    height: verticalScale(36),
    borderRadius: moderateScale(8),
    overflow: 'hidden',
  },
  startCampaignBtn: {
    flex: 2,
    height: verticalScale(36),
    borderRadius: moderateScale(8),
    overflow: 'hidden',
  },
  markCompletedGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markCompletedText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: moderateScale(12),
    color: '#000',
  },

  // ── Bidding card
  biddingCardInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  biddingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  // ── Status badge
  statusBadge: {
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(8),
    marginLeft: scale(8),
  },
  statusBadgeText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: moderateScale(12),
    color: '#fff',
  },
});

export default CampaignQueueScreen;
