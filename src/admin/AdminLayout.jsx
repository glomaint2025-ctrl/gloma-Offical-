import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const NAV = [
  { to: '/admin/leads', label: 'Leads' },
  { to: '/admin/works', label: 'Works' },
  { to: '/admin/reviews', label: 'Reviews' },
  { to: '/admin/services', label: 'Services' },
];

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
      fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((r) => r.json())
        .then((d) => {
          if (!d.authenticated) {
            handleLogout();
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_token', data.token);
        sessionStorage.setItem('admin_user', data.user.username);
        setError('');
        setPassword('');
      } else {
        setError(data.error || 'Invalid username or password.');
      }
    } catch (err) {
      setError('Unable to connect to authentication server.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    const token = sessionStorage.getItem('admin_token');
    if (token) {
      fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => {});
    }
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_user');
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-logo">
            <span className="logo-accent">Gloma</span> Admin
          </div>
          <p className="admin-login-subtitle">Enter your credentials to access the management panel.</p>
          
          <form onSubmit={handleLogin} className="admin-login-form">
            {error && <div className="admin-login-error">{error}</div>}
            
            <div className="admin-login-field">
              <label htmlFor="login-username">Username</label>
              <input
                id="login-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoComplete="username"
              />
            </div>

            <div className="admin-login-field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="admin-login-btn" disabled={loading}>
              {loading ? 'Signing In…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-title">Gloma Admin</div>
        <nav>
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="admin-logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
