import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { Header, Button, Input, ScreenContainer, Card, MenuListItem, CategoryIcon } from '../../components/ui';
import { categoryColors } from '../../constants/icons';
import { colors, typography, spacing } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { validateName, validatePhone } from '../../utils/validation';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen: React.FC<{ navigation: Nav }> = ({ navigation }) => {
  const { user, signOut } = useAuth();

  const menuItems = [
    { icon: 'account-edit-outline' as const, label: 'Edit Profile', subtitle: 'Update your personal details', screen: 'EditProfile' as const, color: categoryColors.profile },
    { icon: 'medical-bag' as const, label: 'Medical History', subtitle: 'View health records', screen: 'MedicalHistory' as const, color: categoryColors.blood },
    { icon: 'calendar-check-outline' as const, label: 'Appointments', subtitle: 'Manage scheduled visits', screen: 'AppointmentBooking' as const, color: categoryColors.appointment },
    { icon: 'newspaper-variant-outline' as const, label: 'Awareness Articles', subtitle: 'Read donation guides', screen: 'AwarenessArticles' as const, color: categoryColors.article },
    { icon: 'cog-outline' as const, label: 'Settings', subtitle: 'App preferences', screen: 'Settings' as const, color: colors.textSecondary },
    { icon: 'help-circle-outline' as const, label: 'Help & Support', subtitle: 'FAQs and contact', screen: 'HelpSupport' as const, color: categoryColors.hospital },
  ];

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: async () => { await signOut(); navigation.reset({ index: 0, routes: [{ name: 'Login' }] }); } },
    ]);
  };

  return (
    <View style={styles.flex}>
      <Header title="Profile" />
      <ScreenContainer scroll padding>
        <View style={styles.profileHeader}>
          <CategoryIcon name="account-circle-outline" color={categoryColors.profile} size="xl" variant="soft" />
          <Text style={styles.name}>{user?.fullName || 'User'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user?.role?.toUpperCase() || 'DONOR'}</Text>
          </View>
        </View>

        {menuItems.map((item) => (
          <MenuListItem
            key={item.label}
            icon={item.icon}
            iconColor={item.color}
            title={item.label}
            subtitle={item.subtitle}
            onPress={() => navigation.navigate(item.screen)}
          />
        ))}

        <Button title="Sign Out" onPress={handleLogout} variant="outline" style={styles.logout} />
      </ScreenContainer>
    </View>
  );
};

export const EditProfileScreen: React.FC<{ navigation: Nav }> = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const save = async () => {
    const e: Record<string, string> = {};
    if (validateName(fullName)) e.fullName = validateName(fullName)!;
    if (validatePhone(phone)) e.phone = validatePhone(phone)!;
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await updateUser({ fullName, phone });
    setLoading(false);
    navigation.goBack();
  };

  return (
    <View style={styles.flex}>
      <Header title="Edit Profile" showBack />
      <ScreenContainer scroll padding>
        <Input label="Full Name" value={fullName} onChangeText={setFullName} icon="account" error={errors.fullName} />
        <Input label="Phone" value={phone} onChangeText={setPhone} icon="phone" keyboardType="phone-pad" error={errors.phone} />
        <Input label="Email" value={user?.email || ''} editable={false} icon="email" />
        <Button title="Save Changes" onPress={save} loading={loading} />
      </ScreenContainer>
    </View>
  );
};

export const SettingsScreen: React.FC<{ navigation: Nav }> = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settings = [
    { key: 'notifications', label: 'Push Notifications', sub: 'Receive alerts for matches and emergencies', value: notifications, onChange: setNotifications },
    { key: 'location', label: 'Location Services', sub: 'Required for nearby finder features', value: location, onChange: setLocation },
    { key: 'dark', label: 'Dark Mode', sub: 'Coming soon', value: darkMode, onChange: setDarkMode },
  ];

  return (
    <View style={styles.flex}>
      <Header title="Settings" showBack />
      <ScreenContainer scroll padding>
        {settings.map((s) => (
          <Card key={s.key}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>{s.label}</Text>
                <Text style={styles.settingSub}>{s.sub}</Text>
              </View>
              <Switch value={s.value} onValueChange={s.onChange} trackColor={{ true: colors.primary }} />
            </View>
          </Card>
        ))}
        <Card onPress={() => navigation.navigate('ScreenCatalog')}>
          <View style={styles.settingRow}>
            <MaterialCommunityIcons name="view-grid" size={24} color={colors.secondary} />
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>All 50 Screens (Demo)</Text>
              <Text style={styles.settingSub}>College project presentation hub</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textLight} />
          </View>
        </Card>
        <Card>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingLabel}>Privacy Policy</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textLight} />
          </TouchableOpacity>
        </Card>
        <Card>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingLabel}>Terms of Service</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textLight} />
          </TouchableOpacity>
        </Card>
        <Text style={styles.version}>Version 1.0.0</Text>
      </ScreenContainer>
    </View>
  );
};

export const HelpSupportScreen: React.FC<{ navigation: Nav }> = () => {
  const faqs = [
    { q: 'How do I register as a donor?', a: 'Go to Donor Registration from your dashboard and complete the organ or blood donor form.' },
    { q: 'How does Emergency SOS work?', a: 'Tap SOS to broadcast your GPS location to nearby hospitals, NGOs, and responders instantly.' },
    { q: 'Is my medical data secure?', a: 'Yes. All data is encrypted and stored securely via Firebase with role-based access controls.' },
    { q: 'How do I contact support?', a: 'Email support@lifelink.org or call our 24/7 helpline at 1-800-LIFELINK.' },
  ];

  return (
    <View style={styles.flex}>
      <Header title="Help & Support" showBack />
      <ScreenContainer scroll padding>
        <Card style={styles.supportCard}>
          <MaterialCommunityIcons name="headset" size={32} color={colors.secondary} />
          <Text style={styles.supportTitle}>24/7 Lifeline Support</Text>
          <Text style={styles.supportPhone}>1-800-LIFELINK</Text>
          <Text style={styles.supportEmail}>support@lifelink.org</Text>
        </Card>

        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
        {faqs.map((faq, i) => (
          <Card key={i}>
            <Text style={styles.faqQ}>{faq.q}</Text>
            <Text style={styles.faqA}>{faq.a}</Text>
          </Card>
        ))}

        <Button title="Send Feedback" onPress={() => Alert.alert('Thank you!', 'Your feedback helps us save more lives.')} variant="secondary" />
      </ScreenContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  profileHeader: { alignItems: 'center', marginBottom: spacing.xl },
  name: { ...typography.h2 },
  email: { ...typography.bodySmall, marginTop: 4 },
  roleBadge: { backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: 4, borderRadius: 12, marginTop: spacing.sm },
  roleText: { ...typography.caption, color: colors.accent, fontWeight: '700' },
  logout: { marginTop: spacing.lg },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  settingInfo: { flex: 1, marginRight: spacing.md },
  settingLabel: { ...typography.body, fontWeight: '600' },
  settingSub: { ...typography.caption, marginTop: 2 },
  version: { ...typography.caption, textAlign: 'center', marginTop: spacing.xl, color: colors.textLight },
  supportCard: { alignItems: 'center', padding: spacing.xl },
  supportTitle: { ...typography.h3, marginTop: spacing.md },
  supportPhone: { ...typography.h2, color: colors.primary, marginTop: spacing.sm },
  supportEmail: { ...typography.bodySmall, color: colors.secondary, marginTop: 4 },
  faqTitle: { ...typography.h3, marginBottom: spacing.md, marginTop: spacing.md },
  faqQ: { ...typography.body, fontWeight: '600', marginBottom: spacing.sm },
  faqA: { ...typography.bodySmall, lineHeight: 20, color: colors.textSecondary },
});
