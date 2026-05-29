import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RoleSelectionScreen from '../../src/screens/auth/role-selection/RoleSelectionScreen';

const { useNavigation } = jest.requireMock('@react-navigation/native');

describe('RoleSelectionScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders role selection heading', () => {
    const navigation = useNavigation();
    const { getByText } = render(<RoleSelectionScreen navigation={navigation} />);
    expect(getByText('CHOOSE YOUR PROFILE')).toBeTruthy();
  });

  it('has Creator and Brand options', () => {
    const navigation = useNavigation();
    const { getByText } = render(<RoleSelectionScreen navigation={navigation} />);
    expect(getByText(/CREATOR/)).toBeTruthy();
    expect(getByText(/BRAND/)).toBeTruthy();
  });

  it('renders Select a Profile button when nothing selected', () => {
    const navigation = useNavigation();
    const { getByText } = render(<RoleSelectionScreen navigation={navigation} />);
    expect(getByText('Select a Profile')).toBeTruthy();
  });

  it('renders Continue button when role selected', () => {
    const navigation = useNavigation();
    const { getByText } = render(<RoleSelectionScreen navigation={navigation} />);
    fireEvent.press(getByText(/CREATOR/));
    expect(getByText('Continue')).toBeTruthy();
  });

  it('navigates to AuthEntryPoint on continue', () => {
    const navigation = useNavigation();
    const { getByText } = render(<RoleSelectionScreen navigation={navigation} />);
    fireEvent.press(getByText(/CREATOR/));
    fireEvent.press(getByText('Continue'));
    expect(navigation.navigate).toHaveBeenCalledWith('AuthEntryPoint', { role: 'CREATOR' });
  });
});
