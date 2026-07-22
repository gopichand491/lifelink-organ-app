import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { Header, Button, ScreenContainer } from '../../components/ui';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import { validateOTP } from '../../utils/validation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OTPVerification'>;
  route: RouteProp<RootStackParamList, 'OTPVerification'>;
};

export const OTPVerificationScreen: React.FC<Props> = ({ navigation, route }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join('');
    const err = validateOTP(code);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setLoading(true);
    // Demo: accept 123456 or any 6 digits after delay
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.flex}>
      <Header title="Verify OTP" showBack />
      <ScreenContainer scroll padding>
        <Text style={styles.title}>Enter verification code</Text>
        <Text style={styles.desc}>
          We sent a 6-digit code to{'\n'}
          <Text style={styles.email}>{email}</Text>
        </Text>

        <View style={styles.otpRow}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref) => { inputs.current[i] = ref; }}
              style={[styles.otpInput, error && styles.otpError]}
              value={digit}
              onChangeText={(v) => handleChange(v, i)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>
        {error && <Text style={styles.error}>{error}</Text>}

        <Button title="Verify & Continue" onPress={handleVerify} loading={loading} />

        <TouchableOpacity disabled={timer > 0} onPress={() => setTimer(60)}>
          <Text style={[styles.resend, timer > 0 && styles.resendDisabled]}>
            {timer > 0 ? `Resend code in ${timer}s` : 'Resend Code'}
          </Text>
        </TouchableOpacity>
      </ScreenContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  title: { ...typography.h2, textAlign: 'center', marginBottom: spacing.sm },
  desc: { ...typography.bodySmall, textAlign: 'center', marginBottom: spacing.xl, lineHeight: 22 },
  email: { fontWeight: '700', color: colors.secondary },
  otpRow: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm, marginBottom: spacing.md },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    backgroundColor: colors.surface,
  },
  otpError: { borderColor: colors.error },
  error: { ...typography.caption, color: colors.error, textAlign: 'center', marginBottom: spacing.md },
  resend: { ...typography.bodySmall, color: colors.secondary, textAlign: 'center', marginTop: spacing.lg, fontWeight: '600' },
  resendDisabled: { color: colors.textLight },
});
