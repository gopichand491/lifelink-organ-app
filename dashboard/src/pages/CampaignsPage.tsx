import { useEffect, useState } from 'react';
import { dataApi, Campaign } from '../api';

export function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    dataApi.campaigns().then(setCampaigns);
  }, []);

  return (
    <>
      <h1 className="page-title">Campaigns</h1>
      <p className="page-sub">Blood drives and awareness campaigns</p>
      <div className="card">
        <table>
          <thead><tr><th>Title</th><th>Organizer</th><th>Type</th><th>Participants</th><th>Status</th></tr></thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id}>
                <td>{c.title}</td>
                <td>{c.organizer}</td>
                <td>{c.type}</td>
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
