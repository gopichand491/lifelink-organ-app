import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../constants/theme';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  fullScreen = true,
}) => (
  <View style={[styles.container, fullScreen && styles.fullScreen]}>
    <ActivityIndicator size="large" color={colors.primary} />
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  fullScreen: { flex: 1, backgroundColor: colors.background },
  message: { ...typography.bodySmall, marginTop: spacing.md, color: colors.textSecondary },
});
