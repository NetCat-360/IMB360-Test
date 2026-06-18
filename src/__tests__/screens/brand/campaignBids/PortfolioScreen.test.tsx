import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import brandCampaignBidsReducer from '../../../../store/slices/Brand/brandCampaignBidsSlice';
import PortfolioScreen from '../../../../screens/brand/campaignBids/PortfolioScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate, goBack: mockGoBack } as any),
  useRoute: () => ({
    params: {
      bid: {
        id: 1,
        creatorName: 'Shashank Meena',
        creatorInitials: 'SM',
        campaignName: 'Softivo Launch',
        amount: 1120,
        date: '27 Dec 2025',
        avatarColor: '#009900',
        proposedTimeline: '3-weeks',
        campaignProposal: 'Test proposal content',
        relevantExperience: 'Test experience content',
        portfolioSamples: ['sample1', 'sample2', 'sample3'],
      },
    },
  }),
}));

const createTestStore = () =>
  configureStore({
    reducer: { brandCampaignBids: brandCampaignBidsReducer },
  });

describe('PortfolioScreen', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  it('renders the screen title', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PortfolioScreen />
      </Provider>
    );
    expect(getByText('Portfolio')).toBeTruthy();
  });

  it('renders the creator name', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PortfolioScreen />
      </Provider>
    );
    expect(getByText('Shashank Meena')).toBeTruthy();
  });

  it('renders the creator initials', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PortfolioScreen />
      </Provider>
    );
    expect(getByText('SM')).toBeTruthy();
  });

  it('renders View Profile button', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PortfolioScreen />
      </Provider>
    );
    expect(getByText('View Profile')).toBeTruthy();
  });

  it('renders Proposed Rates card', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PortfolioScreen />
      </Provider>
    );
    expect(getByText('Proposed Rates')).toBeTruthy();
    expect(getByText('₹1,120')).toBeTruthy();
  });

  it('renders Proposed Timeline card', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PortfolioScreen />
      </Provider>
    );
    expect(getByText('Proposed Timeline')).toBeTruthy();
    expect(getByText('3-weeks')).toBeTruthy();
  });

  it('renders Campaign Proposal section', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PortfolioScreen />
      </Provider>
    );
    expect(getByText('Campaign Proposal')).toBeTruthy();
    expect(getByText('Test proposal content')).toBeTruthy();
  });

  it('renders Relevant Experience section', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PortfolioScreen />
      </Provider>
    );
    expect(getByText('Relevant Experience')).toBeTruthy();
    expect(getByText('Test experience content')).toBeTruthy();
  });

  it('renders Profile Samples section', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PortfolioScreen />
      </Provider>
    );
    expect(getByText('Profile Samples')).toBeTruthy();
    expect(getByText('View All')).toBeTruthy();
  });

  it('renders Accept and Reject buttons', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PortfolioScreen />
      </Provider>
    );
    expect(getByText('Accept')).toBeTruthy();
    expect(getByText('Reject')).toBeTruthy();
  });

  it('opens accept modal when Accept is pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PortfolioScreen />
      </Provider>
    );
    fireEvent.press(getByText('Accept'));
    expect(getByText('Accept Bid')).toBeTruthy();
    expect(getByText('Are you sure you want to accept this bid for this campaign ?')).toBeTruthy();
  });

  it('opens reject modal when Reject is pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PortfolioScreen />
      </Provider>
    );
    fireEvent.press(getByText('Reject'));
    expect(getByText('Reject Bid')).toBeTruthy();
    expect(getByText('Are you sure you want to reject this bid for this campaign ?')).toBeTruthy();
  });
});
