import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 10 * 1024;
const MAX_FIELD_LENGTHS = {
  name: 80,
  email: 254,
  subject: 120,
  message: 3000,
};
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const rateLimitStore = new Map();

function getClientIp(req) {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  return req.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const bucket = rateLimitStore.get(ip) || [];
  const recentRequests = bucket.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);
  return false;
}

function sanitizeHeader(value) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function normalizeField(value, maxLength) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isAllowedOrigin(req) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const origin = req.headers.get('origin');

  if (!siteUrl || !origin) {
    return process.env.NODE_ENV !== 'production';
  }

  try {
    return new URL(origin).origin === new URL(siteUrl).origin;
  } catch {
    return false;
  }
}

async function parseRequestBody(req) {
  const rawBody = await req.text();

  if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
    return { error: 'Request too large', status: 413 };
  }

  try {
    return { body: JSON.parse(rawBody) };
  } catch {
    return { error: 'Invalid JSON', status: 400 };
  }
}

async function verifyTurnstileToken(token, ip) {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    // If Turnstile is not configured, bypass verification so emails still work.
    return true;
  }

  if (!token || typeof token !== 'string') {
    return false;
  }

  const formData = new FormData();
  formData.append('secret', process.env.TURNSTILE_SECRET_KEY);
  formData.append('response', token);
  if (ip !== 'unknown') {
    formData.append('remoteip', ip);
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    return false;
  }

  const result = await response.json();
  return result.success === true;
}

export async function POST(req) {
  try {
    if (!isAllowedOrigin(req)) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const ip = getClientIp(req);

    if (isRateLimited(ip)) {
      return Response.json({ error: 'Too many requests' }, { status: 429 });
    }

    const parsed = await parseRequestBody(req);
    if (parsed.error) {
      return Response.json({ error: parsed.error }, { status: parsed.status });
    }

    const { honeypot } = parsed.body;
    const turnstileToken = parsed.body.turnstileToken;
    const name = sanitizeHeader(normalizeField(parsed.body.name, MAX_FIELD_LENGTHS.name));
    const email = sanitizeHeader(normalizeField(parsed.body.email, MAX_FIELD_LENGTHS.email));
    const subject = sanitizeHeader(normalizeField(parsed.body.subject, MAX_FIELD_LENGTHS.subject));
    const message = normalizeField(parsed.body.message, MAX_FIELD_LENGTHS.message);

    // Honeypot
    if (honeypot) {
      return Response.json({ success: true });
    }

    const isHuman = await verifyTurnstileToken(turnstileToken, ip);
    if (!isHuman) {
      return Response.json({ error: 'Verification failed' }, { status: 403 });
    }

    if (!name || !email || !subject || !message || !isValidEmail(email)) {
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (!process.env.APPLE_SMTP_USER || !process.env.APPLE_SMTP_PASS || !process.env.MAIL_FROM || !process.env.NEXT_PUBLIC_SITE_URL) {
      console.error('Mail configuration is incomplete');
      return Response.json({ error: 'Email failed' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.me.com',
      port: 587,
      secure: false,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      auth: {
        user: process.env.APPLE_SMTP_USER, // Apple ID login email
        pass: process.env.APPLE_SMTP_PASS, // App-specific password
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    // HTML Email Template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="color-scheme" content="light dark">
          <meta name="supported-color-schemes" content="light dark">
          <style>
            /* Dark mode styles (Apple Mail, some Outlook) */
            @media (prefers-color-scheme: dark) {
              body {
                background-color: #0B0F1A !important;
              }
              .container {
                background-color: #111827 !important;
              }
              .header {
                background-color: #0066FF !important;
              }
              .content {
                color: #E5E7EB !important;
              }
              .message-box {
                background-color: #1F2937 !important;
                color: #E5E7EB !important;
              }
              .footer {
                background-color: #0B0F1A !important;
                color: #9CA3AF !important;
              }
            }
          </style>
        </head>

        <body style="margin:0; padding:0; background-color:#E0E1DD;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding:32px 16px;">

                <table width="600" cellpadding="0" cellspacing="0"
                  class="container"
                  style="background:#ffffff; border-radius:12px; overflow:hidden; font-family:Arial, Helvetica, sans-serif;">

                  <!-- Header -->
                  <tr>
                    <td class="header" style="background:#0066FF; padding:24px;">
                      <h1 style="margin:0; font-size:22px; color:#ffffff;">
                        New Contact Message
                      </h1>
                      <p style="margin:6px 0 0; font-size:14px; color:#e5efff;">
                        Someone reached out via your portfolio
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td class="content" style="padding:24px; font-size:14px; color:#111827;">
                      <p><strong>Name:</strong> ${safeName}</p>
                      <p><strong>Email:</strong> ${safeEmail}</p>
                      <p><strong>Subject:</strong> ${safeSubject}</p>

                      <hr style="border:none; border-top:1px solid #d1d5db; margin:24px 0;" />

                      <p><strong>Message</strong></p>

                      <div class="message-box" style="
                        background:#F8FAFC;
                        border-left:4px solid #0066FF;
                        padding:16px;
                        border-radius:6px;
                        white-space:pre-line;
                        color:#374151;
                      ">
                        ${safeMessage}
                      </div>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td class="footer" style="background:#E0E1DD; padding:16px; text-align:center;">
                      <p style="margin:0; font-size:12px; color:#4b5563;">
                        Sent from <strong>swapnilsanap7.com</strong>
                      </p>
                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>
        </body>
      </html>
      `;


    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_FROM,
      replyTo: email,
      subject: `Portfolio: ${subject}`,

      // Plain text fallback
      text: `Name: ${name}
Email: ${email}

${message}`,

      // HTML email
      html: htmlTemplate,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('Mail error:', err);
    return Response.json(
      { error: 'Email failed' },
      { status: 500 }
    );
  }
}
