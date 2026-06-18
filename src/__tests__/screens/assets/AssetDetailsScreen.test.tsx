import React from 'react';
import { render } from '@testing-library/react-native';
import AssetDetailsScreen from '../../../screens/assets/AssetDetailsScreen';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn(), pop: jest.fn(), replace: jest.fn() } as any),
}));

jest.mock('../../../components/ScreenHeader', () => {
  const React = require('react');
  const { Text, Pressable } = require('react-native');
  return ({ title, onBack }: any) => (
    <>
      <Text>{title}</Text>
      {onBack && <Pressable testID="back-button" onPress={onBack}><Text>Back</Text></Pressable>}
    </>
  );
});

const initialAssetState = {
  assets: [],
  selectedAsset: {
    id: '1',
    companyName: 'Test Asset',
    description: 'A test asset',
    city: 'Test City',
    state: 'Test State',
    startDate: '01/01/2026',
    endDate: '10/01/2026',
    rentPerDay: '₹ 500/Day',
    likes: 10,
    comments: 5,
    availableFrom: '01/01/2026',
    availableTo: '10/01/2026',
    amenities: ['WiFi', 'AC'],
    providedFeatures: ['Feature 1', 'Feature 2'],
    priceDetails: '₹500 per day',
    termsAndConditions: 'Terms here',
    rating: 4,
    reviewsCount: 20,
    gallery: ['img1.png', 'img2.png'],
  },
  activeTab: 'Gallery',
  showFullTerms: false,
};

const store = configureStore({
  reducer: { asset: () => initialAssetState },
});

describe('AssetDetailsScreen', () => {
  it('renders asset company name and description', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AssetDetailsScreen />
      </Provider>
    );
    expect(getByText('Test Asset')).toBeTruthy();
    expect(getByText('A test asset')).toBeTruthy();
  });

  it('renders rent price', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AssetDetailsScreen />
      </Provider>
    );
    expect(getByText('₹ 500/Day')).toBeTruthy();
  });

  it('renders all tab items', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AssetDetailsScreen />
      </Provider>
    );
    expect(getByText('Gallery')).toBeTruthy();
    expect(getByText("What's Provided")).toBeTruthy();
    expect(getByText('T&C')).toBeTruthy();
    expect(getByText('Comments')).toBeTruthy();
  });

  it('renders Send Request to Rent button', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AssetDetailsScreen />
      </Provider>
    );
    expect(getByText('Send Request to Rent')).toBeTruthy();
  });
});
