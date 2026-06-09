import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../hooks/redux';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import BrandAppNavigator from './BrandAppNavigator';

const Root = createNativeStackNavigator();

const RootNavigator = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const user = useAppSelector(state => state.auth.user);

  const isBrand = user?.role === 'BRAND';

  return (
    <Root.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
        // Same fix applied at the root level, covering the Auth <-> App swap
        contentStyle: { backgroundColor: '#000000' },
      }}
    >
      {isAuthenticated ? (
        <Root.Screen
          name={isBrand ? 'BrandApp' : 'App'}
          component={isBrand ? BrandAppNavigator : AppNavigator}
        />
      ) : (
        <Root.Screen name="Auth" component={AuthNavigator} />
      )}
    </Root.Navigator>
  );
};

export default RootNavigator;