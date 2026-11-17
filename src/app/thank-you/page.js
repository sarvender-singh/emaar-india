// src/app/contact-us/thank-you/page.js
import Link from "next/link";

export const metadata = {
  title: "Thank you",
  robots: { index: false, follow: false }, // Google mein index nahi hoga
};

const BTN =
  "inline-flex h-[60px] items-center justify-center px-7 font-nav text-[12px] font-bold uppercase tracking-[0.2em] transition-colors duration-300";
const SOLID = `${BTN} border border-[#111] bg-[#111] text-white hover:bg-transparent hover:text-[#111]`;
const OUTLINE = `${BTN} border border-[#1c1a17]/60 text-[#1c1a17] hover:bg-[#111] hover:text-white`;

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Thank you" },
];

export default function ThankYouPage() {
  return (
    <main id="main-content" data-testid="contact-thank-you-page" className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]">
      <section aria-labelledby="thank-you-title"
        className="px-[clamp(20px,4vw,64px)] pb-24 pt-10 text-[#1c1a17] sm:pb-32 lg:px-[max(5vw,32px)]">
        <nav aria-label="Breadcrumb">
          <ol className="m-0 flex list-none flex-wrap items-center gap-2.5 p-0 font-nav text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/65">
            {crumbs.map((b, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={b.label} className="flex items-center gap-2.5">
                  {b.href && !last ? <Link href={b.href} className="hover:text-[#1c1a17]">{b.label}</Link>
                    : <span aria-current={last ? "page" : undefined}>{b.label}</span>}
                  {!last && <span aria-hidden="true" className="opacity-50">/</span>}
                </li>
              );
            })}
          </ol>
        </nav>

        <hr className="mb-0 mt-16 h-px border-0 bg-[#111] sm:mt-20" />

        <div className="mt-14 grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-[5vw]">
          <div>
            <p className="m-0 font-nav text-[12px] font-semibold uppercase tracking-[0.3em] text-[#1c1a17]/65">Enquiry received</p>
            <dl className="m-0 mt-8 flex flex-col">
              <div className="border-b border-[#1c1a17]/10 py-4 first:pt-0">
                <dt className="font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/60">Toll free within the UAE, 24/7</dt>
                <dd className="m-0 mt-2 text-[15px]">
                  <a href="tel:80036227" className="border-b border-[#1c1a17]/30 pb-[1px] hover:border-[#1c1a17]">800 EMAAR (36227)</a>
                </dd>
              </div>
              <div className="border-b border-[#1c1a17]/10 py-4">
                <dt className="font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/60">From outside the UAE</dt>
                <dd className="m-0 mt-2 text-[15px]">
                  <a href="tel:+97143661688" className="border-b border-[#1c1a17]/30 pb-[1px] hover:border-[#1c1a17]">+971 4 366 1688</a>
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h1 id="thank-you-title"
              className="m-0 font-serif text-[44px] font-light leading-[1.05] text-[#111] sm:text-[64px] lg:text-[76px]">
              Thank you.
            </h1>
            <p className="mb-0 mt-8 max-w-[780px] text-[18px] leading-[1.6] text-[#1c1a17]/70 sm:text-[22px]">
              Your enquiry has been sent. A member of the Emaar team will get back to you shortly.
              For a faster answer, call 800 EMAAR (36227).
            </p>
            <div className="mt-14 flex flex-wrap gap-4">
              <Link href="/" className={SOLID}>Back to home</Link>
              <Link href="/contact-us" className={OUTLINE}>Contact us</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}