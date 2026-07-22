import { UserRole } from '../types';

export const APP_NAME = 'Organ Donation & Lifesaving Finder';
export const APP_TAGLINE = 'Connecting donors, patients & hospitals to save lives';

export const ONBOARDING_DATA = [
  {
    id: '1',
    title: 'Save Lives Through Donation',
    description:
      'Register as an organ or blood donor and be ready to help someone in critical need during emergencies.',
    icon: 'heart-pulse' as const,
    color: '#C62828',
  },
  {
    id: '2',
    title: 'Find Help Instantly',
    description:
      'Patients and hospitals can locate nearby donors, blood banks, and ambulances with real-time tracking.',
    icon: 'map-marker-radius' as const,
    color: '#1565C0',
  },
  {
    id: '3',
    title: 'Emergency SOS & Alerts',
    description:
      'One-tap emergency SOS sends your location to nearby responders, NGOs, and verified medical facilities.',
    icon: 'alert-decagram' as const,
    color: '#C62828',
  },
];

export const ROLES: { role: UserRole; title: string; description: string; icon: string }[] = [
  { role: 'donor', title: 'Donor', description: 'Register to donate organs or blood', icon: 'hand-heart' },
  { role: 'patient', title: 'Patient', description: 'Request urgent medical assistance', icon: 'account-heart' },
  { role: 'hospital', title: 'Hospital', description: 'Manage requests and find donors', icon: 'hospital-building' },
  { role: 'ngo', title: 'NGO', description: 'Organize campaigns and volunteers', icon: 'account-group' },
  { role: 'admin', title: 'Admin', description: 'Platform administration', icon: 'shield-account' },
  { role: 'volunteer', title: 'Volunteer', description: 'Support lifesaving initiatives', icon: 'human-handsup' },
];

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const ORGAN_TYPES = [
  'Kidney',
  'Liver',
  'Heart',
  'Lungs',
  'Pancreas',
  'Cornea',
  'Bone Marrow',
];

export const URGENCY_LEVELS = [
  { value: 'critical', label: 'Critical', color: '#D32F2F' },
  { value: 'urgent', label: 'Urgent', color: '#F57C00' },
  { value: 'normal', label: 'Normal', color: '#2E7D32' },
];

export const STORAGE_KEYS = {
  ONBOARDING_COMPLETE: '@lifelink_onboarding_complete',
  USER_ROLE: '@lifelink_user_role',
  AUTH_TOKEN: '@lifelink_auth_token',
};
