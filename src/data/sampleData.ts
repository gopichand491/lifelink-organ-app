import {
  Donor,
  Hospital,
  BloodBank,
  Ambulance,
  PatientRequest,
  ChatThread,
  ChatMessage,
  AppNotification,
  Article,
  Campaign,
  Appointment,
  MedicalRecord,
} from '../types';

export const SAMPLE_DONORS: Donor[] = [
  {
    id: 'd1',
    userId: 'u1',
    type: 'blood',
    fullName: 'Sarah Mitchell',
    bloodGroup: 'O+',
    phone: '+1 555-0101',
    location: { latitude: 28.6139, longitude: 77.209, address: 'Connaught Place', city: 'New Delhi' },
    isAvailable: true,
    lastDonation: '2025-11-15',
    rating: 4.9,
    distance: 1.2,
  },
  {
    id: 'd2',
    userId: 'u2',
    type: 'organ',
    fullName: 'James Wilson',
    organTypes: ['Kidney', 'Liver'],
    phone: '+1 555-0102',
    location: { latitude: 28.5355, longitude: 77.391, address: 'Noida Sector 18', city: 'Noida' },
    isAvailable: true,
    rating: 4.8,
    distance: 3.5,
  },
  {
    id: 'd3',
    userId: 'u3',
    type: 'blood',
    fullName: 'Priya Sharma',
    bloodGroup: 'A+',
    phone: '+1 555-0103',
    location: { latitude: 28.4595, longitude: 77.0266, address: 'Cyber City', city: 'Gurugram' },
    isAvailable: false,
    lastDonation: '2026-01-20',
    rating: 4.7,
    distance: 5.1,
  },
  {
    id: 'd4',
    userId: 'u4',
    type: 'organ',
    fullName: 'Michael Chen',
    organTypes: ['Kidney'],
    phone: '+1 555-0104',
    location: { latitude: 28.7041, longitude: 77.1025, address: 'Rohini', city: 'New Delhi' },
    isAvailable: true,
    rating: 5.0,
    distance: 2.8,
  },
];

export const SAMPLE_HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: 'Apollo Lifeline Hospital',
    type: 'Multi-Specialty',
    phone: '+1 555-0201',
    email: 'emergency@apollolife.com',
    location: { latitude: 28.5672, longitude: 77.210, address: 'Sarita Vihar', city: 'New Delhi' },
    specialties: ['Transplant', 'Emergency', 'Cardiology'],
    rating: 4.8,
    is24Hours: true,
  },
  {
    id: 'h2',
    name: 'Max Super Specialty',
    type: 'Super Specialty',
    phone: '+1 555-0202',
    email: 'contact@maxhealth.com',
    location: { latitude: 28.6289, longitude: 77.2065, address: 'Saket', city: 'New Delhi' },
    specialties: ['Organ Transplant', 'Trauma', 'ICU'],
    rating: 4.6,
    is24Hours: true,
  },
  {
    id: 'h3',
    name: 'Fortis Heart Institute',
    type: 'Cardiac Center',
    phone: '+1 555-0203',
    email: 'info@fortisheart.com',
    location: { latitude: 28.5494, longitude: 77.2673, address: 'Okhla', city: 'New Delhi' },
    specialties: ['Cardiology', 'Heart Transplant'],
    rating: 4.7,
    is24Hours: true,
  },
];

export const SAMPLE_BLOOD_BANKS: BloodBank[] = [
  {
    id: 'bb1',
    name: 'Red Cross Blood Bank',
    phone: '+1 555-0301',
    location: { latitude: 28.6129, longitude: 77.2295, address: 'ITO', city: 'New Delhi' },
    bloodStock: { 'O+': 45, 'O-': 12, 'A+': 30, 'A-': 8, 'B+': 25, 'B-': 6, 'AB+': 10, 'AB-': 3 },
    isOpen: true,
    rating: 4.9,
  },
  {
    id: 'bb2',
    name: 'LifeSaver Blood Center',
    phone: '+1 555-0302',
    location: { latitude: 28.5355, longitude: 77.391, address: 'Noida', city: 'Noida' },
    bloodStock: { 'O+': 20, 'O-': 5, 'A+': 15, 'A-': 4, 'B+': 18, 'B-': 3, 'AB+': 7, 'AB-': 2 },
    isOpen: true,
    rating: 4.5,
  },
];

export const SAMPLE_AMBULANCES: Ambulance[] = [
  {
    id: 'a1',
    provider: 'MediCare Ambulance',
    phone: '+1 555-0401',
    location: { latitude: 28.6139, longitude: 77.209, address: 'Central Delhi' },
    isAvailable: true,
    eta: 8,
  },
  {
    id: 'a2',
    provider: 'Emergency Response 24/7',
    phone: '+1 555-0402',
    location: { latitude: 28.5494, longitude: 77.2673, address: 'South Delhi' },
    isAvailable: true,
    eta: 12,
  },
  {
    id: 'a3',
    provider: 'LifeLink Rapid Response',
    phone: '+1 555-0403',
    location: { latitude: 28.7041, longitude: 77.1025, address: 'North Delhi' },
    isAvailable: false,
    eta: 0,
  },
];

export const SAMPLE_REQUESTS: PatientRequest[] = [
  {
    id: 'r1',
    patientId: 'p1',
    type: 'blood',
    bloodGroup: 'O+',
    units: 2,
    urgency: 'critical',
    status: 'matched',
    hospitalName: 'Apollo Lifeline Hospital',
    location: { latitude: 28.5672, longitude: 77.21, address: 'Sarita Vihar' },
    description: 'Urgent blood required for surgery patient',
    createdAt: '2026-05-30T10:30:00Z',
  },
  {
    id: 'r2',
    patientId: 'p2',
    type: 'organ',
    organType: 'Kidney',
    urgency: 'urgent',
    status: 'pending',
    hospitalName: 'Max Super Specialty',
    location: { latitude: 28.6289, longitude: 77.2065, address: 'Saket' },
    description: 'Kidney transplant match needed',
    createdAt: '2026-05-29T14:00:00Z',
  },
];

export const SAMPLE_CHATS: ChatThread[] = [
  {
    id: 'c1',
    participants: ['u1', 'current'],
    participantNames: ['Sarah Mitchell'],
    lastMessage: 'I can donate tomorrow morning.',
    lastMessageTime: '2026-05-30T09:15:00Z',
    unreadCount: 2,
  },
  {
    id: 'c2',
    participants: ['h1', 'current'],
    participantNames: ['Apollo Lifeline Hospital'],
    lastMessage: 'Your request has been received.',
    lastMessageTime: '2026-05-29T16:30:00Z',
    unreadCount: 0,
  },
];

export const SAMPLE_MESSAGES: Record<string, ChatMessage[]> = {
  c1: [
    { id: 'm1', chatId: 'c1', senderId: 'current', senderName: 'You', text: 'Hello, are you available to donate O+ blood?', timestamp: '2026-05-30T09:00:00Z', read: true },
    { id: 'm2', chatId: 'c1', senderId: 'u1', senderName: 'Sarah Mitchell', text: 'Yes, I am a registered donor.', timestamp: '2026-05-30T09:05:00Z', read: true },
    { id: 'm3', chatId: 'c1', senderId: 'u1', senderName: 'Sarah Mitchell', text: 'I can donate tomorrow morning.', timestamp: '2026-05-30T09:15:00Z', read: false },
  ],
  c2: [
    { id: 'm4', chatId: 'c2', senderId: 'current', senderName: 'You', text: 'We need urgent blood for a patient.', timestamp: '2026-05-29T16:00:00Z', read: true },
    { id: 'm5', chatId: 'c2', senderId: 'h1', senderName: 'Apollo Lifeline Hospital', text: 'Your request has been received.', timestamp: '2026-05-29T16:30:00Z', read: true },
  ],
};

export const SAMPLE_NOTIFICATIONS: AppNotification[] = [
  { id: 'n1', userId: 'current', title: 'Donor Match Found', body: 'Sarah Mitchell matched your O+ blood request.', type: 'match', read: false, createdAt: '2026-05-30T10:00:00Z' },
  { id: 'n2', userId: 'current', title: 'Campaign Reminder', body: 'Blood drive at Red Cross tomorrow 9 AM.', type: 'campaign', read: false, createdAt: '2026-05-29T18:00:00Z' },
  { id: 'n3', userId: 'current', title: 'Request Updated', body: 'Your organ request status changed to pending review.', type: 'request', read: true, createdAt: '2026-05-28T12:00:00Z' },
];

export const SAMPLE_ARTICLES: Article[] = [
  {
    id: 'art1',
    title: 'Understanding Organ Donation: A Complete Guide',
    summary: 'Learn how organ donation works and how you can register to save lives.',
    content: 'Organ donation is one of the greatest gifts you can give. When you register as an organ donor, you consent to donate your organs after death to help save the lives of others.\n\nIn India, organ donation rates have been increasing thanks to awareness campaigns. One donor can save up to eight lives through organ donation and enhance many more through tissue donation.\n\nTo become a donor, register on this platform, complete the eligibility checker, and keep your medical history updated. Discuss your decision with family members so they understand your wishes.',
    category: 'Organ Donation',
    author: 'Dr. Ananya Patel',
    publishedAt: '2026-05-15',
    readTime: 5,
  },
  {
    id: 'art2',
    title: 'Blood Donation: Who Can Donate and How Often',
    summary: 'Essential facts about blood donation eligibility and safety.',
    content: 'Blood donation is safe, simple, and saves lives. Healthy adults aged 18-65 can typically donate blood every 56 days.\n\nBefore donating, ensure you are well-rested, hydrated, and have eaten a healthy meal. Avoid alcohol 24 hours before donation.\n\nAfter donation, rest for 10-15 minutes and drink plenty of fluids. Your body replaces the donated blood within a few weeks.',
    category: 'Blood Donation',
    author: 'Dr. Rajesh Kumar',
    publishedAt: '2026-05-10',
    readTime: 4,
  },
  {
    id: 'art3',
    title: 'Emergency Preparedness for Medical Crises',
    summary: 'Steps to take during a medical emergency before help arrives.',
    content: 'During a medical emergency, every second counts. Use the SOS feature in this app to alert nearby hospitals and responders with your GPS location.\n\nKeep emergency contacts updated in your profile. Know the nearest hospital and blood bank locations.\n\nFor organ or blood requests, provide accurate medical information to speed up matching.',
    category: 'Emergency',
    author: 'LifeLink Medical Team',
    publishedAt: '2026-05-01',
    readTime: 3,
  },
];

export const SAMPLE_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp1',
    title: 'World Blood Donor Day Drive',
    description: 'Join us for a community blood donation camp. Free health checkups included.',
    organizer: 'Red Cross Society',
    location: { latitude: 28.6129, longitude: 77.2295, address: 'ITO Community Center', city: 'New Delhi' },
    startDate: '2026-06-14',
    endDate: '2026-06-14',
    participants: 245,
    type: 'blood_drive',
  },
  {
    id: 'camp2',
    title: 'Organ Donation Awareness Week',
    description: 'Educational sessions, registration drives, and expert panel discussions.',
    organizer: 'LifeLink NGO',
    location: { latitude: 28.6289, longitude: 77.2065, address: 'Saket Convention Center', city: 'New Delhi' },
    startDate: '2026-06-20',
    endDate: '2026-06-27',
    participants: 120,
    type: 'awareness',
  },
];

export const SAMPLE_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt1',
    userId: 'current',
    hospitalId: 'h1',
    hospitalName: 'Apollo Lifeline Hospital',
    type: 'Blood Donation Screening',
    date: '2026-06-05',
    time: '10:00 AM',
    status: 'scheduled',
    notes: 'Bring ID and medical records',
  },
  {
    id: 'apt2',
    userId: 'current',
    hospitalId: 'h2',
    hospitalName: 'Max Super Specialty',
    type: 'Organ Donor Evaluation',
    date: '2026-05-20',
    time: '2:30 PM',
    status: 'completed',
  },
];

export const SAMPLE_MEDICAL_HISTORY: MedicalRecord[] = [
  {
    id: 'mr1',
    condition: 'Hypertension',
    diagnosedDate: '2022-03-15',
    medications: ['Amlodipine 5mg'],
    notes: 'Controlled with medication',
  },
  {
    id: 'mr2',
    condition: 'Seasonal Allergies',
    diagnosedDate: '2019-06-01',
    medications: ['Cetirizine as needed'],
    notes: 'Mild, no restrictions for donation',
  },
];

/** Default map region — New Delhi, India */
export const DEFAULT_MAP_REGION = {
  latitude: 28.6139,
  longitude: 77.209,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
