import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap flex flex-col items-start gap-6 py-24">
      <p className="label">404 · page not found</p>
      <h1 className="display text-[clamp(40px,5vw,72px)]">This page has moved or doesn't exist.</h1>
      <p className="max-w-[56ch] text-lg text-ink-soft">Try one of these instead.</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="btn btn-navy">
          Home
        </Link>
        <Link href="/services" className="btn btn-outline">
          Services
        </Link>
        <Link href="/projects" className="btn btn-outline">
          Projects
        </Link>
        <Link href="/request-a-quote" className="btn btn-red">
          Request a quote
        </Link>
      </div>
    </section>
  );
}
