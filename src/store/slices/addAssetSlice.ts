import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AddAssetState = {
  assetName: string;
  category: string;
  description: string;

  address: string;
  city: string;
  pinCode: string;
  state: string;
  country: string;

  brandModel: string;
  condition: string;
  yearAge: string;
  pricePerDay: string;
  amenities: string[];

  coverImage: string | null;
  gallery: string[];

  availableFrom: string;
  availableTo: string;

  facilities: string;
  leaseRules: string;
};

const initialState: AddAssetState = {
  assetName: "",
  category: "",
  description: "",

  address: "",
  city: "",
  pinCode: "",
  state: "",
  country: "",

  brandModel: "",
  condition: "",
  yearAge: "",
  pricePerDay: "",
  amenities: [],

  coverImage: null,
  gallery: [],

  availableFrom: "",
  availableTo: "",

  facilities: "",
  leaseRules: "",
};

const addAssetSlice =
  createSlice({
    name: "addAsset",

    initialState,

    reducers: {
      updateField: (
        state,
        action: PayloadAction<{
          key: string;
          value: any;
        }>
      ) => {
        (state as any)[
          action.payload.key
        ] =
          action.payload.value;
      },

      resetAssetForm:
        () => initialState,
    },
  });

export const {
  updateField,
  resetAssetForm,
} =
  addAssetSlice.actions;

export default
  addAssetSlice.reducer;