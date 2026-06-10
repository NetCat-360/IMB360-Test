import {
    createSlice,
    PayloadAction,
  } from "@reduxjs/toolkit";
  
  type Platform = {
    id: number;
    icon: any;
    handle: string;
    metric1Label: string;
    metric1Value: string;
    metric2Label: string;
    metric2Value: string;
    accentColor: string;
  };
  
  type Segment = {
    label: string;
    percentage: number;
    color: string;
  };
  
  type FollowerGrowthDataset = {
    platform: string;
    color: string;
    data: number[];
  };
  
  type MonthData = {
    platforms: Platform[];
  
    followerGrowth: {
      labels: string[];
  
      datasets:
        FollowerGrowthDataset[];
    };
  
    growthLegend: {
      label: string;
      color: string;
    }[];
  
    followerSegmentation:
      Segment[];
  };
  
  type OverviewState = {
    selectedMonth:
      string;
  
    availableMonths:
      string[];
  
    monthlyData: {
      [key: string]:
        MonthData;
    };
  };
  
  const createMonthData = (
    reachMultiplier:
      number
  ): MonthData => ({
    platforms: [
      {
        id: 1,
        icon: require(
          "../../assets/images/Instagram.png"
        ),
        handle:
          "@ragecodess",
  
        metric1Label:
          "Followers",
  
        metric1Value:
          `${(
            3.76 *
            reachMultiplier
          ).toFixed(2)}K`,
  
        metric2Label:
          "Posts",
  
        metric2Value:
          "87",
  
        accentColor:
          "#E1306C",
      },
  
      {
        id: 2,
        icon: require(
          "../../assets/images/youtube.png"
        ),
        handle:
          "@ragecodess",
  
        metric1Label:
          "Subscribers",
  
        metric1Value:
          `${(
            2.84 *
            reachMultiplier
          ).toFixed(2)}K`,
  
        metric2Label:
          "Videos",
  
        metric2Value:
          "87",
  
        accentColor:
          "#FF0000",
      },
  
      {
        id: 3,
        icon: require(
          "../../assets/images/facebook.png"
        ),
        handle:
          "@ragecodess",
  
        metric1Label:
          "Followers",
  
        metric1Value:
          `${(
            2.1 *
            reachMultiplier
          ).toFixed(2)}K`,
  
        metric2Label:
          "Posts",
  
        metric2Value:
          "63",
  
        accentColor:
          "#1877F2",
      },
  
      {
        id: 4,
        icon: require(
          "../../assets/images/Twitter.png"
        ),
        handle:
          "@ragecodess",
  
        metric1Label:
          "Followers",
  
        metric1Value:
          `${(
            1.9 *
            reachMultiplier
          ).toFixed(2)}K`,
  
        metric2Label:
          "Posts",
  
        metric2Value:
          "52",
  
        accentColor:
          "#1DA1F2",
      },
    ],
  
    followerGrowth: {
      labels: [
        "1-7",
        "8-14",
        "15-21",
        "22-28",
        "29-30",
      ],
  
      datasets: [
        {
          platform:
            "Instagram",
  
          color:
            "#D61FFF",
  
          data: [
            100 *
              reachMultiplier,
            1200 *
              reachMultiplier,
            3500 *
              reachMultiplier,
            4000 *
              reachMultiplier,
            4500 *
              reachMultiplier,
          ],
        },
  
        {
          platform:
            "Youtube",
  
          color:
            "#FF3B00",
  
          data: [
            500 *
              reachMultiplier,
            1500 *
              reachMultiplier,
            2500 *
              reachMultiplier,
            3500 *
              reachMultiplier,
            4300 *
              reachMultiplier,
          ],
        },
  
        {
          platform:
            "Facebook",
  
          color:
            "#003CFF",
  
          data: [
            1000 *
              reachMultiplier,
            2000 *
              reachMultiplier,
            2800 *
              reachMultiplier,
            3400 *
              reachMultiplier,
            3900 *
              reachMultiplier,
          ],
        },
  
        {
          platform:
            "Twitter",
  
          color:
            "#9C9CA3",
  
          data: [
            0,
            500 *
              reachMultiplier,
            1200 *
              reachMultiplier,
            2200 *
              reachMultiplier,
            3400 *
              reachMultiplier,
          ],
        },
      ],
    },
  
    growthLegend: [
      {
        label:
          "Instagram",
  
        color:
          "#D61FFF",
      },
  
      {
        label:
          "Youtube",
  
        color:
          "#FF3B00",
      },
  
      {
        label:
          "Facebook",
  
        color:
          "#003CFF",
      },
  
      {
        label:
          "Twitter",
  
        color:
          "#9C9CA3",
      },
    ],
  
    followerSegmentation: [
      {
        label:
          "Below 18 years old",
  
        percentage:
          30,
  
        color:
          "#00D4FF",
      },
  
      {
        label:
          "18-24 years old",
  
        percentage:
          75,
  
        color:
          "#FFFFFF",
      },
  
      {
        label:
          "25-32 years old",
  
        percentage:
          55,
  
        color:
          "#00D4FF",
      },
  
      {
        label:
          "33-50 years old",
  
        percentage:
          40,
  
        color:
          "#B6D82C",
      },
    ],
  });
  
  const initialState:
    OverviewState = {
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
  
    monthlyData: {
      "January 2026":
        createMonthData(
          0.5
        ),
  
      "February 2026":
        createMonthData(
          0.65
        ),
  
      "March 2026":
        createMonthData(
          0.75
        ),
  
      "April 2026":
        createMonthData(
          0.85
        ),
  
      "May 2026":
        createMonthData(
          0.95
        ),
  
      "June 2026":
        createMonthData(
          1
        ),
    },
  };
  
  const overviewSlice =
    createSlice({
      name:
        "overview",
  
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
  
        setOverviewData: (
          state,
          action:
            PayloadAction<
              Partial<OverviewState>
            >
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
    setOverviewData,
  } =
    overviewSlice.actions;
  
  export default
    overviewSlice.reducer;