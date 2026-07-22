import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from './theme';

export type AppIconName = keyof typeof MaterialCommunityIcons.glyphMap;

/** Consistent category colors across the app */
export const categoryColors = {
  donor: colors.primary,
  blood: colors.error,
  organ: '#E53935',
  hospital: colors.secondary,
  emergency: colors.emergency,
  ambulance: colors.warning,
  search: colors.info,
  appointment: colors.success,
  article: '#7B1FA2',
  campaign: colors.primary,
  chat: colors.secondary,
  profile: colors.secondary,
  notification: colors.warning,
  map: colors.info,
  volunteer: colors.success,
  admin: colors.secondaryDark,
} as const;

/** Donor home quick actions */
export const donorQuickActions = [
  { icon: 'account-plus-outline' as AppIconName, label: 'Register', color: categoryColors.donor },
  { icon: 'blood-bag' as AppIconName, label: 'Blood Form', color: categoryColors.blood },
  { icon: 'heart-plus-outline' as AppIconName, label: 'Organ Form', color: categoryColors.organ },
  { icon: 'clipboard-text-search-outline' as AppIconName, label: 'Requests', color: categoryColors.search },
  { icon: 'calendar-check-outline' as AppIconName, label: 'Appointments', color: categoryColors.appointment },
  { icon: 'newspaper-variant-outline' as AppIconName, label: 'Articles', color: categoryColors.article },
];

/** Patient home quick actions */
export const patientQuickActions = [
  { icon: 'alert-decagram-outline' as AppIconName, label: 'Emergency', color: categoryColors.emergency },
  { icon: 'blood-bag' as AppIconName, label: 'Blood', color: categoryColors.blood },
  { icon: 'heart-plus-outline' as AppIconName, label: 'Organ', color: categoryColors.organ },
  { icon: 'hospital-building' as AppIconName, label: 'Hospitals', color: categoryColors.hospital },
  { icon: 'water-outline' as AppIconName, label: 'Blood Bank', color: categoryColors.blood },
  { icon: 'ambulance' as AppIconName, label: 'Ambulance', color: categoryColors.ambulance },
];
