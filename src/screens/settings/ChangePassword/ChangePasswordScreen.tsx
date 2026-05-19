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
    AppNavigationProp<'ChangePassword'>
}

export default function ChangePasswordScreen({
    navigation,
}: Props) {
    return (
        <View style={styles.container}>
            <ScreenHeader
                title="Change Password"
                onBack={() =>
                    navigation.goBack()
                }
            />

            <View style={styles.body}>
                <Text style={styles.text}>
                    Change Password
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