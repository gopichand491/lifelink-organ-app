import { useEffect, useState } from 'react';
import { dataApi, Request } from '../api';

export function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    dataApi.requests().then(setRequests);
  }, []);

  return (
    <>
      <h1 className="page-title">Emergency Requests</h1>
      <p className="page-sub">Blood, organ, and emergency requests</p>
      <div className="card">
        <table>
          <thead><tr><th>Patient</th><th>Hospital</th><th>Type</th><th>Urgency</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.patientName}</td>
                <td>{r.hospitalName}</td>
                <td>{r.type}</td>
                <td><span className={`badge badge-${r.urgency === 'critical' ? 'critical' : 'pending'}`}>{r.urgency}</span></td>
                <td><span className={`badge badge-${r.status === 'matched' ? 'matched' : 'pending'}`}>{r.status}</span></td>
                <td>{new Date(r.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
