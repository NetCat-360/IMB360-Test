import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export type AssetTab =
  | "Asset Details"
  | "What's Provided"
  | "Price Details"
  | "Terms & Conditions"
  | "Comments & Reviews"
  | "Gallery";

export type Asset = {
  id: string;

  companyName: string;

  description: string;

  city: string;

  state: string;

  startDate: string;

  endDate: string;

  rentPerDay: string;

  likes: number;

  comments: number;

  availableFrom: string;

  availableTo: string;

  amenities: string[];

  providedFeatures: string[];

  priceDetails: string;

  termsAndConditions: string;

  rating: number;

  reviewsCount: number;

  gallery: string[];
};

type AssetState = {
  assets: Asset[];

  selectedAsset:
    Asset | null;

  activeTab:
    AssetTab;

  showFullTerms:
    boolean;
};

const initialState:
  AssetState = {
  assets: [
    {
      id: "1",

      companyName:
        "ASUS TUF Gaming A15",

      description:
        "The ASUS TUF Gaming A15 is a powerful and reliable performance laptop designed for gaming, software development, content creation, and professional multitasking.",

      city:
        "Mathura",

      state:
        "Uttar Pradesh",

      startDate:
        "02/06/2026",

      endDate:
        "09/06/2026",

      rentPerDay:
        "₹ 998/Day",

      likes: 1,

      comments: 4,

      availableFrom:
        "24/12/2025",

      availableTo:
        "28/12/2025",

      amenities: [
        "Warranty",
        "Backup",
        "Delivery",
        "Support",
        "Setup",
        "Training",
        "Insurance",
        "Accessories",
      ],

      providedFeatures: [
        "High-speed performance for coding, development and gaming",
        "Dedicated GPU support for AI/ML, rendering and design work",
        "Fast SSD storage and multitasking capability",
        "Charger and power adapter included",
        "Technical support during rental period",
      ],

      priceDetails:
        "₹998 per day",

      termsAndConditions:
        "Asset must be handled carefully and returned in original condition. Any physical damage will be chargeable to the renter. Timely payment is mandatory as per agreed schedule. Late return may result in additional charges.",

      rating: 5,

      reviewsCount: 23,

      gallery: [
        "asusbanner.png",
        "asusbanner.png",
        "asusbanner.png",
        "asusbanner.png",
        "asusbanner.png",
      ],
    },
  ],

  selectedAsset:
    null,

  activeTab:
    "Asset Details",

  showFullTerms:
    false,
};

const assetSlice =
  createSlice({
    name:
      "asset",

    initialState,

    reducers: {
      setSelectedAsset:
        (
          state,
          action:
            PayloadAction<Asset>
        ) => {
          state.selectedAsset =
            action.payload;
        },

      setActiveTab:
        (
          state,
          action:
            PayloadAction<AssetTab>
        ) => {
          state.activeTab =
            action.payload;
        },

      toggleTerms:
        (
          state
        ) => {
          state.showFullTerms =
            !state.showFullTerms;
        },
    },
  });

export const {
  setSelectedAsset,
  setActiveTab,
  toggleTerms,
} =
  assetSlice.actions;

export default
  assetSlice.reducer;