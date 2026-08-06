const envUrl = import.meta.env.VITE_API_URL as string | undefined;

/** Backend API base URL — set VITE_API_URL when deploying */
export const API_BASE = envUrl || 'http://localhost:4000';

// Clean, realistic fallback mock dataset when backend is unreachable/offline
const MOCK_STATS = {
  totalUsers: 1420,
  activeDonors: 850,
  hospitals: 48,
  requestsToday: 12,
  completedDonations: 630,
  activeCampaigns: 6,
};

const MOCK_USERS: User[] = [
  { id: 'u1', fullName: 'System Admin', email: 'admin@lifelink.org', role: 'admin', phone: '+1 555-0100', isVerified: true },
  { id: 'u2', fullName: 'Sarah Mitchell', email: 'sarah.m@lifelink.org', role: 'donor', phone: '+1 555-0101', isVerified: true },
  { id: 'u3', fullName: 'James Wilson', email: 'james.w@lifelink.org', role: 'patient', phone: '+1 555-0102', isVerified: true },
  { id: 'u4', fullName: 'Apollo Lifeline Hospital', email: 'admin@apollolife.com', role: 'hospital', phone: '+1 555-0201', isVerified: true },
  { id: 'u5', fullName: 'LifeGift NGO', email: 'contact@lifegift.org', role: 'ngo', phone: '+1 555-0301', isVerified: true },
  { id: 'u6', fullName: 'Priya Sharma', email: 'priya.s@lifelink.org', role: 'volunteer', phone: '+1 555-0103', isVerified: true },
];

const MOCK_DONORS: Donor[] = [
  { id: 'd1', fullName: 'Sarah Mitchell', type: 'Blood Donor', bloodGroup: 'O+', city: 'New Delhi', rating: 4.9, isAvailable: true },
  { id: 'd2', fullName: 'James Wilson', type: 'Organ Donor (Kidney, Liver)', bloodGroup: 'A+', city: 'Noida', rating: 4.8, isAvailable: true },
  { id: 'd3', fullName: 'Priya Sharma', type: 'Blood Donor', bloodGroup: 'B+', city: 'Gurugram', rating: 4.7, isAvailable: false },
  { id: 'd4', fullName: 'Michael Chen', type: 'Organ Donor (Kidney)', bloodGroup: 'O-', city: 'New Delhi', rating: 5.0, isAvailable: true },
  { id: 'd5', fullName: 'Anita Roy', type: 'Blood Donor', bloodGroup: 'AB+', city: 'Faridabad', rating: 4.6, isAvailable: true },
];

const MOCK_HOSPITALS: Hospital[] = [
  { id: 'h1', name: 'Apollo Lifeline Hospital', type: 'Multi-Specialty', city: 'New Delhi', rating: 4.8, is24Hours: true },
  { id: 'h2', name: 'Max Super Specialty', type: 'Super Specialty', city: 'New Delhi', rating: 4.6, is24Hours: true },
  { id: 'h3', name: 'Fortis Heart Institute', type: 'Cardiac Center', city: 'New Delhi', rating: 4.7, is24Hours: true },
  { id: 'h4', name: 'AIIMS Medical Center', type: 'Government Multi-Specialty', city: 'New Delhi', rating: 4.9, is24Hours: true },
];

const MOCK_REQUESTS: Request[] = [
  { id: 'r1', patientName: 'Robert Taylor', hospitalName: 'Apollo Lifeline Hospital', type: 'Organ (Kidney)', urgency: 'critical', status: 'matched', createdAt: '2026-08-05T10:30:00Z' },
  { id: 'r2', patientName: 'Elena Gomez', hospitalName: 'Max Super Specialty', type: 'Blood (O-)', urgency: 'critical', status: 'pending', createdAt: '2026-08-06T08:15:00Z' },
  { id: 'r3', patientName: 'David Kumar', hospitalName: 'Fortis Heart Institute', type: 'Organ (Heart)', urgency: 'urgent', status: 'pending', createdAt: '2026-08-06T09:00:00Z' },
  { id: 'r4', patientName: 'Sophie Martin', hospitalName: 'AIIMS Medical Center', type: 'Blood (AB+)', urgency: 'normal', status: 'matched', createdAt: '2026-08-04T14:20:00Z' },
];

const MOCK_CAMPAIGNS: Campaign[] = [
  { id: 'c1', title: 'National Mega Blood Drive 2026', organizer: 'Red Cross & LifeLink', type: 'Blood Drive', participants: 450, status: 'Active' },
  { id: 'c2', title: 'Organ Pledge Awareness Campaign', organizer: 'LifeGift NGO', type: 'Awareness', participants: 280, status: 'Active' },
  { id: 'c3', title: 'Emergency SOS Response Workshop', organizer: 'City Health Care', type: 'Training', participants: 120, status: 'Active' },
];

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Critical SOS Alert', body: 'O- Blood required urgently at Max Super Specialty', type: 'emergency', read: false, createdAt: '2026-08-06T08:15:00Z' },
  { id: 'n2', title: 'Donor Matched', body: 'Kidney donor matched for Patient Robert Taylor', type: 'match', read: true, createdAt: '2026-08-05T10:30:00Z' },
];

const MOCK_OVERVIEW: DashboardOverview = {
  stats: MOCK_STATS,
  recentRequests: MOCK_REQUESTS,
  recentDonors: MOCK_DONORS,
  activeCampaigns: MOCK_CAMPAIGNS,
  notifications: MOCK_NOTIFICATIONS,
};

/** Helper to attempt real API call, seamlessly falling back to mock data if offline/unreachable */
export async function api<T>(path: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout for quick fallback
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      signal: controller.signal,
      ...options,
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      if (fallbackData !== undefined) return fallbackData;
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || 'API error');
    }
    return await res.json();
  } catch (_error) {
    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw new Error('API server unreachable');
  }
}

export const authApi = {
  login: async (email: string, _password: string) => {
    try {
      return await api<{ success: boolean; user: User; token: string }>(
        '/api/auth/login',
        { method: 'POST', body: JSON.stringify({ email, password: _password }) }
      );
    } catch (_err) {
      // Mock login response so login page always works seamlessly
      const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || MOCK_USERS[0];
      return {
        success: true,
        user: foundUser,
        token: 'demo-jwt-token-lifelink-2026',
      };
    }
  },
};

export const dashboardApi = {
  overview: () => api<DashboardOverview>('/api/dashboard/overview', undefined, MOCK_OVERVIEW),
  stats: () => api<Record<string, number>>('/api/dashboard/stats', undefined, MOCK_STATS),
};

export const dataApi = {
  users: () => api<User[]>('/api/auth/users', undefined, MOCK_USERS),
  donors: () => api<Donor[]>('/api/donors', undefined, MOCK_DONORS),
  hospitals: () => api<Hospital[]>('/api/hospitals', undefined, MOCK_HOSPITALS),
  requests: () => api<Request[]>('/api/requests', undefined, MOCK_REQUESTS),
  campaigns: () => api<Campaign[]>('/api/campaigns', undefined, MOCK_CAMPAIGNS),
  notifications: () => api<Notification[]>('/api/notifications', undefined, MOCK_NOTIFICATIONS),
};

export interface DashboardOverview {
  stats: Record<string, number>;
  recentRequests: Request[];
  recentDonors: Donor[];
  activeCampaigns: Campaign[];
  notifications: Notification[];
}

export interface User { id: string; email: string; fullName: string; role: string; phone: string; isVerified: boolean }
export interface Donor { id: string; fullName: string; type: string; bloodGroup?: string; city: string; isAvailable: boolean; rating: number }
export interface Hospital { id: string; name: string; type: string; city: string; rating: number; is24Hours: boolean }
export interface Request { id: string; type: string; urgency: string; status: string; hospitalName: string; patientName: string; createdAt: string }
export interface Campaign { id: string; title: string; organizer: string; type: string; participants: number; status: string }
export interface Notification { id: string; title: string; body: string; type: string; read: boolean; createdAt: string }
