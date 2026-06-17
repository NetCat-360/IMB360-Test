import React from 'react';
import { render } from '@testing-library/react-native';
import SubscriptionScreen from '../../../../screens/settings/Subscription/SubscriptionScreen';

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

describe('SubscriptionScreen', () => {
  it('renders screen header', () => {
    const { getAllByText } = render(
      <SubscriptionScreen navigation={{ goBack: jest.fn() }} />
    );
    expect(getAllByText('Subscription').length).toBeGreaterThanOrEqual(1);
  });

  it('renders body text', () => {
    const { getAllByText } = render(
      <SubscriptionScreen navigation={{ goBack: jest.fn() }} />
    );
    expect(getAllByText('Subscription').length).toBe(2);
  });
});
