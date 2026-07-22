import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import { LoadingState } from '../components/ui';
import {
  DonorDashboardStackScreen,
  PatientDashboardStackScreen,
  HospitalDashboardStackScreen,
  NGODashboardStackScreen,
  AdminDashboardStackScreen,
} from '../screens/dashboard/DashboardStackScreens';
import { ScreenCatalogScreen } from '../screens/demo/ScreenCatalogScreen';
import { MainTabNavigator } from './MainTabNavigator';

// Auth & onboarding
import { SplashScreen } from '../screens/auth/SplashScreen';
import { OnboardingScreen1, OnboardingScreen2, OnboardingScreen3 } from '../screens/auth/OnboardingScreens';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignupScreen } from '../screens/auth/SignupScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { OTPVerificationScreen } from '../screens/auth/OTPVerificationScreen';
import { RoleSelectionScreen } from '../screens/auth/RoleSelectionScreen';

// Forms
import {
  DonorRegistrationScreen,
  OrganDonorFormScreen,
  BloodDonorFormScreen,
  PatientEmergencyRequestScreen,
  OrganRequestFormScreen,
  BloodRequestFormScreen,
} from '../screens/forms/FormScreens';

// Finders
import {
  DonorSearchScreen,
  OrganDonorFinderScreen,
  BloodDonorFinderScreen,
  NearbyHospitalFinderScreen,
  NearbyBloodBankFinderScreen,
  AmbulanceFinderScreen,
} from '../screens/finder/FinderScreens';

// Emergency
import { EmergencySOSScreen, LiveRequestTrackingScreen } from '../screens/emergency/EmergencyScreens';

// Details
import {
  DonorDetailsScreen,
  PatientRequestDetailsScreen,
  HospitalDetailsScreen,
  BloodBankDetailsScreen,
} from '../screens/details/DetailScreens';

// Map & Chat
import { MapViewScreen } from '../screens/map/MapViewScreen';
import { ChatListScreen, ChatConversationScreen } from '../screens/chat/ChatScreens';

// Content
import {
  NotificationsScreen,
  AwarenessArticlesScreen,
  ArticleDetailsScreen,
  OrganEligibilityCheckerScreen,
  BloodEligibilityCheckerScreen,
  MedicalHistoryScreen,
  AppointmentBookingScreen,
  AppointmentDetailsScreen,
  VolunteerRegistrationScreen,
  CampaignListingScreen,
  CampaignDetailsScreen,
} from '../screens/content/ContentScreens';

// Profile
import { ProfileScreen, EditProfileScreen, SettingsScreen, HelpSupportScreen } from '../screens/profile/ProfileScreens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingState message="Initializing LifeLink..." />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        {/* 1. Splash */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* 2-4. Onboarding */}
        <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
        <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
        <Stack.Screen name="Onboarding3" component={OnboardingScreen3} />

        {/* 5-9. Auth flow */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />

        {/* 10-14. Role dashboards (standalone + via Main tabs) */}
        <Stack.Screen name="DonorDashboard" component={DonorDashboardStackScreen} />
        <Stack.Screen name="PatientDashboard" component={PatientDashboardStackScreen} />
        <Stack.Screen name="HospitalDashboard" component={HospitalDashboardStackScreen} />
        <Stack.Screen name="NGODashboard" component={NGODashboardStackScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardStackScreen} />

        {/* College project: open any of 50 screens */}
        <Stack.Screen name="ScreenCatalog" component={ScreenCatalogScreen} />

        {/* Main app (role-based tabs) */}
        <Stack.Screen name="Main" component={MainTabNavigator} />

        {/* 15-20. Registration & request forms */}
        <Stack.Screen name="DonorRegistration" component={DonorRegistrationScreen} />
        <Stack.Screen name="OrganDonorForm" component={OrganDonorFormScreen} />
        <Stack.Screen name="BloodDonorForm" component={BloodDonorFormScreen} />
        <Stack.Screen name="PatientEmergencyRequest" component={PatientEmergencyRequestScreen} />
        <Stack.Screen name="OrganRequestForm" component={OrganRequestFormScreen} />
        <Stack.Screen name="BloodRequestForm" component={BloodRequestFormScreen} />

        {/* 21-26. Finder screens */}
        <Stack.Screen name="DonorSearch" component={DonorSearchScreen} />
        <Stack.Screen name="OrganDonorFinder" component={OrganDonorFinderScreen} />
        <Stack.Screen name="BloodDonorFinder" component={BloodDonorFinderScreen} />
        <Stack.Screen name="NearbyHospitalFinder" component={NearbyHospitalFinderScreen} />
        <Stack.Screen name="NearbyBloodBankFinder" component={NearbyBloodBankFinderScreen} />
        <Stack.Screen name="AmbulanceFinder" component={AmbulanceFinderScreen} />

        {/* 27-28. Emergency */}
        <Stack.Screen name="EmergencySOS" component={EmergencySOSScreen} />
        <Stack.Screen name="LiveRequestTracking" component={LiveRequestTrackingScreen} />

        {/* 29-32. Detail screens */}
        <Stack.Screen name="DonorDetails" component={DonorDetailsScreen} />
        <Stack.Screen name="PatientRequestDetails" component={PatientRequestDetailsScreen} />
        <Stack.Screen name="HospitalDetails" component={HospitalDetailsScreen} />
        <Stack.Screen name="BloodBankDetails" component={BloodBankDetailsScreen} />

        {/* 33-35. Map & chat */}
        <Stack.Screen name="MapView" component={MapViewScreen} />
        <Stack.Screen name="ChatList" component={ChatListScreen} />
        <Stack.Screen name="ChatConversation" component={ChatConversationScreen} />

        {/* 36-46. Content & campaigns */}
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="AwarenessArticles" component={AwarenessArticlesScreen} />
        <Stack.Screen name="ArticleDetails" component={ArticleDetailsScreen} />
        <Stack.Screen name="OrganEligibilityChecker" component={OrganEligibilityCheckerScreen} />
        <Stack.Screen name="BloodEligibilityChecker" component={BloodEligibilityCheckerScreen} />
        <Stack.Screen name="MedicalHistory" component={MedicalHistoryScreen} />
        <Stack.Screen name="AppointmentBooking" component={AppointmentBookingScreen} />
        <Stack.Screen name="AppointmentDetails" component={AppointmentDetailsScreen} />
        <Stack.Screen name="VolunteerRegistration" component={VolunteerRegistrationScreen} />
        <Stack.Screen name="CampaignListing" component={CampaignListingScreen} />
        <Stack.Screen name="CampaignDetails" component={CampaignDetailsScreen} />

        {/* 47-50. Profile & settings */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
