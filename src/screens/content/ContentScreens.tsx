import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { Header, Card, Badge, EmptyState, Button, ScreenContainer } from '../../components/ui';
import { colors, typography, spacing } from '../../constants/theme';
import { SAMPLE_NOTIFICATIONS, SAMPLE_ARTICLES, SAMPLE_CAMPAIGNS, SAMPLE_APPOINTMENTS, SAMPLE_MEDICAL_HISTORY } from '../../data/sampleData';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const NotificationsScreen: React.FC<{ navigation: Nav }> = () => {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const iconMap = { request: 'clipboard-alert', match: 'hand-heart', campaign: 'bullhorn', system: 'cog' } as const;

  return (
    <View style={styles.flex}>
      <Header title="Notifications" showBack />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState title="All caught up" message="No notifications yet" icon="bell-off-outline" />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => markRead(item.id)}>
            <Card style={!item.read ? styles.unread : undefined}>
              <View style={styles.notifRow}>
                <View style={[styles.notifIcon, { backgroundColor: `${colors.primary}15` }]}>
                  <MaterialCommunityIcons name={iconMap[item.type]} size={22} color={colors.primary} />
                </View>
                <View style={styles.notifInfo}>
                  <Text style={styles.notifTitle}>{item.title}</Text>
                  <Text style={styles.notifBody}>{item.body}</Text>
                  <Text style={styles.notifTime}>{new Date(item.createdAt).toLocaleString()}</Text>
                </View>
                {!item.read && <View style={styles.dot} />}
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export const AwarenessArticlesScreen: React.FC<{ navigation: Nav }> = ({ navigation }) => (
  <View style={styles.flex}>
    <Header title="Awareness Articles" showBack />
    <FlatList
      data={SAMPLE_ARTICLES}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Card onPress={() => navigation.navigate('ArticleDetails', { articleId: item.id })}>
          <Badge label={item.category} color={colors.secondary} />
          <Text style={styles.articleTitle}>{item.title}</Text>
          <Text style={styles.articleSummary} numberOfLines={2}>{item.summary}</Text>
          <Text style={styles.articleMeta}>{item.author} • {item.readTime} min read</Text>
        </Card>
      )}
    />
  </View>
);

export const ArticleDetailsScreen: React.FC<{ navigation: Nav; route: RouteProp<RootStackParamList, 'ArticleDetails'> }> = ({ route }) => {
  const article = SAMPLE_ARTICLES.find((a) => a.id === route.params.articleId);
  if (!article) return null;

  return (
    <View style={styles.flex}>
      <Header title="Article" showBack />
      <ScreenContainer scroll padding>
        <Badge label={article.category} color={colors.primary} />
        <Text style={styles.detailTitle}>{article.title}</Text>
        <Text style={styles.detailMeta}>{article.author} • {article.publishedAt} • {article.readTime} min</Text>
        <Text style={styles.detailContent}>{article.content}</Text>
      </ScreenContainer>
    </View>
  );
};

/** Eligibility checker shared logic */
const EligibilityChecker: React.FC<{
  title: string;
  questions: { id: string; text: string; fail?: boolean }[];
  passMessage: string;
  failMessage: string;
}> = ({ title, questions, passMessage, failMessage }) => {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<'pass' | 'fail' | null>(null);

  const toggle = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResult(null);
  };

  const check = () => {
    const failed = questions.some((q) => {
      if (q.fail && answers[q.id] === true) return true;
      if (!q.fail && answers[q.id] === false) return true;
      return false;
    });
    setResult(failed ? 'fail' : 'pass');
  };

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  return (
    <View style={styles.flex}>
      <Header title={title} showBack />
      <ScreenContainer scroll padding>
        {questions.map((q) => (
          <Card key={q.id}>
            <Text style={styles.question}>{q.text}</Text>
            <View style={styles.yesNo}>
              <Button title="Yes" onPress={() => toggle(q.id, true)} variant={answers[q.id] === true ? 'primary' : 'outline'} fullWidth={false} style={styles.ynBtn} />
              <Button title="No" onPress={() => toggle(q.id, false)} variant={answers[q.id] === false ? 'secondary' : 'outline'} fullWidth={false} style={styles.ynBtn} />
            </View>
          </Card>
        ))}
        <Button title="Check Eligibility" onPress={check} disabled={!allAnswered} />
        {result && (
          <Card style={result === 'pass' ? styles.passCard : styles.failCard}>
            <MaterialCommunityIcons name={result === 'pass' ? 'check-circle' : 'close-circle'} size={32} color={result === 'pass' ? colors.success : colors.error} />
            <Text style={styles.resultText}>{result === 'pass' ? passMessage : failMessage}</Text>
          </Card>
        )}
      </ScreenContainer>
    </View>
  );
};

export const OrganEligibilityCheckerScreen: React.FC<{ navigation: Nav }> = () => (
  <EligibilityChecker
    title="Organ Donation Eligibility"
    passMessage="You appear eligible for organ donation registration. Please consult a medical professional for final confirmation."
    failMessage="You may not be eligible at this time. Consult your doctor for personalized guidance."
    questions={[
      { id: 'q1', text: 'Are you 18 years or older?', fail: false },
      { id: 'q2', text: 'Do you have any active cancer diagnosis?', fail: true },
      { id: 'q3', text: 'Are you free from active infections?', fail: false },
      { id: 'q4', text: 'Do you have uncontrolled HIV/AIDS?', fail: true },
      { id: 'q5', text: 'Are you willing to register as an organ donor?', fail: false },
    ]}
  />
);

export const BloodEligibilityCheckerScreen: React.FC<{ navigation: Nav }> = () => (
  <EligibilityChecker
    title="Blood Donation Eligibility"
    passMessage="You appear eligible to donate blood. Ensure you are well-rested and hydrated before donating."
    failMessage="You may not be eligible to donate blood today. Wait and consult staff at the donation center."
    questions={[
      { id: 'b1', text: 'Are you between 18 and 65 years old?', fail: false },
      { id: 'b2', text: 'Do you weigh at least 50 kg (110 lbs)?', fail: false },
      { id: 'b3', text: 'Have you donated blood in the last 56 days?', fail: true },
      { id: 'b4', text: 'Are you currently feeling healthy and well?', fail: false },
      { id: 'b5', text: 'Have you had a tattoo in the last 3 months?', fail: true },
    ]}
  />
);

export const MedicalHistoryScreen: React.FC<{ navigation: Nav }> = () => (
  <View style={styles.flex}>
    <Header title="Medical History" showBack />
    <FlatList
      data={SAMPLE_MEDICAL_HISTORY}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<EmptyState title="No records" message="Add your medical history for better matching" icon="medical-bag" actionLabel="Add Record" onAction={() => {}} />}
      renderItem={({ item }) => (
        <Card>
          <Text style={styles.recordTitle}>{item.condition}</Text>
          <Text style={styles.recordDate}>Diagnosed: {item.diagnosedDate}</Text>
          <Text style={styles.recordMeds}>Medications: {item.medications.join(', ')}</Text>
          <Text style={styles.recordNotes}>{item.notes}</Text>
        </Card>
      )}
    />
  </View>
);

export const AppointmentBookingScreen: React.FC<{ navigation: Nav }> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const book = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    navigation.navigate('AppointmentDetails', { appointmentId: 'apt1' });
  };

  return (
    <View style={styles.flex}>
      <Header title="Book Appointment" showBack />
      <ScreenContainer scroll padding>
        <Card>
          <Text style={styles.formLabel}>Select Hospital</Text>
          <Text style={styles.formValue}>Apollo Lifeline Hospital</Text>
        </Card>
        <Card>
          <Text style={styles.formLabel}>Appointment Type</Text>
          <Text style={styles.formValue}>Blood Donation Screening</Text>
        </Card>
        <Card>
          <Text style={styles.formLabel}>Preferred Date</Text>
          <Text style={styles.formValue}>June 5, 2026</Text>
        </Card>
        <Card>
          <Text style={styles.formLabel}>Time Slot</Text>
          <Text style={styles.formValue}>10:00 AM</Text>
        </Card>
        <Button title="Confirm Booking" onPress={book} loading={loading} />
      </ScreenContainer>
    </View>
  );
};

export const AppointmentDetailsScreen: React.FC<{ route: RouteProp<RootStackParamList, 'AppointmentDetails'> }> = ({ route }) => {
  const apt = SAMPLE_APPOINTMENTS.find((a) => a.id === route.params.appointmentId);
  if (!apt) return null;

  return (
    <View style={styles.flex}>
      <Header title="Appointment" showBack />
      <ScreenContainer scroll padding>
        <Badge label={apt.status} color={apt.status === 'scheduled' ? colors.secondary : colors.success} />
        <Text style={styles.detailTitle}>{apt.type}</Text>
        <Card style={styles.mt}>
          <Text style={styles.formLabel}>Hospital</Text>
          <Text style={styles.formValue}>{apt.hospitalName}</Text>
          <Text style={[styles.formLabel, styles.mtSm]}>Date & Time</Text>
          <Text style={styles.formValue}>{apt.date} at {apt.time}</Text>
          {apt.notes && (
            <>
              <Text style={[styles.formLabel, styles.mtSm]}>Notes</Text>
              <Text style={styles.formValue}>{apt.notes}</Text>
            </>
          )}
        </Card>
      </ScreenContainer>
    </View>
  );
};

export const VolunteerRegistrationScreen: React.FC<{ navigation: Nav }> = () => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.flex}>
      <Header title="Volunteer Registration" showBack />
      <ScreenContainer scroll padding>
        <Text style={styles.intro}>Join our volunteer network to support blood drives, awareness campaigns, and emergency response.</Text>
        <Card><Text style={styles.formLabel}>Areas of Interest</Text><Text style={styles.formValue}>Blood Drives, Event Support, Community Outreach</Text></Card>
        <Button title="Register as Volunteer" onPress={async () => { setLoading(true); await new Promise((r) => setTimeout(r, 1000)); setLoading(false); }} loading={loading} />
      </ScreenContainer>
    </View>
  );
};

export const CampaignListingScreen: React.FC<{ navigation: Nav }> = ({ navigation }) => (
  <View style={styles.flex}>
    <Header title="Campaigns" showBack />
    <FlatList
      data={SAMPLE_CAMPAIGNS}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Card onPress={() => navigation.navigate('CampaignDetails', { campaignId: item.id })}>
          <Badge label={item.type.replace('_', ' ')} color={colors.primary} />
          <Text style={styles.articleTitle}>{item.title}</Text>
          <Text style={styles.articleSummary} numberOfLines={2}>{item.description}</Text>
          <Text style={styles.articleMeta}>{item.participants} participants • {item.startDate}</Text>
        </Card>
      )}
    />
  </View>
);

export const CampaignDetailsScreen: React.FC<{ navigation: Nav; route: RouteProp<RootStackParamList, 'CampaignDetails'> }> = ({ navigation, route }) => {
  const camp = SAMPLE_CAMPAIGNS.find((c) => c.id === route.params.campaignId);
  if (!camp) return null;

  return (
    <View style={styles.flex}>
      <Header title="Campaign Details" showBack />
      <ScreenContainer scroll padding>
        <Badge label={camp.type.replace('_', ' ')} color={colors.secondary} />
        <Text style={styles.detailTitle}>{camp.title}</Text>
        <Text style={styles.detailMeta}>{camp.organizer}</Text>
        <Text style={styles.detailContent}>{camp.description}</Text>
        <Card>
          <Text style={styles.formLabel}>Location</Text>
          <Text style={styles.formValue}>{camp.location.address}, {camp.location.city}</Text>
          <Text style={[styles.formLabel, styles.mtSm]}>Dates</Text>
          <Text style={styles.formValue}>{camp.startDate} — {camp.endDate}</Text>
        </Card>
        <Button title="Join Campaign" onPress={() => {}} />
        <Button title="View on Map" onPress={() => navigation.navigate('MapView', { title: camp.title, latitude: camp.location.latitude, longitude: camp.location.longitude })} variant="outline" style={styles.mtSm} />
      </ScreenContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.md, paddingBottom: spacing.xxl },
  unread: { borderLeftWidth: 3, borderLeftColor: colors.primary },
  notifRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  notifIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  notifInfo: { flex: 1 },
  notifTitle: { ...typography.body, fontWeight: '600' },
  notifBody: { ...typography.bodySmall, marginTop: 2 },
  notifTime: { ...typography.caption, marginTop: 4 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  articleTitle: { ...typography.h3, marginTop: spacing.sm },
  articleSummary: { ...typography.bodySmall, marginTop: spacing.xs, lineHeight: 20 },
  articleMeta: { ...typography.caption, marginTop: spacing.sm, color: colors.secondary },
  detailTitle: { ...typography.h1, marginTop: spacing.md, marginBottom: spacing.sm },
  detailMeta: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: spacing.lg },
  detailContent: { ...typography.body, lineHeight: 26 },
  question: { ...typography.body, fontWeight: '600', marginBottom: spacing.md },
  yesNo: { flexDirection: 'row', gap: spacing.sm },
  ynBtn: { flex: 1 },
  passCard: { alignItems: 'center', backgroundColor: `${colors.success}10`, marginTop: spacing.md },
  failCard: { alignItems: 'center', backgroundColor: `${colors.error}10`, marginTop: spacing.md },
  resultText: { ...typography.body, textAlign: 'center', marginTop: spacing.sm },
  recordTitle: { ...typography.h3 },
  recordDate: { ...typography.caption, marginTop: 4 },
  recordMeds: { ...typography.bodySmall, marginTop: spacing.sm },
  recordNotes: { ...typography.caption, marginTop: spacing.sm, fontStyle: 'italic' },
  formLabel: { ...typography.caption, color: colors.textSecondary },
  formValue: { ...typography.body, fontWeight: '600', marginTop: 4 },
  intro: { ...typography.bodySmall, marginBottom: spacing.lg, lineHeight: 22 },
  mt: { marginTop: spacing.md },
  mtSm: { marginTop: spacing.sm },
});
