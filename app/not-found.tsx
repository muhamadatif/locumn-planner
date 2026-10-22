import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-3xl px-5 py-24 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-primary">Page not found</h1>
        <p className="mt-4 text-muted-foreground">The page you are looking for does not exist or has moved.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground">
          Back to home
        </Link>
      </main>
      <Footer />
    </>
  )
}
