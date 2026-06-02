import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';

import SplashScreen from '../screens/splash/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import RoleSelectionScreen from '../screens/auth/role-selection/RoleSelectionScreen';
import AuthEntryPointScreen from '../screens/auth/entry-point/AuthEntryPointScreen';
import RegisterScreen from '../screens/auth/register/RegisterScreen';
import LoginScreen from '../screens/auth/login/LoginScreen';
import ForgotPasswordScreen from '../screens/auth/forgot-password/ForgotPasswordScreen';
import VerificationScreen from '../screens/auth/verify/VerificationScreen';

// ── Placeholder screens ──────────────────────────────────────────────────────
// These exist so ForgotPasswordScreen's navigation.reset() to 'ResetPassword'
// doesn't crash the app. Replace with the real screen once it's built.
const ResetPasswordScreen = () => (
  <View style={{ flex: 1, backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: '#b6d82c', fontSize: 18, fontWeight: 'bold' }}>
      Reset Password: Coming Soon
    </Text>
  </View>
);
// ─────────────────────────────────────────────────────────────────────────────

// Passing AuthStackParamList as the generic here means TypeScript will
// error if you reference a screen name that isn't in your param list.
const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        // Paints the native background before JS renders the component,
        // eliminating the white flash during screen transitions.
        contentStyle: { backgroundColor: '#000000' },
        // Fade feels cleaner than slide for dark-background auth flows.
        animation: 'fade',
      }}
    >
      {/* ── App Init ───────────────────────────── */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />

      {/* ── Role Gateway ───────────────────────── */}
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="AuthEntryPoint" component={AuthEntryPointScreen} />

      {/* ── Identity / Credentials ─────────────── */}
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;