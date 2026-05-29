import React from 'react';
import { render } from '@testing-library/react-native';
import ForgotPasswordScreen from '../../src/screens/auth/forgot-password/ForgotPasswordScreen';

const { useNavigation } = jest.requireMock('@react-navigation/native');

describe('ForgotPasswordScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the forgot password heading', () => {
    const navigation = useNavigation();
    const { getByText } = render(<ForgotPasswordScreen navigation={navigation} />);
    expect(getByText(/FORGOT PASSWORD/)).toBeTruthy();
  });

  it('renders description text about recovery', () => {
    const navigation = useNavigation();
    const { getByText } = render(<ForgotPasswordScreen navigation={navigation} />);
    expect(getByText(/Enter your email/)).toBeTruthy();
  });

  it('renders Send Code button', () => {
    const navigation = useNavigation();
    const { getByText } = render(<ForgotPasswordScreen navigation={navigation} />);
    expect(getByText('Send Code')).toBeTruthy();
  });
});
