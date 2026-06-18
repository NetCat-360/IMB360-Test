import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import brandCampaignTabReducer from '../../../../store/slices/Brand/brandCampaignTabSlice';
import BrandCampaignDetailsScreen from '../../../../screens/brand/CampaignTabs/BrandCampaignDetailsScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const mockPop = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate, goBack: mockGoBack, pop: mockPop } as any),
  useRoute: () => ({ params: { campaignId: '1' } }),
}));

jest.mock('react-native-linear-gradient', () => ({ children }: { children: React.ReactNode }) => <>{children}</>);

const createTestStore = () =>
  configureStore({
    reducer: { brandCampaignTab: brandCampaignTabReducer },
  });

describe('BrandCampaignDetailsScreen', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  it('renders the screen title', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignDetailsScreen />
      </Provider>
    );
    expect(getByText('View Details')).toBeTruthy();
  });

  it('renders campaign title from store', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignDetailsScreen />
      </Provider>
    );
    const campaign = store.getState().brandCampaignTab.campaigns[0];
    expect(getByText(campaign.title)).toBeTruthy();
  });

  it('renders campaign status', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignDetailsScreen />
      </Provider>
    );
    expect(getByText('ongoing')).toBeTruthy();
  });

  it('renders campaign description', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignDetailsScreen />
      </Provider>
    );
    const campaign = store.getState().brandCampaignTab.campaigns[0];
    expect(getByText(campaign.description)).toBeTruthy();
  });

  it('renders Campaign Requirements section', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignDetailsScreen />
      </Provider>
    );
    expect(getByText('Campaign Requirements')).toBeTruthy();
    expect(getByText('MIN. FOLLOWERS')).toBeTruthy();
    expect(getByText('MIN. ENGAGEMENT')).toBeTruthy();
  });

  it('renders Target Audience section', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignDetailsScreen />
      </Provider>
    );
    expect(getByText('Target Audience')).toBeTruthy();
  });

  it('renders Timeline section', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignDetailsScreen />
      </Provider>
    );
    expect(getByText('TIMELINE:')).toBeTruthy();
  });

  it('renders BUDGET RANGE section', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignDetailsScreen />
      </Provider>
    );
    expect(getByText('BUDGET RANGE:')).toBeTruthy();
  });

  it('renders Deliverables section', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignDetailsScreen />
      </Provider>
    );
    expect(getByText('Deliverables')).toBeTruthy();
  });

  it('renders deliverables list items', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignDetailsScreen />
      </Provider>
    );
    const campaign = store.getState().brandCampaignTab.campaigns[0];
    campaign.deliverables.forEach(d => {
      expect(getByText(d)).toBeTruthy();
    });
  });

  it('renders the Close button', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignDetailsScreen />
      </Provider>
    );
    expect(getByText('Close')).toBeTruthy();
  });

  it('calls goBack when Close is pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrandCampaignDetailsScreen />
      </Provider>
    );
    fireEvent.press(getByText('Close'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('renders nothing when campaign is not found', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <BrandCampaignDetailsScreen />
      </Provider>
    );
    expect(queryByText('Close')).toBeTruthy();
  });
});
