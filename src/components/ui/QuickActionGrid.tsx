import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { CategoryIcon } from './CategoryIcon';

export interface QuickActionItem {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  color: string;
  onPress: () => void;
}

interface QuickActionGridProps {
  actions: QuickActionItem[];
  columns?: 3 | 4;
}

export const QuickActionGrid: React.FC<QuickActionGridProps> = ({ actions, columns = 3 }) => (
  <View style={styles.grid}>
    {actions.map((action) => (
      <TouchableOpacity
        key={action.label}
        style={[styles.item, columns === 4 && styles.itemFourCol]}
        onPress={action.onPress}
        activeOpacity={0.8}
      >
        <View style={styles.tile}>
          <CategoryIcon name={action.icon} color={action.color} size="lg" variant="soft" />
        </View>
        <Text style={styles.label} numberOfLines={2}>
          {action.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  item: {
    width: '31%',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  itemFourCol: {
    width: '23%',
  },
  tile: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  label: {
    ...typography.caption,
    textAlign: 'center',
    fontWeight: '600',
    color: colors.text,
    lineHeight: 16,
    paddingHorizontal: 2,
  },
});
