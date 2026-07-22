import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, typography } from '../../constants/theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onRightPress?: () => void;
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  rightIcon,
  onRightPress,
  transparent = false,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + (Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0) },
        transparent && styles.transparent,
      ]}
    >
      <View style={styles.row}>
        {showBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.accent} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconBtn} />
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
        {rightIcon ? (
          <TouchableOpacity onPress={onRightPress} style={styles.iconBtn}>
            <MaterialCommunityIcons name={rightIcon} size={24} color={colors.accent} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconBtn} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  transparent: { backgroundColor: 'transparent' },
  row: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  titleContainer: { flex: 1, alignItems: 'center' },
  title: { ...typography.h3, color: colors.accent },
  subtitle: { ...typography.caption, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
});
