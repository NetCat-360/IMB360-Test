import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PaymentCenterScreen from '../../../screens/paymentCenter/PaymentCenterScreen';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import paymentReducer from '../../../store/slices/paymentSlice';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn(), pop: jest.fn(), replace: jest.fn() }),
}));

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

const store = configureStore({
  reducer: { payment: paymentReducer },
});

describe('PaymentCenterScreen', () => {
  it('renders header and tabs', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PaymentCenterScreen navigation={{ goBack: jest.fn(), navigate: jest.fn() }} />
      </Provider>
    );
    expect(getByText('Payment Center')).toBeTruthy();
    expect(getByText('Purchase Points')).toBeTruthy();
    expect(getByText('Payment Release')).toBeTruthy();
  });

  it('shows current balance in purchase tab', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PaymentCenterScreen navigation={{ goBack: jest.fn(), navigate: jest.fn() }} />
      </Provider>
    );
    expect(getByText('Current Balance')).toBeTruthy();
  });

  it('switches to release tab on press', () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <PaymentCenterScreen navigation={{ goBack: jest.fn(), navigate: jest.fn() }} />
      </Provider>
    );
    fireEvent.press(getByText('Payment Release'));
    expect(getByText('Available for Withdrawal')).toBeTruthy();
  });

  it('opens bank modal from release tab', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <PaymentCenterScreen navigation={{ goBack: jest.fn(), navigate: jest.fn() }} />
      </Provider>
    );
    fireEvent.press(getByText('Payment Release'));
    fireEvent.press(getByText('+ Add Bank Details'));
    expect(getByText('Add Bank Details')).toBeTruthy();
  });
});
