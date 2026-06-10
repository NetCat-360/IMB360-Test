import {
    createSlice,
    PayloadAction,
  } from "@reduxjs/toolkit";
  
  export type BidTab =
    | "campaignBids"
    | "recentActivity";
  
  type BidStatus =
    | "pending"
    | "accepted"
    | "rejected";
  
  type PaymentStatus =
    | "pending"
    | "released"
    | "reported";
  
  type CampaignBid = {
    id: number;
    creatorName: string;
    creatorInitials: string;
    campaignName: string;
    amount: number;
    date: string;
    avatarColor: string;
    status: BidStatus;
  
    proposedTimeline:
      string;
  
    campaignProposal:
      string;
  
    relevantExperience:
      string;
  
    portfolioSamples:
      string[];
  };
  
  type RecentActivity = {
    id: number;
    creatorName: string;
    creatorInitials: string;
    campaignName: string;
    rating: number;
    amount: number;
    comment: string;
    avatarColor: string;
    paymentStatus:
      PaymentStatus;
  };
  
  type BrandCampaignBidsState =
    {
      selectedTab:
        BidTab;
  
      bids:
        CampaignBid[];
  
      recentActivity:
        RecentActivity[];
    };
  
  const initialState:
    BrandCampaignBidsState =
    {
      selectedTab:
        "campaignBids",
  
      bids: [
        {
          id: 1,
  
          creatorName:
            "Shashank Meena",
  
          creatorInitials:
            "SM",
  
          campaignName:
            "Softivo Launch",
  
          amount:
            1120,
  
          date:
            "27 Dec 2025",
  
          avatarColor:
            "#009900",
  
          status:
            "pending",
  
          proposedTimeline:
            "3-weeks",
  
          campaignProposal:
            "Hi IMB360, I’m Shashank Meena, a content creator and influencer with a growing audience across TikTok, Instagram, and YouTube. With a passion for beauty, fashion, and fitness, I’ve built a trusted audience of 50K+ followers who actively engage with my content and recommendations.",
  
          relevantExperience:
            "Worked with fashion, lifestyle, and wellness brands on sponsored reels, product promotions, and creator campaigns across Instagram and TikTok.",
  
          portfolioSamples:
            [
              "sample1",
              "sample2",
              "sample3",
            ],
        },
  
        {
          id: 2,
  
          creatorName:
            "Ashish Singh",
  
          creatorInitials:
            "AS",
  
          campaignName:
            "IMB360 Brand Awareness",
  
          amount:
            873.6,
  
          date:
            "01 May 2026",
  
          avatarColor:
            "#6020A0",
  
          status:
            "pending",
  
          proposedTimeline:
            "2-weeks",
  
          campaignProposal:
            "I can help increase brand awareness through high-quality creator content focused on audience trust and engagement.",
  
          relevantExperience:
            "Worked with startup campaigns and influencer promotions.",
  
          portfolioSamples:
            [
              "sample1",
              "sample2",
            ],
        },
  
        {
          id: 3,
  
          creatorName:
            "Shashank Meena",
  
          creatorInitials:
            "SM",
  
          campaignName:
            "WebHelp365",
  
          amount:
            1120,
  
          date:
            "27 Dec 2025",
  
          avatarColor:
            "#009900",
  
          status:
            "pending",
  
          proposedTimeline:
            "3-weeks",
  
          campaignProposal:
            "I can create informative and engaging content tailored to tech and service-based audiences.",
  
          relevantExperience:
            "Experience working with SaaS and online service brands.",
  
          portfolioSamples:
            [
              "sample1",
              "sample2",
              "sample3",
            ],
        },
  
        {
          id: 4,
  
          creatorName:
            "Brijesh Sorout",
  
          creatorInitials:
            "BS",
  
          campaignName:
            "IMB360 Brand Awareness",
  
          amount:
            1120,
  
          date:
            "27 Dec 2025",
  
          avatarColor:
            "#8A8500",
  
          status:
            "pending",
  
          proposedTimeline:
            "4-weeks",
  
          campaignProposal:
            "I can help improve campaign reach through niche audience targeting and creator-led engagement.",
  
          relevantExperience:
            "Worked with brand awareness and social campaigns.",
  
          portfolioSamples:
            [
              "sample1",
            ],
        },
      ],
  
      recentActivity:
        [
          {
            id: 1,
  
            creatorName:
              "Saurabh Chaudhary",
  
            creatorInitials:
              "SC",
  
            campaignName:
              "IMB360 Awareness",
  
            rating:
              4,
  
            amount:
              5600,
  
            comment:
              "",
  
            avatarColor:
              "#003C99",
  
            paymentStatus:
              "pending",
          },
  
          {
            id: 2,
  
            creatorName:
              "Saurabh Chaudhary",
  
            creatorInitials:
              "SC",
  
            campaignName:
              "WebHelp365",
  
            rating:
              4,
  
            amount:
              11200,
  
            comment:
              "",
  
            avatarColor:
              "#003C99",
  
            paymentStatus:
              "pending",
          },
  
          {
            id: 3,
  
            creatorName:
              "Saurabh Chaudhary",
  
            creatorInitials:
              "SC",
  
            campaignName:
              "WebHelp365",
  
            rating:
              4,
  
            amount:
              22400,
  
            comment:
              "",
  
            avatarColor:
              "#003C99",
  
            paymentStatus:
              "pending",
          },
        ],
    };
  
  const
  brandCampaignBidsSlice =
  createSlice({
    name:
      "brandCampaignBids",
  
    initialState,
  
    reducers: {
      setSelectedTab:
        (
          state,
          action:
            PayloadAction<BidTab>
        ) => {
          state.selectedTab =
            action.payload;
        },
  
      acceptBid:
        (
          state,
          action:
            PayloadAction<number>
        ) => {
          const bid =
            state.bids.find(
              item =>
                item.id ===
                action.payload
            );
  
          if (bid) {
            bid.status =
              "accepted";
          }
        },
  
      rejectBid:
        (
          state,
          action:
            PayloadAction<number>
        ) => {
          const bid =
            state.bids.find(
              item =>
                item.id ===
                action.payload
            );
  
          if (bid) {
            bid.status =
              "rejected";
          }
        },
  
      releasePayment:
        (
          state,
          action:
            PayloadAction<number>
        ) => {
          const item =
            state.recentActivity.find(
              activity =>
                activity.id ===
                action.payload
            );
  
          if (item) {
            item.paymentStatus =
              "released";
          }
        },
  
      reportIssue:
        (
          state,
          action:
            PayloadAction<number>
        ) => {
          const item =
            state.recentActivity.find(
              activity =>
                activity.id ===
                action.payload
            );
  
          if (item) {
            item.paymentStatus =
              "reported";
          }
        },
  
      updateComment:
        (
          state,
          action:
            PayloadAction<{
              id: number;
              comment: string;
            }>
        ) => {
          const item =
            state.recentActivity.find(
              activity =>
                activity.id ===
                action.payload.id
            );
  
          if (item) {
            item.comment =
              action.payload.comment;
          }
        },
    },
  });
  
  export const {
    setSelectedTab,
    acceptBid,
    rejectBid,
    releasePayment,
    reportIssue,
    updateComment,
  } =
    brandCampaignBidsSlice.actions;
  
  export default
  brandCampaignBidsSlice.reducer;