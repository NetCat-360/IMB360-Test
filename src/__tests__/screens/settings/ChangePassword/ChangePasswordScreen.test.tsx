import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ChangePasswordScreen from '../../../../screens/settings/ChangePassword/ChangePasswordScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn(), pop: jest.fn(), replace: jest.fn() }),
}));

jest.mock('../../../../components/ScreenHeader', () => {
  const React = require('react');
  const { Text, Pressable } = require('react-native');
  return ({ title, onBack }: any) => (
    <>
      <Text>{title}</Text>
      {onBack && <Pressable testID="back-button" onPress={onBack}><Text>Back</Text></Pressable>}
    </>
  );
});

jest.mock('../../../../components/common/TextField/TextField', () => {
  const React = require('react');
  const { TextInput } = require('react-native');
  return (props: any) => <TextInput {...props} />;
});

describe('ChangePasswordScreen', () => {
  it('renders screen header', () => {
    const { getByText } = render(
      <ChangePasswordScreen navigation={{ goBack: jest.fn() }} />
    );
    expect(getByText('Change Password')).toBeTruthy();
  });

  it('renders password input fields', () => {
    const { getByPlaceholderText } = render(
      <ChangePasswordScreen navigation={{ goBack: jest.fn() }} />
    );
    expect(getByPlaceholderText('Old Password')).toBeTruthy();
    expect(getByPlaceholderText('New Password')).toBeTruthy();
    expect(getByPlaceholderText('Re-enter New Password')).toBeTruthy();
  });

  it('renders Save Changes button', () => {
    const { getByText } = render(
      <ChangePasswordScreen navigation={{ goBack: jest.fn() }} />
    );
    expect(getByText('Save Changes')).toBeTruthy();
  });

  it('opens OTP modal on Save Changes press', () => {
    const { getByText, getByPlaceholderText } = render(
      <ChangePasswordScreen navigation={{ goBack: jest.fn() }} />
    );
    fireEvent.changeText(getByPlaceholderText('Old Password'), 'old123');
    fireEvent.changeText(getByPlaceholderText('New Password'), 'new123');
    fireEvent.changeText(getByPlaceholderText('Re-enter New Password'), 'new123');
    fireEvent.press(getByText('Save Changes'));
    expect(getByText('Enter OTP')).toBeTruthy();
  });
});
