import {
    createSlice,
    PayloadAction,
  } from "@reduxjs/toolkit";
  
  export type CampaignStatus =
    | "ongoing"
    | "upcoming"
    | "history";
  
  type Campaign = {
    id: number;
    title: string;
    budget: number;
    startDate: string;
    status: CampaignStatus;
    totalSpent?: number;
  };
  
  type BrandCampaignState = {
    selectedTab:
      CampaignStatus;
  
    campaigns:
      Campaign[];
  };
  
  const initialState:
    BrandCampaignState = {
    selectedTab:
      "ongoing",
  
    campaigns: [
      {
        id: 1,
        title:
          "IMB360 Awareness",
  
        budget:
          2000,
  
        startDate:
          "24 Nov 2025",
  
        status:
          "ongoing",
      },
  
      {
        id: 2,
        title:
          "Softivo Launch",
  
        budget:
          5000,
  
        startDate:
          "31 Jan 2026",
  
        status:
          "ongoing",
      },
  
      {
        id: 3,
        title:
          "WebHelp365",
  
        budget:
          5000,
  
        startDate:
          "01 Feb 2026",
  
        status:
          "ongoing",
      },
  
      {
        id: 4,
        title:
          "SETgalaxy Awareness",
  
        budget:
          5000,
  
        startDate:
          "05 Jan 2026",
  
        status:
          "ongoing",
      },
  
      {
        id: 5,
        title:
          "join_influencers",
  
        budget:
          2000,
  
        startDate:
          "30 Jun 2026",
  
        status:
          "upcoming",
      },
  
      {
        id: 6,
        title:
          "SETgalaxy Awareness",
  
        budget:
          99999,
  
        startDate:
          "15 Dec 2025",
  
        status:
          "upcoming",
      },
  
      {
        id: 7,
        title:
          "uhuhujjjhuijmkoilk",
  
        budget:
          3000,
  
        totalSpent:
          2240,
  
        startDate:
          "24 Nov 2025",
  
        status:
          "history",
      },
  
      {
        id: 8,
        title:
          "IMB360 Awareness",
  
        budget:
          5000,
  
        totalSpent:
          560,
  
        startDate:
          "11 Nov 2025",
  
        status:
          "history",
      },
    ],
  };
  
  const brandCampaignSlice =
    createSlice({
      name:
        "brandCampaign",
  
      initialState,
  
      reducers: {
        setSelectedTab: (
          state,
          action:
            PayloadAction<
              CampaignStatus
            >
        ) => {
          state.selectedTab =
            action.payload;
        },
  
        startCampaign: (
          state,
          action:
            PayloadAction<
              number
            >
        ) => {
          const campaign =
            state.campaigns.find(
              item =>
                item.id ===
                action.payload
            );
  
          if (
            campaign
          ) {
            campaign.status =
              "ongoing";
          }
        },
  
        completeCampaign: (
          state,
          action:
            PayloadAction<
              number
            >
        ) => {
          const campaign =
            state.campaigns.find(
              item =>
                item.id ===
                action.payload
            );
  
          if (
            campaign
          ) {
            campaign.status =
              "history";
  
            campaign.totalSpent =
              Math.floor(
                campaign.budget *
                  0.7
              );
          }
        },
      },
    });
  
  export const {
    setSelectedTab,
    startCampaign,
    completeCampaign,
  } =
    brandCampaignSlice.actions;
  
  export default
    brandCampaignSlice.reducer;