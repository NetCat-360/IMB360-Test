import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StatusBar, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';
import styles from '../register/styles'; 
import { authInputStyles } from '../inputStyles';

const OutlinedFloatingInput = ({ label, value, onChangeText, secureTextEntry, keyboardType, rightComponent }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useSharedValue(value ? 1 : 0);

  return (
    <View style={authInputStyles.inputWrapper}>
      <View style={[authInputStyles.inputOutline, isFocused && authInputStyles.inputOutlineActive]} />
      <Animated.Text style={[authInputStyles.floatingLabel, { top: value || isFocused ? -9 : 16.5, left: 12, fontSize: value || isFocused ? 12 : 15, color: isFocused ? '#b6d82c' : '#666666' }]}>
        {label}
      </Animated.Text>
      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
        <TextInput
          style={authInputStyles.textInput}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onFocus={() => { setIsFocused(true); focusAnim.value = withTiming(1); }}
          onBlur={() => { setIsFocused(false); if(!value) focusAnim.value = withTiming(0); }}
          placeholderTextColor="transparent"
        />
        {rightComponent && rightComponent}
      </View>
    </View>
  );
};

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  
  const [toastMessage, setToastMessage] = useState('');
  const toastOpacity = useSharedValue(0);

  const isEmailValid = (text: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

  const isFormComplete = isEmailValid(email) && password.trim() !== '';

  const clearToastState = () => setToastMessage('');

  const triggerToastFadeOut = () => {
    'worklet';
    runOnJS(clearToastState)();
  };

  const startToastCountdown = () => {
    setTimeout(() => {
      toastOpacity.value = withTiming(0, { duration: 250 }, triggerToastFadeOut);
    }, 3000);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    toastOpacity.value = withTiming(1, { duration: 250 }, () => {
      'worklet';
      runOnJS(startToastCountdown)();
    });
  };

  const handleLogin = () => {
    showToast('Login successful!');
  };

  const renderPasswordToggle = () => (
    <TouchableOpacity onPress={() => setSecurePassword(!securePassword)} style={styles.inlineActionWrapper}>
      <Text style={[styles.inlineActionText, { color: '#666666' }]}>
        {securePassword ? 'Show' : 'Hide'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
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

          {/* Added a slight negative margin layout override to completely eliminate vertical gap dead space */}
          <View style={[styles.formFlowWrapper, { marginTop: verticalScale(-5) }]}>
            <Text style={[styles.screenHeaderTitle, localStyles.welcomeBackTextOffset]}>WELCOME BACK!</Text>

            <OutlinedFloatingInput label="Email address" value={email} onChangeText={setEmail} keyboardType="email-address" />
            
            <OutlinedFloatingInput 
              label="Password" 
              value={password} 
              onChangeText={setPassword} 
              secureTextEntry={securePassword} 
              rightComponent={renderPasswordToggle()}
            />

            <View style={[styles.checkboxContainer, { justifyContent: 'space-between', width: '100%' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={[styles.customCheckbox, rememberMe && styles.customCheckboxChecked]} onPress={() => setRememberMe(!rememberMe)}>
                  {rememberMe && <Text style={styles.checkmarkIcon}>✓</Text>}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Remember Me</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={[styles.checkboxLabel, { color: '#ffffff', textDecorationLine: 'none' }]}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={[styles.submitButton, { opacity: isFormComplete ? 1 : 0.4 }]} 
              onPress={handleLogin}
              disabled={!isFormComplete}
            >
              <LinearGradient colors={['#00b9c0', '#00b9c0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientButtonLayout}>
                <Text style={styles.submitButtonText}>Sign in</Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.dividerText}>Or continue with</Text>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Image source={require('../../../assets/images/google.png')} style={styles.socialIcon} />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Image source={require('../../../assets/images/apple.png')} style={[styles.socialIcon, { tintColor: '#ffffff' }]} />
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.redirectLinkWrapper}>
            <Text style={styles.footerRedirectText}>Don't have an account? <Text style={styles.linkTextInline}>Sign up</Text></Text>
          </TouchableOpacity>

          {toastMessage ? (
            <Animated.View style={[styles.toastContainer, { opacity: toastOpacity.value }]}>
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
    paddingBottom: verticalScale(5), // Dropped completely to eliminate spacing below the asset edge
  },
  adaptedLogoStyle: {
    width: scale(220),
    height: verticalScale(55),
  },
  welcomeBackTextOffset: {
    marginBottom: verticalScale(30), // Slightly reduced to keep form fields moving up nicely
    color: '#b6d82c',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default LoginScreen;