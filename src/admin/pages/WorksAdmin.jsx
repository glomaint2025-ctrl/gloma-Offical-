import { useEffect, useState } from 'react';

const EMPTY = { category: 'web', cat_label: 'Web Development', title: '', link: '', img: '', sort_order: 0 };

export default function WorksAdmin() {
  const [works, setWorks] = useState([]);
  const [editing, setEditing] = useState(null); // null = not editing, object = form state
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch('/api/works')
      .then((r) => r.json())
      .then((data) => setWorks(data.works || []))
      .catch((err) => console.error('Failed to load works:', err))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const save = async (e) => {
    e.preventDefault();
    const isNew = !editing.id;
    await fetch('/api/works', {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    if (!confirm('Delete this project?')) return;
    await fetch('/api/works', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    load();
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1>Works</h1>
      <button type="button" onClick={() => setEditing({ ...EMPTY })}>Add Project</button>

      {editing ? (
        <form className="admin-form" onSubmit={save}>
          <label>Category key<input required value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} placeholder="web / branding / social" /></label>
          <label>Category label<input required value={editing.cat_label} onChange={(e) => setEditing({ ...editing, cat_label: e.target.value })} placeholder="Web Development" /></label>
          <label>Title<input required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></label>
          <label>Link<input value={editing.link || ''} onChange={(e) => setEditing({ ...editing, link: e.target.value })} /></label>
          <label>Image URL<input value={editing.img || ''} onChange={(e) => setEditing({ ...editing, img: e.target.value })} placeholder="/assets/example.png" /></label>
          <label>Sort order<input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></label>
          <div className="admin-form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </form>
      ) : null}

      <table className="admin-table">
        <thead><tr><th>Title</th><th>Category</th><th>Link</th><th></th></tr></thead>
        <tbody>
          {works.map((w) => (
            <tr key={w.id}>
              <td>{w.title}</td>
              <td>{w.cat_label}</td>
              <td>{w.link || '—'}</td>
              <td>
                <button type="button" onClick={() => setEditing(w)}>Edit</button>{' '}
                <button type="button" onClick={() => remove(w.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
