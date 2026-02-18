export function readCookie(cookieName) {
  const allCookies = `; ${document.cookie}`;
  const cookieParts = allCookies.split(`; ${cookieName}=`);

  if (cookieParts.length === 2) {
    return cookieParts.pop().split(';').shift();
  }

  return null;
}
