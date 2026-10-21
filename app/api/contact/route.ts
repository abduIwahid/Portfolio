import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(0).optional().default('')
}).strict();
const windows = new Map<string, { count: number; resetAt: number }>();
function getClientKey(request: NextRequest): string {
  // Use a platform-provided client address when available; never log form contents.
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}
function rateLimited(key: string): boolean {
  const now = Date.now(); const current = windows.get(key);
  if (!current || current.resetAt <= now) { windows.set(key, { count: 1, resetAt: now + 10 * 60 * 1000 }); return false; }
  current.count += 1; return current.count > 5;
}
export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL || process.env.CONTACT_FORM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) return NextResponse.json({ error: { code: 'CONTACT_NOT_CONFIGURED', message: 'Email delivery is not configured. Please use one of the direct email links.' } }, { status: 503 });
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 12000) return NextResponse.json({ error: { code: 'PAYLOAD_TOO_LARGE', message: 'Your message is too large. Please shorten it and try again.' } }, { status: 413 });
  const key = getClientKey(request);
  if (rateLimited(key)) return NextResponse.json({ error: { code: 'RATE_LIMITED', message: 'Too many messages from this connection. Please try again later or email me directly.' } }, { status: 429 });
  let raw: unknown;
  try { raw = await request.json(); } catch { return NextResponse.json({ error: { code: 'INVALID_JSON', message: 'Please check the form and try again.' } }, { status: 400 }); }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: { code: 'VALIDATION_ERROR', message: 'Please check the name, email, and message fields.' } }, { status: 400 });
  const resend = new Resend(apiKey);
  const cc = process.env.CONTACT_CC_EMAIL?.trim();
  try {
    const result = await resend.emails.send({
      from,
      to: to.split(',').map((value) => value.trim()).filter(Boolean),
      ...(cc ? { cc: cc.split(',').map((value) => value.trim()).filter(Boolean) } : {}),
      replyTo: parsed.data.email,
      subject: `Portfolio message from ${parsed.data.name}`,
      text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\n\n${parsed.data.message}`
    });
    if (result.error) {
      console.error('Resend send error:', JSON.stringify(result.error));
      throw new Error('Email provider returned an error');
    }
    return NextResponse.json({ ok: true, message: 'Your message has been sent.' });
  } catch (err) {
    console.error('Contact delivery failed:', err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { code: 'DELIVERY_FAILED', message: 'Message delivery failed. Please email me directly instead.' } }, { status: 500 });
  }
}
