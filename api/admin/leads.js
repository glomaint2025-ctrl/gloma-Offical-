import { db, snapshotToArray, sortBy } from '../_lib/db.js';

const VALID_STATUSES = ['new', 'contacted', 'archived'];
const REF = 'leads';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const snap = await db.ref(REF).once('value');
    const leads = sortBy(snapshotToArray(snap), 'created_at', 'desc');
    return res.status(200).json({ leads });
  }

  if (req.method === 'PATCH') {
    const { id, status } = req.body || {};
    if (!id || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: 'id and a valid status are required' });
    }
    await db.ref(`${REF}/${id}`).update({ status });
    return res.status(200).json({ ok: true });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body || {};
    if (!id) return res.status(400).json({ error: 'id is required' });
    await db.ref(`${REF}/${id}`).remove();
    return res.status(200).json({ ok: true });
  }

  res.setHeader('Allow', 'GET, PATCH, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
}
