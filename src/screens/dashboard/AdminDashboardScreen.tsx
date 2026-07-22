import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { CompositeNavigationProp } from '@react-navigation/native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList, AdminTabParamList } from '../../types';

import { ScreenContainer, Card, SectionHeader, CategoryIcon, MenuListItem } from '../../components/ui';

import { colors, typography, spacing } from '../../constants/theme';

import { categoryColors } from '../../constants/icons';



type Nav = CompositeNavigationProp<

  BottomTabNavigationProp<AdminTabParamList, 'AdminDashboard'>,

  NativeStackNavigationProp<RootStackParamList>

>;



const ADMIN_STATS = [

  { label: 'Total Users', value: '12,450', icon: 'account-group-outline' as const, color: categoryColors.hospital },

  { label: 'Active Donors', value: '3,280', icon: 'hand-heart-outline' as const, color: categoryColors.donor },

  { label: 'Hospitals', value: '186', icon: 'hospital-building' as const, color: categoryColors.map },

  { label: 'Requests Today', value: '47', icon: 'clipboard-alert-outline' as const, color: categoryColors.emergency },

];



export const AdminDashboardScreen: React.FC<{ navigation: Nav }> = ({ navigation }) => (

  <View style={styles.flex}>

    <LinearGradient colors={['#1A1A2E', colors.secondaryDark]} style={styles.header}>

      <CategoryIcon name="shield-account-outline" color={colors.accent} size="lg" variant="ring" />

      <Text style={styles.title}>Admin Panel</Text>

      <Text style={styles.sub}>Platform Overview</Text>

    </LinearGradient>



    <ScreenContainer scroll padding>

      <SectionHeader title="Statistics" icon="chart-box-outline" iconColor={categoryColors.admin} />

      <View style={styles.grid}>

        {ADMIN_STATS.map((s) => (

          <Card key={s.label} style={styles.statCard}>

            <CategoryIcon name={s.icon} color={s.color} size="md" variant="soft" />

            <Text style={styles.statValue}>{s.value}</Text>

            <Text style={styles.statLabel}>{s.label}</Text>

          </Card>

        ))}

      </View>



      <SectionHeader title="Management" icon="tune-vertical" iconColor={categoryColors.admin} />

      <MenuListItem icon="account-search-outline" iconColor={categoryColors.hospital} title="Manage Donors & Patients" subtitle="View and verify user accounts" onPress={() => navigation.navigate('DonorSearch')} />

      <MenuListItem icon="bullhorn-outline" iconColor={categoryColors.campaign} title="Review Campaigns" subtitle="Approve and monitor NGO campaigns" onPress={() => navigation.navigate('CampaignListing')} />

      <MenuListItem icon="newspaper-variant-outline" iconColor={categoryColors.article} title="Publish Articles" subtitle="Manage awareness content" onPress={() => navigation.navigate('AwarenessArticles')} />

      <MenuListItem icon="bell-ring-outline" iconColor={categoryColors.notification} title="System Notifications" subtitle="12 new alerts pending review" onPress={() => navigation.navigate('Notifications')} />

    </ScreenContainer>

  </View>

);



const styles = StyleSheet.create({

  flex: { flex: 1, backgroundColor: colors.background },

  header: { paddingTop: spacing.xxl + 16, padding: spacing.lg, alignItems: 'center', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },

  title: { ...typography.h2, color: colors.accent, marginTop: spacing.sm },

  sub: { ...typography.bodySmall, color: 'rgba(255,255,255,0.7)' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.sm },

  statCard: { width: '48%', alignItems: 'center', padding: spacing.lg, gap: 4 },

  statValue: { ...typography.h2, color: colors.primary, marginTop: spacing.xs },

  statLabel: { ...typography.caption, textAlign: 'center', color: colors.textSecondary },

});


