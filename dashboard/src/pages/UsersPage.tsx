import { useEffect, useState } from 'react';
import { dataApi, User } from '../api';

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    dataApi.users().then(setUsers);
  }, []);

  return (
    <>
      <h1 className="page-title">Users</h1>
      <p className="page-sub">All registered platform users</p>
      <div className="card">
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Phone</th><th>Verified</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.fullName}</td>
                <td>{u.email}</td>
                <td><span className="badge badge-active">{u.role}</span></td>
                <td>{u.phone}</td>
                <td>{u.isVerified ? '✓' : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
