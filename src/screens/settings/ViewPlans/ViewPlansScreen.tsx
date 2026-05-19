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