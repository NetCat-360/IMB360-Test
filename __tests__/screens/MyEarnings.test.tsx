import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MyEarnings from '../../src/screens/MyEarnings/MyEarnings';

const { useNavigation } = jest.requireMock('@react-navigation/native');

describe('MyEarnings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header title', () => {
    const navigation = useNavigation();
    const { getByText } = render(<MyEarnings navigation={navigation} />);
    expect(getByText('My Earnings')).toBeTruthy();
  });

  it('renders total earnings', () => {
    const navigation = useNavigation();
    const { getByText } = render(<MyEarnings navigation={navigation} />);
    expect(getByText('TOTAL EARNINGS')).toBeTruthy();
  });

  it('renders Paid and Pending tabs', () => {
    const navigation = useNavigation();
    const { getByText } = render(<MyEarnings navigation={navigation} />);
    expect(getByText('Paid')).toBeTruthy();
    expect(getByText('Pending')).toBeTruthy();
  });

  it('shows empty state for Paid tab', () => {
    const navigation = useNavigation();
    const { getByText } = render(<MyEarnings navigation={navigation} />);
    expect(getByText('No payments yet')).toBeTruthy();
  });

  it('switches to Pending and shows empty state', () => {
    const navigation = useNavigation();
    const { getByText } = render(<MyEarnings navigation={navigation} />);
    fireEvent.press(getByText('Pending'));
    expect(getByText('No pending payments')).toBeTruthy();
  });
});
