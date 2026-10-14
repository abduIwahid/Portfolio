'use client';
import { FormEvent, useState } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle, Send } from 'lucide-react';

type State = { status: 'idle' | 'sending' | 'success' | 'error'; message: string };
export function ContactForm({ enabled }: { enabled: boolean }) {
  const [state, setState] = useState<State>({ status: 'idle', message: '' });
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setState({ status: 'sending', message: 'Sending your message…' });
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: data.get('name'), email: data.get('email'), message: data.get('message'), website: data.get('website') }) });
      const result = await response.json() as { ok?: boolean; message?: string; error?: { message?: string } };
      if (!response.ok || !result.ok) throw new Error(result.error?.message || 'Message could not be sent. Please use direct email instead.');
      setState({ status: 'success', message: result.message || 'Message sent successfully.' }); form.reset();
    } catch (error) { setState({ status: 'error', message: error instanceof Error ? error.message : 'Something went wrong. Please use direct email instead.' }); }
  }
  if (!enabled) return <div className="form-not-configured"><p className="eyebrow">Direct contact</p><h3>Email delivery is not configured yet.</h3><p>The form stays disabled until a verified email provider is connected. Use either address to reach me directly.</p><span className="form-note">No message is stored or sent by this page in the current configuration.</span></div>;
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-row"><label>Name<input name="name" autoComplete="name" required minLength={2} maxLength={80} placeholder="Your name" /></label><label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label></div>
    <label>Message<textarea name="message" rows={5} required minLength={10} maxLength={3000} placeholder="A little context about what you have in mind…" /></label>
    <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="form-actions"><button className="button button-primary" type="submit" disabled={state.status === 'sending'}>{state.status === 'sending' ? <LoaderCircle size={17} className="spin" /> : <Send size={16} />} {state.status === 'sending' ? 'Sending' : 'Send message'} <ArrowUpRight size={16} /></button><p className={`form-status ${state.status}`} aria-live="polite">{state.status === 'success' && <CheckCircle2 size={15} />}{state.message}</p></div>
  </form>;
}
