import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegisterScreen from '../../src/screens/auth/register/RegisterScreen';

const { useNavigation, useRoute } = jest.requireMock('@react-navigation/native');

describe('RegisterScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the create account heading', () => {
    const navigation = useNavigation();
    const route = { ...useRoute(), params: { role: 'CREATOR' } };
    const { getByText } = render(<RegisterScreen navigation={navigation} route={route} />);
    expect(getByText('CREATE YOUR ACCOUNT')).toBeTruthy();
  });

  it('renders full name, email, phone, and password fields', () => {
    const navigation = useNavigation();
    const route = { ...useRoute(), params: { role: 'CREATOR' } };
    const { getByText } = render(<RegisterScreen navigation={navigation} route={route} />);
    expect(getByText('Full Name')).toBeTruthy();
    expect(getByText('Email address')).toBeTruthy();
    expect(getByText('Phone')).toBeTruthy();
    expect(getByText('Create a Password')).toBeTruthy();
  });

  it('renders password requirements text', () => {
    const navigation = useNavigation();
    const route = { ...useRoute(), params: { role: 'CREATOR' } };
    const { getByText } = render(<RegisterScreen navigation={navigation} route={route} />);
    expect(getByText(/Password must be 8\+/)).toBeTruthy();
  });

  it('renders privacy policy checkbox', () => {
    const navigation = useNavigation();
    const route = { ...useRoute(), params: { role: 'CREATOR' } };
    const { getByText } = render(<RegisterScreen navigation={navigation} route={route} />);
    expect(getByText(/Privacy Policy/)).toBeTruthy();
    expect(getByText(/Terms of use/)).toBeTruthy();
  });

  it('renders Register button', () => {
    const navigation = useNavigation();
    const route = { ...useRoute(), params: { role: 'CREATOR' } };
    const { getByText } = render(<RegisterScreen navigation={navigation} route={route} />);
    expect(getByText('Register')).toBeTruthy();
  });

  it('renders Login link', () => {
    const navigation = useNavigation();
    const route = { ...useRoute(), params: { role: 'CREATOR' } };
    const { getByText } = render(<RegisterScreen navigation={navigation} route={route} />);
    expect(getByText('Login')).toBeTruthy();
  });

  it('navigates to Login on Login press', () => {
    const navigation = useNavigation();
    const route = { ...useRoute(), params: { role: 'CREATOR' } };
    const { getByText } = render(<RegisterScreen navigation={navigation} route={route} />);
    fireEvent.press(getByText('Login'));
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });
});
