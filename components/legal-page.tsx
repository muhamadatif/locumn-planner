import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-3xl px-5 py-16 lg:py-24">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Draft for legal review</p>
        <h1 className="mt-4 text-4xl font-semibold text-primary md:text-5xl">
          {kind === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
        </h1>
        <p className="mt-5 text-muted-foreground">
          This initial draft is provided as a starting point and must be reviewed and completed with the appropriate legal, business and contact details before launch.
        </p>
        <div className="prose prose-slate mt-12 max-w-none text-foreground/90">
          <h2>Important information</h2>
          <p>
            Locum Planner should publish clear information about who operates this website, how personal data is used, retention periods, individual rights, cookies, and how to make a complaint.
          </p>
          <h2>Before launch</h2>
          <p>
            Add the registered business details, official contact address, designated privacy contact, complaint route, and any recruitment-specific terms that apply to the services offered.
          </p>
          <h2>Contact</h2>
          <p>Official business contact details are intentionally not invented in this first version. Please add the approved details before publishing.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
