export async function ensureCsrf() {
  try {
    // Trigger backend to set CSRF cookie
    const res = await fetch('http://localhost:8000/accounts/get_csrf/', {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) throw new Error('Failed to get CSRF token from backend');

    // Read the csrftoken from cookies
    const match = document.cookie.match(/csrftoken=([\w-]+)/);
    if (!match) throw new Error('CSRF token not found in cookies');

    const csrfToken = match[1];

    return csrfToken;
  } catch (err) {
    console.error('Failed to get or validate CSRF token:', err);
    return '';
  }
}
