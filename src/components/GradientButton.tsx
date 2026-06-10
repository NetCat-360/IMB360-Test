import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
  View,
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import {
  scale,
  verticalScale,
  moderateScale,
} from '../utils/scaling'

type Props = {
  title: string
  onPress?: () => void
  style?: any
  textStyle?: TextStyle
  icon?: any
  iconStyle?: ImageStyle
}

const GradientButton = ({
  title,
  onPress,
  style,
  textStyle,
  icon,
  iconStyle,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
    >
      <LinearGradient
        colors={[
          '#00b9c0',
          '#b6d82c',
        ]}
        start={{
          x: 0,
          y: 0.5,
        }}
        end={{
          x: 1,
          y: 0.5,
        }}
        style={[
          styles.button,
          style,
        ]}
      >
        <View style={styles.content}>
          {icon && (
            <Image
              source={icon}
              style={
                iconStyle
                  ? iconStyle
                  : styles.icon
              }
              resizeMode="contain"
            />
          )}

          <Text
            style={[
              styles.text,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default GradientButton

const styles =
  StyleSheet.create({
    button: {
      height:
        verticalScale(42),

      borderRadius:
        moderateScale(14),

      justifyContent:
        'center',

      alignItems:
        'center',

      paddingHorizontal:
        scale(20),

      overflow:
        'hidden',
    },

    content: {
      flexDirection: 'row',
      alignItems:
        'center',
      justifyContent:
        'center',
    },

    icon: {
      width: scale(18),
      height: scale(18),
      marginRight:
        scale(10),
    },

    text: {
      color: '#000',

      fontSize:
        moderateScale(16),

      fontFamily:
        'Poppins-SemiBold',
    },
  })