import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius, typography, shadows } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
  fullWidth = true,
}) => {
  const isDisabled = disabled || loading;

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.85}
        style={[fullWidth && styles.fullWidth, style]}
      >
        <LinearGradient
          colors={[colors.gradientStart, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.base,
            styles[size],
            isDisabled && styles.disabled,
            shadows.button,
          ]}
        >
          {loading ? (
            <ActivityIndicator color={colors.accent} />
          ) : (
            <>
              {icon}
              <Text style={[styles.primaryText, textStyle]}>{title}</Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const variantStyles = {
    secondary: { bg: colors.secondary, text: colors.accent, border: colors.secondary },
    outline: { bg: 'transparent', text: colors.primary, border: colors.primary },
    danger: { bg: colors.error, text: colors.accent, border: colors.error },
    ghost: { bg: 'transparent', text: colors.secondary, border: 'transparent' },
  }[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.85}
      style={[
        styles.base,
        styles[size],
        {
          backgroundColor: variantStyles.bg,
          borderColor: variantStyles.border,
          borderWidth: variant === 'outline' ? 2 : 0,
        },
        isDisabled && styles.disabled,
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.text} />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, { color: variantStyles.text }, textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    gap: 8,
  },
  sm: { paddingVertical: 10, paddingHorizontal: 16 },
  md: { paddingVertical: 14, paddingHorizontal: 24 },
  lg: { paddingVertical: 18, paddingHorizontal: 32 },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.5 },
  primaryText: {
    ...typography.button,
    color: colors.accent,
  },
  text: {
    ...typography.button,
  },
});
