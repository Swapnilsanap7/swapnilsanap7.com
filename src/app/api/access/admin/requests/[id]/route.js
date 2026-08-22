import { cookies } from 'next/headers';
import { getAccessRequest, updateAccessRequest } from '../../../../../../lib/access-hub/database';
import { sendAccessApprovedEmail, sendRequestRejectedEmail } from '../../../../../../lib/access-hub/email';
import { getAccessProject } from '../../../../../../lib/access-hub/projects';
import { provisionProjectAccess, revokeProjectAccess } from '../../../../../../lib/access-hub/provisioning';
import {
  ADMIN_COOKIE_NAME,
  CSRF_COOKIE_NAME,
  isTrustedAdminOrigin,
  normalizeText,
  verifyAdminSession,
  verifyCsrfToken,
} from '../../../../../../lib/access-hub/security';

const ACTIONS = new Set(['approve', 'reject', 'revoke', 'notes']);

export async function PATCH(request, { params }) {
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_COOKIE_NAME)?.value))) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  if (!isTrustedAdminOrigin(request) || !verifyCsrfToken(request, store.get(CSRF_COOKIE_NAME)?.value)) {
    return Response.json({ error: 'Unauthorized request.' }, { status: 403 });
  }

  let body;
  try { body = await request.json(); } catch { return Response.json({ error: 'Invalid request.' }, { status: 400 }); }
  if (!ACTIONS.has(body.action)) return Response.json({ error: 'Unknown action.' }, { status: 400 });

  const { id } = await params;
  try {
    const current = await getAccessRequest(id);
    if (!current) return Response.json({ error: 'Request not found.' }, { status: 404 });

    const now = new Date().toISOString();
    let updated;
    let emailWarning = null;

    if (body.action === 'notes') {
      updated = await updateAccessRequest(id, { admin_notes: normalizeText(body.notes, 4000) });
    }

    if (body.action === 'approve') {
      if (current.status !== 'pending') return Response.json({ error: 'Only pending requests can be approved.' }, { status: 409 });
      const project = getAccessProject(current.project_slug);
      const days = project?.accessDurationDays || 7;
      const expiresAt = new Date(Date.now() + days * 86400000).toISOString();
      const prepared = { ...current, access_expires_at: expiresAt };
      const access = await provisionProjectAccess(prepared);
      updated = await updateAccessRequest(id, {
        status: 'approved',
        reviewed_at: now,
        approved_at: now,
        access_expires_at: expiresAt,
        access_metadata: access,
        revoked_at: null,
      });
      try {
        await sendAccessApprovedEmail(updated, access);
        updated = await updateAccessRequest(id, { access_email_sent_at: new Date().toISOString() });
      } catch (error) {
        console.error('Approval email failed:', error);
        emailWarning = 'Access was approved, but the email could not be sent.';
      }
    }

    if (body.action === 'reject') {
      if (current.status !== 'pending') return Response.json({ error: 'Only pending requests can be rejected.' }, { status: 409 });
      updated = await updateAccessRequest(id, { status: 'rejected', reviewed_at: now });
      try { await sendRequestRejectedEmail(updated); } catch (error) {
        console.error('Rejection email failed:', error);
        emailWarning = 'Request was rejected, but the email could not be sent.';
      }
    }

    if (body.action === 'revoke') {
      if (!['approved', 'expired'].includes(current.status)) return Response.json({ error: 'Only approved or expired access can be revoked.' }, { status: 409 });
      await revokeProjectAccess(current);
      updated = await updateAccessRequest(id, { status: 'revoked', revoked_at: now, reviewed_at: now });
    }

    return Response.json({ request: updated, warning: emailWarning });
  } catch (error) {
    console.error('Access admin action failed:', error);
    return Response.json({ error: error.message || 'The action could not be completed.' }, { status: 500 });
  }
}
