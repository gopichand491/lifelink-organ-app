/**
 * Firebase configuration placeholders.
 * Replace with your Firebase project credentials from:
 * https://console.firebase.google.com/
 *
 * 1. Create a new Firebase project
 * 2. Enable Authentication (Email/Password)
 * 3. Create Firestore database
 * 4. Copy web app config below
 */
export const firebaseConfig = {
  apiKey: 'YOUR_FIREBASE_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_FIREBASE_APP_ID',
};

/** Set to true once Firebase credentials are configured */
export const IS_FIREBASE_CONFIGURED =
  firebaseConfig.apiKey !== 'YOUR_FIREBASE_API_KEY';

/** Google Maps API key placeholder — set in app.json for iOS/Android */
export const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';
