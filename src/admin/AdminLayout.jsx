import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const NAV = [
  { to: '/admin/leads', label: 'Leads' },
  { to: '/admin/works', label: 'Works' },
  { to: '/admin/reviews', label: 'Reviews' },
  { to: '/admin/services', label: 'Services' },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
    navigate('/admin/login', { replace: true });
  };

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
        <button type="button" className="admin-logout" onClick={handleLogout}>Log Out</button>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
