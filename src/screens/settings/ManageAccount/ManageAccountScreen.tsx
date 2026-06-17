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
    AppNavigationProp<'ManageAccount'>
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

function OtpModalSection({ visible, onClose, otp, handleOtpChange, inputRefs, handleVerify, countdown, email }: {
  visible: boolean; onClose: () => void; otp: string[]; handleOtpChange: (value: string, index: number) => void;
  inputRefs: React.MutableRefObject<(TextInput | null)[]>; handleVerify: () => void; countdown: number; email: string;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalContainer}>
          <Text style={styles.otpTitle}>Enter OTP</Text>
          <Text style={styles.otpSubtitle}>Enter the 6 digit code sent to {email || 'your email'}</Text>
          <OtpInput otp={otp} handleOtpChange={handleOtpChange} inputRefs={inputRefs} />
          <Pressable style={styles.verifyButton} onPress={handleVerify}><Text style={styles.verifyText}>Verify</Text></Pressable>
          <Pressable><Text style={styles.resendText}>Resend in {countdown} sec</Text></Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function EditProfileSection({
  expanded, onToggle, fullName, setFullName, email, setEmail, phone, setPhone, onSave,
}: {
  expanded: boolean; onToggle: () => void; fullName: string; setFullName: (v: string) => void;
  email: string; setEmail: (v: string) => void; phone: string; setPhone: (v: string) => void; onSave: () => void;
}) {
  return (
    <>
      <Pressable style={styles.dropdownHeader} onPress={onToggle}>
        <Text style={styles.dropdownTitle}>Edit Profile</Text>
        <Text style={styles.arrow}>{expanded ? '▲' : '▼'}</Text>
      </Pressable>
      {expanded && (
        <View style={styles.dropdownBody}>
          <TextField placeholder="Full Name" placeholderTextColor="#8E8E93" value={fullName} onChangeText={setFullName} style={styles.input} />
          <TextField placeholder="Email Address" placeholderTextColor="#8E8E93" value={email} onChangeText={setEmail} style={styles.input} />
          <TextField placeholder="Phone Number" placeholderTextColor="#8E8E93" keyboardType="phone-pad" value={phone} onChangeText={setPhone} style={styles.input} />
          <Pressable style={styles.saveButton} onPress={onSave}><Text style={styles.saveText}>Save Changes</Text></Pressable>
        </View>
      )}
    </>
  );
}

function EditEmailSection({
  expanded, onToggle, newEmail, setNewEmail, onSave,
}: {
  expanded: boolean; onToggle: () => void; newEmail: string; setNewEmail: (v: string) => void; onSave: () => void;
}) {
  return (
    <>
      <Pressable style={styles.dropdownHeader} onPress={onToggle}>
        <Text style={styles.dropdownTitle}>Edit Email ID</Text>
        <Text style={styles.arrow}>{expanded ? '▲' : '▼'}</Text>
      </Pressable>
      {expanded && (
        <View style={styles.dropdownBody}>
          <TextInput placeholder="Email Address" placeholderTextColor="#8E8E93" value={newEmail} onChangeText={setNewEmail} style={styles.input} />
          <Pressable style={styles.saveButton} onPress={onSave}><Text style={styles.saveText}>Save Changes</Text></Pressable>
        </View>
      )}
    </>
  );
}

type ProfileAction =
    | { type: 'SET_FULL_NAME'; payload: string }
    | { type: 'SET_EMAIL'; payload: string }
    | { type: 'SET_PHONE'; payload: string };

interface ProfileState {
    fullName: string;
    email: string;
    phone: string;
}

const initialProfileState: ProfileState = {
    fullName: '',
    email: '',
    phone: '',
};

function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
    switch (action.type) {
        case 'SET_FULL_NAME':
            return { ...state, fullName: action.payload };
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_PHONE':
            return { ...state, phone: action.payload };
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
    ManageAccountScreen({
        navigation,
    }: Props) {

    const [
        expandedSection,
        setExpandedSection,
    ] = useState<
        'profile'
        | 'email'
        | null
    >(null)

    const [profileState, dispatchProfile] = useReducer(profileReducer, initialProfileState);
    const [otpState, dispatchOtp] = useReducer(otpReducer, initialOtpState);

    const [
        newEmail,
        setNewEmail,
    ] = useState('')

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

    return (
        <View
            style={
                styles.container
            }
        >
            <ScreenHeader
                title="Manage Account"
                onBack={() =>
                    navigation.goBack()
                }
            />

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <EditProfileSection
                  expanded={expandedSection === 'profile'}
                  onToggle={() => setExpandedSection(expandedSection === 'profile' ? null : 'profile')}
                  fullName={profileState.fullName} setFullName={(v) => dispatchProfile({ type: 'SET_FULL_NAME', payload: v })}
                  email={profileState.email} setEmail={(v) => dispatchProfile({ type: 'SET_EMAIL', payload: v })}
                  phone={profileState.phone} setPhone={(v) => dispatchProfile({ type: 'SET_PHONE', payload: v })}
                  onSave={openOtpModal}
                />
                <EditEmailSection
                  expanded={expandedSection === 'email'}
                  onToggle={() => setExpandedSection(expandedSection === 'email' ? null : 'email')}
                  newEmail={newEmail} setNewEmail={setNewEmail}
                  onSave={openOtpModal}
                />
            </ScrollView>

            <OtpModalSection
                visible={otpState.otpModalVisible}
                onClose={() => dispatchOtp({ type: 'SET_OTP_MODAL_VISIBLE', payload: false })}
                otp={otpState.otp}
                handleOtpChange={handleOtpChange}
                inputRefs={inputRefs}
                handleVerify={handleVerify}
                countdown={otpState.countdown}
                email={profileState.email || newEmail}
            />
        </View>
    )
}

