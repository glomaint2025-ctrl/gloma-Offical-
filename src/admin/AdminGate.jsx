import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminGate({ children }) {
  const [status, setStatus] = useState('checking'); // checking | ok | unauthorized

  useEffect(() => {
    let cancelled = false;
    fetch('/api/admin/me')
      .then((res) => {
        if (cancelled) return;
        setStatus(res.ok ? 'ok' : 'unauthorized');
      })
      .catch(() => {
        if (!cancelled) setStatus('unauthorized');
      });
    return () => { cancelled = true; };
  }, []);

  if (status === 'checking') return <div className="admin-auth-screen">Loading…</div>;
  if (status === 'unauthorized') return <Navigate to="/admin/login" replace />;
  return children;
}
