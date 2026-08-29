import { useEffect, useState } from 'react';

const EMPTY = { quote: '', name: '', role: '', sort_order: 0 };

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((data) => setReviews(data.reviews || []))
      .catch((err) => console.error('Failed to load reviews:', err))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const save = async (e) => {
    e.preventDefault();
    const isNew = !editing.id;
    await fetch('/api/reviews', {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    if (!confirm('Delete this review?')) return;
    await fetch('/api/reviews', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    load();
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1>Reviews</h1>
      <button type="button" onClick={() => setEditing({ ...EMPTY })}>Add Review</button>

      {editing ? (
        <form className="admin-form" onSubmit={save}>
          <label>Quote<textarea required value={editing.quote} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} /></label>
          <label>Name<input required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></label>
          <label>Role<input required value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} placeholder="Founder, Company" /></label>
          <label>Sort order<input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></label>
          <div className="admin-form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </form>
      ) : null}

      <table className="admin-table">
        <thead><tr><th>Name</th><th>Role</th><th>Quote</th><th></th></tr></thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.role}</td>
              <td className="admin-message-cell">{r.quote}</td>
              <td>
                <button type="button" onClick={() => setEditing(r)}>Edit</button>{' '}
                <button type="button" onClick={() => remove(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
