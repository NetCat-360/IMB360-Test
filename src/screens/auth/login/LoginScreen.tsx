// src/screens/auth/login/LoginScreen.tsx

import React, { useState, useReducer } from 'react';

import {
  View,
  Text,
  Image,
  Pressable,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import LinearGradient from 'react-native-linear-gradient';

import {
  verticalScale,
} from '../../../utils/scaling';

import { AuthNavigationProp } from '../../../types/navigation';

import TextField from '../../../components/common/TextField/TextField';
import { authInputStyles } from '../inputStyles';

import { useAppDispatch } from '../../../hooks/redux';

import {
  loginSuccess,
} from '../../../store/slices/authSlice';

import { useGlobalToast } from '../../../context/ToastContext';

import { Colors } from '../../../config/theme';

import Typography from '../../../styles/typography';

import styles from '../register/styles';
import { localStyles } from './styles';

import apiClient from '../../../api/client';
import { AUTH } from '../../../api/endpoints';
import Config from 'react-native-config';

import {
  sanitizeEmail,
  sanitizeText,
  isStrongPassword,
} from '../../../security/sanitize';
import {
  hashPassword,
  saveUserToKeychain,
  saveAccessToken,
  saveRefreshToken,
  decryptAsyncData,
} from '../../../security/encryption';

import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: AuthNavigationProp<'Login'>;
};

const ADMIN_EMAIL = Config.ADMIN_EMAIL?.toLowerCase() ?? '';
const ADMIN_PASSWORD = Config.ADMIN_PASSWORD ?? '';

const isEmailValid = (
  text: string,
) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    text,
  );

function RememberForgotRow({ rememberMe, setRememberMe, navigation }: { rememberMe: boolean; setRememberMe: (v: boolean) => void; navigation: any }) {
  return (
    <View style={[styles.checkboxContainer, { justifyContent: 'space-between', width: '100%' }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable style={[styles.customCheckbox, rememberMe && styles.customCheckboxChecked]} onPress={() => setRememberMe(!rememberMe)}>
          {rememberMe && <Text style={styles.checkmarkIcon}>✓</Text>}
        </Pressable>
        <Text style={styles.checkboxLabel}>Remember Me</Text>
      </View>
      <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={[styles.checkboxLabel, { color: Colors.textPrimary }]}>Forgot Password?</Text>
      </Pressable>
    </View>
  );
}

function SocialRow() {
  return (
    <View style={styles.socialRow}>
      <Pressable style={styles.socialButton}>
        <Image source={require('../../../assets/images/google.png')} style={styles.socialIcon} />
        <Text style={styles.socialText}>Google</Text>
      </Pressable>
      <Pressable style={styles.socialButton}>
        <Image source={require('../../../assets/images/apple.png')} style={[styles.socialIcon, { tintColor: Colors.textPrimary }]} />
        <Text style={styles.socialText}>Apple</Text>
      </Pressable>
    </View>
  );
}

type FormAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_REMEMBER_ME'; payload: boolean };

interface FormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

const initialFormState: FormState = {
  email: '',
  password: '',
  rememberMe: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_REMEMBER_ME':
      return { ...state, rememberMe: action.payload };
    default:
      return state;
  }
}

function LoginHeader({ navigation }: { navigation: any }) {
  return (
    <>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </Pressable>
      <View style={localStyles.logoTopContainer}>
        <Image
          source={require('../../../assets/images/IMB360_v2.png')}
          style={localStyles.adaptedLogoStyle}
          resizeMode="contain"
        />
      </View>
    </>
  );
}

function LoginFormContent({
  email,
  onEmailChange,
  password,
  onPasswordChange,
  securePassword,
  setSecurePassword,
  rememberMe,
  onRememberMeChange,
  isFormComplete,
  loading,
  onSubmit,
  navigation,
}: {
  email: string;
  onEmailChange: (text: string) => void;
  password: string;
  onPasswordChange: (text: string) => void;
  securePassword: boolean;
  setSecurePassword: (v: boolean) => void;
  rememberMe: boolean;
  onRememberMeChange: (v: boolean) => void;
  isFormComplete: boolean;
  loading: boolean;
  onSubmit: () => void;
  navigation: any;
}) {
  return (
    <View
      style={[
        styles.formFlowWrapper,
        {
          marginTop: verticalScale(-5),
        },
      ]}
    >
      <Text
        style={[
          Typography.h1,
          localStyles.heading,
        ]}
      >
        WELCOME BACK!
      </Text>

      <TextField
        label="Email address"
        value={email}
        onChangeText={onEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        containerStyle={authInputStyles.inputWrapper}
        outlineStyle={authInputStyles.inputOutline}
        outlineActiveStyle={authInputStyles.inputOutlineActive}
        style={authInputStyles.textInput}
      />

      <TextField
        label="Password"
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry={securePassword}
        rightComponent={<PasswordToggle securePassword={securePassword} setSecurePassword={setSecurePassword} />}
        autoCapitalize="none"
        containerStyle={authInputStyles.inputWrapper}
        outlineStyle={authInputStyles.inputOutline}
        outlineActiveStyle={authInputStyles.inputOutlineActive}
        style={authInputStyles.textInput}
      />

      <RememberForgotRow rememberMe={rememberMe} setRememberMe={onRememberMeChange} navigation={navigation} />

      <Pressable
        style={[
          styles.submitButton,
          {
            opacity: isFormComplete && !loading ? 1 : 0.4,
          },
        ]}
        onPress={onSubmit}
        disabled={!isFormComplete || loading}
      >
        <LinearGradient
          colors={[Colors.teal, Colors.teal]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButtonLayout}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Text>
        </LinearGradient>
      </Pressable>

      <Text style={styles.dividerText}>Or continue with</Text>

      <SocialRow />
    </View>
  );
}

function RegisterRedirect({ navigation }: { navigation: any }) {
  return (
    <Pressable
      onPress={() => navigation.navigate('Register', { role: 'CREATOR' })}
      style={styles.redirectLinkWrapper}
    >
      <Text style={styles.footerRedirectText}>
        Don't have an account?{' '}
        <Text style={styles.linkTextInline}>Sign up</Text>
      </Text>
    </Pressable>
  );
}

const LoginScreen = ({
  navigation,
}: Props) => {
  const [formState, dispatchForm] = useReducer(formReducer, initialFormState);

  const [
    securePassword,
    setSecurePassword,
  ] = useState(true);

  const [loading, setLoading] =
    useState(false);

  const dispatch =
    useAppDispatch();

  const { showToast } =
    useGlobalToast();

  const isFormComplete =
    isEmailValid(formState.email) &&
    formState.password.trim().length >= 8;

  // ─────────────────────────────
  // Login Handler
  // ─────────────────────────────

  const handleLogin =
    async () => {
      const cleanEmail =
        sanitizeEmail(formState.email);

      const cleanPassword =
        sanitizeText(formState.password, 128);

      if (!isEmailValid(cleanEmail)) {
        showToast(
          'Please enter a valid email address.',
          'error',
        );
        return;
      }

      if (!isStrongPassword(cleanPassword)) {
        showToast(
          'Password must contain uppercase, lowercase, number and special character.',
          'error',
        );
        return;
      }

      setLoading(true);

      // Check admin credentials first — works offline as fallback
      if (
        cleanEmail === ADMIN_EMAIL &&
        cleanPassword === ADMIN_PASSWORD &&
        ADMIN_PASSWORD
      ) {
        try {
          const adminUser = {
            id: 'admin-id',
            email: cleanEmail,
            name: 'Admin',
            username: 'admin',
            role: 'ADMIN' as const,
            permissions: {
              canViewDashboard: true,
              canManageCampaigns: true,
              canManageContent: true,
              canManagePricing: true,
              canManageSettings: true,
              canViewEarnings: true,
            },
          };
          const mockToken = 'mock-admin-token';
          await Promise.all([
            saveAccessToken(mockToken),
            saveRefreshToken(mockToken),
            saveUserToKeychain(adminUser),
          ]);
          dispatch(loginSuccess({ user: adminUser, accessToken: mockToken, refreshToken: mockToken }));
          showToast('Admin login successful.', 'success');
        } catch {
          showToast('Login failed. Please try again.', 'error');
        }
        setLoading(false);
        return;
      }

      // Check AsyncStorage for a locally registered user first (instant, no network)
      try {
        const raw = await AsyncStorage.getItem('registered_users');
        let stored: any = {};
        if (raw) {
          stored = await decryptAsyncData<any>(raw) || {};
        }
        const localUser = stored[cleanEmail];

        if (localUser && (localUser.password === hashPassword(cleanPassword) || localUser.password === cleanPassword)) {
          const user = {
            id: `local-${cleanEmail}`,
            email: cleanEmail,
            name: localUser.name,
            username: localUser.username || cleanEmail.split('@')[0],
            role: localUser.role || 'CREATOR',
            permissions: {
              canViewDashboard: true,
              canManageCampaigns: true,
              canManageContent: true,
              canManagePricing: true,
              canManageSettings: true,
              canViewEarnings: true,
            },
          };
          const mockToken = `local-token-${Date.now()}`;
          await saveAccessToken(mockToken);
          await saveUserToKeychain(user);
          dispatch(loginSuccess({ user, accessToken: mockToken, refreshToken: mockToken }));
          showToast('Login successful (offline).', 'success');
          setLoading(false);
          return;
        }
      } catch {}

      // No local match — try the backend API
      try {
        const response = await apiClient.post(AUTH.LOGIN, {
          email: cleanEmail,
          password: cleanPassword,
        });

        const { user, accessToken, refreshToken } = response.data;

        await saveAccessToken(accessToken);
        if (refreshToken) {
          await saveRefreshToken(refreshToken);
        }
        await saveUserToKeychain(user);

        dispatch(loginSuccess({ user, accessToken, refreshToken }));
        showToast('Login successful.', 'success');
      } catch (error: any) {
        if (error?.response?.status === 401) {
          showToast('Invalid email or password.', 'error');
        } else {
          showToast('Login failed. Please check your connection and try again.', 'error');
        }
      } finally {
        setLoading(false);
      }
    };

  // ─────────────────────────────
  // Password Toggle
  // ─────────────────────────────

  // ─────────────────────────────
  // UI
  // ─────────────────────────────

  return (
    <SafeAreaView
      style={styles.container}
      edges={[
        'top',
        'bottom',
      ]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={
          Colors.bgBlack
        }
      />

      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
        style={{ flex: 1 }}
      >
        <View
          style={
            styles.fixedContentContainer
          }
        >
          <LoginHeader navigation={navigation} />
          <LoginFormContent
            email={formState.email}
            onEmailChange={(text) => dispatchForm({ type: 'SET_EMAIL', payload: text })}
            password={formState.password}
            onPasswordChange={(text) => dispatchForm({ type: 'SET_PASSWORD', payload: text })}
            securePassword={securePassword}
            setSecurePassword={setSecurePassword}
            rememberMe={formState.rememberMe}
            onRememberMeChange={(v) => dispatchForm({ type: 'SET_REMEMBER_ME', payload: v })}
            isFormComplete={isFormComplete}
            loading={loading}
            onSubmit={handleLogin}
            navigation={navigation}
          />
          <RegisterRedirect navigation={navigation} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};



const PasswordToggle = ({ securePassword, setSecurePassword }: { securePassword: boolean; setSecurePassword: (v: boolean) => void }) => (
  <Pressable onPress={() => setSecurePassword(!securePassword)} style={styles.inlineActionWrapper}>
    <Text style={[styles.inlineActionText, { color: Colors.textDim }]}>
      {securePassword ? 'Show' : 'Hide'}
    </Text>
  </Pressable>
);

export default LoginScreen;