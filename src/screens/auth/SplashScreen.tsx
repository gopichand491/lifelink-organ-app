import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { APP_NAME } from '../../constants/app';
import { colors, typography, spacing } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { isLoading, isAuthenticated, onboardingComplete } = useAuth();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const timer = setTimeout(() => {
      if (!onboardingComplete) {
        navigation.replace('Onboarding1');
      } else if (!isAuthenticated) {
        navigation.replace('Login');
      } else {
        navigation.replace('Main');
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated, onboardingComplete, navigation]);

  return (
    <LinearGradient colors={[colors.primary, colors.secondary]} style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons name="heart-pulse" size={64} color={colors.accent} />
        </View>
        <Text style={styles.title}>{APP_NAME}</Text>
        <Text style={styles.tagline}>Saving Lives Together</Text>
        <View style={styles.loader}>
          <MaterialCommunityIcons name="loading" size={24} color="rgba(255,255,255,0.7)" />
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { alignItems: 'center' },
  iconWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: { ...typography.h1, color: colors.accent, textAlign: 'center', marginBottom: spacing.sm },
  tagline: { ...typography.body, color: 'rgba(255,255,255,0.85)' },
  loader: { marginTop: spacing.xxl },
});
