import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PricingScreen from '../../src/screens/pricing/PricingScreen';

const { useNavigation } = jest.requireMock('@react-navigation/native');

describe('PricingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header title', () => {
    const navigation = useNavigation();
    const { getByText } = render(<PricingScreen navigation={navigation} />);
    expect(getByText('Pricing')).toBeTruthy();
  });

  it('renders All filter tab', () => {
    const navigation = useNavigation();
    const { getByText } = render(<PricingScreen navigation={navigation} />);
    expect(getByText('All')).toBeTruthy();
  });

  it('renders empty state when no pricing', () => {
    const navigation = useNavigation();
    const { getByText } = render(<PricingScreen navigation={navigation} />);
    expect(getByText('No pricing set yet')).toBeTruthy();
  });

  it('renders Add Pricing button', () => {
    const navigation = useNavigation();
    const { getByText } = render(<PricingScreen navigation={navigation} />);
    expect(getByText('+ Add Pricing')).toBeTruthy();
  });

  it('navigates back on back press', () => {
    const navigation = useNavigation();
    const { getByText } = render(<PricingScreen navigation={navigation} />);
    fireEvent.press(getByText('\u2190'));
    expect(navigation.goBack).toHaveBeenCalled();
  });
});
