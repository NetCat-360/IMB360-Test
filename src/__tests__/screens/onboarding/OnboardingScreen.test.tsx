import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OnboardingScreen from '../../../screens/onboarding/OnboardingScreen';

const createMockNav = () => ({
  navigate: jest.fn(),
  replace: jest.fn(),
  goBack: jest.fn(),
  pop: jest.fn(),
});

describe('OnboardingScreen', () => {
  it('renders first slide with FIND CREATORS title', () => {
    const navigation = createMockNav();
    const { getByText } = render(
      <OnboardingScreen navigation={navigation} />,
    );
    expect(getByText('FIND CREATORS')).toBeTruthy();
  });

  it('renders Next button on first slide', () => {
    const navigation = createMockNav();
    const { getByText } = render(
      <OnboardingScreen navigation={navigation} />,
    );
    expect(getByText('Next')).toBeTruthy();
  });

  it('renders Skip button on first slide', () => {
    const navigation = createMockNav();
    const { getByText } = render(
      <OnboardingScreen navigation={navigation} />,
    );
    expect(getByText('Skip')).toBeTruthy();
  });

  it('pressing Skip navigates to RoleSelection', () => {
    const navigation = createMockNav();
    const { getByText } = render(
      <OnboardingScreen navigation={navigation} />,
    );
    fireEvent.press(getByText('Skip'));
    expect(navigation.replace).toHaveBeenCalledWith('RoleSelection');
  });

  it('pressing Next advances from slide 1 to slide 2', () => {
    const navigation = createMockNav();
    const { getByText } = render(
      <OnboardingScreen navigation={navigation} />,
    );
    fireEvent.press(getByText('Next'));
    expect(getByText('GROW FASTER')).toBeTruthy();
  });

  it('pressing Next from slide 2 advances to slide 3', () => {
    const navigation = createMockNav();
    const { getByText } = render(
      <OnboardingScreen navigation={navigation} />,
    );
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));
    expect(getByText('READY TO SCALE')).toBeTruthy();
  });

  it('shows Get Started on last slide', () => {
    const navigation = createMockNav();
    const { getByText, queryByText } = render(
      <OnboardingScreen navigation={navigation} />,
    );
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));
    expect(queryByText('Next')).toBeNull();
    expect(getByText('Get Started')).toBeTruthy();
  });

  it('pressing Get Started on last slide navigates to RoleSelection', () => {
    const navigation = createMockNav();
    const { getByText } = render(
      <OnboardingScreen navigation={navigation} />,
    );
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Get Started'));
    expect(navigation.replace).toHaveBeenCalledWith('RoleSelection');
  });

  it('hides back button on first slide', () => {
    const navigation = createMockNav();
    const { queryByText } = render(
      <OnboardingScreen navigation={navigation} />,
    );
    expect(queryByText('←')).toBeNull();
  });

  it('shows back button after advancing to slide 2', () => {
    const navigation = createMockNav();
    const { getByText } = render(
      <OnboardingScreen navigation={navigation} />,
    );
    fireEvent.press(getByText('Next'));
    expect(getByText('←')).toBeTruthy();
  });

  it('pressing back returns from slide 2 to slide 1', () => {
    const navigation = createMockNav();
    const { getByText, queryByText } = render(
      <OnboardingScreen navigation={navigation} />,
    );
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('←'));
    expect(queryByText('GROW FASTER')).toBeNull();
    expect(getByText('FIND CREATORS')).toBeTruthy();
  });

  it('renders subtitle and highlight text on first slide', () => {
    const navigation = createMockNav();
    const { getByText } = render(
      <OnboardingScreen navigation={navigation} />,
    );
    expect(getByText('FOR ')).toBeTruthy();
    expect(getByText('YOUR BRAND')).toBeTruthy();
  });
});
