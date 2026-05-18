// src/components/auth/OtpModalSheet.tsx

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';

interface OtpModalSheetProps {
  visible: boolean;
  onClose: () => void;
  targetEmail: string;
  onVerify: (otpCode: string) => void;
  onResend: () => void;
}

export const OtpModalSheet: React.FC<OtpModalSheetProps> = ({
  visible,
  onClose,
  targetEmail,
  onVerify,
  onResend,
}) => {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const isCodeComplete = code.every((digit) => digit !== '');

  useEffect(() => {
    if (visible) {
      setCode(['', '', '', '', '', '']);
      setCountdown(30);
      setTimeout(() => inputRefs.current[0]?.focus(), 300);
    }
  }, [visible]);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setIsKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setIsKeyboardVisible(false)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Fixed: interval only created once per modal open, not every countdown tick
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [visible]);

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
    if (e.nativeEvent.key === 'Backspace') {
      const newCode = [...code];
      if (code[index] !== '') {
        newCode[index] = '';
        setCode(newCode);
      } else if (index > 0) {
        newCode[index - 1] = '';
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResendTrigger = () => {
    if (countdown === 0) {
      setCountdown(30);
      onResend();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      statusBarTranslucent
      // This is critical on Android — it ensures the Modal's touch
      // handling is completely isolated from whatever is behind it.
      // Without this, Android can route touches through the modal to
      // the screen underneath in certain situations.
      hardwareAccelerated={true}
      onRequestClose={onClose}
    >
      {/*
        The outer Pressable covers the full screen (the dim overlay).
        Tapping it closes the modal. The inner Pressable wraps the
        card and calls e.stopPropagation() so taps on the card
        never reach the outer Pressable.
      */}
      <Pressable
        style={[
          localStyles.dimmedOverlay,
          isKeyboardVisible && localStyles.dimmedOverlayKeyboardActive,
        ]}
        onPress={onClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          style={localStyles.sheetKeyboardWrapper}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : verticalScale(-40)}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={[
              localStyles.blackCardContainer,
              isKeyboardVisible && localStyles.blackCardContainerKeyboardActive,
            ]}
          >
            <ScrollView
              bounces={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={localStyles.scrollContainerContext}
            >
              <Text style={localStyles.sheetTitleText}>Enter OTP</Text>

              <Text style={localStyles.sheetSubtitleText}>
                Enter the 6 digit code sent to{' '}
                <Text style={localStyles.boldTargetEmail}>
                  {targetEmail || 'your email'}
                </Text>
              </Text>

              <View style={localStyles.otpInputRowGrid}>
                {code.map((digit, index) => (
                  <View
                    key={index}
                    style={[
                      localStyles.digitInputBoxFrame,
                      index !== 5 && localStyles.inputBoxSpacingRight,
                    ]}
                  >
                    <TextInput
                      ref={(el) => { inputRefs.current[index] = el; }}
                      style={localStyles.digitInputCharacterField}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={digit}
                      onChangeText={(text) => handleInputChange(text, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      selectTextOnFocus
                      placeholderTextColor="transparent"
                    />
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={[localStyles.sheetSubmitButton, { opacity: isCodeComplete ? 1 : 0.4 }]}
                onPress={() => onVerify(code.join(''))}
                disabled={!isCodeComplete}
              >
                <LinearGradient
                  colors={['#00b9c0', '#00b9c0']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={localStyles.gradientLayoutFiller}
                >
                  <Text style={localStyles.submitButtonTextLabel}>Verify</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleResendTrigger}
                disabled={countdown > 0}
                style={localStyles.resendAnchorLinkContainer}
              >
                <Text style={[
                  localStyles.resendTextString,
                  countdown > 0 && localStyles.resendTextDisabled,
                ]}>
                  {countdown > 0 ? `Resend in ${countdown} sec` : 'Resend OTP'}
                </Text>
              </TouchableOpacity>

            </ScrollView>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  dimmedOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  dimmedOverlayKeyboardActive: {
    justifyContent: 'center',
  },
  sheetKeyboardWrapper: {
    width: '100%',
  },
  blackCardContainer: {
    backgroundColor: '#000000',
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    borderWidth: 1,
    borderColor: '#1C1C1E',
    maxHeight: '90%',
  },
  blackCardContainerKeyboardActive: {
    borderRadius: moderateScale(24),
    marginHorizontal: scale(16),
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  scrollContainerContext: {
    alignItems: 'center',
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(28),
    paddingBottom: Platform.OS === 'ios' ? verticalScale(50) : verticalScale(35),
  },
  sheetTitleText: {
    color: '#ffffff',
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: verticalScale(12),
  },
  sheetSubtitleText: {
    color: '#aaaaaa',
    fontSize: moderateScale(14),
    alignSelf: 'flex-start',
    lineHeight: verticalScale(20),
    marginBottom: verticalScale(24),
  },
  boldTargetEmail: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  otpInputRowGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: verticalScale(28),
  },
  digitInputBoxFrame: {
    width: scale(42),
    height: scale(44),
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBoxSpacingRight: {
    marginRight: scale(8),
  },
  digitInputCharacterField: {
    color: '#000000',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    padding: 0,
  },
  sheetSubmitButton: {
    width: '100%',
    height: verticalScale(48),
    borderRadius: moderateScale(24),
    overflow: 'hidden',
    marginBottom: verticalScale(20),
  },
  gradientLayoutFiller: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonTextLabel: {
    color: '#ffffff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  resendAnchorLinkContainer: {
    padding: scale(6),
  },
  resendTextString: {
    color: '#00b9c0',
    fontSize: moderateScale(14),
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  resendTextDisabled: {
    color: '#666666',
    textDecorationLine: 'none',
  },
});