// src/screens/auth/forgot-password/ForgotPasswordScreen.tsx

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
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';
import { AuthNavigationProp } from '../../../types/navigation';
import { OtpModalSheet } from '../../../components/auth/OtpModalSheet';
import { useToast } from '../../../hooks/useToast';
import apiClient from '../../../api/client';
import { AUTH } from '../../../api/endpoints';
import styles from '../register/styles';
import { authInputStyles } from '../inputStyles';

const OutlinedFloatingInput = ({ label, value, onChangeText, keyboardType }: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={authInputStyles.inputWrapper}>
      <View
        style={[
          authInputStyles.inputOutline,
          localStyles.customOutline,
          isFocused && localStyles.customOutlineActive,
        ]}
      />
      <Animated.Text
        style={[
          authInputStyles.floatingLabel,
          localStyles.customFloatingLabel,
          {
            top: value || isFocused ? -9 : 16.5,
            left: 14,
            fontSize: value || isFocused ? 12 : 15,
            color: value || isFocused ? '#b6d82c' : '#7f9221',
          },
        ]}
      >
        {label}
      </Animated.Text>
      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
        <TextInput
          style={[authInputStyles.textInput, localStyles.customTextInput]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="transparent"
          selectionColor="#b6d82c"
          cursorColor="#b6d82c"
        />
      </View>
    </View>
  );
};

type Props = {
  navigation: AuthNavigationProp<'ForgotPassword'>;
};

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [otpModalVisible, setOtpModalVisible] = useState(false);

  const { message: toastMessage, toastOpacity, showToast } = useToast();

  const isEmailValid = (text: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
  const isFormComplete = isEmailValid(email);

  const handleSendCodeClick = () => {
    setOtpModalVisible(true);
    // TODO: Replace with real API call to send OTP
    showToast('Verification code dispatched successfully.');
  };

  const handleOtpVerificationCheck = async (compiledOtpCode: string) => {
    try {
      await apiClient.post(AUTH.VERIFY_OTP, { otp: compiledOtpCode });
      setOtpModalVisible(false);
      navigation.reset({
        index: 0,
        routes: [{
          name: 'ResetPassword',
          params: { verifiedEmail: email.toLowerCase().trim() },
        }],
      });
    } catch {
      showToast('Invalid confirmation OTP entered.');
    }
  };

  const handleResendRequest = () => {
    // TODO: Replace with real API call to resend OTP
    showToast('A fresh confirmation token code was dispatched.');
  };

  // Using a Fragment so OtpModalSheet can sit as a true sibling to
  // SafeAreaView. This is the correct pattern for any Modal — it should
  // never be nested inside layout containers like KeyboardAvoidingView
  // or ScrollView, because those containers interfere with the Modal's
  // own touch handling and positioning on Android.
  return (
    <>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={[styles.fixedContentContainer, localStyles.topAlignedContent]}>

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

            <View style={[styles.formFlowWrapper, localStyles.formWrapperOffset]}>
              <Text style={[styles.screenHeaderTitle, localStyles.forgotTextTitle]}>
                FORGOT PASSWORD
              </Text>

              <Text style={localStyles.descriptionTextSpacing}>
                Enter your email and we'll send a 6-digit verification code instantly.
              </Text>

              <OutlinedFloatingInput
                label="Email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <TouchableOpacity
                style={[styles.submitButton, { opacity: isFormComplete ? 1 : 0.4, marginTop: verticalScale(24) }]}
                onPress={handleSendCodeClick}
                disabled={!isFormComplete}
              >
                <LinearGradient
                  colors={['#00b9c0', '#00b9c0']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButtonLayout}
                >
                  <Text style={styles.submitButtonText}>Send Code</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {toastMessage ? (
              <Animated.View style={[styles.toastContainer, { opacity: toastOpacity }]}>
                <Text style={styles.toastText}>{toastMessage}</Text>
              </Animated.View>
            ) : null}

          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/*
        OtpModalSheet lives here, OUTSIDE SafeAreaView and
        KeyboardAvoidingView. React Native's Modal component
        renders in its own native window layer regardless of
        where it sits in the JSX tree, but keeping it outside
        all layout wrappers prevents Android from routing touch
        events through those wrappers when the modal is open.
      */}
      <OtpModalSheet
        visible={otpModalVisible}
        onClose={() => setOtpModalVisible(false)}
        targetEmail={email}
        onVerify={handleOtpVerificationCheck}
        onResend={handleResendRequest}
      />
    </>
  );
};

const localStyles = StyleSheet.create({
  topAlignedContent: { justifyContent: 'flex-start' },
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
  formWrapperOffset: { marginTop: verticalScale(-5) },
  forgotTextTitle: {
    marginBottom: verticalScale(14),
    color: '#b6d82c',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionTextSpacing: {
    textAlign: 'center',
    color: '#666666',
    marginBottom: verticalScale(28),
    paddingHorizontal: scale(12),
    lineHeight: verticalScale(18),
    fontSize: moderateScale(13),
  },
  customOutline: {
    borderColor: '#7f9221',
    borderWidth: 1.5,
    borderRadius: moderateScale(10),
    backgroundColor: '#000000',
  },
  customOutlineActive: { borderColor: '#b6d82c' },
  customFloatingLabel: {
    backgroundColor: '#000000',
    paddingHorizontal: scale(6),
    zIndex: 100,
  },
  customTextInput: {
    color: '#ffffff',
    fontSize: moderateScale(15),
  },
});

export default ForgotPasswordScreen;