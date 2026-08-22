'use client';

import { ArrowRight, Check, Clock3, Fingerprint, Layers3, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

const ROLE_OPTIONS = [
  'Recruiter / Hiring Manager',
  'Software Engineer',
  'Designer / Product Manager',
  'Founder / Business Owner',
  'Student / Learner',
  'Other',
];

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const TURNSTILE_REQUIRED = process.env.NODE_ENV === 'production';

export default function RequestAccessExperience({ projects, initialProject }) {
  const [form, setForm] = useState({ project: initialProject, name: '', email: '', role: '', reason: '', honeypot: '' });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [requestId, setRequestId] = useState('');
  const turnstileRef = useRef(null);
  const widgetId = useRef(null);

  const selectedProject = useMemo(
    () => projects.find((project) => project.slug === form.project),
    [form.project, projects]
  );

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return undefined;
    const render = () => {
      if (!window.turnstile || !turnstileRef.current || widgetId.current !== null) return;
      widgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        callback: setTurnstileToken,
        'expired-callback': () => setTurnstileToken(''),
      });
    };
    if (window.turnstile) render();
    else {
      const existing = document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]');
      const script = existing || document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.addEventListener('load', render, { once: true });
      if (!existing) document.head.appendChild(script);
    }
    return () => {
      if (window.turnstile && widgetId.current !== null) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, []);

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  async function submit(event) {
    event.preventDefault();
    setError('');
    if (!form.project || !form.name.trim() || !form.email.trim() || !form.role || form.reason.trim().length < 10) {
      setError('Please complete each field. A sentence or two about your interest is plenty.');
      return;
    }
    if (TURNSTILE_REQUIRED && !TURNSTILE_SITE_KEY) {
      setError('Access requests are temporarily unavailable. Please try again shortly.');
      return;
    }
    if (TURNSTILE_REQUIRED && !turnstileToken) {
      setError('Please complete the verification first.');
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch('/api/access/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: initialProject ? `portfolio-project:${initialProject}` : 'portfolio-access-page', turnstileToken }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Your request could not be submitted.');
      setRequestId(result.requestId || 'received');
      setStatus('success');
      window.dataLayer?.push({ event: 'demo_access_request', project_slug: form.project });
    } catch (submissionError) {
      setError(submissionError.message);
      setStatus('idle');
      if (window.turnstile && widgetId.current !== null) window.turnstile.reset(widgetId.current);
      setTurnstileToken('');
    }
  }

  if (status === 'success') {
    return (
      <section className="mx-auto flex min-h-[72vh] max-w-3xl items-center justify-center py-16 sm:py-24">
        <div className="relative w-full overflow-hidden rounded-[2rem] border border-[var(--dark)]/10 bg-white/55 p-8 text-center shadow-2xl shadow-blue-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-14">
          <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30"><Check size={30} /></div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Request received</p>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--dark)] dark:text-white sm:text-5xl">I’ll take it from here.</h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[var(--dark)]/65 dark:text-white/65 sm:text-lg">
            Your request for <strong className="text-[var(--dark)] dark:text-white">{selectedProject?.name}</strong> is in the review queue. I personally review each request and will email <strong className="text-[var(--dark)] dark:text-white">{form.email}</strong> with the decision and next step.
          </p>
          <div className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-2 text-left text-xs text-[var(--dark)]/55 dark:text-white/55 sm:text-sm">
            {['Received', 'Personal review', 'Access email'].map((label, index) => (
              <div key={label} className="rounded-xl border border-[var(--dark)]/10 bg-white/40 p-3 dark:border-white/10 dark:bg-white/5">
                <span className="mb-2 block font-mono text-blue-600 dark:text-blue-400">0{index + 1}</span>{label}
              </div>
            ))}
          </div>
          <p className="mt-6 font-mono text-[11px] text-[var(--dark)]/35 dark:text-white/35">REFERENCE {requestId.slice(0, 8).toUpperCase()}</p>
          <Link href="/#project" className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--dark)]/15 px-5 py-2.5 text-sm font-semibold transition hover:bg-[var(--dark)]/5 dark:border-white/15 dark:hover:bg-white/10">Back to projects <ArrowRight size={15} /></Link>
        </div>
      </section>
    );
  }

  return (
    <div className="mx-auto max-w-7xl pb-20 pt-10 sm:pt-16 lg:pb-28">
      <section className="relative overflow-hidden rounded-[2rem] border border-[var(--dark)]/10 bg-[var(--dark)] px-6 py-12 text-white shadow-2xl shadow-slate-950/20 dark:border-white/10 sm:px-10 lg:px-14 lg:py-16">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[32rem] w-[32rem] rounded-full bg-blue-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-56 left-1/4 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative max-w-4xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-semibold tracking-wide text-blue-100 backdrop-blur"><Sparkles size={14} /> Private demos, real products</div>
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Want to try the projects yourself?</h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-xl sm:leading-8">These aren’t static mockups. Choose a working application, tell me who you are, and I’ll personally review your request for a focused demo experience.</p>
        </div>
        <div className="relative mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
          {[
            [Layers3, `${projects.length} working projects`, 'Built beyond the case study'],
            [Clock3, 'Time-limited access', 'Usually seven days'],
            [Fingerprint, 'Personally reviewed', 'No automated gatekeeping'],
          ].map(([Icon, title, copy]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur">
              <Icon size={18} className="mb-5 text-blue-400" />
              <p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs text-slate-400">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-10 py-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 lg:py-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Choose your project</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--dark)] dark:text-white sm:text-4xl">One request. A proper live experience.</h2>
          <p className="mt-5 max-w-lg leading-7 text-[var(--dark)]/60 dark:text-white/60">Each product keeps its own design and authentication. The request, review, and access decision come through one secure hub.</p>
          <div className="mt-8 space-y-3">
            {projects.map((project, index) => {
              const active = form.project === project.slug;
              return (
                <button key={project.slug} type="button" onClick={() => setForm((current) => ({ ...current, project: project.slug }))} className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${active ? 'border-blue-500 bg-blue-500/[0.08] shadow-lg shadow-blue-500/10' : 'border-[var(--dark)]/10 bg-white/35 hover:border-blue-500/40 hover:bg-white/60 dark:border-white/10 dark:bg-white/[0.025] dark:hover:bg-white/[0.05]'}`} aria-pressed={active}>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold ${active ? 'bg-blue-600 text-white' : 'bg-[var(--dark)]/5 text-[var(--dark)]/50 dark:bg-white/10 dark:text-white/50'}`}>{String(index + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 flex-1"><span className="block font-semibold text-[var(--dark)] dark:text-white">{project.name}</span><span className="mt-0.5 block truncate text-xs text-[var(--dark)]/50 dark:text-white/50">{project.techStack.join(' · ')}</span></span>
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${active ? 'border-blue-600 bg-blue-600 text-white' : 'border-[var(--dark)]/15 dark:border-white/20'}`}>{active && <Check size={14} />}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="self-start rounded-[2rem] border border-[var(--dark)]/10 bg-white/60 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035] sm:p-9">
          <div className="mb-8 flex items-start justify-between gap-5">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Access request</p><h2 className="mt-2 text-2xl font-bold text-[var(--dark)] dark:text-white">A little context goes a long way.</h2></div>
            <ShieldCheck className="mt-1 shrink-0 text-blue-600 dark:text-blue-400" />
          </div>
          <form onSubmit={submit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="project" className="mb-2 block text-sm font-semibold text-[var(--dark)] dark:text-white">Project</label>
              <select id="project" name="project" value={form.project} onChange={update} required className="w-full rounded-xl border border-[var(--dark)]/15 bg-white/70 px-4 py-3.5 text-[var(--dark)] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/15 dark:bg-slate-950/40 dark:text-white">
                <option value="">Select a project</option>{projects.map((project) => <option value={project.slug} key={project.slug}>{project.name}</option>)}
              </select>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" value={form.name} onChange={update} autoComplete="name" placeholder="Your name" />
              <Field label="Email" name="email" type="email" value={form.email} onChange={update} autoComplete="email" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="role" className="mb-2 block text-sm font-semibold text-[var(--dark)] dark:text-white">What best describes you?</label>
              <select id="role" name="role" value={form.role} onChange={update} required className="w-full rounded-xl border border-[var(--dark)]/15 bg-white/70 px-4 py-3.5 text-[var(--dark)] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/15 dark:bg-slate-950/40 dark:text-white">
                <option value="">Choose a role</option>{ROLE_OPTIONS.map((role) => <option key={role}>{role}</option>)}
              </select>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between gap-4"><label htmlFor="reason" className="text-sm font-semibold text-[var(--dark)] dark:text-white">Why would you like to try it?</label><span className="text-xs text-[var(--dark)]/35 dark:text-white/35">{form.reason.length}/1500</span></div>
              <textarea id="reason" name="reason" rows="4" maxLength="1500" value={form.reason} onChange={update} placeholder="I’d like to explore the product’s…" required className="w-full resize-y rounded-xl border border-[var(--dark)]/15 bg-white/70 px-4 py-3.5 text-[var(--dark)] outline-none transition placeholder:text-[var(--dark)]/30 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/15 dark:bg-slate-950/40 dark:text-white dark:placeholder:text-white/30" />
            </div>
            <div className="absolute -left-[10000px]" aria-hidden="true"><label htmlFor="company-site">Company site</label><input id="company-site" name="honeypot" tabIndex="-1" autoComplete="off" value={form.honeypot} onChange={update} /></div>
            {TURNSTILE_SITE_KEY && <div ref={turnstileRef} className="min-h-[65px]" />}
            {error && <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">{error}</p>}
            <button type="submit" disabled={status === 'submitting'} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 disabled:cursor-wait disabled:opacity-60">
              {status === 'submitting' ? 'Sending request…' : `Request${selectedProject ? ` ${selectedProject.name}` : ''} access`}<ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-center text-xs leading-5 text-[var(--dark)]/45 dark:text-white/45">No mailing list. No automatic account. Your details are used only to review and manage this demo request.</p>
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({ label, ...props }) {
  return <div><label htmlFor={props.name} className="mb-2 block text-sm font-semibold text-[var(--dark)] dark:text-white">{label}</label><input id={props.name} required {...props} className="w-full rounded-xl border border-[var(--dark)]/15 bg-white/70 px-4 py-3.5 text-[var(--dark)] outline-none transition placeholder:text-[var(--dark)]/30 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/15 dark:bg-slate-950/40 dark:text-white dark:placeholder:text-white/30" /></div>;
}
