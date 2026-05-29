import React from 'react'
import {
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

import {
    SafeAreaView,
} from 'react-native-safe-area-context'

import LinearGradient
    from 'react-native-linear-gradient'

import {
    scale,
    verticalScale,
    moderateScale,
} from '../utils/scaling'

import { Colors }
    from '../config/theme'

type Props = {
    title: string
    onBack?: () => void
}

export default function ScreenHeader({
    title,
    onBack,
}: Props) {
    return (
        <LinearGradient
            colors={[
                Colors.teal,
                Colors.lime,
            ]}
            start={{
                x: 0,
                y: 0,
            }}
            end={{
                x: 1,
                y: 0,
            }}
            style={styles.header}
        >
            <SafeAreaView
                edges={['top']}
                style={styles.headerInner}
            >
                {onBack && (
                    <TouchableOpacity
                        onPress={onBack}
                    >
                        <Image
                            source={require('../assets/images/backbutton.png')}
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                )}

                <Text style={styles.title}>
                    {title}
                </Text>
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles =
    StyleSheet.create({
        header: {
            width: '100%',
        },

        headerInner: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal:
                scale(20),
            paddingBottom:
                verticalScale(20),
            paddingTop:
                verticalScale(10),
        },

        backIcon: {
            width: scale(30),
            height: scale(30),
            resizeMode:
                'contain',
            marginRight:
                scale(12),
        },

        title: {
            color: '#000',
            fontSize:
                moderateScale(22),
            fontWeight:
                '700',
        },
    })