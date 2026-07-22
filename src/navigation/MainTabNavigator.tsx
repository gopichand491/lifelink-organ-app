import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { UserRole, DonorTabParamList, PatientTabParamList, HospitalTabParamList, NGOTabParamList, AdminTabParamList } from '../types';

import { colors } from '../constants/theme';

import { categoryColors } from '../constants/icons';

import { useAuth } from '../context/AuthContext';

import { TabBarIcon } from '../components/ui/TabBarIcon';



import { DonorDashboardScreen } from '../screens/dashboard/DonorDashboardScreen';

import { PatientDashboardScreen } from '../screens/dashboard/PatientDashboardScreen';

import { HospitalDashboardScreen } from '../screens/dashboard/HospitalDashboardScreen';

import { NGODashboardScreen } from '../screens/dashboard/NGODashboardScreen';

import { AdminDashboardScreen } from '../screens/dashboard/AdminDashboardScreen';

import { DonorSearchScreen } from '../screens/finder/FinderScreens';

import { EmergencySOSScreen } from '../screens/emergency/EmergencyScreens';

import { ChatListScreen } from '../screens/chat/ChatScreens';

import { ProfileScreen } from '../screens/profile/ProfileScreens';

import { CampaignListingScreen, NotificationsScreen } from '../screens/content/ContentScreens';



const DonorTabs = createBottomTabNavigator<DonorTabParamList>();

const PatientTabs = createBottomTabNavigator<PatientTabParamList>();

const HospitalTabs = createBottomTabNavigator<HospitalTabParamList>();

const NGOTabs = createBottomTabNavigator<NGOTabParamList>();

const AdminTabs = createBottomTabNavigator<AdminTabParamList>();



const tabScreenOptions = {

  headerShown: false,

  tabBarActiveTintColor: colors.primary,

  tabBarInactiveTintColor: colors.textLight,

  tabBarStyle: {

    backgroundColor: colors.surface,

    borderTopColor: colors.border,

    borderTopWidth: 1,

    paddingTop: 6,

    paddingBottom: 8,

    height: 64,

    elevation: 12,

    shadowColor: colors.secondary,

    shadowOffset: { width: 0, height: -2 },

    shadowOpacity: 0.08,

    shadowRadius: 8,

  },

  tabBarLabelStyle: { fontSize: 11, fontWeight: '600' as const, marginTop: 2 },

};



/** Role-based bottom tab navigation with polished tab icons */

export const MainTabNavigator: React.FC = () => {

  const { user } = useAuth();

  const role: UserRole = user?.role || 'donor';



  if (role === 'patient') {

    return (

      <PatientTabs.Navigator screenOptions={tabScreenOptions}>

        <PatientTabs.Screen name="PatientDashboard" component={PatientDashboardScreen} options={{ tabBarLabel: 'Home', tabBarIcon: ({ focused, color }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} focused={focused} color={color} highlightColor={categoryColors.hospital} /> }} />

        <PatientTabs.Screen name="EmergencySOS" component={EmergencySOSScreen} options={{ tabBarLabel: 'SOS', tabBarIcon: ({ focused }) => <TabBarIcon name="alert-octagon-outline" focused={focused} color={colors.textLight} highlightColor={categoryColors.emergency} /> }} />

        <PatientTabs.Screen name="ChatList" component={ChatListScreen} options={{ tabBarLabel: 'Chat', tabBarIcon: ({ focused, color }) => <TabBarIcon name={focused ? 'message-text' : 'message-text-outline'} focused={focused} color={color} highlightColor={categoryColors.chat} /> }} />

        <PatientTabs.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile', tabBarIcon: ({ focused, color }) => <TabBarIcon name={focused ? 'account-circle' : 'account-circle-outline'} focused={focused} color={color} highlightColor={categoryColors.profile} /> }} />

      </PatientTabs.Navigator>

    );

  }



  if (role === 'hospital') {

    return (

      <HospitalTabs.Navigator screenOptions={tabScreenOptions}>

        <HospitalTabs.Screen name="HospitalDashboard" component={HospitalDashboardScreen} options={{ tabBarLabel: 'Home', tabBarIcon: ({ focused, color }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} focused={focused} color={color} highlightColor={categoryColors.hospital} /> }} />

        <HospitalTabs.Screen name="DonorSearchTab" component={DonorSearchScreen} options={{ tabBarLabel: 'Donors', tabBarIcon: ({ focused, color }) => <TabBarIcon name={focused ? 'account-search' : 'account-search-outline'} focused={focused} color={color} highlightColor={categoryColors.donor} /> }} />

        <HospitalTabs.Screen name="ChatList" component={ChatListScreen} options={{ tabBarLabel: 'Chat', tabBarIcon: ({ focused, color }) => <TabBarIcon name={focused ? 'message-text' : 'message-text-outline'} focused={focused} color={color} highlightColor={categoryColors.chat} /> }} />

        <HospitalTabs.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile', tabBarIcon: ({ focused, color }) => <TabBarIcon name={focused ? 'account-circle' : 'account-circle-outline'} focused={focused} color={color} highlightColor={categoryColors.profile} /> }} />

      </HospitalTabs.Navigator>

    );

  }



  if (role === 'ngo') {

    return (

      <NGOTabs.Navigator screenOptions={tabScreenOptions}>

        <NGOTabs.Screen name="NGODashboard" component={NGODashboardScreen} options={{ tabBarLabel: 'Home', tabBarIcon: ({ focused, color }) => <TabBarIcon name={focused ? 'view-dashboard' : 'view-dashboard-outline'} focused={focused} color={color} highlightColor={categoryColors.campaign} /> }} />

        <NGOTabs.Screen name="CampaignListing" component={CampaignListingScreen} options={{ tabBarLabel: 'Campaigns', tabBarIcon: ({ focused, color }) => <TabBarIcon name={focused ? 'bullhorn' : 'bullhorn-outline'} focused={focused} color={color} highlightColor={categoryColors.campaign} /> }} />

        <NGOTabs.Screen name="ChatList" component={ChatListScreen} options={{ tabBarLabel: 'Chat', tabBarIcon: ({ focused, color }) => <TabBarIcon name={focused ? 'message-text' : 'message-text-outline'} focused={focused} color={color} highlightColor={categoryColors.chat} /> }} />

        <NGOTabs.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile', tabBarIcon: ({ focused, color }) => <TabBarIcon name={focused ? 'account-circle' : 'account-circle-outline'} focused={focused} color={color} highlightColor={categoryColors.profile} /> }} />

      </NGOTabs.Navigator>

    );

  }



  if (role === 'admin') {

    return (

      <AdminTabs.Navigator screenOptions={tabScreenOptions}>

        <AdminTabs.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ tabBarLabel: 'Admin', tabBarIcon: ({ focused, color }) => <TabBarIcon name={focused ? 'shield-account' : 'shield-account-outline'} focused={focused} color={color} highlightColor={categoryColors.admin} /> }} />

        <AdminTabs.Screen name="Notifications" component={NotificationsScreen} options={{ tabBarLabel: 'Alerts', tabBarIcon: ({ focused, color }) => <TabBarIcon name={focused ? 'bell' : 'bell-outline'} focused={focused} color={color} highlightColor={categoryColors.notification} /> }} />

        <AdminTabs.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile', tabBarIcon: ({ focused, color }) => <TabBarIcon name={focused ? 'account-circle' : 'account-circle-outline'} focused={focused} color={color} highlightColor={categoryColors.profile} /> }} />

      </AdminTabs.Navigator>

    );

  }



  return (

    <DonorTabs.Navigator screenOptions={tabScreenOptions}>

      <DonorTabs.Screen name="DonorDashboard" component={DonorDashboardScreen} options={{ tabBarLabel: 'Home', tabBarIcon: ({ focused, color }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} focused={focused} color={color} highlightColor={categoryColors.donor} /> }} />

      <DonorTabs.Screen name="DonorSearchTab" component={DonorSearchScreen} options={{ tabBarLabel: 'Search', tabBarIcon: ({ focused, color }) => <TabBarIcon name={focused ? 'magnify' : 'magnify'} focused={focused} color={color} highlightColor={categoryColors.search} /> }} />

      <DonorTabs.Screen name="ChatList" component={ChatListScreen} options={{ tabBarLabel: 'Chat', tabBarIcon: ({ focused, color }) => <TabBarIcon name={focused ? 'message-text' : 'message-text-outline'} focused={focused} color={color} highlightColor={categoryColors.chat} /> }} />

      <DonorTabs.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile', tabBarIcon: ({ focused, color }) => <TabBarIcon name={focused ? 'account-circle' : 'account-circle-outline'} focused={focused} color={color} highlightColor={categoryColors.profile} /> }} />

    </DonorTabs.Navigator>

  );

};


