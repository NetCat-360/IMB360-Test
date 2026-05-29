import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CampaignQueueScreen from '../../src/screens/CampaignQueue/CampaignQueueScreen';

const { useNavigation } = jest.requireMock('@react-navigation/native');

describe('CampaignQueueScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header title', () => {
    const navigation = useNavigation();
    const { getByText } = render(<CampaignQueueScreen navigation={navigation} />);
    expect(getByText('Campaign Queue')).toBeTruthy();
  });

  it('renders all tab options', () => {
    const navigation = useNavigation();
    const { getByText } = render(<CampaignQueueScreen navigation={navigation} />);
    expect(getByText('Ongoing')).toBeTruthy();
    expect(getByText('Upcoming')).toBeTruthy();
    expect(getByText('Bidding')).toBeTruthy();
  });

  it('shows Ongoing tab as active by default', () => {
    const navigation = useNavigation();
    const { getByText } = render(<CampaignQueueScreen navigation={navigation} />);
    expect(getByText('No ongoing campaigns')).toBeTruthy();
  });

  it('switches to Upcoming tab on press', () => {
    const navigation = useNavigation();
    const { getByText } = render(<CampaignQueueScreen navigation={navigation} />);
    fireEvent.press(getByText('Upcoming'));
    expect(getByText('No upcoming campaigns')).toBeTruthy();
  });

  it('switches to Bidding tab on press', () => {
    const navigation = useNavigation();
    const { getByText } = render(<CampaignQueueScreen navigation={navigation} />);
    fireEvent.press(getByText('Bidding'));
    expect(getByText('No bids placed yet')).toBeTruthy();
  });
});
