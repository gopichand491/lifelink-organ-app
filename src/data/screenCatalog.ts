import { RootStackParamList } from '../types';

export interface ScreenCatalogItem {
  number: number;
  name: string;
  route: keyof RootStackParamList;
  params?: RootStackParamList[keyof RootStackParamList];
  category: string;
  icon: string;
}

/** Complete list of 50 screens for final-year project documentation & demo */
export const ALL_50_SCREENS: ScreenCatalogItem[] = [
  { number: 1, name: 'Splash Screen', route: 'Splash', category: 'Auth', icon: 'heart-pulse' },
  { number: 2, name: 'Onboarding Screen 1', route: 'Onboarding1', category: 'Auth', icon: 'numeric-1-circle' },
  { number: 3, name: 'Onboarding Screen 2', route: 'Onboarding2', category: 'Auth', icon: 'numeric-2-circle' },
  { number: 4, name: 'Onboarding Screen 3', route: 'Onboarding3', category: 'Auth', icon: 'numeric-3-circle' },
  { number: 5, name: 'Login Screen', route: 'Login', category: 'Auth', icon: 'login' },
  { number: 6, name: 'Signup Screen', route: 'Signup', category: 'Auth', icon: 'account-plus' },
  { number: 7, name: 'Forgot Password', route: 'ForgotPassword', category: 'Auth', icon: 'lock-reset' },
  { number: 8, name: 'OTP Verification', route: 'OTPVerification', params: { email: 'student@college.edu' }, category: 'Auth', icon: 'shield-key' },
  { number: 9, name: 'Role Selection', route: 'RoleSelection', category: 'Auth', icon: 'account-group' },
  { number: 10, name: 'Donor Dashboard', route: 'DonorDashboard', category: 'Dashboard', icon: 'hand-heart' },
  { number: 11, name: 'Patient Dashboard', route: 'PatientDashboard', category: 'Dashboard', icon: 'account-heart' },
  { number: 12, name: 'Hospital Dashboard', route: 'HospitalDashboard', category: 'Dashboard', icon: 'hospital-building' },
  { number: 13, name: 'NGO Dashboard', route: 'NGODashboard', category: 'Dashboard', icon: 'account-group-outline' },
  { number: 14, name: 'Admin Dashboard', route: 'AdminDashboard', category: 'Dashboard', icon: 'shield-account' },
  { number: 15, name: 'Donor Registration', route: 'DonorRegistration', category: 'Forms', icon: 'clipboard-account' },
  { number: 16, name: 'Organ Donor Form', route: 'OrganDonorForm', category: 'Forms', icon: 'heart-plus' },
  { number: 17, name: 'Blood Donor Form', route: 'BloodDonorForm', category: 'Forms', icon: 'blood-bag' },
  { number: 18, name: 'Patient Emergency Request', route: 'PatientEmergencyRequest', category: 'Forms', icon: 'alert-decagram' },
  { number: 19, name: 'Organ Request Form', route: 'OrganRequestForm', category: 'Forms', icon: 'human-handsup' },
  { number: 20, name: 'Blood Request Form', route: 'BloodRequestForm', category: 'Forms', icon: 'water' },
  { number: 21, name: 'Donor Search', route: 'DonorSearch', category: 'Finder', icon: 'account-search' },
  { number: 22, name: 'Organ Donor Finder', route: 'OrganDonorFinder', category: 'Finder', icon: 'heart-pulse' },
  { number: 23, name: 'Blood Donor Finder', route: 'BloodDonorFinder', category: 'Finder', icon: 'blood-bag' },
  { number: 24, name: 'Nearby Hospital Finder', route: 'NearbyHospitalFinder', category: 'Finder', icon: 'hospital-marker' },
  { number: 25, name: 'Nearby Blood Bank Finder', route: 'NearbyBloodBankFinder', category: 'Finder', icon: 'map-marker' },
  { number: 26, name: 'Ambulance Finder', route: 'AmbulanceFinder', category: 'Finder', icon: 'ambulance' },
  { number: 27, name: 'Emergency SOS', route: 'EmergencySOS', category: 'Emergency', icon: 'alert-octagon' },
  { number: 28, name: 'Live Request Tracking', route: 'LiveRequestTracking', params: { requestId: 'r1' }, category: 'Emergency', icon: 'map-marker-path' },
  { number: 29, name: 'Donor Details', route: 'DonorDetails', params: { donorId: 'd1' }, category: 'Details', icon: 'account-details' },
  { number: 30, name: 'Patient Request Details', route: 'PatientRequestDetails', params: { requestId: 'r1' }, category: 'Details', icon: 'clipboard-text' },
  { number: 31, name: 'Hospital Details', route: 'HospitalDetails', params: { hospitalId: 'h1' }, category: 'Details', icon: 'hospital-box' },
  { number: 32, name: 'Blood Bank Details', route: 'BloodBankDetails', params: { bloodBankId: 'bb1' }, category: 'Details', icon: 'blood-bag' },
  { number: 33, name: 'Map View', route: 'MapView', params: {}, category: 'Map', icon: 'google-maps' },
  { number: 34, name: 'Chat List', route: 'ChatList', category: 'Communication', icon: 'message-text' },
  { number: 35, name: 'Chat Conversation', route: 'ChatConversation', params: { chatId: 'c1', name: 'Sarah Mitchell' }, category: 'Communication', icon: 'chat' },
  { number: 36, name: 'Notifications', route: 'Notifications', category: 'Communication', icon: 'bell' },
  { number: 37, name: 'Awareness Articles', route: 'AwarenessArticles', category: 'Content', icon: 'newspaper' },
  { number: 38, name: 'Article Details', route: 'ArticleDetails', params: { articleId: 'art1' }, category: 'Content', icon: 'book-open-page-variant' },
  { number: 39, name: 'Organ Eligibility Checker', route: 'OrganEligibilityChecker', category: 'Content', icon: 'heart-plus-outline' },
  { number: 40, name: 'Blood Eligibility Checker', route: 'BloodEligibilityChecker', category: 'Content', icon: 'blood-bag' },
  { number: 41, name: 'Medical History', route: 'MedicalHistory', category: 'Content', icon: 'medical-bag' },
  { number: 42, name: 'Appointment Booking', route: 'AppointmentBooking', category: 'Content', icon: 'calendar-plus' },
  { number: 43, name: 'Appointment Details', route: 'AppointmentDetails', params: { appointmentId: 'apt1' }, category: 'Content', icon: 'calendar-check' },
  { number: 44, name: 'Volunteer Registration', route: 'VolunteerRegistration', category: 'Content', icon: 'human-handsup' },
  { number: 45, name: 'Campaign Listing', route: 'CampaignListing', category: 'Content', icon: 'bullhorn' },
  { number: 46, name: 'Campaign Details', route: 'CampaignDetails', params: { campaignId: 'camp1' }, category: 'Content', icon: 'flag' },
  { number: 47, name: 'Profile', route: 'Profile', category: 'Profile', icon: 'account-circle' },
  { number: 48, name: 'Edit Profile', route: 'EditProfile', category: 'Profile', icon: 'account-edit' },
  { number: 49, name: 'Settings', route: 'Settings', category: 'Profile', icon: 'cog' },
  { number: 50, name: 'Help & Support', route: 'HelpSupport', category: 'Profile', icon: 'help-circle' },
];

export const SCREEN_CATEGORIES = [...new Set(ALL_50_SCREENS.map((s) => s.category))];
