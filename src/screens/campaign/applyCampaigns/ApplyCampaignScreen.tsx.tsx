import React, {useState} from "react";
import {
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  View,
  Image,
  TouchableOpacity
} from "react-native";

import GradientButton from "../../../components/GradientButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { AppNavigationProp }

from "../../../types/navigation";

type Props = {
  navigation:
    AppNavigationProp<"AddAssets">;
};

import {
    scale,
    moderateScale
  } from "../../../utils/scaling";

import { RootState } from "../../../store/store";
import { Colors } from "../../../config/theme";

import AppHeader from "../../../components/AppHeader";
import styles from "./ApplyCampaignStyles";


export default function ApplyCampaignScreen() {
    const [agreed,
        setAgreed] =
        useState(false);
  const campaign = useSelector(
    (state: RootState) =>
      state.campaign.campaign
  );
  const [uploadedFiles,
    setUploadedFiles] =
    useState<any[]>([]);

    const handleChooseFiles =
() => {
  setUploadedFiles([
    {
      name:
        "portfolio-video.mp4",
    },
    {
      name:
        "brand-work.jpg",
    },
  ]);
  
};
  return (
    <SafeAreaView
      style={styles.container}
      edges={["top"]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={
          Colors.bgBlack
        }
      />

      <AppHeader />

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.scrollContent
        }
      >
        {/* TITLE */}
        <Text style={styles.title}>
          APPLY FOR "
          {campaign?.companyName}"
        </Text>

        {/* INFO CARD */}
        <View style={styles.infoCard}>
          <View style={styles.infoBlock}>
            <Text
              style={
                styles.infoHeading
              }
            >
              BUDGET RANGE
            </Text>

            <Text
              style={
                styles.budgetText
              }
            >
              {campaign?.budget}
            </Text>
          </View>

          <View style={styles.infoBlock}>
            <Text
              style={
                styles.infoHeading
              }
            >
              TIMELINE
            </Text>

            <Text
              style={
                styles.infoText
              }
            >
              {campaign?.timeline}
            </Text>
          </View>

          <View style={styles.infoBlock}>
            <Text
              style={
                styles.infoHeading
              }
            >
              DEADLINE
            </Text>

            <Text
              style={
                styles.infoText
              }
            >
              {campaign?.deadline}
            </Text>
          </View>
        </View>

        {/* RATE + TIMELINE */}
        <View style={styles.row}>
          <View
            style={
              styles.halfWidth
            }
          >
            <Text
              style={
                styles.label
              }
            >
              Proposed Rate (₹)
              <Text
                style={
                  styles.required
                }
              >
                {" "}
                *
              </Text>
            </Text>

            <TextInput
              placeholder="Minimum Value is ₹500"
              placeholderTextColor="#8F8F8F"
              style={styles.input}
            />
          </View>

          <View
            style={
              styles.halfWidth
            }
          >
            <Text
              style={
                styles.label
              }
            >
              Proposed Timeline
              <Text
                style={
                  styles.required
                }
              >
                {" "}
                *
              </Text>
            </Text>

            <TextInput
              placeholder="Select Timeline"
              placeholderTextColor="#8F8F8F"
              style={styles.input}
            />
          </View>
        </View>

        {/* PROPOSAL */}
        <Text
          style={
            styles.sectionTitle
          }
        >
          Campaign Proposal
          <Text
            style={
              styles.required
            }
          >
            {" "}
            *
          </Text>
        </Text>

        <TextInput
          multiline
          textAlignVertical="top"
          placeholder="Describe your creative approach, content ideas, and how you'll deliver value for this campaign..."
          placeholderTextColor="#8F8F8F"
          style={styles.textArea}
        />

        {/* EXPERIENCE */}
        <Text
          style={
            styles.sectionTitle
          }
        >
          Relevant Experience
        </Text>

        <TextInput
          multiline
          textAlignVertical="top"
          placeholder="Share your relevant experience with similar campaigns, brands and content types..."
          placeholderTextColor="#8F8F8F"
          style={
            styles.experienceInput
          }
        />
        {/* PORTFOLIO SAMPLE */}
<Text style={styles.sectionTitle}>
  Portfolio Sample
</Text>

<View style={styles.portfolioBox}>
  {uploadedFiles.length === 0 ? (
    <Text style={styles.portfolioPlaceholder}>
      Upload your best work samples
      (images, videos, or links)
    </Text>
  ) : (
    uploadedFiles.map(
      (file, index) => (
        <View
          key={index}
          style={styles.fileItem}
        >
          <Text
            style={
              styles.fileName
            }
            numberOfLines={1}
          >
            📎 {file.name}
          </Text>
        </View>
      )
    )
  )}

  {/* BUTTON INSIDE BOX */}
  <GradientButton
  title="Choose Files"
  icon={require("../../../assets/images/gallery.png")}
  iconStyle={{
    width: scale(28),
    height: scale(28),
    marginRight: scale(3),
    marginTop: scale(1)
  }}
  style={styles.chooseFileButton}
  textStyle={styles.chooseFileText}
  onPress={handleChooseFiles}
/>
</View>
{/* TERMS & CONDITIONS */}
<TouchableOpacity
  style={styles.termsRow}
  activeOpacity={0.8}
  onPress={() =>
    setAgreed(!agreed)
  }
>
  <View
    style={[
      styles.checkbox,
      agreed &&
        styles.checkedBox,
    ]}
  >
    {agreed && (
      <Text
        style={
          styles.checkmark
        }
      >
        ✓
      </Text>
    )}
  </View>

  <Text style={styles.termsText}>
    I agree to the Terms &
    Conditions. Selection
    isn’t guaranteed.
    <Text
      style={
        styles.redText
      }
    >
      {" "}
      20 points will be
      deducted as an
      application fee.
    </Text>
  </Text>
</TouchableOpacity>

{/* APPLICATION TIPS */}
<View style={styles.tipsCard}>
  <Text
    style={styles.tipsTitle}
  >
    Application Tips
  </Text>

  {[
    "Be specific about your creative approach and content ideas",

    "Include relevant portfolio samples that match the campaign style",

    "Propose a competitive but fair rate within the budget range",

    "Highlight your experience with similar brands or campaigns",
  ].map((tip, index) => (
    <View
      key={index}
      style={styles.tipRow}
    >
      <Image
        source={require("../../../assets/images/checkbox.png")}
        style={styles.tipIcon}
        resizeMode="contain"
      />

      <Text
        style={
          styles.tipText
        }
      >
        {tip}
      </Text>
    </View>
  ))}
</View>

{/* BUTTONS */}
<View style={styles.bottomButtonRow}>
  <TouchableOpacity
    style={
      styles.cancelButton
    }
  >
    <Text
      style={
        styles.cancelText
      }
    >
      Cancel
    </Text>
  </TouchableOpacity>

  <GradientButton
  title="Submit Application"
  style={[
    styles.submitButton,
    !agreed && {
      opacity: 0.5,
    },
  ]}
  textStyle={{
    ...styles.submitText,
    fontSize: moderateScale(15),
  }}
  onPress={() => {
    if (!agreed) return;

    console.log(
      "Application Submitted"
    );
  }}
/>
</View>
      </ScrollView>
    </SafeAreaView>
  );
}