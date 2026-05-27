import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StatusBar, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';
import apiClient from '../../../api/client';
import { AUTH } from '../../../api/endpoints';
import styles from '../register/styles';

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
          
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

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
                <View key={index} style={localStyles.otpBoxWrapper}>
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

            <TouchableOpacity 
              style={[styles.submitButton, { opacity: isCodeComplete ? 1 : 0.4, marginTop: verticalScale(30) }]} 
              onPress={handleVerifyCode}
              disabled={!isCodeComplete}
            >
              <LinearGradient colors={['#00b9c0', '#00b9c0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientButtonLayout}>
                <Text style={styles.submitButtonText}>Verify Code</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleResendCode} style={localStyles.resendCodeLink}>
              <Text style={localStyles.resendText}>Didn't receive code? <Text style={localStyles.resendActionText}>Resend</Text></Text>
            </TouchableOpacity>
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

const localStyles = StyleSheet.create({
  topAlignedContent: {
    justifyContent: 'flex-start',
  },
  rigidLogoContainer: {
    width: '100%',
    height: verticalScale(60),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(40),
  },
  adaptedLogoAsset: {
    width: scale(220),
    height: verticalScale(55),
  },
  mainFormFlowWrapper: {
    width: '100%',
    paddingHorizontal: scale(24),
    marginTop: verticalScale(35),
  },
  verifyTextTitle: {
    color: '#b6d82c',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(10),
  },
  descriptionTextSpacing: {
    textAlign: 'center', 
    color: '#666666',
    marginBottom: verticalScale(35), 
    paddingHorizontal: scale(12),
    lineHeight: verticalScale(18),
  },
  highlightedEmail: {
    color: '#ffffff',
    fontWeight: '500',
  },
  otpInputContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: scale(4),
  },
  otpBoxWrapper: {
    width: scale(44),
    height: scale(48),
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpTextInput: {
    color: '#ffffff',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    padding: 0,
  },
  resendCodeLink: {
    alignSelf: 'center',
    marginTop: verticalScale(24),
  },
  resendText: {
    color: '#666666',
    fontSize: moderateScale(14),
  },
  resendActionText: {
    color: '#00b9c0',
    fontWeight: '600',
  }
});

export default VerificationScreen;