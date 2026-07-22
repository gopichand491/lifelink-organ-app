import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { Header, Button, ScreenContainer, Card } from '../../components/ui';
import { colors, typography, spacing } from '../../constants/theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EmergencySOS'>;
};

export const EmergencySOSScreen: React.FC<Props> = ({ navigation }) => {
  const [active, setActive] = useState(false);
  const [location, setLocation] = useState<string>('Fetching location...');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(`${loc.coords.latitude.toFixed(4)}, ${loc.coords.longitude.toFixed(4)}`);
      } else {
        setLocation('Location permission denied — enable in settings');
      }
    })();
  }, []);

  const triggerSOS = () => {
    Alert.alert(
      'Confirm Emergency SOS',
      'This will alert nearby hospitals, NGOs, and emergency responders with your location.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send SOS',
          style: 'destructive',
          onPress: () => {
            setActive(true);
            setCountdown(5);
            const interval = setInterval(() => {
              setCountdown((c) => {
                if (c <= 1) {
                  clearInterval(interval);
                  navigation.navigate('LiveRequestTracking', { requestId: 'sos_1' });
                  return 0;
                }
                return c - 1;
              });
            }, 1000);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.flex}>
      <Header title="Emergency SOS" showBack />
      <ScreenContainer scroll={false} padding>
        <View style={styles.sosCircle}>
          <MaterialCommunityIcons name="alert-octagon" size={80} color={colors.accent} />
        </View>
        <Text style={styles.title}>One-Tap Emergency Alert</Text>
        <Text style={styles.desc}>
          Press the button below to instantly notify nearby hospitals, blood banks, ambulances, and registered donors.
        </Text>

        <Card style={styles.locCard}>
          <MaterialCommunityIcons name="map-marker" size={24} color={colors.secondary} />
          <View style={styles.locInfo}>
            <Text style={styles.locLabel}>Your Location</Text>
            <Text style={styles.locValue}>{location}</Text>
          </View>
        </Card>

        {active && (
          <View style={styles.alerting}>
            <MaterialCommunityIcons name="broadcast" size={24} color={colors.error} />
            <Text style={styles.alertingText}>Alerting responders... {countdown > 0 ? countdown : ''}</Text>
          </View>
        )}

        <Button title="🚨 SEND SOS ALERT" onPress={triggerSOS} variant="danger" disabled={active} />
        <Button title="View on Map" onPress={() => navigation.navigate('MapView', {})} variant="outline" style={styles.mapBtn} />
      </ScreenContainer>
    </View>
  );
};

type TrackProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LiveRequestTracking'>;
  route: RouteProp<RootStackParamList, 'LiveRequestTracking'>;
};

const TRACK_STEPS = [
  { label: 'Request Submitted', done: true, time: '10:30 AM' },
  { label: 'Searching Donors', done: true, time: '10:32 AM' },
  { label: 'Donor Matched', done: true, time: '10:45 AM' },
  { label: 'In Transit', done: false, time: 'Pending' },
  { label: 'Completed', done: false, time: 'Pending' },
];

export const LiveRequestTrackingScreen: React.FC<TrackProps> = ({ navigation }) => (
  <View style={styles.flex}>
    <Header title="Live Tracking" showBack rightIcon="map" onRightPress={() => navigation.navigate('MapView', {})} />
    <ScreenContainer scroll padding>
      <Card style={styles.statusCard}>
        <Text style={styles.statusLabel}>Current Status</Text>
        <Text style={styles.statusValue}>Donor Matched ✓</Text>
        <Text style={styles.statusId}>Request #REQ-2026-001</Text>
      </Card>

      {TRACK_STEPS.map((step, i) => (
        <View key={step.label} style={styles.stepRow}>
          <View style={[styles.stepDot, step.done && styles.stepDotDone]}>
            {step.done && <MaterialCommunityIcons name="check" size={14} color={colors.accent} />}
          </View>
          <View style={styles.stepInfo}>
            <Text style={[styles.stepLabel, step.done && styles.stepDone]}>{step.label}</Text>
            <Text style={styles.stepTime}>{step.time}</Text>
          </View>
          {i < TRACK_STEPS.length - 1 && <View style={[styles.stepLine, step.done && styles.stepLineDone]} />}
        </View>
      ))}

      <Button title="Contact Donor" onPress={() => navigation.navigate('ChatConversation', { chatId: 'c1', name: 'Sarah Mitchell' })} />
      <Button title="Call Hospital" onPress={() => {}} variant="outline" style={styles.mapBtn} />
    </ScreenContainer>
  </View>
);

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  sosCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.emergency,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
    shadowColor: colors.emergency,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  title: { ...typography.h2, textAlign: 'center', marginBottom: spacing.sm },
  desc: { ...typography.bodySmall, textAlign: 'center', marginBottom: spacing.xl, lineHeight: 22 },
  locCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.xl },
  locInfo: { flex: 1 },
  locLabel: { ...typography.caption, color: colors.textSecondary },
  locValue: { ...typography.body, fontWeight: '600', marginTop: 2 },
  alerting: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, marginBottom: spacing.md },
  alertingText: { ...typography.body, color: colors.error, fontWeight: '600' },
  mapBtn: { marginTop: spacing.sm },
  statusCard: { alignItems: 'center', backgroundColor: `${colors.success}10`, marginBottom: spacing.lg },
  statusLabel: { ...typography.caption },
  statusValue: { ...typography.h2, color: colors.success, marginTop: 4 },
  statusId: { ...typography.caption, marginTop: 4 },
  stepRow: { flexDirection: 'row', marginBottom: spacing.lg, position: 'relative' },
  stepDot: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  stepDotDone: { backgroundColor: colors.success, borderColor: colors.success },
  stepInfo: { flex: 1 },
  stepLabel: { ...typography.body, fontWeight: '600', color: colors.textLight },
  stepDone: { color: colors.text },
  stepTime: { ...typography.caption },
  stepLine: { position: 'absolute', left: 13, top: 28, width: 2, height: 40, backgroundColor: colors.border },
  stepLineDone: { backgroundColor: colors.success },
});
