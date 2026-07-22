import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { Header } from '../../components/ui';
import { colors, typography, spacing } from '../../constants/theme';
import { SAMPLE_DONORS, SAMPLE_HOSPITALS, SAMPLE_BLOOD_BANKS } from '../../data/sampleData';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MapView'>;
  route: RouteProp<RootStackParamList, 'MapView'>;
};

export const MapViewScreen: React.FC<Props> = ({ route }) => {
  const { title } = route.params || {};

  const markers = [
    ...SAMPLE_DONORS.map((d) => ({ id: d.id, title: d.fullName, type: 'Donor', color: colors.primary, icon: 'hand-heart' as const })),
    ...SAMPLE_HOSPITALS.map((h) => ({ id: h.id, title: h.name, type: 'Hospital', color: colors.secondary, icon: 'hospital-building' as const })),
    ...SAMPLE_BLOOD_BANKS.map((b) => ({ id: b.id, title: b.name, type: 'Blood Bank', color: colors.error, icon: 'blood-bag' as const })),
  ];

  return (
    <View style={styles.flex}>
      <Header title={title || 'Map View'} showBack />
      <View style={styles.webContainer}>
        <MaterialCommunityIcons name="map-marker-radius" size={64} color={colors.primary} style={styles.icon} />
        <Text style={styles.title}>Map Simulation (Web Demo)</Text>
        <Text style={styles.subtitle}>
          Interactive Google Maps features are optimized for physical Android & iOS devices.
        </Text>

        <View style={styles.markerContainer}>
          <Text style={styles.sectionHeader}>Nearby Active Locations ({markers.length})</Text>
          <View style={styles.card}>
            {markers.map((m, index) => (
              <View key={m.id} style={[styles.markerItem, index === markers.length - 1 && styles.lastItem]}>
                <View style={[styles.iconBadge, { backgroundColor: `${m.color}15` }]}>
                  <MaterialCommunityIcons name={m.icon} size={20} color={m.color} />
                </View>
                <View style={styles.markerInfo}>
                  <Text style={styles.markerTitle}>{m.title}</Text>
                  <Text style={[styles.markerType, { color: m.color }]}>{m.type}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  webContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  icon: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  markerContainer: {
    width: '100%',
  },
  sectionHeader: {
    ...typography.subtitle,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  markerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  markerInfo: {
    flex: 1,
  },
  markerTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  markerType: {
    ...typography.caption,
    fontWeight: '700',
    marginTop: 2,
  },
});
