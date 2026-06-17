import React, {
    useState,
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

export default function
    ChangePasswordScreen({
        navigation,
    }: Props) {

    const [
        otpModalVisible,
        setOtpModalVisible,
    ] = useState(false)

    const [
        countdown,
        setCountdown,
    ] = useState(30)

    const [
        oldPassword,
        setOldPassword,
    ] = useState('')

    const [
        newPassword,
        setNewPassword,
    ] = useState('')

    const [
        confirmPassword,
        setConfirmPassword,
    ] = useState('')

    const [
        otp,
        setOtp,
    ] = useState([
        '',
        '',
        '',
        '',
        '',
        '',
    ])

    const inputRefs =
        useRef<
            Array<
                TextInput | null
            >
        >([])

    useEffect(() => {
        if (!otpModalVisible) return;
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [otpModalVisible]);

    const handleOtpChange =
        (
            value: string,
            index: number,
        ) => {
            const updatedOtp =
                [...otp]

            updatedOtp[index] =
                value

            setOtp(
                updatedOtp,
            )

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
            setOtpModalVisible(
                true,
            )
            setCountdown(
                30,
            )
        }

    const handleVerify =
        () => {
            const compiledOtp = otp.join('')
            if (compiledOtp.length === 6) {
                setOtpModalVisible(false)
                setOtp(['', '', '', '', '', ''])
            }
        }

    const handleSave =
        () => {

            if (
                !oldPassword
            ) {
                Alert.alert(
                    'Error',
                    'Please enter old password',
                )
                return
            }

            if (
                !newPassword
            ) {
                Alert.alert(
                    'Error',
                    'Please enter new password',
                )
                return
            }

            if (
                newPassword !==
                confirmPassword
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

            <ScrollView
                contentContainerStyle={
                    styles.content
                }
                showsVerticalScrollIndicator={
                    false
                }
            >
                <TextField
                    placeholder="Old Password"
                    placeholderTextColor="#8E8E93"
                    secureTextEntry
                    value={oldPassword}
                    onChangeText={setOldPassword}
                    style={styles.input}
                />

                <TextField
                    placeholder="New Password"
                    placeholderTextColor="#8E8E93"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                    style={styles.input}
                />

                <TextField
                    placeholder="Re-enter New Password"
                    placeholderTextColor="#8E8E93"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={styles.input}
                />

                <Pressable
                    style={
                        styles.saveButton
                    }
                    onPress={
                        handleSave
                    }
                >
                    <Text
                        style={
                            styles.saveText
                        }
                    >
                        Save Changes
                    </Text>
                </Pressable>
            </ScrollView>

            <Modal
                visible={
                    otpModalVisible
                }
                transparent
                animationType="fade"
                onRequestClose={() =>
                    setOtpModalVisible(
                        false,
                    )
                }
            >
                <Pressable
                    style={
                        styles.modalOverlay
                    }
                    onPress={() =>
                        setOtpModalVisible(
                            false,
                        )
                    }
                >
                    <Pressable
                        style={
                            styles.modalContainer
                        }
                    >
                        <Text
                            style={
                                styles.otpTitle
                            }
                        >
                            Enter OTP
                        </Text>

                        <Text
                            style={
                                styles.otpSubtitle
                            }
                        >
                            OTP sent to
                            the registered
                            email
                        </Text>

                        <View
                            style={
                                styles.otpContainer
                            }
                        >
                            {otp.map(
                                (
                                    item,
                                    index,
                                ) => (
                                    <TextInput
                                        key={OTP_FIELD_KEYS[index]}
                                        ref={ref => {
                                            inputRefs.current[
                                                index
                                            ] = ref
                                        }}
                                        style={
                                            styles.otpInput
                                        }
                                        keyboardType="number-pad"
                                        maxLength={
                                            1
                                        }
                                        value={
                                            item
                                        }
                                        onChangeText={text =>
                                            handleOtpChange(
                                                text,
                                                index,
                                            )
                                        }
                                    />
                                ),
                            )}
                        </View>

                        <Pressable
                            style={
                                styles.verifyButton
                            }
                            onPress={
                                handleVerify
                            }
                        >
                            <Text
                                style={
                                    styles.verifyText
                                }
                            >
                                Verify
                            </Text>
                        </Pressable>

                        <Pressable>
                            <Text
                                style={
                                    styles.resendText
                                }
                            >
                                Resend
                                in{' '}
                                {
                                    countdown
                                }{' '}
                                sec
                            </Text>
                        </Pressable>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    )
}

