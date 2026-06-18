import React from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react-native';
import VerificationScreen from '../../../../screens/auth/verify/VerificationScreen';

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

describe('VerificationScreen', () => {
  it('renders VERIFICATION title', () => {
    const navigation = createMockNav();
    const route = {
      params: { destination: 'test@test.com', flow: 'password_reset' },
    } as any;
    const { getByText } = render(
      <VerificationScreen navigation={navigation} route={route} />,
    );
    expect(getByText('VERIFICATION')).toBeTruthy();
  });

  it('renders the destination email in the description', () => {
    const navigation = createMockNav();
    const route = {
      params: { destination: 'user@example.com', flow: 'password_reset' },
    } as any;
    const { getByText } = render(
      <VerificationScreen navigation={navigation} route={route} />,
    );
    expect(getByText(/user@example\.com/)).toBeTruthy();
  });

  it('renders Verify Code button', () => {
    const navigation = createMockNav();
    const route = {
      params: { destination: 'test@test.com', flow: 'password_reset' },
    } as any;
    const { getByText } = render(
      <VerificationScreen navigation={navigation} route={route} />,
    );
    expect(getByText('Verify Code')).toBeTruthy();
  });

  it('renders Resend link', () => {
    const navigation = createMockNav();
    const route = {
      params: { destination: 'test@test.com', flow: 'password_reset' },
    } as any;
    const { getByText } = render(
      <VerificationScreen navigation={navigation} route={route} />,
    );
    expect(getByText(/Didn't receive code/)).toBeTruthy();
    expect(getByText('Resend')).toBeTruthy();
  });

  it('calls goBack on back button press', () => {
    const navigation = createMockNav();
    const route = {
      params: { destination: 'test@test.com', flow: 'password_reset' },
    } as any;
    const { getByText } = render(
      <VerificationScreen navigation={navigation} route={route} />,
    );
    fireEvent.press(getByText('←'));
    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('renders default destination when no params provided', () => {
    const navigation = createMockNav();
    const route = { params: {} } as any;
    const { getByText } = render(
      <VerificationScreen navigation={navigation} route={route} />,
    );
    expect(getByText(/your email/)).toBeTruthy();
  });
});
