import { useEffect, useState } from 'react';
import { dataApi, Donor } from '../api';

export function DonorsPage() {
  const [donors, setDonors] = useState<Donor[]>([]);

  useEffect(() => {
    dataApi.donors().then(setDonors);
  }, []);

  return (
    <>
      <h1 className="page-title">Donors</h1>
      <p className="page-sub">Organ and blood donors registry</p>
      <div className="card">
        <table>
          <thead><tr><th>Name</th><th>Type</th><th>Blood Group</th><th>City</th><th>Rating</th><th>Status</th></tr></thead>
          <tbody>
            {donors.map((d) => (
              <tr key={d.id}>
                <td>{d.fullName}</td>
                <td>{d.type}</td>
                <td>{d.bloodGroup || '—'}</td>
                <td>{d.city}</td>
                <td>★ {d.rating}</td>
                <td><span className={`badge ${d.isAvailable ? 'badge-matched' : 'badge-pending'}`}>{d.isAvailable ? 'Available' : 'Busy'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
