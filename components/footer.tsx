import Link from 'next/link'
import { Logo } from '@/components/logo'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <div className="mb-5 inline-block rounded-xl bg-white p-3">
            <Logo />
          </div>
          <p className="max-w-xs text-sm leading-7 text-white/70">
            Healthcare recruitment, made simpler. Connecting organisations and healthcare professionals across the UK.
          </p>
        </div>
        <div>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-accent/90">Explore</h3>
          <div className="flex flex-col gap-3 text-sm text-white/75">
            <Link href="/about" className="hover:text-white">About Us</Link>
            <Link href="/for-clients" className="hover:text-white">For Clients</Link>
            <Link href="/for-clinicians" className="hover:text-white">For Clinicians</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-accent/90">Get started</h3>
          <div className="flex flex-col gap-3 text-sm text-white/75">
            <Link href="/for-clients" className="hover:text-white">Submit a Vacancy</Link>
            <Link href="/for-clinicians" className="hover:text-white">Register as a Clinician</Link>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-white/50 lg:flex-row lg:justify-between lg:px-8">
          <span>© {new Date().getFullYear()} Locum Planner. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
