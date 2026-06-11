import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export type CampaignStatus =
  | "All Status"
  | "Ongoing"
  | "Completed"
  | "Paused";

export interface CampaignItem {
  id: string;

  title: string;

  status:
    | "ongoing"
    | "completed"
    | "paused";

  description:
    string;

  targetAudience:
    string;

  deliverables:
    string[];

  minFollowers:
    string;

  minEngagement:
    string;

  clicks:
    number;

  roi:
    number;

  budgetRange:
    string;

  engagement:
    string;

  reach:
    string;

  cpe:
    string;

  budgetUsed:
    number;

  remainingBudget:
    number;

  startDate:
    string;

  endDate:
    string;

  usedBudget:
    string;

  progress:
    number;

  socials:
    string[];

  topInfluencers: {
    avatar: any;
  }[];

  weeks:
    string[];

  totalSpend:
    number[];
}

interface BrandCampaignsState {
  campaigns:
    CampaignItem[];

  searchQuery:
    string;

  selectedStatus:
    CampaignStatus;

  stats: {
    activeCampaigns:
      number;

    totalReach:
      string;

    budgetSpent:
      string;

    avgROI:
      number;
  };
}

const initialState:
  BrandCampaignsState =
{
  campaigns: [
    {
      id: "1",

      title:
        "IMB360 awareness",

      status:
        "ongoing",

      description:
        "We are looking for tech-savvy influencers to explore and review our latest CMS features. Focus on functionality, UI/UX and performance.",

      targetAudience:
        "Influencers should have an audience primarily composed of young professionals, tech enthusiasts, startup founders and digital creators.",

      deliverables: [
        "1x In-depth YouTube video review (min 8 mins)",
        "3x High-fidelity Instagram Stories with direct links",
        "Functionality walkthrough of WebHelp365 CMS",
        "Authentic UX feedback & product critique",
      ],

      minFollowers:
        "50.0K",

      minEngagement:
        "5002%",

      clicks:
        0,

      roi:
        0,

      budgetRange:
        "2.0K",

      engagement:
        "5002%",

      reach:
        "10.0K",

      cpe:
        "2,501",

      budgetUsed:
        4000,

      remainingBudget:
        2400,

      startDate:
        "24/11/2025",

      endDate:
        "07/12/2025",

      usedBudget:
        "5.6K",

      progress:
        72,

      socials: [
        "instagram",
        "facebook",
        "youtube",
        "tiktok",
        "linkedin",
      ],

      topInfluencers: [
        {
          avatar:
            require(
              "../../../assets/images/asusbanner.png"
            ),
        },
        {
          avatar:
            require(
              "../../../assets/images/asusbanner.png"
            ),
        },
        {
          avatar:
            require(
              "../../../assets/images/asusbanner.png"
            ),
        },
      ],

      weeks: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
      ],

      totalSpend: [
        1000,
        2200,
        3500,
        5600,
      ],
    },

    {
      id: "2",

      title:
        "Summer Sale Push",

      status:
        "completed",

      description:
        "Promote our seasonal summer sale campaign with engaging content and product awareness.",

      targetAudience:
        "Lifestyle creators with fashion and shopping focused audiences.",

      deliverables: [
        "2x Instagram Reel",
        "1x Story Set",
        "Product Mention",
      ],

      minFollowers:
        "30.0K",

      minEngagement:
        "3120%",

      clicks:
        14,

      roi:
        18,

      budgetRange:
        "5.0K",

      engagement:
        "3120%",

      reach:
        "25.0K",

      cpe:
        "1,800",

      budgetUsed:
        8600,

      remainingBudget:
        0,

      startDate:
        "01/02/2025",

      endDate:
        "28/02/2025",

      usedBudget:
        "8.6K",

      progress:
        100,

      socials: [
        "instagram",
        "facebook",
        "youtube",
      ],

      topInfluencers: [
        {
          avatar:
            require(
              "../../../assets/images/asusbanner.png"
            ),
        },
        {
          avatar:
            require(
              "../../../assets/images/asusbanner.png"
            ),
        },
      ],

      weeks: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
      ],

      totalSpend: [
        1500,
        3200,
        6000,
        8600,
      ],
    },
  ],

  searchQuery:
    "",

  selectedStatus:
    "All Status",

  stats: {
    activeCampaigns:
      6,

    totalReach:
      "10.0K",

    budgetSpent:
      "28.6K",

    avgROI:
      0,
  },
};

const
brandCampaignsSlice =
  createSlice({
    name:
      "brandCampaigns",

    initialState,

    reducers: {
      setSearchQuery:
        (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.searchQuery =
            action.payload;
        },

      setSelectedStatus:
        (
          state,
          action:
            PayloadAction<CampaignStatus>
        ) => {
          state.selectedStatus =
            action.payload;
        },

      setCampaigns:
        (
          state,
          action:
            PayloadAction<
              CampaignItem[]
            >
        ) => {
          state.campaigns =
            action.payload;
        },
    },
  });

export const {
  setSearchQuery,
  setSelectedStatus,
  setCampaigns,
} =
  brandCampaignsSlice.actions;

export default
  brandCampaignsSlice.reducer;