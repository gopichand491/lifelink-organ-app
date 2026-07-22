import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { Button, Input, ScreenContainer } from '../../components/ui';
import { colors, typography, spacing } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePassword } from '../../utils/validation';
import { APP_NAME } from '../../constants/app';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    if (emailErr || passErr) {
      setErrors({ email: emailErr || undefined, password: passErr || undefined });
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await signIn(email, password);
      navigation.replace('Main');
    } catch {
      setErrors({ general: 'Invalid email or password. Try demo@lifelink.com / Demo1234' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <LinearGradient colors={[colors.primary, colors.secondaryDark]} style={styles.header}>
        <MaterialCommunityIcons name="heart-pulse" size={48} color={colors.accent} />
        <Text style={styles.appName}>{APP_NAME}</Text>
        <Text style={styles.subtitle}>Welcome back</Text>
      </LinearGradient>

      <ScreenContainer scroll padding>
        {errors.general && (
          <View style={styles.errorBanner}>
            <MaterialCommunityIcons name="alert-circle" size={20} color={colors.error} />
            <Text style={styles.errorBannerText}>{errors.general}</Text>
          </View>
        )}

        <Input
          label="Email Address"
          icon="email-outline"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />
        <Input
          label="Password"
          icon="lock-outline"
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          isPassword
          error={errors.password}
        />

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <Button title="Sign In" onPress={handleLogin} loading={loading} />

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.or}>OR</Text>
          <View style={styles.line} />
        </View>

        <Button
          title="Create Account"
          onPress={() => navigation.navigate('Signup')}
          variant="outline"
        />
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingTop: spacing.xxl + 20,
    paddingBottom: spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  appName: { ...typography.h2, color: colors.accent, marginTop: spacing.sm, textAlign: 'center' },
  subtitle: { ...typography.body, color: 'rgba(255,255,255,0.85)', marginTop: spacing.xs },
  forgot: { ...typography.bodySmall, color: colors.secondary, textAlign: 'right', marginBottom: spacing.lg, fontWeight: '600' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.lg },
  line: { flex: 1, height: 1, backgroundColor: colors.border },
  or: { ...typography.caption, marginHorizontal: spacing.md, color: colors.textSecondary },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.error}15`,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  errorBannerText: { ...typography.bodySmall, color: colors.error, flex: 1 },
});
