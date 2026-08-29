import { useEffect, useState } from 'react';
import { SERVICE_ICON_KEYS } from '../../serviceIcons.jsx';

const EMPTY = { title: '', text: '', items: '', icon_key: SERVICE_ICON_KEYS[0], sort_order: 0 };

function toFormState(service) {
  return { ...service, items: (service.items || []).join('\n') };
}

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch('/api/services')
      .then((r) => r.json())
      .then((data) => setServices(data.services || []))
      .catch((err) => console.error('Failed to load services:', err))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const save = async (e) => {
    e.preventDefault();
    const isNew = !editing.id;
    const payload = {
      ...editing,
      items: editing.items.split('\n').map((s) => s.trim()).filter(Boolean),
    };
    await fetch('/api/services', {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    if (!confirm('Delete this service?')) return;
    await fetch('/api/services', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    load();
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1>Services</h1>
      <button type="button" onClick={() => setEditing({ ...EMPTY })}>Add Service</button>

      {editing ? (
        <form className="admin-form" onSubmit={save}>
          <label>Title<input required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></label>
          <label>Description<textarea required value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} /></label>
          <label>Bullet items (one per line)<textarea value={editing.items} onChange={(e) => setEditing({ ...editing, items: e.target.value })} /></label>
          <label>Icon
            <select value={editing.icon_key} onChange={(e) => setEditing({ ...editing, icon_key: e.target.value })}>
              {SERVICE_ICON_KEYS.map((key) => <option key={key} value={key}>{key}</option>)}
            </select>
          </label>
          <label>Sort order<input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></label>
          <div className="admin-form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </form>
      ) : null}

      <table className="admin-table">
        <thead><tr><th>Title</th><th>Icon</th><th></th></tr></thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id}>
              <td>{s.title}</td>
              <td>{s.icon_key}</td>
              <td>
                <button type="button" onClick={() => setEditing(toFormState(s))}>Edit</button>{' '}
                <button type="button" onClick={() => remove(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
