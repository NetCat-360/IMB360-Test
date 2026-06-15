// src/screens/CampaignQueue/CampaignQueueScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, Image, Pressable,
  ScrollView, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';
import { Colors } from '../../../config/theme';
import Typography from '../../../styles/typography';
import { AppNavigationProp } from '../../../types/navigation';
import { emptyStyles, styles } from './styles';

type Tab = 'Ongoing' | 'Upcoming' | 'Bidding';
type BidStatus = 'Pending' | 'Accepted' | 'Rejected';

interface Platform { icon: string; color: string; }
interface BaseCampaign { id: string; companyName: string; description: string; reward: number; }
interface ActiveCampaign extends BaseCampaign { budget: number; deadline: string; platforms: Platform[]; }
interface BidCampaign extends BaseCampaign { status: BidStatus; }

import { CURRENCY } from '../../../config/constants';

type Props = { navigation: AppNavigationProp<'CampaignQueue'> };

// ── Empty state ───────────────────────────────────────────────────────────────

const EMPTY_STATE_CONFIG: Record<Tab, { icon: string; title: string; subtitle: string }> = {
  Ongoing:  { icon: '📢', title: 'No ongoing campaigns', subtitle: 'Campaigns you\'re currently running will appear here.' },
  Upcoming: { icon: '📅', title: 'No upcoming campaigns', subtitle: 'Campaigns you\'ve accepted but not yet started will appear here.' },
  Bidding:  { icon: '🏷️', title: 'No bids placed yet',   subtitle: 'Campaigns you\'ve bid on will appear here once submitted.' },
};

const EmptyState = ({ tab }: { tab: Tab }) => {
  const { icon, title, subtitle } = EMPTY_STATE_CONFIG[tab];

  return (
    <View style={emptyStyles.container}>
      <Text style={emptyStyles.icon}>{icon}</Text>
      <Text style={emptyStyles.title}>{title}</Text>
      <Text style={emptyStyles.subtitle}>{subtitle}</Text>
    </View>
  );
};



// ── Sub-components ────────────────────────────────────────────────────────────

const CompanyRow = ({ companyName, description }: { companyName: string; description: string }) => (
  <View style={styles.companyRow}>
    <Image source={require('../../../assets/images/earningcard.png')} style={styles.companyLogo} />
    <View style={styles.companyInfo}>
      <Text style={Typography.h3}>{companyName}</Text>
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
        <View key={`platform-${p.icon}-${i}`} style={[styles.platformIcon, { backgroundColor: p.color, marginLeft: i === 0 ? 0 : scale(-6) }]}>
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
      <Pressable style={styles.addContentBtn} onPress={onAddContentUrl}>
        <Icon name="plus" size={moderateScale(11)} color={Colors.teal} />
        <Text style={styles.addContentText}> Add Content URL</Text>
      </Pressable>
    </View>
    <View style={styles.actionRow}>
      <Pressable style={styles.viewBtn} onPress={onView}>
        <Text style={styles.viewBtnText}>View</Text>
      </Pressable>
      <Pressable style={styles.markCompletedBtn} onPress={onMarkCompleted}>
        <LinearGradient colors={[Colors.teal, Colors.lime]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.markCompletedGradient}>
          <Text style={styles.markCompletedText}>Mark as completed</Text>
        </LinearGradient>
      </Pressable>
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
      <Pressable style={styles.viewBtn} onPress={onView}>
        <Text style={styles.viewBtnText}>View</Text>
      </Pressable>
      <Pressable style={styles.startCampaignBtn} onPress={onStartCampaign}>
        <LinearGradient colors={[Colors.teal, Colors.lime]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.markCompletedGradient}>
          <Text style={styles.markCompletedText}>Start Campaign</Text>
        </LinearGradient>
      </Pressable>
    </View>
  </View>
);

const BiddingCard = ({ campaign }: { campaign: BidCampaign }) => (
  <View style={styles.card}>
    <View style={styles.biddingCardInner}>
      <View style={styles.biddingLeft}>
        <Image source={require('../../../assets/images/earningcard.png')} style={styles.companyLogo} />
        <View style={styles.companyInfo}>
          <Text style={Typography.h3}>{campaign.companyName}</Text>
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

const TABS: Tab[] = ['Ongoing', 'Upcoming', 'Bidding'];
const EMPTY_ACTIVE: ActiveCampaign[] = [];
const EMPTY_BIDDING: BidCampaign[] = [];

const CampaignQueueScreen = ({ navigation }: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>('Ongoing');

  // Empty arrays — real data from API
  const ongoing = EMPTY_ACTIVE;
  const upcoming = EMPTY_ACTIVE;
  const bidding = EMPTY_BIDDING;

  const currentEmpty =
    (activeTab === 'Ongoing'  && ongoing.length === 0) ||
    (activeTab === 'Upcoming' && upcoming.length === 0) ||
    (activeTab === 'Bidding'  && bidding.length === 0);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <LinearGradient colors={[Colors.teal, Colors.lime]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
        <SafeAreaView edges={['top']} style={styles.headerInner}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Image source={require('../../../assets/images/backbutton.png')} style={styles.backIcon} />
          </Pressable>
          <Text style={styles.headerTitle}>Campaign Queue</Text>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.body}>
        {/* Tab switcher */}
        <View style={styles.tabBar}>
          {TABS.map(tab => (
            <Pressable
              key={tab}
              style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabLabel, activeTab === tab && styles.activeTabLabel]}>{tab}</Text>
            </Pressable>
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



export default CampaignQueueScreen;
