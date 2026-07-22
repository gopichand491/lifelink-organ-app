/** In-memory database with seed data — replace with MongoDB/Firestore in production */
export const db = {
  users: [
    { id: 'u1', email: 'admin@lifelink.org', password: 'Admin1234', fullName: 'System Admin', role: 'admin', phone: '+91 9876543210', isVerified: true },
    { id: 'u2', email: 'donor@lifelink.org', password: 'Demo1234', fullName: 'Sarah Mitchell', role: 'donor', phone: '+91 9876543211', bloodGroup: 'O+', isVerified: true },
    { id: 'u3', email: 'patient@lifelink.org', password: 'Demo1234', fullName: 'Raj Kumar', role: 'patient', phone: '+91 9876543212', isVerified: true },
    { id: 'u4', email: 'hospital@lifelink.org', password: 'Demo1234', fullName: 'Apollo Hospital', role: 'hospital', phone: '+91 9876543213', isVerified: true },
    { id: 'u5', email: 'ngo@lifelink.org', password: 'Demo1234', fullName: 'LifeLink NGO', role: 'ngo', phone: '+91 9876543214', isVerified: true },
  ],
  donors: [
    { id: 'd1', userId: 'u2', type: 'blood', fullName: 'Sarah Mitchell', bloodGroup: 'O+', phone: '+91 9876543211', city: 'New Delhi', isAvailable: true, rating: 4.9 },
    { id: 'd2', userId: 'u6', type: 'organ', fullName: 'James Wilson', organTypes: ['Kidney'], phone: '+91 9876543220', city: 'Noida', isAvailable: true, rating: 4.8 },
    { id: 'd3', userId: 'u7', type: 'blood', fullName: 'Priya Sharma', bloodGroup: 'A+', phone: '+91 9876543221', city: 'Gurugram', isAvailable: false, rating: 4.7 },
  ],
  hospitals: [
    { id: 'h1', name: 'Apollo Lifeline Hospital', type: 'Multi-Specialty', phone: '+91 11 2345678', city: 'New Delhi', rating: 4.8, is24Hours: true, specialties: ['Transplant', 'Emergency'] },
    { id: 'h2', name: 'Max Super Specialty', type: 'Super Specialty', phone: '+91 11 2345679', city: 'New Delhi', rating: 4.6, is24Hours: true, specialties: ['Organ Transplant', 'ICU'] },
  ],
  bloodBanks: [
    { id: 'bb1', name: 'Red Cross Blood Bank', phone: '+91 11 2345680', city: 'New Delhi', isOpen: true, rating: 4.9, stock: { 'O+': 45, 'A+': 30, 'B+': 25 } },
    { id: 'bb2', name: 'LifeSaver Blood Center', phone: '+91 11 2345681', city: 'Noida', isOpen: true, rating: 4.5, stock: { 'O+': 20, 'A+': 15 } },
  ],
  requests: [
    { id: 'r1', type: 'blood', bloodGroup: 'O+', units: 2, urgency: 'critical', status: 'matched', hospitalName: 'Apollo Lifeline', patientName: 'Raj Kumar', createdAt: '2026-05-30T10:30:00Z' },
    { id: 'r2', type: 'organ', organType: 'Kidney', urgency: 'urgent', status: 'pending', hospitalName: 'Max Super Specialty', patientName: 'Anita Singh', createdAt: '2026-05-29T14:00:00Z' },
  ],
  campaigns: [
    { id: 'c1', title: 'World Blood Donor Day Drive', organizer: 'Red Cross Society', type: 'blood_drive', participants: 245, startDate: '2026-06-14', status: 'active' },
    { id: 'c2', title: 'Organ Donation Awareness Week', organizer: 'LifeLink NGO', type: 'awareness', participants: 120, startDate: '2026-06-20', status: 'active' },
  ],
  articles: [
    { id: 'a1', title: 'Understanding Organ Donation', category: 'Organ Donation', author: 'Dr. Ananya Patel', publishedAt: '2026-05-15', readTime: 5 },
    { id: 'a2', title: 'Blood Donation Guide', category: 'Blood Donation', author: 'Dr. Rajesh Kumar', publishedAt: '2026-05-10', readTime: 4 },
  ],
  notifications: [
    { id: 'n1', title: 'Donor Match Found', body: 'Sarah Mitchell matched O+ request', type: 'match', read: false, createdAt: '2026-05-30T10:00:00Z' },
    { id: 'n2', title: 'Campaign Reminder', body: 'Blood drive tomorrow 9 AM', type: 'campaign', read: false, createdAt: '2026-05-29T18:00:00Z' },
  ],
  stats: {
    totalUsers: 12450,
    activeDonors: 3280,
    hospitals: 186,
    requestsToday: 47,
    completedDonations: 8920,
    activeCampaigns: 12,
  },
};

export type DbUser = (typeof db.users)[0];
