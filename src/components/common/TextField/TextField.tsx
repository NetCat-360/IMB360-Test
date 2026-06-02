import React, { useState, useEffect } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

interface TextFieldProps extends Omit<TextInputProps, 'onChangeText'> {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: any;
  outlineStyle?: any;
  outlineActiveStyle?: any;
  prefixComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChangeText,
  containerStyle,
  outlineStyle,
  outlineActiveStyle,
  prefixComponent,
  rightComponent,
  style,
  placeholder,
  placeholderTextColor,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    focusAnim.value = value ? withTiming(1, { duration: 180 }) : withTiming(0, { duration: 180 });
  }, [value, focusAnim]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (label) focusAnim.value = withTiming(1, { duration: 180 });
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (label && !value) focusAnim.value = withTiming(0, { duration: 180 });
    onBlur?.(e);
  };

  const floating = !!label;

  const animatedLabelStyle = useAnimatedStyle(() => {
    if (!floating) return {};
    const inactiveLeft = prefixComponent ? 78 : 12;
    return {
      position: 'absolute',
      zIndex: 10,
      backgroundColor: '#000000',
      paddingHorizontal: 4,
      fontWeight: '500',
      top: interpolate(focusAnim.value, [0, 1], [16.5, -9]),
      left: interpolate(focusAnim.value, [0, 1], [inactiveLeft, 12]),
      fontSize: interpolate(focusAnim.value, [0, 1], [15, 12]),
      color: isFocused ? '#b6d82c' : '#666666',
    };
  });

  return (
    <View style={containerStyle}>
      {outlineStyle && (
        <View style={[outlineStyle, isFocused && outlineActiveStyle]} />
      )}
      {floating && (
        <Animated.Text style={animatedLabelStyle}>
          {label}
        </Animated.Text>
      )}
      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
        {prefixComponent}
        <TextInput
          style={[{ flex: 1, height: '100%' }, style]}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={floating ? undefined : placeholder}
          placeholderTextColor={floating ? 'transparent' : placeholderTextColor}
          {...props}
        />
        {rightComponent}
      </View>
    </View>
  );
};

export default TextField;
