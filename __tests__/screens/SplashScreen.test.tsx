import React from 'react';
import { render } from '@testing-library/react-native';
import SplashScreen from '../../src/screens/splash/SplashScreen';

jest.useFakeTimers();

describe('SplashScreen', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<SplashScreen />);
    expect(toJSON()).toBeTruthy();
  });

  it('navigates to Onboarding after 3 seconds', () => {
    const { useNavigation } = require('@react-navigation/native');
    render(<SplashScreen />);
    jest.advanceTimersByTime(3000);
    expect(useNavigation().replace).toHaveBeenCalledWith('Onboarding');
  });
});
