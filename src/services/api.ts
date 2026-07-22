import { API_BASE_URL } from '../config/api.config';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

/** REST API client for live backend */
export const apiClient = {
  health: () => request<{ status: string }>('/api/health'),
  login: (email: string, password: string) =>
    request<{ success: boolean; user: object; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  getDonors: () => request<object[]>('/api/donors'),
  getHospitals: () => request<object[]>('/api/hospitals'),
  getRequests: () => request<object[]>('/api/requests'),
  getDashboardStats: () => request<Record<string, number>>('/api/dashboard/stats'),
  createRequest: (data: object) =>
    request<object>('/api/requests', { method: 'POST', body: JSON.stringify(data) }),
};
