import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AuthEntryPointScreen from '../../../../screens/auth/entry-point/AuthEntryPointScreen';

jest.mock('../../../../context/ToastContext', () => ({
  useGlobalToast: () => ({ showToast: jest.fn() }),
}));

const createMockNav = () => ({
  navigate: jest.fn(),
  replace: jest.fn(),
  goBack: jest.fn(),
  pop: jest.fn(),
});

describe('AuthEntryPointScreen', () => {
  it('renders CREATOR variant correctly', () => {
    const navigation = createMockNav();
    const route = { params: { role: 'CREATOR' } } as any;
    const { getByText } = render(
      <AuthEntryPointScreen navigation={navigation} route={route} />,
    );
    expect(getByText(/I'M A/)).toBeTruthy();
    expect(getByText('CREATOR')).toBeTruthy();
    expect(
      getByText(/I'm an influencer looking to grow my reach/),
    ).toBeTruthy();
    expect(getByText('JOIN AS CREATOR/INFLUENCER')).toBeTruthy();
  });

  it('renders BRAND variant correctly', () => {
    const navigation = createMockNav();
    const route = { params: { role: 'BRAND' } } as any;
    const { getByText } = render(
      <AuthEntryPointScreen navigation={navigation} route={route} />,
    );
    expect(getByText('BRAND')).toBeTruthy();
    expect(
      getByText(/Scale your campaigns and find the perfect creators/),
    ).toBeTruthy();
    expect(getByText('JOIN AS BRAND')).toBeTruthy();
  });

  it('defaults to CREATOR when route.params is undefined', () => {
    const navigation = createMockNav();
    const route = { params: undefined } as any;
    const { getByText } = render(
      <AuthEntryPointScreen navigation={navigation} route={route} />,
    );
    expect(getByText('CREATOR')).toBeTruthy();
  });

  it('navigates to Register with role on JOIN press (CREATOR)', () => {
    const navigation = createMockNav();
    const route = { params: { role: 'CREATOR' } } as any;
    const { getByText } = render(
      <AuthEntryPointScreen navigation={navigation} route={route} />,
    );
    fireEvent.press(getByText('JOIN AS CREATOR/INFLUENCER'));
    expect(navigation.navigate).toHaveBeenCalledWith('Register', {
      role: 'CREATOR',
    });
  });

  it('navigates to Register with role on JOIN press (BRAND)', () => {
    const navigation = createMockNav();
    const route = { params: { role: 'BRAND' } } as any;
    const { getByText } = render(
      <AuthEntryPointScreen navigation={navigation} route={route} />,
    );
    fireEvent.press(getByText('JOIN AS BRAND'));
    expect(navigation.navigate).toHaveBeenCalledWith('Register', {
      role: 'BRAND',
    });
  });

  it('navigates to Login on "Login" press', () => {
    const navigation = createMockNav();
    const route = { params: { role: 'CREATOR' } } as any;
    const { getByText } = render(
      <AuthEntryPointScreen navigation={navigation} route={route} />,
    );
    fireEvent.press(getByText('Login'));
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('calls goBack on back button press', () => {
    const navigation = createMockNav();
    const route = { params: { role: 'CREATOR' } } as any;
    const { getByText } = render(
      <AuthEntryPointScreen navigation={navigation} route={route} />,
    );
    fireEvent.press(getByText('←'));
    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('renders "Already have an account?" text', () => {
    const navigation = createMockNav();
    const route = { params: { role: 'CREATOR' } } as any;
    const { getByText } = render(
      <AuthEntryPointScreen navigation={navigation} route={route} />,
    );
    expect(getByText('Already have an account? ')).toBeTruthy();
  });
});
