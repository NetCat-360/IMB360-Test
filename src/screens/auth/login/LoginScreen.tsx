// src/screens/auth/login/LoginScreen.tsx

import React, { useState } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import LinearGradient from 'react-native-linear-gradient';

import {
  scale,
  verticalScale,
  moderateScale,
} from '../../../utils/scaling';

import { AuthNavigationProp } from '../../../types/navigation';

import FloatingInput from '../../../components/common/FloatingInput';

import { useAppDispatch } from '../../../hooks/redux';

import {
  loginSuccess,
} from '../../../features/auth/store/authSlice';

import { useGlobalToast } from '../../../context/ToastContext';

import { Colors } from '../../../config/theme';

import Typography from '../../../styles/typography';

import styles from '../register/styles';

type Props = {
  navigation: AuthNavigationProp<'Login'>;
};

const ADMIN_EMAIL = 'admin@imb360.com';
const ADMIN_PASSWORD = 'Admin@123';

const LoginScreen = ({
  navigation,
}: Props) => {
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [rememberMe, setRememberMe] =
    useState(false);

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

  // ─────────────────────────────
  // Sanitizers
  // ─────────────────────────────

  const sanitizeInput = (
    value: string,
  ) => {
    return value
      // Remove emojis / 4-byte chars
      .replace(
        /[\u{10000}-\u{10FFFF}]/gu,
        '',
      )
      // Remove null bytes
      .replace(/\0/g, '')
      .trim();
  };

  const isEmailValid = (
    text: string,
  ) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      text,
    );

  const isPasswordStrong = (
    text: string,
  ) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
      text,
    );

  const isFormComplete =
    isEmailValid(email) &&
    password.trim().length >= 8;

  // ─────────────────────────────
  // Login Handler
  // ─────────────────────────────

  const handleLogin =
    async () => {
      const sanitizedEmail =
        sanitizeInput(
          email.toLowerCase(),
        );

      const sanitizedPassword =
        sanitizeInput(password);

      // Email validation
      if (
        !isEmailValid(
          sanitizedEmail,
        )
      ) {
        showToast(
          'Please enter a valid email address.',
          'error',
        );

        return;
      }

      // Password validation
      if (
        !isPasswordStrong(
          sanitizedPassword,
        )
      ) {
        showToast(
          'Password must contain uppercase, lowercase, number and special character.',
          'error',
        );

        return;
      }

      setLoading(true);

      try {
        // Simulated API delay
        await new Promise<void>(
          resolve => {
            setTimeout(() => {
              resolve();
            }, 700);
          },
        );

        // ─────────────────────
        // ADMIN BYPASS LOGIN
        // ─────────────────────

        if (
          sanitizedEmail ===
            ADMIN_EMAIL &&
          sanitizedPassword ===
            ADMIN_PASSWORD
        ) {
          dispatch(
            loginSuccess({
              accessToken:
                'mock-access-token',

              refreshToken:
                'mock-refresh-token',

              user: {
                id: 'admin-id',

                email:
                  sanitizedEmail,

                role: 'ADMIN',

                permissions: {
                  canManageUsers:
                    true,

                  canCreateCampaigns:
                    true,

                  canViewPayments:
                    true,

                  canEditProfile:
                    true,
                },
              },
            }),
          );

          showToast(
            'Admin login successful.',
            'success',
          );

          return;
        }

        // Invalid login
        showToast(
          'Invalid credentials.',
          'error',
        );
      } catch (error) {
        console.log(
          'LOGIN ERROR:',
          error,
        );

        showToast(
          'Login failed. Please try again.',
          'error',
        );
      } finally {
        setLoading(false);
      }
    };

  // ─────────────────────────────
  // Password Toggle
  // ─────────────────────────────

  const renderPasswordToggle =
    () => (
      <TouchableOpacity
        onPress={() =>
          setSecurePassword(
            !securePassword,
          )
        }
        style={
          styles.inlineActionWrapper
        }
      >
        <Text
          style={[
            styles.inlineActionText,
            {
              color:
                Colors.textDim,
            },
          ]}
        >
          {securePassword
            ? 'Show'
            : 'Hide'}
        </Text>
      </TouchableOpacity>
    );

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
          {/* Back Button */}
          <TouchableOpacity
            style={
              styles.backButton
            }
            onPress={() =>
              navigation.goBack()
            }
          >
            <Text
              style={
                styles.backButtonText
              }
            >
              ←
            </Text>
          </TouchableOpacity>

          {/* Logo */}
          <View
            style={
              localStyles.logoTopContainer
            }
          >
            <Image
              source={require('../../../assets/images/IMB360_v2.png')}
              style={
                localStyles.adaptedLogoStyle
              }
              resizeMode="contain"
            />
          </View>

          {/* Form */}
          <View
            style={[
              styles.formFlowWrapper,
              {
                marginTop:
                  verticalScale(
                    -5,
                  ),
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

            {/* Email */}
            <FloatingInput
              label="Email address"
              value={email}
              onChangeText={
                setEmail
              }
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Password */}
            <FloatingInput
              label="Password"
              value={password}
              onChangeText={
                setPassword
              }
              secureTextEntry={
                securePassword
              }
              rightComponent={renderPasswordToggle()}
              autoCapitalize="none"
            />

            {/* Remember/Forgot */}
            <View
              style={[
                styles.checkboxContainer,
                {
                  justifyContent:
                    'space-between',

                  width: '100%',
                },
              ]}
            >
              <View
                style={{
                  flexDirection:
                    'row',

                  alignItems:
                    'center',
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.customCheckbox,

                    rememberMe &&
                      styles.customCheckboxChecked,
                  ]}
                  onPress={() =>
                    setRememberMe(
                      !rememberMe,
                    )
                  }
                >
                  {rememberMe && (
                    <Text
                      style={
                        styles.checkmarkIcon
                      }
                    >
                      ✓
                    </Text>
                  )}
                </TouchableOpacity>

                <Text
                  style={
                    styles.checkboxLabel
                  }
                >
                  Remember Me
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    'ForgotPassword',
                  )
                }
              >
                <Text
                  style={[
                    styles.checkboxLabel,
                    {
                      color:
                        Colors.textPrimary,
                    },
                  ]}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Submit */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                {
                  opacity:
                    isFormComplete &&
                    !loading
                      ? 1
                      : 0.4,
                },
              ]}
              onPress={
                handleLogin
              }
              disabled={
                !isFormComplete ||
                loading
              }
            >
              <LinearGradient
                colors={[
                  Colors.teal,
                  Colors.teal,
                ]}
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 1,
                  y: 0,
                }}
                style={
                  styles.gradientButtonLayout
                }
              >
                <Text
                  style={
                    styles.submitButtonText
                  }
                >
                  {loading
                    ? 'Signing in...'
                    : 'Sign in'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <Text
              style={
                styles.dividerText
              }
            >
              Or continue with
            </Text>

            {/* Social Buttons */}
            <View
              style={
                styles.socialRow
              }
            >
              <TouchableOpacity
                style={
                  styles.socialButton
                }
              >
                <Image
                  source={require('../../../assets/images/google.png')}
                  style={
                    styles.socialIcon
                  }
                />

                <Text
                  style={
                    styles.socialText
                  }
                >
                  Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.socialButton
                }
              >
                <Image
                  source={require('../../../assets/images/apple.png')}
                  style={[
                    styles.socialIcon,
                    {
                      tintColor:
                        Colors.textPrimary,
                    },
                  ]}
                />

                <Text
                  style={
                    styles.socialText
                  }
                >
                  Apple
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Redirect */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                'RoleSelection',
              )
            }
            style={
              styles.redirectLinkWrapper
            }
          >
            <Text
              style={
                styles.footerRedirectText
              }
            >
              Don't have an
              account?{' '}
              <Text
                style={
                  styles.linkTextInline
                }
              >
                Sign up
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const localStyles =
  StyleSheet.create({
    logoTopContainer: {
      width: '100%',
      alignItems: 'center',
      paddingTop:
        verticalScale(40),
      paddingBottom:
        verticalScale(5),
    },

    adaptedLogoStyle: {
      width: scale(220),
      height:
        verticalScale(55),
    },

    heading: {
      marginBottom:
        verticalScale(30),
      color: Colors.lime,
      fontSize:
        moderateScale(22),
      textAlign: 'center',
    },
  });

export default LoginScreen;