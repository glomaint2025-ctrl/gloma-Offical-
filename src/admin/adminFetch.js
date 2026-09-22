/**
 * Authenticated fetch helper for admin panel.
 * Automatically injects Bearer token from sessionStorage.
 * Redirects to /admin if token has expired or is invalid.
 */
export async function adminFetch(url, options = {}) {
  const token = sessionStorage.getItem('admin_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(url, { ...options, headers });
  
  if (res.status === 401) {
    sessionStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_user');
    window.location.href = '/admin';
  }

  return res;
}
