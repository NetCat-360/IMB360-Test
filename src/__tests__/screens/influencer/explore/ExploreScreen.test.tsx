import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ExploreScreen from '../../../../screens/influencer/explore/ExploreScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

describe('ExploreScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<ExploreScreen />);
    expect(getByText('Explore')).toBeTruthy();
  });

  it('renders tab buttons', () => {
    const { getByText } = render(<ExploreScreen />);
    expect(getByText('Influencers')).toBeTruthy();
    expect(getByText('Brands')).toBeTruthy();
  });

  it('renders search input placeholder', () => {
    const { getByPlaceholderText } = render(<ExploreScreen />);
    expect(getByPlaceholderText('Search name, city or PIN')).toBeTruthy();
  });

  it('renders mock creator card', () => {
    const { getByText } = render(<ExploreScreen />);
    expect(getByText('Rage')).toBeTruthy();
    expect(getByText('@ragecodess')).toBeTruthy();
  });

  it('renders creator metrics', () => {
    const { getAllByText } = render(<ExploreScreen />);
    expect(getAllByText('3.76K').length).toBeGreaterThan(0);
    expect(getAllByText('65.4%').length).toBeGreaterThan(0);
  });

  it('renders action buttons on creator card', () => {
    const { getByText } = render(<ExploreScreen />);
    expect(getByText('View Latest Content')).toBeTruthy();
    expect(getByText('View Profile')).toBeTruthy();
    expect(getByText('Message')).toBeTruthy();
    expect(getByText('💰 Bidding')).toBeTruthy();
  });

  it('navigates to InfluencerProfile on View Profile press', () => {
    const { getByText } = render(<ExploreScreen />);
    fireEvent.press(getByText('View Profile'));
    expect(mockNavigate).toHaveBeenCalledWith('InfluencerProfile');
  });

  it('switches to Brands tab on press', () => {
    const { getByText } = render(<ExploreScreen />);
    fireEvent.press(getByText('Brands'));
  });

  it('renders starting from pricing', () => {
    const { getByText } = render(<ExploreScreen />);
    expect(getByText(/Starting From/)).toBeTruthy();
  });
});
