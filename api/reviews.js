import { db, snapshotToArray, sortBy } from './_lib/db.js';

const REF = 'reviews';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const snap = await db.ref(REF).once('value');
    const reviews = sortBy(snapshotToArray(snap), 'sort_order', 'asc');
    return res.status(200).json({ reviews });
  }

  if (req.method === 'POST') {
    const { quote, name, role, sort_order } = req.body || {};
    if (!quote || !name || !role) {
      return res.status(400).json({ error: 'quote, name and role are required' });
    }
    const data = { quote, name, role, sort_order: sort_order || 0 };
    const ref = await db.ref(REF).push(data);
    return res.status(201).json({ review: { id: ref.key, ...data } });
  }

  if (req.method === 'PUT') {
    const { id, quote, name, role, sort_order } = req.body || {};
    if (!id) return res.status(400).json({ error: 'id is required' });
    const data = { quote, name, role, sort_order: sort_order || 0 };
    await db.ref(`${REF}/${id}`).set(data);
    return res.status(200).json({ review: { id, ...data } });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body || {};
    if (!id) return res.status(400).json({ error: 'id is required' });
    await db.ref(`${REF}/${id}`).remove();
    return res.status(200).json({ ok: true });
  }

  res.setHeader('Allow', 'GET, POST, PUT, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
}
