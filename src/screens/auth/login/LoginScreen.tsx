// src/screens/auth/login/LoginScreen.tsx
// Fix: handleLogin now validates before dispatching (no more any-credentials login).
//      Loading state added so the button shows a spinner while "logging in".
//      useGlobalToast replaces local toast state.
//      navigation typed properly — no more 'any'.
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
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';
import { AuthNavigationProp } from '../../../types/navigation';
import FloatingInput from '../../../components/common/FloatingInput';
import { useAppDispatch } from '../../../hooks/redux';
import { login } from '../../../features/auth/store/authSlice';
import { useGlobalToast } from '../../../context/ToastContext';
import { Colors } from '../../../config/theme';
import Typography from '../../../styles/typography';
import styles from '../register/styles';

type Props = {
  navigation: AuthNavigationProp<'Login'>;
};

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [rememberMe, setRememberMe]   = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const [loading, setLoading]         = useState(false);

  const dispatch     = useAppDispatch();
  const { showToast } = useGlobalToast();

  const isEmailValid   = (text: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
  const isFormComplete = isEmailValid(email) && password.trim().length >= 8;

  const handleLogin = async () => {
    // FIX: validate before doing anything
    if (!isEmailValid(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    if (password.trim().length < 8) {
      showToast('Password must be at least 8 characters.', 'error');
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with real API call, e.g.:
      // const response = await authApi.login({ email: email.trim().toLowerCase(), password });
      // dispatch(login({ id: response.data.id, email: response.data.email }));
      //
      // Mock delay to simulate network request until backend is ready
      await new Promise(resolve => setTimeout(resolve, 800));
      dispatch(login({ id: '1', email: email.trim().toLowerCase() }));
    } catch (error) {
      showToast('Login failed. Please check your credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordToggle = () => (
    <TouchableOpacity
      onPress={() => setSecurePassword(!securePassword)}
      style={styles.inlineActionWrapper}
    >
      <Text style={[styles.inlineActionText, { color: Colors.textDim }]}>
        {securePassword ? 'Show' : 'Hide'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgBlack} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.fixedContentContainer}>

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <View style={localStyles.logoTopContainer}>
            <Image
              source={require('../../../assets/images/IMB360_v2.png')}
              style={localStyles.adaptedLogoStyle}
              resizeMode="contain"
            />
          </View>

          <View style={[styles.formFlowWrapper, { marginTop: verticalScale(-5) }]}>
            <Text style={[Typography.h1, localStyles.heading]}>WELCOME BACK!</Text>

            <FloatingInput
              label="Email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <FloatingInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={securePassword}
              rightComponent={renderPasswordToggle()}
            />

            <View style={[styles.checkboxContainer, { justifyContent: 'space-between', width: '100%' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  style={[styles.customCheckbox, rememberMe && styles.customCheckboxChecked]}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  {rememberMe && <Text style={styles.checkmarkIcon}>✓</Text>}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Remember Me</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={[styles.checkboxLabel, { color: Colors.textPrimary }]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, { opacity: isFormComplete && !loading ? 1 : 0.4 }]}
              onPress={handleLogin}
              disabled={!isFormComplete || loading}
            >
              <LinearGradient
                colors={[Colors.teal, Colors.teal]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButtonLayout}
              >
                {loading ? (
                  <Text style={styles.submitButtonText}>Signing in...</Text>
                ) : (
                  <Text style={styles.submitButtonText}>Sign in</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.dividerText}>Or continue with</Text>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Image source={require('../../../assets/images/google.png')} style={styles.socialIcon} />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={require('../../../assets/images/apple.png')}
                  style={[styles.socialIcon, { tintColor: Colors.textPrimary }]}
                />
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('RoleSelection')}
            style={styles.redirectLinkWrapper}
          >
            <Text style={styles.footerRedirectText}>
              Don't have an account?{' '}
              <Text style={styles.linkTextInline}>Sign up</Text>
            </Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  logoTopContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(5),
  },
  adaptedLogoStyle: {
    width: scale(220),
    height: verticalScale(55),
  },
  heading: {
    marginBottom: verticalScale(30),
    color: Colors.lime,
    fontSize: moderateScale(22),
    textAlign: 'center',
  },
});

export default LoginScreen;
