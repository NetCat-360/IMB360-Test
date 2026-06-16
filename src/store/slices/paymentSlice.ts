import {
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';
  
  export type PaymentTab =
    | 'purchase'
    | 'release';
  
  type PaymentCenterState =
  {
    selectedTab:
      PaymentTab;
  
    /* Purchase */
    currentBalance:
      number;
  
    accountType:
      string;
  
    expiryDate:
      string;
  
    topupAmount:
      string;
  
    /* Payment Release */
    availableWithdrawal:
      number;
  
    reservedAmount:
      number;
  
    withdrawalAmount:
      string;
  
    bankAdded:
      boolean;
  
    upiAdded:
      boolean;
  
    bankAccount:
      string;
  
    upiId:
      string;
  };
  
  const initialState:
    PaymentCenterState =
  {
    selectedTab:
      'purchase',
  
    /* Purchase */
    currentBalance:
      26700,
  
    accountType:
      'Brand/Agency',
  
    expiryDate:
      '15/03/2024',
  
    topupAmount:
      '',
  
    /* Release */
    availableWithdrawal:
      26350,
  
    reservedAmount:
      350,
  
    withdrawalAmount:
      '',
  
    bankAdded:
      false,
  
    upiAdded:
      false,
  
    bankAccount:
      '',
  
    upiId:
      '',
  };
  
  const
  paymentCenterSlice =
  createSlice({
    name:
      'paymentCenter',
  
    initialState,
  
    reducers: {
      /* TAB */
      setSelectedTab:
        (
          state,
          action:
            PayloadAction<PaymentTab>
        ) => {
          state.selectedTab =
            action.payload;
        },
  
      /* PURCHASE */
      setTopupAmount:
        (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.topupAmount =
            action.payload;
        },
  
      purchasePoints:
        state => {
          const amount =
            Number(
              state.topupAmount
            );
  
          if (
            amount >= 500
          ) {
            state.currentBalance +=
              amount;
  
            state.topupAmount =
              '';
          }
        },
  
      /* WITHDRAWAL */
      setWithdrawalAmount:
        (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.withdrawalAmount =
            action.payload;
        },
  
      requestWithdrawal:
        state => {
          const amount =
            Number(
              state.withdrawalAmount
            );
  
          if (
            amount >= 500 &&
            amount <=
              state.availableWithdrawal
          ) {
            state.availableWithdrawal -=
              amount;
  
            state.reservedAmount +=
              amount;
  
            state.withdrawalAmount =
              '';
          }
        },
  
      /* BANK */
      addBankDetails:
        (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.bankAdded =
            true;
  
          state.bankAccount =
            action.payload;
        },
  
      /* UPI */
      addUpiDetails:
        (
          state,
          action:
            PayloadAction<string>
        ) => {
          state.upiAdded =
            true;
  
          state.upiId =
            action.payload;
        },
  
      resetPaymentCenter:
        () =>
          initialState,
    },
  });
  
  export const {
    setSelectedTab,
    setTopupAmount,
    purchasePoints,
    setWithdrawalAmount,
    requestWithdrawal,
    addBankDetails,
    addUpiDetails,
    resetPaymentCenter,
  } =
    paymentCenterSlice.actions;
  
  export default
  paymentCenterSlice.reducer;