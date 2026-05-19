import React from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

import ScreenHeader
    from '../../../components/ScreenHeader'

import {
    AppNavigationProp,
} from '../../../types/navigation'

type Props = {
    navigation:
    AppNavigationProp<'SocialMedia'>
}

export default function SocialMediaScreen({
    navigation,
}: Props) {
    return (
        <View style={styles.container}>
            <ScreenHeader
                title="Social Media"
                onBack={() =>
                    navigation.goBack()
                }
            />

            <View style={styles.body}>
                <Text style={styles.text}>
                    Social Media
                </Text>
            </View>
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

        body: {
            flex: 1,
            justifyContent:
                'center',
            alignItems:
                'center',
        },

        text: {
            color: '#FFF',
        },
    })