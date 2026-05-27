// src/screens/CampaignQueue/CampaignQueueScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  ScrollView, StatusBar, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';
import Typography from '../../styles/typography';
import { AppNavigationProp } from '../../types/navigation';

type Tab = 'Ongoing' | 'Upcoming' | 'Bidding';
type BidStatus = 'Pending' | 'Accepted' | 'Rejected';

interface Platform { icon: string; color: string; }
interface BaseCampaign { id: string; companyName: string; description: string; reward: number; }
interface ActiveCampaign extends BaseCampaign { budget: number; deadline: string; platforms: Platform[]; }
interface BidCampaign extends BaseCampaign { status: BidStatus; }

import { CURRENCY } from '../../config/constants';

type Props = { navigation: AppNavigationProp<'CampaignQueue'> };

// ── Empty state ───────────────────────────────────────────────────────────────

const EmptyState = ({ tab }: { tab: Tab }) => {
  const config: Record<Tab, { icon: string; title: string; subtitle: string }> = {
    Ongoing:  { icon: '📢', title: 'No ongoing campaigns', subtitle: 'Campaigns you\'re currently running will appear here.' },
    Upcoming: { icon: '📅', title: 'No upcoming campaigns', subtitle: 'Campaigns you\'ve accepted but not yet started will appear here.' },
    Bidding:  { icon: '🏷️', title: 'No bids placed yet',   subtitle: 'Campaigns you\'ve bid on will appear here once submitted.' },
  };
  const { icon, title, subtitle } = config[tab];

  return (
    <View style={emptyStyles.container}>
      <Text style={emptyStyles.icon}>{icon}</Text>
      <Text style={emptyStyles.title}>{title}</Text>
      <Text style={emptyStyles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: scale(40), paddingTop: verticalScale(60),
  },
  icon: { fontSize: moderateScale(52), marginBottom: verticalScale(16) },
  title: {
    color: Colors.textPrimary, fontSize: moderateScale(18),
    fontFamily: 'Poppins-SemiBold', marginBottom: verticalScale(8), textAlign: 'center',
  },
  subtitle: {
    color: Colors.textMuted, fontSize: moderateScale(13),
    fontFamily: 'Poppins-Regular', textAlign: 'center', lineHeight: verticalScale(20),
  },
});

// ── Sub-components ────────────────────────────────────────────────────────────

const CompanyRow = ({ companyName, description }: { companyName: string; description: string }) => (
  <View style={styles.companyRow}>
    <Image source={require('../../assets/images/earningcard.png')} style={styles.companyLogo} />
    <View style={styles.companyInfo}>
      <Text style={[Typography.h3]}>{companyName}</Text>
      <Text style={[Typography.bodySmall, { color: Colors.textSecondary }]}>{description}</Text>
    </View>
  </View>
);

const PlatformRow = ({ platforms }: { platforms: Platform[] }) => {
  const visible = platforms.slice(0, 3);
  const overflow = platforms.length - 3;
  return (
    <View style={styles.platformRow}>
      {visible.map((p, i) => (
        <View key={i} style={[styles.platformIcon, { backgroundColor: p.color, marginLeft: i === 0 ? 0 : scale(-6) }]}>
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

const StatusBadge = ({ status }: { status: BidStatus }) => {
  const badgeColor = status === 'Accepted' ? Colors.success : status === 'Rejected' ? Colors.error : '#F59E0B';
  return (
    <View style={[styles.statusBadge, { backgroundColor: badgeColor }]}>
      <Text style={styles.statusBadgeText}>{status}</Text>
    </View>
  );
};

const OngoingCard = ({
  campaign, onView, onMarkCompleted, onAddContentUrl,
}: { campaign: ActiveCampaign; onView: () => void; onMarkCompleted: () => void; onAddContentUrl: () => void }) => (
  <View style={styles.card}>
    <CompanyRow companyName={campaign.companyName} description={campaign.description} />
    <View style={styles.tagRow}>
      {['Gifting', 'Corporate'].map((tag, i) => (
        <View key={i} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
      ))}
    </View>
    <View style={styles.metaRow}>
      <Text style={[Typography.caption, { color: Colors.textSecondary }]}>
        Budget: <Text style={[Typography.caption, { color: Colors.textPrimary }]}>{CURRENCY}{campaign.budget}</Text>
      </Text>
      <Text style={[Typography.caption, { color: Colors.error }]}>
        Ends in 30 Days{'\n'}
        <Text style={[Typography.caption, { color: Colors.error }]}>Deadline: {campaign.deadline}</Text>
      </Text>
    </View>
    <View style={styles.platformMetaRow}>
      <Text style={[Typography.caption, { color: Colors.textMuted, marginRight: scale(4) }]}>Platforms:</Text>
      <PlatformRow platforms={campaign.platforms} />
      <TouchableOpacity style={styles.addContentBtn} onPress={onAddContentUrl}>
        <Icon name="plus" size={moderateScale(11)} color={Colors.teal} />
        <Text style={styles.addContentText}> Add Content URL</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.actionRow}>
      <TouchableOpacity style={styles.viewBtn} onPress={onView}>
        <Text style={styles.viewBtnText}>View</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.markCompletedBtn} onPress={onMarkCompleted}>
        <LinearGradient colors={[Colors.teal, Colors.lime]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.markCompletedGradient}>
          <Text style={styles.markCompletedText}>Mark as completed</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  </View>
);

const UpcomingCard = ({
  campaign, onView, onStartCampaign,
}: { campaign: ActiveCampaign; onView: () => void; onStartCampaign: () => void }) => (
  <View style={styles.card}>
    <CompanyRow companyName={campaign.companyName} description={campaign.description} />
    <View style={styles.tagRow}>
      {['Gifting', 'Corporate'].map((tag, i) => (
        <View key={i} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
      ))}
    </View>
    <View style={styles.metaRow}>
      <Text style={[Typography.caption, { color: Colors.textSecondary }]}>
        Budget: <Text style={[Typography.caption, { color: Colors.textPrimary }]}>{CURRENCY}{campaign.budget}</Text>
      </Text>
      <Text style={[Typography.caption, { color: Colors.error }]}>
        Ends in 30 Days{'\n'}
        <Text style={[Typography.caption, { color: Colors.error }]}>Deadline: {campaign.deadline}</Text>
      </Text>
    </View>
    <View style={styles.platformMetaRow}>
      <Text style={[Typography.caption, { color: Colors.textMuted, marginRight: scale(4) }]}>Platforms:</Text>
      <PlatformRow platforms={campaign.platforms} />
    </View>
    <View style={styles.actionRow}>
      <TouchableOpacity style={styles.viewBtn} onPress={onView}>
        <Text style={styles.viewBtnText}>View</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.startCampaignBtn} onPress={onStartCampaign}>
        <LinearGradient colors={[Colors.teal, Colors.lime]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.markCompletedGradient}>
          <Text style={styles.markCompletedText}>Start Campaign</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  </View>
);

const BiddingCard = ({ campaign }: { campaign: BidCampaign }) => (
  <View style={styles.card}>
    <View style={styles.biddingCardInner}>
      <View style={styles.biddingLeft}>
        <Image source={require('../../assets/images/earningcard.png')} style={styles.companyLogo} />
        <View style={styles.companyInfo}>
          <Text style={[Typography.h3]}>{campaign.companyName}</Text>
          <Text style={[Typography.bodySmall, { color: Colors.textSecondary }]}>{campaign.description}</Text>
          <Text style={[Typography.caption, { color: Colors.success, marginTop: verticalScale(4) }]}>
            Reward: {CURRENCY}{campaign.reward}
          </Text>
        </View>
      </View>
      <StatusBadge status={campaign.status} />
    </View>
  </View>
);

// ── Main screen ───────────────────────────────────────────────────────────────

const CampaignQueueScreen = ({ navigation }: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>('Ongoing');

  // Empty arrays — real data from API
  const ongoing: ActiveCampaign[] = [];
  const upcoming: ActiveCampaign[] = [];
  const bidding: BidCampaign[] = [];

  const tabs: Tab[] = ['Ongoing', 'Upcoming', 'Bidding'];

  const currentEmpty =
    (activeTab === 'Ongoing'  && ongoing.length === 0) ||
    (activeTab === 'Upcoming' && upcoming.length === 0) ||
    (activeTab === 'Bidding'  && bidding.length === 0);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <LinearGradient colors={[Colors.teal, Colors.lime]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
        <SafeAreaView edges={['top']} style={styles.headerInner}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Image source={require('../../assets/images/backbutton.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Campaign Queue</Text>
        </SafeAreaView>
      </LinearGradient>

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
              <Text style={[styles.tabLabel, activeTab === tab && styles.activeTabLabel]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {currentEmpty ? (
          <EmptyState tab={activeTab} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {activeTab === 'Ongoing' && ongoing.map(campaign => (
              <OngoingCard
                key={campaign.id}
                campaign={campaign}
                onView={() => {}}
                onMarkCompleted={() => {}}
                onAddContentUrl={() => navigation.navigate('CampaignURL', { campaignId: campaign.id })}
              />
            ))}
            {activeTab === 'Upcoming' && upcoming.map(campaign => (
              <UpcomingCard key={campaign.id} campaign={campaign} onView={() => {}} onStartCampaign={() => {}} />
            ))}
            {activeTab === 'Bidding' && bidding.map(campaign => (
              <BiddingCard key={campaign.id} campaign={campaign} />
            ))}
          </ScrollView>
        )}
      </View>
    </>
  );
};

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  header: { width: '100%' },
  headerInner: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: scale(16), paddingBottom: verticalScale(14), paddingTop: verticalScale(4) },
  backBtn: { marginRight: scale(12), padding: scale(4) },
  backIcon: { width: scale(30), height: scale(30), resizeMode: 'contain' },
  headerTitle: { color: '#000000', fontSize: moderateScale(20), fontFamily: 'Poppins-Bold' },
  body: { flex: 1, backgroundColor: Colors.bgBlack },
  tabBar: {
    flexDirection: 'row', marginHorizontal: scale(16), marginTop: verticalScale(14),
    marginBottom: verticalScale(6), borderRadius: moderateScale(10),
    backgroundColor: Colors.bgSurface, overflow: 'hidden',
  },
  tabItem: { flex: 1, paddingVertical: verticalScale(8), alignItems: 'center', borderRadius: moderateScale(10) },
  activeTabItem: { backgroundColor: Colors.teal },
  tabLabel: { fontFamily: 'Poppins-Medium', fontSize: moderateScale(13), color: Colors.textSecondary },
  activeTabLabel: { color: '#000', fontFamily: 'Poppins-SemiBold' },
  scrollContent: { paddingHorizontal: scale(16), paddingBottom: verticalScale(120) },
  card: {
    borderWidth: 1, borderColor: Colors.borderTeal, borderRadius: moderateScale(14),
    padding: scale(14), marginTop: verticalScale(12), backgroundColor: Colors.bgCard,
  },
  companyRow: { flexDirection: 'row', alignItems: 'center' },
  companyLogo: { width: scale(46), height: scale(46), borderRadius: scale(23), resizeMode: 'contain', backgroundColor: '#FFF' },
  companyInfo: { marginLeft: scale(12), flex: 1 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: verticalScale(10), gap: scale(6) },
  tag: { borderWidth: 1, borderColor: Colors.borderStrong, borderRadius: moderateScale(20), paddingHorizontal: scale(10), paddingVertical: verticalScale(2) },
  tagText: { fontFamily: 'Poppins-Regular', fontSize: moderateScale(10), color: Colors.textSecondary },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(10), alignItems: 'flex-start' },
  platformMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(10), flexWrap: 'wrap' },
  platformRow: { flexDirection: 'row', alignItems: 'center', marginRight: scale(12) },
  platformIcon: { width: scale(22), height: scale(22), borderRadius: scale(11), justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: Colors.bgCard },
  platformOverflow: { backgroundColor: Colors.bgInputBorder, marginLeft: scale(-6) },
  platformOverflowText: { fontFamily: 'Poppins-SemiBold', fontSize: moderateScale(8), color: Colors.textSecondary },
  addContentBtn: { flexDirection: 'row', alignItems: 'center' },
  addContentText: { fontFamily: 'Poppins-Medium', fontSize: moderateScale(11), color: Colors.teal },
  actionRow: { flexDirection: 'row', marginTop: verticalScale(12), gap: scale(10) },
  viewBtn: { flex: 1, height: verticalScale(36), borderRadius: moderateScale(8), borderWidth: 1, borderColor: Colors.borderTeal, justifyContent: 'center', alignItems: 'center' },
  viewBtnText: { fontFamily: 'Poppins-SemiBold', fontSize: moderateScale(13), color: Colors.textPrimary },
  markCompletedBtn: { flex: 2, height: verticalScale(36), borderRadius: moderateScale(8), overflow: 'hidden' },
  startCampaignBtn: { flex: 2, height: verticalScale(36), borderRadius: moderateScale(8), overflow: 'hidden' },
  markCompletedGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  markCompletedText: { fontFamily: 'Poppins-SemiBold', fontSize: moderateScale(12), color: '#000' },
  biddingCardInner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  biddingLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  statusBadge: { paddingHorizontal: scale(14), paddingVertical: verticalScale(5), borderRadius: moderateScale(8), marginLeft: scale(8) },
  statusBadgeText: { fontFamily: 'Poppins-SemiBold', fontSize: moderateScale(12), color: '#fff' },
});

export default CampaignQueueScreen;
