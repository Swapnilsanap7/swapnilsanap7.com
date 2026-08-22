import { cookies } from 'next/headers';
import {
  ADMIN_COOKIE_NAME,
  CSRF_COOKIE_NAME,
  adminCookieOptions,
  createCsrfToken,
  createAdminSession,
  csrfCookieOptions,
  getClientIp,
  isTrustedAdminOrigin,
  isRateLimited,
  revokeAdminSession,
  verifyCsrfToken,
  verifyRecentAdminIdToken,
  verifyAdminSession,
} from '../../../../../lib/access-hub/security';

export async function GET() {
  const store = await cookies();
  const existingCsrfToken = store.get(CSRF_COOKIE_NAME)?.value;
  const csrfToken = existingCsrfToken || createCsrfToken();
  if (!existingCsrfToken) store.set(CSRF_COOKIE_NAME, csrfToken, csrfCookieOptions());
  const claims = await verifyAdminSession(store.get(ADMIN_COOKIE_NAME)?.value);
  return Response.json({ authenticated: Boolean(claims), csrfToken });
}

export async function POST(request) {
  const store = await cookies();
  if (!isTrustedAdminOrigin(request) || !verifyCsrfToken(request, store.get(CSRF_COOKIE_NAME)?.value)) {
    return Response.json({ error: 'Unauthorized request.' }, { status: 403 });
  }
  const ip = getClientIp(request);
  if (await isRateLimited(`admin:${ip}`, 6, 15 * 60 * 1000)) return Response.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });

  let body;
  try { body = await request.json(); } catch { return Response.json({ error: 'Invalid request.' }, { status: 400 }); }

  try {
    const claims = await verifyRecentAdminIdToken(body.idToken);
    if (!claims) return Response.json({ error: 'Unable to sign in with those credentials.' }, { status: 401 });
    store.set(ADMIN_COOKIE_NAME, await createAdminSession(body.idToken), adminCookieOptions());
    return Response.json({ authenticated: true });
  } catch (error) {
    console.error('Admin sign-in failed:', error);
    return Response.json({ error: 'Unable to sign in with those credentials.' }, { status: 401 });
  }
}

export async function DELETE(request) {
  const store = await cookies();
  if (!isTrustedAdminOrigin(request) || !verifyCsrfToken(request, store.get(CSRF_COOKIE_NAME)?.value)) {
    return Response.json({ error: 'Unauthorized request.' }, { status: 403 });
  }
  await revokeAdminSession(store.get(ADMIN_COOKIE_NAME)?.value);
  store.set(ADMIN_COOKIE_NAME, '', { ...adminCookieOptions(), maxAge: 0 });
  return Response.json({ authenticated: false });
}
