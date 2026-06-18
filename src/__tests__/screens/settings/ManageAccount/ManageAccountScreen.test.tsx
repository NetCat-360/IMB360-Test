import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ManageAccountScreen from '../../../../screens/settings/ManageAccount/ManageAccountScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn(), pop: jest.fn(), replace: jest.fn() } as any),
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

describe('ManageAccountScreen', () => {
  it('renders screen header', () => {
    const { getByText } = render(
      <ManageAccountScreen navigation={{ goBack: jest.fn() } as any} />
    );
    expect(getByText('Manage Account')).toBeTruthy();
  });

  it('renders dropdown sections', () => {
    const { getByText } = render(
      <ManageAccountScreen navigation={{ goBack: jest.fn() } as any} />
    );
    expect(getByText('Edit Profile')).toBeTruthy();
    expect(getByText('Edit Email ID')).toBeTruthy();
  });

  it('expands Edit Profile section on press', () => {
    const { getByText, getByPlaceholderText } = render(
      <ManageAccountScreen navigation={{ goBack: jest.fn() } as any} />
    );
    fireEvent.press(getByText('Edit Profile'));
    expect(getByPlaceholderText('Full Name')).toBeTruthy();
    expect(getByPlaceholderText('Email Address')).toBeTruthy();
    expect(getByPlaceholderText('Phone Number')).toBeTruthy();
  });

  it('expands Edit Email ID section on press', () => {
    const { getByText, getByPlaceholderText } = render(
      <ManageAccountScreen navigation={{ goBack: jest.fn() } as any} />
    );
    fireEvent.press(getByText('Edit Email ID'));
    expect(getByPlaceholderText('Email Address')).toBeTruthy();
  });
});
