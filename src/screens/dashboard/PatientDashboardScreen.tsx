import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { CompositeNavigationProp } from '@react-navigation/native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList, PatientTabParamList } from '../../types';

import { ScreenContainer, Card, Badge, QuickActionGrid, Button, SectionHeader, MenuListItem, CategoryIcon } from '../../components/ui';

import { colors, typography, spacing } from '../../constants/theme';

import { categoryColors } from '../../constants/icons';

import { useAuth } from '../../context/AuthContext';

import { SAMPLE_REQUESTS } from '../../data/sampleData';



type Nav = CompositeNavigationProp<

  BottomTabNavigationProp<PatientTabParamList, 'PatientDashboard'>,

  NativeStackNavigationProp<RootStackParamList>

>;



export const PatientDashboardScreen: React.FC<{ navigation: Nav }> = ({ navigation }) => {

  const { user } = useAuth();

  const activeRequest = SAMPLE_REQUESTS[0];



  const actions = [

    { icon: 'alert-decagram-outline' as const, label: 'Emergency', color: categoryColors.emergency, onPress: () => navigation.navigate('PatientEmergencyRequest') },

    { icon: 'blood-bag' as const, label: 'Blood', color: categoryColors.blood, onPress: () => navigation.navigate('BloodRequestForm') },

    { icon: 'heart-plus-outline' as const, label: 'Organ', color: categoryColors.organ, onPress: () => navigation.navigate('OrganRequestForm') },

    { icon: 'hospital-building' as const, label: 'Hospitals', color: categoryColors.hospital, onPress: () => navigation.navigate('NearbyHospitalFinder') },

    { icon: 'water-outline' as const, label: 'Blood Bank', color: categoryColors.blood, onPress: () => navigation.navigate('NearbyBloodBankFinder') },

    { icon: 'ambulance' as const, label: 'Ambulance', color: categoryColors.ambulance, onPress: () => navigation.navigate('AmbulanceFinder') },

  ];



  return (

    <View style={styles.flex}>

      <LinearGradient colors={[colors.secondary, colors.primary]} style={styles.header}>

        <View style={styles.headerTop}>

          <CategoryIcon name="account-heart-outline" color={colors.accent} size="md" variant="ring" />

          <View style={styles.headerText}>

            <Text style={styles.greeting}>Patient Portal</Text>

            <Text style={styles.name}>{user?.fullName || 'Patient'}</Text>

          </View>

        </View>

        <Button
          title="Emergency SOS"
          onPress={() => navigation.navigate('EmergencySOS')}
          variant="danger"
          style={styles.sosBtn}
          fullWidth
        />

      </LinearGradient>



      <ScreenContainer scroll padding>

        <SectionHeader title="Request Help" subtitle="Find urgent medical support" icon="lifebuoy" iconColor={categoryColors.emergency} />

        <QuickActionGrid actions={actions} />



        <SectionHeader title="Active Request" icon="progress-clock" iconColor={categoryColors.search} />

        {activeRequest ? (

          <Card onPress={() => navigation.navigate('LiveRequestTracking', { requestId: activeRequest.id })}>

            <View style={styles.requestHeader}>

              <Badge label={activeRequest.urgency.toUpperCase()} color={colors.error} />

              <Badge label={activeRequest.status} color={colors.success} />

            </View>

            <Text style={styles.requestTitle}>

              {activeRequest.type === 'blood' ? `${activeRequest.bloodGroup} Blood` : activeRequest.organType} Request

            </Text>

            <Text style={styles.requestHospital}>{activeRequest.hospitalName}</Text>

            <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.navigate('LiveRequestTracking', { requestId: activeRequest.id })}>

              <Text style={styles.trackText}>Track Live →</Text>

            </TouchableOpacity>

          </Card>

        ) : (

          <Card>

            <Text style={styles.emptyText}>No active requests</Text>

          </Card>

        )}



        <SectionHeader title="Find Donors" icon="account-search-outline" iconColor={categoryColors.donor} />

        <MenuListItem

          icon="blood-bag"

          iconColor={categoryColors.blood}

          title="Find Blood Donors Nearby"

          subtitle="Search verified blood donors in your area"

          onPress={() => navigation.navigate('BloodDonorFinder')}

        />

        <MenuListItem

          icon="heart-plus-outline"

          iconColor={categoryColors.organ}

          title="Find Organ Donors"

          subtitle="Match with registered organ donors"

          onPress={() => navigation.navigate('OrganDonorFinder')}

        />

      </ScreenContainer>

    </View>

  );

};



const styles = StyleSheet.create({

  flex: { flex: 1, backgroundColor: colors.background },

  header: { paddingTop: spacing.xxl + 16, padding: spacing.lg, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },

  headerTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md },

  headerText: { flex: 1 },

  greeting: { ...typography.caption, color: 'rgba(255,255,255,0.85)', fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase' },

  name: { ...typography.h2, color: colors.accent, marginTop: 2 },

  sosBtn: { marginTop: spacing.xs },

  requestHeader: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },

  requestTitle: { ...typography.h3, marginBottom: 4 },

  requestHospital: { ...typography.bodySmall },

  trackBtn: { marginTop: spacing.md },

  trackText: { ...typography.bodySmall, color: colors.secondary, fontWeight: '700' },

  emptyText: { ...typography.bodySmall, textAlign: 'center', color: colors.textSecondary },

});


