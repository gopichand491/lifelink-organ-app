import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { Header, SearchInput, Card, Badge, EmptyState, CategoryIcon } from '../../components/ui';
import { colors, typography, spacing } from '../../constants/theme';
import { categoryColors } from '../../constants/icons';
import {
  SAMPLE_DONORS,
  SAMPLE_HOSPITALS,
  SAMPLE_BLOOD_BANKS,
  SAMPLE_AMBULANCES,
} from '../../data/sampleData';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList> };

const ListFinderScreen: React.FC<{
  title: string;
  data: { id: string; title: string; subtitle: string; badge?: string; badgeColor?: string; icon: keyof typeof MaterialCommunityIcons.glyphMap; iconColor: string; onPress: () => void }[];
  search: string;
  onSearch: (t: string) => void;
  emptyTitle: string;
}> = ({ title, data, search, onSearch, emptyTitle }) => (
  <View style={styles.flex}>
    <Header title={title} showBack />
    <View style={styles.content}>
      <SearchInput value={search} onChangeText={onSearch} placeholder={`Search ${title.toLowerCase()}...`} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card onPress={item.onPress}>
            <View style={styles.row}>
              <CategoryIcon name={item.icon} color={item.iconColor} size="md" variant="soft" />
              <View style={styles.info}>
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.sub}>{item.subtitle}</Text>
                {item.badge && <Badge label={item.badge} color={item.badgeColor || colors.secondary} />}
              </View>
              <View style={styles.chevronWrap}>
                <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textLight} />
              </View>
            </View>
          </Card>
        )}
        ListEmptyComponent={<EmptyState title={emptyTitle} message="Try adjusting your search" icon="magnify-close" />}
        contentContainerStyle={styles.list}
      />
    </View>
  </View>
);

export const DonorSearchScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const filtered = SAMPLE_DONORS.filter((d) =>
    d.fullName.toLowerCase().includes(search.toLowerCase())
  );
  const data = filtered.map((d) => ({
    id: d.id,
    title: d.fullName,
    subtitle: `${d.type === 'blood' ? d.bloodGroup : d.organTypes?.join(', ')} • ${d.distance} km away`,
    badge: d.isAvailable ? 'Available' : 'Busy',
    badgeColor: d.isAvailable ? colors.success : colors.warning,
    icon: d.type === 'blood' ? ('blood-bag' as const) : ('heart-plus-outline' as const),
    iconColor: d.type === 'blood' ? categoryColors.blood : categoryColors.organ,
    onPress: () => navigation.navigate('DonorDetails', { donorId: d.id }),
  }));

  return (
    <ListFinderScreen title="Donor Search" data={data} search={search} onSearch={setSearch} emptyTitle="No donors found" />
  );
};

export const OrganDonorFinderScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const organDonors = SAMPLE_DONORS.filter((d) => d.type === 'organ');
  const data = organDonors
    .filter((d) => d.fullName.toLowerCase().includes(search.toLowerCase()))
    .map((d) => ({
      id: d.id,
      title: d.fullName,
      subtitle: `${d.organTypes?.join(', ')} • ${d.distance} km`,
      badge: 'Organ Donor',
      badgeColor: colors.primary,
      icon: 'heart-plus-outline' as const,
      iconColor: categoryColors.organ,
      onPress: () => navigation.navigate('DonorDetails', { donorId: d.id }),
    }));

  return (
    <ListFinderScreen title="Organ Donor Finder" data={data} search={search} onSearch={setSearch} emptyTitle="No organ donors nearby" />
  );
};

export const BloodDonorFinderScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const bloodDonors = SAMPLE_DONORS.filter((d) => d.type === 'blood');
  const data = bloodDonors
    .filter((d) => d.fullName.toLowerCase().includes(search.toLowerCase()))
    .map((d) => ({
      id: d.id,
      title: d.fullName,
      subtitle: `${d.bloodGroup} • ${d.distance} km • ★ ${d.rating}`,
      badge: d.isAvailable ? 'Available' : 'Unavailable',
      badgeColor: d.isAvailable ? colors.success : colors.textLight,
      icon: 'blood-bag' as const,
      iconColor: categoryColors.blood,
      onPress: () => navigation.navigate('DonorDetails', { donorId: d.id }),
    }));

  return (
    <ListFinderScreen title="Blood Donor Finder" data={data} search={search} onSearch={setSearch} emptyTitle="No blood donors found" />
  );
};

export const NearbyHospitalFinderScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const data = SAMPLE_HOSPITALS.filter((h) => h.name.toLowerCase().includes(search.toLowerCase())).map((h) => ({
    id: h.id,
    title: h.name,
    subtitle: `${h.type} • ★ ${h.rating} • ${h.location.city}`,
    badge: h.is24Hours ? '24/7' : 'Open',
    badgeColor: colors.success,
    icon: 'hospital-building' as const,
    iconColor: categoryColors.hospital,
    onPress: () => navigation.navigate('HospitalDetails', { hospitalId: h.id }),
  }));

  return (
    <ListFinderScreen title="Nearby Hospitals" data={data} search={search} onSearch={setSearch} emptyTitle="No hospitals found" />
  );
};

export const NearbyBloodBankFinderScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const data = SAMPLE_BLOOD_BANKS.filter((b) => b.name.toLowerCase().includes(search.toLowerCase())).map((b) => ({
    id: b.id,
    title: b.name,
    subtitle: `${b.location.address} • ★ ${b.rating}`,
    badge: b.isOpen ? 'Open' : 'Closed',
    badgeColor: b.isOpen ? colors.success : colors.error,
    icon: 'blood-bag' as const,
    iconColor: categoryColors.blood,
    onPress: () => navigation.navigate('BloodBankDetails', { bloodBankId: b.id }),
  }));

  return (
    <ListFinderScreen title="Blood Banks" data={data} search={search} onSearch={setSearch} emptyTitle="No blood banks found" />
  );
};

export const AmbulanceFinderScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const data = SAMPLE_AMBULANCES.filter((a) => a.provider.toLowerCase().includes(search.toLowerCase())).map((a) => ({
    id: a.id,
    title: a.provider,
    subtitle: a.isAvailable ? `ETA: ${a.eta} min • ${a.phone}` : 'Currently unavailable',
    badge: a.isAvailable ? 'Available' : 'Busy',
    badgeColor: a.isAvailable ? colors.success : colors.warning,
    icon: 'ambulance' as const,
    iconColor: categoryColors.ambulance,
    onPress: () => navigation.navigate('MapView', { title: a.provider, latitude: a.location.latitude, longitude: a.location.longitude }),
  }));

  return (
    <ListFinderScreen title="Ambulance Finder" data={data} search={search} onSearch={setSearch} emptyTitle="No ambulances available" />
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: spacing.md },
  list: { paddingBottom: spacing.xxl },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  info: { flex: 1 },
  name: { ...typography.body, fontWeight: '600' },
  sub: { ...typography.caption, marginTop: 2, marginBottom: 4 },
  chevronWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
