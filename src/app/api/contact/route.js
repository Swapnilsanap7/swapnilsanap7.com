import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message, honeypot } = body;

    // Honeypot
    if (honeypot) {
      return Response.json({ success: true });
    }

    if (!name || !email || !subject || !message) {
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.me.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.APPLE_SMTP_USER, // Apple ID login email
        pass: process.env.APPLE_SMTP_PASS, // App-specific password
      },
    });

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
                      <p><strong>Name:</strong> ${name}</p>
                      <p><strong>Email:</strong> ${email}</p>
                      <p><strong>Subject:</strong> ${subject}</p>

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
                        ${message}
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
