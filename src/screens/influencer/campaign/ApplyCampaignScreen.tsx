import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale } from '../../../utils/scaling';
import { Colors } from '../../../config/theme';
import Typography from '../../../styles/typography';
import { CURRENCY } from '../../../config/constants';
import { AppNavigationProp } from '../../../types/navigation';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import styles from './styles';

interface ApplyCampaignScreenProps {
  navigation: AppNavigationProp<'ApplyCampaign'>;
}

export default function ApplyCampaignScreen({ navigation }: ApplyCampaignScreenProps) {
  const [proposalText, setProposalText] = useState<string>('');
  const [experienceText, setExperienceText] = useState<string>('');
  const [rateText, setRateText] = useState<string>('');
  const [timelineText, setTimelineText] = useState<string>('');
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<Asset | null>(null);

  const handleChooseFiles = () => {
    launchImageLibrary(
      { mediaType: 'mixed', selectionLimit: 1 },
      (response) => {
        if (response.assets && response.assets[0]) {
          setSelectedMedia(response.assets[0]);
        }
      },
    );
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSubmitApplication = () => {
    if (isAgreed && proposalText.trim() && rateText.trim() && timelineText.trim()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.applyContainer} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgBlack} />
      
      <View style={styles.applyHeaderBarContainer}>
        <Pressable 
          style={styles.applyBackButtonTouchArea} 
          onPress={handleBackPress}
          hitSlop={8}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Image 
          source={require('../../../assets/images/IMB360_v2.png')} 
          style={styles.applyAppLogoImage}
          resizeMode="contain"
        />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.applyScrollLayoutContent}
      >
        <Text style={[Typography.h2, styles.applyPageTitleText]}>APPLY FOR “WEBHELP365”</Text>

        {/* Updated Meta Header Ribbon based on image_f67584.png */}
        <View style={styles.metaHeaderCardRibbon}>
          <View style={styles.metaRibbonItemColumn}>
            <Text style={[Typography.bodySmall, styles.metaRibbonLabelText]}>BUDGET RANGE</Text>
            <Text style={[Typography.h3, styles.metaRibbonBudgetHighlight]}>{CURRENCY}1.5K - {CURRENCY}4.0K</Text>
          </View>
          <View style={styles.metaRibbonItemColumn}>
            <Text style={[Typography.bodySmall, styles.metaRibbonLabelText]}>TIMELINE</Text>
            <Text style={[Typography.h3, styles.metaRibbonValueText]}>3 Months</Text>
          </View>
          <View style={styles.metaRibbonItemColumn}>
            <Text style={[Typography.bodySmall, styles.metaRibbonLabelText]}>DEADLINE</Text>
            <Text style={[Typography.h3, styles.metaRibbonValueText]}>Oct 15, 2024</Text>
          </View>
        </View>

        <View style={styles.inputPairRowFlexLayout}>
          <View style={styles.halfWidthInputBoxControl}>
            <View style={styles.inputRequiredLabelRow}>
              <Text style={[Typography.bodySmall, styles.inputConfigLabelText]}>Proposed Rate ({CURRENCY})</Text>
              <Text style={styles.inputRequiredIndicatorAsterisk}>*</Text>
            </View>
            <View style={styles.fieldInnerBoxContainerLayout}>
              <TextInput
                style={[Typography.body, styles.fieldTextInputNativePrimitive]}
                placeholder="0.00"
                placeholderTextColor={Colors.textMuted}
                keyboardType="numeric"
                value={rateText}
                onChangeText={setRateText}
              />
            </View>
          </View>

          <View style={styles.halfWidthInputBoxControl}>
            <View style={styles.inputRequiredLabelRow}>
              <Text style={[Typography.bodySmall, styles.inputConfigLabelText]}>Proposed Timeline</Text>
              <Text style={styles.inputRequiredIndicatorAsterisk}>*</Text>
            </View>
            <View style={styles.fieldInnerBoxContainerLayout}>
              <TextInput
                style={[Typography.body, styles.fieldTextInputNativePrimitive]}
                placeholder="e.g. 5 Days"
                placeholderTextColor={Colors.textMuted}
                value={timelineText}
                onChangeText={setTimelineText}
              />
            </View>
          </View>
        </View>

        {/* Campaign Proposal Block */}
        <View style={styles.fullWidthFormSectionBlock}>
          <View style={styles.inputRequiredLabelRow}>
            <Text style={[Typography.bodySmall, styles.inputConfigLabelText]}>Campaign Proposal</Text>
            <Text style={styles.inputRequiredIndicatorAsterisk}>*</Text>
          </View>
          <View style={styles.fieldInnerBoxMultilineHeight}>
            <TextInput
              style={[Typography.body, styles.fieldTextInputNativePrimitive, { height: '100%' }]}
              multiline={true}
              numberOfLines={4}
              placeholder="Describe your creative approach, content ideas, and how you'll deliver value for this campaign..."
              placeholderTextColor={Colors.textMuted}
              value={proposalText}
              onChangeText={setProposalText}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Relevant Experience Block */}
        <View style={styles.fullWidthFormSectionBlock}>
          <View style={styles.inputRequiredLabelRow}>
            <Text style={[Typography.bodySmall, styles.inputConfigLabelText]}>Relevant Experience</Text>
          </View>
          <View style={styles.fieldInnerBoxMultilineHeight}>
            <TextInput
              style={[Typography.body, styles.fieldTextInputNativePrimitive, { height: '100%' }]}
              multiline={true}
              numberOfLines={4}
              placeholder="Share your relevant experience with similar campaigns, brands and content types..."
              placeholderTextColor={Colors.textMuted}
              value={experienceText}
              onChangeText={setExperienceText}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Portfolio Samples Box */}
        <View style={styles.fullWidthFormSectionBlock}>
          <View style={styles.inputRequiredLabelRow}>
            <Text style={[Typography.bodySmall, styles.inputConfigLabelText]}>Portfolio Sample</Text>
          </View>
          <View style={styles.portfolioInnerBoxCanvas}>
            <View style={styles.portfolioPlaceholderContainer}>
              {selectedMedia ? (
                <Text style={[Typography.bodySmall, { color: Colors.textPrimary }]} numberOfLines={2}>
                  {selectedMedia.fileName || 'Selected file'}
                </Text>
              ) : (
                <Text style={[Typography.bodySmall, styles.portfolioPlaceholderInlineText]}>
                  Upload your best work samples (images, videos, or links)
                </Text>
              )}
            </View>
            <Pressable style={styles.chooseFilesTouchButtonAnchor} onPress={handleChooseFiles}>
              <LinearGradient
                colors={['#0097B2', '#7ED957']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.chooseFilesGradientLayout}
              >
                <Ionicons name="images-outline" size={16} color={Colors.bgBlack} style={styles.chooseFilesIconSpacing} />
                <Text style={[Typography.buttonSecondary, styles.chooseFilesLabelText]}>Choose Files</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>

        {/* Checkbox Layout */}
        <View style={styles.legalTncValidationRow}>
          <Pressable 
            style={[styles.checkboxTickBoxShell, isAgreed && styles.checkboxTickBoxActive]}
            onPress={() => setIsAgreed(!isAgreed)}
          >
            {isAgreed && <Ionicons name="checkmark" size={12} color={Colors.bgBlack} />}
          </Pressable>
          <Text style={[Typography.bodySmall, styles.legalParagraphWrapText]}>
            I agree to the Terms & Conditions. Selection isn’t guaranteed. 20 points will be deducted as an application fee.
          </Text>
        </View>

        <View style={styles.tipsCanvasContainerPanel}>
          <Text style={[Typography.h3, styles.tipsPanelHeadlineText]}>Application Tips</Text>
          
          <View style={styles.tipsItemRowNode}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.bgBlack} style={styles.tipsCheckIconPlacement} />
            <Text style={[Typography.bodySmall, styles.tipsBodyMessageInlineText]}>
              Be specific about your creative approach and content ideas
            </Text>
          </View>

          <View style={styles.tipsItemRowNode}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.bgBlack} style={styles.tipsCheckIconPlacement} />
            <Text style={[Typography.bodySmall, styles.tipsBodyMessageInlineText]}>
              Include relevant portfolio samples that match the campaign style
            </Text>
          </View>

          <View style={styles.tipsItemRowNode}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.bgBlack} style={styles.tipsCheckIconPlacement} />
            <Text style={[Typography.bodySmall, styles.tipsBodyMessageInlineText]}>
              Propose a competitive but fair rate within the budget range
            </Text>
          </View>

          <View style={styles.tipsItemRowNodeLast}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.bgBlack} style={styles.tipsCheckIconPlacement} />
            <Text style={[Typography.bodySmall, styles.tipsBodyMessageInlineText]}>
              Highlight your experience with similar brands or campaigns
            </Text>
          </View>
        </View>

        <View style={styles.bottomActionSplitControlRow}>
          <Pressable 
            style={[styles.splitFooterActionButtonShell, styles.cancelButtonThemeBg]}
            onPress={handleBackPress}
          >
            <Text style={[Typography.buttonPrimary, styles.cancelButtonTextLabel]}>Cancel</Text>
          </Pressable>

          <Pressable 
            style={styles.splitFooterActionButtonShell}
            onPress={handleSubmitApplication}
            disabled={!isAgreed}
          >
            <LinearGradient
              colors={isAgreed ? [Colors.teal, Colors.lime] : [Colors.borderDefault, Colors.borderDefault]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: moderateScale(8) }}
            >
              <Text style={[Typography.buttonPrimary, styles.submitButtonTextLabel]}>Submit Application</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}