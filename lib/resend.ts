import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_EMAIL = 'BuildWithKayAI <noreply@buildwithkayai.com>'
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'oyekunlekehinde23@gmail.com'

// Send contact form notification to admin
export async function sendContactNotification({
  name,
  email,
  subject,
  message,
}: {
  name: string
  email: string
  subject: string
  message: string
}) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New message from ${name} — ${subject}`,
    html: `
      <div style="background:#02040a;color:#f0f4f8;padding:40px;font-family:monospace;">
        <div style="border:1px solid rgba(0,245,255,0.3);padding:30px;max-width:600px;">
          <h2 style="color:#00f5ff;letter-spacing:3px;margin-bottom:20px;">// NEW MESSAGE</h2>
          <p><strong style="color:#00f5ff;">FROM:</strong> ${name} &lt;${email}&gt;</p>
          <p style="margin-top:10px;"><strong style="color:#00f5ff;">SUBJECT:</strong> ${subject}</p>
          <div style="margin-top:20px;padding:20px;background:rgba(255,255,255,0.03);border-left:2px solid #00f5ff;">
            <p>${message.replace(/\n/g, '<br/>')}</p>
          </div>
          <p style="margin-top:20px;color:rgba(240,244,248,0.4);font-size:12px;">
            Received via buildwithkayai.com contact form
          </p>
        </div>
      </div>
    `,
  })
}

// Send auto-reply to person who contacted
export async function sendContactAutoReply({
  name,
  email,
}: {
  name: string
  email: string
}) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Message received — Kehinde Oyekunle',
    html: `
      <div style="background:#02040a;color:#f0f4f8;padding:40px;font-family:monospace;">
        <div style="border:1px solid rgba(0,245,255,0.3);padding:30px;max-width:600px;">
          <h2 style="color:#00f5ff;letter-spacing:3px;margin-bottom:20px;">// MESSAGE RECEIVED</h2>
          <p>Hi ${name},</p>
          <p style="margin-top:15px;color:rgba(240,244,248,0.7);">
            Thanks for reaching out. I've received your message and will get back to you within 24 hours.
          </p>
          <p style="margin-top:20px;color:rgba(240,244,248,0.7);">
            In the meantime, feel free to connect with me on LinkedIn.
          </p>
          <div style="margin-top:30px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.07);">
            <p style="color:#00f5ff;">Kehinde Oyekunle</p>
            <p style="color:rgba(240,244,248,0.4);font-size:12px;">DevOps & SRE Engineer</p>
            <p style="color:rgba(240,244,248,0.4);font-size:12px;">buildwithkayai.com</p>
          </div>
        </div>
      </div>
    `,
  })
}

// Send subscription confirmation
export async function sendSubscriptionConfirmation({
  email,
  confirmUrl,
}: {
  email: string
  confirmUrl: string
}) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Confirm your subscription — BuildWithKayAI LOGS',
    html: `
      <div style="background:#02040a;color:#f0f4f8;padding:40px;font-family:monospace;">
        <div style="border:1px solid rgba(0,245,255,0.3);padding:30px;max-width:600px;">
          <h2 style="color:#00f5ff;letter-spacing:3px;margin-bottom:20px;">// CONFIRM SUBSCRIPTION</h2>
          <p>You're one step away from receiving updates from Kehinde's LOGS.</p>
          <p style="margin-top:15px;color:rgba(240,244,248,0.7);">
            Click below to confirm your subscription:
          </p>
          <a href="${confirmUrl}" 
             style="display:inline-block;margin-top:25px;background:#00f5ff;color:#02040a;padding:14px 30px;text-decoration:none;font-weight:700;letter-spacing:2px;">
            CONFIRM SUBSCRIPTION →
          </a>
          <p style="margin-top:25px;color:rgba(240,244,248,0.4);font-size:12px;">
            If you didn't subscribe, ignore this email. Link expires in 24 hours.
          </p>
        </div>
      </div>
    `,
  })
}

// Send new post notification to all subscribers
export async function sendNewPostNotification({
  email,
  postTitle,
  postExcerpt,
  postUrl,
  unsubscribeUrl,
}: {
  email: string
  postTitle: string
  postExcerpt: string
  postUrl: string
  unsubscribeUrl: string
}) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `New LOG: ${postTitle}`,
    html: `
      <div style="background:#02040a;color:#f0f4f8;padding:40px;font-family:monospace;">
        <div style="border:1px solid rgba(0,245,255,0.3);padding:30px;max-width:600px;">
          <p style="color:#00f5ff;font-size:12px;letter-spacing:3px;margin-bottom:20px;">// NEW LOG ENTRY</p>
          <h2 style="font-size:1.4rem;margin-bottom:15px;line-height:1.3;">${postTitle}</h2>
          <p style="color:rgba(240,244,248,0.6);line-height:1.7;margin-bottom:25px;">${postExcerpt}</p>
          <a href="${postUrl}" 
             style="display:inline-block;background:#00f5ff;color:#02040a;padding:12px 28px;text-decoration:none;font-weight:700;letter-spacing:2px;">
            READ FULL POST →
          </a>
          <div style="margin-top:40px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.07);">
            <p style="color:#00f5ff;">Kehinde Oyekunle</p>
            <p style="color:rgba(240,244,248,0.4);font-size:12px;">buildwithkayai.com</p>
            <a href="${unsubscribeUrl}" style="color:rgba(240,244,248,0.3);font-size:11px;">Unsubscribe</a>
          </div>
        </div>
      </div>
    `,
  })
}
