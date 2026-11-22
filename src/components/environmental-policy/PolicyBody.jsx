export default function PolicyBody({ data }) {
  const { intro, paragraphs } = data;

  return (
    <section className="mx-auto w-full max-w-[1320px] px-5 pb-20 md:px-16">
      <div className="w-full">
        {intro && (
          <p className="m-0 mb-6 text-[14px] font-semibold uppercase leading-[1.8] tracking-[0.04em] text-[#5c5346] sm:text-[16px]">
            {intro}
          </p>
        )}

        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="m-0 mb-4 text-[14px] leading-[1.8] text-[#6b675f] last:mb-0 sm:text-[16px]"
          >
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}