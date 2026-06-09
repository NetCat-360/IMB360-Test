import {
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  campaigns: [
    {
      id: 1,

      companyName:
        "WebHelp365",

      companyType:
        "Software & Services",

      description:
        "We are looking for tech-savvy influencers to explore and review our latest CMS features. Focus on functionality, UI/UX and performance.",

      appliedCount:
        27,

      timeline:
        "3 Months",

      deadline:
        "Oct 15, 2024",

      budget:
        "$1.5K - $4.0K",

      requirements: {
        minFollowers:
          "50.0K",

        minEngagement:
          "4.2%",
      },

      targetAudience:
        "Influencers should have an audience primarily composed of young professionals, tech enthusiasts and digital creators interested in software, productivity, business tools and web technologies.",

      campaignCategories: [
        "Technology",
        "CMS",
        "Product Review",
        "Software",
        "WebHelp365",
      ],

      eligiblePlatforms: [
        "instagram",
        "facebook",
        "youtube",
        "tiktok",
        "linkedin",
        "pinterest",
        "telegram",
        "whatsapp",
      ],

      deliverables: [
        "1x In-depth YouTube video review (min 8 mins)",
        "3x High-fidelity Instagram Stories with direct links",
        "Functionality walkthrough of WebHelp365 CMS",
        "Authentic UX feedback & product critique",
      ],
    },

    {
      id: 2,

      companyName:
        "Softivo",

      companyType:
        "Tech Startup",

      description:
        "Seeking creators to review our AI-powered business automation tools. Showcase productivity improvements and real-world use cases.",

      appliedCount:
        16,

      timeline:
        "2 Months",

      deadline:
        "Nov 08, 2024",

      budget:
        "$2.0K - $5.5K",

      requirements: {
        minFollowers:
          "30.0K",

        minEngagement:
          "3.8%",
      },

      targetAudience:
        "Tech creators, startup enthusiasts, SaaS reviewers and business productivity audiences.",

      campaignCategories: [
        "Technology",
        "AI",
        "Startup",
        "Business",
      ],

      eligiblePlatforms: [
        "instagram",
        "youtube",
        "linkedin",
        "tiktok",
      ],

      deliverables: [
        "1x Product walkthrough video",
        "2x Instagram Reels",
        "Feature comparison content",
        "Honest review",
      ],
    },

    {
      id: 3,

      companyName:
        "IMB360",

      companyType:
        "Marketing Platform",

      description:
        "Looking for influencers to promote creator-brand collaboration opportunities and explain how IMB360 helps creators monetize campaigns.",

      appliedCount:
        43,

      timeline:
        "1 Month",

      deadline:
        "Dec 01, 2024",

      budget:
        "$1.0K - $3.0K",

      requirements: {
        minFollowers:
          "20.0K",

        minEngagement:
          "5.0%",
      },

      targetAudience:
        "Content creators, influencers, freelancers and digital entrepreneurs interested in brand collaborations.",

      campaignCategories: [
        "Marketing",
        "Influencer",
        "Brand Deals",
      ],

      eligiblePlatforms: [
        "instagram",
        "youtube",
        "facebook",
        "whatsapp",
      ],

      deliverables: [
        "2x Instagram Posts",
        "1x YouTube mention",
        "Creator referral campaign",
        "Campaign awareness content",
      ],
    },
  ],
};

const campaignSlice =
  createSlice({
    name:
      "campaign",

    initialState,

    reducers: {
      updateCampaign:
        (
          state,
          action
        ) => {
          state.campaigns =
            state.campaigns.map(
              (
                item
              ) =>
                item.id ===
                action.payload.id
                  ? {
                      ...item,
                      ...action.payload,
                    }
                  : item
            );
        },
    },
  });

export const {
  updateCampaign,
} =
  campaignSlice.actions;

export default
  campaignSlice.reducer;