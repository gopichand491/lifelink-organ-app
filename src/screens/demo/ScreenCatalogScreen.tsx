import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { Header, SearchInput, CategoryIcon, Badge } from '../../components/ui';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import { categoryColors } from '../../constants/icons';
import { ALL_50_SCREENS, ScreenCatalogItem } from '../../data/screenCatalog';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ScreenCatalog'>;
};

const CATEGORY_COLORS: Record<string, string> = {
  Auth: categoryColors.hospital,
  Dashboard: categoryColors.donor,
  Forms: categoryColors.organ,
  Finder: categoryColors.search,
  Emergency: categoryColors.emergency,
  Details: categoryColors.appointment,
  Map: categoryColors.map,
  Communication: categoryColors.chat,
  Content: categoryColors.article,
  Profile: categoryColors.profile,
};

/**
 * College project demo hub — tap any of the 50 screens to open instantly.
 * Perfect for final-year viva and project presentation on Android.
 */
export const ScreenCatalogScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return ALL_50_SCREENS;
    return ALL_50_SCREENS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        String(s.number).includes(q)
    );
  }, [search]);

  const openScreen = (item: ScreenCatalogItem) => {
    // Dynamic route navigation for demo catalog
    (navigation.navigate as (name: string, params?: object) => void)(item.route, item.params);
  };

  return (
    <View style={styles.flex}>
      <Header title="50 Screens Demo" subtitle="Final Year Project" showBack />
      <View style={styles.banner}>
        <MaterialCommunityIcons name="school" size={28} color={colors.accent} />
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>Organ Donation & Lifesaving Finder</Text>
          <Text style={styles.bannerSub}>All 50 screens · Tap to open for college demo</Text>
        </View>
        <Badge label="50" color={colors.accent} />
      </View>

      <View style={styles.searchWrap}>
        <SearchInput value={search} onChangeText={setSearch} placeholder="Search screen # or name..." />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.number)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => openScreen(item)} activeOpacity={0.75}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>{item.number}</Text>
            </View>
            <CategoryIcon
              name={item.icon as keyof typeof MaterialCommunityIcons.glyphMap}
              color={CATEGORY_COLORS[item.category] || colors.secondary}
              size="sm"
              variant="soft"
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <MaterialCommunityIcons name="open-in-new" size={20} color={colors.textLight} />
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <Text style={styles.footer}>
            Android app · React Native Expo · TypeScript · Firebase · Google Maps
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.md,
  },
  bannerText: { flex: 1 },
  bannerTitle: { ...typography.body, fontWeight: '700', color: colors.accent },
  bannerSub: { ...typography.caption, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  searchWrap: { paddingHorizontal: spacing.md, paddingTop: spacing.md },
  list: { padding: spacing.md, paddingBottom: spacing.xxl },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: { color: colors.accent, fontSize: 12, fontWeight: '800' },
  info: { flex: 1 },
  name: { ...typography.bodySmall, fontWeight: '600', color: colors.text },
  category: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  footer: { ...typography.caption, textAlign: 'center', marginTop: spacing.lg, color: colors.textLight, lineHeight: 18 },
});
