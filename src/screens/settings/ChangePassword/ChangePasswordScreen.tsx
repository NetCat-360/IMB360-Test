import React, {
    useState,
    useReducer,
    useEffect,
    useRef,
} from 'react'

import {
    View,
    Text,
    TextInput,
    Pressable,
    ScrollView,
    Modal,
    Alert,
} from 'react-native'

import ScreenHeader
    from '../../../components/ScreenHeader'

import TextField from '../../../components/common/TextField/TextField'



import {
    AppNavigationProp,
} from '../../../types/navigation'
import { styles } from './styles'

const OTP_FIELD_KEYS = ['otp-0', 'otp-1', 'otp-2', 'otp-3', 'otp-4', 'otp-5'];

type Props = {
    navigation:
    AppNavigationProp<'ChangePassword'>
}

function OtpInput({ otp, handleOtpChange, inputRefs }: { otp: string[]; handleOtpChange: (value: string, index: number) => void; inputRefs: React.MutableRefObject<(TextInput | null)[]> }) {
  return (
    <View style={styles.otpContainer}>
      {otp.map((item, index) => (
        <TextInput
          key={OTP_FIELD_KEYS[index]}
          ref={ref => { inputRefs.current[index] = ref }}
          style={styles.otpInput}
          keyboardType="number-pad"
          maxLength={1}
          value={item}
          onChangeText={text => handleOtpChange(text, index)}
        />
      ))}
    </View>
  );
}

function OtpModal({ visible, onClose, otp, handleOtpChange, inputRefs, handleVerify, countdown }: {
  visible: boolean; onClose: () => void; otp: string[]; handleOtpChange: (value: string, index: number) => void;
  inputRefs: React.MutableRefObject<(TextInput | null)[]>; handleVerify: () => void; countdown: number;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalContainer}>
          <Text style={styles.otpTitle}>Enter OTP</Text>
          <Text style={styles.otpSubtitle}>OTP sent to the registered email</Text>
          <OtpInput otp={otp} handleOtpChange={handleOtpChange} inputRefs={inputRefs} />
          <Pressable style={styles.verifyButton} onPress={handleVerify}><Text style={styles.verifyText}>Verify</Text></Pressable>
          <Pressable><Text style={styles.resendText}>Resend in {countdown} sec</Text></Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

type PasswordsAction =
    | { type: 'SET_OLD_PASSWORD'; payload: string }
    | { type: 'SET_NEW_PASSWORD'; payload: string }
    | { type: 'SET_CONFIRM_PASSWORD'; payload: string };

interface PasswordsState {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const initialPasswordsState: PasswordsState = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
};

function passwordsReducer(state: PasswordsState, action: PasswordsAction): PasswordsState {
    switch (action.type) {
        case 'SET_OLD_PASSWORD':
            return { ...state, oldPassword: action.payload };
        case 'SET_NEW_PASSWORD':
            return { ...state, newPassword: action.payload };
        case 'SET_CONFIRM_PASSWORD':
            return { ...state, confirmPassword: action.payload };
        default:
            return state;
    }
}

type OtpAction =
    | { type: 'SET_OTP_MODAL_VISIBLE'; payload: boolean }
    | { type: 'SET_COUNTDOWN'; payload: number }
    | { type: 'DECREMENT_COUNTDOWN' }
    | { type: 'SET_OTP'; payload: string[] }
    | { type: 'UPDATE_OTP_AT_INDEX'; payload: { index: number; value: string } };

interface OtpState {
    otpModalVisible: boolean;
    countdown: number;
    otp: string[];
}

const initialOtpState: OtpState = {
    otpModalVisible: false,
    countdown: 30,
    otp: ['', '', '', '', '', ''],
};

function otpReducer(state: OtpState, action: OtpAction): OtpState {
    switch (action.type) {
        case 'SET_OTP_MODAL_VISIBLE':
            return { ...state, otpModalVisible: action.payload };
        case 'SET_COUNTDOWN':
            return { ...state, countdown: action.payload };
        case 'DECREMENT_COUNTDOWN':
            return { ...state, countdown: state.countdown > 0 ? state.countdown - 1 : 0 };
        case 'SET_OTP':
            return { ...state, otp: action.payload };
        case 'UPDATE_OTP_AT_INDEX': {
            const updated = [...state.otp];
            updated[action.payload.index] = action.payload.value;
            return { ...state, otp: updated };
        }
        default:
            return state;
    }
}

export default function
    ChangePasswordScreen({
        navigation,
    }: Props) {

    const [passwordsState, dispatchPasswords] = useReducer(passwordsReducer, initialPasswordsState);
    const [otpState, dispatchOtp] = useReducer(otpReducer, initialOtpState);

    const inputRefs =
        useRef<
            Array<
                TextInput | null
            >
        >([])

    useEffect(() => {
        if (!otpState.otpModalVisible) return;
        const interval = setInterval(() => {
            dispatchOtp({ type: 'DECREMENT_COUNTDOWN' });
        }, 1000);
        return () => clearInterval(interval);
    }, [otpState.otpModalVisible]);

    const handleOtpChange =
        (
            value: string,
            index: number,
        ) => {
            dispatchOtp({ type: 'UPDATE_OTP_AT_INDEX', payload: { index, value } })

            if (
                value &&
                index < 5
            ) {
                inputRefs.current[
                    index + 1
                ]?.focus()
            }
        }

    const openOtpModal =
        () => {
            dispatchOtp({ type: 'SET_OTP_MODAL_VISIBLE', payload: true })
            dispatchOtp({ type: 'SET_COUNTDOWN', payload: 30 })
        }

    const handleVerify =
        () => {
            const compiledOtp = otpState.otp.join('')
            if (compiledOtp.length === 6) {
                dispatchOtp({ type: 'SET_OTP_MODAL_VISIBLE', payload: false })
                dispatchOtp({ type: 'SET_OTP', payload: ['', '', '', '', '', ''] })
            }
        }

    const handleSave =
        () => {

            if (
                !passwordsState.oldPassword
            ) {
                Alert.alert(
                    'Error',
                    'Please enter old password',
                )
                return
            }

            if (
                !passwordsState.newPassword
            ) {
                Alert.alert(
                    'Error',
                    'Please enter new password',
                )
                return
            }

            if (
                passwordsState.newPassword !==
                passwordsState.confirmPassword
            ) {
                Alert.alert(
                    'Error',
                    'Passwords do not match',
                )
                return
            }

            openOtpModal()
        }

    return (
        <View
            style={
                styles.container
            }
        >
            <ScreenHeader
                title="Change Password"
                onBack={() =>
                    navigation.goBack()
                }
            />

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <TextField placeholder="Old Password" placeholderTextColor="#8E8E93" secureTextEntry value={passwordsState.oldPassword} onChangeText={(text) => dispatchPasswords({ type: 'SET_OLD_PASSWORD', payload: text })} style={styles.input} />
                <TextField placeholder="New Password" placeholderTextColor="#8E8E93" secureTextEntry value={passwordsState.newPassword} onChangeText={(text) => dispatchPasswords({ type: 'SET_NEW_PASSWORD', payload: text })} style={styles.input} />
                <TextField placeholder="Re-enter New Password" placeholderTextColor="#8E8E93" secureTextEntry value={passwordsState.confirmPassword} onChangeText={(text) => dispatchPasswords({ type: 'SET_CONFIRM_PASSWORD', payload: text })} style={styles.input} />
                <Pressable style={styles.saveButton} onPress={handleSave}><Text style={styles.saveText}>Save Changes</Text></Pressable>
            </ScrollView>

            <OtpModal
                visible={otpState.otpModalVisible}
                onClose={() => dispatchOtp({ type: 'SET_OTP_MODAL_VISIBLE', payload: false })}
                otp={otpState.otp}
                handleOtpChange={handleOtpChange}
                inputRefs={inputRefs}
                handleVerify={handleVerify}
                countdown={otpState.countdown}
            />
        </View>
    )
}

