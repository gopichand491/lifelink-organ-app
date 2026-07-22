import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { CategoryIcon } from './CategoryIcon';

interface MenuListItemProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
}

export const MenuListItem: React.FC<MenuListItemProps> = ({
  icon,
  iconColor,
  title,
  subtitle,
  onPress,
  showChevron = true,
}) => {
  const content = (
    <View style={styles.row}>
      <CategoryIcon name={icon} color={iconColor} size="md" variant="soft" />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {showChevron && (
        <View style={styles.chevronWrap}>
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textLight} />
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.card}>{content}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.card,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  info: { flex: 1 },
  title: { ...typography.body, fontWeight: '600', color: colors.text },
  subtitle: { ...typography.caption, marginTop: 3, color: colors.textSecondary, lineHeight: 18 },
  chevronWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
