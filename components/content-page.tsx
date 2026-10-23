'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Reveal } from '@/components/reveal'
import { FormShell } from '@/components/form-shell'
import { Check } from 'lucide-react'

type ContentType = 'about' | 'client' | 'clinician' | 'contact'

export function ContentPage({ type }: { type: ContentType }) {
  const client = type === 'client'
  const clinician = type === 'clinician'
  const contact = type === 'contact'
  const about = type === 'about'

  const title = client
    ? 'Healthcare staffing starts here.'
    : clinician
    ? 'Your next opportunity starts here.'
    : contact
    ? "Let's start a conversation."
    : 'Bringing healthcare organisations and professionals together.'

  const intro = client
    ? 'Tell us about your staffing requirements and let our team understand the support you need.'
    : clinician
    ? 'Register your details, experience and preferences so we can understand which opportunities may suit you.'
    : contact
    ? 'Have a question or want to explore how we can help? Send us a message and our team will get back to you.'
    : 'Locum Planner exists to make healthcare recruitment more straightforward, more considered and easier to navigate.'

  const bullets = contact
    ? ['Clear, helpful communication', 'A considered response from our team', 'Your information handled responsibly']
    : client
    ? ['A clear way to share your requirement', 'A practical conversation about next steps', 'No need to navigate a job board']
    : ['Share your experience and preferences', 'Tell us where and how you would like to work', 'Stay in control of future conversations']

  return (
    <>
      <Header />
      <main id="main">
        <section className="bg-muted/40">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                {contact ? 'Contact Locum Planner' : clinician ? 'For clinicians' : client ? 'For healthcare organisations' : 'About Locum Planner'}
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-primary md:text-6xl">{title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{intro}</p>
            </Reveal>
          </div>
        </section>

        {about ? (
          <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Our approach</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-primary md:text-4xl">
                Recruitment that starts with understanding.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex flex-col gap-6 leading-8 text-muted-foreground">
                <p>Locum Planner connects healthcare organisations looking for support with healthcare professionals looking for their next opportunity.</p>
                <p>We focus on making the first steps simple: clear information, thoughtful conversations and a recruitment process that respects the time of everyone involved.</p>
                <p>Final legal and business details are to be confirmed before launch.</p>
              </div>
            </Reveal>
          </section>
        ) : (
          <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:px-8 lg:py-24">
            <Reveal>
              <h2 className="text-2xl font-semibold text-primary md:text-3xl">
                {contact ? 'We are here to help.' : client ? 'Share the detail that matters.' : 'A registration built around you.'}
              </h2>
              <p className="mt-5 leading-8 text-muted-foreground">
                {contact
                  ? 'Use the form to tell us a little about your enquiry. Please do not include confidential patient information.'
                  : client
                  ? 'The more context you can share, the better our team can understand your requirement. There is no need to have every detail finalised before you get in touch.'
                  : 'Registration is a first conversation, not a promise of work. It helps us understand your experience, preferences and availability so we can contact you when a relevant opportunity arises.'}
              </p>
              <div className="mt-8 flex flex-col gap-4">
                {bullets.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-foreground/90">
                    <Check className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <FormShell type={contact ? 'contact' : client ? 'client' : 'clinician'} />
            </Reveal>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
