import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/splash';
import OnboardingScreen from '../screens/onboarding';
import RoleSelectionScreen from '../screens/auth/role-selection';
import AuthEntryPointScreen from '../screens/auth/entry-point';
import RegisterScreen from '../screens/auth/register';
import LoginScreen from '../screens/auth/login';
import ForgotPasswordScreen from '../screens/auth/forgot-password';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Splash"
      screenOptions={{ 
        headerShown: false,
        gestureEnabled: false 
      }}
    >
      {/* App Initialization Sequence */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      
      {/* Persona Gateways */}
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="AuthEntryPoint" component={AuthEntryPointScreen} />
      
      {/* Core Security & Identity Matrix */}
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;