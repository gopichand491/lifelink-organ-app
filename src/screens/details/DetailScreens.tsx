import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { Header, ScreenContainer, Card, Badge, Button } from '../../components/ui';
import { colors, typography, spacing } from '../../constants/theme';
import {
  SAMPLE_DONORS,
  SAMPLE_HOSPITALS,
  SAMPLE_BLOOD_BANKS,
  SAMPLE_REQUESTS,
} from '../../data/sampleData';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const DonorDetailsScreen: React.FC<{ navigation: Nav; route: RouteProp<RootStackParamList, 'DonorDetails'> }> = ({ navigation, route }) => {
  const donor = SAMPLE_DONORS.find((d) => d.id === route.params.donorId);
  if (!donor) return null;

  return (
    <View style={styles.flex}>
      <Header title="Donor Profile" showBack />
      <ScreenContainer scroll padding>
        <View style={styles.avatar}>
          <MaterialCommunityIcons name="account" size={48} color={colors.secondary} />
        </View>
        <Text style={styles.name}>{donor.fullName}</Text>
        <View style={styles.badges}>
          <Badge label={donor.type === 'blood' ? donor.bloodGroup || 'Blood' : 'Organ Donor'} color={colors.primary} />
          <Badge label={donor.isAvailable ? 'Available' : 'Busy'} color={donor.isAvailable ? colors.success : colors.warning} />
        </View>
        <Card>
          <DetailRow icon="phone" label="Phone" value={donor.phone} />
          <DetailRow icon="map-marker" label="Location" value={`${donor.location.address}, ${donor.location.city}`} />
          <DetailRow icon="star" label="Rating" value={`${donor.rating} / 5.0`} />
          {donor.lastDonation && <DetailRow icon="calendar" label="Last Donation" value={donor.lastDonation} />}
          {donor.organTypes && <DetailRow icon="heart-pulse" label="Organs" value={donor.organTypes.join(', ')} />}
        </Card>
        <Button title="Start Chat" onPress={() => navigation.navigate('ChatConversation', { chatId: 'c1', name: donor.fullName })} />
        <Button title="Call Donor" onPress={() => Linking.openURL(`tel:${donor.phone}`)} variant="outline" style={styles.btnGap} />
        <Button title="View on Map" onPress={() => navigation.navigate('MapView', { title: donor.fullName, latitude: donor.location.latitude, longitude: donor.location.longitude })} variant="secondary" style={styles.btnGap} />
      </ScreenContainer>
    </View>
  );
};

export const PatientRequestDetailsScreen: React.FC<{ navigation: Nav; route: RouteProp<RootStackParamList, 'PatientRequestDetails'> }> = ({ route }) => {
  const req = SAMPLE_REQUESTS.find((r) => r.id === route.params.requestId);
  if (!req) return null;

  return (
    <View style={styles.flex}>
      <Header title="Request Details" showBack />
      <ScreenContainer scroll padding>
        <View style={styles.badges}>
          <Badge label={req.urgency} color={colors.error} />
          <Badge label={req.status} color={colors.secondary} />
        </View>
        <Text style={styles.name}>{req.description}</Text>
        <Card>
          <DetailRow icon="hospital-building" label="Hospital" value={req.hospitalName} />
          <DetailRow icon="map-marker" label="Location" value={req.location.address || 'N/A'} />
          <DetailRow icon="calendar" label="Created" value={new Date(req.createdAt).toLocaleString()} />
          {req.bloodGroup && <DetailRow icon="water" label="Blood Group" value={req.bloodGroup} />}
          {req.organType && <DetailRow icon="heart-pulse" label="Organ" value={req.organType} />}
        </Card>
      </ScreenContainer>
    </View>
  );
};

export const HospitalDetailsScreen: React.FC<{ navigation: Nav; route: RouteProp<RootStackParamList, 'HospitalDetails'> }> = ({ navigation, route }) => {
  const hospital = SAMPLE_HOSPITALS.find((h) => h.id === route.params.hospitalId);
  if (!hospital) return null;

  return (
    <View style={styles.flex}>
      <Header title="Hospital Details" showBack />
      <ScreenContainer scroll padding>
        <Text style={styles.name}>{hospital.name}</Text>
        <Badge label={hospital.is24Hours ? '24/7 Open' : 'Open'} color={colors.success} />
        <Card style={styles.mt}>
          <DetailRow icon="phone" label="Phone" value={hospital.phone} />
          <DetailRow icon="email" label="Email" value={hospital.email} />
          <DetailRow icon="map-marker" label="Address" value={`${hospital.location.address}, ${hospital.location.city}`} />
          <DetailRow icon="star" label="Rating" value={`${hospital.rating} ★`} />
          <Text style={styles.specLabel}>Specialties</Text>
          <View style={styles.specs}>
            {hospital.specialties.map((s) => (
              <Badge key={s} label={s} color={colors.secondary} />
            ))}
          </View>
        </Card>
        <Button title="Get Directions" onPress={() => navigation.navigate('MapView', { title: hospital.name, latitude: hospital.location.latitude, longitude: hospital.location.longitude })} />
        <Button title="Book Appointment" onPress={() => navigation.navigate('AppointmentBooking')} variant="outline" style={styles.btnGap} />
      </ScreenContainer>
    </View>
  );
};

export const BloodBankDetailsScreen: React.FC<{ navigation: Nav; route: RouteProp<RootStackParamList, 'BloodBankDetails'> }> = ({ navigation, route }) => {
  const bank = SAMPLE_BLOOD_BANKS.find((b) => b.id === route.params.bloodBankId);
  if (!bank) return null;

  return (
    <View style={styles.flex}>
      <Header title="Blood Bank" showBack />
      <ScreenContainer scroll padding>
        <Text style={styles.name}>{bank.name}</Text>
        <Badge label={bank.isOpen ? 'Open Now' : 'Closed'} color={bank.isOpen ? colors.success : colors.error} />
        <Card style={styles.mt}>
          <DetailRow icon="phone" label="Phone" value={bank.phone} />
          <DetailRow icon="map-marker" label="Address" value={bank.location.address || ''} />
          <Text style={styles.specLabel}>Blood Stock</Text>
          <View style={styles.stockGrid}>
            {Object.entries(bank.bloodStock).map(([group, units]) => (
              <View key={group} style={styles.stockItem}>
                <Text style={styles.stockGroup}>{group}</Text>
                <Text style={styles.stockUnits}>{units}</Text>
              </View>
            ))}
          </View>
        </Card>
        <Button title="Navigate" onPress={() => navigation.navigate('MapView', { title: bank.name, latitude: bank.location.latitude, longitude: bank.location.longitude })} />
      </ScreenContainer>
    </View>
  );
};

const DetailRow: React.FC<{ icon: keyof typeof MaterialCommunityIcons.glyphMap; label: string; value: string }> = ({ icon, label, value }) => (
  <View style={styles.detailRow}>
    <MaterialCommunityIcons name={icon} size={20} color={colors.secondary} />
    <View style={styles.detailInfo}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: `${colors.secondary}15`, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  name: { ...typography.h2, textAlign: 'center', marginBottom: spacing.sm },
  badges: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm, marginBottom: spacing.lg, flexWrap: 'wrap' },
  detailRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  detailInfo: { flex: 1 },
  detailLabel: { ...typography.caption, color: colors.textSecondary },
  detailValue: { ...typography.body, fontWeight: '500', marginTop: 2 },
  btnGap: { marginTop: spacing.sm },
  mt: { marginTop: spacing.md },
  specLabel: { ...typography.bodySmall, fontWeight: '600', marginTop: spacing.sm, marginBottom: spacing.sm },
  specs: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  stockGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  stockItem: { width: '22%', backgroundColor: colors.background, padding: spacing.sm, borderRadius: 8, alignItems: 'center' },
  stockGroup: { ...typography.caption, fontWeight: '700', color: colors.primary },
  stockUnits: { ...typography.bodySmall, marginTop: 2 },
});
