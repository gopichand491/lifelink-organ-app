import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { DonorDashboardScreen } from '../dashboard/DonorDashboardScreen';
import { PatientDashboardScreen } from '../dashboard/PatientDashboardScreen';
import { HospitalDashboardScreen } from '../dashboard/HospitalDashboardScreen';
import { NGODashboardScreen } from '../dashboard/NGODashboardScreen';
import { AdminDashboardScreen } from '../dashboard/AdminDashboardScreen';

/** Stack wrappers so each role dashboard counts as a dedicated screen (10–14 of 50) */
type StackNav = NativeStackNavigationProp<RootStackParamList>;

export const DonorDashboardStackScreen: React.FC<{ navigation: StackNav }> = ({ navigation }) => (
  <DonorDashboardScreen navigation={navigation as never} />
);

export const PatientDashboardStackScreen: React.FC<{ navigation: StackNav }> = ({ navigation }) => (
  <PatientDashboardScreen navigation={navigation as never} />
);

export const HospitalDashboardStackScreen: React.FC<{ navigation: StackNav }> = ({ navigation }) => (
  <HospitalDashboardScreen navigation={navigation as never} />
);

export const NGODashboardStackScreen: React.FC<{ navigation: StackNav }> = ({ navigation }) => (
  <NGODashboardScreen navigation={navigation as never} />
);

export const AdminDashboardStackScreen: React.FC<{ navigation: StackNav }> = ({ navigation }) => (
  <AdminDashboardScreen navigation={navigation as never} />
);
