import React, {
    useState,
} from 'react'

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native'

import {
    Dropdown,
} from 'react-native-element-dropdown'

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
                    data={platforms.map(
                        item => ({
                            label:
                                item,
                            value:
                                item,
                        }),
                    )}
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
                    data={contentCategories.map(
                        item => ({
                            label:
                                item,
                            value:
                                item,
                        }),
                    )}
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

                <TextInput
                    placeholder="Enter your user handle"
                    placeholderTextColor="#8E8E93"
                    value={handle}
                    onChangeText={
                        setHandle
                    }
                    style={
                        styles.input
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
                    data={followerTypes.map(
                        item => ({
                            label:
                                item,
                            value:
                                item,
                        }),
                    )}
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

                <TouchableOpacity
                    style={
                        styles.addButton
                    }
                >
                    <Text
                        style={
                            styles.addText
                        }
                    >
                        Add Profile
                    </Text>
                </TouchableOpacity>
            </ScrollView>
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
            paddingHorizontal:
                scale(20),
            paddingTop:
                verticalScale(32),
            flexGrow: 1,
        },

        dropdown: {
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
            marginBottom:
                verticalScale(20),
        },

        dropdownContainer: {
            backgroundColor:
                '#2E2E2E',
            borderRadius:
                moderateScale(16),
            borderColor:
                '#00B9C0',
            overflow:
                'hidden',
        },

        dropdownText: {
            color: '#FFF',
            fontSize:
                moderateScale(16),
        },

        placeholderText: {
            color: '#8E8E93',
            fontSize:
                moderateScale(16),
        },

        dropdownItemText: {
            color: '#FFF',
            fontSize:
                moderateScale(15),
        },

        label: {
            color: '#FFF',
            fontSize:
                moderateScale(20),
            fontWeight:
                '700',
            marginBottom:
                verticalScale(20),
            marginTop:
                verticalScale(10),
            marginLeft:
                verticalScale(5)
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
            fontSize:
                moderateScale(16),
            marginBottom:
                verticalScale(20),
        },

        addButton: {
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
                'auto',
            marginBottom:
                verticalScale(60),
        },

        addText: {
            color: '#000',
            fontSize:
                moderateScale(18),
            fontWeight:
                '700',
        },
    })