import { useEffect, useState } from 'react';
import { dashboardApi, DashboardOverview } from '../api';

export function OverviewPage() {
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    dashboardApi.overview().then(setData).catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="error">Backend offline: {error}. Start backend with: cd backend && npm run dev</div>;
  if (!data) return <p>Loading dashboard...</p>;

  const s = data.stats;

  return (
    <>
      <h1 className="page-title">Dashboard Overview</h1>
      <p className="page-sub">Live platform statistics and recent activity</p>

      <div className="stats-grid">
        <div className="stat-card"><div className="stat-value">{s.totalUsers.toLocaleString()}</div><div className="stat-label">Total Users</div></div>
        <div className="stat-card blue"><div className="stat-value">{s.activeDonors.toLocaleString()}</div><div className="stat-label">Active Donors</div></div>
        <div className="stat-card green"><div className="stat-value">{s.hospitals}</div><div className="stat-label">Hospitals</div></div>
        <div className="stat-card orange"><div className="stat-value">{s.requestsToday}</div><div className="stat-label">Requests Today</div></div>
        <div className="stat-card"><div className="stat-value">{s.completedDonations.toLocaleString()}</div><div className="stat-label">Completed Donations</div></div>
        <div className="stat-card blue"><div className="stat-value">{s.activeCampaigns}</div><div className="stat-label">Active Campaigns</div></div>
      </div>

      <div className="card">
        <div className="card-title">Recent Emergency Requests</div>
        <table>
          <thead><tr><th>Patient</th><th>Hospital</th><th>Type</th><th>Urgency</th><th>Status</th></tr></thead>
          <tbody>
            {data.recentRequests.map((r) => (
              <tr key={r.id}>
                <td>{r.patientName}</td>
                <td>{r.hospitalName}</td>
                <td>{r.type}</td>
                <td><span className={`badge badge-${r.urgency === 'critical' ? 'critical' : 'pending'}`}>{r.urgency}</span></td>
                <td><span className={`badge badge-${r.status === 'matched' ? 'matched' : 'pending'}`}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-title">Active Campaigns</div>
        <table>
          <thead><tr><th>Title</th><th>Organizer</th><th>Participants</th><th>Status</th></tr></thead>
          <tbody>
            {data.activeCampaigns.map((c) => (
              <tr key={c.id}>
                <td>{c.title}</td>
                <td>{c.organizer}</td>
                <td>{c.participants}</td>
                <td><span className="badge badge-active">{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
