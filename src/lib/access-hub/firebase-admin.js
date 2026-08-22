import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export class FirebaseConfigurationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FirebaseConfigurationError';
  }
}

function getFirebaseAdminApp() {
  if (getApps().length) return getApps()[0];

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const hasExplicitCredentials = Boolean(projectId && clientEmail && privateKey);

  if (!projectId || (!hasExplicitCredentials && !process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
    throw new FirebaseConfigurationError('Firebase Admin credentials are not configured');
  }

  const credential = hasExplicitCredentials
    ? cert({ projectId, clientEmail, privateKey })
    : applicationDefault();

  return initializeApp({ credential, projectId });
}

export function getAccessHubFirestore() {
  const app = getFirebaseAdminApp();
  const databaseId = process.env.FIREBASE_DATABASE_ID;
  return databaseId ? getFirestore(app, databaseId) : getFirestore(app);
}

export function getAccessHubAuth() {
  return getAuth(getFirebaseAdminApp());
}
