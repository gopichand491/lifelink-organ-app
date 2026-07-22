import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { firebaseConfig, IS_FIREBASE_CONFIGURED } from '../config/firebase.config';
import { UserProfile, UserRole } from '../types';

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

/** Initialize Firebase only when credentials are configured */
export const initFirebase = (): void => {
  if (!IS_FIREBASE_CONFIGURED) return;
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  }
};

export const getFirebaseAuth = (): Auth | null => auth;
export const getFirebaseDb = (): Firestore | null => db;

/** Auth service — falls back to mock when Firebase is not configured */
export const authService = {
  async signUp(
    email: string,
    password: string,
    fullName: string,
    phone: string,
    role: UserRole
  ): Promise<UserProfile> {
    if (!IS_FIREBASE_CONFIGURED || !auth || !db) {
      return mockAuth.signUp(email, password, fullName, phone, role);
    }
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: fullName });
    const profile: UserProfile = {
      id: credential.user.uid,
      email,
      fullName,
      phone,
      role,
      isVerified: false,
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'users', credential.user.uid), profile);
    return profile;
  },

  async signIn(email: string, password: string): Promise<UserProfile> {
    if (!IS_FIREBASE_CONFIGURED || !auth || !db) {
      return mockAuth.signIn(email, password);
    }
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, 'users', credential.user.uid));
    if (!snap.exists()) throw new Error('User profile not found');
    return snap.data() as UserProfile;
  },

  async resetPassword(email: string): Promise<void> {
    if (!IS_FIREBASE_CONFIGURED || !auth) {
      return mockAuth.resetPassword(email);
    }
    await sendPasswordResetEmail(auth, email);
  },

  async signOut(): Promise<void> {
    if (!IS_FIREBASE_CONFIGURED || !auth) {
      return mockAuth.signOut();
    }
    await signOut(auth);
  },

  async getCurrentUser(): Promise<UserProfile | null> {
    if (!IS_FIREBASE_CONFIGURED || !auth || !db) {
      return mockAuth.getCurrentUser();
    }
    const user = auth.currentUser;
    if (!user) return null;
    const snap = await getDoc(doc(db, 'users', user.uid));
    return snap.exists() ? (snap.data() as UserProfile) : null;
  },

  async updateProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
    if (!IS_FIREBASE_CONFIGURED || !db) {
      return mockAuth.updateProfile(userId, data);
    }
    await updateDoc(doc(db, 'users', userId), data);
  },
};

/** Firestore data service with sample fallback */
export const firestoreService = {
  async getCollection<T>(collectionName: string): Promise<T[]> {
    if (!IS_FIREBASE_CONFIGURED || !db) return [];
    const snap = await getDocs(collection(db, collectionName));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
  },

  async getDocument<T>(collectionName: string, docId: string): Promise<T | null> {
    if (!IS_FIREBASE_CONFIGURED || !db) return null;
    const snap = await getDoc(doc(db, collectionName, docId));
    return snap.exists() ? ({ id: snap.id, ...snap.data() } as T) : null;
  },

  async addDocument<T extends object>(collectionName: string, data: T): Promise<string> {
    if (!IS_FIREBASE_CONFIGURED || !db) return `mock_${Date.now()}`;
    const ref = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: Timestamp.now(),
    });
    return ref.id;
  },

  async updateDocument(
    collectionName: string,
    docId: string,
    data: object
  ): Promise<void> {
    if (!IS_FIREBASE_CONFIGURED || !db) return;
    await updateDoc(doc(db, collectionName, docId), data);
  },

  async queryByField<T>(
    collectionName: string,
    field: string,
    value: string
  ): Promise<T[]> {
    if (!IS_FIREBASE_CONFIGURED || !db) return [];
    const q = query(collection(db, collectionName), where(field, '==', value));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
  },
};

/** Mock auth for demo mode without Firebase credentials */
const mockCurrentUser: { profile: UserProfile | null } = { profile: null };

const mockAuth = {
  async signUp(
    email: string,
    _password: string,
    fullName: string,
    phone: string,
    role: UserRole
  ): Promise<UserProfile> {
    await delay(800);
    const profile: UserProfile = {
      id: `mock_${Date.now()}`,
      email,
      fullName,
      phone,
      role,
      isVerified: true,
      createdAt: new Date().toISOString(),
    };
    mockCurrentUser.profile = profile;
    return profile;
  },

  async signIn(email: string, _password: string): Promise<UserProfile> {
    await delay(800);
    const profile: UserProfile = {
      id: 'demo_user',
      email,
      fullName: 'Demo User',
      phone: '+1 555-0000',
      role: 'donor',
      isVerified: true,
      createdAt: new Date().toISOString(),
    };
    mockCurrentUser.profile = profile;
    return profile;
  },

  async resetPassword(_email: string): Promise<void> {
    await delay(600);
  },

  async signOut(): Promise<void> {
    mockCurrentUser.profile = null;
  },

  async getCurrentUser(): Promise<UserProfile | null> {
    return mockCurrentUser.profile;
  },

  async updateProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
    if (mockCurrentUser.profile?.id === userId) {
      mockCurrentUser.profile = { ...mockCurrentUser.profile, ...data };
    }
  },
};

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type { User };
