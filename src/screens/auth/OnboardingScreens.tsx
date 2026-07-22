import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { ONBOARDING_DATA } from '../../constants/app';
import { Button } from '../../components/ui';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');

type OnboardingStep = 1 | 2 | 3;
type Props = {
  step: OnboardingStep;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export const OnboardingScreen: React.FC<Props> = ({ step, navigation }) => {
  const { completeOnboarding } = useAuth();
  const data = ONBOARDING_DATA[step - 1];

  const handleNext = async () => {
    if (step === 3) {
      await completeOnboarding();
      navigation.replace('Login');
    } else if (step === 1) {
      navigation.navigate('Onboarding2');
    } else {
      navigation.navigate('Onboarding3');
    }
  };

  const handleSkip = async () => {
    await completeOnboarding();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[data.color, colors.secondary]}
        style={styles.hero}
      >
        <View style={styles.skipRow}>
          <Text style={styles.stepText}>{step} / 3</Text>
          <Text style={styles.skip} onPress={handleSkip}>
            Skip
          </Text>
        </View>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name={data.icon} size={80} color={colors.accent} />
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.dots}>
          {[1, 2, 3].map((i) => (
            <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
          ))}
        </View>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <Button
          title={step === 3 ? 'Get Started' : 'Continue'}
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </View>
  );
};

/** Individual screen exports for navigation */
export const OnboardingScreen1: React.FC<{ navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding1'> }> = ({ navigation }) => (
  <OnboardingScreen step={1} navigation={navigation as unknown as Props['navigation']} />
);
export const OnboardingScreen2: React.FC<{ navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding2'> }> = ({ navigation }) => (
  <OnboardingScreen step={2} navigation={navigation as unknown as Props['navigation']} />
);
export const OnboardingScreen3: React.FC<{ navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding3'> }> = ({ navigation }) => (
  <OnboardingScreen step={3} navigation={navigation as unknown as Props['navigation']} />
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.accent },
  hero: {
    height: width * 0.75,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xxl,
  },
  skipRow: {
    position: 'absolute',
    top: spacing.xxl,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepText: { color: 'rgba(255,255,255,0.8)', fontWeight: '600' },
  skip: { color: colors.accent, fontWeight: '600' },
  iconCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1, padding: spacing.lg, justifyContent: 'center' },
  dots: { flexDirection: 'row', gap: 8, marginBottom: spacing.lg },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  dotActive: { width: 24, backgroundColor: colors.primary },
  title: { ...typography.h1, marginBottom: spacing.md },
  description: { ...typography.bodySmall, lineHeight: 24, marginBottom: spacing.xl },
  button: { marginTop: spacing.md },
});
