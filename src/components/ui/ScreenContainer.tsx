import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../constants/theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  scroll?: boolean;
  padding?: boolean;
  backgroundColor?: string;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scroll = true,
  padding = true,
  backgroundColor = colors.background,
}) => {
  const content = (
    <View style={[padding && styles.padding, styles.flex]}>{children}</View>
  );

  if (scroll) {
    return (
      <ScrollView
        style={[styles.flex, { backgroundColor }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {content}
      </ScrollView>
    );
  }

  return (
    <View style={[styles.flex, { backgroundColor }, padding && styles.padding]}>
      {children}
    </View>
  );
};

interface QuickActionProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  color: string;
  onPress: () => void;
}

// QuickActionGrid moved to QuickActionGrid.tsx

export const SearchInput: React.FC<{
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
}> = ({ value, onChangeText, placeholder = 'Search...' }) => (
  <View style={styles.searchBar}>
    <MaterialCommunityIcons name="magnify" size={22} color={colors.textSecondary} />
    <TextInput
      style={styles.searchInputField}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.textLight}
    />
    {value.length > 0 && (
      <TouchableOpacity onPress={() => onChangeText('')}>
        <MaterialCommunityIcons name="close-circle" size={20} color={colors.textLight} />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  flex: { flex: 1 },
  padding: { padding: spacing.md },
  scrollContent: { flexGrow: 1, paddingBottom: spacing.xxl },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  searchInputField: { flex: 1, ...typography.body, paddingVertical: 4 },
});
