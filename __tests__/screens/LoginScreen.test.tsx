import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../src/features/auth/store/authSlice';
import LoginScreen from '../../src/screens/auth/login/LoginScreen';

const { useNavigation: getNav } = jest.requireMock('@react-navigation/native');
const navigation = getNav();

const createStore = () =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        user: null,
        loading: false,
      },
    },
  });

const renderWithStore = () => {
  const store = createStore();
  return render(
    <Provider store={store}>
      <LoginScreen navigation={navigation} />
    </Provider>
  );
};

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the welcome heading', () => {
    const { getByText } = renderWithStore();
    expect(getByText('WELCOME BACK!')).toBeTruthy();
  });

  it('renders email and password fields', () => {
    const { getByText } = renderWithStore();
    expect(getByText('Email address')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
  });

  it('renders Remember Me checkbox', () => {
    const { getByText } = renderWithStore();
    expect(getByText('Remember Me')).toBeTruthy();
  });

  it('renders Forgot Password link', () => {
    const { getByText } = renderWithStore();
    expect(getByText('Forgot Password?')).toBeTruthy();
  });

  it('navigates to ForgotPassword on press', () => {
    const { getByText } = renderWithStore();
    fireEvent.press(getByText('Forgot Password?'));
    expect(navigation.navigate).toHaveBeenCalledWith('ForgotPassword');
  });

  it('renders social login buttons', () => {
    const { getByText } = renderWithStore();
    expect(getByText('Google')).toBeTruthy();
    expect(getByText('Apple')).toBeTruthy();
  });

  it('renders sign up link', () => {
    const { getByText } = renderWithStore();
    expect(getByText('Sign up')).toBeTruthy();
  });

  it('navigates to RoleSelection on sign up', () => {
    const { getByText } = renderWithStore();
    fireEvent.press(getByText('Sign up'));
    expect(navigation.navigate).toHaveBeenCalledWith('RoleSelection');
  });
});
