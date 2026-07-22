export type UserRole = 'donor' | 'patient' | 'hospital' | 'ngo' | 'admin' | 'volunteer';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  bloodGroup?: string;
  organTypes?: string[];
  location?: GeoLocation;
  hospitalId?: string;
  ngoId?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
}

export interface Donor {
  id: string;
  userId: string;
  type: 'organ' | 'blood';
  fullName: string;
  bloodGroup?: string;
  organTypes?: string[];
  phone: string;
  location: GeoLocation;
  isAvailable: boolean;
  lastDonation?: string;
  rating: number;
  distance?: number;
}

export interface PatientRequest {
  id: string;
  patientId: string;
  type: 'organ' | 'blood' | 'emergency';
  organType?: string;
  bloodGroup?: string;
  units?: number;
  urgency: 'critical' | 'urgent' | 'normal';
  status: 'pending' | 'matched' | 'in_transit' | 'completed' | 'cancelled';
  hospitalName: string;
  location: GeoLocation;
  description: string;
  createdAt: string;
}

export interface Hospital {
  id: string;
  name: string;
  type: string;
  phone: string;
  email: string;
  location: GeoLocation;
  specialties: string[];
  rating: number;
  is24Hours: boolean;
  image?: string;
}

export interface BloodBank {
  id: string;
  name: string;
  phone: string;
  location: GeoLocation;
  bloodStock: Record<string, number>;
  isOpen: boolean;
  rating: number;
}

export interface Ambulance {
  id: string;
  provider: string;
  phone: string;
  location: GeoLocation;
  isAvailable: boolean;
  eta?: number;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface ChatThread {
  id: string;
  participants: string[];
  participantNames: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'request' | 'match' | 'campaign' | 'system';
  read: boolean;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image?: string;
  author: string;
  publishedAt: string;
  readTime: number;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  organizer: string;
  location: GeoLocation;
  startDate: string;
  endDate: string;
  image?: string;
  participants: number;
  type: 'blood_drive' | 'awareness' | 'registration';
}

export interface Appointment {
  id: string;
  userId: string;
  hospitalId: string;
  hospitalName: string;
  type: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  condition: string;
  diagnosedDate: string;
  medications: string[];
  notes: string;
}

export type RootStackParamList = {
  Splash: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  OTPVerification: { email: string };
  RoleSelection: undefined;
  Main: undefined;
  DonorDashboard: undefined;
  PatientDashboard: undefined;
  HospitalDashboard: undefined;
  NGODashboard: undefined;
  AdminDashboard: undefined;
  ScreenCatalog: undefined;
  DonorRegistration: undefined;
  OrganDonorForm: undefined;
  BloodDonorForm: undefined;
  PatientEmergencyRequest: undefined;
  OrganRequestForm: undefined;
  BloodRequestForm: undefined;
  DonorSearch: undefined;
  OrganDonorFinder: undefined;
  BloodDonorFinder: undefined;
  NearbyHospitalFinder: undefined;
  NearbyBloodBankFinder: undefined;
  AmbulanceFinder: undefined;
  EmergencySOS: undefined;
  LiveRequestTracking: { requestId?: string };
  DonorDetails: { donorId: string };
  PatientRequestDetails: { requestId: string };
  HospitalDetails: { hospitalId: string };
  BloodBankDetails: { bloodBankId: string };
  MapView: { title?: string; latitude?: number; longitude?: number };
  ChatList: undefined;
  ChatConversation: { chatId: string; name: string };
  Notifications: undefined;
  AwarenessArticles: undefined;
  ArticleDetails: { articleId: string };
  OrganEligibilityChecker: undefined;
  BloodEligibilityChecker: undefined;
  MedicalHistory: undefined;
  AppointmentBooking: undefined;
  AppointmentDetails: { appointmentId: string };
  VolunteerRegistration: undefined;
  CampaignListing: undefined;
  CampaignDetails: { campaignId: string };
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  HelpSupport: undefined;
};

export type DonorTabParamList = {
  DonorDashboard: undefined;
  DonorSearchTab: undefined;
  ChatList: undefined;
  Profile: undefined;
};

export type PatientTabParamList = {
  PatientDashboard: undefined;
  EmergencySOS: undefined;
  ChatList: undefined;
  Profile: undefined;
};

export type HospitalTabParamList = {
  HospitalDashboard: undefined;
  DonorSearchTab: undefined;
  ChatList: undefined;
  Profile: undefined;
};

export type NGOTabParamList = {
  NGODashboard: undefined;
  CampaignListing: undefined;
  ChatList: undefined;
  Profile: undefined;
};

export type AdminTabParamList = {
  AdminDashboard: undefined;
  Notifications: undefined;
  Profile: undefined;
};
