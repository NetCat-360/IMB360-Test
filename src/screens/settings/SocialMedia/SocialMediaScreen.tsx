import React, {
    useMemo,
    useState,
} from 'react'

import {
    View,
    Text,
    Pressable,
    ScrollView,
} from 'react-native'

import TextField from '../../../components/common/TextField'

import {
    Dropdown,
} from 'react-native-element-dropdown'

import ScreenHeader
    from '../../../components/ScreenHeader'



import {
    AppNavigationProp,
} from '../../../types/navigation'
import { styles } from './styles'

type Props = {
    navigation:
    AppNavigationProp<'SocialMedia'>
}

const platforms = [
    'Instagram',
    'Facebook',
    'YouTube',
    'TikTok',
    'Snapchat',
    'LinkedIn',
    'Twitter',
    'Pinterest',
    'Telegram',
    'WhatsApp',
    'Quora',
    'Reddit',
    'Discord',
    'WeChat',
    'Weibo',
    'Kuaishou',
    'Douyin',
    'VK',
    'LINE',
    'Threads',
    'Tumblr',
    'Medium',
    'BeReal',
    'Lemon8',
]

const contentCategories = [
    'Video Stream',
    'Blog',
    'Live Stream',
    'Podcast',
    'Photo',
    'Review',
    'Tutorial',
]

const followerTypes = [
    'Micro (1K - 100K)',
    'Macro (100K - 1M)',
    'Mega (1M+)',
]

export default function
    SocialMediaScreen({
        navigation,
    }: Props) {

    const [handle,
        setHandle] =
        useState('')

    const [
        selectedPlatform,
        setSelectedPlatform,
    ] = useState('')

    const [
        selectedCategory,
        setSelectedCategory,
    ] = useState('')

    const [
        selectedFollowers,
        setSelectedFollowers,
    ] = useState('')

    const platformData =
        useMemo(() =>
            platforms.map(item => ({
                label: item,
                value: item,
            })),
        [])

    const categoryData =
        useMemo(() =>
            contentCategories.map(item => ({
                label: item,
                value: item,
            })),
        [])

    const followerData =
        useMemo(() =>
            followerTypes.map(item => ({
                label: item,
                value: item,
            })),
        [])

    return (
        <View
            style={
                styles.container
            }
        >
            <ScreenHeader
                title="Social Media Platforms"
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
                <Dropdown
                    style={
                        styles.dropdown
                    }
                    containerStyle={
                        styles.dropdownContainer
                    }
                    itemTextStyle={
                        styles.dropdownItemText
                    }
                    selectedTextStyle={
                        styles.dropdownText
                    }
                    placeholderStyle={
                        styles.placeholderText
                    }
                    data={
                        platformData
                    }
                    labelField="label"
                    valueField="value"
                    placeholder="Select Platforms"
                    value={
                        selectedPlatform
                    }
                    onChange={
                        item =>
                            setSelectedPlatform(
                                item.value,
                            )
                    }
                />

                <Dropdown
                    style={
                        styles.dropdown
                    }
                    containerStyle={
                        styles.dropdownContainer
                    }
                    itemTextStyle={
                        styles.dropdownItemText
                    }
                    selectedTextStyle={
                        styles.dropdownText
                    }
                    placeholderStyle={
                        styles.placeholderText
                    }
                    data={
                        categoryData
                    }
                    labelField="label"
                    valueField="value"
                    placeholder="Content Category"
                    value={
                        selectedCategory
                    }
                    onChange={
                        item =>
                            setSelectedCategory(
                                item.value,
                            )
                    }
                />

                <Text
                    style={
                        styles.label
                    }
                >
                    User Handle
                </Text>

                <TextField
                    placeholder="Enter your user handle"
                    placeholderTextColor="#8E8E93"
                    value={handle}
                    onChangeText={setHandle}
                    style={styles.input}
                />

                <Dropdown
                    style={
                        styles.dropdown
                    }
                    containerStyle={
                        styles.dropdownContainer
                    }
                    itemTextStyle={
                        styles.dropdownItemText
                    }
                    selectedTextStyle={
                        styles.dropdownText
                    }
                    placeholderStyle={
                        styles.placeholderText
                    }
                    data={
                        followerData
                    }
                    labelField="label"
                    valueField="value"
                    placeholder="Total Followers"
                    value={
                        selectedFollowers
                    }
                    onChange={
                        item =>
                            setSelectedFollowers(
                                item.value,
                            )
                    }
                />

                <Pressable
                    style={
                        styles.addButton
                    }
                    onPress={() => {
                        // TODO: Replace with real API POST
                    }}
                >
                    <Text
                        style={
                            styles.addText
                        }
                    >
                        Add Profile
                    </Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}

