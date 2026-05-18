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
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';
import { AuthNavigationProp } from '../../../types/navigation';
import FloatingInput from '../../../components/common/FloatingInput';
import { useToast } from '../../../hooks/useToast';
import styles from '../register/styles';

// Typed props — TypeScript now knows exactly which screens this
// navigator can reach, so a typo in a screen name is a compile error
// instead of a silent runtime crash.
type Props = {
  navigation: AuthNavigationProp<'Login'>;
};

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);

  // Replaces ~30 lines of duplicated toast logic across screens.
  // The hook handles the memory leak fix internally via useEffect cleanup.
  const { message: toastMessage, toastOpacity, showToast } = useToast();

  const isEmailValid = (text: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
  const isFormComplete = isEmailValid(email) && password.trim() !== '';

  const handleLogin = () => {
    // TODO: Replace with real API call — dispatch login() action on success
    showToast('Login successful!');
  };

  const renderPasswordToggle = () => (
    <TouchableOpacity
      onPress={() => setSecurePassword(!securePassword)}
      style={styles.inlineActionWrapper}
    >
      <Text style={[styles.inlineActionText, { color: '#666666' }]}>
        {securePassword ? 'Show' : 'Hide'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
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
            <Text style={[styles.screenHeaderTitle, localStyles.welcomeBackTextOffset]}>
              WELCOME BACK!
            </Text>

            {/* Shared FloatingInput — animation runs on the UI thread via
                Reanimated, fixing the stutter on lower-end Android devices
                that the old inline JS-thread approach caused. */}
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
                <Text style={[styles.checkboxLabel, { color: '#ffffff', textDecorationLine: 'none' }]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, { opacity: isFormComplete ? 1 : 0.4 }]}
              onPress={handleLogin}
              disabled={!isFormComplete}
            >
              <LinearGradient
                colors={['#00b9c0', '#00b9c0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButtonLayout}
              >
                <Text style={styles.submitButtonText}>Sign in</Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.dividerText}>Or continue with</Text>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={require('../../../assets/images/google.png')}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={require('../../../assets/images/apple.png')}
                  style={[styles.socialIcon, { tintColor: '#ffffff' }]}
                />
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Navigate to RoleSelection rather than Register directly.
              Register requires a 'role' param, so jumping there without
              one would either crash or silently drop the role context.
              Sending the user back through RoleSelection is also better
              UX — they confirm whether they're a Brand or Creator first. */}
          <TouchableOpacity
            onPress={() => navigation.navigate('RoleSelection')}
            style={styles.redirectLinkWrapper}
          >
            <Text style={styles.footerRedirectText}>
              Don't have an account?{' '}
              <Text style={styles.linkTextInline}>Sign up</Text>
            </Text>
          </TouchableOpacity>

          {toastMessage ? (
            <Animated.View style={[styles.toastContainer, { opacity: toastOpacity }]}>
              <Text style={styles.toastText}>{toastMessage}</Text>
            </Animated.View>
          ) : null}

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
  welcomeBackTextOffset: {
    marginBottom: verticalScale(30),
    color: '#b6d82c',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;