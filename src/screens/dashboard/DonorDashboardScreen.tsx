import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { CompositeNavigationProp } from '@react-navigation/native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList, DonorTabParamList } from '../../types';

import { ScreenContainer, Card, Badge, QuickActionGrid, SectionHeader, MenuListItem, CategoryIcon } from '../../components/ui';

import { colors, typography, spacing } from '../../constants/theme';

import { categoryColors } from '../../constants/icons';

import { useAuth } from '../../context/AuthContext';

import { SAMPLE_NOTIFICATIONS } from '../../data/sampleData';



type Nav = CompositeNavigationProp<

  BottomTabNavigationProp<DonorTabParamList, 'DonorDashboard'>,

  NativeStackNavigationProp<RootStackParamList>

>;



export const DonorDashboardScreen: React.FC<{ navigation: Nav }> = ({ navigation }) => {

  const { user } = useAuth();

  const unread = SAMPLE_NOTIFICATIONS.filter((n) => !n.read).length;



  const actions = [

    { icon: 'account-plus-outline' as const, label: 'Register', color: categoryColors.donor, onPress: () => navigation.navigate('DonorRegistration') },

    { icon: 'blood-bag' as const, label: 'Blood Form', color: categoryColors.blood, onPress: () => navigation.navigate('BloodDonorForm') },

    { icon: 'heart-plus-outline' as const, label: 'Organ Form', color: categoryColors.organ, onPress: () => navigation.navigate('OrganDonorForm') },

    { icon: 'clipboard-text-search-outline' as const, label: 'Requests', color: categoryColors.search, onPress: () => navigation.navigate('DonorSearch') },

    { icon: 'calendar-check-outline' as const, label: 'Appointments', color: categoryColors.appointment, onPress: () => navigation.navigate('AppointmentBooking') },

    { icon: 'newspaper-variant-outline' as const, label: 'Articles', color: categoryColors.article, onPress: () => navigation.navigate('AwarenessArticles') },

  ];



  const stats = [

    { icon: 'hand-heart-outline' as const, value: '12', label: 'Donations', color: categoryColors.donor },

    { icon: 'star-outline' as const, value: '4.9', label: 'Rating', color: categoryColors.appointment },

    { icon: 'check-circle-outline' as const, value: 'Active', label: 'Status', color: categoryColors.search },

  ];



  return (

    <View style={styles.flex}>

      <LinearGradient colors={[colors.primary, colors.secondary]} style={styles.header}>

        <View style={styles.headerRow}>

          <View style={styles.headerText}>

            <Text style={styles.greeting}>Hello, {user?.fullName?.split(' ')[0] || 'Donor'}</Text>

            <Text style={styles.headerSub}>Ready to save a life today?</Text>

          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.notifBtn}>
            <View style={styles.notifCircle}>
              <MaterialCommunityIcons name="bell-outline" size={22} color={colors.accent} />
            </View>

            {unread > 0 && (

              <View style={styles.badge}>

                <Text style={styles.badgeText}>{unread}</Text>

              </View>

            )}

          </TouchableOpacity>

        </View>



        <Card style={styles.statsCard}>

          {stats.map((stat, index) => (

            <React.Fragment key={stat.label}>

              {index > 0 && <View style={styles.statDivider} />}

              <View style={styles.stat}>

                <CategoryIcon name={stat.icon} color={stat.color} size="sm" variant="soft" />

                <Text style={styles.statNum}>{stat.value}</Text>

                <Text style={styles.statLabel}>{stat.label}</Text>

              </View>

            </React.Fragment>

          ))}

        </Card>

      </LinearGradient>



      <ScreenContainer scroll padding>

        <SectionHeader title="Quick Actions" subtitle="Manage your donor activities" icon="lightning-bolt-outline" iconColor={categoryColors.donor} />

        <QuickActionGrid actions={actions} />



        <SectionHeader title="Eligibility Check" subtitle="Verify before you donate" icon="clipboard-check-outline" iconColor={categoryColors.blood} />

        <MenuListItem

          icon="blood-bag"

          iconColor={categoryColors.blood}

          title="Blood Donation Eligibility"

          subtitle="Check if you can donate blood today"

          onPress={() => navigation.navigate('BloodEligibilityChecker')}

        />

        <MenuListItem

          icon="heart-plus-outline"

          iconColor={categoryColors.organ}

          title="Organ Donation Eligibility"

          subtitle="Verify organ donor criteria"

          onPress={() => navigation.navigate('OrganEligibilityChecker')}

        />



        <SectionHeader title="Recent Activity" icon="history" iconColor={categoryColors.search} />

        <Card>

          <View style={styles.activityRow}>

            <CategoryIcon name="blood-bag" color={categoryColors.blood} size="md" variant="soft" />

            <View style={styles.activityInfo}>

              <Badge label="Blood Donation" color={categoryColors.blood} icon="water" />

              <Text style={styles.activityTitle}>Donated at Red Cross Blood Bank</Text>

              <Text style={styles.activityDate}>May 15, 2026 · O+ Blood</Text>

            </View>

          </View>

        </Card>

      </ScreenContainer>

    </View>

  );

};



const styles = StyleSheet.create({

  flex: { flex: 1, backgroundColor: colors.background },

  header: { paddingTop: spacing.xxl + 16, paddingHorizontal: spacing.md, paddingBottom: spacing.lg, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },

  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.lg },

  headerText: { flex: 1, paddingRight: spacing.sm },

  greeting: { ...typography.h2, color: colors.accent },

  headerSub: { ...typography.bodySmall, color: 'rgba(255,255,255,0.85)', marginTop: 4 },

  notifBtn: { position: 'relative' },
  notifCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },

  badge: { position: 'absolute', top: -2, right: -2, backgroundColor: colors.emergency, borderRadius: 10, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.primary },

  badgeText: { color: colors.accent, fontSize: 10, fontWeight: '700' },

  statsCard: { flexDirection: 'row', marginBottom: 0, backgroundColor: 'rgba(255,255,255,0.97)', paddingVertical: spacing.md },

  stat: { flex: 1, alignItems: 'center', gap: 4 },

  statDivider: { width: 1, backgroundColor: colors.border, marginVertical: spacing.xs },

  statNum: { ...typography.h3, color: colors.primary, marginTop: 2 },

  statLabel: { ...typography.caption, color: colors.textSecondary },

  activityRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },

  activityInfo: { flex: 1 },

  activityTitle: { ...typography.body, fontWeight: '600', marginTop: spacing.sm },

  activityDate: { ...typography.caption, marginTop: 4, color: colors.textSecondary },

});


