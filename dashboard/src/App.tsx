import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardLayout } from './layout/DashboardLayout';
import { OverviewPage } from './pages/OverviewPage';
import { UsersPage } from './pages/UsersPage';
import { DonorsPage } from './pages/DonorsPage';
import { RequestsPage } from './pages/RequestsPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { DownloadPage } from './pages/DownloadPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={localStorage.getItem('lifelink_token') ? <Navigate to="/admin" /> : <LoginPage />} />
      <Route path="/download" element={<DownloadPage />} />
      <Route path="/admin" element={localStorage.getItem('lifelink_token') ? <DashboardLayout /> : <Navigate to="/login" />}>
        <Route index element={<OverviewPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="donors" element={<DonorsPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="campaigns" element={<CampaignsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
