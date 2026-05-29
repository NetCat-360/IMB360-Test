import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OnboardingScreen from '../../src/screens/onboarding/OnboardingScreen';

const { useNavigation } = jest.requireMock('@react-navigation/native');

describe('OnboardingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders first slide content', () => {
    const navigation = useNavigation();
    const { getByText } = render(<OnboardingScreen navigation={navigation} />);
    expect(getByText('FIND CREATORS')).toBeTruthy();
    expect(getByText('FOR')).toBeTruthy();
    expect(getByText('YOUR BRAND')).toBeTruthy();
  });

  it('shows Skip button on first slide', () => {
    const navigation = useNavigation();
    const { getByText } = render(<OnboardingScreen navigation={navigation} />);
    expect(getByText('Skip')).toBeTruthy();
  });

  it('shows Next button on first slide', () => {
    const navigation = useNavigation();
    const { getByText } = render(<OnboardingScreen navigation={navigation} />);
    expect(getByText('Next')).toBeTruthy();
  });

  it('renders Get Started on last slide', () => {
    const navigation = useNavigation();
    const { getByText } = render(<OnboardingScreen navigation={navigation} />);
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));
    expect(getByText('Get Started')).toBeTruthy();
  });

  it('navigates to RoleSelection on Get Started press', () => {
    const navigation = useNavigation();
    const { getByText } = render(<OnboardingScreen navigation={navigation} />);
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Get Started'));
    expect(navigation.replace).toHaveBeenCalledWith('RoleSelection');
  });

  it('navigates to RoleSelection on Skip press', () => {
    const navigation = useNavigation();
    const { getByText } = render(<OnboardingScreen navigation={navigation} />);
    fireEvent.press(getByText('Skip'));
    expect(navigation.replace).toHaveBeenCalledWith('RoleSelection');
  });
});
