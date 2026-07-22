# Organ Donation & Lifesaving Finder

A production-ready **React Native Expo** healthcare mobile application that connects organ donors, blood donors, patients, hospitals, NGOs, volunteers, and admins during emergency and lifesaving situations.

![Expo](https://img.shields.io/badge/Expo-52-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.76-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6)

## Features

- **50 fully designed screens** with medical red/white/blue UI theme
- **Role-based navigation** for Donor, Patient, Hospital, NGO, Admin, and Volunteer
- **Firebase Authentication** & **Firestore** integration (with demo/mock fallback)
- **Google Maps** for nearby donors, hospitals, blood banks, ambulances, and SOS tracking
- Form validation, loading states, empty states, and error handling
- Reusable UI component library
- Sample data for presentation and testing

## All 50 Screens

| # | Screen | # | Screen |
|---|--------|---|--------|
| 1 | Splash | 26 | Ambulance Finder |
| 2-4 | Onboarding 1-3 | 27 | Emergency SOS |
| 5 | Login | 28 | Live Request Tracking |
| 6 | Signup | 29 | Donor Details |
| 7 | Forgot Password | 30 | Patient Request Details |
| 8 | OTP Verification | 31 | Hospital Details |
| 9 | Role Selection | 32 | Blood Bank Details |
| 10 | Donor Dashboard | 33 | Map View |
| 11 | Patient Dashboard | 34 | Chat List |
| 12 | Hospital Dashboard | 35 | Chat Conversation |
| 13 | NGO Dashboard | 36 | Notifications |
| 14 | Admin Dashboard | 37 | Awareness Articles |
| 15 | Donor Registration | 38 | Article Details |
| 16 | Organ Donor Form | 39 | Organ Eligibility Checker |
| 17 | Blood Donor Form | 40 | Blood Eligibility Checker |
| 18 | Patient Emergency Request | 41 | Medical History |
| 19 | Organ Request Form | 42 | Appointment Booking |
| 20 | Blood Request Form | 43 | Appointment Details |
| 21 | Donor Search | 44 | Volunteer Registration |
| 22 | Organ Donor Finder | 45 | Campaign Listing |
| 23 | Blood Donor Finder | 46 | Campaign Details |
| 24 | Nearby Hospital Finder | 47 | Profile |
| 25 | Nearby Blood Bank Finder | 48 | Edit Profile |
| | | 49 | Settings |
| | | 50 | Help & Support |

## Project Structure

```
├── App.tsx                          # App entry point
├── app.json                         # Expo configuration
├── assets/                          # Icons & splash images
└── src/
    ├── components/ui/               # Reusable UI (Button, Card, Input, etc.)
    ├── config/firebase.config.ts    # Firebase & Maps API placeholders
    ├── constants/                   # Theme, app constants
    ├── context/AuthContext.tsx      # Authentication state
    ├── data/sampleData.ts           # Dummy sample data
    ├── navigation/                  # Root & role-based tab navigators
    ├── screens/                     # All 50 screens organized by feature
    ├── services/firebase.ts         # Firebase auth & Firestore services
    ├── types/                       # TypeScript interfaces
    └── utils/validation.ts          # Form validation helpers
```

## Android App — College Final Year Project

This is a **native Android app** built with React Native Expo. Use it for your final-year presentation.

### Run on Android phone (easiest for demo)

1. Install **Expo Go** from Google Play Store on your Android phone
2. On your PC:
   ```bash
   cd "c:\life link organ"
   npm install
   npx expo start
   ```
3. Scan the QR code with Expo Go — the app opens on your phone

Or press **`a`** if Android Studio emulator is installed.

### Show all 50 screens during viva

On the **Login** screen, tap **"View All 50 Screens"** — this opens the **Screen Catalog** where you can tap any screen (#1–#50) to open it instantly for your examiner.

You can also find it in **Settings → All 50 Screens (Demo)**.

### Quick demo login

Tap **"Quick Demo Login"** on the Login screen to enter the app as a demo user without typing credentials.

### Build APK file (install without Expo Go)

For offline demo on college lab PC or phone without Expo Go:

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

This creates an **APK** you can install directly on Android. See `eas.json` for build profiles.

Alternative with Android Studio installed locally:

```bash
npx expo run:android
```

### Project details for report

| Item | Value |
|------|-------|
| Platform | Android (React Native Expo) |
| Language | TypeScript |
| Total Screens | **50** |
| Backend | Firebase Auth + Firestore |
| Maps | Google Maps |
| UI Theme | Medical Red / White / Blue |

Screen list is defined in `src/data/screenCatalog.ts` for documentation.

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- [Expo Go](https://expo.dev/go) app on your phone (for mobile testing)
- Optional: Android Studio / Xcode for emulators

### Installation & Run

```bash
# 1. Navigate to project folder
cd "c:\life link organ"

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start
```

Then:
- Press **`a`** for Android emulator
- Press **`i`** for iOS simulator (macOS only)
- Scan the **QR code** with Expo Go on your phone

### Demo Mode (No Firebase Required)

The app runs in **demo mode** out of the box. Use any email/password on the login screen — mock authentication accepts all valid credentials.

Example: `demo@lifelink.com` / `Demo1234`

## Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** → Email/Password
3. Create a **Firestore** database
4. Copy your web app config into `src/config/firebase.config.ts`:

```typescript
export const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};
```

5. Firestore collections used: `users`, `donors`, `patients`, `hospitals`, `requests`, `chats`, `notifications`, `campaigns`, `articles`

## Google Maps Setup

1. Get an API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable **Maps SDK for Android** and **Maps SDK for iOS**
3. Add keys in `app.json`:

```json
"ios": {
  "config": { "googleMapsApiKey": "YOUR_IOS_KEY" }
},
"android": {
  "config": { "googleMaps": { "apiKey": "YOUR_ANDROID_KEY" } }
}
```

4. Update `GOOGLE_MAPS_API_KEY` in `src/config/firebase.config.ts`

> **Note:** Maps work on physical devices and emulators. On web, map features may be limited.

## User Roles

After signup, users select a role on the **Role Selection** screen:

| Role | Dashboard Features |
|------|-------------------|
| **Donor** | Registration, eligibility checks, donor search |
| **Patient** | Emergency SOS, blood/organ requests, live tracking |
| **Hospital** | Request management, donor finder, appointments |
| **NGO** | Campaigns, volunteer registration, awareness |
| **Admin** | Platform stats, notifications, content management |
| **Volunteer** | Uses donor dashboard with volunteer registration |

Change role anytime via **Profile → Settings** or re-register.

## Tech Stack

- **React Native** 0.76 + **Expo** 52
- **TypeScript**
- **React Navigation** 7 (Stack + Bottom Tabs)
- **Firebase** 11 (Auth + Firestore)
- **React Native Maps**
- **Expo Location** (SOS & geolocation)
- **Expo Linear Gradient**
- **AsyncStorage** (session persistence)

## Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS (macOS)
npm run web        # Run in browser
```

## Presentation Tips

1. Start at **Splash → Onboarding → Login**
2. Sign up and select **Patient** role to demo SOS and request tracking
3. Switch to **Donor** role to show registration and eligibility checker
4. Open **Map View** to show nearby markers (donors, hospitals, blood banks)
5. Navigate **Chat** and **Notifications** for real-time communication demo

## License

MIT — Built for educational and presentation purposes. Configure Firebase and Maps before production deployment.

---

**Organ Donation & Lifesaving Finder** — *Connecting donors, patients & hospitals to save lives.*
#   l i f e - l i n k - o r g a n - a p p  
 