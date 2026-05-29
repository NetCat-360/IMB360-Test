import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AuthEntryPointScreen from '../../src/screens/auth/entry-point/AuthEntryPointScreen';

const { useNavigation, useRoute } = jest.requireMock('@react-navigation/native');

describe('AuthEntryPointScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders creator content by default', () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { getByText } = render(<AuthEntryPointScreen navigation={navigation} route={{ ...route, params: { role: 'CREATOR' } }} />);
    expect(getByText("I'M A CREATOR")).toBeTruthy();
  });

  it('renders brand content with brand role param', () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { getByText } = render(<AuthEntryPointScreen navigation={navigation} route={{ ...route, params: { role: 'BRAND' } }} />);
    expect(getByText("I'M A BRAND")).toBeTruthy();
  });

  it('has a join button', () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { getByText } = render(<AuthEntryPointScreen navigation={navigation} route={{ ...route, params: { role: 'CREATOR' } }} />);
    expect(getByText(/JOIN AS/)).toBeTruthy();
  });

  it('navigates to Login on Login press', () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { getByText } = render(<AuthEntryPointScreen navigation={navigation} route={{ ...route, params: { role: 'CREATOR' } }} />);
    fireEvent.press(getByText('Login'));
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('navigates back on back press', () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { getByText } = render(<AuthEntryPointScreen navigation={navigation} route={{ ...route, params: { role: 'CREATOR' } }} />);
    fireEvent.press(getByText('\u2190'));
    expect(navigation.goBack).toHaveBeenCalled();
  });
});
