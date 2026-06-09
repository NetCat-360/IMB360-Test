import {
    createSlice,
    PayloadAction,
  } from "@reduxjs/toolkit";
  
  export type CampaignType =
    | "Product Launch"
    | "Brand Awareness"
    | "User Generated Content"
    | "Event Promotion"
    | "Sales & Conversion"
    | "App Promotion"
    | "Giveaway Campaign"
    | "Affiliate Marketing"
    | "Lead Generation"
    | "Influencer Takeover"
    | "Seasonal Campaign"
    | "Community Building"
    | "";
  
  interface CreateCampaignState {
    /* STEP 1 */
    campaignName: string;
    campaignType: CampaignType;
    description: string;
    brandName: string;
    industry: string;
  
    /* STEP 2 */
    targetPlatform: string;
    selectedContentTypes: string[];
    campaignTags: string;
  
    /* STEP 3 */
    budget: string;
    budgetType: string;
    startDate: string;
    endDate: string;
    campaignTimeline: string;
  
    /* STEP 4 */
    minFollowers: string;
    engagementRate: string;
    targetAudience: string;
    brandGuidelines: string;
    expectedDeliverables: string;
    requireApproval: boolean;
    requireExclusivity: boolean;
  
    /* STEPPER */
    currentStep: number;
  
    /* DROPDOWNS */
    showCampaignDropdown: boolean;
    showPlatformDropdown: boolean;
    showBudgetTypeDropdown: boolean;
    showTimelineDropdown: boolean;
    showFollowersDropdown: boolean;
  }
  
  const initialState:
    CreateCampaignState =
  {
    /* STEP 1 */
    campaignName: "",
    campaignType: "",
    description: "",
    brandName: "",
    industry: "",
  
    /* STEP 2 */
    targetPlatform: "",
    selectedContentTypes: [],
    campaignTags: "",
  
    /* STEP 3 */
    budget: "",
    budgetType: "",
    startDate: "",
    endDate: "",
    campaignTimeline: "",
  
    /* STEP 4 */
    minFollowers: "1K+",
    engagementRate: "5",
    targetAudience: "",
    brandGuidelines: "",
    expectedDeliverables: "",
    requireApproval: false,
    requireExclusivity: false,
  
    /* STEPPER */
    currentStep: 1,
  
    /* DROPDOWNS */
    showCampaignDropdown:
      false,
  
    showPlatformDropdown:
      false,
  
    showBudgetTypeDropdown:
      false,
  
    showTimelineDropdown:
      false,
  
    showFollowersDropdown:
      false,
  };
  
  const createCampaignSlice =
    createSlice({
      name:
        "createCampaign",
  
      initialState,
  
      reducers: {
        /* -------------------------------- */
        /* STEP 1                           */
        /* -------------------------------- */
  
        setCampaignName: (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.campaignName =
            action.payload;
        },
  
        setCampaignType: (
          state,
          action:
            PayloadAction<CampaignType>
        ) => {
          state.campaignType =
            action.payload;
  
          state.showCampaignDropdown =
            false;
        },
  
        setDescription: (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.description =
            action.payload;
        },
  
        setBrandName: (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.brandName =
            action.payload;
        },
  
        setIndustry: (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.industry =
            action.payload;
        },
  
        /* -------------------------------- */
        /* STEP 2                           */
        /* -------------------------------- */
  
        setTargetPlatform: (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.targetPlatform =
            action.payload;
  
          state.showPlatformDropdown =
            false;
        },
  
        toggleContentType: (
          state,
          action:
            PayloadAction<string>
        ) => {
          const exists =
            state.selectedContentTypes.includes(
              action.payload
            );
  
          if (exists) {
            state.selectedContentTypes =
              state.selectedContentTypes.filter(
                item =>
                  item !==
                  action.payload
              );
          } else {
            state.selectedContentTypes.push(
              action.payload
            );
          }
        },
  
        setCampaignTags: (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.campaignTags =
            action.payload;
        },
  
        /* -------------------------------- */
        /* STEP 3                           */
        /* -------------------------------- */
  
        setBudget: (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.budget =
            action.payload;
        },
  
        setBudgetType: (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.budgetType =
            action.payload;
  
          state.showBudgetTypeDropdown =
            false;
        },
  
        setStartDate: (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.startDate =
            action.payload;
        },
  
        setEndDate: (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.endDate =
            action.payload;
        },
  
        setCampaignTimeline: (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.campaignTimeline =
            action.payload;
  
          state.showTimelineDropdown =
            false;
        },
  
        /* -------------------------------- */
        /* STEP 4                           */
        /* -------------------------------- */
  
        setMinFollowers: (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.minFollowers =
            action.payload;
  
          state.showFollowersDropdown =
            false;
        },
  
        setEngagementRate: (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.engagementRate =
            action.payload;
        },
  
        setTargetAudience: (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.targetAudience =
            action.payload;
        },
  
        setBrandGuidelines: (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.brandGuidelines =
            action.payload;
        },
  
        setExpectedDeliverables:
          (
            state,
            action:
              PayloadAction<string>
          ) => {
            state.expectedDeliverables =
              action.payload;
          },
  
        toggleRequireApproval:
          (
            state
          ) => {
            state.requireApproval =
              !state.requireApproval;
          },
  
        toggleRequireExclusivity:
          (
            state
          ) => {
            state.requireExclusivity =
              !state.requireExclusivity;
          },
  
        /* -------------------------------- */
        /* STEPPER                          */
        /* -------------------------------- */
  
        setCurrentStep: (
          state,
          action:
            PayloadAction<number>
        ) => {
          state.currentStep =
            action.payload;
        },
  
        nextStep: (
          state
        ) => {
          if (
            state.currentStep <
            4
          ) {
            state.currentStep +=
              1;
          }
        },
  
        previousStep: (
          state
        ) => {
          if (
            state.currentStep >
            1
          ) {
            state.currentStep -=
              1;
          }
        },
  
        /* -------------------------------- */
        /* DROPDOWNS                        */
        /* -------------------------------- */
  
        toggleCampaignDropdown:
          (
            state
          ) => {
            state.showCampaignDropdown =
              !state.showCampaignDropdown;
          },
  
        closeCampaignDropdown:
          (
            state
          ) => {
            state.showCampaignDropdown =
              false;
          },
  
        togglePlatformDropdown:
          (
            state
          ) => {
            state.showPlatformDropdown =
              !state.showPlatformDropdown;
          },
  
        closePlatformDropdown:
          (
            state
          ) => {
            state.showPlatformDropdown =
              false;
          },
  
        toggleBudgetTypeDropdown:
          (
            state
          ) => {
            state.showBudgetTypeDropdown =
              !state.showBudgetTypeDropdown;
          },
  
        closeBudgetTypeDropdown:
          (
            state
          ) => {
            state.showBudgetTypeDropdown =
              false;
          },
  
        toggleTimelineDropdown:
          (
            state
          ) => {
            state.showTimelineDropdown =
              !state.showTimelineDropdown;
          },
  
        closeTimelineDropdown:
          (
            state
          ) => {
            state.showTimelineDropdown =
              false;
          },
  
        toggleFollowersDropdown:
          (
            state
          ) => {
            state.showFollowersDropdown =
              !state.showFollowersDropdown;
          },
  
        closeFollowersDropdown:
          (
            state
          ) => {
            state.showFollowersDropdown =
              false;
          },
  
        /* -------------------------------- */
        /* RESET                            */
        /* -------------------------------- */
  
        resetCampaignForm:
          (
            state
          ) => {
            return initialState;
          },
      },
    });
  
  export const {
    /* STEP 1 */
    setCampaignName,
    setCampaignType,
    setDescription,
    setBrandName,
    setIndustry,
  
    /* STEP 2 */
    setTargetPlatform,
    toggleContentType,
    setCampaignTags,
  
    /* STEP 3 */
    setBudget,
    setBudgetType,
    setStartDate,
    setEndDate,
    setCampaignTimeline,
  
    /* STEP 4 */
    setMinFollowers,
    setEngagementRate,
    setTargetAudience,
    setBrandGuidelines,
    setExpectedDeliverables,
    toggleRequireApproval,
    toggleRequireExclusivity,
  
    /* STEPPER */
    setCurrentStep,
    nextStep,
    previousStep,
  
    /* DROPDOWNS */
    toggleCampaignDropdown,
    closeCampaignDropdown,
    togglePlatformDropdown,
    closePlatformDropdown,
    toggleBudgetTypeDropdown,
    closeBudgetTypeDropdown,
    toggleTimelineDropdown,
    closeTimelineDropdown,
    toggleFollowersDropdown,
    closeFollowersDropdown,
  
    /* RESET */
    resetCampaignForm,
  } =
    createCampaignSlice.actions;
  
  export default
    createCampaignSlice.reducer;