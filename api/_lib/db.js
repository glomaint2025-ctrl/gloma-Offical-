import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

let db;
try {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }
  db = getDatabase();
} catch (err) {
  console.error("Firebase initialization failed:", err);
  const throwError = () => {
    throw new Error("Firebase database connection failed. Please ensure the required environment variables (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_DATABASE_URL) are configured correctly in your Vercel project settings.");
  };
  db = new Proxy({}, {
    get: (target, prop) => {
      if (prop === 'then' || prop === 'catch') return undefined;
      return () => {
        throwError();
      };
    }
  });
}

export { db };

// Realtime Database returns a { pushId: {...fields} } object per collection;
// these turn that into the [{ id, ...fields }] array shape every API route uses.
export function snapshotToArray(snapshot) {
  const val = snapshot.val();
  if (!val) return [];
  return Object.entries(val).map(([id, fields]) => ({ id, ...fields }));
}

export function sortBy(arr, key, dir = 'asc') {
  const sorted = [...arr].sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
  return dir === 'desc' ? sorted.reverse() : sorted;
}
