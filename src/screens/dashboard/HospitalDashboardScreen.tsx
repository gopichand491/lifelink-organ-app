import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { CompositeNavigationProp } from '@react-navigation/native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList, HospitalTabParamList } from '../../types';

import { ScreenContainer, Card, Badge, QuickActionGrid, SectionHeader, CategoryIcon } from '../../components/ui';

import { colors, typography, spacing } from '../../constants/theme';

import { categoryColors } from '../../constants/icons';

import { SAMPLE_REQUESTS, SAMPLE_DONORS } from '../../data/sampleData';



type Nav = CompositeNavigationProp<

  BottomTabNavigationProp<HospitalTabParamList, 'HospitalDashboard'>,

  NativeStackNavigationProp<RootStackParamList>

>;



export const HospitalDashboardScreen: React.FC<{ navigation: Nav }> = ({ navigation }) => {

  const pendingRequests = SAMPLE_REQUESTS.filter((r) => r.status === 'pending');

  const availableDonors = SAMPLE_DONORS.filter((d) => d.isAvailable);



  const actions = [

    { icon: 'clipboard-text-outline' as const, label: 'Requests', color: categoryColors.donor, onPress: () => navigation.navigate('DonorSearch') },

    { icon: 'account-search-outline' as const, label: 'Find Donors', color: categoryColors.hospital, onPress: () => navigation.navigate('OrganDonorFinder') },

    { icon: 'blood-bag' as const, label: 'Blood Banks', color: categoryColors.blood, onPress: () => navigation.navigate('NearbyBloodBankFinder') },

    { icon: 'ambulance' as const, label: 'Ambulance', color: categoryColors.ambulance, onPress: () => navigation.navigate('AmbulanceFinder') },

    { icon: 'map-marker-radius-outline' as const, label: 'Map View', color: categoryColors.map, onPress: () => navigation.navigate('MapView', {}) },

    { icon: 'calendar-check-outline' as const, label: 'Appointments', color: categoryColors.appointment, onPress: () => navigation.navigate('AppointmentBooking') },

  ];



  const metrics = [

    { icon: 'clock-alert-outline' as const, value: String(pendingRequests.length), label: 'Pending', color: categoryColors.emergency },

    { icon: 'hand-heart-outline' as const, value: String(availableDonors.length), label: 'Donors', color: categoryColors.donor },

    { icon: 'heart-pulse' as const, value: '24/7', label: 'Active', color: categoryColors.appointment },

  ];



  return (

    <View style={styles.flex}>

      <LinearGradient colors={[colors.secondaryDark, colors.secondary]} style={styles.header}>

        <CategoryIcon name="hospital-building" color={colors.accent} size="lg" variant="ring" />

        <Text style={styles.title}>Hospital Dashboard</Text>

        <Text style={styles.sub}>Apollo Lifeline Hospital</Text>

        <View style={styles.metrics}>

          {metrics.map((m) => (

            <View key={m.label} style={styles.metric}>

              <CategoryIcon name={m.icon} color={m.color} size="sm" variant="soft" />

              <Text style={styles.metricNum}>{m.value}</Text>

              <Text style={styles.metricLabel}>{m.label}</Text>

            </View>

          ))}

        </View>

      </LinearGradient>



      <ScreenContainer scroll padding>

        <SectionHeader title="Operations" subtitle="Manage hospital services" icon="cog-outline" iconColor={categoryColors.hospital} />

        <QuickActionGrid actions={actions} />



        <SectionHeader title="Urgent Requests" icon="alert-circle-outline" iconColor={categoryColors.emergency} />

        {SAMPLE_REQUESTS.map((req) => (

          <Card key={req.id} onPress={() => navigation.navigate('PatientRequestDetails', { requestId: req.id })}>

            <View style={styles.row}>

              <CategoryIcon name={req.type === 'blood' ? 'blood-bag' : 'heart-plus-outline'} color={req.type === 'blood' ? categoryColors.blood : categoryColors.organ} size="sm" variant="soft" />

              <View style={styles.reqInfo}>

                <View style={styles.badges}>

                  <Badge label={req.urgency} color={colors.error} />

                  <Badge label={req.type} color={colors.secondary} />

                </View>

                <Text style={styles.reqTitle}>{req.description}</Text>

                <Text style={styles.reqMeta}>{req.hospitalName} · {new Date(req.createdAt).toLocaleDateString()}</Text>

              </View>

            </View>

          </Card>

        ))}

      </ScreenContainer>

    </View>

  );

};



const styles = StyleSheet.create({

  flex: { flex: 1, backgroundColor: colors.background },

  header: { paddingTop: spacing.xxl + 16, padding: spacing.lg, alignItems: 'center', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },

  title: { ...typography.h2, color: colors.accent, marginTop: spacing.sm },

  sub: { ...typography.bodySmall, color: 'rgba(255,255,255,0.85)' },

  metrics: { flexDirection: 'row', marginTop: spacing.lg, gap: spacing.sm, width: '100%', justifyContent: 'center' },

  metric: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.12)', padding: spacing.md, borderRadius: 14, flex: 1, gap: 4 },

  metricNum: { ...typography.h3, color: colors.accent },

  metricLabel: { ...typography.caption, color: 'rgba(255,255,255,0.8)' },

  row: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },

  reqInfo: { flex: 1 },

  badges: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm, flexWrap: 'wrap' },

  reqTitle: { ...typography.body, fontWeight: '600' },

  reqMeta: { ...typography.caption, marginTop: 4 },

});


