import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
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
    AppNavigationProp<'Bio'>
}

export default function BioScreen({
    navigation,
}: Props) {
    const [bio, setBio] =
        useState('')

    return (
        <View
            style={styles.container}
        >
            <ScreenHeader
                title="Edit Bio"
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
                <Text
                    style={
                        styles.description
                    }
                >
                    Bio appears on the
                    top of your profile
                    and is essential
                    for people to get
                    to know you.
                </Text>

                <Text
                    style={styles.label}
                >
                    Bio
                </Text>

                <TextInput
                    placeholder="Tell us about yourself"
                    placeholderTextColor="#8E8E93"
                    multiline
                    value={bio}
                    onChangeText={setBio}
                    textAlignVertical="top"
                    style={styles.input}
                />

                <TouchableOpacity
                    style={
                        styles.saveButton
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
        },

        description: {
            color: '#FFF',
            fontSize:
                moderateScale(15),
            textAlign:
                'center',
            lineHeight:
                verticalScale(26),
            marginBottom:
                verticalScale(20),
            paddingHorizontal:
                scale(20),
        },

        label: {
            color: '#FFF',
            fontSize:
                moderateScale(16),
            fontWeight:
                '700',
            marginBottom:
                verticalScale(10),
        },

        input: {
            height:
                verticalScale(180),
            backgroundColor:
                '#2E2E2E',
            borderWidth: 1,
            borderColor:
                '#00B9C0',
            borderRadius:
                moderateScale(16),
            padding:
                scale(18),
            color: '#FFF',
            fontSize:
                moderateScale(14),
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
                verticalScale(35),
        },

        saveText: {
            color: '#000',
            fontSize:
                moderateScale(18),
            fontWeight:
                '700',
        },
    })