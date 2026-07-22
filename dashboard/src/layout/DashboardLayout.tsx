import { Outlet, NavLink, useNavigate } from 'react-router-dom';

export function DashboardLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('lifelink_user') || '{}');

  const logout = () => {
    localStorage.removeItem('lifelink_token');
    localStorage.removeItem('lifelink_user');
    navigate('/login');
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">❤ LifeLink Admin</div>
        <div className="sidebar-sub">Organ Donation Platform</div>
        <nav>
          <NavLink to="/admin" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            📊 Overview
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            👥 Users
          </NavLink>
          <NavLink to="/admin/donors" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            🩸 Donors
          </NavLink>
          <NavLink to="/admin/requests" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            🚨 Requests
          </NavLink>
          <NavLink to="/admin/campaigns" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            📢 Campaigns
          </NavLink>
          <a href="/" className="nav-link">🌐 Public Site</a>
          <a href="/download" className="nav-link">📱 Download APK</a>
        </nav>
        <div style={{ marginTop: 'auto', paddingTop: 32, fontSize: '0.85rem', opacity: 0.8 }}>
          {user.fullName || 'Admin'}
          <br />
          <button id="logout-button" type="button" onClick={logout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginTop: 8, textDecoration: 'underline' }}>
            Sign out
          </button>
        </div>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
