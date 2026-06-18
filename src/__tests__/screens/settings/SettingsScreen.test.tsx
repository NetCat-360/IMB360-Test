import React from 'react';
import { render } from '@testing-library/react-native';
import SettingsScreen from '../../../screens/settings/SettingsScreen';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn(), pop: jest.fn(), replace: jest.fn() } as any),
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

jest.mock('../../../security/encryption', () => ({
  removeUserFromKeychain: jest.fn().mockResolvedValue(undefined),
  removeTokensFromKeychain: jest.fn().mockResolvedValue(undefined),
}));

const store = configureStore({
  reducer: {
    auth: () => ({
      isAuthenticated: true,
      user: { name: 'Test User', username: 'testuser', role: 'Brand' },
      accessToken: 'token',
      refreshToken: 'refresh',
      loading: false,
    }),
  },
});

describe('SettingsScreen', () => {
  it('renders screen header', () => {
    const { getByText } = render(
      <Provider store={store}>
        <SettingsScreen navigation={{ navigate: jest.fn(), goBack: jest.fn() } as any} />
      </Provider>
    );
    expect(getByText('Settings')).toBeTruthy();
  });

  it('renders user name and username from store', () => {
    const { getByText } = render(
      <Provider store={store}>
        <SettingsScreen navigation={{ navigate: jest.fn(), goBack: jest.fn() } as any} />
      </Provider>
    );
    expect(getByText('Test User')).toBeTruthy();
    expect(getByText('@testuser')).toBeTruthy();
  });

  it('renders user role', () => {
    const { getByText } = render(
      <Provider store={store}>
        <SettingsScreen navigation={{ navigate: jest.fn(), goBack: jest.fn() } as any} />
      </Provider>
    );
    expect(getByText('Brand')).toBeTruthy();
  });

  it('renders personal info section', () => {
    const { getByText } = render(
      <Provider store={store}>
        <SettingsScreen navigation={{ navigate: jest.fn(), goBack: jest.fn() } as any} />
      </Provider>
    );
    expect(getByText('Personal Info')).toBeTruthy();
    expect(getByText('Manage Account')).toBeTruthy();
    expect(getByText('Bio')).toBeTruthy();
    expect(getByText('Social Media Profiles')).toBeTruthy();
    expect(getByText('Additional Info')).toBeTruthy();
  });

  it('renders logout button', () => {
    const { getByText } = render(
      <Provider store={store}>
        <SettingsScreen navigation={{ navigate: jest.fn(), goBack: jest.fn() } as any} />
      </Provider>
    );
    expect(getByText('Log out')).toBeTruthy();
  });
});
