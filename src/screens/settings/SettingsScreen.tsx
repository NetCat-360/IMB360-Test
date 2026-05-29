import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native'

import { SafeAreaView }
    from 'react-native-safe-area-context'

import ScreenHeader
    from '../../components/ScreenHeader'

import { AppNavigationProp }
    from '../../types/navigation'

import { useAppDispatch }
    from '../../hooks/redux'

import { logout }
    from '../../features/auth/store/authSlice'

import { styles } from './styles'

const ICON_MANAGE_ACCOUNT = require('../../assets/images/manageaccount.png')
const ICON_BIO = require('../../assets/images/bio.png')
const ICON_SOCIAL_MEDIA = require('../../assets/images/socialmedia.png')
const ICON_INFO = require('../../assets/images/info.png')
const ICON_PLANS = require('../../assets/images/plans.png')
const ICON_SUBSCRIPTION = require('../../assets/images/subscription.png')
const ICON_PASSWORD = require('../../assets/images/password.png')
const ICON_ARROW = require('../../assets/images/rightarrow.png')

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
                source={ICON_ARROW}
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
                        icon={ICON_MANAGE_ACCOUNT}
                        title="Manage Account"
                        onPress={() =>
                            navigation.navigate(
                                'ManageAccount'
                            )
                        }
                    />

                    <SettingItem
                        icon={ICON_BIO}
                        title="Bio"
                        onPress={() =>
                            navigation.navigate(
                                'Bio'
                            )
                        }
                    />

                    <SettingItem
                        icon={ICON_SOCIAL_MEDIA}
                        title="Social Media Profiles"
                        onPress={() =>
                            navigation.navigate(
                                'SocialMedia'
                            )
                        }
                    />

                    <SettingItem
                        icon={ICON_INFO}
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
                        icon={ICON_PLANS}
                        title="View Plans"
                        onPress={() =>
                            navigation.navigate(
                                'ViewPlans'
                            )
                        }
                    />

                    <SettingItem
                        icon={ICON_SUBSCRIPTION}
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
                        icon={ICON_PASSWORD}
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


