import React from 'react'
import {
    View,
    Text,
} from 'react-native'

import ScreenHeader
    from '../../../components/ScreenHeader'

import {
    AppNavigationProp,
} from '../../../types/navigation'
import { styles } from './styles'

type Props = {
    navigation:
    AppNavigationProp<'Subscription'>
}

export default function SubscriptionScreen({
    navigation,
}: Props) {
    return (
        <View style={styles.container}>
            <ScreenHeader
                title="Subscription"
                onBack={() =>
                    navigation.goBack()
                }
            />

            <View style={styles.body}>
                <Text style={styles.text}>
                    Subscription
                </Text>
            </View>
        </View>
    )
}

