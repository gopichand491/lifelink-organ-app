import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { Header, Button, Input, ScreenContainer, Card } from '../../components/ui';
import { colors, typography, spacing } from '../../constants/theme';
import { BLOOD_GROUPS } from '../../constants/app';
import { validateRequired, validatePhone } from '../../utils/validation';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList> };

/** Shared form screen factory pattern */
const FormScreen: React.FC<{
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onSubmit: () => void;
  loading: boolean;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}> = ({ title, subtitle, children, onSubmit, loading, navigation }) => (
  <View style={styles.flex}>
    <Header title={title} showBack />
    <ScreenContainer scroll padding>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {children}
      <Button title="Submit" onPress={onSubmit} loading={loading} style={styles.submit} />
    </ScreenContainer>
  </View>
);

export const DonorRegistrationScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const e: Record<string, string> = {};
    if (validateRequired(name, 'Name')) e.name = validateRequired(name, 'Name')!;
    if (validatePhone(phone)) e.phone = validatePhone(phone)!;
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    navigation.navigate('OrganDonorForm');
  };

  return (
    <FormScreen title="Donor Registration" subtitle="Complete your donor profile" onSubmit={submit} loading={loading} navigation={navigation}>
      <Input label="Full Name" value={name} onChangeText={setName} icon="account" error={errors.name} />
      <Input label="Phone" value={phone} onChangeText={setPhone} icon="phone" keyboardType="phone-pad" error={errors.phone} />
      <Text style={styles.label}>Blood Group</Text>
      <View style={styles.chips}>
        {BLOOD_GROUPS.map((bg) => (
          <TouchableOpacity key={bg} style={[styles.chip, bloodGroup === bg && styles.chipActive]} onPress={() => setBloodGroup(bg)}>
            <Text style={[styles.chipText, bloodGroup === bg && styles.chipTextActive]}>{bg}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </FormScreen>
  );
};

export const OrganDonorFormScreen: React.FC<Props> = ({ navigation }) => {
  const [organs, setOrgans] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const ORGANS = ['Kidney', 'Liver', 'Heart', 'Lungs', 'Pancreas', 'Cornea'];

  const toggle = (o: string) => setOrgans((prev) => prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]);

  const submit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    navigation.goBack();
  };

  return (
    <FormScreen title="Organ Donor Form" subtitle="Select organs you wish to donate" onSubmit={submit} loading={loading} navigation={navigation}>
      <View style={styles.chips}>
        {ORGANS.map((o) => (
          <TouchableOpacity key={o} style={[styles.chip, organs.includes(o) && styles.chipActive]} onPress={() => toggle(o)}>
            <Text style={[styles.chipText, organs.includes(o) && styles.chipTextActive]}>{o}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Card>
        <Text style={styles.note}>By submitting, you confirm understanding of organ donation procedures and legal requirements in your region.</Text>
      </Card>
    </FormScreen>
  );
};

export const BloodDonorFormScreen: React.FC<Props> = ({ navigation }) => {
  const [lastDonation, setLastDonation] = useState('');
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    navigation.goBack();
  };

  return (
    <FormScreen title="Blood Donor Form" subtitle="Provide donation history and health info" onSubmit={submit} loading={loading} navigation={navigation}>
      <Input label="Last Donation Date" value={lastDonation} onChangeText={setLastDonation} placeholder="YYYY-MM-DD" icon="calendar" />
      <Input label="Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" icon="scale-bathroom" />
      <Input label="Medical Conditions (if any)" placeholder="None" icon="medical-bag" multiline />
    </FormScreen>
  );
};

export const PatientEmergencyRequestScreen: React.FC<Props> = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!description.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    navigation.navigate('LiveRequestTracking', { requestId: 'r_new' });
  };

  return (
    <FormScreen title="Emergency Request" subtitle="Describe the emergency — responders will be alerted immediately" onSubmit={submit} loading={loading} navigation={navigation}>
      <Input label="Emergency Description" value={description} onChangeText={setDescription} multiline placeholder="Patient needs urgent..." icon="alert" />
      <Input label="Hospital / Location" placeholder="Nearest hospital name" icon="map-marker" />
    </FormScreen>
  );
};

export const OrganRequestFormScreen: React.FC<Props> = ({ navigation }) => {
  const [organ, setOrgan] = useState('');
  const [loading, setLoading] = useState(false);
  const ORGANS = ['Kidney', 'Liver', 'Heart', 'Lungs'];

  const submit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    navigation.navigate('LiveRequestTracking', { requestId: 'r2' });
  };

  return (
    <FormScreen title="Organ Request" subtitle="Submit an organ transplant request" onSubmit={submit} loading={loading} navigation={navigation}>
      <Text style={styles.label}>Organ Type</Text>
      <View style={styles.chips}>
        {ORGANS.map((o) => (
          <TouchableOpacity key={o} style={[styles.chip, organ === o && styles.chipActive]} onPress={() => setOrgan(o)}>
            <Text style={[styles.chipText, organ === o && styles.chipTextActive]}>{o}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Input label="Patient Details" multiline icon="account-injury" />
      <Input label="Hospital Name" icon="hospital-building" />
    </FormScreen>
  );
};

export const BloodRequestFormScreen: React.FC<Props> = ({ navigation }) => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [units, setUnits] = useState('1');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    navigation.navigate('LiveRequestTracking', { requestId: 'r1' });
  };

  return (
    <FormScreen title="Blood Request" subtitle="Request blood units from nearby donors" onSubmit={submit} loading={loading} navigation={navigation}>
      <Text style={styles.label}>Blood Group Required</Text>
      <View style={styles.chips}>
        {BLOOD_GROUPS.map((bg) => (
          <TouchableOpacity key={bg} style={[styles.chip, bloodGroup === bg && styles.chipActive]} onPress={() => setBloodGroup(bg)}>
            <Text style={[styles.chipText, bloodGroup === bg && styles.chipTextActive]}>{bg}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Input label="Units Required" value={units} onChangeText={setUnits} keyboardType="numeric" icon="blood-bag" />
      <Input label="Hospital" icon="hospital-building" />
    </FormScreen>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  subtitle: { ...typography.bodySmall, marginBottom: spacing.lg },
  submit: { marginTop: spacing.md },
  label: { ...typography.bodySmall, fontWeight: '600', marginBottom: spacing.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  chip: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { ...typography.bodySmall, fontWeight: '600' },
  chipTextActive: { color: colors.accent },
  note: { ...typography.caption, lineHeight: 18, color: colors.textSecondary },
});
