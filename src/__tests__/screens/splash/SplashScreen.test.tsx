import React from 'react';
import { render } from '@testing-library/react-native';
import SplashScreen from '../../../screens/splash/SplashScreen';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: () => ({}),
}));

const mockReplace = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    replace: mockReplace,
    goBack: jest.fn(),
    pop: jest.fn(),
  } as any),
}));

jest.mock('../../../security/encryption', () => ({
  getUserFromKeychain: jest.fn().mockResolvedValue(null),
  getAccessToken: jest.fn().mockResolvedValue(null),
  saveUserToKeychain: jest.fn(),
  saveAccessToken: jest.fn(),
  saveRefreshToken: jest.fn(),
  hashPassword: jest.fn(),
  decryptAsyncData: jest.fn(),
  encryptAsyncData: jest.fn(),
}));

jest.mock('../../../store/slices/authSlice', () => ({
  loginSuccess: (payload: any) => ({
    type: 'auth/loginSuccess',
    payload,
  }),
  logout: () => ({ type: 'auth/logout' }),
}));

describe('SplashScreen', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    const { root } = render(<SplashScreen />);
    expect(root).toBeTruthy();
  });

  it('navigates to Onboarding after timeout', () => {
    render(<SplashScreen />);
    jest.advanceTimersByTime(3000);
    expect(mockReplace).toHaveBeenCalledWith('Onboarding');
  });
});
