import React, { useState, useRef } from 'react';
import { View, Text, Image, Pressable, TextInput, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import apiClient from '../../../api/client';
import { AUTH } from '../../../api/endpoints';
import { verticalScale } from 'react-native-size-matters';
import styles from '../register/styles';
import { localStyles } from './styles';

const OTP_FIELD_KEYS = ['otp-0', 'otp-1', 'otp-2', 'otp-3', 'otp-4', 'otp-5'];

const VerificationScreen = ({ navigation, route }: any) => {
  const targetDestination = route?.params?.destination || 'your email';
  const flowType = route?.params?.flow || 'password_reset';

  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [toastMessage, setToastMessage] = useState('');
  const toastOpacity = useSharedValue(0);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const isCodeComplete = code.every(digit => digit !== '');

  const clearToastState = () => setToastMessage('');

  const showToast = (message: string) => {
    setToastMessage(message);
    toastOpacity.value = withTiming(1, { duration: 250 }, () => {
      setTimeout(() => {
        toastOpacity.value = withTiming(0, { duration: 250 }, () => {
          'worklet';
          runOnJS(clearToastState)();
        });
      }, 3000);
    });
  };

  const handleInputChange = (text: string, index: number) => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    
    if (sanitizedText.length > 1) {
      const pastedCode = sanitizedText.slice(0, 6).split('');
      const updatedCode = [...code];
      pastedCode.forEach((char, i) => {
        if (i < 6) updatedCode[i] = char;
      });
      setCode(updatedCode);
      inputRefs.current[Math.min(pastedCode.length - 1, 5)]?.focus();
      return;
    }

    const newCode = [...code];
    newCode[index] = sanitizedText;
    setCode(newCode);

    if (sanitizedText !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = async () => {
    const completeOtp = code.join('');

    try {
      await apiClient.post(AUTH.VERIFY_OTP, { otp: completeOtp });
      showToast('Code verified successfully!');

      if (flowType === 'password_reset') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'ResetPassword', params: { verifiedOtp: completeOtp } }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeDashboard' }],
        });
      }
    } catch {
      showToast('Invalid verification code. Please try again.');
    }
  };

  const handleResendCode = () => {
    showToast('A fresh security code has been sent.');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={[styles.fixedContentContainer, localStyles.topAlignedContent]}>
          
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>

          <View style={localStyles.rigidLogoContainer}>
            <Image source={require('../../../assets/images/IMB360_v2.png')} style={localStyles.adaptedLogoAsset} resizeMode="contain" />
          </View>

          <View style={localStyles.mainFormFlowWrapper}>
            <Text style={localStyles.verifyTextTitle}>VERIFICATION</Text>
            
            <Text style={[styles.checkboxLabel, localStyles.descriptionTextSpacing]}>
              Please enter the 6-digit confirmation code generated and sent to <Text style={localStyles.highlightedEmail}>{targetDestination}</Text>.
            </Text>

            <View style={localStyles.otpInputContainerRow}>
              {code.map((digit, index) => (
                <View key={OTP_FIELD_KEYS[index]} style={localStyles.otpBoxWrapper}>
                  <TextInput
                    // FIXED: Wrapped statement in braces to return void, resolving the type overload breakdown
                    ref={(el) => { inputRefs.current[index] = el; }}
                    style={localStyles.otpTextInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleInputChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    selectTextOnFocus
                  />
                </View>
              ))}
            </View>

            <Pressable 
              style={[styles.submitButton, { opacity: isCodeComplete ? 1 : 0.4, marginTop: verticalScale(30) }]} 
              onPress={handleVerifyCode}
              disabled={!isCodeComplete}
            >
              <LinearGradient colors={['#00b9c0', '#00b9c0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientButtonLayout}>
                <Text style={styles.submitButtonText}>Verify Code</Text>
              </LinearGradient>
            </Pressable>

            <Pressable onPress={handleResendCode} style={localStyles.resendCodeLink}>
              <Text style={localStyles.resendText}>Didn't receive code? <Text style={localStyles.resendActionText}>Resend</Text></Text>
            </Pressable>
          </View>

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



export default VerificationScreen;