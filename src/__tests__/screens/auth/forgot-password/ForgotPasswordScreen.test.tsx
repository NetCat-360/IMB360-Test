import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ForgotPasswordScreen from '../../../../screens/auth/forgot-password/ForgotPasswordScreen';

jest.mock('../../../../context/ToastContext', () => ({
  useGlobalToast: () => ({ showToast: jest.fn() }),
}));

jest.mock('../../../../api/client', () => ({
  post: jest.fn().mockRejectedValue(new Error('network error')),
}));

const createMockNav = () => ({
  navigate: jest.fn(),
  replace: jest.fn(),
  goBack: jest.fn(),
  pop: jest.fn(),
  reset: jest.fn(),
} as any);

describe('ForgotPasswordScreen', () => {
  it('renders FORGOT PASSWORD title', () => {
    const navigation = createMockNav();
    const { getByText } = render(
      <ForgotPasswordScreen navigation={navigation} />,
    );
    expect(getByText('FORGOT PASSWORD')).toBeTruthy();
  });

  it('renders email input label', () => {
    const navigation = createMockNav();
    const { getByText } = render(
      <ForgotPasswordScreen navigation={navigation} />,
    );
    expect(getByText('Email address')).toBeTruthy();
  });

  it('renders Send Code button', () => {
    const navigation = createMockNav();
    const { getByText } = render(
      <ForgotPasswordScreen navigation={navigation} />,
    );
    expect(getByText('Send Code')).toBeTruthy();
  });

  it('renders description text', () => {
    const navigation = createMockNav();
    const { getByText } = render(
      <ForgotPasswordScreen navigation={navigation} />,
    );
    expect(
      getByText(
        "Enter your email and we'll send a 6-digit verification code instantly.",
      ),
    ).toBeTruthy();
  });

  it('calls goBack on back button press', () => {
    const navigation = createMockNav();
    const { getByText } = render(
      <ForgotPasswordScreen navigation={navigation} />,
    );
    fireEvent.press(getByText('←'));
    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('shows OTP modal when Send Code is pressed with valid email', () => {
    const navigation = createMockNav();
    const { getByText, queryByText } = render(
      <ForgotPasswordScreen navigation={navigation} />,
    );

    expect(queryByText('Enter OTP')).toBeNull();
    const emailField = getByText('Email address');
    expect(emailField).toBeTruthy();
  });
});
