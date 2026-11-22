/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import BlogCard from "./BlogCard";
import BlogPagination from "./BlogPagination";
import { formatDate } from "@/services/blogService";

const LABEL = "m-0 font-nav text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1c1a17]/65";

export default function BlogList({ data, posts, page }) {
  const { label, title, text, pageSize } = data;

  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => p !== featured);
  const total = Math.max(1, Math.ceil(rest.length / pageSize));
  const current = Math.min(Math.max(1, page), total);
  const visible = rest.slice((current - 1) * pageSize, current * pageSize);
  const showFeatured = featured && current === 1;

  return (
    <div
      data-testid="blog-list"
      className="px-[clamp(20px,4vw,64px)] pb-40 text-[#1c1a17] sm:pb-24 lg:px-[max(5vw,32px)]"
    >
      {showFeatured ? (
        <>
          <p className={LABEL}>{label}</p>
          <h2 className="mb-0 mt-5 font-serif text-[30px] font-light leading-[1.15] text-[#111] sm:text-[38px]">
            {title}
          </h2>
          <p className="mb-0 mt-3 text-[13px] text-[#1c1a17]/65">{text}</p>

          <Link href={`/blog/${featured.slug}`} data-testid="blog-featured" className="group mt-8 block">
            <span className="relative block aspect-[16/9] w-full overflow-hidden rounded-[2px] bg-black/5 lg:aspect-[21/9]">
              <img
                src={featured.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </span>
            <span className="mt-5 block font-nav text-[10px] tracking-[0.1em] text-[#1c1a17]/60">
              {formatDate(featured.date)}
            </span>
            <span className="mt-2 block max-w-[1000px] font-serif text-[26px] font-light leading-[1.2] text-[#111] sm:text-[36px]">
              {featured.title}
            </span>
            <span className="mt-3 block max-w-[760px] text-[13px] leading-[1.6] text-[#1c1a17]/70">
              {featured.excerpt}
            </span>
          </Link>
        </>
      ) : (
        <p className={LABEL}>All stories</p>
      )}

      <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-x-6 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}
      </ul>

      <BlogPagination current={current} total={total} />
    </div>
  );
}