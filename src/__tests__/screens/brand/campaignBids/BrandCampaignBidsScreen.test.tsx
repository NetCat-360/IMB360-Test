import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import brandCampaignBidsReducer from '../../../../store/slices/Brand/brandCampaignBidsSlice';
import CampaignBidsScreen from '../../../../screens/brand/campaignBids/BrandCampaignBidsScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate, goBack: mockGoBack } as any),
}));

const createTestStore = () =>
  configureStore({
    reducer: { brandCampaignBids: brandCampaignBidsReducer },
  });

describe('BrandCampaignBidsScreen', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  it('renders the screen title', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <CampaignBidsScreen />
      </Provider>
    );
    expect(getAllByText('Campaign Bids').length).toBeGreaterThan(0);
  });

  it('renders tab bar with both tabs', () => {
    const { getAllByText, getByText } = render(
      <Provider store={store}>
        <CampaignBidsScreen />
      </Provider>
    );
    expect(getAllByText('Campaign Bids').length).toBe(2);
    expect(getByText('Recent Activity')).toBeTruthy();
  });

  it('renders bid cards with creator names', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <CampaignBidsScreen />
      </Provider>
    );
    const state = store.getState().brandCampaignBids;
    state.bids.forEach(bid => {
      expect(getAllByText(bid.creatorName).length).toBeGreaterThan(0);
    });
  });

  it('renders bid amounts', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <CampaignBidsScreen />
      </Provider>
    );
    const state = store.getState().brandCampaignBids;
    state.bids.forEach(bid => {
      const amountText = `₹ ${bid.amount.toLocaleString()}`;
      expect(getAllByText(amountText).length).toBeGreaterThan(0);
    });
  });

  it('renders Accept and Reject buttons on bid cards', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <CampaignBidsScreen />
      </Provider>
    );
    expect(getAllByText('Accept').length).toBeGreaterThan(0);
    expect(getAllByText('Reject').length).toBeGreaterThan(0);
  });

  it('renders Message and Portfolio buttons', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <CampaignBidsScreen />
      </Provider>
    );
    expect(getAllByText('Message').length).toBeGreaterThan(0);
    expect(getAllByText('Portfolio').length).toBeGreaterThan(0);
  });

  it('opens accept modal when Accept is pressed', () => {
    const { getAllByText, getByText } = render(
      <Provider store={store}>
        <CampaignBidsScreen />
      </Provider>
    );
    fireEvent.press(getAllByText('Accept')[0]);
    expect(getByText('Accept Bid')).toBeTruthy();
    expect(getByText('Are you sure you want to accept this bid for this campaign?')).toBeTruthy();
  });

  it('opens reject modal when Reject is pressed', () => {
    const { getAllByText, getByText } = render(
      <Provider store={store}>
        <CampaignBidsScreen />
      </Provider>
    );
    fireEvent.press(getAllByText('Reject')[0]);
    expect(getByText('Reject Bid')).toBeTruthy();
    expect(getByText('Are you sure you want to reject this bid for this campaign?')).toBeTruthy();
  });

  it('navigates to Portfolio when Portfolio button is pressed', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <CampaignBidsScreen />
      </Provider>
    );
    fireEvent.press(getAllByText('Portfolio')[0]);
    expect(mockNavigate).toHaveBeenCalledWith('PortfolioScreen', expect.objectContaining({
      bid: expect.any(Object),
    }));
  });

  it('switches to Recent Activity tab', () => {
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <CampaignBidsScreen />
      </Provider>
    );
    fireEvent.press(getByText('Recent Activity'));
    expect(getByText('Recent Activity')).toBeTruthy();
    const state = store.getState().brandCampaignBids;
    state.recentActivity.forEach(activity => {
      expect(getAllByText(activity.creatorName).length).toBeGreaterThan(0);
    });
  });

  it('renders Release Payment button for pending recent activity', () => {
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <CampaignBidsScreen />
      </Provider>
    );
    fireEvent.press(getByText('Recent Activity'));
    expect(getAllByText('Release Payment').length).toBeGreaterThan(0);
  });

  it('opens release modal on Release Payment press', () => {
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <CampaignBidsScreen />
      </Provider>
    );
    fireEvent.press(getByText('Recent Activity'));
    fireEvent.press(getAllByText('Release Payment')[0]);
    expect(getByText('Are you sure you want to release the payment?')).toBeTruthy();
  });
});
