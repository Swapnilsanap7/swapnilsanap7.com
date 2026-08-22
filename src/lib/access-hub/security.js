import crypto from 'crypto';
import { getAccessHubAuth } from './firebase-admin';

const PRODUCTION_COOKIE_PREFIX = process.env.NODE_ENV === 'production' ? '__Host-' : '';
export const ADMIN_COOKIE_NAME = `${PRODUCTION_COOKIE_PREFIX}access_hub_admin`;
export const CSRF_COOKIE_NAME = `${PRODUCTION_COOKIE_PREFIX}access_hub_csrf`;
const SESSION_DURATION_SECONDS = 2 * 60 * 60;
const SESSION_DURATION_MS = SESSION_DURATION_SECONDS * 1000;
const rateLimitStore = new Map();

export function normalizeText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function getClientIp(request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0].trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

export function isAllowedPublicOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return process.env.NODE_ENV !== 'production';

  const configured = [
    process.env.NEXT_PUBLIC_SITE_URL,
    ...(process.env.ACCESS_HUB_ALLOWED_ORIGINS || '').split(','),
  ]
    .filter(Boolean)
    .map((value) => {
      try { return new URL(value.trim()).origin; } catch { return null; }
    })
    .filter(Boolean);

  return configured.includes(origin);
}

export function getCorsHeaders(request) {
  const origin = request.headers.get('origin');
  if (!origin || !isAllowedPublicOrigin(request)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

export async function isRateLimited(key, max = 5, windowMs = 15 * 60 * 1000) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (redisUrl && redisToken) {
    const bucket = Math.floor(Date.now() / windowMs);
    try {
      const response = await fetch(`${redisUrl}/pipeline`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify([
          ['INCR', `portfolio:access:${key}:${bucket}`],
          ['PEXPIRE', `portfolio:access:${key}:${bucket}`, windowMs, 'NX'],
        ]),
        cache: 'no-store',
      });
      if (response.ok) {
        const data = await response.json();
        return Number(data?.[0]?.result || 0) > max;
      }
    } catch (error) {
      console.error('Access rate-limit fallback:', error);
    }
  }

  const now = Date.now();
  const current = rateLimitStore.get(key);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  current.count += 1;
  if (rateLimitStore.size > 1000) rateLimitStore.delete(rateLimitStore.keys().next().value);
  return current.count > max;
}

export function isTrustedAdminOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return process.env.NODE_ENV !== 'production';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return process.env.NODE_ENV !== 'production';
  try { return new URL(origin).origin === new URL(siteUrl).origin; } catch { return false; }
}

export function createCsrfToken() {
  return crypto.randomBytes(32).toString('base64url');
}

export function verifyCsrfToken(request, cookieToken) {
  const headerToken = request.headers.get('x-csrf-token') || '';
  if (!cookieToken || !headerToken || cookieToken.length !== headerToken.length) return false;
  return crypto.timingSafeEqual(Buffer.from(cookieToken), Buffer.from(headerToken));
}

function isAuthorizedAdmin(claims) {
  const allowedUid = process.env.ACCESS_HUB_ADMIN_UID || '';
  const allowedEmail = (process.env.ACCESS_HUB_ADMIN_EMAIL || '').trim().toLowerCase();
  return Boolean(
    allowedUid
    && allowedEmail
    && claims.uid === allowedUid
    && claims.email?.toLowerCase() === allowedEmail
    && claims.email_verified === true
  );
}

export async function verifyRecentAdminIdToken(idToken) {
  if (!idToken || typeof idToken !== 'string') return null;
  const claims = await getAccessHubAuth().verifyIdToken(idToken, true);
  const signedInRecently = Math.floor(Date.now() / 1000) - claims.auth_time <= 5 * 60;
  return isAuthorizedAdmin(claims) && signedInRecently ? claims : null;
}

export async function createAdminSession(idToken) {
  return getAccessHubAuth().createSessionCookie(idToken, { expiresIn: SESSION_DURATION_MS });
}

export async function verifyAdminSession(token) {
  if (!token) return null;
  try {
    const claims = await getAccessHubAuth().verifySessionCookie(token, true);
    return isAuthorizedAdmin(claims) ? claims : null;
  } catch {
    return null;
  }
}

export async function revokeAdminSession(token) {
  if (!token) return;
  try {
    const claims = await getAccessHubAuth().verifySessionCookie(token);
    await getAccessHubAuth().revokeRefreshTokens(claims.uid);
  } catch {
    // An invalid or expired cookie is already effectively signed out.
  }
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  };
}

export function csrfCookieOptions() {
  return {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  };
}
