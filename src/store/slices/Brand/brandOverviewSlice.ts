import {
    createSlice,
    PayloadAction,
  } from "@reduxjs/toolkit";
  
  type Campaign = {
    id: number;
    name: string;
    budget: number;
  };
  
  type CampaignPerformance = {
    labels: string[];
  
    datasets: {
      label: string;
      data: number[];
      color: string;
    }[];
  };
  
  type MonthData = {
    runningCampaigns:
      Campaign[];
  
    totalBudget:
      number;
  
    campaignPerformance:
      CampaignPerformance;
  };
  
  type BrandOverviewState =
    {
      selectedMonth:
        string;
  
      availableMonths:
        string[];
  
      monthlyData: {
        [key: string]:
          MonthData;
      };
    };
  
  const createMonthData =
    (
      multiplier:
        number
    ): MonthData => {
      const campaigns =
        [
          {
            id: 1,
            name:
              "Summer Sale",
  
            budget:
              Math.round(
                40000 *
                  multiplier
              ),
          },
  
          {
            id: 2,
            name:
              "Fashion Collab",
  
            budget:
              Math.round(
                15000 *
                  multiplier
              ),
          },
  
          {
            id: 3,
            name:
              "Tech Launch",
  
            budget:
              Math.round(
                60000 *
                  multiplier
              ),
          },
        ];
  
      const totalBudget =
        campaigns.reduce(
          (
            total,
            item
          ) =>
            total +
            item.budget,
          0
        );
  
      return {
        runningCampaigns:
          campaigns,
  
        totalBudget,
  
        campaignPerformance:
          {
            labels: [
              "Week 1",
              "Week 2",
              "Week 3",
              "Week 4",
            ],
  
            datasets:
              [
                {
                  label:
                    "Budget",
  
                  color:
                    "#003CFF",
  
                  data: [
                    Math.round(
                      10000 *
                        multiplier
                    ),
  
                    Math.round(
                      18000 *
                        multiplier
                    ),
  
                    Math.round(
                      25000 *
                        multiplier
                    ),
  
                    Math.round(
                      32000 *
                        multiplier
                    ),
                  ],
                },
              ],
          },
      };
    };
  
  const initialState:
    BrandOverviewState =
    {
      selectedMonth:
        "June 2026",
  
      availableMonths:
        [
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
            0.45
          ),
  
        "February 2026":
          createMonthData(
            0.55
          ),
  
        "March 2026":
          createMonthData(
            0.7
          ),
  
        "April 2026":
          createMonthData(
            0.82
          ),
  
        "May 2026":
          createMonthData(
            0.92
          ),
  
        "June 2026":
          createMonthData(
            1
          ),
      },
    };
  
  const brandOverviewSlice =
    createSlice({
      name:
        "brandOverview",
  
      initialState,
  
      reducers: {
        setBrandMonth: (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.selectedMonth =
            action.payload;
        },
  
        setBrandOverviewData:
          (
            state,
            action:
              PayloadAction<
                Partial<BrandOverviewState>
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
    setBrandMonth,
    setBrandOverviewData,
  } =
    brandOverviewSlice.actions;
  
  export default
    brandOverviewSlice.reducer;