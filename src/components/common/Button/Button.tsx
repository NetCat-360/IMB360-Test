// src/components/common/Button/Button.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Reusable button component. Replaces the scattered TouchableOpacity +
// LinearGradient + Text combos that were repeated on every auth screen.
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { verticalScale, moderateScale } from '../../../utils/scaling';
import { Colors } from '../../../config/theme';
import Typography from '../../../styles/typography';

type Variant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}) => {
  const isDisabled = disabled || loading;

  if (variant === 'primary') {
    return (
      <Pressable
        style={[styles.base, { opacity: isDisabled ? 0.4 : 1 }, style]}
        onPress={onPress}
        disabled={isDisabled}
      >
        <LinearGradient
          colors={[Colors.teal, Colors.lime]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {loading ? (
            <ActivityIndicator color="#000000" size="small" />
          ) : (
            <Text style={Typography.buttonPrimary}>{label}</Text>
          )}
        </LinearGradient>
      </Pressable>
    );
  }

  if (variant === 'secondary') {
    return (
      <Pressable
        style={[
          styles.base,
          styles.secondary,
          { opacity: isDisabled ? 0.4 : 1 },
          style,
        ]}
        onPress={onPress}
        disabled={isDisabled}
      >
        {loading ? (
          <ActivityIndicator color={Colors.teal} size="small" />
        ) : (
          <Text style={[Typography.buttonSecondary, { color: Colors.teal }]}>
            {label}
          </Text>
        )}
      </Pressable>
    );
  }

  // outline variant
  return (
    <Pressable
      style={[
        styles.base,
        styles.outline,
        { opacity: isDisabled ? 0.4 : 1 },
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={Colors.teal} size="small" />
      ) : (
        <Text style={[Typography.buttonSecondary, { color: Colors.textPrimary }]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    width: '100%',
    height: verticalScale(46),
    borderRadius: moderateScale(23),
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.teal,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  outline: {
    backgroundColor: Colors.bgInput,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
});

export default Button;
