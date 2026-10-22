'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Logo } from '@/components/logo'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'For Clients', href: '/for-clients' },
  { label: 'For Clinicians', href: '/for-clinicians' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" aria-label="Locum Planner home" className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary focus-visible:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/for-clinicians"
            className="text-sm font-semibold text-primary hover:text-accent"
          >
            Register as a Clinician
          </Link>
          <Link
            href="/for-clients"
            className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition hover:bg-accent/90 focus-visible:ring-2 focus-visible:ring-accent"
          >
            Submit a Vacancy <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </Link>
        </div>
        <button
          type="button"
          className="rounded-lg p-2 text-primary lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          ref={panelRef}
          className="border-t border-border bg-background px-5 pb-6 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-3 pt-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-base font-medium text-foreground/80 hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/for-clients"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-accent px-5 py-3 text-center font-semibold text-accent-foreground"
            >
              Submit a Vacancy
            </Link>
            <Link
              href="/for-clinicians"
              onClick={() => setOpen(false)}
              className="text-center font-semibold text-primary"
            >
              Register as a Clinician
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
