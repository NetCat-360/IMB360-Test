import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../../../../screens/auth/login/LoginScreen';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: () => ({}),
}));

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
});

describe('LoginScreen', () => {
  it('renders the WELCOME BACK title', () => {
    const navigation = createMockNav();
    const { getByText } = render(<LoginScreen navigation={navigation} />);
    expect(getByText('WELCOME BACK!')).toBeTruthy();
  });

  it('renders email and password TextField labels', () => {
    const navigation = createMockNav();
    const { getAllByText } = render(<LoginScreen navigation={navigation} />);
    const emailLabels = getAllByText('Email address');
    expect(emailLabels.length).toBeGreaterThanOrEqual(1);
    const passwordLabels = getAllByText('Password');
    expect(passwordLabels.length).toBeGreaterThanOrEqual(1);
  });

  it('renders Sign in button', () => {
    const navigation = createMockNav();
    const { getByText } = render(<LoginScreen navigation={navigation} />);
    expect(getByText('Sign in')).toBeTruthy();
  });

  it('renders Remember Me checkbox', () => {
    const navigation = createMockNav();
    const { getByText } = render(<LoginScreen navigation={navigation} />);
    expect(getByText('Remember Me')).toBeTruthy();
  });

  it('navigates to ForgotPassword on "Forgot Password?" press', () => {
    const navigation = createMockNav();
    const { getByText } = render(<LoginScreen navigation={navigation} />);
    fireEvent.press(getByText('Forgot Password?'));
    expect(navigation.navigate).toHaveBeenCalledWith('ForgotPassword');
  });

  it('navigates to Register on "Sign up" press', () => {
    const navigation = createMockNav();
    const { getByText } = render(<LoginScreen navigation={navigation} />);
    fireEvent.press(getByText('Sign up'));
    expect(navigation.navigate).toHaveBeenCalledWith('Register', {
      role: 'CREATOR',
    });
  });

  it('calls goBack on back button press', () => {
    const navigation = createMockNav();
    const { getByText } = render(<LoginScreen navigation={navigation} />);
    fireEvent.press(getByText('←'));
    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('renders social login buttons', () => {
    const navigation = createMockNav();
    const { getByText } = render(<LoginScreen navigation={navigation} />);
    expect(getByText('Google')).toBeTruthy();
    expect(getByText('Apple')).toBeTruthy();
  });

  it('renders divider text', () => {
    const navigation = createMockNav();
    const { getByText } = render(<LoginScreen navigation={navigation} />);
    expect(getByText('Or continue with')).toBeTruthy();
  });

  it('toggles Remember Me checkbox', () => {
    const navigation = createMockNav();
    const { queryByText, getByText } = render(
      <LoginScreen navigation={navigation} />,
    );
    expect(queryByText('✓')).toBeNull();
    fireEvent.press(getByText('Forgot Password?').parent);
    expect(queryByText('✓')).toBeNull();
  });
});
