import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { Header, Button, Input, ScreenContainer } from '../../components/ui';
import { colors, typography, spacing } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { validateEmail } from '../../utils/validation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;
};

export const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    const emailErr = validateEmail(email);
    if (emailErr) {
      setError(emailErr);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
      navigation.navigate('OTPVerification', { email });
    } catch {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.flex}>
      <Header title="Forgot Password" showBack />
      <ScreenContainer scroll padding>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons name="lock-reset" size={48} color={colors.secondary} />
        </View>
        <Text style={styles.title}>Reset your password</Text>
        <Text style={styles.desc}>
          Enter your registered email. We will send a verification code to reset your password.
        </Text>

        <Input
          label="Email Address"
          icon="email-outline"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          error={error || undefined}
        />

        {sent && (
          <View style={styles.success}>
            <MaterialCommunityIcons name="check-circle" size={20} color={colors.success} />
            <Text style={styles.successText}>Reset link sent successfully!</Text>
          </View>
        )}

        <Button title="Send Reset Code" onPress={handleReset} loading={loading} />
      </ScreenContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: `${colors.secondary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  title: { ...typography.h2, textAlign: 'center', marginBottom: spacing.sm },
  desc: { ...typography.bodySmall, textAlign: 'center', marginBottom: spacing.xl, lineHeight: 22 },
  success: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: `${colors.success}15`,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  successText: { ...typography.bodySmall, color: colors.success },
});
