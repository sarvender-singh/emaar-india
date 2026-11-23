import CareersForm from "./CareersForm";

export default function CareersBody({ quote, body, form }) {
  const pad = "px-[clamp(20px,4vw,64px)] lg:px-[max(5vw,32px)]";

  return (
    <>
      <section data-testid="careers-quote" className={`${pad} border-t border-[#1c1a17]/10 py-16 sm:py-20`}>
        <figure className="m-0 max-w-[1000px] border-l border-[#1c1a17]/55 pl-6 sm:pl-14">
          <blockquote className="m-0 font-serif text-[26px] font-light leading-[1.28] text-[#111] sm:text-[38px] lg:text-[44px]">
            “{quote.text}”
          </blockquote>
          <figcaption className="mt-8">
            <p className="m-0 text-[15px] text-[#111]">{quote.name}</p>
            <p className="m-0 mt-1 text-[13px] text-[#1c1a17]/60">{quote.role}</p>
          </figcaption>
        </figure>
      </section>

      <section data-testid="careers-body" className={`${pad} pb-16 sm:pb-20`}>
        <p className="m-0 max-w-[960px] text-[17px] leading-[1.85] text-[#1c1a17]/70">{body}</p>
      </section>

      <section id={form.id} aria-labelledby="apply-title" data-testid="careers-apply"
        className={`${pad} scroll-mt-[calc(var(--hdr-h)+24px)] border-t border-[#1c1a17]/10 pb-24 pt-16 sm:pb-32 sm:pt-20`}>
        <h2 id="apply-title" className="m-0 font-serif text-[32px] font-light leading-[1.1] text-[#111] sm:text-[44px]">{form.title}</h2>
        <p className="mb-0 mt-4 max-w-[620px] text-[15px] leading-[1.7] text-[#1c1a17]/70">{form.text}</p>
        <CareersForm data={form} />
      </section>
    </>
  );
}