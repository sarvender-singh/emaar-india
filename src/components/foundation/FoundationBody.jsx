export default function FoundationBody({ data }) {
  const { paragraphs } = data;

  return (
    <section className="mx-auto w-full max-w-[1320px] px-5 pb-20 md:px-16">
      <div className="w-full">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="m-0 mb-4 text-[14px] leading-[1.8] sm:text-[16px] text-[#6b675f] last:mb-0"
          >
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}