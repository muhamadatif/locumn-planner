'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'

type FormType = 'client' | 'clinician' | 'contact'

export function FormShell({ type }: { type: FormType }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const isClient = type === 'client'
  const isClinician = type === 'clinician'

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    setStatus('submitting')
    setMessage('')
    try {
      const data = new FormData(form)
      data.append('type', type)
      const res = await fetch('/api/contact', { method: 'POST', body: data })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(json?.error || 'Something went wrong. Please try again.')
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-accent/30 bg-accent/5 p-8 text-center" role="status" aria-live="polite">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Check aria-hidden="true" />
        </div>
        <h2 className="mt-5 text-2xl font-semibold text-primary">Thank you — we&apos;ve received your details.</h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-muted-foreground">
          A member of the Locum Planner team will review your message and be in touch using the details provided.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-semibold text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  const inputCls =
    'rounded-xl border border-border bg-muted/40 px-4 py-3 font-normal text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20'

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-9"
      aria-labelledby="form-heading"
    >
      <h2 id="form-heading" className="sr-only">
        {isClient ? 'Submit a vacancy' : isClinician ? 'Register as a clinician' : 'Contact form'}
      </h2>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold text-foreground/90">
          Full name
          <input required name="name" type="text" autoComplete="name" className={inputCls} />
        </label>

        {isClient ? (
          <label className="flex flex-col gap-2 text-sm font-semibold text-foreground/90">
            Organisation name
            <input required name="organisation" type="text" autoComplete="organization" className={inputCls} />
          </label>
        ) : (
          <label className="flex flex-col gap-2 text-sm font-semibold text-foreground/90">
            Email address
            <input required name="email" type="email" autoComplete="email" className={inputCls} />
          </label>
        )}

        {isClient ? (
          <label className="flex flex-col gap-2 text-sm font-semibold text-foreground/90">
            Work email
            <input required name="email" type="email" autoComplete="email" className={inputCls} />
          </label>
        ) : (
          <label className="flex flex-col gap-2 text-sm font-semibold text-foreground/90">
            Telephone number
            <input name="phone" type="tel" autoComplete="tel" className={inputCls} />
          </label>
        )}

        {isClient ? (
          <label className="flex flex-col gap-2 text-sm font-semibold text-foreground/90">
            Telephone number
            <input name="phone" type="tel" autoComplete="tel" className={inputCls} />
          </label>
        ) : isClinician ? (
          <label className="flex flex-col gap-2 text-sm font-semibold text-foreground/90">
            Clinical profession
            <input required name="profession" type="text" className={inputCls} />
          </label>
        ) : (
          <label className="flex flex-col gap-2 text-sm font-semibold text-foreground/90">
            Enquiry type
            <input name="enquiry" type="text" className={inputCls} />
          </label>
        )}

        {isClient && (
          <label className="flex flex-col gap-2 text-sm font-semibold text-foreground/90">
            Organisation type
            <select required name="organisationType" className={inputCls}>
              <option value="">Select an option</option>
              <option>NHS organisation</option>
              <option>Independent provider</option>
              <option>Care organisation</option>
              <option>Other</option>
            </select>
          </label>
        )}

        {isClinician && (
          <>
            <label className="flex flex-col gap-2 text-sm font-semibold text-foreground/90">
              Specialism
              <input name="specialism" type="text" className={inputCls} />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-foreground/90">
              Preferred work type
              <select name="workType" className={inputCls}>
                <option>Locum</option>
                <option>Temporary</option>
                <option>Contract</option>
                <option>Permanent</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-foreground/90 md:col-span-2">
              CV upload
              <input
                required
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                className="rounded-xl border border-border bg-muted/40 px-4 py-2.5 font-normal file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary-foreground"
              />
            </label>
          </>
        )}

        {isClient && (
          <>
            <label className="flex flex-col gap-2 text-sm font-semibold text-foreground/90">
              Clinical role required
              <input required name="role" type="text" className={inputCls} />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-foreground/90">
              Location or postcode
              <input required name="location" type="text" className={inputCls} />
            </label>
          </>
        )}

        <label className="flex flex-col gap-2 text-sm font-semibold text-foreground/90 md:col-span-2">
          {isClient ? 'Additional details' : isClinician ? 'Additional information' : 'Message'}
          <textarea required name="message" rows={5} className={`${inputCls} resize-y`} />
        </label>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-muted-foreground">
        <input required type="checkbox" name="consent" className="mt-1 accent-accent" />
        I acknowledge the privacy notice and consent to Locum Planner using my details to respond to this enquiry.
      </label>

      {isClinician && (
        <label className="mt-3 flex items-start gap-3 text-sm leading-6 text-muted-foreground">
          <input type="checkbox" name="updates" className="mt-1 accent-accent" />
          I would like to hear about relevant opportunities and recruitment updates.
        </label>
      )}

      {status === 'error' && (
        <p className="mt-4 text-sm font-medium text-destructive" role="alert" aria-live="assertive">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-foreground transition hover:bg-accent/90 disabled:opacity-60"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : isClient ? (
          'Submit Vacancy'
        ) : isClinician ? (
          'Register as a Clinician'
        ) : (
          'Send Enquiry'
        )}
        {status !== 'submitting' && <ArrowRight className="ml-2 size-4" aria-hidden="true" />}
      </button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        We will only use your details to respond to this enquiry.
      </p>
    </form>
  )
}
