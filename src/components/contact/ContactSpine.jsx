import AboutIndex from "@/components/about/AboutIndex";
import ContactForm from "./ContactForm";
import ContactOffices from "./ContactOffices";

const ICONS = {
  phone: <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2.5 2.5 0 0 1-2.8 2.5C10.6 19.3 4.7 13.4 4 5.8A2.5 2.5 0 0 1 6.5 3Z" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6 8.5-6" /></>,
  chat: <path d="M12 4c4.7 0 8.5 3.1 8.5 7s-3.8 7-8.5 7c-1 0-2-.1-2.9-.4L4.5 19l1.2-3.6C4.4 14.3 3.5 12.7 3.5 11c0-3.9 3.8-7 8.5-7Z" />,
};

const EYEBROW = "m-0 font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/60";

function Routes({ s }) {
  return (
    <ul data-testid="contact-us-routes" className="m-0 mt-10 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {s.items.map((r) => (
        <li key={r.k}>
          <a href={r.href} data-testid="contact-us-route-item"
            className="group flex h-full min-h-[250px] flex-col gap-2 border border-[#1c1a17]/10 bg-white p-8 transition-colors duration-300 hover:border-[#1c1a17]/60">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.3"
              strokeLinejoin="round" aria-hidden="true" className="text-[#1c1a17]/70">
              {ICONS[r.icon]}
            </svg>
            <p className={`${EYEBROW} mt-5`}>{r.k}</p>
            <p className="m-0 font-serif text-[28px] font-light text-[#111]">{r.v}</p>
            {r.m && <p className="m-0 mt-4 text-[14px] text-[#1c1a17]/65">{r.m}</p>}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Contacts({ s }) {
  return (
    <>
      <ul data-testid="contact-us-other" className="m-0 mt-10 list-none border-t border-[#1c1a17]/15 p-0">
        {s.items.map((c) => (
          <li key={c.title} className="border-b border-[#1c1a17]/10">
            <a href={c.href} className="group grid grid-cols-[1fr_auto] items-center gap-6 py-8">
              <div>
                <p className={`${EYEBROW} text-[9px]`}>{c.k}</p>
                <h3 className="mb-0 mt-2 font-serif text-[26px] font-light text-[#111]">{c.title}</h3>
                <p className="mb-0 mt-3 max-w-[640px] text-[13.5px] leading-[1.6] text-[#1c1a17]/65">
                  {c.text} {c.email && <span className="text-[#1c1a17]/80">{c.email}</span>}
                </p>
              </div>
              <span aria-hidden="true"
                className="flex size-[34px] items-center justify-center rounded-full border border-[#1c1a17]/40 transition-colors group-hover:bg-[#111] group-hover:text-white">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </li>
        ))}
      </ul>

      {s.scam && (
        <aside data-testid="contact-us-scam-alert" className="mt-10 border border-[#1c1a17]/10 border-l-2 border-l-[#8b2c23] bg-white p-8 sm:px-10">
          <h3 className="m-0 font-serif text-[26px] font-light text-[#111]">{s.scam.title}</h3>
          <p className="mb-0 mt-4 max-w-[560px] text-[14px] leading-[1.7] text-[#1c1a17]/70">{s.scam.text}</p>
          <a href={s.scam.href}
            className="mt-6 inline-flex h-[40px] items-center border border-[#111] px-6 font-nav text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-[#111] hover:text-white">
            {s.scam.label}
          </a>
        </aside>
      )}
    </>
  );
}

const RENDER = {
  routes: Routes,
  form: ({ s }) => <ContactForm data={s} />,
  offices: ({ s }) => <ContactOffices data={s} />,
  contacts: Contacts,
};

export default function ContactSpine({ data }) {
  const { indexLabel, sections } = data;
  const items = sections.map(({ id, n, nav }) => ({ id, n, nav }));

  return (
    <div data-testid="contact-us-spine" className="px-[clamp(20px,4vw,64px)] pb-24 text-[#1c1a17] lg:px-[max(5vw,32px)]">
      <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-[5vw]">
        <AboutIndex label={indexLabel} items={items} />
        <div data-testid="contact-us-section-list" className="min-w-0 lg:max-w-[1050px]">
          {sections.map((s) => {
            const Body = RENDER[s.type];
            if (!Body) return null;
            return (
              <section key={s.id} id={s.id} data-testid="contact-us-section"
                className="scroll-mt-[calc(var(--hdr-h)+24px)] border-t border-[#1c1a17]/10 py-14 first:border-t-0 first:pt-0 sm:py-20 sm:first:pt-0">
                <p className="m-0 font-nav text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1c1a17]/65">{s.label}</p>
                <h2 className="mb-0 mt-5 font-serif text-[34px] font-light leading-[1.15] text-[#111] sm:text-[44px]">{s.title}</h2>
                {s.text && <p className="mb-0 mt-5 max-w-[560px] text-[16px] leading-[1.6] text-[#1c1a17]/70">{s.text}</p>}
                <Body s={s} />
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}