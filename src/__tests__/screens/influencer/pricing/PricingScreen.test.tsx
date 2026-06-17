import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PricingScreen from '../../../../screens/influencer/pricing/PricingScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

describe('PricingScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockGoBack.mockClear();
  });

  const navigation = { navigate: mockNavigate, goBack: mockGoBack } as any;

  it('renders without crashing', () => {
    const { getByText } = render(<PricingScreen navigation={navigation} />);
    expect(getByText('Pricing')).toBeTruthy();
  });

  it('renders empty state when no pricing set', () => {
    const { getByText } = render(<PricingScreen navigation={navigation} />);
    expect(getByText('No pricing set yet')).toBeTruthy();
    expect(getByText('+ Add Pricing')).toBeTruthy();
  });

  it('renders filter tabs', () => {
    const { getByText } = render(<PricingScreen navigation={navigation} />);
    expect(getByText('All')).toBeTruthy();
  });

  it('navigates to AddPricing on add button press', () => {
    const { getByText } = render(<PricingScreen navigation={navigation} />);
    fireEvent.press(getByText('+ Add Pricing'));
    expect(mockNavigate).toHaveBeenCalledWith('AddPricing');
  });

  it('calls goBack when back button pressed', () => {
    const { getByText } = render(<PricingScreen navigation={navigation} />);
    fireEvent.press(getByText('←'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('renders empty state subtitle', () => {
    const { getByText } = render(<PricingScreen navigation={navigation} />);
    expect(
      getByText('Set your collaboration rates so brands know what to expect.'),
    ).toBeTruthy();
  });
});
