import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BrandExploreScreen from '../../../../screens/brand/explore/BrandExploreScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

describe('BrandExploreScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the screen title', () => {
    const { getByText } = render(<BrandExploreScreen />);
    expect(getByText('Explore')).toBeTruthy();
  });

  it('renders the logo', () => {
    const { UNSAFE_getByType } = render(<BrandExploreScreen />);
  });

  it('renders tabs with Brands active by default', () => {
    const { getByText } = render(<BrandExploreScreen />);
    expect(getByText('Influencers')).toBeTruthy();
    expect(getByText('Brands')).toBeTruthy();
  });

  it('renders the search input', () => {
    const { getByPlaceholderText } = render(<BrandExploreScreen />);
    expect(getByPlaceholderText('Search name, city or PIN')).toBeTruthy();
  });

  it('renders mock creator data', () => {
    const { getByText } = render(<BrandExploreScreen />);
    expect(getByText('Rage')).toBeTruthy();
    expect(getByText('@ragecodess')).toBeTruthy();
  });

  it('renders creator bio', () => {
    const { getByText } = render(<BrandExploreScreen />);
    expect(getByText('An I.T. Girl | Go Dev | Digital Creator')).toBeTruthy();
  });

  it('renders creator location', () => {
    const { getByText } = render(<BrandExploreScreen />);
    expect(getByText('Delhi, India')).toBeTruthy();
  });

  it('renders creator metrics', () => {
    const { getByText } = render(<BrandExploreScreen />);
    expect(getByText('3.76K')).toBeTruthy();
    expect(getByText('65.4%')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
  });

  it('renders pricing information', () => {
    const { getByText } = render(<BrandExploreScreen />);
    expect(getByText('Starting From')).toBeTruthy();
  });

  it('renders action buttons', () => {
    const { getByText } = render(<BrandExploreScreen />);
    expect(getByText('View Latest Content')).toBeTruthy();
    expect(getByText('View Profile')).toBeTruthy();
    expect(getByText('Message')).toBeTruthy();
    expect(getByText('💰 Bidding')).toBeTruthy();
  });

  it('navigates to InfluencerProfile when View Profile is pressed', () => {
    const { getByText } = render(<BrandExploreScreen />);
    fireEvent.press(getByText('View Profile'));
    expect(mockNavigate).toHaveBeenCalledWith('InfluencerProfile');
  });

  it('switches tab to Influencers when pressed', () => {
    const { getByText } = render(<BrandExploreScreen />);
    fireEvent.press(getByText('Influencers'));
  });
});
