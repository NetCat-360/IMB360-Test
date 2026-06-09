import {
    createSlice,
    PayloadAction,
  } from "@reduxjs/toolkit";
  
  export type SpendTab =
    | "campaign"
    | "influencer"
    | "paymentDate";
  
  type SpendItem = {
    id: number;
    title: string;
    amount: number;
    paymentDate: string;
    influencer: string;
  };
  
  type YearSpendData = {
    year: string;
    data: SpendItem[];
  };
  
  type TotalSpendState = {
    selectedYear: string;
    selectedTab: SpendTab;
    years: string[];
    spendHistory: YearSpendData[];
  };
  
  const initialState: TotalSpendState =
  {
    selectedYear:
      "2025",
  
    selectedTab:
      "campaign",
  
    years: [
      "2025",
      "2024",
      "2023",
    ],
  
    spendHistory: [
      {
        year: "2025",
  
        data: [],
      },
  
      {
        year: "2024",
  
        data: [
          {
            id: 1,
  
            title:
              "WebHelp365",
  
            amount:
              11200,
  
            paymentDate:
              "12 Jan 2024",
  
            influencer:
              "Shashank Meena",
          },
  
          {
            id: 2,
  
            title:
              "IMB360 Brand Awareness",
  
            amount:
              8750,
  
            paymentDate:
              "03 Apr 2024",
  
            influencer:
              "Ashish Singh",
          },
  
          {
            id: 3,
  
            title:
              "Softivo Launch",
  
            amount:
              15600,
  
            paymentDate:
              "18 Jul 2024",
  
            influencer:
              "Perminder Sorout",
          },
        ],
      },
  
      {
        year: "2023",
  
        data: [
          {
            id: 1,
  
            title:
              "TechSphere",
  
            amount:
              6500,
  
            paymentDate:
              "15 Feb 2023",
  
            influencer:
              "Saurabh Chaudhary",
          },
  
          {
            id: 2,
  
            title:
              "FitFuel",
  
            amount:
              9200,
  
            paymentDate:
              "20 Oct 2023",
  
            influencer:
              "Rohit Sharma",
          },
        ],
      },
    ],
  };
  
  const totalSpendSlice =
    createSlice({
      name:
        "totalSpend",
  
      initialState,
  
      reducers: {
        setSelectedYear:
          (
            state,
            action:
              PayloadAction<string>
          ) => {
            state.selectedYear =
              action.payload;
          },
  
        setSelectedTab:
          (
            state,
            action:
              PayloadAction<SpendTab>
          ) => {
            state.selectedTab =
              action.payload;
          },
      },
    });
  
  export const {
    setSelectedYear,
    setSelectedTab,
  } =
    totalSpendSlice.actions;
  
  export default
    totalSpendSlice.reducer;