import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../constants/theme';
import { CategoryIcon } from './CategoryIcon';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon,
  iconColor = colors.secondary,
}) => (
  <View style={styles.container}>
    {icon && (
      <CategoryIcon name={icon} color={iconColor} size="sm" variant="soft" style={styles.icon} />
    )}
    <View style={styles.textWrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  icon: { marginRight: spacing.sm },
  textWrap: { flex: 1 },
  title: { ...typography.h3 },
  subtitle: { ...typography.caption, marginTop: 2, color: colors.textSecondary },
});
