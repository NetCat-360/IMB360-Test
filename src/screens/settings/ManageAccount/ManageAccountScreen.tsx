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
    StyleSheet,
    ScrollView,
    Modal,
    Pressable,
} from 'react-native'

import ScreenHeader
    from '../../../components/ScreenHeader'

import {
    scale,
    verticalScale,
    moderateScale,
} from '../../../utils/scaling'

import {
    AppNavigationProp,
} from '../../../types/navigation'

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
        let timer:
        ReturnType<
        typeof setInterval
        >

        if (
            otpModalVisible &&
            countdown > 0
        ) {
            timer =
                setInterval(() => {
                    setCountdown(
                        prev =>
                            prev - 1,
                    )
                }, 1000)
        }

        return () =>
            clearInterval(
                timer,
            )
    }, [
        otpModalVisible,
        countdown,
    ])

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

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:
                '#000',
        },

        content: {
            padding:
                scale(20),
        },

        dropdownHeader: {
            backgroundColor:
                '#2E2E2E',
            borderWidth: 1,
            borderColor:
                '#00B9C0',
            borderRadius:
                moderateScale(16),
            padding:
                scale(18),
            flexDirection:
                'row',
            justifyContent:
                'space-between',
            alignItems:
                'center',
            marginBottom:
                verticalScale(20),
        },

        dropdownTitle: {
            color: '#FFF',
            fontSize:
                moderateScale(16),
            fontWeight:
                '700',
        },

        arrow: {
            color: '#FFF',
        },

        dropdownBody: {
            marginBottom:
                verticalScale(20),
        },

        input: {
            height:
                verticalScale(40),
            backgroundColor:
                '#2E2E2E',
            borderWidth: 1,
            borderColor:
                '#00B9C0',
            borderRadius:
                moderateScale(16),
            paddingHorizontal:
                scale(18),
            color: '#FFF',
            marginBottom:
                verticalScale(14),
        },

        saveButton: {
            height:
                verticalScale(40),
            backgroundColor:
                '#10C7D4',
            borderRadius:
                moderateScale(12),
            justifyContent:
                'center',
            alignItems:
                'center',
            marginTop:
                verticalScale(10),
        },

        saveText: {
            color: '#000',
            fontSize:
                moderateScale(18),
            fontWeight:
                '700',
        },

        modalOverlay: {
            flex: 1,
            backgroundColor:
                'rgba(0,0,0,0.8)',
            justifyContent:
                'center',
            paddingHorizontal:
                scale(20),
        },

        modalContainer: {
            backgroundColor:
                '#000',
            borderRadius:
                moderateScale(22),
            padding:
                scale(22),
        },

        otpTitle: {
            color: '#FFF',
            fontSize:
                moderateScale(28),
            fontWeight:
                '700',
            marginBottom:
                verticalScale(10),
        },

        otpSubtitle: {
            color: '#FFF',
            fontSize:
                moderateScale(14),
            lineHeight:
                verticalScale(22),
            marginBottom:
                verticalScale(24),
        },

        otpContainer: {
            flexDirection:
                'row',
            justifyContent:
                'space-between',
            marginBottom:
                verticalScale(24),
        },

        otpInput: {
            width: scale(40),
            height:
                verticalScale(52),
            backgroundColor:
                '#E8E8E8',
            borderRadius:
                moderateScale(10),
            textAlign:
                'center',
            fontSize:
                moderateScale(20),
            fontWeight:
                '700',
        },

        verifyButton: {
            height:
                verticalScale(48),
            backgroundColor:
                '#10C7D4',
            borderRadius:
                moderateScale(14),
            justifyContent:
                'center',
            alignItems:
                'center',
        },

        verifyText: {
            color: '#FFF',
            fontSize:
                moderateScale(20),
            fontWeight:
                '700',
        },

        resendText: {
            color: '#10C7D4',
            textAlign:
                'center',
            marginTop:
                verticalScale(16),
            textDecorationLine:
                'underline',
        },
    })