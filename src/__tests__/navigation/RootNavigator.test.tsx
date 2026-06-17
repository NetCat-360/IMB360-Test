import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('../../navigation/AuthNavigator', () => 'AuthNavigator');
jest.mock('../../navigation/AppNavigator', () => 'AppNavigator');
jest.mock('../../navigation/BrandAppNavigator', () => 'BrandAppNavigator');

const mockRootState: any = {
  auth: { isAuthenticated: false, user: null },
};

jest.mock('react-redux', () => ({
  Provider: ({ children }: any) => children,
  useDispatch: () => jest.fn(),
  useSelector: (selector: any) => selector(mockRootState),
}));

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: any) => children,
  useNavigation: () => ({}),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }: any) => children,
    Screen: ({ component: Component }: any) => (Component ? <Component /> : null),
  }),
}));

import RootNavigator from '../../navigation/RootNavigator';

describe('RootNavigator', () => {
  beforeEach(() => {
    mockRootState.auth = { isAuthenticated: false, user: null };
  });

  it('renders without crashing', () => {
    expect(() => render(<RootNavigator />)).not.toThrow();
  });

  it('renders AuthNavigator when not authenticated', () => {
    mockRootState.auth = { isAuthenticated: false, user: null };
    const { UNSAFE_getByType } = render(<RootNavigator />);
    expect(UNSAFE_getByType('AuthNavigator' as any)).toBeTruthy();
  });

  it('renders AppNavigator when authenticated as CREATOR', () => {
    mockRootState.auth = { isAuthenticated: true, user: { role: 'CREATOR' } };
    const { UNSAFE_getByType } = render(<RootNavigator />);
    expect(UNSAFE_getByType('AppNavigator' as any)).toBeTruthy();
  });

  it('renders BrandAppNavigator when authenticated as BRAND', () => {
    mockRootState.auth = { isAuthenticated: true, user: { role: 'BRAND' } };
    const { UNSAFE_getByType } = render(<RootNavigator />);
    expect(UNSAFE_getByType('BrandAppNavigator' as any)).toBeTruthy();
  });
});
