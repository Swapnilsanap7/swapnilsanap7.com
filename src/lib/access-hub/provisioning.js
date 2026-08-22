import { getAccessProject } from './projects';

export async function provisionProjectAccess(request) {
  const project = getAccessProject(request.project_slug);
  if (!project) throw new Error('Unknown project');

  const prefix = project.provisioning?.envPrefix;
  const webhookUrl = prefix ? process.env[`${prefix}_ACCESS_WEBHOOK_URL`] : null;
  const webhookSecret = prefix ? process.env[`${prefix}_ACCESS_WEBHOOK_SECRET`] : null;

  if (project.provisioning?.type === 'webhook' && webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(webhookSecret ? { Authorization: `Bearer ${webhookSecret}` } : {}),
      },
      body: JSON.stringify({
        requestId: request.id,
        email: request.email,
        name: request.name,
        expiresAt: request.access_expires_at,
      }),
    });

    if (!response.ok) throw new Error(`${project.name} access provisioning failed`);
    const result = await response.json();
    return {
      type: result.type || 'invite-link',
      url: result.url || project.liveUrl,
      instructions: result.instructions || '',
      externalId: result.externalId || null,
    };
  }

  return { type: 'direct-link', url: project.liveUrl, instructions: '', externalId: null };
}

export async function revokeProjectAccess(request) {
  const project = getAccessProject(request.project_slug);
  const prefix = project?.provisioning?.envPrefix;
  const webhookUrl = prefix ? process.env[`${prefix}_ACCESS_WEBHOOK_URL`] : null;
  const webhookSecret = prefix ? process.env[`${prefix}_ACCESS_WEBHOOK_SECRET`] : null;

  if (project?.provisioning?.type === 'webhook' && webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(webhookSecret ? { Authorization: `Bearer ${webhookSecret}` } : {}),
      },
      body: JSON.stringify({
        requestId: request.id,
        email: request.email,
        externalId: request.access_metadata?.externalId || null,
      }),
    });
    if (!response.ok) throw new Error(`${project.name} access revocation failed`);
  }
}
