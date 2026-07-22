import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { Header } from '../../components/ui';
import { colors, typography, spacing } from '../../constants/theme';
import { DEFAULT_MAP_REGION, SAMPLE_DONORS, SAMPLE_HOSPITALS, SAMPLE_BLOOD_BANKS } from '../../data/sampleData';
import { GOOGLE_MAPS_API_KEY } from '../../config/firebase.config';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MapView'>;
  route: RouteProp<RootStackParamList, 'MapView'>;
};

export const MapViewScreen: React.FC<Props> = ({ route }) => {
  const { title, latitude, longitude } = route.params || {};
  const region = latitude && longitude
    ? { ...DEFAULT_MAP_REGION, latitude, longitude }
    : DEFAULT_MAP_REGION;

  const markers = [
    ...SAMPLE_DONORS.map((d) => ({ id: d.id, lat: d.location.latitude, lng: d.location.longitude, title: d.fullName, color: colors.primary, icon: 'hand-heart' as const })),
    ...SAMPLE_HOSPITALS.map((h) => ({ id: h.id, lat: h.location.latitude, lng: h.location.longitude, title: h.name, color: colors.secondary, icon: 'hospital-building' as const })),
    ...SAMPLE_BLOOD_BANKS.map((b) => ({ id: b.id, lat: b.location.latitude, lng: b.location.longitude, title: b.name, color: colors.error, icon: 'blood-bag' as const })),
  ];

  return (
    <View style={styles.flex}>
      <Header title={title || 'Map View'} showBack />
      <MapView
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={region}
        showsUserLocation
        showsMyLocationButton
      >
        {markers.map((m) => (
          <Marker
            key={m.id}
            coordinate={{ latitude: m.lat, longitude: m.lng }}
            title={m.title}
            pinColor={m.color}
          />
        ))}
      </MapView>
      {GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY' && (
        <View style={styles.banner}>
          <MaterialCommunityIcons name="information" size={18} color={colors.accent} />
          <Text style={styles.bannerText}>
            Add Google Maps API key in app.json for full map features
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  map: { flex: 1 },
  banner: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: 12,
  },
  bannerText: { ...typography.caption, color: colors.accent, flex: 1 },
});
