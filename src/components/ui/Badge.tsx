import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

interface BadgeProps {
  label: string;
  color?: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  color = colors.secondary,
  icon,
}) => (
  <View style={[styles.badge, { backgroundColor: `${color}18` }]}>
    {icon && <MaterialCommunityIcons name={icon} size={12} color={color} />}
    <Text style={[styles.text, { color }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  text: { ...typography.caption, fontWeight: '600' },
});
