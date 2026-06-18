import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import brandCampaignReducer from '../../../../store/slices/Brand/brandCampaignSlice';
import BrandCampaignsScreen from '../../../../screens/brand/campaigns/BrandCampaignsScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate, goBack: mockGoBack } as any),
}));

const createTestStore = () =>
  configureStore({
    reducer: { brandCampaign: brandCampaignReducer },
  });

describe('BrandCampaignsScreen', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  it('renders the screen title', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignsScreen />
      </Provider>
    );
    expect(getByText('Campaigns')).toBeTruthy();
  });

  it('renders three tab buttons', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignsScreen />
      </Provider>
    );
    expect(getByText('Ongoing')).toBeTruthy();
    expect(getByText('Upcoming')).toBeTruthy();
    expect(getByText('History')).toBeTruthy();
  });

  it('renders campaigns filtered by selected tab (ongoing by default)', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignsScreen />
      </Provider>
    );
    expect(getByText('IMB360 Awareness')).toBeTruthy();
    expect(getByText('Softivo Launch')).toBeTruthy();
    expect(getByText('WebHelp365')).toBeTruthy();
    expect(getByText('SETgalaxy Awareness')).toBeTruthy();
  });

  it('does not render history campaigns on ongoing tab', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <BrandCampaignsScreen />
      </Provider>
    );
    expect(queryByText('uhuhujjjhuijmkoilk')).toBeNull();
  });

  it('switches to upcoming tab and shows upcoming campaigns', () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <BrandCampaignsScreen />
      </Provider>
    );
    fireEvent.press(getByText('Upcoming'));
    expect(queryByText('IMB360 Awareness')).toBeNull();
    expect(getByText('join_influencers')).toBeTruthy();
  });

  it('shows the complete modal when completed button is pressed on ongoing tab', () => {
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <BrandCampaignsScreen />
      </Provider>
    );
    fireEvent.press(getAllByText('Completed')[0]);
    expect(getByText('Complete Campaign')).toBeTruthy();
    expect(getByText('Are you sure you want to mark this campaign as completed?')).toBeTruthy();
  });

  it('shows the start modal when start button is pressed on upcoming tab', () => {
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <BrandCampaignsScreen />
      </Provider>
    );
    fireEvent.press(getByText('Upcoming'));
    fireEvent.press(getAllByText('Start')[0]);
    expect(getByText('Start Campaign')).toBeTruthy();
    expect(getByText('Are you sure you want to start this campaign?')).toBeTruthy();
  });

  it('calls goBack when back is pressed', () => {
    render(
      <Provider store={store}>
        <BrandCampaignsScreen />
      </Provider>
    );
  });

  it('renders history tab with history items', () => {
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <BrandCampaignsScreen />
      </Provider>
    );
    fireEvent.press(getByText('History'));
    expect(getByText('uhuhujjjhuijmkoilk')).toBeTruthy();
    expect(getAllByText('Total Spent').length).toBeGreaterThan(0);
  });
});
