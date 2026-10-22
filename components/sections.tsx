'use client'

import Link from 'next/link'
import { ArrowRight, Check, ClipboardList, HeartHandshake, MessageCircle, Stethoscope, Users } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const features = [
  { icon: ClipboardList, title: 'Straightforward registration', text: 'A clear first step, whether you are sharing a staffing need or exploring your next opportunity.' },
  { icon: MessageCircle, title: 'Clear communication', text: 'We keep conversations focused, practical and easy to follow throughout the process.' },
  { icon: Users, title: 'Suitable candidate matching', text: 'We take time to understand requirements and experience before discussing potential fit.' },
  { icon: HeartHandshake, title: 'Support throughout', text: 'A human point of contact to help you understand the next step at every stage.' },
]

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8" aria-labelledby="features-heading">
      <Reveal>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Why Locum Planner</p>
        <h2 id="features-heading" className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-primary md:text-4xl">
          Recruitment that starts with understanding.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 80}>
            <article className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <f.icon aria-hidden="true" className="size-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-primary">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{f.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function AudienceCards() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8" aria-labelledby="audience-heading">
      <Reveal>
        <h2 id="audience-heading" className="sr-only">Choose your path</h2>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal>
          <Link
            href="/for-clients"
            className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl md:p-9"
          >
            <div className="flex items-start justify-between">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ClipboardList aria-hidden="true" className="size-7" />
              </div>
              <ArrowRight className="text-accent transition group-hover:translate-x-1" aria-hidden="true" />
            </div>
            <h3 className="mt-10 text-2xl font-semibold text-primary">Find the right people for your team</h3>
            <p className="mt-3 max-w-md leading-7 text-muted-foreground">
              Tell us about your staffing requirements and let our recruitment team understand the support you need.
            </p>
            <span className="mt-8 inline-flex items-center text-sm font-semibold text-accent">
              Submit a Vacancy <ArrowRight className="ml-1 size-4" aria-hidden="true" />
            </span>
          </Link>
        </Reveal>
        <Reveal delay={100}>
          <Link
            href="/for-clinicians"
            className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl md:p-9"
          >
            <div className="flex items-start justify-between">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <Stethoscope aria-hidden="true" className="size-7" />
              </div>
              <ArrowRight className="text-accent transition group-hover:translate-x-1" aria-hidden="true" />
            </div>
            <h3 className="mt-10 text-2xl font-semibold text-primary">Find opportunities that fit you</h3>
            <p className="mt-3 max-w-md leading-7 text-muted-foreground">
              Register your experience, preferences and availability so our team can understand which opportunities may be suitable for you.
            </p>
            <span className="mt-8 inline-flex items-center text-sm font-semibold text-accent">
              Register as a Clinician <ArrowRight className="ml-1 size-4" aria-hidden="true" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export function HowItWorks() {
  const steps = [
    ['01', 'Tell us what you need', 'Share your staffing needs, experience or availability with our team.'],
    ['02', 'We review the detail', 'We take time to understand the context behind your requirements.'],
    ['03', 'Take the next step', 'We will be in touch when there is a suitable way forward.'],
  ] as const
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8" aria-labelledby="how-heading">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">How it works</p>
          <h2 id="how-heading" className="mt-3 text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            A clear process from the start.
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            Good recruitment starts with understanding. We make it easy to share what you need and what matters to you.
          </p>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map(([n, title, text], i) => (
            <Reveal key={n} delay={i * 100}>
              <div className="border-t-2 border-accent pt-5">
                <span className="text-sm font-bold text-accent">{n}</span>
                <h3 className="mt-4 font-semibold text-primary">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTA() {
  return (
    <section className="mx-5 mb-20 overflow-hidden rounded-[2rem] bg-primary lg:mx-auto lg:max-w-7xl" aria-labelledby="cta-heading">
      <div className="relative px-7 py-14 md:px-14 md:py-16">
        <div className="absolute -right-10 -top-20 size-64 rounded-full border-[32px] border-accent/20" aria-hidden="true" />
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent/90">Start a conversation</p>
          <h2 id="cta-heading" className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Let&apos;s find the right fit.
          </h2>
          <p className="mt-4 max-w-xl leading-7 text-white/70">
            Whether you need healthcare staff or are looking for your next opportunity, Locum Planner is here to help you take the next step.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/for-clients"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-center font-semibold text-accent-foreground transition hover:bg-accent/90"
            >
              Submit a Vacancy <ArrowRight className="ml-2 size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/for-clinicians"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-center font-semibold text-white transition hover:border-white/60"
            >
              Register as a Clinician
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}


