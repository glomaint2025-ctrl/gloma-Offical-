import { db, snapshotToArray, sortBy } from './_lib/db.js';
import { requireAuth } from './_lib/auth.js';

const REF = 'works';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const snap = await db.ref(REF).once('value');
    const works = sortBy(snapshotToArray(snap), 'sort_order', 'asc');
    return res.status(200).json({ works });
  }

  if (!requireAuth(req, res)) return;

  if (req.method === 'POST') {
    const { category, cat_label, title, link, img, sort_order } = req.body || {};
    if (!category || !cat_label || !title) {
      return res.status(400).json({ error: 'category, cat_label and title are required' });
    }
    const data = { category, cat_label, title, link: link || null, img: img || null, sort_order: sort_order || 0 };
    const ref = await db.ref(REF).push(data);
    return res.status(201).json({ work: { id: ref.key, ...data } });
  }

  if (req.method === 'PUT') {
    const { id, category, cat_label, title, link, img, sort_order } = req.body || {};
    if (!id) return res.status(400).json({ error: 'id is required' });
    const data = { category, cat_label, title, link: link || null, img: img || null, sort_order: sort_order || 0 };
    await db.ref(`${REF}/${id}`).set(data);
    return res.status(200).json({ work: { id, ...data } });
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
