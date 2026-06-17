import React from "react";

import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import LinearGradient
from "react-native-linear-gradient";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  useSelector,
} from "react-redux";

import {
  useRoute,
  useNavigation,
} from "@react-navigation/native";

import AppHeader
from "../../../components/AppHeader";

import ScreenHeader from "../../../components/ScreenHeader";

import styles
from "./BrandCampaignDetailsStyles";

import {
  RootState,
} from "../../../store/store";

import {
  Colors,
} from "../../../config/theme";

function HeroCard({ campaign }: { campaign: any }) {
  return (
    <View style={styles.heroCard}>
      <View style={styles.statusPill}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>{campaign.status}</Text>
      </View>
      <View style={styles.topRow}>
        <Image source={require("../../../assets/images/IMB360_v2.png")} style={styles.logo} resizeMode="contain" />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{campaign.title}</Text>
          <View style={styles.socialRow}>
            <Image source={require("../../../assets/images/Instagram.png")} style={styles.socialIcon} />
            <Image source={require("../../../assets/images/facebook.png")} style={styles.socialIcon} />
            <Image source={require("../../../assets/images/youtube.png")} style={styles.socialIcon} />
            <Image source={require("../../../assets/images/tiktok.png")} style={styles.socialIcon} />
            <Image source={require("../../../assets/images/linkedin.png")} style={styles.socialIcon} />
          </View>
        </View>
      </View>
      <Text style={styles.description}>{campaign.description}</Text>
    </View>
  );
}

function RequirementsSection({ campaign }: { campaign: any }) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.requirementHeader}>
        <Image source={require("../../../assets/images/shield.png")} style={styles.shieldIcon} />
        <Text style={styles.sectionTitle}>Campaign Requirements</Text>
      </View>
      <View style={styles.requirementRow}>
        <View style={styles.requirementBox}>
          <Text style={styles.requirementLabel}>MIN. FOLLOWERS</Text>
          <Text style={styles.requirementValue}>{campaign.minFollowers}</Text>
        </View>
        <View style={styles.requirementBox}>
          <Text style={styles.requirementLabel}>MIN. ENGAGEMENT</Text>
          <Text style={styles.requirementValue}>{campaign.minEngagement}</Text>
        </View>
      </View>
    </View>
  );
}

function TargetAudienceSection({ campaign }: { campaign: any }) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.targetTitle}>Target Audience</Text>
      <Text style={styles.sectionText}>{campaign.targetAudience}</Text>
    </View>
  );
}

function TimelineSection({ campaign }: { campaign: any }) {
  return (
    <View style={styles.timelineRow}>
      <Image source={require("../../../assets/images/calendar.png")} style={styles.timelineIcon} />
      <View>
        <Text style={styles.timelineLabel}>TIMELINE:</Text>
        <Text style={styles.timelineValue}>{campaign.startDate} TO {campaign.endDate}</Text>
      </View>
    </View>
  );
}

function BudgetSection({ campaign }: { campaign: any }) {
  return (
    <View style={styles.timelineRow}>
      <Image source={require("../../../assets/images/dollar.png")} style={styles.budgetIcon} />
      <View>
        <Text style={styles.budgetLabel}>BUDGET RANGE:</Text>
        <Text style={styles.budgetRangeText}>₹{campaign.budgetRange}</Text>
      </View>
    </View>
  );
}

function DeliverablesSection({ campaign }: { campaign: any }) {
  return (
    <View style={styles.deliverableCard}>
      <Text style={styles.deliverableTitle}>Deliverables</Text>
      {campaign.deliverables?.map((item: string, index: number) => (
        <View key={item} style={styles.deliverableRow}>
          <Image source={require("../../../assets/images/checkbox.png")} style={styles.checkIcon} />
          <Text style={styles.deliverableText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export default function
BrandCampaignDetailsScreen() {

  const navigation =
    useNavigation<any>();

  const route =
    useRoute<any>();

  const campaignId =
    route?.params
      ?.campaignId ?? "1";

  const campaign =
    useSelector(
      (
        state:
          RootState
      ) =>
        state
          .brandCampaignTab
          .campaigns
          .find(
            item =>
              item.id ===
              campaignId
          )
    );

  if (!campaign) {
    return null;
  }

  return (
    <SafeAreaView
      style={
        styles.container
      }
      edges={[]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={
          Colors.bgBlack
        }
      />

<ScreenHeader
        title="View Details"
        onBack={() => {
          navigation.pop();
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <HeroCard campaign={campaign} />
        <RequirementsSection campaign={campaign} />
        <TargetAudienceSection campaign={campaign} />
        <TimelineSection campaign={campaign} />
        <BudgetSection campaign={campaign} />
        <DeliverablesSection campaign={campaign} />
        <Pressable onPress={() => navigation.goBack()} style={styles.closeButtonWrapper}>
          <LinearGradient colors={["#00BFEA", "#84E44C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}