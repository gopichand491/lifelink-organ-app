/** API configuration — set EXPO_PUBLIC_API_URL when deploying */
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

export const APK_DOWNLOAD_URL =
  process.env.EXPO_PUBLIC_APK_URL || 'https://expo.dev';
