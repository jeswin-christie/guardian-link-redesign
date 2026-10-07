import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="panel notfound">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="h2 h2--xl">This page can’t be found.</h1>
        <div className="btn-row btn-row--center">
          <Link href="/" className="btn btn--cta">Back to home</Link>
          <Link href="/support/" className="ulink">Support</Link>
        </div>
      </div>
    </section>
  );
}
