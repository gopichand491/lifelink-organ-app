import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { CompositeNavigationProp } from '@react-navigation/native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList, NGOTabParamList } from '../../types';

import { ScreenContainer, Card, Badge, QuickActionGrid, SectionHeader, CategoryIcon } from '../../components/ui';

import { colors, typography, spacing } from '../../constants/theme';

import { categoryColors } from '../../constants/icons';

import { SAMPLE_CAMPAIGNS } from '../../data/sampleData';



type Nav = CompositeNavigationProp<

  BottomTabNavigationProp<NGOTabParamList, 'NGODashboard'>,

  NativeStackNavigationProp<RootStackParamList>

>;



export const NGODashboardScreen: React.FC<{ navigation: Nav }> = ({ navigation }) => {

  const actions = [

    { icon: 'bullhorn-outline' as const, label: 'Campaigns', color: categoryColors.campaign, onPress: () => navigation.navigate('CampaignListing') },

    { icon: 'account-plus-outline' as const, label: 'Volunteers', color: categoryColors.volunteer, onPress: () => navigation.navigate('VolunteerRegistration') },

    { icon: 'newspaper-variant-outline' as const, label: 'Articles', color: categoryColors.article, onPress: () => navigation.navigate('AwarenessArticles') },

    { icon: 'map-marker-radius-outline' as const, label: 'Events Map', color: categoryColors.map, onPress: () => navigation.navigate('MapView', {}) },

    { icon: 'message-text-outline' as const, label: 'Messages', color: categoryColors.chat, onPress: () => navigation.navigate('ChatList') },

    { icon: 'cog-outline' as const, label: 'Settings', color: colors.textSecondary, onPress: () => navigation.navigate('Settings') },

  ];



  return (

    <View style={styles.flex}>

      <LinearGradient colors={[colors.primary, colors.secondaryDark]} style={styles.header}>

        <CategoryIcon name="account-group-outline" color={colors.accent} size="lg" variant="ring" />

        <Text style={styles.title}>NGO Dashboard</Text>

        <Text style={styles.sub}>LifeLink Foundation</Text>

        <View style={styles.stats}>

          <CategoryIcon name="account-multiple-outline" color={colors.accent} size="sm" variant="soft" />

          <Text style={styles.statText}>245 Volunteers · 12 Active Campaigns</Text>

        </View>

      </LinearGradient>



      <ScreenContainer scroll padding>

        <SectionHeader title="Manage" subtitle="Organize campaigns and outreach" icon="view-dashboard-outline" iconColor={categoryColors.campaign} />

        <QuickActionGrid actions={actions} />



        <SectionHeader title="Upcoming Campaigns" icon="calendar-star" iconColor={categoryColors.volunteer} />

        {SAMPLE_CAMPAIGNS.map((camp) => (

          <Card key={camp.id} onPress={() => navigation.navigate('CampaignDetails', { campaignId: camp.id })}>

            <View style={styles.campRow}>

              <CategoryIcon name="bullhorn-outline" color={categoryColors.campaign} size="md" variant="soft" />

              <View style={styles.campInfo}>

                <Badge label={camp.type.replace('_', ' ')} color={colors.secondary} />

                <Text style={styles.campTitle}>{camp.title}</Text>

                <Text style={styles.campMeta}>{camp.organizer} · {camp.participants} participants</Text>

                <Text style={styles.campDate}>{camp.startDate} — {camp.endDate}</Text>

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

  stats: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md, backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 20 },

  statText: { ...typography.caption, color: colors.accent, fontWeight: '600' },

  campRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },

  campInfo: { flex: 1 },

  campTitle: { ...typography.body, fontWeight: '600', marginTop: spacing.sm },

  campMeta: { ...typography.caption, marginTop: 4 },

  campDate: { ...typography.caption, color: colors.secondary, marginTop: 2 },

});


