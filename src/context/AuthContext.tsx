import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, UserRole } from '../types';
import { authService, initFirebase } from '../services/firebase';
import { STORAGE_KEYS } from '../constants/app';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  onboardingComplete: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    phone: string,
    role: UserRole
  ) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: Partial<UserProfile>) => Promise<void>;
  setRole: (role: UserRole) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    initFirebase();
    loadStoredState();
  }, []);

  const loadStoredState = async () => {
    try {
      const [onboarding, storedUser] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE),
        AsyncStorage.getItem('@lifelink_user'),
      ]);
      setOnboardingComplete(onboarding === 'true');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        const current = await authService.getCurrentUser();
        if (current) setUser(current);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const persistUser = async (profile: UserProfile | null) => {
    if (profile) {
      await AsyncStorage.setItem('@lifelink_user', JSON.stringify(profile));
    } else {
      await AsyncStorage.removeItem('@lifelink_user');
    }
    setUser(profile);
  };

  const signIn = useCallback(async (email: string, password: string) => {
    const profile = await authService.signIn(email, password);
    await persistUser(profile);
  }, []);

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      fullName: string,
      phone: string,
      role: UserRole
    ) => {
      const profile = await authService.signUp(email, password, fullName, phone, role);
      await persistUser(profile);
    },
    []
  );

  const signOut = useCallback(async () => {
    await authService.signOut();
    await persistUser(null);
  }, []);

  const updateUser = useCallback(
    async (data: Partial<UserProfile>) => {
      if (!user) return;
      await authService.updateProfile(user.id, data);
      await persistUser({ ...user, ...data });
    },
    [user]
  );

  const setRole = useCallback(
    async (role: UserRole) => {
      if (user) {
        await updateUser({ role });
      }
      await AsyncStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
    },
    [user, updateUser]
  );

  const completeOnboarding = useCallback(async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, 'true');
    setOnboardingComplete(true);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    await authService.resetPassword(email);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        onboardingComplete,
        signIn,
        signUp,
        signOut,
        updateUser,
        setRole,
        completeOnboarding,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
