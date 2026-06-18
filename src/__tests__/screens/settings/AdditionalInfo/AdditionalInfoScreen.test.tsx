import React from 'react';
import { render } from '@testing-library/react-native';
import AdditionalInfoScreen from '../../../../screens/settings/AdditionalInfo/AdditionalInfoScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn(), pop: jest.fn(), replace: jest.fn() } as any),
}));

jest.mock('react-native-date-picker', () => 'DatePicker');

jest.mock('react-native-element-dropdown', () => ({
  Dropdown: 'DropdownMock',
}));

jest.mock('country-state-city/lib/country', () => ({
  getAllCountries: () => [
    { name: 'India', isoCode: 'IN' },
    { name: 'United States', isoCode: 'US' },
  ],
}));

jest.mock('country-state-city/lib/state', () => ({
  getStatesOfCountry: () => [
    { name: 'Delhi', isoCode: 'DL' },
    { name: 'Uttar Pradesh', isoCode: 'UP' },
  ],
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

describe('AdditionalInfoScreen', () => {
  it('renders screen header', () => {
    const { getByText } = render(
      <AdditionalInfoScreen navigation={{ goBack: jest.fn() } as any} />
    );
    expect(getByText('Additional Info')).toBeTruthy();
  });

  it('renders description text', () => {
    const { getByText } = render(
      <AdditionalInfoScreen navigation={{ goBack: jest.fn() } as any} />
    );
    expect(getByText(/This makes it easier for you to recover your account/)).toBeTruthy();
  });

  it('renders address input', () => {
    const { getByPlaceholderText } = render(
      <AdditionalInfoScreen navigation={{ goBack: jest.fn() } as any} />
    );
    expect(getByPlaceholderText('Enter your Street address')).toBeTruthy();
  });

  it('renders Save Info button', () => {
    const { getByText } = render(
      <AdditionalInfoScreen navigation={{ goBack: jest.fn() } as any} />
    );
    expect(getByText('Save Info')).toBeTruthy();
  });
});
