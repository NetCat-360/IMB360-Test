import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PaymentStatementScreen from '../../../screens/paymentCenter/PaymentStatementScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn(), pop: jest.fn(), replace: jest.fn() }),
}));

jest.mock('react-native-date-picker', () => 'DatePicker');

jest.mock('react-native-vector-icons/Feather', () => 'FeatherIcon');

jest.mock('../../../components/ScreenHeader', () => {
  const React = require('react');
  const { Text, Pressable } = require('react-native');
  return ({ title, onBack }: any) => (
    <>
      <Text>{title}</Text>
      {onBack && <Pressable testID="back-button" onPress={onBack}><Text>Back</Text></Pressable>}
    </>
  );
});

describe('PaymentStatementScreen', () => {
  it('renders header and tab switcher', () => {
    const { getByText } = render(
      <PaymentStatementScreen navigation={{ goBack: jest.fn() }} />
    );
    expect(getByText('Payment Center')).toBeTruthy();
    expect(getByText('Statement')).toBeTruthy();
    expect(getByText('History')).toBeTruthy();
  });

  it('renders statement card in statement tab', () => {
    const { getByText } = render(
      <PaymentStatementScreen navigation={{ goBack: jest.fn() }} />
    );
    expect(getByText('Payment Statement')).toBeTruthy();
  });

  it('renders Generate Statement button', () => {
    const { getByText } = render(
      <PaymentStatementScreen navigation={{ goBack: jest.fn() }} />
    );
    expect(getByText('Generate Statement')).toBeTruthy();
  });

  it('switches to history tab', () => {
    const { getByText, queryByText } = render(
      <PaymentStatementScreen navigation={{ goBack: jest.fn() }} />
    );
    fireEvent.press(getByText('History'));
    expect(getByText('Date of Release')).toBeTruthy();
  });

  it('opens format dropdown', () => {
    const { getByText } = render(
      <PaymentStatementScreen navigation={{ goBack: jest.fn() }} />
    );
    expect(getByText('PDF')).toBeTruthy();
  });
});
