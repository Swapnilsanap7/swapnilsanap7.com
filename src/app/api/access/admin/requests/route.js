import { cookies } from 'next/headers';
import { listAccessRequests } from '../../../../../lib/access-hub/database';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '../../../../../lib/access-hub/security';

export async function GET() {
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_COOKIE_NAME)?.value))) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const requests = await listAccessRequests({ limit: 1000 });
    return Response.json({ requests });
  } catch (error) {
    console.error('Access admin list failed:', error);
    return Response.json({ error: 'Could not load requests.' }, { status: 500 });
  }
}
