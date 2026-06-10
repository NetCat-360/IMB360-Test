// src/screens/auth/forgot-password/ForgotPasswordScreen.tsx

import React, { useState } from 'react';
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
import { verticalScale } from '../../../utils/scaling';
import { AuthNavigationProp } from '../../../types/navigation';
import { OtpModalSheet } from '../../../components/common/OtpModalSheet';
import { useGlobalToast } from '../../../context/ToastContext';
import apiClient from '../../../api/client';
import { AUTH } from '../../../api/endpoints';
import TextField from '../../../components/common/TextField/TextField';
import styles from '../register/styles';
import { authInputStyles } from '../inputStyles';
import { localStyles } from './styles';

type Props = {
  navigation: AuthNavigationProp<'ForgotPassword'>;
};

const isEmailValid = (text: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [otpModalVisible, setOtpModalVisible] = useState(false);

  const { showToast } = useGlobalToast();

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
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{
            name: 'ResetPassword',
            params: { verifiedEmail: email.toLowerCase().trim() },
          }],
        });
      }, 300);
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

            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>←</Text>
            </Pressable>

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

              <TextField
                label="Email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                containerStyle={authInputStyles.inputWrapper}
                outlineStyle={[authInputStyles.inputOutline, localStyles.customOutline]}
                outlineActiveStyle={localStyles.customOutlineActive}
                style={authInputStyles.textInput}
              />

              <Pressable
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
              </Pressable>
            </View>

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



export default ForgotPasswordScreen;