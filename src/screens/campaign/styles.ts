import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgSurface,
  },
  headerBarContainer: {
    height: verticalScale(50),
    backgroundColor: Colors.bgBlack,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#00ACB34D',
  },
  backButtonTouchArea: {
    padding: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  appLogoImage: {
    width: scale(100),
    height: verticalScale(28),
  },
  headerRightPlaceholder: {
    width: scale(32),
  },
  scrollLayoutContent: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(80),
  },
  browseCampaignsOuterBlockContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: verticalScale(16),
  },
  browseCampaignsTitleMainText: {
    color: Colors.textPrimary,
  },
  browseCampaignsTitleHighlightText: {
    color: Colors.lime,
  },
  aiBadgeFloatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgInput,
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    marginTop: verticalScale(6),
  },
  aiBadgeSparkleIcon: {
    marginRight: scale(4),
  },
  aiBadgeLabelText: {
    color: Colors.teal,
  },
  filterControlActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
    marginTop: verticalScale(8),
  },
  filterResultStaticLabelText: {
    color: Colors.textPrimary,
  },
  funnelTouchAreaBox: {
    padding: scale(4),
  },
  filterDrawerStackInlineBlock: {
    backgroundColor: Colors.bgCard,
    borderRadius: moderateScale(12),
    padding: scale(12),
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: Colors.borderDefault,
  },
  searchTextInputElement: {
    color: Colors.textPrimary,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.bgInput,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),
    marginTop: verticalScale(8),
    borderWidth: 1,
    borderColor: Colors.borderDefault,
  },
  dropdownLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownIcon: {
    marginRight: scale(8),
  },
  dropdownLabelText: {
    color: Colors.textSecondary,
  },
  dropdownExpandedListContent: {
    backgroundColor: Colors.bgBlack,
    borderColor: Colors.borderStrong,
    borderWidth: 1,
    borderRadius: moderateScale(8),
    marginTop: verticalScale(4),
    maxHeight: verticalScale(220),
    paddingVertical: verticalScale(4),
  },
  dropdownScrollContainer: {
    paddingHorizontal: scale(12),
  },
  dropdownListItemTouchArea: {
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDefault,
  },
  dropdownListItemTouchAreaLast: {
    paddingVertical: verticalScale(10),
    borderBottomWidth: 0,
  },
  dropdownListItemText: {
    color: Colors.textSecondary,
  },
  dropdownListItemTextActive: {
    color: Colors.teal,
  },
  searchSubmitButtonExecutionContainer: {
    marginTop: verticalScale(12),
    borderRadius: moderateScale(8),
    overflow: 'hidden',
  },
  searchSubmitButtonGradientLayout: {
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSubmitButtonLabelText: {
    color: Colors.bgBlack,
  },
  campaignFlatListContainerPadding: {
    paddingBottom: verticalScale(16),
  },
  campaignCardWrapper: {
    backgroundColor: Colors.bgCard,
    borderRadius: moderateScale(16),
    padding: scale(16),
    borderWidth: 1,
    borderColor: '#00ACB3',
    marginBottom: verticalScale(16),
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalScale(12),
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLogo: {
    width: scale(40),
    height: scale(40),
    borderRadius: moderateScale(8),
    marginRight: scale(12),
  },
  brandMeta: {
    justifyContent: 'center',
  },
  brandNameText: {
    color: Colors.textPrimary,
  },
  socialPlatformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(4),
    backgroundColor: Colors.bgInput,
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(6),
  },
  socialIcon: {
    width: scale(14),
    height: scale(14),
    marginRight: scale(6),
    resizeMode: 'contain',
  },
  durationText: {
    color: Colors.textMuted,
    marginTop: verticalScale(4),
  },
  descriptionText: {
    color: Colors.textSecondary,
    lineHeight: verticalScale(18),
    marginBottom: verticalScale(12),
  },
  appliedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(8),
  },
  avatarCircle: {
    width: scale(22),
    height: scale(22),
    borderRadius: moderateScale(11),
    borderWidth: 1.5,
    borderColor: Colors.bgCard,
  },
  avatar1: {
    backgroundColor: Colors.teal,
    zIndex: 4,
  },
  avatar2: {
    backgroundColor: Colors.lime,
    marginLeft: scale(-6),
    zIndex: 3,
  },
  avatar3: {
    backgroundColor: Colors.cyan,
    marginLeft: scale(-6),
    zIndex: 2,
  },
  avatarCountContainer: {
    backgroundColor: Colors.bgInput,
    marginLeft: scale(-6),
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCountText: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(8),
    color: Colors.cyan,
  },
  appliedCounterText: {
    color: Colors.textMuted,
  },
  metricsSplitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDefault,
    paddingBottom: verticalScale(12),
    marginBottom: verticalScale(12),
  },
  metricColumn: {
    flex: 1,
  },
  metricLabel: {
    color: Colors.textMuted,
    marginBottom: verticalScale(4),
  },
  budgetRangeValue: {
    color: Colors.success,
  },
  deadlineValue: {
    color: Colors.textPrimary,
  },
  requirementsContainer: {
    backgroundColor: Colors.bgBlack,
    borderRadius: moderateScale(12),
    padding: scale(12),
    borderWidth: 1,
    borderColor: Colors.borderStrong,
  },
  requirementsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  shieldIcon: {
    marginRight: scale(6),
  },
  requirementsTitleText: {
    color: Colors.textPrimary,
  },
  requirementsSplitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  requirementBlock: {
    flex: 1,
    alignItems: 'center',
  },
  requirementBlockLabel: {
    color: Colors.textMuted,
    marginBottom: verticalScale(2),
  },
  requirementBlockValue: {
    color: Colors.lime,
  },
  expandedContentContainer: {
    marginTop: verticalScale(16),
  },
  expandedSectionTitle: {
    color: Colors.textPrimary,
    marginBottom: verticalScale(8),
    marginTop: verticalScale(12),
  },
  audienceBodyText: {
    color: Colors.textSecondary,
    lineHeight: verticalScale(18),
    marginBottom: verticalScale(12),
  },
  readMoreAccent: {
    color: Colors.cyan,
  },
  categoryGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: verticalScale(16),
  },
  categoryTagBubble: {
    backgroundColor: Colors.bgBlack,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    marginRight: scale(8),
    marginBottom: verticalScale(8),
  },
  categoryTagText: {
    color: Colors.textSecondary,
  },
  deliverablesCanvasBlock: {
    backgroundColor: '#00ACB3',
    borderRadius: moderateScale(12),
    padding: scale(14),
    marginBottom: verticalScale(16),
  },
  deliverablesCanvasTitle: {
    color: Colors.bgBlack,
    marginBottom: verticalScale(12),
  },
  deliverableItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(10),
  },
  deliverableCheckIcon: {
    marginRight: scale(8),
    marginTop: verticalScale(2),
  },
  deliverableMessageText: {
    flex: 1,
    color: Colors.bgBlack,
    lineHeight: verticalScale(16),
  },
  cardActionAnchorRow: {
    marginTop: verticalScale(16),
    alignItems: 'flex-end',
  },
  alignedRightViewButtonAnchor: {
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    width: scale(100),
  },
  gradientViewButtonContainer: {
    paddingVertical: verticalScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButtonText: {
    color: Colors.bgBlack,
  },
  expandedActionControlsSplitRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  expandedCollapseTriggerTextAnchor: {
    paddingVertical: verticalScale(8),
    marginBottom: verticalScale(4),
  },
  collapseLabelActionText: {
    color: Colors.textMuted,
    textDecorationLine: 'underline',
  },
  fullWidthApplyButtonAnchor: {
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    width: '100%',
  },
  gradientApplyButtonContainer: {
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: Colors.bgBlack,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(40),
  },
  emptyStateText: {
    color: Colors.textMuted,
    marginTop: verticalScale(8),
  },
  applyPageTitleText: {
    color: Colors.textPrimary,
    marginBottom: verticalScale(16),
    textTransform: 'uppercase',
  },
  
  // ── Meta Ribbon Box (image_f67584.png Structural Updates) ──
  metaHeaderCardRibbon: {
    backgroundColor: Colors.bgBlack,
    borderWidth: 1,
    borderColor: '#00ACB3', 
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  metaRibbonItemColumn: {
    flex: 1,
    alignItems: 'center',
  },
  metaRibbonLabelText: {
    color: Colors.textPrimary, 
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(11),
    marginBottom: verticalScale(4),
    textTransform: 'uppercase',
  },
  metaRibbonValueText: {
    color: Colors.textSecondary, 
    fontSize: moderateScale(14),
  },
  metaRibbonBudgetHighlight: {
    color: '#00FF00', 
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },

  inputPairRowFlexLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },
  halfWidthInputBoxControl: {
    width: '48%',
  },
  inputRequiredLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  inputConfigLabelText: {
    color: Colors.textPrimary,
  },
  inputRequiredIndicatorAsterisk: {
    color: Colors.error,
    marginLeft: scale(2),
  },
  fieldInnerBoxContainerLayout: {
    backgroundColor: '#302e2e',
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(12),
    height: verticalScale(44),
    justifyContent: 'center',
  },
  fieldInnerBoxMultilineHeight: {
    backgroundColor: '#302e2e',
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(10),
    height: verticalScale(100),
  },
  fieldTextInputNativePrimitive: {
    color: Colors.textPrimary,
    padding: 0,
  },
  fullWidthFormSectionBlock: {
    marginBottom: verticalScale(16),
  },
  portfolioInnerBoxCanvas: {
    backgroundColor: '#302e2e',
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(12),
    height: verticalScale(74),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  portfolioPlaceholderContainer: {
    flex: 1,
    marginRight: scale(12),
  },
  portfolioPlaceholderInlineText: {
    color: Colors.textMuted,
    lineHeight: verticalScale(14),
  },
  chooseFilesTouchButtonAnchor: {
    borderRadius: moderateScale(6),
    overflow: 'hidden',
  },
  chooseFilesGradientLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
  },
  chooseFilesIconSpacing: {
    marginRight: scale(4),
  },
  chooseFilesLabelText: {
    color: Colors.bgBlack,
  },
  legalTncValidationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(20),
  },
  checkboxTickBoxShell: {
    width: scale(16),
    height: scale(16),
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    borderRadius: moderateScale(2),
    marginRight: scale(8),
    marginTop: verticalScale(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxTickBoxActive: {
    backgroundColor: Colors.teal,
    borderColor: Colors.teal,
  },
  legalParagraphWrapText: {
    flex: 1,
    color: Colors.textSecondary,
    lineHeight: verticalScale(16),
  },
  legalParagraphDeductionHighlight: {
    color: Colors.error,
  },
  tipsCanvasContainerPanel: {
    backgroundColor: Colors.cyan,
    borderRadius: moderateScale(12),
    padding: scale(16),
    marginBottom: verticalScale(24),
  },
  tipsPanelHeadlineText: {
    color: Colors.bgBlack,
    marginBottom: verticalScale(12),
  },
  tipsItemRowNode: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(12),
  },
  tipsItemRowNodeLast: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  tipsCheckIconPlacement: {
    marginRight: scale(8),
    marginTop: verticalScale(1),
  },
  tipsBodyMessageInlineText: {
    flex: 1,
    color: Colors.bgBlack,
    lineHeight: verticalScale(16),
  },
  bottomActionSplitControlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: verticalScale(20),
  },
  splitFooterActionButtonShell: {
    width: '48%',
    borderRadius: moderateScale(8),
    height: verticalScale(44),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonThemeBg: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
  },
  cancelButtonTextLabel: {
    color: Colors.textSecondary,
  },
  submitButtonThemeBg: {
    backgroundColor: Colors.lime,
  },
  submitButtonTextLabel: {
    color: Colors.bgBlack,
  },

  // ── Apply Campaign screen context parameters ──
  applyContainer: {
    flex: 1,
    backgroundColor: Colors.bgSurface,
  },
  applyHeaderBarContainer: {
    height: verticalScale(50),
    backgroundColor: Colors.bgBlack,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#00ACB3',
  },
  applyBackButtonTouchArea: {
    padding: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyAppLogoImage: {
    width: scale(100),
    height: verticalScale(30),
  },
  applyHeaderRightPlaceholder: {
    width: scale(32),
  },
  applyScrollLayoutContent: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(40),
  },
  campaignMetaInfoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    borderRadius: moderateScale(16),
    padding: scale(16),
    borderWidth: 1,
    borderColor: '#00ACB3',
    marginBottom: verticalScale(24),
  },
  brandLogoImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: moderateScale(10),
    marginRight: scale(16),
  },
  brandMetaDetailsColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  campaignTitleText: {
    color: Colors.textPrimary,
    marginBottom: verticalScale(4),
  },
  campaignDurationText: {
    color: Colors.textSecondary,
  },
  formInputSectionBlock: {
    marginBottom: verticalScale(20),
  },
  inputFieldLabelText: {
    color: Colors.textPrimary,
    marginBottom: verticalScale(8),
  },
  textAreaContainerFrame: {
    backgroundColor: Colors.bgInput,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
  },
  multilineTextInputField: {
    color: Colors.textPrimary,
    height: verticalScale(120),
  },
  rateInputRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgInput,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    paddingHorizontal: scale(16),
    height: verticalScale(50),
  },
  currencySymbolStaticText: {
    color: Colors.textPrimary,
    marginRight: scale(8),
  },
  rateNumericTextInputField: {
    flex: 1,
    color: Colors.textPrimary,
  },
  submitActionExecutionAnchorButton: {
    marginTop: verticalScale(12),
    borderRadius: moderateScale(12),
    overflow: 'hidden',
  },
  gradientSubmitButtonContainer: {
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: Colors.bgBlack,
  },
});