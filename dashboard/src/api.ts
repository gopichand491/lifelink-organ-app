const envUrl = import.meta.env.VITE_API_URL as string | undefined;

/** Backend API base URL — set VITE_API_URL when deploying */
export const API_BASE = envUrl || 'http://localhost:4000';

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'API error');
  }
  return res.json();
}

export const authApi = {
  login: (email: string, password: string) =>
    api<{ success: boolean; user: { id: string; fullName: string; role: string; email: string }; token: string }>(
      '/api/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) }
    ),
};

export const dashboardApi = {
  overview: () => api<DashboardOverview>('/api/dashboard/overview'),
  stats: () => api<Record<string, number>>('/api/dashboard/stats'),
};

export const dataApi = {
  users: () => api<User[]>('/api/auth/users'),
  donors: () => api<Donor[]>('/api/donors'),
  hospitals: () => api<Hospital[]>('/api/hospitals'),
  requests: () => api<Request[]>('/api/requests'),
  campaigns: () => api<Campaign[]>('/api/campaigns'),
  notifications: () => api<Notification[]>('/api/notifications'),
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
