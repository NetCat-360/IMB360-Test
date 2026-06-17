import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RequestQuoteScreen from '../../../screens/explore/RequestQuoteScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn(), pop: jest.fn(), replace: jest.fn() }),
  useRoute: () => ({ params: { platformId: 'instagram', influencerName: 'Rage' } }),
}));

jest.mock('react-native-linear-gradient', () => ({ children, colors, ...props }: any) => {
  const React = require('react');
  const { View } = require('react-native');
  return <View {...props}>{children}</View>;
});

jest.mock('react-native-vector-icons/Ionicons', () => 'IoniconsIcon');

jest.mock('../../../components/common/PaymentModal/PaymentModal', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return ({ visible }: any) => visible ? <View><Text>Payment Modal</Text></View> : null;
});

describe('RequestQuoteScreen', () => {
  it('renders influencer name in header', () => {
    const { getByText } = render(<RequestQuoteScreen />);
    expect(getByText(/Request Quote from Rage/)).toBeTruthy();
  });

  it('renders platform name', () => {
    const { getByText } = render(<RequestQuoteScreen />);
    expect(getByText('Instagram')).toBeTruthy();
  });

  it('renders services section', () => {
    const { getByText } = render(<RequestQuoteScreen />);
    expect(getByText('Platform')).toBeTruthy();
    expect(getByText('Services Needed')).toBeTruthy();
  });

  it('renders estimated cost', () => {
    const { getByText } = render(<RequestQuoteScreen />);
    expect(getByText('Estimated Cost')).toBeTruthy();
  });

  it('renders submit button', () => {
    const { getByText } = render(<RequestQuoteScreen />);
    expect(getByText(/Submit/)).toBeTruthy();
  });

  it('renders your budget input', () => {
    const { getByPlaceholderText } = render(<RequestQuoteScreen />);
    expect(getByPlaceholderText('Enter your budget')).toBeTruthy();
  });

  it('renders additional guidelines input', () => {
    const { getByPlaceholderText } = render(<RequestQuoteScreen />);
    expect(getByPlaceholderText(/Provide any additional details/)).toBeTruthy();
  });

  it('opens payment modal on submit press', () => {
    const { getByText, queryByText } = render(<RequestQuoteScreen />);
    fireEvent.press(getByText(/Submit/));
    expect(queryByText('Payment Modal')).toBeTruthy();
  });
});
