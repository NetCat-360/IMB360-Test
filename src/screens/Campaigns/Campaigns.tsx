import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./CampaignStyles";

import { scale, verticalScale, moderateScale } from "../../utils/scaling";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";

import GradientButton from "../../components/GradientButton";
import { Colors } from "../../config/theme";

export default function Campaigns() {
  const campaign = useSelector((state: RootState) => state.campaign.campaign);
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgBlack} />

      {/* HEADER */}
      <View style={styles.topBar}>
        <Image
          source={require("../../assets/images/IMB360_v2.png")}
          style={styles.topBarLogo}
          resizeMode="contain"
        />

        <View style={styles.topBarActions}>
          <TouchableOpacity style={styles.topBarIcon}>
            <Text style={styles.topBarIconText}>💬</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.topBarIcon}
            onPress={() => navigation.navigate("Settings" as never)}
          >
            <Text style={styles.topBarIconText}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

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

        {/* FILTER HEADER */}
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

        {/* FILTER DROPDOWN */}
        {showFilters && (
          <View style={styles.filterBox}>
            {/* Search */}
            <View style={styles.searchBox}>
              <Image
                source={require("../../assets/images/search.png")}
                style={styles.dropdownIcon}
                resizeMode="contain"
              />

              <Text style={styles.placeholderText}>Search campaign</Text>
            </View>

            {/* Categories */}
            <TouchableOpacity style={styles.dropdownItem}>
              {/* Left Icon */}
              <Image
                source={require("../../assets/images/categories.png")}
                style={styles.dropdownIcon}
                resizeMode="contain"
              />

              {/* Centered Text */}
              <Text style={styles.dropdownText}>All Categories</Text>

              {/* Right Arrow */}
              <Image
                source={require("../../assets/images/downarrow.png")}
                style={styles.downArrow}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Budget */}
            <TouchableOpacity style={styles.dropdownItem}>
              {/* Left Icon */}
              <Image
                source={require("../../assets/images/points.png")}
                style={styles.dropdownIcon}
                resizeMode="contain"
              />

              {/* Centered Text */}
              <Text style={styles.dropdownText}>All Budgets</Text>

              {/* Right Arrow */}
              <Image
                source={require("../../assets/images/downarrow.png")}
                style={styles.downArrow}
                resizeMode="contain"
              />
            </TouchableOpacity>
            {/* Platforms */}
            <TouchableOpacity style={styles.dropdownItem}>
              {/* Left Icon */}
              <Image
                source={require("../../assets/images/platforms.png")}
                style={styles.dropdownIcon}
                resizeMode="contain"
              />

              {/* Centered Text */}
              <Text style={styles.dropdownText}>All Platforms</Text>

              {/* Right Arrow */}
              <Image
                source={require("../../assets/images/downarrow.png")}
                style={styles.downArrow}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Search Button */}
            <GradientButton title="Search" style={styles.searchButton} />
          </View>
        )}

        {/* CARD 1 */}
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.cardHeader}>
            <View style={styles.companyIcon}>
              <Image
                source={require("../../assets/images/icon.png")}
                resizeMode="contain"
              />
            </View>

            <View>
              <Text style={styles.companyName}>{campaign.companyName}</Text>

              <Text style={styles.companySubtext}>{campaign?.companyType}</Text>
            </View>
          </View>

          {/* DESCRIPTION */}
          <Text style={styles.companyDescription}>{campaign?.description}</Text>

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
              {campaign?.appliedCount} APPLIED
            </Text>
          </View>

          <View style={styles.divider} />

          {/* TIMELINE */}
          <View style={styles.infoBlock}>
            <View style={styles.infoIcon}>
              <Image
                source={require("../../assets/images/time.png")}
                style={styles.infoImage}
                resizeMode="contain"
              />
            </View>

            <View>
              <Text style={styles.infoLabel}>TIMELINE</Text>

              <Text style={styles.infoValue}>{campaign?.timeline}</Text>
            </View>
          </View>

          {/* DEADLINE */}
          <View style={styles.infoBlock}>
            <View style={styles.infoIcon}>
              <Image
                source={require("../../assets/images/deadline.png")}
                style={styles.infoImage}
                resizeMode="contain"
              />
            </View>

            <View>
              <Text style={styles.infoLabel}>DEADLINE</Text>

              <Text style={styles.infoValue}>{campaign?.deadline}</Text>
            </View>
          </View>

          {/* BUDGET */}
          <View style={styles.infoBlock}>
            <View style={styles.infoIcon}>
              <Image
                source={require("../../assets/images/budget.png")}
                style={styles.infoImage}
                resizeMode="contain"
              />
            </View>

            <View>
              <Text style={styles.infoLabel}>BUDGET RANGE</Text>

              <Text style={styles.budgetText}>{campaign?.budget}</Text>
            </View>
          </View>
        </View>

        {/* CARD 2 */}
        <View style={styles.card}>
          <View style={styles.requirementHeader}>
            <Image
              source={require("../../assets/images/shield.png")}
              style={styles.infoImage}
              resizeMode="contain"
            />

            <Text style={styles.requirementTitle}>Campaign Requirements</Text>
          </View>

          <View style={styles.requirementRow}>
            <View style={styles.requirementCard}>
              <Text style={styles.reqTop}>MIN.</Text>

              <Text style={styles.reqTop}>FOLLOWERS</Text>

              <Text style={styles.reqValue}>
                {campaign?.requirements?.minFollowers}
              </Text>
            </View>

            <View style={styles.requirementCard}>
              <Text style={styles.reqTop}>MIN.</Text>

              <Text style={styles.reqTop}>ENGAGEMENT</Text>

              <Text style={styles.reqValue}>
                {campaign?.requirements?.minEngagement}
              </Text>
            </View>
          </View>

          <Text style={styles.targetTitle}>Target Audience</Text>

          <Text
            style={styles.targetText}
            numberOfLines={expanded ? undefined : 3}
          >
            {campaign?.targetAudience}
          </Text>
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={styles.readMore}>
              {expanded ? "Show less" : "Read more..."}
            </Text>
          </TouchableOpacity>
          {/* CAMPAIGN CATEGORIES */}

          <View style={styles.categoryCard}>
            <Text style={styles.categoryTitle}>Campaign Categories</Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {campaign?.campaignCategories?.map((item, index) => (
                <View key={index} style={styles.categoryBox}>
                  <Text style={styles.categoryText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* CARD 3 */}
        <View style={styles.card}>
          <Text style={styles.platformTitle}>Eligible Platforms</Text>

          <View style={styles.platformCard}>
            <Image
              source={require("../../assets/images/Instagram.png")}
              style={styles.platformicon}
              resizeMode="contain"
            />
            <Image
              source={require("../../assets/images/facebook.png")}
              style={styles.platformicon}
              resizeMode="contain"
            />

            <Image
              source={require("../../assets/images/youtube.png")}
              style={styles.platformicon}
              resizeMode="contain"
            />

            <Image
              source={require("../../assets/images/tiktok.png")}
              style={styles.platformicon}
              resizeMode="contain"
            />

            <Image
              source={require("../../assets/images/linkedin.png")}
              style={styles.platformicon}
              resizeMode="contain"
            />

            <Image
              source={require("../../assets/images/pinterest.png")}
              style={styles.platformicon}
              resizeMode="contain"
            />

            <Image
              source={require("../../assets/images/telegram.png")}
              style={styles.platformicon}
              resizeMode="contain"
            />

            <Image
              source={require("../../assets/images/whatsapp.png")}
              style={styles.platformicon}
              resizeMode="contain"
            />
          </View>

          {/* DELIVERABLES */}
          <View style={styles.deliverableCard}>
            <Text style={styles.deliverableTitle}>Deliverables</Text>

            {campaign?.deliverables?.map((item, index) => (
              <View key={index} style={styles.deliverableRow}>
                <Image
                  source={require("../../assets/images/checkbox.png")}
                  style={styles.deliverableIcon}
                  resizeMode="contain"
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
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
