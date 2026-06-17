import React, { useCallback, useMemo } from "react";

import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";

import ScreenHeader from "../../../components/ScreenHeader";

import { moderateScale, scale, verticalScale } from "../../../utils/scaling";
import styles from "./styles";

import {
  nextStep,
  previousStep,
  setCampaignName,
  setCampaignType,
  setDescription,
  setBrandName,
  setIndustry,
  toggleCampaignDropdown,
  closeCampaignDropdown,
  setTargetPlatform,
  toggleContentType,
  setCampaignTags,
  togglePlatformDropdown,
  closePlatformDropdown,

  // STEP 3
  setBudget,
  setBudgetType,
  setStartDate,
  setEndDate,
  setCampaignTimeline,
  toggleBudgetTypeDropdown,
  closeBudgetTypeDropdown,
  toggleTimelineDropdown,
  closeTimelineDropdown,
  setMinFollowers,
  setEngagementRate,
  setTargetAudience,
  setBrandGuidelines,
  setExpectedDeliverables,
  toggleRequireApproval,
  toggleRequireExclusivity,
  toggleFollowersDropdown,
} from "../../../store/slices/Brand/createCampaignSlice";

import type { CampaignType } from "../../../store/slices/Brand/createCampaignSlice";

const platforms = [
  "Instagram",
  "Facebook",
  "Youtube",
  "TikTok",
  "Snapchat",
  "LinkedIn",
  "Twitter",
  "Telegram",
  "WhatsApp",
  "Quora",
  "Reddit",
  "Discord",
  "WeChat",
  "Weibo",
  "Kuaishou",
  "Douyin",
  "VK (VKontakte)",
  "Threads",
  "Tumblr",
  "Medium",
  "QQ",
  "Messenger",
  "Twitch",
  "Bilibili",
  "Clubhouse",
  "YouNow",
  "Vimeo",
  "SoundCloud",
  "Spotify",
  "Zalo",
  "Mastodon",
  "Xiaohongshu",
  "Bluesky",
  "GitHub",
  "Unknown",
];

const campaignTypes = {
  "AWARENESS CAMPAIGNS": [
    "Brand Awareness",
    "Brand Positioning",
    "Rebranding",
  ],

  "PRODUCT CAMPAIGNS": ["Product Launch", "Product Review", "Product Demo"],

  "PROMOTIONAL CAMPAIGNS": [
    "Seasonal Campaigns",
    "Discount/Sale",
    "Contest/Giveaway",
    "Flash Sale",
  ],

  "EVENT CAMPAIGNS": ["Event Promotion", "Webinar", "Trade Show"],

  "ENGAGEMENT CAMPAIGNS": [
    "Brand Ambassador",
    "Influencer Marketing",
    "User-Generated Content",
  ],

  "CONVERSION CAMPAIGNS": [
    "Lead Generation",
    "Retargeting",
    "Email Marketing",
  ],

  "CUSTOMER MARKETING": ["Customer Retention", "Win-back", "Loyalty Program"],

  "CONTENT MARKETING": ["Video Marketing", "Blog Series", "Case Study"],

  "SPECIALITY CAMPAIGNS": [
    "CSR/Cause Marketing",
    "Partnership Announcement",
    "Crisis Management",
  ],
};

const budgetTypes = ["Total Campaign Budget", "Per Influencer Budget"];

const timelineOptions = [
  "Flexible",
  "Urgent (1-2 weeks)",
  "Standard (2-4 weeks)",
  "Extended (1-3 months)",
];

const formatDate = (text: string) => {
  const cleaned = text.replace(/\D/g, "");

  const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,2})$/);

  if (!match) return text;

  return [match[1], match[2], match[3]].filter(Boolean).join("/");
};

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <View style={styles.stepperRow}>
      {[1, 2, 3, 4].map((step) => (
        <React.Fragment key={step}>
          <View style={[styles.stepCircle, currentStep >= step && styles.activeStep]}>
            <Text style={styles.stepText}>{step}</Text>
          </View>
          {step !== 4 && <View style={styles.line} />}
        </React.Fragment>
      ))}
    </View>
  );
}

function StepNavigation({ currentStep, onPrevious, onNext }: { currentStep: number; onPrevious: () => void; onNext: () => void }) {
  return (
    <View style={styles.buttonRow}>
      {currentStep > 1 && (
        <Pressable style={styles.previousButton} onPress={onPrevious}>
          <Text style={styles.buttonText}>Previous</Text>
        </Pressable>
      )}
      <Pressable style={styles.nextButton} onPress={onNext}>
        <Text style={styles.buttonText}>{currentStep === 4 ? "Submit" : "Next"}</Text>
      </Pressable>
    </View>
  );
}

function StepOneContent() {
  const dispatch = useDispatch();
  const { campaignName, campaignType, description, brandName, industry, showCampaignDropdown } = useSelector((state: any) => state.createCampaign);

  const campaignTypeOptions = useMemo(() =>
    Object.entries(campaignTypes).flatMap(([category, items]) => [
      { type: 'header' as const, category },
      ...items.map(item => ({ type: 'item' as const, item })),
    ]),
  []);

  const handleCampaignTypePress = useCallback((type: CampaignType) => {
    dispatch(setCampaignType(type));
    dispatch(closeCampaignDropdown());
  }, [dispatch]);

  const renderCampaignTypeItem = useCallback(({ item }: { item: { type: 'header' | 'item'; category?: string; item?: string } }) => {
    if (item.type === 'header') {
      return <Text style={styles.categoryHeading}>{item.category}</Text>;
    }
    return (
      <Pressable onPress={() => handleCampaignTypePress(item.item as CampaignType)}>
        <Text style={styles.campaignItem}>{item.item}</Text>
      </Pressable>
    );
  }, [handleCampaignTypePress]);

  return (
    <>
      <Text style={styles.sectionTitle}>Campaign Basic Information</Text>

      <Text style={styles.label}>
        Campaign Name
        <Text style={styles.required}> *</Text>
      </Text>

      <TextInput
        style={styles.input}
        value={campaignName}
        onChangeText={(text) => dispatch(setCampaignName(text))}
      />

      <Text style={styles.label}>
        Campaign Type
        <Text style={styles.required}> *</Text>
      </Text>

      <Pressable
        style={styles.dropdown}
        onPress={() => dispatch(toggleCampaignDropdown())}
      >
        <Text style={campaignType ? styles.selectedText : styles.placeholder}>
          {campaignType || "Select Campaign Type"}
        </Text>

        <Text style={styles.dropdownArrow}>⌄</Text>
      </Pressable>

      {showCampaignDropdown && (
        <View style={styles.campaignDropdown}>
          <FlatList
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            data={campaignTypeOptions}
            keyExtractor={(item, index) => item.type === 'header' ? `header-${item.category}` : `item-${item.item}`}
            renderItem={renderCampaignTypeItem}
          />
        </View>
      )}

      <Text style={styles.label}>
        Campaign Description
        <Text style={styles.required}> *</Text>
      </Text>

      <View style={styles.descriptionContainer}>
        <TextInput
          style={styles.descriptionInput}
          multiline
          placeholder="Describe your campaign objectives, target audience and key messages..."
          placeholderTextColor="#9A9A9A"
          value={description}
          onChangeText={(text) => dispatch(setDescription(text))}
          maxLength={100}
        />

        <Text style={styles.characterCount}>
          {description.length}
          /100
        </Text>
      </View>

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>
            Brand Name
            <Text style={styles.required}> *</Text>
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Your Brand Name"
            placeholderTextColor="#9A9A9A"
            value={brandName}
            onChangeText={(text) => dispatch(setBrandName(text))}
          />
        </View>

        <View style={styles.halfWidth}>
          <Text style={styles.label}>Industry</Text>

          <TextInput
            style={styles.input}
            placeholder="Select Industry"
            placeholderTextColor="#9A9A9A"
            value={industry}
            onChangeText={(text) => dispatch(setIndustry(text))}
          />
        </View>
      </View>
    </>
  );
}

function StepTwoContent() {
  const dispatch = useDispatch();
  const { targetPlatform, showPlatformDropdown, selectedContentTypes, campaignTags } = useSelector((state: any) => state.createCampaign);

  const handleTargetPlatformPress = useCallback((platform: string) => {
    dispatch(setTargetPlatform(platform));
    dispatch(closePlatformDropdown());
  }, [dispatch]);

  const renderPlatformItem = useCallback(({ item }: { item: string }) => (
    <Pressable onPress={() => handleTargetPlatformPress(item)}>
      <Text style={styles.platformItem}>{item}</Text>
    </Pressable>
  ), [handleTargetPlatformPress]);

  return (
    <>
      <Text style={styles.sectionTitle}>
        Target Platforms
        <Text style={styles.required}> *</Text>
      </Text>

      <Pressable
        style={styles.dropdown}
        onPress={() => dispatch(togglePlatformDropdown())}
      >
        <Text style={targetPlatform ? styles.selectedText : styles.placeholder}>
          {targetPlatform || "Select a platform"}
        </Text>

        <Text style={styles.dropdownArrow}>⌄</Text>
      </Pressable>

      {showPlatformDropdown && (
        <View style={styles.platformDropdown}>
          <FlatList
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            data={platforms}
            keyExtractor={(item) => item}
            renderItem={renderPlatformItem}
          />
        </View>
      )}

      <Text
        style={[
          styles.sectionTitle,
          {
            marginTop: verticalScale(22),
          },
        ]}
      >
        Content Types
        <Text style={styles.required}> *</Text>
      </Text>

      {[
        {
          title: "Social Media Post",
          desc: "Single post on social media platforms",
        },
        {
          title: "Stories",
          desc: "Instagram/Facebook stories",
        },
        {
          title: "Video Content",
          desc: "YouTube videos, TikTok videos, Reels",
        },
        {
          title: "Blog Post",
          desc: "Written content and articles",
        },
        {
          title: "Live Stream",
          desc: "Live streaming content",
        },
        {
          title: "User Generated Content",
          desc: "Content created by users",
        },
      ].map((item) => (
        <Pressable
          key={item.title}
          style={styles.checkboxRow}
          onPress={() => dispatch(toggleContentType(item.title))}
        >
          <View
            style={[
              styles.checkbox,

              selectedContentTypes.includes(item.title) && styles.checkedBox,
            ]}
          />

          <View style={styles.checkboxTextContainer}>
            <Text style={styles.checkboxTitle}>{item.title}</Text>

            <Text style={styles.checkboxDesc}>{item.desc}</Text>
          </View>
        </Pressable>
      ))}

      <Text
        style={[
          styles.sectionTitle,
          {
            marginTop: verticalScale(20),
          },
        ]}
      >
        Campaign Tags
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Add tags (e.g., #summer #fashion)"
        placeholderTextColor="#9A9A9A"
        value={campaignTags}
        onChangeText={(text) => dispatch(setCampaignTags(text))}
      />

      <Text style={styles.tagHelper}>
        You can enter hashtags with # or without #
      </Text>
    </>
  );
}

function StepThreeContent() {
  const dispatch = useDispatch();
  const { budget, budgetType, showBudgetTypeDropdown, showTimelineDropdown, startDate, endDate, campaignTimeline } = useSelector((state: any) => state.createCampaign);

  return (
    <>
      <Text style={styles.sectionTitle}>Budget Details</Text>

      <Text style={styles.label}>
        Budget
        <Text style={styles.required}> *</Text>
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="₹ Enter budget"
        placeholderTextColor="#9A9A9A"
        value={budget}
        onChangeText={(text) => dispatch(setBudget(text))}
      />

      <Text style={styles.label}>Budget Type</Text>

      <Pressable
        style={styles.dropdown}
        onPress={() => dispatch(toggleBudgetTypeDropdown())}
      >
        <Text style={budgetType ? styles.selectedText : styles.placeholder}>
          {budgetType || "Select budget type"}
        </Text>

        <Text style={styles.dropdownArrow}>⌄</Text>
      </Pressable>

      {showBudgetTypeDropdown && (
        <View style={styles.platformDropdown}>
          {budgetTypes.map((item) => (
            <Pressable
              key={item}
              onPress={() => {
                dispatch(setBudgetType(item));

                dispatch(closeBudgetTypeDropdown());
              }}
            >
              <Text style={styles.platformItem}>{item}</Text>
            </Pressable>
          ))}
        </View>
      )}

      <View
        style={[
          styles.row,
          {
            marginTop: verticalScale(10),
          },
        ]}
      >
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Start Date</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="DD/MM/YY"
            placeholderTextColor="#9A9A9A"
            maxLength={8}
            value={startDate}
            onChangeText={(text) => dispatch(setStartDate(formatDate(text)))}
          />
        </View>

        <View style={styles.halfWidth}>
          <Text style={styles.label}>End Date</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="DD/MM/YY"
            placeholderTextColor="#9A9A9A"
            maxLength={8}
            value={endDate}
            onChangeText={(text) => dispatch(setEndDate(formatDate(text)))}
          />
        </View>
      </View>

      <Text
        style={[
          styles.label,
          {
            marginTop: verticalScale(20),
          },
        ]}
      >
        Campaign Timeline
      </Text>

      <Pressable
        style={styles.dropdown}
        onPress={() => dispatch(toggleTimelineDropdown())}
      >
        <Text
          style={campaignTimeline ? styles.selectedText : styles.placeholder}
        >
          {campaignTimeline || "Select timeline"}
        </Text>

        <Text style={styles.dropdownArrow}>⌄</Text>
      </Pressable>

      {showTimelineDropdown && (
        <View style={styles.platformDropdown}>
          {timelineOptions.map((item) => (
            <Pressable
              key={item}
              onPress={() => {
                dispatch(setCampaignTimeline(item));

                dispatch(closeTimelineDropdown());
              }}
            >
              <Text style={styles.platformItem}>{item}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </>
  );
}

function StepFourContent() {
  const dispatch = useDispatch();
  const { minFollowers, showFollowersDropdown, engagementRate, targetAudience, brandGuidelines, expectedDeliverables, requireApproval, requireExclusivity } = useSelector((state: any) => state.createCampaign);

  return (
    <>
      <Text style={styles.sectionTitle}>
        Influencer Requirements & Guideline
      </Text>

      <Text style={styles.label}>
        Min. Followers
        <Text style={styles.required}> *</Text>
      </Text>

      <Pressable
        style={styles.dropdown}
        onPress={() => dispatch(toggleFollowersDropdown())}
      >
        <Text style={styles.selectedText}>{minFollowers}</Text>

        <Text style={styles.dropdownArrow}>⌄</Text>
      </Pressable>

      {showFollowersDropdown && (
        <View style={styles.platformDropdown}>
          {["1K+", "5K+", "10K+", "25K+", "50K+", "100K+", "500K+", "1M+"].map(
            (item) => (
              <Pressable
                key={item}
                onPress={() => dispatch(setMinFollowers(item))}
              >
                <Text style={styles.platformItem}>{item}</Text>
              </Pressable>
            )
          )}
        </View>
      )}

      <Text style={styles.label}>
        Min. Engagement Rate %<Text style={styles.required}> *</Text>
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={engagementRate}
        onChangeText={(text) => dispatch(setEngagementRate(text))}
      />

      <Text style={styles.label}>Target Audience</Text>

      <View style={styles.descriptionContainer}>
        <TextInput
          style={styles.descriptionInput}
          multiline
          maxLength={100}
          value={targetAudience}
          placeholder="Describe your target audience demographics, interests, and characteristics..."
          placeholderTextColor="#9A9A9A"
          onChangeText={(text) => dispatch(setTargetAudience(text))}
        />

        <Text style={styles.characterCount}>
          {targetAudience.length}
          /100
        </Text>
      </View>

      <Text style={styles.label}>Brand Guidelines & Requirements</Text>

      <View style={styles.descriptionContainer}>
        <TextInput
          style={styles.descriptionInput}
          multiline
          maxLength={100}
          value={brandGuidelines}
          placeholder="Provide specific guidelines, do's and don'ts, hashtags to use, mentions required, etc..."
          placeholderTextColor="#9A9A9A"
          onChangeText={(text) => dispatch(setBrandGuidelines(text))}
        />

        <Text style={styles.characterCount}>
          {brandGuidelines.length}
          /100
        </Text>
      </View>

      <Text style={styles.label}>Expected Deliverables</Text>

      <View style={styles.descriptionContainer}>
        <TextInput
          style={styles.descriptionInput}
          multiline
          maxLength={100}
          value={expectedDeliverables}
          placeholder="List expected deliverables expected from influencers (e.g., 1 Instagram post, 3 stories, 1 YouTube video)..."
          placeholderTextColor="#9A9A9A"
          onChangeText={(text) => dispatch(setExpectedDeliverables(text))}
        />

        <Text style={styles.characterCount}>
          {expectedDeliverables.length}
          /100
        </Text>
      </View>

      <Pressable
        style={styles.checkboxRow}
        onPress={() => dispatch(toggleRequireApproval())}
      >
        <View style={[styles.checkbox, requireApproval && styles.checkedBox]} />

        <Text style={styles.checkboxTitle}>
          Require content approval before posting
        </Text>
      </Pressable>

      <Pressable
        style={styles.checkboxRow}
        onPress={() => dispatch(toggleRequireExclusivity())}
      >
        <View
          style={[styles.checkbox, requireExclusivity && styles.checkedBox]}
        />

        <Text style={styles.checkboxTitle}>
          Require exclusivity (no competing brands)
        </Text>
      </Pressable>

      <Text style={styles.tagHelper}>
        * A charge of 20 points will be automatically deducted from your balance
        for campaign creation.
      </Text>
    </>
  );
}

export default function CreateCampaignScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { currentStep } = useSelector((state: any) => state.createCampaign);

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScreenHeader
        title="Create Campaign"
        onBack={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>Launch your next influencer marketing campaign</Text>
        <Stepper currentStep={currentStep} />
        {currentStep === 1 && <StepOneContent />}
        {currentStep === 2 && <StepTwoContent />}
        {currentStep === 3 && <StepThreeContent />}
        {currentStep === 4 && <StepFourContent />}
        <StepNavigation currentStep={currentStep} onPrevious={() => dispatch(previousStep())} onNext={() => dispatch(nextStep())} />
      </ScrollView>
    </SafeAreaView>
  );
}



