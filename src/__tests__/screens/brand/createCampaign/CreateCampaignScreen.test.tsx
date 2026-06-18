import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createCampaignReducer from '../../../../store/slices/Brand/createCampaignSlice';
import CreateCampaignScreen from '../../../../screens/brand/createCampaign/CreateCampaignScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate, goBack: mockGoBack } as any),
}));

const createTestStore = () =>
  configureStore({
    reducer: { createCampaign: createCampaignReducer },
  });

describe('CreateCampaignScreen', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  it('renders the screen title', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CreateCampaignScreen />
      </Provider>
    );
    expect(getByText('Create Campaign')).toBeTruthy();
  });

  it('renders the subtitle', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CreateCampaignScreen />
      </Provider>
    );
    expect(getByText('Launch your next influencer marketing campaign')).toBeTruthy();
  });

  it('renders stepper with step 1', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CreateCampaignScreen />
      </Provider>
    );
    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
  });

  it('renders Step 1 by default with campaign basic info', () => {
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <CreateCampaignScreen />
      </Provider>
    );
    expect(getByText('Campaign Basic Information')).toBeTruthy();
    expect(getAllByText(/Campaign Name/).length).toBeGreaterThan(0);
    expect(getAllByText(/Campaign Type/).length).toBeGreaterThan(0);
    expect(getAllByText(/Campaign Description/).length).toBeGreaterThan(0);
    expect(getAllByText(/Brand Name/).length).toBeGreaterThan(0);
    expect(getByText('Industry')).toBeTruthy();
  });

  it('renders Next button on step 1', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CreateCampaignScreen />
      </Provider>
    );
    expect(getByText('Next')).toBeTruthy();
  });

  it('does not render Previous button on step 1', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <CreateCampaignScreen />
      </Provider>
    );
    expect(queryByText('Previous')).toBeNull();
  });

  it('renders input fields with correct placeholders', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <CreateCampaignScreen />
      </Provider>
    );
    expect(getByPlaceholderText('Your Brand Name')).toBeTruthy();
    expect(getByPlaceholderText('Select Industry')).toBeTruthy();
    expect(getByPlaceholderText('Describe your campaign objectives, target audience and key messages...')).toBeTruthy();
  });

  it('navigates to Step 2 when Next is pressed', () => {
    const { getByText, getAllByText, queryByText } = render(
      <Provider store={store}>
        <CreateCampaignScreen />
      </Provider>
    );
    fireEvent.press(getByText('Next'));
    expect(queryByText('Campaign Basic Information')).toBeNull();
    expect(getAllByText(/Target Platforms/).length).toBeGreaterThan(0);
    expect(getAllByText(/Content Types/).length).toBeGreaterThan(0);
  });

  it('renders Previous button on step 2', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CreateCampaignScreen />
      </Provider>
    );
    fireEvent.press(getByText('Next'));
    expect(getByText('Previous')).toBeTruthy();
  });

  it('goes back to step 1 when Previous is pressed on step 2', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CreateCampaignScreen />
      </Provider>
    );
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Previous'));
    expect(getByText('Campaign Basic Information')).toBeTruthy();
  });

  it('renders content type checkboxes on step 2', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CreateCampaignScreen />
      </Provider>
    );
    fireEvent.press(getByText('Next'));
    expect(getByText('Social Media Post')).toBeTruthy();
    expect(getByText('Stories')).toBeTruthy();
    expect(getByText('Video Content')).toBeTruthy();
    expect(getByText('Blog Post')).toBeTruthy();
    expect(getByText('Live Stream')).toBeTruthy();
    expect(getByText('User Generated Content')).toBeTruthy();
  });

  it('renders step 3 budget details', () => {
    const { getByText, getByPlaceholderText, getAllByPlaceholderText } = render(
      <Provider store={store}>
        <CreateCampaignScreen />
      </Provider>
    );
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));
    expect(getByText('Budget Details')).toBeTruthy();
    expect(getByPlaceholderText('₹ Enter budget')).toBeTruthy();
    expect(getAllByPlaceholderText('DD/MM/YY').length).toBe(2);
  });

  it('renders step 4 influencer requirements', () => {
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <CreateCampaignScreen />
      </Provider>
    );
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));
    expect(getByText('Influencer Requirements & Guideline')).toBeTruthy();
    expect(getAllByText(/Min. Followers/).length).toBeGreaterThan(0);
    expect(getAllByText(/Min. Engagement Rate/).length).toBeGreaterThan(0);
    expect(getByText('Target Audience')).toBeTruthy();
  });

  it('shows Submit button on step 4', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CreateCampaignScreen />
      </Provider>
    );
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));
    expect(getByText('Submit')).toBeTruthy();
  });

  it('renders character count on description', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CreateCampaignScreen />
      </Provider>
    );
    expect(getByText(/\/100/)).toBeTruthy();
  });

  it('renders Select Campaign Type placeholder', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CreateCampaignScreen />
      </Provider>
    );
    expect(getByText('Select Campaign Type')).toBeTruthy();
  });

  it('opens campaign type dropdown on press', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CreateCampaignScreen />
      </Provider>
    );
    fireEvent.press(getByText('Select Campaign Type'));
    expect(getByText('AWARENESS CAMPAIGNS')).toBeTruthy();
    expect(getByText('Brand Awareness')).toBeTruthy();
  });

  it('calls goBack on back button press', () => {
    render(
      <Provider store={store}>
        <CreateCampaignScreen />
      </Provider>
    );
  });
});
