import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SocialMediaScreen from '../../../../screens/settings/SocialMedia/SocialMediaScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn(), pop: jest.fn(), replace: jest.fn() }),
}));

jest.mock('react-native-element-dropdown', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Dropdown: (props: any) => React.createElement(Text, null, props.placeholder || 'Dropdown'),
  };
});

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

describe('SocialMediaScreen', () => {
  it('renders screen header', () => {
    const { getByText } = render(
      <SocialMediaScreen navigation={{ goBack: jest.fn() }} />
    );
    expect(getByText('Social Media Platforms')).toBeTruthy();
  });

  it('renders user handle input', () => {
    const { getByPlaceholderText } = render(
      <SocialMediaScreen navigation={{ goBack: jest.fn() }} />
    );
    expect(getByPlaceholderText('Enter your user handle')).toBeTruthy();
  });

  it('renders Add Profile button', () => {
    const { getByText } = render(
      <SocialMediaScreen navigation={{ goBack: jest.fn() }} />
    );
    expect(getByText('Add Profile')).toBeTruthy();
  });

  it('renders dropdown with Select Platforms placeholder', () => {
    const { queryByText } = render(
      <SocialMediaScreen navigation={{ goBack: jest.fn() }} />
    );
    expect(queryByText('Select Platforms')).toBeTruthy();
  });
});
