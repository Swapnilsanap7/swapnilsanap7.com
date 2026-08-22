import { cookies } from 'next/headers';
import { createCsv, createXlsx } from '../../../../../lib/access-hub/export';
import { listAccessRequests } from '../../../../../lib/access-hub/database';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '../../../../../lib/access-hub/security';

export async function GET(request) {
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_COOKIE_NAME)?.value))) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') === 'csv' ? 'csv' : 'xlsx';

  try {
    const rows = await listAccessRequests({ limit: 1000 });
    const stamp = new Date().toISOString().slice(0, 10);
    if (format === 'csv') {
      return new Response(createCsv(rows), {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="access-requests-${stamp}.csv"`,
          'Cache-Control': 'no-store',
        },
      });
    }

    return new Response(createXlsx(rows), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="access-requests-${stamp}.xlsx"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Access export failed:', error);
    return Response.json({ error: 'Export could not be created.' }, { status: 500 });
  }
}
