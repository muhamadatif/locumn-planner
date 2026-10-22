import Image from 'next/image'
import Link from 'next/link'
// Icons are inlined to keep this page a server component.
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Reveal } from '@/components/reveal'
import { FeatureGrid, AudienceCards, HowItWorks, CTA } from '@/components/sections'

export const metadata = {
  title: 'Home',
  description: 'Locum Planner connects healthcare organisations with healthcare professionals across the UK.',
}

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Locum Planner',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://locumplanner.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://locumplanner.com'}/locum-planner-logo.png`,
    description: 'Healthcare recruitment, made simpler. Connecting healthcare organisations with healthcare professionals across the UK.',
    parentOrganization: { '@type': 'Organization', name: 'Locum GNC' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <section className="overflow-hidden bg-muted/40">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
            <Reveal>
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-accent">UK healthcare recruitment</p>
              <h1 className="max-w-xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-primary md:text-7xl">
                Healthcare recruitment, <span className="text-accent">made simpler.</span>
              </h1>
              <p className="mt-7 max-w-lg text-lg leading-8 text-muted-foreground">
                Connecting healthcare organisations with healthcare professionals across the UK. Tell us what you need, or register with us to explore opportunities that match your experience.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/for-clients"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3.5 text-center font-semibold text-accent-foreground transition hover:bg-accent/90"
                >
                  Submit a Vacancy{' '}
                  <svg className="ml-2 size-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
                <Link
                  href="/for-clinicians"
                  className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-white px-6 py-3.5 text-center font-semibold text-primary transition hover:border-accent hover:text-accent"
                >
                  Register as a Clinician
                </Link>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                <svg className="mr-2 inline size-4 text-accent" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
                Supporting organisations and professionals across the UK.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative">
                <div className="absolute -right-5 -top-5 size-32 rounded-full bg-accent/15" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-[2rem] bg-primary p-3 shadow-xl shadow-primary/10">
                  <Image
                    src="/hero.jpg"
                    alt="Healthcare professionals working together"
                    width={900}
                    height={680}
                    className="aspect-[4/3] rounded-[1.4rem] object-cover"
                    priority
                  />
                  <div className="absolute bottom-6 left-6 rounded-2xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">A better way to connect</p>
                    <p className="mt-1 text-sm font-semibold text-primary">Organisations and professionals, brought together.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        <AudienceCards />
        <FeatureGrid />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
