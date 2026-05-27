import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image,
} from 'react-native'

import {
    scale,
    verticalScale,
    moderateScale,
} from '../../utils/scaling'

import { SafeAreaView }
    from 'react-native-safe-area-context'

import { Colors }
    from '../../config/theme'

import ScreenHeader
    from '../../components/ScreenHeader'

import { AppNavigationProp }
    from '../../types/navigation'

import { useAppDispatch }
    from '../../hooks/redux'

import { logout }
    from '../../features/auth/store/authSlice'

type Props = {
    navigation:
    AppNavigationProp<'Settings'>
}

function SettingItem({
    icon,
    title,
    onPress,
}: {
    icon: any
    title: string
    onPress?: () => void
}) {
    return (
        <TouchableOpacity
            style={styles.settingRow}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.leftRow}>
                <Image
                    source={icon}
                    style={styles.settingIcon}
                />

                <Text
                    style={styles.settingText}
                >
                    {title}
                </Text>
            </View>

            <Image
                source={require('../../assets/images/rightarrow.png')}
                style={styles.arrowIcon}
            />
        </TouchableOpacity>
    )
}

function Section({
    title,
    children,
}: any) {
    return (
        <View style={styles.section}>
            <Text
                style={styles.sectionTitle}
            >
                {title}
            </Text>

            {children}
        </View>
    )
}

export default function SettingsScreen({
    navigation,
}: Props) {
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <ScreenHeader
                title="Settings"
                onBack={() =>
                    navigation.goBack()
                }
            />

            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
                contentContainerStyle={
                    styles.scrollContent
                }
            >
                {/* Profile */}
                <View
                    style={styles.profileRow}
                >
                    <View
                        style={styles.avatar}
                    />

                    <View>
                        <Text
                            style={styles.name}
                        >
                            Username
                        </Text>

                        <Text
                            style={styles.username}
                        >
                            @username01
                        </Text>
                    </View>
                </View>

                {/* Personal Info */}
                <Section
                    title="Personal Info"
                >
                    <SettingItem
                        icon={require('../../assets/images/manageaccount.png')}
                        title="Manage Account"
                        onPress={() =>
                            navigation.navigate(
                                'ManageAccount'
                            )
                        }
                    />

                    <SettingItem
                        icon={require('../../assets/images/bio.png')}
                        title="Bio"
                        onPress={() =>
                            navigation.navigate(
                                'Bio'
                            )
                        }
                    />

                    <SettingItem
                        icon={require('../../assets/images/socialmedia.png')}
                        title="Social Media Profiles"
                        onPress={() =>
                            navigation.navigate(
                                'SocialMedia'
                            )
                        }
                    />

                    <SettingItem
                        icon={require('../../assets/images/info.png')}
                        title="Additional Info"
                        onPress={() =>
                            navigation.navigate(
                                'AdditionalInfo'
                            )
                        }
                    />
                </Section>

                {/* Subscription */}
                <Section
                    title="Subscription"
                >
                    <SettingItem
                        icon={require('../../assets/images/plans.png')}
                        title="View Plans"
                        onPress={() =>
                            navigation.navigate(
                                'ViewPlans'
                            )
                        }
                    />

                    <SettingItem
                        icon={require('../../assets/images/subscription.png')}
                        title="Manage my subscription"
                        onPress={() =>
                            navigation.navigate(
                                'Subscription'
                            )
                        }
                    />
                </Section>

                {/* Security */}
                <Section
                    title="Security"
                >
                    <SettingItem
                        icon={require('../../assets/images/password.png')}
                        title="Change Password"
                        onPress={() =>
                            navigation.navigate(
                                'ChangePassword'
                            )
                        }
                    />
                </Section>

                {/* Logout */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text
                        style={styles.logoutText}
                    >
                        Log out
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:
                Colors.bgBlack,
        },

        scrollContent: {
            paddingHorizontal:
                scale(21),
            paddingBottom:
                verticalScale(60),
            paddingTop:
                verticalScale(4),
        },

        profileRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop:
                verticalScale(10),
            marginBottom:
                verticalScale(15),
        },

        avatar: {
            width: scale(78),
            height: scale(78),
            borderRadius:
                scale(39),
            backgroundColor:
                Colors.teal,
            marginRight:
                scale(18),
        },

        name: {
            color: '#FFF',
            fontSize:
                moderateScale(24),
            fontWeight:
                '700',
        },

        username: {
            color: '#8E8E93',
            fontSize:
                moderateScale(14),
            marginTop:
                verticalScale(3),
        },

        section: {
            backgroundColor:
                Colors.bgInputBorder,
            borderRadius:
                moderateScale(16),
            borderWidth: 1,
            borderColor:
                Colors.borderCyan,
            paddingVertical:
                verticalScale(12),
            paddingHorizontal:
                scale(14),
            marginBottom:
                verticalScale(16),
        },

        sectionTitle: {
            color: '#FFF',
            fontSize:
                moderateScale(16),
            fontWeight:
                '700',
            marginBottom:
                verticalScale(18),
        },

        settingRow: {
            flexDirection: 'row',
            justifyContent:
                'space-between',
            alignItems: 'center',
            marginBottom:
                verticalScale(8),
        },

        leftRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },

        settingIcon: {
            width: scale(18),
            height: scale(18),
            resizeMode:
                'contain',
        },

        settingText: {
            color: '#FFF',
            fontSize:
                moderateScale(16),
            marginLeft:
                scale(12),
        },

        logoutButton: {
            height:
                verticalScale(35),
            borderRadius:
                moderateScale(12),
            backgroundColor:
                '#E5E5E5',
            justifyContent:
                'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor:
                '#FF3B30',
            marginTop:
                verticalScale(10),
        },

        logoutText: {
            color: '#FF3B30',
            fontSize:
                moderateScale(18),
            fontWeight:
                '700',
        },

        arrowIcon: {
            width: scale(12),
            height: scale(20),
            resizeMode:
                'contain',
        },
    })
