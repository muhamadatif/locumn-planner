import Image from 'next/image'
import Link from 'next/link'

export function Logo({ priority = false }: { priority?: boolean }) {
  return (
    <Image
      src="/locum-planner-logo.png"
      alt="Locum Planner"
      width={260}
      height={104}
      className="h-auto w-[180px] object-contain md:w-[210px]"
      priority={priority}
    />
  )
}

export function BrandMark() {
  return (
    <Link href="/" aria-label="Locum Planner home" className="inline-flex items-center">
      <Logo priority />
    </Link>
  )
}
