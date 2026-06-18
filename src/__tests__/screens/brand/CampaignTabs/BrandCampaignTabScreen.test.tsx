import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import brandCampaignTabReducer from '../../../../store/slices/Brand/brandCampaignTabSlice';
import BrandCampaignTabScreen from '../../../../screens/brand/CampaignTabs/BrandCampaignTabScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate } as any),
}));

jest.mock('react-native-chart-kit', () => ({
  BarChart: 'BarChart',
  LineChart: 'LineChart',
}));

const createTestStore = () =>
  configureStore({
    reducer: { brandCampaignTab: brandCampaignTabReducer },
  });

describe('BrandCampaignTabScreen', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  it('renders the screen title', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignTabScreen />
      </Provider>
    );
    expect(getByText('Campaigns')).toBeTruthy();
  });

  it('renders stat cards', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignTabScreen />
      </Provider>
    );
    expect(getByText('ACTIVE CAMPAIGNS')).toBeTruthy();
    expect(getByText('TOTAL REACH')).toBeTruthy();
    expect(getByText('BUDGET SPENT')).toBeTruthy();
    expect(getByText('AVG. ROI')).toBeTruthy();
  });

  it('renders stat values from store', () => {
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <BrandCampaignTabScreen />
      </Provider>
    );
    const state = store.getState().brandCampaignTab;
    expect(getAllByText(state.stats.activeCampaigns.toString()).length).toBeGreaterThan(0);
    expect(getAllByText(state.stats.totalReach).length).toBeGreaterThan(0);
    expect(getByText(`₹${state.stats.budgetSpent}`)).toBeTruthy();
  });

  it('renders the search input', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <BrandCampaignTabScreen />
      </Provider>
    );
    expect(getByPlaceholderText('Search campaigns...')).toBeTruthy();
  });

  it('renders the filter button with default status', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignTabScreen />
      </Provider>
    );
    expect(getByText('All Status')).toBeTruthy();
  });

  it('renders campaign cards from store', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignTabScreen />
      </Provider>
    );
    const state = store.getState().brandCampaignTab;
    state.campaigns.forEach(campaign => {
      expect(getByText(campaign.title)).toBeTruthy();
    });
  });

  it('renders BarChart and LineChart for campaign items', () => {
    const { UNSAFE_getAllByType } = render(
      <Provider store={store}>
        <BrandCampaignTabScreen />
      </Provider>
    );
    expect(UNSAFE_getAllByType('BarChart' as any).length).toBeGreaterThan(0);
    expect(UNSAFE_getAllByType('LineChart' as any).length).toBeGreaterThan(0);
  });

  it('renders social icons for each campaign', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <BrandCampaignTabScreen />
      </Provider>
    );
    expect(getAllByText(/CLICKS/).length).toBeGreaterThan(0);
    expect(getAllByText(/ROI/).length).toBeGreaterThan(0);
  });

  it('renders campaign details section', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <BrandCampaignTabScreen />
      </Provider>
    );
    expect(getAllByText('Campaign Details').length).toBeGreaterThan(0);
    expect(getAllByText('Campaign Progress').length).toBeGreaterThan(0);
    expect(getAllByText('TOP PERFORMING INFLUENCER').length).toBeGreaterThan(0);
  });

  it('renders View Details buttons', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <BrandCampaignTabScreen />
      </Provider>
    );
    expect(getAllByText('View Details').length).toBeGreaterThan(0);
  });

  it('navigates on View Details press', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <BrandCampaignTabScreen />
      </Provider>
    );
    fireEvent.press(getAllByText('View Details')[0]);
    expect(mockNavigate).toHaveBeenCalledWith('BrandCampaignDetails', { campaignId: '1' });
  });

  it('toggles status dropdown on filter press', () => {
    const { getByText, getAllByText, queryByText } = render(
      <Provider store={store}>
        <BrandCampaignTabScreen />
      </Provider>
    );
    expect(queryByText('Ongoing')).toBeNull();
    fireEvent.press(getAllByText('All Status')[0]);
    expect(getByText('Ongoing')).toBeTruthy();
    expect(getByText('Completed')).toBeTruthy();
    expect(getByText('Paused')).toBeTruthy();
  });
});
