import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
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
  style?: ViewStyle
  textStyle?: TextStyle
}

const GradientButton = ({
  title,
  onPress,
  style,
  textStyle,
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
        <Text
          style={[
            styles.text,
            textStyle,
          ]}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default GradientButton

const styles = StyleSheet.create({
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

  text: {
    color: '#000',
    fontSize:
      moderateScale(16),
    fontFamily:
      'Poppins-SemiBold',
  },
})