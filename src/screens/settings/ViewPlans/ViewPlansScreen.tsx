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
    AppNavigationProp<'ViewPlans'>
}

export default function ViewPlansScreen({
    navigation,
}: Props) {
    return (
        <View style={styles.container}>
            <ScreenHeader
                title="View Plans"
                onBack={() =>
                    navigation.goBack()
                }
            />

            <View style={styles.body}>
                <Text style={styles.text}>
                    View Plans
                </Text>
            </View>
        </View>
    )
}

