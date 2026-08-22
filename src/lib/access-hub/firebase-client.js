'use client';

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

function getFirebaseClientApp() {
  if (getApps().length) return getApp();

  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  if (Object.values(config).some((value) => !value)) {
    throw new Error('Firebase client authentication is not configured');
  }

  return initializeApp(config);
}

export function getAccessHubClientAuth() {
  return getAuth(getFirebaseClientApp());
}

