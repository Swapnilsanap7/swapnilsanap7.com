import { createAccessRequest } from '../../../../lib/access-hub/database';
import { sendNewRequestNotification } from '../../../../lib/access-hub/email';
import { getAccessProject } from '../../../../lib/access-hub/projects';
import {
  getClientIp,
  getCorsHeaders,
  isAllowedPublicOrigin,
  isRateLimited,
  isValidEmail,
  normalizeText,
} from '../../../../lib/access-hub/security';

export const runtime = 'nodejs';
const MAX_BODY_BYTES = 12 * 1024;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

function hasRequiredProductionConfiguration() {
  return Boolean(
    process.env.TURNSTILE_SECRET_KEY
    && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    && process.env.ACCESS_HUB_IP_SALT
  );
}

async function verifyTurnstile(token, ip) {
  if (!process.env.TURNSTILE_SECRET_KEY) return !IS_PRODUCTION;
  if (!token) return false;
  const form = new FormData();
  form.set('secret', process.env.TURNSTILE_SECRET_KEY);
  form.set('response', token);
  if (ip !== 'unknown') form.set('remoteip', ip);
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
  if (!response.ok) return false;
  return (await response.json()).success === true;
}

export function OPTIONS(request) {
  if (!isAllowedPublicOrigin(request)) return new Response(null, { status: 403 });
  return new Response(null, { status: 204, headers: getCorsHeaders(request) });
}

export async function POST(request) {
  const corsHeaders = getCorsHeaders(request);
  const json = (body, status = 200) => Response.json(body, { status, headers: corsHeaders });

  try {
    if (!isAllowedPublicOrigin(request)) return json({ error: 'This request origin is not allowed.' }, 403);
    if (IS_PRODUCTION && !hasRequiredProductionConfiguration()) {
      console.error('Access request endpoint is missing required production security configuration');
      return json({ error: 'Access requests are temporarily unavailable.' }, 503);
    }
    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody) > MAX_BODY_BYTES) return json({ error: 'Request is too large.' }, 413);

    let body;
    try { body = JSON.parse(rawBody); } catch { return json({ error: 'Invalid request.' }, 400); }
    if (body.honeypot) return json({ success: true });

    const projectSlug = normalizeText(body.project, 80);
    const project = getAccessProject(projectSlug);
    const name = normalizeText(body.name, 100);
    const email = normalizeText(body.email, 254).toLowerCase();
    const role = normalizeText(body.role, 120);
    const reason = normalizeText(body.reason, 1500);
    const source = normalizeText(body.source, 80) || 'portfolio';

    if (!project || name.length < 2 || !isValidEmail(email) || !role || reason.length < 10) {
      return json({ error: 'Please complete every field with valid information.' }, 400);
    }

    const ip = getClientIp(request);
    if (await isRateLimited(`${ip}:${email}`, 4)) return json({ error: 'Too many requests. Please try again later.' }, 429);
    if (!(await verifyTurnstile(body.turnstileToken, ip))) return json({ error: 'Verification failed. Please try again.' }, 403);

    const row = await createAccessRequest({
      project_slug: project.slug,
      project_name: project.name,
      name,
      email,
      role,
      reason,
      source,
      status: 'pending',
      requester_ip_hash: process.env.ACCESS_HUB_IP_SALT
        ? (await import('crypto')).createHash('sha256').update(`${process.env.ACCESS_HUB_IP_SALT}:${ip}`).digest('hex')
        : null,
    });

    try {
      await sendNewRequestNotification(row);
    } catch (error) {
      console.error('Access request notification failed:', error);
    }
    return json({ success: true, requestId: row.id }, 201);
  } catch (error) {
    console.error('Access request failed:', error);
    const configurationIssue = error?.name === 'FirebaseConfigurationError';
    return json({ error: configurationIssue ? 'Access requests are being configured. Please email hello@swapnilsanap7.com for now.' : 'Your request could not be submitted. Please try again.' }, 500);
  }
}
