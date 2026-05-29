import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { authInputStyles } from '../../../screens/auth/inputStyles';

interface FloatingInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  // A component rendered on the left edge of the input (e.g. country code picker)
  prefixComponent?: React.ReactNode;
  // A component rendered on the right edge of the input (e.g. Show/Hide or Send Code)
  rightComponent?: React.ReactNode;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize = 'none',
  prefixComponent,
  rightComponent,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const focusAnim = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    focusAnim.value = value ? withTiming(1, { duration: 180 }) : withTiming(0, { duration: 180 });
  }, [value, focusAnim]);

  const handleFocus = () => {
    setIsFocused(true);
    focusAnim.value = withTiming(1, { duration: 180 });
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Only float the label back down if the field is empty
    if (!value) {
      focusAnim.value = withTiming(0, { duration: 180 });
    }
  };

  // This animated style runs entirely on the UI thread via Reanimated,
  // which is what makes the label movement smooth even during heavy
  // JS work. The LoginScreen's old approach of computing label position
  // inline on the JS thread caused stuttering on lower-end devices.
  const animatedLabelStyle = useAnimatedStyle(() => {
    // When a prefix component (like a country picker) is present, the
    // label needs to start indented so it doesn't overlap the prefix.
    const inactiveLeft = prefixComponent ? 78 : 12;
    const activeLeft = 12;

    return {
      top: interpolate(focusAnim.value, [0, 1], [16.5, -9]),
      left: interpolate(focusAnim.value, [0, 1], [inactiveLeft, activeLeft]),
      fontSize: interpolate(focusAnim.value, [0, 1], [15, 12]),
      color: isFocused ? '#b6d82c' : '#666666',
    };
  });

  return (
    <View style={authInputStyles.inputWrapper}>
      <View
        style={[
          authInputStyles.inputOutline,
          isFocused && authInputStyles.inputOutlineActive,
        ]}
      />
      <Animated.Text style={[authInputStyles.floatingLabel, animatedLabelStyle]}>
        {label}
      </Animated.Text>
      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
        {prefixComponent}
        <TextInput
          style={authInputStyles.textInput}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor="transparent"
        />
        {rightComponent}
      </View>
    </View>
  );
};

export default FloatingInput;