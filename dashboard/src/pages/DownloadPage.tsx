import { Link } from 'react-router-dom';

/** APK download page — update APK_URL after EAS build completes */
export const APK_URL = import.meta.env.VITE_APK_URL || 'https://expo.dev/artifacts/eas/juXSq8beBfXW6nXcTMuV2W.apk';

export function DownloadPage() {
  return (
    <div className="landing" style={{ minHeight: '100vh' }}>
      <nav className="landing-nav">
        <Link to="/" style={{ color: 'white', fontWeight: 700 }}>← LifeLink Home</Link>
      </nav>
      <section className="landing-hero">
        <h1>📱 Download Android App</h1>
        <p>
          Organ Donation & Lifesaving Finder — 50 screens, offline-ready demo,
          Firebase integration, Google Maps, and role-based navigation.
        </p>

        <div className="card" style={{ color: '#1a1a2e', textAlign: 'left', maxWidth: 560, margin: '0 auto 24px' }}>
          <h3 style={{ marginBottom: 12 }}>Install Options</h3>
          <ol style={{ paddingLeft: 20, lineHeight: 2 }}>
            <li><strong>Expo Go (instant):</strong> Run <code>npx expo start</code> and scan QR on Android</li>
            <li><strong>APK file:</strong> Build with <code>npm run android:apk</code> via EAS Build</li>
            <li><strong>Local APK:</strong> Run <code>npx expo run:android</code> with Android Studio</li>
          </ol>
        </div>

        <div className="landing-actions">
          <a href={APK_URL} target="_blank" rel="noreferrer" className="btn btn-primary">
            Download APK (Android)
          </a>
          <Link to="/login" className="btn btn-secondary">Admin Dashboard</Link>
        </div>

        <div className="card" style={{ color: '#1a1a2e', maxWidth: 560, margin: '32px auto 0', fontSize: '0.9rem' }}>
          <p><strong>To generate your APK link:</strong></p>
          <pre style={{ background: '#f5f7fa', padding: 16, borderRadius: 8, overflow: 'auto', marginTop: 8, textAlign: 'left' }}>
{`npm install -g eas-cli
eas login
cd "c:\\life link organ"
eas build -p android --profile preview`}
          </pre>
          <p style={{ marginTop: 12 }}>After build completes, Expo provides a direct APK download URL. Set it in <code>dashboard/.env</code> as <code>VITE_APK_URL</code>.</p>
        </div>
      </section>
    </div>
  );
}
