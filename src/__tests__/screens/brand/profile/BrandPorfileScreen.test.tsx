import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BrandProfileScreen from '../../../../screens/brand/profile/BrandPorfileScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

describe('BrandProfileScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders username', () => {
    const { getByText } = render(<BrandProfileScreen />);
    expect(getByText('Username')).toBeTruthy();
  });

  it('renders username handle', () => {
    const { getByText } = render(<BrandProfileScreen />);
    expect(getByText('@username1212')).toBeTruthy();
  });

  it('renders edit profile button', () => {
    const { UNSAFE_getByType } = render(<BrandProfileScreen />);
  });

  it('renders bio text', () => {
    const { getByText } = render(<BrandProfileScreen />);
    expect(getByText('Digital creator | Fashion & Lifestyle')).toBeTruthy();
    expect(getByText('Helping brands grow 🚀')).toBeTruthy();
  });

  it('renders Add website link', () => {
    const { getByText } = render(<BrandProfileScreen />);
    expect(getByText('Add website 🔗')).toBeTruthy();
  });

  it('renders action buttons', () => {
    const { getByText } = render(<BrandProfileScreen />);
    expect(getByText('Add Assets')).toBeTruthy();
    expect(getByText('Create Campaigns')).toBeTruthy();
  });

  it('navigates to AddAssets on press', () => {
    const { getByText } = render(<BrandProfileScreen />);
    fireEvent.press(getByText('Add Assets'));
    expect(mockNavigate).toHaveBeenCalledWith('AddAssets');
  });

  it('navigates to CreateCampaign on press', () => {
    const { getByText } = render(<BrandProfileScreen />);
    fireEvent.press(getByText('Create Campaigns'));
    expect(mockNavigate).toHaveBeenCalledWith('CreateCampaign');
  });

  it('renders info row', () => {
    const { getByText } = render(<BrandProfileScreen />);
    expect(getByText('Joined December 2025')).toBeTruthy();
    expect(getByText('Delhi, India')).toBeTruthy();
  });

  it('renders stats dashboard', () => {
    const { getByText } = render(<BrandProfileScreen />);
    expect(getByText('Total Expense')).toBeTruthy();
    expect(getByText('Current Balance')).toBeTruthy();
    expect(getByText('Engagement')).toBeTruthy();
    expect(getByText('Campaign')).toBeTruthy();
    expect(getByText('₹53350')).toBeTruthy();
    expect(getByText('₹0')).toBeTruthy();
  });

  it('renders menu items', () => {
    const { getByText } = render(<BrandProfileScreen />);
    expect(getByText('Overview')).toBeTruthy();
    expect(getByText('Campaigns')).toBeTruthy();
    expect(getByText('Campaign Bids')).toBeTruthy();
    expect(getByText('Total Spend')).toBeTruthy();
  });

  it('navigates to BrandOverview on Overview press', () => {
    const { getByText } = render(<BrandProfileScreen />);
    fireEvent.press(getByText('Overview'));
    expect(mockNavigate).toHaveBeenCalledWith('BrandOverview');
  });

  it('navigates to BrandCampaigns on Campaigns press', () => {
    const { getByText } = render(<BrandProfileScreen />);
    fireEvent.press(getByText('Campaigns'));
    expect(mockNavigate).toHaveBeenCalledWith('BrandCampaigns');
  });

  it('navigates to CampaignBids on Campaign Bids press', () => {
    const { getByText } = render(<BrandProfileScreen />);
    fireEvent.press(getByText('Campaign Bids'));
    expect(mockNavigate).toHaveBeenCalledWith('CampaignBids');
  });

  it('navigates to TotalSpend on Total Spend press', () => {
    const { getByText } = render(<BrandProfileScreen />);
    fireEvent.press(getByText('Total Spend'));
    expect(mockNavigate).toHaveBeenCalledWith('TotalSpend');
  });
});
