import React, { useState } from 'react'
import {
    View,
    Text,
    Pressable,
    ScrollView,
} from 'react-native'

import ScreenHeader
    from '../../../components/ScreenHeader'

import TextField from '../../../components/common/TextField/TextField'



import {
    AppNavigationProp,
} from '../../../types/navigation'
import { styles } from './styles'

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

                <TextField
                    placeholder="Tell us about yourself"
                    placeholderTextColor="#8E8E93"
                    multiline
                    value={bio}
                    onChangeText={setBio}
                    textAlignVertical="top"
                    style={styles.input}
                />

                <Pressable
                    style={
                        styles.saveButton
                    }
                    onPress={() =>
                        navigation.goBack()
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
        </View>
    )
}

