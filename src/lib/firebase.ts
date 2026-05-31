// ============================================================
// RoboKid Firebase Configuration
// Firestore: Translation cache, learning model, user progress
// ============================================================

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDDZludrLe0owCB3jFvPWSp8b3ZBx5hBmQ',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'robokid-439f3.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'robokid-439f3',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'robokid-439f3.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID || '674930251746',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:674930251746:web:8e3d0a2fcf8813a402928d',
};

// Initialize Firebase (singleton)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { app, db };
