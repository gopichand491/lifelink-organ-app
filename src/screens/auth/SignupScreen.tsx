import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, UserRole } from '../../types';
import { Header, Button, Input, ScreenContainer } from '../../components/ui';
import { colors, typography, spacing } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePassword, validatePhone, validateName } from '../../utils/validation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Signup'>;
};

export const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const newErrors: Record<string, string> = {};
    const nameErr = validateName(fullName);
    const emailErr = validateEmail(email);
    const phoneErr = validatePhone(phone);
    const passErr = validatePassword(password);
    if (nameErr) newErrors.fullName = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (phoneErr) newErrors.phone = phoneErr;
    if (passErr) newErrors.password = passErr;
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await signUp(email, password, fullName, phone, 'donor' as UserRole);
      navigation.navigate('RoleSelection');
    } catch {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header title="Create Account" showBack />
      <ScreenContainer scroll padding>
        <Text style={styles.intro}>Join our lifesaving community today</Text>
        {errors.general && <Text style={styles.generalError}>{errors.general}</Text>}

        <Input label="Full Name" icon="account-outline" value={fullName} onChangeText={setFullName} placeholder="John Doe" error={errors.fullName} />
        <Input label="Email" icon="email-outline" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" error={errors.email} />
        <Input label="Phone" icon="phone-outline" value={phone} onChangeText={setPhone} placeholder="+1 555-0000" keyboardType="phone-pad" error={errors.phone} />
        <Input label="Password" icon="lock-outline" value={password} onChangeText={setPassword} isPassword placeholder="Min 8 characters" error={errors.password} />
        <Input label="Confirm Password" icon="lock-check-outline" value={confirmPassword} onChangeText={setConfirmPassword} isPassword error={errors.confirmPassword} />

        <Button title="Sign Up" onPress={handleSignup} loading={loading} style={styles.btn} />
        <Text style={styles.terms}>By signing up, you agree to our Terms of Service and Privacy Policy</Text>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  intro: { ...typography.bodySmall, marginBottom: spacing.lg },
  generalError: { ...typography.bodySmall, color: colors.error, marginBottom: spacing.md },
  btn: { marginTop: spacing.sm },
  terms: { ...typography.caption, textAlign: 'center', marginTop: spacing.lg, color: colors.textLight },
});
