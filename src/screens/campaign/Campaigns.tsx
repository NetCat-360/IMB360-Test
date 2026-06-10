import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";

import styles from "./CampaignStyles";

import AppHeader from "../../components/AppHeader";

import { moderateScale, verticalScale } from "../../utils/scaling";

import { RootState } from "../../store/store";

import GradientButton from "../../components/GradientButton";

import { Colors } from "../../config/theme";

export default function Campaigns() {
  const campaigns =
  useSelector(
    (state: RootState) =>
      state?.campaign?.campaigns
  ) ?? [];  const navigation = useNavigation();

  const [showFilters, setShowFilters] = useState(false);

  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const [expanded, setExpanded] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgBlack} />

      <AppHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* TITLE */}
        <View style={styles.headingContainer}>
          <Text style={styles.browseText}>
            BROWSE <Text style={styles.campaignGreen}>CAMPAIGNS</Text>
          </Text>
        </View>

        {/* AI BUTTON */}
        <TouchableOpacity style={styles.aiButton}>
          <Image
            source={require("../../assets/images/ai.png")}
            style={styles.aiimage}
            resizeMode="contain"
          />

          <Text style={styles.aiButtonText}>AI Browse Campaign</Text>
        </TouchableOpacity>

        {/* FILTER */}
        <View style={styles.filterRow}>
          <Text style={styles.filterText}>Filter Result</Text>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Image
              source={require("../../assets/images/filter.png")}
              style={styles.infoImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* FILTERS */}
        {showFilters && (
  <View style={styles.filterBox}>
    {/* SEARCH */}
    <View style={styles.searchBox}>
      <Image
        source={require(
          "../../assets/images/search.png"
        )}
        style={styles.searchIcon}
      />

      <Text style={styles.placeholderText}>
        Search campaign
      </Text>
    </View>

    {/* CATEGORY */}
    <TouchableOpacity
      style={styles.filterDropdown}
    >
      <View style={styles.dropdownLeft}>
        <Image
          source={require(
            "../../assets/images/categories.png"
          )}
          style={styles.dropdownIcon}
        />

        <Text
          style={
            styles.dropdownText
          }
        >
          All Categories
        </Text>
      </View>

      <Image
        source={require(
          "../../assets/images/downarrow.png"
        )}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>

    {/* BUDGET */}
    <TouchableOpacity
      style={styles.filterDropdown}
    >
      <View style={styles.dropdownLeft}>
        <Image
          source={require(
            "../../assets/images/points.png"
          )}
          style={styles.dropdownIcon}
        />

        <Text
          style={
            styles.dropdownText
          }
        >
          All Budgets
        </Text>
      </View>

      <Image
        source={require(
          "../../assets/images/downarrow.png"
        )}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>

    {/* PLATFORM */}
    <TouchableOpacity
      style={styles.filterDropdown}
    >
      <View style={styles.dropdownLeft}>
        <Image
          source={require(
            "../../assets/images/platforms.png"
          )}
          style={styles.dropdownIcon}
        />

        <Text
          style={
            styles.dropdownText
          }
        >
          All Platforms
        </Text>
      </View>

      <Image
        source={require(
          "../../assets/images/downarrow.png"
        )}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>

    {/* SEARCH BUTTON */}
    <GradientButton
      title="Search"
      style={
        styles.searchButton
      }
      textStyle={{
        color: "#000",
        fontWeight:
          "700",
        fontSize:
          moderateScale(18),
      }}
      onPress={() => {}}
    />
  </View>
)}

        {/* CARD */}
        {campaigns?.map((campaign, campaignIndex) => (
          <View key={campaign.id ?? campaignIndex} style={styles.card}>
            {/* TOP */}
            <View style={styles.cardTopRow}>
              <Image
                source={require("../../assets/images/icon.png")}
                style={styles.companyLogo}
                resizeMode="contain"
              />

              <View
                style={{
                  flex: 1,
                }}
              >
                <View style={styles.titleRow}>
                  <Text style={styles.companyName}>{campaign.companyName}</Text>

                  <Text style={styles.timelineText}>{campaign.timeline}</Text>
                </View>

                {/* SOCIALS */}
                <View style={styles.socialContainer}>
                  <Image
                    source={require("../../assets/images/Instagram.png")}
                    style={styles.socialIcon}
                  />

                  <Image
                    source={require("../../assets/images/facebook.png")}
                    style={styles.socialIcon}
                  />

                  <Image
                    source={require("../../assets/images/youtube.png")}
                    style={styles.socialIcon}
                  />

                  <Image
                    source={require("../../assets/images/tiktok.png")}
                    style={styles.socialIcon}
                  />

                  <Image
                    source={require("../../assets/images/linkedin.png")}
                    style={styles.socialIcon}
                  />
                </View>
              </View>
            </View>

            {/* DESCRIPTION */}
            <Text style={styles.companyDescription}>
              {campaign.description}
            </Text>

            {/* APPLIED */}
            <View style={styles.appliedRow}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar} />

                <View style={[styles.avatar, styles.avatarOverlap]} />

                <View style={[styles.avatar, styles.avatarOverlap]} />

                <View style={styles.plusAvatar}>
                  <Text style={styles.plusText}>+24</Text>
                </View>
              </View>

              <Text style={styles.appliedText}>
                {campaign.appliedCount} APPLIED
              </Text>
            </View>

            {/* BUDGET */}
            <View style={styles.infoRow}>
              <View>
                <Text style={styles.infoLabel}>BUDGET RANGE</Text>

                <Text style={styles.budgetText}>{campaign.budget}</Text>
              </View>

              <View>
                <Text style={styles.infoLabel}>DEADLINE</Text>

                <Text style={styles.deadlineText}>{campaign.deadline}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* REQUIREMENTS */}
            <View style={styles.requirementHeader}>
              <Image
                source={require("../../assets/images/shield.png")}
                style={styles.infoImage}
              />

              <Text style={styles.requirementTitle}>Campaign Requirements</Text>
            </View>

            <View style={styles.requirementSingleCard}>
              <View style={styles.requirementItem}>
                <Text style={styles.reqHeading}>MIN. FOLLOWERS</Text>

                <Text style={styles.reqValue}>
                  {campaign.requirements.minFollowers}
                </Text>
              </View>

              <View style={styles.requirementItem}>
                <Text style={styles.reqHeading}>MIN. ENGAGEMENT</Text>

                <Text style={styles.reqValue}>
                  {campaign.requirements.minEngagement}
                </Text>
              </View>
            </View>

            {
  expandedCard !== campaignIndex && (
    <GradientButton
      title="View"
      style={styles.viewButton}
      textStyle={{
        fontSize:
          moderateScale(18),
        fontWeight:
          "bold",
      }}
      onPress={() =>
        setExpandedCard(
          campaignIndex
        )
      }
    />
  )
}
            {expandedCard === campaignIndex && (
              <>
                <View style={styles.divider} />

                {/* TARGET AUDIENCE */}
                <Text style={styles.targetTitle}>Target Audience</Text>

                <Text
                  style={styles.targetText}
                  numberOfLines={expanded ? undefined : 3}
                >
                  {campaign.targetAudience}
                </Text>

                <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                  <Text style={styles.readMore}>
                    {expanded ? "Show less" : "Read more..."}
                  </Text>
                </TouchableOpacity>

                {/* CATEGORIES */}
                <View style={styles.categoryCard}>
                  <Text style={styles.categoryTitle}>Campaign Categories</Text>

                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      rowGap: verticalScale(12),
                    }}
                  >
                    {campaign.campaignCategories?.map((item, index) => (
                      <View key={index} style={styles.categoryBox}>
                        <Text style={styles.categoryText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.divider} />

                {/* DELIVERABLES */}
                <View style={styles.deliverableCard}>
                  <Text style={styles.deliverableTitle}>Deliverables</Text>

                  {campaign.deliverables?.map((item, index) => (
                    <View key={index} style={styles.deliverableRow}>
                      <Image
                        source={require("../../assets/images/checkbox.png")}
                        style={styles.deliverableIcon}
                      />

                      <Text style={styles.deliverableText}>{item}</Text>
                    </View>
                  ))}
                </View>

                <GradientButton
                  title="Apply Now"
                  style={styles.applyButton}
                  textStyle={{
                    fontSize: moderateScale(20),
                    fontWeight: "bold",
                  }}
                  onPress={() => navigation.navigate("ApplyCampaign" as never)}
                />
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
