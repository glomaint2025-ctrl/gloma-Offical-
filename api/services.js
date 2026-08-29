import { db, snapshotToArray, sortBy } from './_lib/db.js';

const REF = 'services';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const snap = await db.ref(REF).once('value');
    const services = sortBy(snapshotToArray(snap), 'sort_order', 'asc');
    return res.status(200).json({ services });
  }

  if (req.method === 'POST') {
    const { title, text, items, icon_key, sort_order } = req.body || {};
    if (!title || !text || !icon_key) {
      return res.status(400).json({ error: 'title, text and icon_key are required' });
    }
    const data = { title, text, items: items || [], icon_key, sort_order: sort_order || 0 };
    const ref = await db.ref(REF).push(data);
    return res.status(201).json({ service: { id: ref.key, ...data } });
  }

  if (req.method === 'PUT') {
    const { id, title, text, items, icon_key, sort_order } = req.body || {};
    if (!id) return res.status(400).json({ error: 'id is required' });
    const data = { title, text, items: items || [], icon_key, sort_order: sort_order || 0 };
    await db.ref(`${REF}/${id}`).set(data);
    return res.status(200).json({ service: { id, ...data } });
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
