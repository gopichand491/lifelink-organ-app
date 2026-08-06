import { Link } from 'react-router-dom';

const DIRECT_APK_URL = 'https://expo.dev/artifacts/eas/juXSq8beBfXW6nXcTMuV2W.apk';

export function LandingPage() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <strong>❤ LifeLink — Organ Donation & Lifesaving Finder</strong>
        <div style={{ display: 'flex', gap: 16 }}>
          <Link to="/login" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>Admin Login</Link>
          <a href={DIRECT_APK_URL} target="_blank" rel="noreferrer" className="btn btn-primary">Get Android App</a>
        </div>
      </nav>

      <section className="landing-hero">
        <h1>Save Lives Through Technology</h1>
        <p>
          Connect organ donors, blood donors, patients, hospitals, NGOs, and volunteers
          during emergency and lifesaving situations. Final Year Project — 50 screens,
          Android app, web dashboard & live API.
        </p>
        <div className="landing-actions">
          <a href={DIRECT_APK_URL} target="_blank" rel="noreferrer" className="btn btn-primary">
            📥 Download Android APK
          </a>
          <Link to="/login" className="btn btn-secondary">Open Admin Dashboard</Link>
          <Link to="/download" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
            Installation Guide
          </Link>
        </div>
      </section>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>📱 Mobile App</h3>
          <p>50-screen Android application with role-based navigation, SOS, maps, and chat.</p>
        </div>
        <div className="feature-card">
          <h3>🖥️ Web Dashboard</h3>
          <p>Admin panel to manage users, donors, requests, and campaigns in real time.</p>
        </div>
        <div className="feature-card">
          <h3>⚡ Live Backend</h3>
          <p>REST API with authentication, donors, hospitals, blood banks, and analytics.</p>
        </div>
        <div className="feature-card">
          <h3>🌐 Web Application</h3>
          <p>Expo web version runs in browser — same codebase as the mobile app.</p>
        </div>
      </div>

      <footer className="deploy-banner">
        <p>Organ Donation & Lifesaving Finder · College Final Year Project</p>
        <div className="deploy-links">
          <a href={DIRECT_APK_URL} target="_blank" rel="noreferrer">Direct APK Download</a>
          <Link to="/login">Admin Dashboard</Link>
          <Link to="/download">App Guide</Link>
        </div>
      </footer>
    </div>
  );
}
