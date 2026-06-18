import React from 'react';
import { render } from '@testing-library/react-native';
import BioScreen from '../../../../screens/settings/Bio/BioScreen';

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

describe('BioScreen', () => {
  it('renders screen header', () => {
    const { getByText } = render(
      <BioScreen navigation={{ goBack: jest.fn() } as any} />
    );
    expect(getByText('Edit Bio')).toBeTruthy();
  });

  it('renders description text', () => {
    const { getByText } = render(
      <BioScreen navigation={{ goBack: jest.fn() } as any} />
    );
    expect(getByText(/Bio appears on the top of your profile/)).toBeTruthy();
  });

  it('renders bio input', () => {
    const { getByPlaceholderText } = render(
      <BioScreen navigation={{ goBack: jest.fn() } as any} />
    );
    expect(getByPlaceholderText('Tell us about yourself')).toBeTruthy();
  });

  it('renders Save Changes button', () => {
    const { getByText } = render(
      <BioScreen navigation={{ goBack: jest.fn() } as any} />
    );
    expect(getByText('Save Changes')).toBeTruthy();
  });
});
