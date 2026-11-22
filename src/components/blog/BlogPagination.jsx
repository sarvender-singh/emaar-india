import Link from "next/link";

const BOX =
  "inline-flex h-10 min-w-10 items-center justify-center border px-3 font-nav text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300";

export default function BlogPagination({ current, total }) {
  if (total <= 1) return null;
  const href = (n) => (n === 1 ? "/blog" : `/blog?page=${n}`);

  return (
    <nav aria-label="Pagination" className="mt-14 flex flex-wrap justify-center gap-2 sm:mt-16">
      {Array.from({ length: total }, (_, i) => i + 1).map((n) =>
        n === current ? (
          <span key={n} aria-current="page" className={`${BOX} border-[#111] bg-[#111] text-white`}>
            {n}
          </span>
        ) : (
          <Link key={n} href={href(n)} className={`${BOX} border-[#111] text-[#111] hover:bg-[#111] hover:text-white`}>
            {n}
          </Link>
        )
      )}
      {current < total && (
        <Link href={href(current + 1)} className={`${BOX} border-[#111] px-6 text-[#111] hover:bg-[#111] hover:text-white`}>
          Next
        </Link>
      )}
    </nav>
  );
}