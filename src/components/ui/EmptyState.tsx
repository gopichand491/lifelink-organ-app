import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../constants/theme';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inbox-outline',
  title,
  message,
  actionLabel,
  onAction,
}) => (
  <View style={styles.container}>
    <View style={styles.iconCircle}>
      <MaterialCommunityIcons name={icon} size={48} color={colors.secondary} />
    </View>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.message}>{message}</Text>
    {actionLabel && onAction && (
      <Button title={actionLabel} onPress={onAction} variant="secondary" style={styles.button} />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${colors.secondary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: { ...typography.h3, textAlign: 'center', marginBottom: spacing.sm },
  message: { ...typography.bodySmall, textAlign: 'center', marginBottom: spacing.lg },
  button: { marginTop: spacing.sm, maxWidth: 240 },
});
