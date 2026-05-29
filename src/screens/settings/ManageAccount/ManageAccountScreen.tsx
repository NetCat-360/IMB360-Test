import React, {
    useState,
    useEffect,
    useRef,
} from 'react'

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Modal,
    Pressable,
} from 'react-native'

import ScreenHeader
    from '../../../components/ScreenHeader'



import {
    AppNavigationProp,
} from '../../../types/navigation'
import { styles } from './styles'

type Props = {
    navigation:
    AppNavigationProp<'ManageAccount'>
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

    const [
        otpModalVisible,
        setOtpModalVisible,
    ] = useState(false)

    const [
        countdown,
        setCountdown,
    ] = useState(30)

    const [
        fullName,
        setFullName,
    ] = useState('')

    const [
        email,
        setEmail,
    ] = useState('')

    const [
        phone,
        setPhone,
    ] = useState('')

    const [
        newEmail,
        setNewEmail,
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

            <ScrollView
                contentContainerStyle={
                    styles.content
                }
                showsVerticalScrollIndicator={
                    false
                }
            >
                <TouchableOpacity
                    style={
                        styles.dropdownHeader
                    }
                    onPress={() =>
                        setExpandedSection(
                            expandedSection ===
                                'profile'
                                ? null
                                : 'profile',
                        )
                    }
                >
                    <Text
                        style={
                            styles.dropdownTitle
                        }
                    >
                        Edit Profile
                    </Text>

                    <Text
                        style={
                            styles.arrow
                        }
                    >
                        {expandedSection ===
                        'profile'
                            ? '▲'
                            : '▼'}
                    </Text>
                </TouchableOpacity>

                {expandedSection ===
                    'profile' && (
                    <View
                        style={
                            styles.dropdownBody
                        }
                    >
                        <TextInput
                            placeholder="Full Name"
                            placeholderTextColor="#8E8E93"
                            value={
                                fullName
                            }
                            onChangeText={
                                setFullName
                            }
                            style={
                                styles.input
                            }
                        />

                        <TextInput
                            placeholder="Email Address"
                            placeholderTextColor="#8E8E93"
                            value={
                                email
                            }
                            onChangeText={
                                setEmail
                            }
                            style={
                                styles.input
                            }
                        />

                        <TextInput
                            placeholder="Phone Number"
                            placeholderTextColor="#8E8E93"
                            keyboardType="phone-pad"
                            value={
                                phone
                            }
                            onChangeText={
                                setPhone
                            }
                            style={
                                styles.input
                            }
                        />

                        <TouchableOpacity
                            style={
                                styles.saveButton
                            }
                            onPress={
                                openOtpModal
                            }
                        >
                            <Text
                                style={
                                    styles.saveText
                                }
                            >
                                Save Changes
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity
                    style={
                        styles.dropdownHeader
                    }
                    onPress={() =>
                        setExpandedSection(
                            expandedSection ===
                                'email'
                                ? null
                                : 'email',
                        )
                    }
                >
                    <Text
                        style={
                            styles.dropdownTitle
                        }
                    >
                        Edit Email ID
                    </Text>

                    <Text
                        style={
                            styles.arrow
                        }
                    >
                        {expandedSection ===
                        'email'
                            ? '▲'
                            : '▼'}
                    </Text>
                </TouchableOpacity>

                {expandedSection ===
                    'email' && (
                    <View
                        style={
                            styles.dropdownBody
                        }
                    >
                        <TextInput
                            placeholder="Email Address"
                            placeholderTextColor="#8E8E93"
                            value={
                                newEmail
                            }
                            onChangeText={
                                setNewEmail
                            }
                            style={
                                styles.input
                            }
                        />

                        <TouchableOpacity
                            style={
                                styles.saveButton
                            }
                            onPress={
                                openOtpModal
                            }
                        >
                            <Text
                                style={
                                    styles.saveText
                                }
                            >
                                Save Changes
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
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
                            Enter the
                            6 digit code
                            sent to{' '}
                            {email ||
                                newEmail ||
                                'your email'}
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
                                        key={
                                            index
                                        }
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

                        <TouchableOpacity
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
                        </TouchableOpacity>

                        <TouchableOpacity>
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
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    )
}

