/* eslint-disable @next/next/no-img-element */
const P = "m-0 mb-4 text-[14px] leading-[1.8] text-[#6b675f] sm:text-[16px]";
const LABEL = "m-0 mb-3 font-nav text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1c1a17]/65";

export default function PressBody({ data }) {
  const { title, image, imageFit, subtitle, paragraphs, about, contacts = [] } = data;

  return (
    <section data-testid="press-body" className="mx-auto w-full max-w-[1320px] px-5 pb-40 md:px-16 sm:pb-24">
      {image && (
        <div
          className={`relative mb-8 aspect-[653/462] w-full max-w-[653px] overflow-hidden ${
            imageFit === "contain" ? "bg-white" : "bg-[#ece7dc]"
          }`}
        >
          <img
            src={image}
            alt={title}
            className={`absolute inset-0 h-full w-full ${imageFit === "contain" ? "object-contain" : "object-cover"}`}
          />
        </div>
      )}

      <div className="max-w-[820px]">
        {subtitle && (
          <p className="m-0 mb-6 text-[16px] font-semibold leading-[1.6] text-[#5c5346] sm:text-[18px]">
            {subtitle}
          </p>
        )}

        {paragraphs.map((p, i) => (
          <p key={i} className={P}>
            {p}
          </p>
        ))}

        {about && (
          <div className="mt-10 border-t border-[#11111124] pt-8">
            <p className={LABEL}>About Emaar India</p>
            <p className={P}>{about}</p>
          </div>
        )}

        {contacts.length > 0 && (
          <div className="mt-10 border-t border-[#11111124] pt-8">
            <p className={LABEL}>For more information</p>
            <div className="grid gap-5 sm:grid-cols-2">
              {contacts.map((c) => (
                <div key={c.org} className="border border-[#11111112] bg-white p-5">
                  <p className="m-0 font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/65">
                    {c.org}
                  </p>
                  <ul className="m-0 mt-3 list-none space-y-4 p-0">
                    {c.people.map((p) => (
                      <li key={p.name} className="text-[14px] leading-[1.7] text-[#1c1a17]/75">
                        <span className="block text-[#111]">{p.name}</span>
                        {p.phone && (
                          <a href={`tel:+91${p.phone}`} className="block hover:text-[#111]">
                            {p.phone}
                          </a>
                        )}
                        {p.email && (
                          <a href={`mailto:${p.email}`} className="block break-all underline underline-offset-4 hover:opacity-60">
                            {p.email}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}