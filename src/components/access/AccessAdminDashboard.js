'use client';

import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  Download,
  FileSpreadsheet,
  Inbox,
  LogOut,
  Search,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react';
import {
  inMemoryPersistence,
  sendEmailVerification,
  setPersistence,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAccessHubClientAuth } from '../../lib/access-hub/firebase-client';

const STATUS_ORDER = ['pending', 'approved', 'rejected', 'expired', 'revoked'];
const STATUS_STYLES = {
  pending: 'bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-300',
  approved: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-300',
  rejected: 'bg-red-500/10 text-red-700 border-red-500/20 dark:text-red-300',
  expired: 'bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-slate-300',
  revoked: 'bg-violet-500/10 text-violet-700 border-violet-500/20 dark:text-violet-300',
};

function effectiveStatus(request) {
  if (request.status === 'approved' && request.access_expires_at && new Date(request.access_expires_at) <= new Date()) return 'expired';
  return request.status;
}

function formatDate(value, includeTime = true) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-US', includeTime
    ? { dateStyle: 'medium', timeStyle: 'short' }
    : { dateStyle: 'medium' }).format(new Date(value));
}

export default function AccessAdminDashboard({ projects, initialRequestId }) {
  const [authenticated, setAuthenticated] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [requests, setRequests] = useState([]);
  const [selectedId, setSelectedId] = useState(initialRequestId);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [projectFilter, setProjectFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadRequests = useCallback(async () => {
    const response = await fetch('/api/access/admin/requests', { cache: 'no-store' });
    if (response.status === 401) { setAuthenticated(false); return; }
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Could not load requests.');
    setRequests(result.requests || []);
    setAuthenticated(true);
  }, []);

  useEffect(() => {
    fetch('/api/access/admin/session', { cache: 'no-store' })
      .then((response) => response.json())
      .then((result) => {
        setCsrfToken(result.csrfToken || '');
        return result.authenticated ? loadRequests() : setAuthenticated(false);
      })
      .catch(() => setAuthenticated(false));
  }, [loadRequests]);

  const selected = requests.find((request) => request.id === selectedId) || null;
  useEffect(() => { setNotes(selected?.admin_notes || ''); }, [selected]);

  const filtered = useMemo(() => requests.filter((request) => {
    const statusMatches = statusFilter === 'all' || effectiveStatus(request) === statusFilter;
    const projectMatches = projectFilter === 'all' || request.project_slug === projectFilter;
    const query = search.trim().toLowerCase();
    const searchMatches = !query || request.name.toLowerCase().includes(query) || request.email.toLowerCase().includes(query);
    return statusMatches && projectMatches && searchMatches;
  }), [projectFilter, requests, search, statusFilter]);

  const counts = useMemo(() => Object.fromEntries(STATUS_ORDER.map((status) => [status, requests.filter((request) => effectiveStatus(request) === status).length])), [requests]);

  async function signIn(event) {
    event.preventDefault();
    setBusy('login'); setError('');
    let auth;
    try {
      auth = getAccessHubClientAuth();
      await setPersistence(auth, inMemoryPersistence);
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      if (!credential.user.emailVerified) {
        await sendEmailVerification(credential.user);
        throw new Error('VERIFY_EMAIL');
      }
      const idToken = await credential.user.getIdToken(true);
      const response = await fetch('/api/access/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrfToken },
        body: JSON.stringify({ idToken }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error('AUTH_FAILED');
      setEmail(''); setPassword('');
      await loadRequests();
    } catch (loginError) {
      setError(loginError.message === 'VERIFY_EMAIL'
        ? 'Verify your email using the link just sent, then sign in again.'
        : 'Unable to sign in with those credentials.');
    } finally {
      if (auth) await firebaseSignOut(auth).catch(() => {});
      setBusy('');
    }
  }

  async function signOut() {
    await fetch('/api/access/admin/session', { method: 'DELETE', headers: { 'x-csrf-token': csrfToken } });
    setAuthenticated(false); setRequests([]); setSelectedId('');
  }

  async function runAction(action, payload = {}) {
    if (!selected) return;
    setBusy(action); setError(''); setMessage('');
    try {
      const response = await fetch(`/api/access/admin/requests/${selected.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrfToken }, body: JSON.stringify({ action, ...payload }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Action failed.');
      setRequests((current) => current.map((item) => item.id === selected.id ? result.request : item));
      const confirmations = { approve: 'Access approved and email sent.', notes: 'Private notes saved.', reject: 'Request rejected.', revoke: 'Access revoked.' };
      setMessage(result.warning || confirmations[action] || 'Request updated.');
    } catch (actionError) { setError(actionError.message); }
    finally { setBusy(''); }
  }

  if (authenticated === null) return <div className="flex min-h-[70vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" aria-label="Loading" /></div>;

  if (!authenticated) {
    return (
      <section className="mx-auto flex min-h-[72vh] max-w-md items-center py-16">
        <form onSubmit={signIn} className="w-full rounded-[2rem] border border-[var(--dark)]/10 bg-white/60 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035]">
          <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20"><ShieldCheck /></div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Private workspace</p>
          <h1 className="mt-2 text-3xl font-bold text-[var(--dark)] dark:text-white">Project Access Hub</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--dark)]/55 dark:text-white/55">Sign in to review and manage demo access requests.</p>
          <label htmlFor="admin-email" className="mb-2 mt-7 block text-sm font-semibold">Admin email</label>
          <input id="admin-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" required className="w-full rounded-xl border border-[var(--dark)]/15 bg-white/70 px-4 py-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/15 dark:bg-slate-950/40" />
          <label htmlFor="admin-password" className="mb-2 mt-4 block text-sm font-semibold">Password</label>
          <input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required className="w-full rounded-xl border border-[var(--dark)]/15 bg-white/70 px-4 py-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/15 dark:bg-slate-950/40" />
          {error && <p role="alert" className="mt-4 text-sm text-red-600 dark:text-red-300">{error}</p>}
          <button disabled={busy === 'login'} className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white transition hover:bg-blue-700 disabled:opacity-60">{busy === 'login' ? 'Signing in…' : 'Open Access Hub'}</button>
        </form>
      </section>
    );
  }

  return (
    <div className="mx-auto max-w-[1500px] pb-16 pt-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Private workspace</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--dark)] dark:text-white sm:text-4xl">Project Access Hub</h1><p className="mt-2 text-sm text-[var(--dark)]/50 dark:text-white/50">Review, decide, provision, and track every demo request.</p></div>
        <div className="flex flex-wrap gap-2">
          <a href="/api/access/admin/export?format=csv" className="inline-flex items-center gap-2 rounded-xl border border-[var(--dark)]/10 bg-white/40 px-4 py-2.5 text-sm font-semibold hover:bg-white/70 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"><Download size={16} /> CSV</a>
          <a href="/api/access/admin/export?format=xlsx" className="inline-flex items-center gap-2 rounded-xl border border-[var(--dark)]/10 bg-white/40 px-4 py-2.5 text-sm font-semibold hover:bg-white/70 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"><FileSpreadsheet size={16} /> Excel</a>
          <button onClick={signOut} className="inline-flex items-center gap-2 rounded-xl border border-[var(--dark)]/10 px-4 py-2.5 text-sm font-semibold hover:bg-red-500/10 hover:text-red-600 dark:border-white/10"><LogOut size={16} /> Sign out</button>
        </div>
      </header>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {STATUS_ORDER.map((status) => <button key={status} onClick={() => setStatusFilter(status)} className={`rounded-2xl border p-4 text-left transition ${statusFilter === status ? 'border-blue-500 bg-blue-500/[0.08]' : 'border-[var(--dark)]/10 bg-white/35 dark:border-white/10 dark:bg-white/[0.025]'}`}><span className="block text-2xl font-bold text-[var(--dark)] dark:text-white">{counts[status]}</span><span className="mt-1 block text-xs capitalize text-[var(--dark)]/50 dark:text-white/50">{status}</span></button>)}
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1"><span className="sr-only">Search requests</span><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dark)]/35 dark:text-white/35" size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name or email" className="w-full rounded-xl border border-[var(--dark)]/10 bg-white/45 py-3 pl-11 pr-4 outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/[0.035]" /></label>
        <select value={projectFilter} onChange={(event) => setProjectFilter(event.target.value)} aria-label="Filter by project" className="rounded-xl border border-[var(--dark)]/10 bg-white/45 px-4 py-3 outline-none dark:border-white/10 dark:bg-slate-900"><option value="all">All projects</option>{projects.map((project) => <option key={project.slug} value={project.slug}>{project.name}</option>)}</select>
        <button onClick={() => setStatusFilter('all')} className="rounded-xl border border-[var(--dark)]/10 px-4 py-3 text-sm font-semibold dark:border-white/10">Show all</button>
      </div>

      {(error || message) && <div role="status" className={`mb-5 rounded-xl border px-4 py-3 text-sm ${error ? 'border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300' : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'}`}>{error || message}</div>}

      <div className="grid min-h-[620px] overflow-hidden rounded-[1.75rem] border border-[var(--dark)]/10 bg-white/45 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-white/10 dark:bg-white/[0.025] lg:grid-cols-[0.82fr_1.18fr]">
        <div className="border-b border-[var(--dark)]/10 dark:border-white/10 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-[var(--dark)]/10 px-5 py-4 dark:border-white/10"><p className="text-sm font-semibold">{filtered.length} request{filtered.length === 1 ? '' : 's'}</p><Inbox size={17} className="text-[var(--dark)]/35 dark:text-white/35" /></div>
          <div className="max-h-[70vh] overflow-y-auto">
            {filtered.map((request) => {
              const status = effectiveStatus(request);
              return <button key={request.id} onClick={() => { setSelectedId(request.id); setMessage(''); setError(''); }} className={`flex w-full items-center gap-4 border-b border-[var(--dark)]/[0.07] p-5 text-left transition dark:border-white/[0.07] ${selectedId === request.id ? 'bg-blue-500/[0.08]' : 'hover:bg-white/50 dark:hover:bg-white/[0.035]'}`}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--dark)]/5 text-sm font-bold dark:bg-white/10">{request.name.slice(0, 1).toUpperCase()}</span><span className="min-w-0 flex-1"><span className="block truncate font-semibold">{request.name}</span><span className="mt-1 block truncate text-xs text-[var(--dark)]/45 dark:text-white/45">{request.project_name} · {formatDate(request.created_at, false)}</span><span className={`mt-2 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${STATUS_STYLES[status]}`}>{status}</span></span><ChevronRight size={17} className="shrink-0 opacity-30" /></button>;
            })}
            {filtered.length === 0 && <div className="px-6 py-16 text-center"><Inbox className="mx-auto mb-4 opacity-25" /><p className="font-semibold">No matching requests</p><p className="mt-1 text-sm opacity-45">Try another filter or search.</p></div>}
          </div>
        </div>

        <div className="min-w-0">
          {selected ? <RequestDetail request={selected} notes={notes} setNotes={setNotes} busy={busy} runAction={runAction} /> : <div className="flex h-full min-h-[440px] items-center justify-center p-10 text-center"><div><UserRound className="mx-auto mb-4 opacity-20" size={40} /><p className="font-semibold">Select a request</p><p className="mt-1 text-sm opacity-45">The full review and one-click actions will appear here.</p></div></div>}
        </div>
      </div>
    </div>
  );
}

function RequestDetail({ request, notes, setNotes, busy, runAction }) {
  const status = effectiveStatus(request);
  return <div className="p-6 sm:p-8">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${STATUS_STYLES[status]}`}>{status}</span><h2 className="mt-3 text-2xl font-bold">{request.name}</h2><a href={`mailto:${request.email}`} className="mt-1 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400">{request.email}<ArrowUpRight size={13} /></a></div><div className="text-right text-xs leading-5 text-[var(--dark)]/40 dark:text-white/40"><p>Received</p><p className="font-medium text-[var(--dark)]/65 dark:text-white/65">{formatDate(request.created_at)}</p></div></div>
    <div className="mt-7 grid gap-3 sm:grid-cols-2"><Info label="Project" value={request.project_name} /><Info label="Role" value={request.role} /><Info label="Source" value={request.source} /><Info label="Access expires" value={formatDate(request.access_expires_at)} /></div>
    <div className="mt-7"><p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--dark)]/40 dark:text-white/40">Why they want access</p><div className="rounded-2xl border border-[var(--dark)]/10 bg-[var(--dark)]/[0.025] p-5 text-sm leading-7 whitespace-pre-wrap dark:border-white/10 dark:bg-white/[0.025]">“{request.reason}”</div></div>
    {request.access_metadata?.url && <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] p-4 text-sm"><span className="font-semibold">Provisioned access: </span><a href={request.access_metadata.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">Open link <ArrowUpRight size={13} className="inline" /></a>{request.access_email_sent_at && <span className="mt-1 block text-xs opacity-55">Access email sent {formatDate(request.access_email_sent_at)}</span>}</div>}
    <div className="mt-7"><label htmlFor="admin-notes" className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[var(--dark)]/40 dark:text-white/40">Private admin notes</label><textarea id="admin-notes" value={notes} onChange={(event) => setNotes(event.target.value)} rows="3" maxLength="4000" placeholder="Context visible only to you…" className="w-full rounded-xl border border-[var(--dark)]/10 bg-white/50 p-4 text-sm outline-none focus:border-blue-500 dark:border-white/10 dark:bg-slate-950/30" /><button onClick={() => runAction('notes', { notes })} disabled={Boolean(busy)} className="mt-2 text-xs font-bold text-blue-600 disabled:opacity-40 dark:text-blue-400">{busy === 'notes' ? 'Saving…' : 'Save private notes'}</button></div>
    <div className="mt-8 flex flex-wrap gap-3 border-t border-[var(--dark)]/10 pt-6 dark:border-white/10">
      {status === 'pending' && <><button onClick={() => runAction('reject')} disabled={Boolean(busy)} className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-500/10 disabled:opacity-40 dark:text-red-300"><X size={17} /> {busy === 'reject' ? 'Rejecting…' : 'Reject'}</button><button onClick={() => runAction('approve')} disabled={Boolean(busy)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-40"><Check size={17} /> {busy === 'approve' ? 'Provisioning…' : 'Approve & Send Access'}</button></>}
      {status === 'approved' && <button onClick={() => runAction('revoke')} disabled={Boolean(busy)} className="inline-flex items-center gap-2 rounded-xl border border-violet-500/20 px-5 py-3 text-sm font-bold text-violet-700 hover:bg-violet-500/10 disabled:opacity-40 dark:text-violet-300"><X size={17} /> {busy === 'revoke' ? 'Revoking…' : 'Revoke access'}</button>}
      {status === 'expired' && <><span className="inline-flex items-center gap-2 text-sm opacity-55"><Clock3 size={16} /> This access period has ended.</span><button onClick={() => runAction('revoke')} disabled={Boolean(busy)} className="inline-flex items-center gap-2 rounded-xl border border-violet-500/20 px-4 py-2 text-sm font-bold text-violet-700 hover:bg-violet-500/10 disabled:opacity-40 dark:text-violet-300"><X size={16} /> Revoke project access</button></>}
    </div>
  </div>;
}

function Info({ label, value }) {
  return <div className="rounded-xl border border-[var(--dark)]/10 p-4 dark:border-white/10"><p className="text-[10px] font-bold uppercase tracking-[0.14em] opacity-40">{label}</p><p className="mt-1.5 truncate text-sm font-semibold">{value || '—'}</p></div>;
}
