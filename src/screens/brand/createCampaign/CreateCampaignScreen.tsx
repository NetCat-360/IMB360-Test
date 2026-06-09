import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";

import ScreenHeader from "../../../components/ScreenHeader";

import { moderateScale, scale, verticalScale } from "../../../utils/scaling";

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

export default function CreateCampaignScreen() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {
    currentStep,
    campaignName,
    campaignType,
    description,
    brandName,
    industry,
    showCampaignDropdown,
    showPlatformDropdown,

    targetPlatform,
    selectedContentTypes,
    campaignTags,
    // STEP 3
    budget,
    budgetType,
    startDate,
    endDate,
    campaignTimeline,
    showBudgetTypeDropdown,
    showTimelineDropdown,

    minFollowers,
    engagementRate,
    targetAudience,
    brandGuidelines,
    expectedDeliverables,
    requireApproval,
    requireExclusivity,
    showFollowersDropdown,
  } = useSelector((state: any) => state.createCampaign);
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

  const renderStepOne = () => (
    <>
      <Text style={styles.sectionTitle}>Campaign Basic Information</Text>

      {/* Campaign Name */}
      <Text style={styles.label}>
        Campaign Name
        <Text style={styles.required}> *</Text>
      </Text>

      <TextInput
        style={styles.input}
        value={campaignName}
        onChangeText={(text) => dispatch(setCampaignName(text))}
      />

      {/* Campaign Type */}
      <Text style={styles.label}>
        Campaign Type
        <Text style={styles.required}> *</Text>
      </Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => dispatch(toggleCampaignDropdown())}
      >
        <Text style={campaignType ? styles.selectedText : styles.placeholder}>
          {campaignType || "Select Campaign Type"}
        </Text>

        <Text style={styles.dropdownArrow}>⌄</Text>
      </TouchableOpacity>

      {showCampaignDropdown && (
        <View style={styles.campaignDropdown}>
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
            {Object.entries(campaignTypes).map(([category, items]) => (
              <View key={category}>
                <Text style={styles.categoryHeading}>{category}</Text>

                {items.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      dispatch(setCampaignType(item as CampaignType));

                      dispatch(closeCampaignDropdown());
                    }}
                  >
                    <Text style={styles.campaignItem}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Description */}
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

      {/* Row */}
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
  const renderStepTwo = () => (
    <>
      {/* TARGET PLATFORM */}
      <Text style={styles.sectionTitle}>
        Target Platforms
        <Text style={styles.required}> *</Text>
      </Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => dispatch(togglePlatformDropdown())}
      >
        <Text style={targetPlatform ? styles.selectedText : styles.placeholder}>
          {targetPlatform || "Select a platform"}
        </Text>

        <Text style={styles.dropdownArrow}>⌄</Text>
      </TouchableOpacity>

      {showPlatformDropdown && (
        <View style={styles.platformDropdown}>
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
            {platforms.map((platform) => (
              <TouchableOpacity
                key={platform}
                onPress={() => {
                  dispatch(setTargetPlatform(platform));

                  dispatch(closePlatformDropdown());
                }}
              >
                <Text style={styles.platformItem}>{platform}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* CONTENT TYPES */}
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
        <TouchableOpacity
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
        </TouchableOpacity>
      ))}

      {/* CAMPAIGN TAGS */}
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
  const formatDate = (text: string) => {
    const cleaned = text.replace(/\D/g, "");

    const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,2})$/);

    if (!match) return text;

    return [match[1], match[2], match[3]].filter(Boolean).join("/");
  };

  const renderStepThree = () => (
    <>
      <Text style={styles.sectionTitle}>Budget Details</Text>

      {/* Budget */}
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

      {/* Budget Type */}
      <Text style={styles.label}>Budget Type</Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => dispatch(toggleBudgetTypeDropdown())}
      >
        <Text style={budgetType ? styles.selectedText : styles.placeholder}>
          {budgetType || "Select budget type"}
        </Text>

        <Text style={styles.dropdownArrow}>⌄</Text>
      </TouchableOpacity>

      {showBudgetTypeDropdown && (
        <View style={styles.platformDropdown}>
          {budgetTypes.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                dispatch(setBudgetType(item));

                dispatch(closeBudgetTypeDropdown());
              }}
            >
              <Text style={styles.platformItem}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Dates */}
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

      {/* Timeline */}
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

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => dispatch(toggleTimelineDropdown())}
      >
        <Text
          style={campaignTimeline ? styles.selectedText : styles.placeholder}
        >
          {campaignTimeline || "Select timeline"}
        </Text>

        <Text style={styles.dropdownArrow}>⌄</Text>
      </TouchableOpacity>

      {showTimelineDropdown && (
        <View style={styles.platformDropdown}>
          {timelineOptions.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                dispatch(setCampaignTimeline(item));

                dispatch(closeTimelineDropdown());
              }}
            >
              <Text style={styles.platformItem}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
  const renderStepFour = () => (
    <>
      <Text style={styles.sectionTitle}>
        Influencer Requirements & Guideline
      </Text>

      {/* MIN FOLLOWERS */}
      <Text style={styles.label}>
        Min. Followers
        <Text style={styles.required}> *</Text>
      </Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => dispatch(toggleFollowersDropdown())}
      >
        <Text style={styles.selectedText}>{minFollowers}</Text>

        <Text style={styles.dropdownArrow}>⌄</Text>
      </TouchableOpacity>

      {showFollowersDropdown && (
        <View style={styles.platformDropdown}>
          {["1K+", "5K+", "10K+", "25K+", "50K+", "100K+", "500K+", "1M+"].map(
            (item) => (
              <TouchableOpacity
                key={item}
                onPress={() => dispatch(setMinFollowers(item))}
              >
                <Text style={styles.platformItem}>{item}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
      )}

      {/* ENGAGEMENT RATE */}
      <Text style={styles.label}>
        Min. Engagement Rate %<Text style={styles.required}> *</Text>
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={engagementRate}
        onChangeText={(text) => dispatch(setEngagementRate(text))}
      />

      {/* TARGET AUDIENCE */}
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

      {/* BRAND GUIDELINES */}
      <Text style={styles.label}>Brand Guidelines & Requirements</Text>

      <View style={styles.descriptionContainer}>
        <TextInput
          style={styles.descriptionInput}
          multiline
          maxLength={100}
          value={brandGuidelines}
          placeholder="Provide specific guidelines, do’s and don’ts, hashtags to use, mentions required, etc..."
          placeholderTextColor="#9A9A9A"
          onChangeText={(text) => dispatch(setBrandGuidelines(text))}
        />

        <Text style={styles.characterCount}>
          {brandGuidelines.length}
          /100
        </Text>
      </View>

      {/* DELIVERABLES */}
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

      {/* CHECKBOXES */}
      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => dispatch(toggleRequireApproval())}
      >
        <View style={[styles.checkbox, requireApproval && styles.checkedBox]} />

        <Text style={styles.checkboxTitle}>
          Require content approval before posting
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => dispatch(toggleRequireExclusivity())}
      >
        <View
          style={[styles.checkbox, requireExclusivity && styles.checkedBox]}
        />

        <Text style={styles.checkboxTitle}>
          Require exclusivity (no competing brands)
        </Text>
      </TouchableOpacity>

      <Text style={styles.tagHelper}>
        * A charge of 20 points will be automatically deducted from your balance
        for campaign creation.
      </Text>
    </>
  );
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
        <Text style={styles.subtitle}>
          Launch your next influencer marketing campaign
        </Text>

        {/* Stepper */}
        <View style={styles.stepperRow}>
          {[1, 2, 3, 4].map((step) => (
            <React.Fragment key={step}>
              <View
                style={[
                  styles.stepCircle,

                  currentStep >= step && styles.activeStep,
                ]}
              >
                <Text style={styles.stepText}>{step}</Text>
              </View>

              {step !== 4 && <View style={styles.line} />}
            </React.Fragment>
          ))}
        </View>

        {currentStep === 1 && renderStepOne()}

        {currentStep === 2 && renderStepTwo()}

        {currentStep === 3 && renderStepThree()}

        {currentStep === 4 && renderStepFour()}

        <View style={styles.buttonRow}>
          {currentStep > 1 && (
            <TouchableOpacity
              style={styles.previousButton}
              onPress={() => dispatch(previousStep())}
            >
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => dispatch(nextStep())}
          >
            <Text style={styles.buttonText}>
              {currentStep === 4 ? "Submit" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  scrollContent: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(40),
  },

  subtitle: {
    color: "#A0A0A0",
    fontSize: moderateScale(14),
    marginTop: verticalScale(20),
    textAlign: "center",
  },

  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(24),
  },

  stepCircle: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(29),
    borderWidth: 1,
    borderColor: "#0ECBE6",
    justifyContent: "center",
    alignItems: "center",
  },

  activeStep: {
    backgroundColor: "#0ECBE6",
  },

  stepText: {
    color: "#FFF",
    fontSize: moderateScale(22),
    fontWeight: "600",
  },

  line: {
    height: 1,
    width: scale(35),
    backgroundColor: "#FFF",
  },

  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    color: "#FFF",
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },

  label: {
    color: "#FFF",
    fontSize: moderateScale(16),
    fontWeight: "600",
    marginTop: verticalScale(14),
    marginBottom: verticalScale(8),
  },

  required: {
    color: "red",
  },

  input: {
    height: verticalScale(40),
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#0ECBE6",
    paddingHorizontal: 16,
    color: "#FFF",
    backgroundColor: "#2A272B",
  },

  dropdown: {
    height: verticalScale(40),
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#0ECBE6",
    backgroundColor: "#2A272B",
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  campaignDropdown: {
    marginTop: verticalScale(8),
    borderWidth: 1,
    borderColor: "#0ECBE6",
    borderRadius: moderateScale(14),
    backgroundColor: "#2A272B",
    maxHeight: verticalScale(280),
    overflow: "hidden",
  },

  categoryHeading: {
    color: "#0ECBE6",
    fontSize: moderateScale(13),
    fontWeight: "700",
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(8),
  },

  campaignItem: {
    color: "#FFF",
    fontSize: moderateScale(15),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(18),
    borderBottomWidth: 1,
    borderBottomColor: "#3A3A3A",
  },

  selectedText: {
    color: "#FFF",
    fontSize: moderateScale(15),
  },

  placeholder: {
    color: "#9A9A9A",
  },

  dropdownArrow: {
    color: "#FFF",
    fontSize: 20,
  },

  descriptionContainer: {
    height: verticalScale(100),
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#0ECBE6",
    backgroundColor: "#2A272B",
    padding: 8,
  },

  descriptionInput: {
    flex: 1,
    color: "#FFF",
    textAlignVertical: "top",
  },

  characterCount: {
    color: "red",
    alignSelf: "flex-end",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  halfWidth: {
    width: "48%",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(30),
  },

  previousButton: {
    backgroundColor: "#808080",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 14,
  },

  nextButton: {
    backgroundColor: "#0ECBE6",
    paddingHorizontal: 50,
    paddingVertical: 14,
    borderRadius: 14,
    marginLeft: "auto",
  },

  buttonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: verticalScale(10),
  },

  checkbox: {
    width: scale(20),
    height: scale(20),
    borderWidth: 1,
    borderColor: "#A0A0A0",
    marginTop: 4,
  },

  checkedBox: {
    backgroundColor: "#0ECBE6",
    borderColor: "#0ECBE6",
  },

  checkboxTextContainer: {
    marginLeft: scale(16),
    flex: 1,
  },

  checkboxTitle: {
    color: "#FFF",
    fontSize: moderateScale(17),
    fontWeight: "600",
    marginLeft: verticalScale(10),
  },

  checkboxDesc: {
    color: "#8A8A8A",
    fontSize: moderateScale(14),
    marginTop: 2,
  },

  tagHelper: {
    color: "#8A8A8A",
    fontSize: moderateScale(13),
    marginTop: verticalScale(8),
  },
  platformDropdown: {
    marginTop: verticalScale(1),

    borderWidth: 1,
    borderColor: "#0ECBE6",

    borderRadius: moderateScale(14),

    backgroundColor: "#2A272B",

    maxHeight: verticalScale(400),

    overflow: "hidden",
  },

  platformItem: {
    color: "#FFF",

    fontSize: moderateScale(15),

    paddingVertical: verticalScale(10),

    paddingHorizontal: scale(18),

    borderBottomWidth: 1,

    borderBottomColor: "#3A3A3A",
  },
});
