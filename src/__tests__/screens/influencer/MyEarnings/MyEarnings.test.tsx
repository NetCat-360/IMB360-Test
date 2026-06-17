import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MyEarnings from '../../../../screens/influencer/MyEarnings/MyEarnings';

const mockGoBack = jest.fn();

jest.mock('../../../../components/ScreenHeader', () => {
  const React = require('react');
  const { Text, Pressable } = require('react-native');
  return ({ title, onBack }: { title: string; onBack: () => void }) =>
    React.createElement(React.Fragment, null,
      React.createElement(Pressable, { onPress: onBack, testID: 'screen-header-back' },
        React.createElement(Text, null, '←'),
      ),
      React.createElement(Text, null, title),
    );
});

describe('MyEarnings', () => {
  beforeEach(() => {
    mockGoBack.mockClear();
  });

  const navigation = { goBack: mockGoBack } as any;

  it('renders without crashing', () => {
    const { getByText } = render(<MyEarnings navigation={navigation} />);
    expect(getByText('My Earnings')).toBeTruthy();
  });

  it('renders total earnings card', () => {
    const { getByText } = render(<MyEarnings navigation={navigation} />);
    expect(getByText('TOTAL EARNINGS')).toBeTruthy();
  });

  it('renders tab buttons', () => {
    const { getByText } = render(<MyEarnings navigation={navigation} />);
    expect(getByText('Paid')).toBeTruthy();
    expect(getByText('Pending')).toBeTruthy();
  });

  it('shows Paid empty state by default', () => {
    const { getByText } = render(<MyEarnings navigation={navigation} />);
    expect(getByText('No payments yet')).toBeTruthy();
  });

  it('switches to Pending tab and shows Pending empty state', () => {
    const { getByText } = render(<MyEarnings navigation={navigation} />);
    fireEvent.press(getByText('Pending'));
    expect(getByText('No pending payments')).toBeTruthy();
  });

  it('calls goBack when back button pressed', () => {
    const { getByTestId } = render(<MyEarnings navigation={navigation} />);
    fireEvent.press(getByTestId('screen-header-back'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('renders Paid empty state details', () => {
    const { getByText } = render(<MyEarnings navigation={navigation} />);
    expect(
      getByText(
        'Completed campaign payments from brands will appear here.',
      ),
    ).toBeTruthy();
  });

  it('renders Pending empty state details', () => {
    const { getByText } = render(<MyEarnings navigation={navigation} />);
    fireEvent.press(getByText('Pending'));
    expect(
      getByText(
        'Payments awaiting release from ongoing campaigns will appear here.',
      ),
    ).toBeTruthy();
  });
});
