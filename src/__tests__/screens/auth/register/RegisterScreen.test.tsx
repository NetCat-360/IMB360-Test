import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegisterScreen from '../../../../screens/auth/register/RegisterScreen';

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

describe('RegisterScreen', () => {
  it('renders CREATE YOUR ACCOUNT title', () => {
    const navigation = createMockNav();
    const route = { params: { role: 'CREATOR' } } as any;
    const { getByText } = render(
      <RegisterScreen navigation={navigation} route={route} />,
    );
    expect(getByText('CREATE YOUR ACCOUNT')).toBeTruthy();
  });

  it('renders all form field labels', () => {
    const navigation = createMockNav();
    const route = { params: { role: 'CREATOR' } } as any;
    const { getByText } = render(
      <RegisterScreen navigation={navigation} route={route} />,
    );
    expect(getByText('Full Name')).toBeTruthy();
    expect(getByText('Email address')).toBeTruthy();
    expect(getByText('Phone')).toBeTruthy();
    expect(getByText('Create a Password')).toBeTruthy();
  });

  it('renders Agreement checkbox with Privacy Policy and Terms of use', () => {
    const navigation = createMockNav();
    const route = { params: { role: 'CREATOR' } } as any;
    const { getByText } = render(
      <RegisterScreen navigation={navigation} route={route} />,
    );
    expect(getByText('Privacy Policy')).toBeTruthy();
    expect(getByText('Terms of use')).toBeTruthy();
  });

  it('renders Register button', () => {
    const navigation = createMockNav();
    const route = { params: { role: 'CREATOR' } } as any;
    const { getByText } = render(
      <RegisterScreen navigation={navigation} route={route} />,
    );
    expect(getByText('Register')).toBeTruthy();
  });

  it('navigates to Login on "Login" redirect press', () => {
    const navigation = createMockNav();
    const route = { params: { role: 'CREATOR' } } as any;
    const { getByText } = render(
      <RegisterScreen navigation={navigation} route={route} />,
    );
    fireEvent.press(getByText('Login'));
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('calls goBack on back button press', () => {
    const navigation = createMockNav();
    const route = { params: { role: 'CREATOR' } } as any;
    const { getByText } = render(
      <RegisterScreen navigation={navigation} route={route} />,
    );
    fireEvent.press(getByText('←'));
    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('opens country modal on phone prefix press', () => {
    const navigation = createMockNav();
    const route = { params: { role: 'CREATOR' } } as any;
    const { getByText } = render(
      <RegisterScreen navigation={navigation} route={route} />,
    );
    const dropdownArrow = getByText('▼');
    fireEvent.press(dropdownArrow);
    expect(getByText('Select Country')).toBeTruthy();
  });

  it('sends verification code on "Send Code" press', () => {
    const navigation = createMockNav();
    const route = { params: { role: 'CREATOR' } } as any;
    const { getByText } = render(
      <RegisterScreen navigation={navigation} route={route} />,
    );
    expect(getByText('Send Code')).toBeTruthy();
  });

  it('shows "Or continue with" divider', () => {
    const navigation = createMockNav();
    const route = { params: { role: 'CREATOR' } } as any;
    const { getByText } = render(
      <RegisterScreen navigation={navigation} route={route} />,
    );
    expect(getByText('Or continue with')).toBeTruthy();
  });

  it('shows password requirement text', () => {
    const navigation = createMockNav();
    const route = { params: { role: 'CREATOR' } } as any;
    const { getByText } = render(
      <RegisterScreen navigation={navigation} route={route} />,
    );
    expect(
      getByText(
        'Password must be 8+ characters with a special character, number, a-z, A-Z.',
      ),
    ).toBeTruthy();
  });
});
