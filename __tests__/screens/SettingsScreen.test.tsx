import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../src/features/auth/store/authSlice';
import SettingsScreen from '../../src/screens/settings/SettingsScreen';

const { useNavigation: getNav } = jest.requireMock('@react-navigation/native');
const navigation = getNav();

const createStore = () =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        isAuthenticated: true,
        accessToken: 'abc',
        refreshToken: 'def',
        user: {
          id: '1',
          email: 'test@test.com',
          name: 'Test User',
          role: 'CREATOR',
          permissions: {
            canViewDashboard: true,
            canManageCampaigns: false,
            canManageContent: true,
            canManagePricing: true,
            canViewEarnings: true,
            canManageSettings: false,
          },
        },
        loading: false,
      },
    },
  });

const renderWithStore = () => {
  const store = createStore();
  return render(
    <Provider store={store}>
      <SettingsScreen navigation={navigation} />
    </Provider>
  );
};

describe('SettingsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the settings title', () => {
    const { getByText } = renderWithStore();
    expect(getByText('Settings')).toBeTruthy();
  });

  it('renders sections', () => {
    const { getByText } = renderWithStore();
    expect(getByText('Personal Info')).toBeTruthy();
    expect(getByText('Subscription')).toBeTruthy();
    expect(getByText('Security')).toBeTruthy();
  });

  it('renders all setting items', () => {
    const { getByText } = renderWithStore();
    expect(getByText('Manage Account')).toBeTruthy();
    expect(getByText('Bio')).toBeTruthy();
    expect(getByText('Social Media Profiles')).toBeTruthy();
    expect(getByText('Additional Info')).toBeTruthy();
    expect(getByText('View Plans')).toBeTruthy();
    expect(getByText('Manage my subscription')).toBeTruthy();
    expect(getByText('Change Password')).toBeTruthy();
  });

  it('renders Log out button', () => {
    const { getByText } = renderWithStore();
    expect(getByText('Log out')).toBeTruthy();
  });

  it('renders the username and handle', () => {
    const { getByText } = renderWithStore();
    expect(getByText('Username')).toBeTruthy();
    expect(getByText('@username01')).toBeTruthy();
  });

  it('navigates to ManageAccount on press', () => {
    const { getByText } = renderWithStore();
    fireEvent.press(getByText('Manage Account'));
    expect(navigation.navigate).toHaveBeenCalledWith('ManageAccount');
  });

  it('navigates to ChangePassword on press', () => {
    const { getByText } = renderWithStore();
    fireEvent.press(getByText('Change Password'));
    expect(navigation.navigate).toHaveBeenCalledWith('ChangePassword');
  });

  it('dispatches logout on Log out press', () => {
    const { getByText } = renderWithStore();
    fireEvent.press(getByText('Log out'));
  });
});
