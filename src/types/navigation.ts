// src/types/navigation.ts
// FIX: Added CampaignQueue to AppStackParamList
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  RoleSelection: undefined;
  AuthEntryPoint: { role: 'BRAND' | 'CREATOR' };
  Register: { role: 'BRAND' | 'CREATOR' };
  Login: undefined;
  ForgotPassword: undefined;
  ResetPassword: { verifiedEmail: string };
  Verification: { destination: string; flow: 'password_reset' | 'registration' };
};

export type AppStackParamList = {
  Home: undefined;
  Overview: undefined;
  Content: undefined;
  Pricing: undefined;
  MyEarnings: undefined;
  CampaignQueue: undefined; // FIX: was missing, caused Campaign Queue menu to dead-end
};

export type AuthNavigationProp<T extends keyof AuthStackParamList> =
  NativeStackNavigationProp<AuthStackParamList, T>;

export type AuthRouteProp<T extends keyof AuthStackParamList> =
  RouteProp<AuthStackParamList, T>;

export type AppNavigationProp<T extends keyof AppStackParamList> =
  NativeStackNavigationProp<AppStackParamList, T>;

export type AppRouteProp<T extends keyof AppStackParamList> =
  RouteProp<AppStackParamList, T>;
