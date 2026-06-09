import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assets: [
    {
      id: "1",
      companyName: "W Motors",
      description:
        "abcd efgh ijkl mnop qrst uvw xyz abcd efgh ijkl mnop qrst uvw xyz",
      city: "Mathura",
      state: "Uttar Pradesh",
      startDate: "24/12/2025",
      endDate: "28/12/2025",
      rentPerDay: "₹ 981/Day",
      likes: 1,
      comments: 4,
    },

    {
      id: "2",
      companyName: "BMW India",
      description:
        "Luxury automotive collaboration opportunity for creators.",
      city: "Delhi",
      state: "India",
      startDate: "01/01/2026",
      endDate: "05/01/2026",
      rentPerDay: "₹ 1200/Day",
      likes: 5,
      comments: 12,
    },
  ],
};

const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {},
});

export default assetSlice.reducer;