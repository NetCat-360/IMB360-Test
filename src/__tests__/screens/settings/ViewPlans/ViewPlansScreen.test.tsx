import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ViewPlansScreen from '../../../../screens/settings/ViewPlans/ViewPlansScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn(), pop: jest.fn(), replace: jest.fn() } as any),
}));

jest.mock('react-native-svg', () => ({
  __esModule: true,
  default: 'Svg',
  Svg: 'Svg',
  Rect: 'Rect',
  Path: 'Path',
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

describe('ViewPlansScreen', () => {
  it('renders screen header', () => {
    const { getByText } = render(
      <ViewPlansScreen navigation={{ goBack: jest.fn() } as any} />
    );
    expect(getByText('View Plans')).toBeTruthy();
  });

  it('renders tab buttons', () => {
    const { getByText } = render(
      <ViewPlansScreen navigation={{ goBack: jest.fn() } as any} />
    );
    expect(getByText('Starter')).toBeTruthy();
    expect(getByText('Professional')).toBeTruthy();
    expect(getByText('Enterprise')).toBeTruthy();
  });

  it('renders default selected plan (Professional)', () => {
    const { getByText } = render(
      <ViewPlansScreen navigation={{ goBack: jest.fn() } as any} />
    );
    expect(getByText('Professional Pack')).toBeTruthy();
    expect(getByText('6 months')).toBeTruthy();
  });

  it('switches to Starter plan on tab press', () => {
    const { getByText } = render(
      <ViewPlansScreen navigation={{ goBack: jest.fn() } as any} />
    );
    fireEvent.press(getByText('Starter'));
    expect(getByText('Starter Pack')).toBeTruthy();
  });

  it('renders Active Plan badge for Professional', () => {
    const { getByText } = render(
      <ViewPlansScreen navigation={{ goBack: jest.fn() } as any} />
    );
    expect(getByText('Active Plan')).toBeTruthy();
  });

  it('renders plan features', () => {
    const { getByText } = render(
      <ViewPlansScreen navigation={{ goBack: jest.fn() } as any} />
    );
    expect(getByText('Advanced campaign tools')).toBeTruthy();
    expect(getByText('Priority support')).toBeTruthy();
  });

  it('renders payment details footer', () => {
    const { getByText } = render(
      <ViewPlansScreen navigation={{ goBack: jest.fn() } as any} />
    );
    expect(getByText('Payment Details')).toBeTruthy();
  });
});
