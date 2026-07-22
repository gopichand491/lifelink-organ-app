import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@lifelink.org');
  const [password, setPassword] = useState('Admin1234');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authApi.login(email, password);
      localStorage.setItem('lifelink_token', res.token);
      localStorage.setItem('lifelink_user', JSON.stringify(res.user));
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" id="login-page">
      <div className="login-card">
        <h1>Admin Dashboard</h1>
        <p>Sign in to manage the LifeLink platform</p>
        {error && <div className="error" id="login-error">{error}</div>}
        <form onSubmit={submit} id="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            id="login-button"
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p style={{ marginTop: 16, fontSize: '0.85rem', color: '#6b7280' }}>
          Demo: admin@lifelink.org / Admin1234
        </p>
        <Link to="/" style={{ display: 'block', marginTop: 12, fontSize: '0.9rem' }}>← Back to home</Link>
      </div>
    </div>
  );
}
