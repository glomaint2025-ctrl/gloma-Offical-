import { useEffect, useState } from 'react';
import { adminFetch } from '../adminFetch.js';

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    adminFetch('/api/admin/leads')
      .then((r) => r.json())
      .then((data) => setLeads(data.leads || []))
      .catch((err) => console.error('Failed to load leads:', err))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const updateStatus = async (id, status) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await adminFetch('/api/admin/leads', {
      method: 'PATCH',
      body: JSON.stringify({ id, status }),
    });
  };

  const remove = async (id) => {
    if (!confirm('Delete this lead?')) return;
    setLeads((prev) => prev.filter((l) => l.id !== id));
    await adminFetch('/api/admin/leads', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1>Leads</h1>
      {leads.length === 0 ? (
        <p>No leads yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Message</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id}>
                <td>{new Date(l.created_at).toLocaleString()}</td>
                <td>{l.name}</td>
                <td>{l.email}</td>
                <td>{l.phone || '—'}</td>
                <td>{l.service || '—'}</td>
                <td className="admin-message-cell">{l.message}</td>
                <td>
                  <select value={l.status} onChange={(e) => updateStatus(l.id, e.target.value)}>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="archived">Archived</option>
                  </select>
                </td>
                <td><button type="button" onClick={() => remove(l.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
