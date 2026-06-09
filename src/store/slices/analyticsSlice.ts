import {
    createSlice,
    PayloadAction,
  } from "@reduxjs/toolkit";

  import { ImageSourcePropType } from "react-native";

  type AnalyticsState = {
    selectedMonth: string;
    availableMonths: string[];
  
    stats: {
      totalReach: string;
      totalEngagement: string;
      avgER: string;
      totalSpent: string;
    };
  
    performanceLabels:
      string[];
  
    performanceData:
      number[];
  
    platformDistribution: {
      name: string;
      percentage: number;
      color: string;
    }[];
  
    audienceInsights: {
      female: number;
      male: number;
  
      ageGroups: {
        label: string;
        percent: number;
      }[];
    };
  
    growthInsights: {
      title: string;
      value: string;
        icon: ImageSourcePropType;
    }[];
  
    smartRecommendations: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  
  const initialState:
    AnalyticsState = {
    selectedMonth:
      "June 2026",
    availableMonths: [
        "January 2026",
        "February 2026",
        "March 2026",
        "April 2026",
        "May 2026",
        "June 2026",
    ],
    stats: {
      totalReach: "1.2M",
      totalEngagement:
        "45.8K",
      avgER: "3.82%",
      totalSpent:
        "$4.2K",
    },
  
    performanceLabels: [
      "01 Jun",
      "08 Jun",
      "15 Jun",
      "22 Jun",
      "30 Jun",
    ],
  
    performanceData: [
      40,
      55,
      48,
      60,
      67,
    ],
  
    platformDistribution: [
      {
        name:
          "Instagram",
        percentage: 45,
        color:
          "#00D4FF",
      },
  
      {
        name:
          "YouTube",
        percentage: 25,
        color:
          "#FF6B3D",
      },
  
      {
        name:
          "Facebook",
        percentage: 20,
        color:
          "#E5E5E5",
      },
    ],
  
    audienceInsights: {
      female: 62,
      male: 38,
  
      ageGroups: [
        {
          label:
            "18-24",
          percent: 40,
        },
  
        {
          label:
            "25-34",
          percent: 35,
        },
  
        {
          label:
            "35-44",
          percent: 15,
        },
      ],
    },
  
    growthInsights: [
        {
          title:
            "Engagement Rate Improved",
      
          value:
            "+8.3% this month",
      
          icon: require(
            "../../assets/images/engagement.png"
          ),
        },
      
        {
          title:
            "Follower Growth",
      
          value:
            "+15.2% growth rate",
      
          icon: require(
            "../../assets/images/followers.png"
          ),
        },
      
        {
          title:
            "Content Shares",
      
          value:
            "+25% virality index",
      
          icon: require(
            "../../assets/images/share.png"
          ),
        },
      ],
  
    smartRecommendations:
      [
        {
          title:
            "Post More Video Content",
  
          description:
            "Reels are performing 42% better than static posts for your niche this week.",
  
          icon:
            "💡",
        },
  
        {
          title:
            "Optimize Posting Times",
  
          description:
            "Your audience is most active between 7 PM and 9 PM EST on Tuesdays.",
  
          icon:
            "🕒",
        },
      ],
  };
  
  const analyticsSlice =
    createSlice({
      name:
        "analytics",
  
      initialState,
  
      reducers: {
        setMonth: (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.selectedMonth =
            action.payload;
        },
  
        setAnalyticsData:
          (
            state,
            action
          ) => {
            return {
              ...state,
              ...action.payload,
            };
          },
      },
    });
  
  export const {
    setMonth,
    setAnalyticsData,
  } =
    analyticsSlice.actions;
  
  export default
    analyticsSlice.reducer;