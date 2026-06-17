import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CampaignQueueScreen from '../../../../screens/influencer/CampaignQueue/CampaignQueueScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

describe('CampaignQueueScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockGoBack.mockClear();
  });

  const navigation = { navigate: mockNavigate, goBack: mockGoBack } as any;

  it('renders without crashing', () => {
    const { getByText } = render(
      <CampaignQueueScreen navigation={navigation} />,
    );
    expect(getByText('Campaign Queue')).toBeTruthy();
  });

  it('renders tab switcher', () => {
    const { getByText } = render(
      <CampaignQueueScreen navigation={navigation} />,
    );
    expect(getByText('Ongoing')).toBeTruthy();
    expect(getByText('Upcoming')).toBeTruthy();
    expect(getByText('Bidding')).toBeTruthy();
  });

  it('shows Ongoing empty state by default', () => {
    const { getByText } = render(
      <CampaignQueueScreen navigation={navigation} />,
    );
    expect(getByText('No ongoing campaigns')).toBeTruthy();
  });

  it('switches to Upcoming tab and shows empty state', () => {
    const { getByText } = render(
      <CampaignQueueScreen navigation={navigation} />,
    );
    fireEvent.press(getByText('Upcoming'));
    expect(getByText('No upcoming campaigns')).toBeTruthy();
  });

  it('switches to Bidding tab and shows empty state', () => {
    const { getByText } = render(
      <CampaignQueueScreen navigation={navigation} />,
    );
    fireEvent.press(getByText('Bidding'));
    expect(getByText('No bids placed yet')).toBeTruthy();
  });

  it('renders Ongoing empty state subtitle', () => {
    const { getByText } = render(
      <CampaignQueueScreen navigation={navigation} />,
    );
    expect(
      getByText("Campaigns you're currently running will appear here."),
    ).toBeTruthy();
  });

  it('renders Upcoming empty state subtitle', () => {
    const { getByText } = render(
      <CampaignQueueScreen navigation={navigation} />,
    );
    fireEvent.press(getByText('Upcoming'));
    expect(
      getByText("Campaigns you've accepted but not yet started will appear here."),
    ).toBeTruthy();
  });

  it('renders Bidding empty state subtitle', () => {
    const { getByText } = render(
      <CampaignQueueScreen navigation={navigation} />,
    );
    fireEvent.press(getByText('Bidding'));
    expect(
      getByText("Campaigns you've bid on will appear here once submitted."),
    ).toBeTruthy();
  });
});
