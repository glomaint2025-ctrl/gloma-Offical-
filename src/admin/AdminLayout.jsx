import { NavLink, Outlet } from 'react-router-dom';

const NAV = [
  { to: '/admin/leads', label: 'Leads' },
  { to: '/admin/works', label: 'Works' },
  { to: '/admin/reviews', label: 'Reviews' },
  { to: '/admin/services', label: 'Services' },
];

export default function AdminLayout() {
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
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
