import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type FormType = 'client' | 'clinician' | 'contact'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function str(fd: FormData, key: string) {
  const v = fd.get(key)
  return typeof v === 'string' ? v.trim() : ''
}

export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY
  const senderEmail = process.env.BREVO_SENDER_EMAIL
  const senderName = process.env.BREVO_SENDER_NAME || 'Locum Planner'
  const recipient = process.env.BREVO_RECIPIENT_EMAIL

  if (!apiKey || !senderEmail || !recipient) {
    return NextResponse.json(
      { error: 'Email service is not configured. Please contact the site owner.' },
      { status: 503 }
    )
  }

  let fd: FormData
  try {
    fd = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 })
  }

  const type = (str(fd, 'type') || 'contact') as FormType
  if (!['client', 'clinician', 'contact'].includes(type)) {
    return NextResponse.json({ error: 'Invalid form type.' }, { status: 400 })
  }

  const name = str(fd, 'name')
  const email = str(fd, 'email')
  const phone = str(fd, 'phone')
  const message = str(fd, 'message')

  if (!name) return NextResponse.json({ error: 'Full name is required.' }, { status: 400 })
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
  if (!message) return NextResponse.json({ error: 'Message is required.' }, { status: 400 })

  const consent = str(fd, 'consent')
  if (consent !== 'on') {
    return NextResponse.json({ error: 'Consent is required.' }, { status: 400 })
  }

  // Build details
  const details: [string, string][] = []
  const add = (label: string, value: string) => {
    if (value) details.push([label, value])
  }
  add('Full name', name)
  add('Email', email)
  add('Phone', phone)

  if (type === 'client') {
    add('Organisation', str(fd, 'organisation'))
    add('Organisation type', str(fd, 'organisationType'))
    add('Clinical role required', str(fd, 'role'))
    add('Location / postcode', str(fd, 'location'))
  } else if (type === 'clinician') {
    add('Clinical profession', str(fd, 'profession'))
    add('Specialism', str(fd, 'specialism'))
    add('Preferred work type', str(fd, 'workType'))
    add('Updates opt-in', str(fd, 'updates') === 'on' ? 'Yes' : 'No')
  } else {
    add('Enquiry type', str(fd, 'enquiry'))
  }

  const subject =
    type === 'client'
      ? `New vacancy submission — ${name}`
      : type === 'clinician'
      ? `New clinician registration — ${name}`
      : `New contact enquiry — ${name}`

  const rows = details
    .map(([label, value]) => `<tr><td style="padding:6px 12px;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 12px;">${escapeHtml(value)}</td></tr>`)
    .join('')

  const htmlContent = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
      <h2 style="color:#0b2b55;">${escapeHtml(subject)}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px;">${rows}</table>
      <h3 style="color:#0b2b55;margin-top:16px;">Message</h3>
      <p style="white-space:pre-wrap;line-height:1.6;">${escapeHtml(message)}</p>
    </div>
  `.trim()

  const textContent = `${subject}\n\n${details.map(([l, v]) => `${l}: ${v}`).join('\n')}\n\nMessage:\n${message}`

  const payload: Record<string, unknown> = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email: recipient }],
    replyTo: { email, name },
    subject,
    htmlContent,
    textContent,
  }

  // Attachment (CV)
  const file = fd.get('cv')
  if (file instanceof File && file.size > 0) {
    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    payload.attachment = [
      {
        name: file.name,
        content: base64,
      },
    ]
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Brevo error:', res.status, errText)
      return NextResponse.json(
        { error: 'Unable to send your message right now. Please try again later.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Brevo request failed:', err)
    return NextResponse.json(
      { error: 'Unable to send your message right now. Please try again later.' },
      { status: 502 }
    )
  }
}
