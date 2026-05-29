import React from 'react';
import { render } from '@testing-library/react-native';
import VerificationScreen from '../../src/screens/auth/verify/VerificationScreen';

const { useNavigation, useRoute } = jest.requireMock('@react-navigation/native');

describe('VerificationScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the verification heading', () => {
    const navigation = useNavigation();
    const route = { ...useRoute(), params: { destination: 'test@test.com', flow: 'password_reset' } };
    const { getByText } = render(<VerificationScreen navigation={navigation} route={route} />);
    expect(getByText('VERIFICATION')).toBeTruthy();
  });

  it('renders the resend link', () => {
    const navigation = useNavigation();
    const route = { ...useRoute(), params: { destination: 'test@test.com', flow: 'password_reset' } };
    const { getByText } = render(<VerificationScreen navigation={navigation} route={route} />);
    expect(getByText(/Resend/)).toBeTruthy();
  });

  it('renders Verify Code button', () => {
    const navigation = useNavigation();
    const route = { ...useRoute(), params: { destination: 'test@test.com', flow: 'password_reset' } };
    const { getByText } = render(<VerificationScreen navigation={navigation} route={route} />);
    expect(getByText('Verify Code')).toBeTruthy();
  });
});
